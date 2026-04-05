// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const body = await request.json();

//   // Forward to your real backend
//   const res = await fetch(`${process.env.BACKEND_URL}/api/admin/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//     credentials: "include",
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     return NextResponse.json(data, { status: res.status });
//   }

//   // ✅ Set cookie on Next.js domain — middleware WILL see this
//   const response = NextResponse.json(data);
  
//   // Extract token from backend's Set-Cookie header
//   const setCookieHeader = res.headers.get("set-cookie");
  
//   if (setCookieHeader) {
//     // Forward the cookie directly from backend response
//     response.headers.set("set-cookie", setCookieHeader);
//   }

//   return response;
// }
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     const res = await fetch(`${process.env.BACKEND_URL}/api/admin/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       return NextResponse.json(data, { status: res.status });
//     }

//     // ✅ MUST be JWT token
//     const token = data.token;

//     if (!token) {
//       return NextResponse.json(
//         { error: "Token missing from backend" },
//         { status: 500 }
//       );
//     }

//     const response = NextResponse.json({
//       success: true,
//       user: data.user || null,
//     });

//     // ✅ MATCH middleware expectations
//     response.cookies.set("auth_token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       path: "/",
//       maxAge: 60 * 60 * 24 * 7,
//     });

//     return response;

//   } catch (error) {
//     console.error("Login error:", error.message);

//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(`${process.env.BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // ✅ Safe parse
    let data;
    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error("❌ Backend non-JSON:", text);
      return NextResponse.json(
        { error: "Invalid backend response", raw: text },
        { status: 500 }
      );
    }

    // ❌ login failed
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json({
      success: true,
      user: data.admin || null,
    });

    // ✅ VERY IMPORTANT: forward backend cookie
    const setCookie = res.headers.get("set-cookie");

    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }

    return response;

  } catch (error) {
    console.error("❌ Login error:", error.message);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}