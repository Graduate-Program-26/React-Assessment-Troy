import { auth } from "@/src/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
    console.log("proxy hit:", req.nextUrl.pathname, "authed:", !!req.auth);
    const isLoggedIn = !!req.auth;
    const isLoginPage = req.nextUrl.pathname === "/login";

    if (!isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isLoggedIn && isLoginPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
