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
    // Explicit secret for Edge Runtime compatibility (Next.js 15+)
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        const protectedRoutes = ["/profile", "/test-takers/booking"]; // Add any other protected routes here
        const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

        // If the user tries to access a protected route without a verified NextAuth token
        // Returning 'false' here automatically stops the request and redirects the user
        // directly to the custom signIn page configured in lib/auth.ts!
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
