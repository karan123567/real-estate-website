import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  const isProd = process.env.NODE_ENV === "production";

  // ✅ MUST match backend cookie EXACTLY
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax", // ✅ FIXED
    path: "/",
    maxAge: 0,
    domain: ".parthestatemart.com",
  });

  return response;
}