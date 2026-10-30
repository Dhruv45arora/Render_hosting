import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminRole } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { CATEGORY_LABELS } from "@/lib/constants";
import CeoDashboard, { type PieSlice } from "@/components/admin/CeoDashboard";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  new: "#e8a33d",
  confirmed: "#2f6b4f",
  done: "#3d7ea6",
  cancelled: "#a63d3d",
};

const CAT_COLORS = ["#1f3b2c", "#e8a33d", "#3d7ea6", "#6b4f2f", "#5a7a62", "#8b5a2b", "#314038", "#c17a2e", "#4a6741"];

export default async function AdminHome() {
  const role = await getAdminRole();

  if (!role) {
    redirect("/admin/login");
  }

  if (role === "developer") {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [bookings, vehicles, settings, recent, fleet] = await Promise.all([
      prisma.booking.findMany({ select: { status: true, createdAt: true } }),
      prisma.vehicle.findMany({
        where: { status: { not: "ARCHIVED" } },
        select: { status: true, category: true },
      }),
      getSettings(),
      prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          name: true,
          phone: true,
          vehicleName: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.vehicle.findMany({
        where: { status: "ACTIVE" },
        select: { slug: true, name: true, category: true },
        orderBy: [{ category: "asc" }, { name: "asc" }],
      }),
    ]);

    const byStatus: Record<string, number> = { new: 0, confirmed: 0, done: 0, cancelled: 0 };
    let weekBookings = 0;
    for (const b of bookings) {
      byStatus[b.status] = (byStatus[b.status] || 0) + 1;
      if (b.createdAt >= weekAgo) weekBookings += 1;
    }

    const byCat: Record<string, number> = {};
    let activeVehicles = 0;
    let inactiveVehicles = 0;
    for (const v of vehicles) {
      if (v.status === "ACTIVE") activeVehicles += 1;
      else inactiveVehicles += 1;
      byCat[v.category] = (byCat[v.category] || 0) + 1;
    }

    const statusPie: PieSlice[] = (["new", "confirmed", "done", "cancelled"] as const).map((s) => ({
      label: s,
      value: byStatus[s] || 0,
      color: STATUS_COLORS[s] || "#888",
    }));

    const categoryPie: PieSlice[] = Object.entries(byCat)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, value], i) => ({
        label: CATEGORY_LABELS[cat] || cat,
        value,
        color: CAT_COLORS[i % CAT_COLORS.length],
      }));

    return (
      <CeoDashboard
        data={{
          kpis: {
            newBookings: byStatus.new || 0,
            confirmed: byStatus.confirmed || 0,
            done: byStatus.done || 0,
            cancelled: byStatus.cancelled || 0,
            totalBookings: bookings.length,
            activeVehicles,
            inactiveVehicles,
            weekBookings,
          },
          statusPie,
          categoryPie,
          recent: JSON.parse(JSON.stringify(recent)),
          fleet: JSON.parse(JSON.stringify(fleet)),
          phone: settings.phone,
          whatsapp: settings.whatsapp,
        }}
      />
    );
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
        Full CMS admin — SEO and copy stay here. Site renter uses the CEO desk login (ops only).
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
          <p>Live phone</p>
          <Link href="/admin/settings">Contact settings</Link>
        </div>
      </div>
    </div>
  );
}
