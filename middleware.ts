import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/auth/forgot-password",
        "auth/new-password",
        "/maps/(.*)",
        "/api/(.*)",
        "/api/auth/(.*)"
    ],
    ignoredRoutes: [
        "/((?!api|trpc))(_next.*|.+\.[\w]+$)", 
        "/auth/new-password"
    ]
});

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/(api|trpc)(.*)"
    ]
};