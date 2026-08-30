import { prisma } from "./prisma";

export async function getAllVehicles() {
  try {
    return await prisma.vehicle.findMany({ orderBy: [{ featured: "desc" }, { pricePerDay: "asc" }] });
  } catch {
    return [];
  }
}

export async function getVehicleBySlug(slug: string) {
  try {
    return await prisma.vehicle.findUnique({
      where: { slug },
      include: { seasonalRates: true },
    });
  } catch {
    return null;
  }
}

export async function getVehiclesByCategory(category?: string, drive?: string) {
  try {
    return await prisma.vehicle.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(drive
          ? {
              OR: [{ driveType: drive }, { driveType: "both" }],
            }
          : {}),
      },
      orderBy: [{ featured: "desc" }, { pricePerDay: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getFeaturedVehicles(take = 8) {
  try {
    const featured = await prisma.vehicle.findMany({
      where: { featured: true },
      take,
      orderBy: { pricePerDay: "asc" },
    });
    if (featured.length) return featured;
    return prisma.vehicle.findMany({ take, orderBy: { pricePerDay: "asc" } });
  } catch {
    return [];
  }
}

export function effectivePrice(vehicle: {
  pricePerDay: number;
  seasonalRates?: { startDate: string; endDate: string; pricePerDay: number }[];
}) {
  const today = new Date().toISOString().slice(0, 10);
  const hit = vehicle.seasonalRates?.find((r) => r.startDate <= today && r.endDate >= today);
  return hit?.pricePerDay ?? vehicle.pricePerDay;
}
