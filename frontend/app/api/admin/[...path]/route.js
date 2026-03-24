import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

async function handler(request, { params }) {
  if (!BACKEND_URL) {
    console.error("❌ BACKEND_URL environment variable is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
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

  // ✅ Handle logout before fetching backend
  // Clear cookie regardless of backend response
  if (path === "logout") {
    const isProd = process.env.NODE_ENV === "production";

    // Try backend logout but don't depend on it
    try {
      await fetch(`${BACKEND_URL}/api/admin/logout`, {
        method: "POST",
        headers,
      });
    } catch {
      console.log("Backend logout failed, clearing cookie anyway");
    }

    const response = NextResponse.json({ success: true });

    // ✅ Clear with ALL possible attribute combos
    // covers however the cookie was originally set
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

  try {
    console.log(`→ Proxy: ${request.method} /api/admin/${path}`);

    const res = await fetch(`${BACKEND_URL}/api/admin/${path}${queryString}`, {
      method: request.method,
      headers,
      ...(body !== undefined && { body }),
    });

    // ✅ Safe JSON parsing — handles non-JSON error responses
    let data;
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error(`Non-JSON response from backend [${res.status}]:`, text);
      data = { error: text || "Backend error" };
    }

    console.log(`← Proxy response: ${res.status} for /api/admin/${path}`);

    // ✅ Login → forward Set-Cookie from backend to browser
    if (path === "login" && res.ok) {
      const response = NextResponse.json(data, { status: res.status });
      const backendCookie = res.headers.get("set-cookie");
      if (backendCookie) response.headers.set("set-cookie", backendCookie);
      return response;
    }

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error(`❌ Proxy error [${request.method} /api/admin/${path}]:`, error.message);
    return NextResponse.json(
      { error: "Proxy error", detail: error.message },
      { status: 500 }
    );
  }
}

export const GET    = handler;
export const POST   = handler;
export const PUT    = handler;
export const DELETE = handler;
export const PATCH  = handler;