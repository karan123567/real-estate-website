import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  // Forward to your real backend
  const res = await fetch(`${process.env.BACKEND_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  // ✅ Set cookie on Next.js domain — middleware WILL see this
  const response = NextResponse.json(data);
  
  // Extract token from backend's Set-Cookie header
  const setCookieHeader = res.headers.get("set-cookie");
  
  if (setCookieHeader) {
    // Forward the cookie directly from backend response
    response.headers.set("set-cookie", setCookieHeader);
  }

  return response;
}