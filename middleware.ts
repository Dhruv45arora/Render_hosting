import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }
  const token = req.cookies.get("ac_admin")?.value;
  if (!verifyAdminToken(token)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
