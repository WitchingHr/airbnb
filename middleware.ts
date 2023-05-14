export { default } from "next-auth/middleware";

// protected routes
// user must be authenticated to access these routes
// will bounce back to root page if not logged in
export const config = {
  matcher: [
    '/trips',
    '/reservations',
    '/properties',
    '/favorites',
  ],
}
