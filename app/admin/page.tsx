import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const role = await getAdminRole();

  if (role === "developer") {
    const [active, inactive, archived] = await Promise.all([
      prisma.vehicle.count({ where: { status: "ACTIVE" } }),
      prisma.vehicle.count({ where: { status: "INACTIVE" } }),
      prisma.vehicle.count({ where: { status: "ARCHIVED" } }),
    ]);

    return (
      <div>
        <h1>Product cards</h1>
        <p style={{ opacity: 0.8, fontSize: 14, maxWidth: 520 }}>
          Developer scope — edit vehicle cards (name, price, photo, status, seasonal rates).
          SEO pages, blogs, and site copy are locked.
        </p>
        <div className="ac-grid cols-3" style={{ marginTop: 20 }}>
          <div className="ac-card">
            <h3>{active}</h3>
            <p>Active cards</p>
            <Link href="/admin/vehicles">Manage</Link>
          </div>
          <div className="ac-card">
            <h3>{inactive}</h3>
            <p>Inactive</p>
            <Link href="/admin/vehicles">Review</Link>
          </div>
          <div className="ac-card">
            <h3>{archived}</h3>
            <p>Archived</p>
            <Link href="/admin/vehicles">Review</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!role) {
    redirect("/admin/login");
  }

  const [
    vehicles,
    bookings,
    locations,
    services,
    routes,
    seoPages,
    blogs,
    vehicleLinks,
    settings,
  ] = await Promise.all([
    prisma.vehicle.count({ where: { status: { not: "ARCHIVED" } } }),
    prisma.booking.count(),
    prisma.location.count({ where: { active: true } }),
    prisma.service.count({ where: { active: true } }),
    prisma.route.count({ where: { active: true } }),
    prisma.seoPage.count(),
    prisma.blogPost.count({ where: { status: { not: "ARCHIVED" } } }),
    prisma.vehicleLocation.count({ where: { active: true } }),
    prisma.siteSetting.findMany(),
  ]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ opacity: 0.8, fontSize: 14 }}>
        Full CMS admin — SEO and copy stay here; give developers the product-card login instead.
      </p>
      <div className="ac-grid cols-3" style={{ marginTop: 20 }}>
        <div className="ac-card">
          <h3>{vehicles}</h3>
          <p>Active vehicles</p>
          <Link href="/admin/vehicles">Manage</Link>
        </div>
        <div className="ac-card">
          <h3>{vehicleLinks}</h3>
          <p>Vehicle–location links</p>
          <Link href="/admin/vehicle-locations">Assign</Link>
        </div>
        <div className="ac-card">
          <h3>{locations}</h3>
          <p>Active locations</p>
          <Link href="/admin/locations">Manage</Link>
        </div>
        <div className="ac-card">
          <h3>{services}</h3>
          <p>Active services</p>
          <Link href="/admin/services">Manage</Link>
        </div>
        <div className="ac-card">
          <h3>{routes}</h3>
          <p>Active routes</p>
          <Link href="/admin/routes">Manage</Link>
        </div>
        <div className="ac-card">
          <h3>{seoPages}</h3>
          <p>SEO pages (CMS)</p>
          <Link href="/admin/seo-pages">Manage</Link>
        </div>
        <div className="ac-card">
          <h3>{blogs}</h3>
          <p>Blog posts</p>
          <Link href="/admin/blogs">Manage</Link>
        </div>
        <div className="ac-card">
          <h3>{bookings}</h3>
          <p>Booking requests</p>
          <Link href="/admin/bookings">Inbox</Link>
        </div>
        <div className="ac-card">
          <h3>{settings.find((s) => s.key === "phone")?.value || "—"}</h3>
          <p>Live phone (locked)</p>
          <Link href="/admin/settings">Contact settings</Link>
        </div>
      </div>
    </div>
  );
}
