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
      ...(token && { Authorization: `Bearer ${token}` }),
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