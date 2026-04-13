import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth v4 reads `params.nextauth` synchronously, but starting with
 * Next.js 15 the `params` object in route handlers is a Promise.
 * This wrapper resolves `params` before handing the request to
 * the NextAuth handler so the catch-all slug is available.
 */
const nextAuthHandler = NextAuth(authOptions);

async function handler(
  req: Request,
  context: { params: Promise<{ nextauth: string[] }> }
) {
  // Resolve the async params so next-auth can read `params.nextauth`
  return nextAuthHandler(req, { params: await context.params });
}

export { handler as GET, handler as POST };
