import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isDeveloperAllowedPath, parseAdminRole } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get("ac_admin")?.value;
  const role = parseAdminRole(token);

  if (!role) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Developer: product cards only — block SEO / CMS / bookings / settings
  if (role === "developer" && !isDeveloperAllowedPath(pathname)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Forbidden — developer scope is product cards only" },
        { status: 403 }
      );
    }
    return NextResponse.redirect(new URL("/admin/vehicles", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
