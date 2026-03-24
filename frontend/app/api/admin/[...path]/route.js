import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

async function handler(request, { params }) {
  const path = params.path.join("/");
  const url = new URL(request.url);
  const queryString = url.search; // preserve ?days=30 etc

  // ✅ Read cookie from Next.js domain and forward to backend
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  const headers = {
    "Content-Type": "application/json",
    // ✅ Forward cookie to backend as header
    ...(token && { Cookie: `auth_token=${token}` }),
  };

  const options = {
    method: request.method,
    headers,
    // Forward body for POST/PUT
    ...(["POST", "PUT", "PATCH"].includes(request.method) && {
      body: await request.text(),
    }),
  };

  try {
    const res = await fetch(
      `${BACKEND_URL}/api/admin/${path}${queryString}`,
      options
    );

    const data = await res.json();

    // Special case: login → set cookie on Next.js domain
    if (path === "login" && res.ok) {
      const backendCookie = res.headers.get("set-cookie");
      const response = NextResponse.json(data, { status: res.status });
      if (backendCookie) {
        response.headers.set("set-cookie", backendCookie);
      }
      return response;
    }

    // Special case: logout → clear cookie on Next.js domain
    if (path === "logout") {
      const response = NextResponse.json(data, { status: res.status });
      response.cookies.set("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });
      return response;
    }

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error(`Proxy error for /api/admin/${path}:`, error);
    return NextResponse.json(
      { error: "Internal proxy error" },
      { status: 500 }
    );
  }
}

export const GET    = handler;
export const POST   = handler;
export const PUT    = handler;
export const DELETE = handler;
export const PATCH  = handler;
