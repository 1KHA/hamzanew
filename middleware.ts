import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    // Check if user has a token 
    const user = request.nextauth.token;
    
    // The path the user is trying to access
    const path = request.nextUrl.pathname;

    // If an authenticated user tries to hit /sign-in or /sign-up, redirect them away to profile
    const isAuthRoute = path === "/sign-in" || path === "/sign-up";
    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Otherwise, let the request proceed normally
    return NextResponse.next();
  },
  {
    // Explicit secret for Edge Runtime compatibility (Next.js 15+).
    // NOTE: middleware runs in the Edge runtime, where Next.js inlines
    // process.env at BUILD time — this value must be present when `next build`
    // runs, not only at runtime, or withAuth falls through its NO_SECRET branch.
    secret: process.env.NEXTAUTH_SECRET,
    // withAuth does NOT read `pages` from authOptions in lib/auth.ts — it has
    // its own, defaulting to /api/auth/signin and /api/auth/error. Without these
    // overrides a failed check bounces the user to /api/auth/error, which is a
    // NextAuth-internal URL and 404s behind a proxy that doesn't route /api to
    // this app.
    pages: {
      signIn: "/sign-in",
      error: "/sign-in",
    },
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        const protectedRoutes = ["/profile", "/test-takers/booking"]; // Add any other protected routes here
        const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

        // If the user tries to access a protected route without a verified NextAuth token
        // Returning 'false' here stops the request and redirects the user to the
        // signIn page configured in the `pages` option above (NOT the one in
        // lib/auth.ts — withAuth does not read authOptions).
        if (isProtectedRoute && !token) {
          return false; 
        }

        // If it's a public route OR they have a token, allow the request!
        return true;
      },
    },
  }
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/signin|signup|.*\\.css|.*\\.ttf|.*\\.jpg|.*\\.svg|.*\\.png).*)",
  ],
};
