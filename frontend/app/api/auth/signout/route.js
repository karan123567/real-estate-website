import { NextResponse } from "next/server";

export async function GET() {
  const isProd = process.env.NODE_ENV === "production";

  // ✅ This is a full page navigation — browser MUST obey Set-Cookie
  const response = NextResponse.redirect(
    new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
  );

  // Clear with all possible combos
  response.headers.append("Set-Cookie",
    `auth_token=; Max-Age=0; Path=/; HttpOnly; ${isProd ? "Secure; SameSite=None" : "SameSite=Lax"}`
  );
  response.headers.append("Set-Cookie",
    `auth_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`
  );
  response.headers.append("Set-Cookie",
    `auth_token=; Max-Age=0; Path=/; HttpOnly; SameSite=None; Secure`
  );

  // Also tell backend to clear its cookie
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (backendUrl) {
      await fetch(`${backendUrl}/api/admin/logout`, { method: "POST" });
    }
  } catch {
    // ignore — cookie is already cleared above
  }

  return response;
}