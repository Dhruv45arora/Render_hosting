import { PrismaClient } from "@prisma/client";
import { SEED_VEHICLES } from "../data/vehicles";

const DEFAULT_PHONE = "8057772925";
const DEFAULT_WHATSAPP = "8057772925";
const DEFAULT_EMAIL = "info@aroracars.com";

const prisma = new PrismaClient();

async function main() {
  for (const v of SEED_VEHICLES) {
    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: { ...v },
      create: { ...v },
    });
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
      update: { value },
      create: { key, value },
    });
  }

  console.log(`Seeded ${SEED_VEHICLES.length} vehicles and site settings.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
