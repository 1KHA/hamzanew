import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchWithAccessToken } from "@/app/_lib/token-refresh-service";

const TOKEN_URL = `${process.env.BASE_URL}${process.env.ACCESS_TOKEN_URL}`;

/**
 * Server-side MFA gate. Verifies the emailed login OTP for the given mfaToken
 * against the backend (consuming the single-use ticket on success) using the
 * service-account token, since verify-otp is an anonymous/pre-session endpoint.
 *
 * This is what makes MFA enforceable: authorize() calls this BEFORE issuing a
 * session, so a session cannot be minted with username+password alone — the
 * credentials endpoint can no longer bypass the OTP step.
 */
async function verifyOtpTicket(mfaToken: string, otp: string): Promise<boolean> {
  try {
    const url = `${process.env.BASE_URL}${process.env.HAMZA_VERIFY_OTP_API_URL}`;
    const res = await fetchWithAccessToken(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ mfaToken, otp }),
      cache: "no-store",
    });

    if (!res.ok) {
      return false;
    }

    const data = await res.json().catch(() => ({} as any));
    return data?.status === "SUCCESS";
  } catch (error) {
    console.error("[AUTH] OTP verification failed:", error);
    return false;
  }
}

/**
 * Exchanges a username + password for a USER-scoped Liferay access token using
 * the OAuth2 Resource Owner Password Credentials ("password") grant. The
 * resulting token carries the user's own identity/permissions, so self-service
 * profile calls run as the user instead of the service account.
 */
async function requestUserToken(username: string, password: string) {
  const body = new URLSearchParams({
    grant_type: "password",
    username,
    password,
    client_id: process.env.LIFERAY_USER_CLIENT_ID || "",
    client_secret: process.env.LIFERAY_USER_CLIENT_SECRET || "",
  });

  if (process.env.LIFERAY_USER_SCOPE) {
    body.set("scope", process.env.LIFERAY_USER_SCOPE);
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    console.warn("[AUTH] Password grant failed:", res.status, errorText);
    return null;
  }

  return res.json(); // { access_token, refresh_token, expires_in, ... }
}

/**
 * Fetches the authenticated user's own account from Liferay using a bearer
 * token — used to resolve the user's id/email/name after sign-in. Requires the
 * user OAuth client to have headless-admin-user read scope.
 */
export async function getUserAccount(accessToken: string) {
  const authURL = `${process.env.BASE_URL}/o/headless-admin-user/v1.0/my-user-account`;

  try {
    const response = await fetch(authURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      return response.json();
    }

    console.warn("[AUTH] my-user-account fetch failed with status:", response.status);
    return null;
  } catch (error) {
    console.error("[AUTH] Error fetching user account:", error);
    return null;
  }
}

/**
 * Exchanges a refresh token for a new access token. Returns the raw token
 * response ({ access_token, refresh_token, expires_in, ... }) or null on
 * failure. Called server-side by getUserAuth() — the single place that
 * refreshes — so the access token never has to travel through the session.
 */
export async function refreshLiferayUserToken(refreshToken: string) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: process.env.LIFERAY_USER_CLIENT_ID || "",
    client_secret: process.env.LIFERAY_USER_CLIENT_SECRET || "",
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    console.warn("[AUTH] Token refresh failed:", res.status, errorText);
    return null;
  }

  return res.json();
}

/**
 * Revokes a Liferay OAuth2 token (RFC 7009 revocation endpoint) so it can no
 * longer be used or refreshed once the user signs out — turning sign-out into a
 * real server-side logout instead of just a cleared cookie.
 *
 * Best-effort: any failure is logged but never thrown, because logout must
 * still complete (the session cookie is cleared regardless). No-ops when the
 * token or REVOKE_TOKEN_URL is missing.
 */
