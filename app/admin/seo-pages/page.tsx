import { prisma } from "@/lib/prisma";
import SeoPagesAdmin from "@/components/admin/SeoPagesAdmin";

export const dynamic = "force-dynamic";

export default async function SeoPagesAdminPage() {
  const [pages, locations, vehicles, services, routes] = await Promise.all([
    prisma.seoPage.findMany({
      orderBy: [{ updatedAt: "desc" }],
      include: {
        location: { select: { id: true, name: true, slug: true } },
        vehicle: { select: { id: true, name: true, slug: true } },
        service: { select: { id: true, name: true, slug: true } },
        route: { select: { id: true, slug: true } },
      },
      take: 500,
    }),
    prisma.location.findMany({ select: { id: true, name: true, slug: true }, orderBy: { name: "asc" } }),
    prisma.vehicle.findMany({
      where: { status: { not: "ARCHIVED" } },
      select: { id: true, name: true, slug: true },
      orderBy: { name: "asc" },
    }),
    prisma.service.findMany({ select: { id: true, name: true, slug: true }, orderBy: { name: "asc" } }),
    prisma.route.findMany({ select: { id: true, slug: true }, orderBy: { slug: "asc" } }),
  ]);
  return (
    <div>
      <h1>SEO pages</h1>
      <p>Create and edit CMS landing pages. Use filters to find drafts — taxi live pages are also at /taxi.</p>
      <SeoPagesAdmin
        pages={JSON.parse(JSON.stringify(pages))}
        locations={JSON.parse(JSON.stringify(locations))}
        vehicles={JSON.parse(JSON.stringify(vehicles))}
        services={JSON.parse(JSON.stringify(services))}
        routes={JSON.parse(JSON.stringify(routes))}
      />
    </div>
  );
}
