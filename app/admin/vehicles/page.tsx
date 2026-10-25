import { prisma } from "@/lib/prisma";
import VehicleAdmin from "@/components/admin/VehicleAdmin";

export const dynamic = "force-dynamic";

export default async function VehiclesAdminPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: { seasonalRates: true },
    orderBy: [{ status: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });
  return (
    <div>
      <h1>Vehicles</h1>
      <p>Card list with photo preview. Edit opens a clean panel — seasonal rates live there, not in the list.</p>
      <VehicleAdmin vehicles={JSON.parse(JSON.stringify(vehicles))} />
    </div>
  );
}
