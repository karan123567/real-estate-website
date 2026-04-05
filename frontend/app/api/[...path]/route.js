import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL;

async function handler(request) {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: "Backend URL missing" },
        { status: 500 }
      );
    }

    const url = new URL(request.url);

    // Example: /api/properties → ["", "api", "properties"]
    const segments = url.pathname.split("/");

    // Remove "", "api"
    const pathSegments = segments.slice(2);
    const path = pathSegments.join("/");

    const queryString = url.search;

    // ✅ Forward cookies
    const cookieHeader = request.headers.get("cookie") || "";

    const headers = {
      "Content-Type": "application/json",
      ...(cookieHeader && { Cookie: cookieHeader }),
    };

    let body;
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      body = await request.text();
    }

    console.log("👉 Global Proxy:", `/api/${path}`);

    const res = await fetch(
      `${BACKEND_URL}/api/${path}${queryString}`,
      {
        method: request.method,
        headers,
        ...(body && { body }),
      }
    );

    let data;
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = { error: text || "Backend error" };
    }

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error("❌ Global proxy error:", error.message);

    return NextResponse.json(
      { error: "Proxy failed", detail: error.message },
      { status: 500 }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;