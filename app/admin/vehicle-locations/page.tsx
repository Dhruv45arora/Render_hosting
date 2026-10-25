import { prisma } from "@/lib/prisma";
import VehicleLocationsAdmin from "@/components/admin/VehicleLocationsAdmin";

export const dynamic = "force-dynamic";

export default async function VehicleLocationsAdminPage() {
  const [links, vehicles, locations] = await Promise.all([
    prisma.vehicleLocation.findMany({
      include: {
        vehicle: { select: { id: true, name: true, slug: true, status: true } },
        location: { select: { id: true, name: true, slug: true, serviceMode: true } },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.vehicle.findMany({
      where: { status: { not: "ARCHIVED" } },
      select: { id: true, name: true, slug: true, status: true },
      orderBy: { name: "asc" },
    }),
    prisma.location.findMany({
      where: { active: true },
      select: { id: true, name: true, slug: true, serviceMode: true },
      orderBy: { name: "asc" },
    }),
  ]);
  return (
    <div>
      <h1>Vehicle ↔ location</h1>
      <p>Per-city availability and optional local pricing. Mark seoEligible only when a vehicle×city page is truthful.</p>
      <VehicleLocationsAdmin
        links={JSON.parse(JSON.stringify(links))}
        vehicles={JSON.parse(JSON.stringify(vehicles))}
        locations={JSON.parse(JSON.stringify(locations))}
      />
    </div>
  );
}
