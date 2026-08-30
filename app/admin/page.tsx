import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [vehicles, bookings, settings] = await Promise.all([
    prisma.vehicle.count(),
    prisma.booking.count(),
    prisma.siteSetting.findMany(),
  ]);
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="ac-grid cols-3" style={{ marginTop: 20 }}>
        <div className="ac-card">
          <h3>{vehicles}</h3>
          <p>Vehicles</p>
          <Link href="/admin/vehicles">Manage</Link>
        </div>
        <div className="ac-card">
          <h3>{bookings}</h3>
          <p>Booking requests</p>
          <Link href="/admin/bookings">Inbox</Link>
        </div>
        <div className="ac-card">
          <h3>{settings.find((s) => s.key === "phone")?.value || "—"}</h3>
          <p>Live phone / WhatsApp number</p>
          <Link href="/admin/settings">Edit once, updates everywhere</Link>
        </div>
      </div>
    </div>
  );
}
