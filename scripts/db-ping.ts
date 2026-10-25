import { PrismaClient } from "@prisma/client";
import { loadEnv } from "./load-env";

loadEnv();
const prisma = new PrismaClient();

async function main() {
  await prisma.$queryRaw`SELECT 1 as ok`;
  const [vehicles, locations, seoPages, blogs, bookings] = await Promise.all([
    prisma.vehicle.count(),
    prisma.location.count(),
    prisma.seoPage.count(),
    prisma.blogPost.count(),
    prisma.booking.count(),
  ]);
  console.log(
    JSON.stringify(
      {
        ok: true,
        host: (process.env.DATABASE_URL || "").includes("neon.tech") ? "Neon" : "other",
        vehicles,
        locations,
        seoPages,
        blogs,
        bookings,
      },
      null,
      2
    )
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(JSON.stringify({ ok: false, error: e instanceof Error ? e.message : String(e) }));
    await prisma.$disconnect();
    process.exit(1);
  });
