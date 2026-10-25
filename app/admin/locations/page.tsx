import { prisma } from "@/lib/prisma";
import LocationsAdmin from "@/components/admin/LocationsAdmin";

export const dynamic = "force-dynamic";

export default async function LocationsAdminPage() {
  const locations = await prisma.location.findMany({
    orderBy: [{ seoPriority: "desc" }, { name: "asc" }],
    include: { _count: { select: { vehicleLinks: true, services: true, seoPages: true } } },
  });
  return (
    <div>
      <h1>Locations</h1>
      <p>Cities and service areas. OWN_FLEET = Dehradun-style fleet truth; PARTNER = enquiry / partner coverage.</p>
      <LocationsAdmin locations={JSON.parse(JSON.stringify(locations))} />
    </div>
  );
}
