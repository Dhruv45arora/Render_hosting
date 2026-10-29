/**
 * Fix vehicles whose image points at ephemeral /uploads/... (404 on Render).
 * Pins auto-rickshaw-full-day to the committed fleet jpeg.
 */
const { PrismaClient } = require("@prisma/client");

const CATEGORY_FALLBACK = {
  bike: "/images/fleet/bike-commuter.jpg",
  scooty: "/images/fleet/scooty-activa.jpg",
  car: "/images/fleet/hatchback-silver.jpg",
  suv: "/images/fleet/suv-compact-white.jpg",
  luxury: "/images/fleet/luxury-sedan-black.jpg",
  wedding: "/images/categories/wedding-car-dehradun.jpg",
  tempo: "/images/fleet/tempo-traveller-white.jpg",
  three_wheeler: "/images/categories/auto-dehradun.jpg",
  chota_hathi: "/images/categories/minitruck-dehradun.jpg",
};

const PIN = {
  "auto-rickshaw-full-day-dehradun": "/images/fleet/auto-rickshaw-full-day.jpg",
};

async function main() {
  const prisma = new PrismaClient();
  const rows = await prisma.vehicle.findMany({
    select: { id: true, slug: true, image: true, category: true },
  });

  let fixed = 0;
  for (const row of rows) {
    const pin = PIN[row.slug];
    if (pin && row.image !== pin) {
      await prisma.vehicle.update({ where: { id: row.id }, data: { image: pin } });
      fixed += 1;
      console.log(`pinned ${row.slug} -> ${pin}`);
      continue;
    }

    const broken =
      !row.image ||
      row.image.startsWith("/uploads/") ||
      row.image.startsWith("blob:");
    if (!broken) continue;

    const next = CATEGORY_FALLBACK[row.category] || "/images/fleet/hatchback-silver.jpg";
    await prisma.vehicle.update({ where: { id: row.id }, data: { image: next } });
    fixed += 1;
    console.log(`fixed ${row.slug} -> ${next}`);
  }

  console.log(`repair-broken-vehicle-images: updated ${fixed} row(s)`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
