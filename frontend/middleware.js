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

// ✅ Helper — clear cookie in response
function clearAuthCookie(response) {
  const isProd = process.env.NODE_ENV === "production";
  response.headers.append("Set-Cookie",
    `auth_token=; Max-Age=0; Path=/; HttpOnly; ${isProd ? "Secure; SameSite=None" : "SameSite=Lax"}`
  );
  response.headers.append("Set-Cookie",
    `auth_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`
  );
  response.headers.append("Set-Cookie",
    `auth_token=; Max-Age=0; Path=/; HttpOnly; SameSite=None; Secure`
  );
  return response;
}

export async function middleware(request) {
  if (isDemoMode) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // ✅ Never block proxy API routes
  if (pathname.startsWith("/api")) return NextResponse.next();

  const token = request.cookies.get("auth_token")?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";

  if (isAdminRoute && !isLoginRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const isValid = await verifyAdminToken(token);

    if (!isValid) {
      // ✅ Clear bad/expired cookie and redirect
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      return clearAuthCookie(response);
    }
  }

  if (isLoginRoute && token) {
    const isValid = await verifyAdminToken(token);

    if (isValid) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      // ✅ Clear invalid cookie so login page actually shows
      const response = NextResponse.next();
      return clearAuthCookie(response);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};