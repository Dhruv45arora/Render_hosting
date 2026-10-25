import { prisma } from "./prisma";

const publicVehicleWhere = { status: "ACTIVE" as const };

export async function getAllVehicles() {
  try {
    return await prisma.vehicle.findMany({
      where: publicVehicleWhere,
      orderBy: [{ sortOrder: "asc" }, { featured: "desc" }, { pricePerDay: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getVehicleBySlug(slug: string) {
  try {
    const row = await prisma.vehicle.findUnique({
      where: { slug },
      include: { seasonalRates: true },
    });
    if (!row || row.status !== "ACTIVE") return null;
    return row;
  } catch {
    return null;
  }
}

export async function getVehiclesByCategory(category?: string, drive?: string) {
  try {
    return await prisma.vehicle.findMany({
      where: {
        ...publicVehicleWhere,
        ...(category ? { category } : {}),
        ...(drive
          ? {
              OR: [{ driveType: drive }, { driveType: "both" }],
            }
          : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { featured: "desc" }, { pricePerDay: "asc" }],
    });
  } catch {
    return [];
  }
}

export async function getFeaturedVehicles(take = 8) {
  try {
    const featured = await prisma.vehicle.findMany({
      where: { featured: true, ...publicVehicleWhere },
      take,
      orderBy: [{ sortOrder: "asc" }, { pricePerDay: "asc" }],
    });
    if (featured.length) return featured;
    return prisma.vehicle.findMany({
      where: publicVehicleWhere,
      take,
      orderBy: [{ sortOrder: "asc" }, { pricePerDay: "asc" }],
    });
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
