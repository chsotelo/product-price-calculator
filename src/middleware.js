import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const url = request.nextUrl.pathname;
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (session) {
    if (url === "/login") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/abocado",
    "/home",
    "/search-sale",
    "/others",
    "/register",
    "/login",
  ],
};
