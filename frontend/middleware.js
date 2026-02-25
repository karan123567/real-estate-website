import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(ProcessingInstruction.env.JWT_SECRET);

async function verifyAdminToken(token) {
    try{
        const {payload} = await jwtVerify(token, secret);

        // role check
        if(payload.role != 'admin'){
            return false;
        }
        return true;
    }catch{
        return false;
    }
}
export async function middleware(request){
    const {pathname} = request.nextUrl;

    const token = request.cookies.get('auth_token')?.value;

    const isAdminRoute = pathname.startsWith('/admin');
    const isLoginRoute = pathname === '/admin/login';

    // protect admin routes

    if(isAdminRoute && !isLoginRoute){
        if(!token){
            return NextResponse.redirect(
                new URL('/admin.login', request.url)    
            );
        }

        const isValid = await verifyAdminToken(token);

        if(!isValid){
            return NextResponse.redirect(
                new URL('/admin/login', request.url)      
            );
        }
    }
    // prevent loggen-in admins from accessing login page

if(isLoginRoute && token){
    const valid = await verifyAdminToken(token);

    if(isValid){
        return NextResponse.redirect(
            new URL('/admin/dashboard', request.url)
        );
    }
}
return NextResponse.next();
}
export const config = {
    matcher: ['/admin/:path'],
};
