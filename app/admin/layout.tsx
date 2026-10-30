import type { Metadata } from "next";
import Link from "next/link";
import { getAdminRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin | Arora Cars",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = await getAdminRole();
  const isCeo = role === "developer";

  if (!role) {
    return (
      <div className="admin-main" style={{ minHeight: "100vh" }}>
        {children}
      </div>
    );
  }

  return (
    <div className={`admin-shell ${isCeo ? "admin-shell-ceo" : ""}`}>
      <aside className="admin-side">
        <div className="ac-logo" style={{ marginBottom: 8 }}>
          ARORA<span>CARS</span>
        </div>
        <p style={{ fontSize: 12, opacity: 0.7, margin: "0 0 16px" }}>
          {isCeo ? "CEO command desk" : "Full admin · CMS"}
        </p>

        {isCeo ? (
          <>
            <Link href="/admin">Command board</Link>
            <Link href="/admin#post-enquiry">Post enquiry</Link>
            <Link href="/admin/bookings">Bookings inbox</Link>
            <Link href="/admin/vehicles">Fleet cards</Link>
            <Link href="/admin/settings">Contact numbers</Link>
            <Link href="/">View site</Link>
          </>
        ) : (
          <>
            <Link href="/admin">Overview</Link>
            <Link href="/admin/vehicles">Vehicles</Link>
            <Link href="/admin/vehicle-locations">Vehicle locations</Link>
            <Link href="/admin/locations">Locations</Link>
            <Link href="/admin/services">Services</Link>
            <Link href="/admin/routes">Routes</Link>
            <Link href="/admin/seo-pages">SEO pages</Link>
            <Link href="/admin/blogs">Blog</Link>
            <Link href="/admin/bookings">Bookings</Link>
            <Link href="/admin/settings">Contact settings</Link>
            <Link href="/admin/pages">Page copy</Link>
            <Link href="/">View site</Link>
          </>
        )}

        <form action="/api/admin/logout" method="POST" style={{ marginTop: 24 }}>
          <button type="submit" className="admin-btn" style={{ width: "100%" }}>
            Sign out
          </button>
        </form>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
