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

  // CEO desk: ops only — block SEO / blogs / CMS copy
  if (role === "developer" && !isDeveloperAllowedPath(pathname)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Forbidden — CEO desk cannot edit SEO, blogs, or page copy" },
        { status: 403 }
      );
    }
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
