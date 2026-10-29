import { prisma } from "@/lib/prisma";
import BookingsAdmin from "@/components/admin/BookingsAdmin";
import { getAdminRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const role = await getAdminRole();
  const rows = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1>{role === "developer" ? "Bookings" : "Bookings inbox"}</h1>
      {role === "developer" && (
        <p style={{ opacity: 0.8, fontSize: 14, marginTop: 0 }}>
          Update enquiry status — new → confirmed → done. Charts live on Overview.
        </p>
      )}
      <BookingsAdmin rows={JSON.parse(JSON.stringify(rows))} />
    </div>
  );
}
