"use server";

import { getToken, encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { refreshLiferayUserToken } from "@/lib/auth";

/**
 * Server-only access to the signed-in user's Liferay token.
 *
 * The token lives inside the encrypted, httpOnly NextAuth session cookie. We
 * read it here with getToken() (which decrypts it using NEXTAUTH_SECRET) so it
 * is NEVER copied onto the public session object returned by /api/auth/session.
 * The browser therefore never sees the raw access token.
 *
 * getToken() does not run NextAuth's jwt callback, so it never auto-refreshes.
 * To keep this the single source of refresh (no races), we refresh here when the
 * access token is expired and best-effort re-persist the cookie.
 */

const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days (NextAuth default)

function sessionCookieName(secure) {
  return secure
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";
}

export async function getUserAuth() {
  const cookieStore = await cookies();
  const secret = process.env.NEXTAUTH_SECRET;
  const secure = (process.env.NEXTAUTH_URL ?? "").startsWith("https://");

  const token = await getToken({
    req: { headers: { cookie: cookieStore.toString() } },
    secret,
    secureCookie: secure,
  });

  if (!token) return null;

  // Still valid (with a 60s safety margin) — use as-is.
  if (
    token.accessTokenExpires &&
    Date.now() < token.accessTokenExpires - 60_000
  ) {
    return token;
  }

  // Expired (or unknown expiry): refresh once.
  if (!token.refreshToken) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  const refreshed = await refreshLiferayUserToken(token.refreshToken);

  if (!refreshed?.access_token) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  const { iat, exp, jti, ...rest } = token; // drop JWT metadata before re-encoding
  const freshToken = {
    ...rest,
    accessToken: refreshed.access_token,
    refreshToken: refreshed.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
    error: undefined,
  };

  // Best-effort persist: works in Server Actions / Route Handlers; silently
  // skipped when called during a Server Component render (cookies are read-only
  // there) — the in-memory token below still serves the current request.
  try {
    const encoded = await encode({
      token: freshToken,
      secret,
      maxAge: SESSION_MAX_AGE,
    });
    cookieStore.set(sessionCookieName(secure), encoded, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
  } catch (error) {
    console.warn("[getUserAuth] could not persist refreshed token:", error?.message);
  }

  return freshToken;
}
