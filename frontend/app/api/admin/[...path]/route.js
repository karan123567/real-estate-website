// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// const BACKEND_URL = process.env.BACKEND_URL;

// async function handler(request, { params }) {
//   if (!BACKEND_URL) {
//     return NextResponse.json({ error: "Backend URL missing" }, { status: 500 });
//   }

//   // ✅ Fix params
// //   const pathSegments = params.path || [];
// //   const path = pathSegments.join("/");

// const pathSegments = params?.path;

// if (!pathSegments || pathSegments.length === 0) {
//   return NextResponse.json(
//     { error: "Missing API path" },
//     { status: 400 }
//   );
// }

// const path = pathSegments.join("/");

//   const url = new URL(request.url);
//   const queryString = url.search;

//   const cookieStore = cookies();
// //   const token = cookieStore.get("auth_token")?.value;

// const cookieHeader = request.headers.get("cookie") || "";

// const token = cookieHeader
//   .split("; ")
//   .find(c => c.startsWith("auth_token="))
//   ?.split("=")[1];

// //   const headers = {
// //     "Content-Type": "application/json",
// //     ...(token && { Cookie: `auth_token=${token}` }),
// //   };

// const headers = {
//   "Content-Type": "application/json",
//   ...(token && { Authorization: `Bearer ${token}` }),
// };

//   let body;
//   if (["POST", "PUT", "PATCH"].includes(request.method)) {
//     body = await request.text();
//   }

//   try {
//     const res = await fetch(`${BACKEND_URL}/api/admin/${path}${queryString}`, {
//       method: request.method,
//       headers,
//       ...(body && { body }),
//     });

//     const data = await res.json().catch(() => ({}));

//     return NextResponse.json(data, { status: res.status });

//   } catch (error) {
//     console.error("Proxy error:", error.message);

//     return NextResponse.json(
//       { error: "Proxy failed", detail: error.message },
//       { status: 500 }
//     );
//   }
// }

// export const GET = handler;
// export const POST = handler;
// export const PUT = handler;
// export const DELETE = handler;
// export const PATCH = handler;


// import { NextResponse } from "next/server";

// const BACKEND_URL = process.env.BACKEND_URL;

// async function handler(request) {
//   try {
//     if (!BACKEND_URL) {
//       return NextResponse.json(
//         { error: "Backend URL missing" },
//         { status: 500 }
//       );
//     }

//     // ✅ Extract path manually (NO params dependency)
//     const url = new URL(request.url);

//     // Example: /api/admin/me → ["", "api", "admin", "me"]
//     const segments = url.pathname.split("/");

//     // Remove "", "api", "admin"
//     const pathSegments = segments.slice(3);
//     const path = pathSegments.join("/");

//     const queryString = url.search;

//     // ✅ Extract token from cookies manually
//     const cookieHeader = request.headers.get("cookie") || "";

//     const token = cookieHeader
//       .split("; ")
//       .find((c) => c.startsWith("auth_token="))
//       ?.split("=")[1];

//     // ✅ Send token as Bearer
//     const headers = {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     };

//     // ✅ Handle body safely
//     let body;
//     if (["POST", "PUT", "PATCH"].includes(request.method)) {
//       body = await request.text();
//     }

//     console.log("👉 Proxy:", request.method, `/api/admin/${path}`);

//     // ✅ Forward request to backend
//     const res = await fetch(
//       `${BACKEND_URL}/api/admin/${path}${queryString}`,
//       {
//         method: request.method,
//         headers,
//         ...(body && { body }),
//       }
//     );

//     // ✅ Safe JSON parsing
//     let data;
//     const contentType = res.headers.get("content-type") || "";

//     if (contentType.includes("application/json")) {
//       data = await res.json();
//     } else {
//       const text = await res.text();
//       console.error("❌ Non-JSON response:", text);
//       data = { error: text || "Backend error" };
//     }

//     return NextResponse.json(data, { status: res.status });

//   } catch (error) {
//     console.error("❌ Proxy crash:", error.message);

//     return NextResponse.json(
//       { error: "Proxy failed", detail: error.message },
//       { status: 500 }
//     );
//   }
// }

