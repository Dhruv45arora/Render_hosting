const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

async function main() {
  const p = new PrismaClient();
  const slug = "auto-rickshaw-full-day-dehradun";
  const v = await p.vehicle.findUnique({ where: { slug } });
  if (!v) {
    console.log("Vehicle not found");
    await p.$disconnect();
    return;
  }
  console.log("BEFORE", {
    id: v.id,
    imageLen: (v.image || "").length,
    imageStart: (v.image || "").slice(0, 80),
  });

  const src = path.join(__dirname, "..", "download.jpeg");
  const destDir = path.join(__dirname, "..", "public", "images", "fleet");
  const destName = "auto-rickshaw-full-day.jpg";
  const dest = path.join(destDir, destName);
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);

  const publicPath = `/images/fleet/${destName}`;
  const updated = await p.vehicle.update({
    where: { id: v.id },
    data: { image: publicPath },
  });
  console.log("AFTER", {
    id: updated.id,
    image: updated.image,
  });
  await p.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
