import { LANDING_PAGES } from "@/data/pages";
import { prisma } from "@/lib/prisma";
import PagesAdmin from "@/components/admin/PagesAdmin";

export const dynamic = "force-dynamic";

export default async function PagesAdminPage() {
  const overrides = await prisma.pageOverride.findMany();
  return (
    <div>
      <h1>Landing page copy</h1>
      <p>Override hero text and a pricing blurb without redeploying.</p>
      <PagesAdmin pages={LANDING_PAGES.map((p) => p.slug)} overrides={overrides} />
    </div>
  );
}
