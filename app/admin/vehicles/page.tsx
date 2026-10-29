import { prisma } from "@/lib/prisma";
import VehicleAdmin from "@/components/admin/VehicleAdmin";
import { getAdminRole } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function VehiclesAdminPage() {
  const role = await getAdminRole();
  const vehicles = await prisma.vehicle.findMany({
    include: { seasonalRates: true },
    orderBy: [{ status: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  });
  const isCeo = role === "developer";
  return (
    <div>
      <h1>{isCeo ? "Product cards" : "Vehicles"}</h1>
      <p>
        {isCeo
          ? "Change prices, photos, deposits and active status. SEO and blog content stay locked."
          : "Card list with photo preview. Edit opens a clean panel — seasonal rates live there, not in the list."}
      </p>
      <VehicleAdmin vehicles={JSON.parse(JSON.stringify(vehicles))} />
    </div>
  );
}
