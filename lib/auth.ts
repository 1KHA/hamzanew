import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    // Use JWT for session storage
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // 1. Validate username/password
        // const user = await getUser(credentials.username, credentials.password);
        // if (!user) {
        //   throw new Error("Invalid username or password");
        // }

        // // 2. If OTP is not provided, indicate "OTP_REQUIRED"
        // if (!credentials.otp) {
        //   throw new Error("OTP_REQUIRED");
        // }

        // // 3. Validate OTP
        // const validOtp = await verifyOtp(user.id, credentials.otp);
        // if (!validOtp) {
        //   throw new Error("Invalid OTP");
        // }

        // On success, return user object; add custom fields as needed
        return {
          id: "1",
          name: "User",
          username: "User",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(params: any) {
      const { token, user } = params;
      // On login, add user data to the token
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
    async session(params: any) {
      const { session, token } = params;
      // Make token data available to client and middleware
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

// async function getUser(username, password) {
//   // Validate the user's username and password (e.g., DB lookup)
//   // Return user object or null/false on failure

//   const authURL = `${process.env.BASE_URL}/o/headless-admin-user/v1.0/my-user-account`;
//   const credentials = btoa(`${username}:${password}`);

//   try {
//     const response = await fetch(authURL, {
//       method: "GET",
//       headers: {
//         Authorization: `Basic ${credentials}`,
//         Accept: "application/json",
//       },
//     });

//     if (response.ok) {
//       const user = await response.json();
//       console.log("User fetched:", user);
//       return user;
//     } else {
//       return null; // or handle unauthorized appropriately
//     }
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null; // Handle error appropriately
//   }
// }

// async function verifyOtp(userId, otp) {
//   // Check OTP validity for the given user id
//   // Return true if valid, else false

//   return otp === "123456"; // Dummy OTP validation for demonstration
// }
