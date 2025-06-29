import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// this middleware protects all routes except the public ones defined below.
const isPublicRoute = createRouteMatcher([
	"/",
	"/admin(.*)",
	"/api(.*)",
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
	// allow access to public routes, but protect all other routes
	if (!isPublicRoute(req)) {
		await auth.protect();
	}
});

export const config = {
	matcher: [
		// skip next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// always run for api routes
		"/(api|trpc)(.*)",
	],
};