export async function revokeLiferayUserToken(
  token: string,
  tokenTypeHint: "access_token" | "refresh_token"
): Promise<void> {
  if (!token || !process.env.REVOKE_TOKEN_URL) {
    return;
  }

  const body = new URLSearchParams({
    token,
    token_type_hint: tokenTypeHint,
    client_id: process.env.LIFERAY_USER_CLIENT_ID || "",
    client_secret: process.env.LIFERAY_USER_CLIENT_SECRET || "",
  });

  try {
    const res = await fetch(
      `${process.env.BASE_URL}${process.env.REVOKE_TOKEN_URL}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      console.warn(
        `[AUTH] Token revoke (${tokenTypeHint}) failed:`,
        res.status,
        errorText
      );
    }
  } catch (error) {
    console.error(`[AUTH] Error revoking ${tokenTypeHint}:`, error);
  }
}

/**
 * Validates a username + password by attempting the password grant, returning
 * the user's account on success (or null). Used by the sign-in pre-check before
 * the OTP step; the real session is established later via NextAuth authorize().
 */
export async function validateUserCredentials(username: string, password: string) {
  const tokens = await requestUserToken(username, password);

  if (!tokens?.access_token) {
    return null;
  }

  return getUserAccount(tokens.access_token);
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
        mfaToken: { label: "mfaToken", type: "text" },
        otp: { label: "otp", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("اسم المستخدم وكلمة المرور مطلوبان");
        }

        if (!credentials?.mfaToken || !credentials?.otp) {
          throw new Error("رمز التحقق مطلوب");
        }

        console.log("[AUTH] authorize() called with username:", credentials.username);

        // 0. MFA gate — verify the emailed OTP (consumes the ticket) BEFORE any
        //    session is issued. Without this, username+password alone would mint
        //    a session and the OTP step could be bypassed entirely.
        const otpValid = await verifyOtpTicket(
          credentials.mfaToken,
          credentials.otp
        );

        if (!otpValid) {
          console.log("[AUTH] authorize() failed — OTP verification failed");
          throw new Error("رمز التحقق غير صحيح أو منتهي الصلاحية");
        }

        // 1. Exchange credentials for a user-scoped token (password grant).
        const tokens = await requestUserToken(
          credentials.username,
          credentials.password
        );

        if (!tokens?.access_token) {
          console.log("[AUTH] authorize() failed — no token from password grant");
          throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
        }

        // 2. Resolve the user's account using the freshly issued token.
        const user = await getUserAccount(tokens.access_token);

        if (!user) {
          console.log("[AUTH] authorize() failed — could not load user account");
          throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
        }

        const returnUser = {
          id: String(user.id),
          name:
            user.name ||
            `${user.givenName || ""} ${user.familyName || ""}`.trim(),
          email: user.emailAddress,
          username: credentials.username,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          accessTokenExpires: Date.now() + tokens.expires_in * 1000,
        };

        console.log("[AUTH] authorize() returning user id:", returnUser.id);
        console.log("[AUTH] authorize() returnUser keys:", Object.keys(returnUser));
        return returnUser as any;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(params: any) {
      const { token, user } = params;

      // On initial sign-in, persist user data + tokens into the JWT.
      if (user) {
        token.id = user.id;
        token.username = user.username || user.email;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        return token;
      }

      // Refresh of the access token is handled server-side in getUserAuth()
      // (app/_lib/user-token-service) so the token stays out of the public
      // session. Nothing to do here on subsequent calls.
      return token;
    },
    async session(params: any) {
      const { session, token } = params;
      console.log("[AUTH session] token keys:", token ? Object.keys(token) : null);
      // Expose only non-sensitive user data to the client session.
      // The access token is deliberately NOT exposed here — server code reads it
      // from the encrypted JWT via getUserAuth().
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      console.log("[AUTH session] session.user:", JSON.stringify(session.user, null, 2));
      return session;
    },
  },
  events: {
    // Real logout: revoke the user's Liferay tokens server-side so they cannot
    // be used or refreshed after sign-out, not merely forgotten by the browser.
    // The refresh token is revoked first (kills the grant), then the access
    // token. Best-effort — failures never block sign-out.
    async signOut(params: any) {
      const { token } = params;

      if (token?.refreshToken) {
        await revokeLiferayUserToken(token.refreshToken, "refresh_token");
      }
      if (token?.accessToken) {
        await revokeLiferayUserToken(token.accessToken, "access_token");
      }
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};
