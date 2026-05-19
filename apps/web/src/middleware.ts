import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_NAME = "nv_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isAppRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/send") ||
    pathname.startsWith("/beneficiaries") ||
    pathname.startsWith("/transfers");

  if (!isAuthRoute && !isAppRoute) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const signedIn = Boolean(token);

  if (isAppRoute && !signedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && signedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard", "/send", "/beneficiaries", "/transfers/:path*"],
};

