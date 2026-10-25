import { PrismaClient } from "@prisma/client";
import { loadEnv } from "./load-env";

loadEnv();
const prisma = new PrismaClient();

async function main() {
  const row = await prisma.service.upsert({
    where: { slug: "taxi" },
    create: {
      name: "Taxi Service (Uttarakhand)",
      slug: "taxi",
      description:
        "Local, outstation, airport and pilgrimage taxi enquiries across Uttarakhand. Public hub: /taxi",
      active: true,
      sortOrder: 25,
    },
    update: {
      name: "Taxi Service (Uttarakhand)",
      description:
        "Local, outstation, airport and pilgrimage taxi enquiries across Uttarakhand. Public hub: /taxi",
      active: true,
      sortOrder: 25,
    },
  });
  console.log(JSON.stringify({ ok: true, id: row.id, slug: row.slug, name: row.name }, null, 2));
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
