import { prisma } from "@/lib/prisma";
import ServicesAdmin from "@/components/admin/ServicesAdmin";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: { _count: { select: { locations: true, seoPages: true } } },
  });
  return (
    <div>
      <h1>Services</h1>
      <p>
        CMS service types (self drive, taxi, airport, wedding, etc.). Public taxi SEO pages live at{" "}
        <a href="/taxi">/taxi</a> — this list is the admin catalog, not the full URL set.
      </p>
      <ServicesAdmin services={JSON.parse(JSON.stringify(services))} />
    </div>
  );
}