// // ✅ Support all methods
// export const GET = handler;
// export const POST = handler;
// export const PUT = handler;
// export const DELETE = handler;
// export const PATCH = handler;


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
    const segments = url.pathname.split("/");

    const pathSegments = segments.slice(3);
    const path = pathSegments.join("/");

    // 🚨 FIX: skip login/logout
    if (path === "login" || path === "logout") {
      return NextResponse.next();
    }

    const queryString = url.search;

    const cookieHeader = request.headers.get("cookie") || "";

    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("auth_token="))
      ?.split("=")[1];

    const headers = {
  "Content-Type": "application/json",
  ...(cookieHeader && { Cookie: cookieHeader }), // ✅ forward cookie
};

    let body;
    if (["POST", "PUT", "PATCH"].includes(request.method)) {
      body = await request.text();
    }

    console.log("👉 Proxy:", request.method, `/api/admin/${path}`);

    const res = await fetch(
      `${BACKEND_URL}/api/admin/${path}${queryString}`,
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
      console.error("❌ Non-JSON response:", text);
      data = { error: text || "Backend error" };
    }

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error("❌ Proxy crash:", error.message);

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


// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// const BACKEND_URL = process.env.BACKEND_URL;

// async function handler(request, { params }) {
//   try {
//     if (!BACKEND_URL) {
//       return NextResponse.json(
//         { error: "Backend URL missing" },
//         { status: 500 }
//       );
//     }

//     const { path: pathSegments } = await params;
//     const path = pathSegments.join("/");
//     const url = new URL(request.url);
//     const queryString = url.search;

//     // ✅ Read cookie from Next.js/Vercel domain
//     const cookieStore = await cookies();
//     const token = cookieStore.get("auth_token")?.value;

//     const headers = {
//       "Content-Type": "application/json",
//       ...(token && { Cookie: `auth_token=${token}` }),
//     };

//     // ✅ Safe body reading
//     let body = undefined;
//     if (["POST", "PUT", "PATCH"].includes(request.method)) {
//       try {
//         const text = await request.text();
//         if (text) body = text;
//       } catch {
//         body = undefined;
//       }
//     }

//     console.log(`→ Proxy: ${request.method} /api/admin/${path}`);

//     const res = await fetch(
//       `${BACKEND_URL}/api/admin/${path}${queryString}`,
//       {
//         method: request.method,
//         headers,
//         ...(body !== undefined && { body }),
//       }
//     );

//     // ✅ Safe JSON parsing
//     let data;
//     const contentType = res.headers.get("content-type") || "";
//     if (contentType.includes("application/json")) {
//       data = await res.json();
//     } else {
//       const text = await res.text();
//       console.error(`Non-JSON response [${res.status}]:`, text);
//       data = { error: text || "Backend error" };
//     }

//     console.log(`← ${res.status} /api/admin/${path}`);

//     // ✅ LOGIN — extract token and set cookie on Vercel domain
//     if (path === "login" && res.ok) {
//       const response = NextResponse.json(data, { status: res.status });

//       const setCookieHeader = res.headers.get("set-cookie");
//       let authToken = null;

//       if (setCookieHeader) {
//         const match = setCookieHeader.match(/auth_token=([^;]+)/);
//         if (match) authToken = match[1];
//       }

//       if (authToken) {
//         // ✅ Set on Vercel/frontend domain — middleware will see this
//         response.cookies.set("auth_token", authToken, {
//           httpOnly: true,
//           secure: true,
//           sameSite: "lax",
//           maxAge: 60 * 60 * 24, // 24 hours
//           path: "/",
//         });
//       }

//       return response;
//     }

//     // ✅ LOGOUT — clear cookie on Vercel domain
//     if (path === "logout") {
//       try {
//         await fetch(`${BACKEND_URL}/api/admin/logout`, {
//           method: "POST",
//           headers,
//         });
//       } catch {
//         console.log("Backend logout failed, clearing cookie anyway");
//       }

//       const response = NextResponse.json(
//         { success: true },
//         { status: 200 }
//       );

//       // Clear with multiple combos to ensure deletion
//       response.headers.append(
//         "Set-Cookie",
//         `auth_token=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`
//       );
//       response.headers.append(
//         "Set-Cookie",
//         `auth_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`
//       );

//       return response;
//     }

//     return NextResponse.json(data, { status: res.status });

//   } catch (error) {
//     console.error(`❌ Proxy crash:`, error.message);
//     return NextResponse.json(
//       { error: "Proxy failed", detail: error.message },
//       { status: 500 }
//     );
//   }
// }

// export const GET    = handler;
// export const POST   = handler;
// export const PUT    = handler;
// export const DELETE = handler;
// export const PATCH  = handler;