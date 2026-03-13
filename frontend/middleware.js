// 
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const isDemoMode = process.env.DEMO_MODE === "true";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyAdminToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") return false;
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request) {
  if (isDemoMode) {
    return NextResponse.next(); // 🔓 Bypass everything for demo
  }

  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";

  if (isAdminRoute && !isLoginRoute) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    const isValid = await verifyAdminToken(token);

    if (!isValid) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  if (isLoginRoute && token) {
    const isValid = await verifyAdminToken(token);

    if (isValid) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};