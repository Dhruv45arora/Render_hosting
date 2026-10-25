import { prisma } from "@/lib/prisma";
import RoutesAdmin from "@/components/admin/RoutesAdmin";

export const dynamic = "force-dynamic";

export default async function RoutesAdminPage() {
  const [routes, locations] = await Promise.all([
    prisma.route.findMany({
      orderBy: [{ seoPriority: "desc" }, { slug: "asc" }],
      include: {
        origin: { select: { id: true, name: true, slug: true } },
        destination: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.location.findMany({
      where: { active: true },
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
    }),
  ]);
  return (
    <div>
      <h1>Routes</h1>
      <p>Origin → destination corridors. Only set priceFrom when verified.</p>
      <RoutesAdmin
        routes={JSON.parse(JSON.stringify(routes))}
        locations={JSON.parse(JSON.stringify(locations))}
      />
    </div>
  );
}
