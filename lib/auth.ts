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

  try {
    const response = await fetch(authURL, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      const user = await response.json();
      console.log("Liferay user authenticated:", user.id, user.emailAddress);
      return user;
    }

    console.warn("Liferay auth failed with status:", response.status);
    return null;
  } catch (error) {
    console.error("Error authenticating with Liferay:", error);
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

        const user = await getUser(credentials.username, credentials.password);

        if (!user) {
          throw new Error("اسم المستخدم أو كلمة المرور غير صحيحة");
        }

        // Return the user object — this gets stored in the JWT token
        return {
          id: String(user.id),
          name:
            user.name ||
            `${user.givenName || ""} ${user.familyName || ""}`.trim(),
          email: user.emailAddress,
          username: credentials.username,
        };
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