import { auth } from "@/src/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
    const isLoggedIn = !!req.auth;
    const isLoginPage = req.nextUrl.pathname === "/login";
    const isRoot = req.nextUrl.pathname === "/";

    if (isRoot) {
        return NextResponse.redirect(
            new URL(isLoggedIn ? "/dashboard" : "/login", req.url),
        );
    }

    if (!isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isLoggedIn && isLoginPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
