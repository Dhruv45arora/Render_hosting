import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | Arora Cars",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="ac-logo" style={{ marginBottom: 20 }}>
          ARORA<span>CARS</span>
        </div>
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
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
