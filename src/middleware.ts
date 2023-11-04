import { type NextRequest, NextResponse } from "next/server";
const guestRoutes = [`/auth/login`, "/auth/register"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  if (new RegExp(/^.*(fonts|_next|vk.com|favicon).*$/).test(request.url)) {
    return NextResponse.next();
  }

  if (token) {
    if (!guestRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!guestRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    } else {
      return NextResponse.next();
    }
  }
}
