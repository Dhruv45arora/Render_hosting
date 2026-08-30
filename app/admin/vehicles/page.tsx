import { prisma } from "@/lib/prisma";
import VehicleAdmin from "@/components/admin/VehicleAdmin";

export const dynamic = "force-dynamic";

export default async function VehiclesAdminPage() {
  const vehicles = await prisma.vehicle.findMany({
    include: { seasonalRates: true },
    orderBy: { name: "asc" },
  });
  return (
    <div>
      <h1>Vehicles</h1>
      <p>Add, edit, hide, and set seasonal prices. Public /rent pages read this table.</p>
      <VehicleAdmin vehicles={JSON.parse(JSON.stringify(vehicles))} />
    </div>
  );
}
