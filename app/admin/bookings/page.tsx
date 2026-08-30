import { prisma } from "@/lib/prisma";
import BookingsAdmin from "@/components/admin/BookingsAdmin";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const rows = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1>Bookings inbox</h1>
      <BookingsAdmin rows={JSON.parse(JSON.stringify(rows))} />
    </div>
  );
}
