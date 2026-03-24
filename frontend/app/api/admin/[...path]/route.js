import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

async function handler(request, { params }) {
  // ✅ Guard: BACKEND_URL must be set
  if (!BACKEND_URL) {
    console.error("❌ BACKEND_URL environment variable is not set");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 },
    );
  }

  const { path: pathSegments } = await params;
  const path = pathSegments.join("/");
  const url = new URL(request.url);
  const queryString = url.search;

  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Cookie: `auth_token=${token}` }),
  };

  // ✅ Safe body reading
  let body = undefined;
  if (["POST", "PUT", "PATCH"].includes(request.method)) {
    try {
      const text = await request.text();
      if (text) body = text;
    } catch {
      body = undefined;
    }
  }

  try {
    console.log(`→ Proxy: ${request.method} /api/admin/${path}`);

    const res = await fetch(`${BACKEND_URL}/api/admin/${path}${queryString}`, {
      method: request.method,
      headers,
      ...(body !== undefined && { body }),
    });

    const data = await res.json();
    console.log(`← Proxy response: ${res.status} for /api/admin/${path}`);

    // Login → save cookie
    if (path === "login" && res.ok) {
      const response = NextResponse.json(data, { status: res.status });
      const backendCookie = res.headers.get("set-cookie");
      if (backendCookie) response.headers.set("set-cookie", backendCookie);
      return response;
    }

    // Logout → clear cookie on Next.js domain
    if (path === "logout") {
      const response = NextResponse.json(data, { status: res.status });

      const isProd = process.env.NODE_ENV === "production";

      // ✅ Must EXACTLY match how cookie was originally set
      response.cookies.set("auth_token", "", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax", // ← matches backend exactly
        maxAge: 0,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(
      `❌ Proxy error [${request.method} /api/admin/${path}]:`,
      error.message,
    );
    return NextResponse.json(
      { error: "Proxy error", detail: error.message },
      { status: 500 },
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
