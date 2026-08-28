"use server";

import { decode, encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { refreshLiferayUserToken } from "@/lib/auth";
import { sessionIdleTimeoutSeconds } from "@/lib/session-config";

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

function sessionCookieName(secure) {
  return secure
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";
}

export async function getUserAuth() {
  const cookieStore = await cookies();
  const secret = process.env.NEXTAUTH_SECRET;
  const secure = (process.env.NEXTAUTH_URL ?? "").startsWith("https://");

  // Read the NextAuth session cookie value directly and decode it. Reading the
  // value straight from the cookie store (like getServerSession does) avoids the
  // header re-serialization that getToken({ req: { headers: { cookie } } }) does
  // — that round-trip corrupted the JWE value (other cookies like csrf-token
  // contain a '|') and made getToken return null even though the cookie existed.
  const baseName = secure
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

  let sessionToken = cookieStore.get(baseName)?.value;

  if (!sessionToken) {
    // Reassemble a chunked cookie: baseName.0, baseName.1, ...
    let assembled = "";
    for (let i = 0; ; i++) {
      const chunk = cookieStore.get(`${baseName}.${i}`)?.value;
      if (!chunk) break;
      assembled += chunk;
    }
    sessionToken = assembled || undefined;
  }

  console.log("[getUserAuth] session cookie found:", !!sessionToken);
  if (!sessionToken) return null;

  const token = await decode({ token: sessionToken, secret });
  console.log("[getUserAuth] decoded token keys:", token ? Object.keys(token) : null);
  console.log("[getUserAuth] token summary:", token ? {
    id: token.id,
    email: token.email,
    name: token.name,
    hasAccessToken: !!token.accessToken,
    accessTokenPrefix: token.accessToken ? `${token.accessToken.slice(0, 6)}...${token.accessToken.slice(-6)}` : null,
    accessTokenExpires: token.accessTokenExpires,
    expiresInSeconds: token.accessTokenExpires ? Math.round((token.accessTokenExpires - Date.now()) / 1000) : null,
    error: token.error,
  } : null);

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
  console.log("[getUserAuth] refresh result:", refreshed ? {
    hasAccessToken: !!refreshed.access_token,
    expiresIn: refreshed.expires_in,
  } : null);

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
  // Re-persist with the idle timeout, not a longer lifetime — using anything
  // larger here would reset the idle window on every token refresh and defeat
  // the automatic session termination.
  const sessionMaxAge = sessionIdleTimeoutSeconds();

  try {
    const encoded = await encode({
      token: freshToken,
      secret,
      maxAge: sessionMaxAge,
    });
    cookieStore.set(sessionCookieName(secure), encoded, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: sessionMaxAge,
    });
  } catch (error) {
    console.warn("[getUserAuth] could not persist refreshed token:", error?.message);
  }

  return freshToken;
}
