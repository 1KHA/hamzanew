import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Validates user credentials against the Liferay backend.
 * Uses Basic Auth with the user's own username/password to call
 * the Liferay headless user account endpoint.
 */
async function getUser(username: string, password: string) {
  const authURL = `${process.env.BASE_URL}/o/headless-admin-user/v1.0/my-user-account`;
  const credentials = Buffer.from(`${username}:${password}`).toString("base64");

  console.log("[AUTH] Login attempt for username:", username);
  console.log("[AUTH] Liferay auth URL:", authURL);

  try {
    const response = await fetch(authURL, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log("[AUTH] Liferay response status:", response.status);

    if (response.ok) {
      const user = await response.json();
      console.log("[AUTH] Liferay raw user object:", JSON.stringify(user, null, 2));
      console.log("[AUTH] Liferay user id:", user.id, "| email:", user.emailAddress, "| screenName:", user.screenName);
      return user;
    }

    console.warn("[AUTH] Liferay auth failed with status:", response.status);
    return null;
  } catch (error) {
    console.error("[AUTH] Error authenticating with Liferay:", error);
    return null;
  }
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
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("اسم المستخدم وكلمة المرور مطلوبان");
        }

        console.log("[AUTH] authorize() called with username:", credentials.username);

        const user = await getUser(credentials.username, credentials.password);

        if (!user) {
          console.log("[AUTH] authorize() failed — getUser returned null");
          throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
        }

        const returnUser = {
          id: String(user.id),
          name:
            user.name ||
            `${user.givenName || ""} ${user.familyName || ""}`.trim(),
          email: user.emailAddress,
          username: credentials.username,
        };

        console.log("[AUTH] authorize() returning user:", JSON.stringify(returnUser, null, 2));
        return returnUser;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(params: any) {
      const { token, user } = params;
      // On initial sign-in, persist user data into the JWT token
      if (user) {
        token.id = user.id;
        token.username = user.username || user.email;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session(params: any) {
      const { session, token } = params;
      // Expose token data to the client session
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};