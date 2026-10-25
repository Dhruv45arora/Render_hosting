/**
 * Bootstrap seed only.
 * - Creates missing Dehradun vehicles from data/vehicles.ts
 * - Does NOT overwrite existing vehicle rows (protects admin CMS edits)
 * - Does NOT overwrite existing SiteSetting values
 * - Never run automatically on production build (see package.json)
 */
import { PrismaClient } from "@prisma/client";
import { SEED_VEHICLES } from "../data/vehicles";

const DEFAULT_PHONE = "8445619130";
const DEFAULT_WHATSAPP = "8445619130";
const DEFAULT_EMAIL = "info@aroracars.com";

const prisma = new PrismaClient();

async function main() {
  let created = 0;
  let skipped = 0;

  for (const v of SEED_VEHICLES) {
    const existing = await prisma.vehicle.findUnique({ where: { slug: v.slug } });
    if (existing) {
      skipped += 1;
      continue;
    }
    await prisma.vehicle.create({
      data: {
        ...v,
        brand: "",
        status: "ACTIVE",
        features: "[]",
        sortOrder: 0,
      },
    });
    created += 1;
  }

  const settings: [string, string][] = [
    ["phone", DEFAULT_PHONE],
    ["whatsapp", DEFAULT_WHATSAPP],
    ["email", DEFAULT_EMAIL],
    ["yearsInBusiness", "8"],
    ["fleetCount", String(SEED_VEHICLES.length) + "+"],
  ];
  for (const [key, value] of settings) {
    await prisma.siteSetting.upsert({
      where: { key },
      // Never overwrite admin/CMS values on re-seed
      update: {},
      create: { key, value },
    });
  }

  console.log(
    `Seed complete. Vehicles created: ${created}, already present (skipped): ${skipped}. Settings created only if missing.`
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
