import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

async function handler(request, { params }) {
  if (!BACKEND_URL) {
    return NextResponse.json({ error: "Backend URL missing" }, { status: 500 });
  }

  // ✅ Fix params
//   const pathSegments = params.path || [];
//   const path = pathSegments.join("/");

const pathSegments = params?.path;

if (!pathSegments || pathSegments.length === 0) {
  return NextResponse.json(
    { error: "Missing API path" },
    { status: 400 }
  );
}

const path = pathSegments.join("/");

  const url = new URL(request.url);
  const queryString = url.search;

  const cookieStore = cookies();
//   const token = cookieStore.get("auth_token")?.value;

const cookieHeader = request.headers.get("cookie") || "";

const token = cookieHeader
  .split("; ")
  .find(c => c.startsWith("auth_token="))
  ?.split("=")[1];

//   const headers = {
//     "Content-Type": "application/json",
//     ...(token && { Cookie: `auth_token=${token}` }),
//   };

const headers = {
  "Content-Type": "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
};

  let body;
  if (["POST", "PUT", "PATCH"].includes(request.method)) {
    body = await request.text();
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/${path}${queryString}`, {
      method: request.method,
      headers,
      ...(body && { body }),
    });

    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error("Proxy error:", error.message);

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