import { prisma } from "./prisma";
import { DEFAULT_EMAIL, DEFAULT_PHONE, DEFAULT_WHATSAPP } from "./constants";

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  yearsInBusiness: string;
  fleetCount: string;
};

const DEFAULTS: SiteSettings = {
  phone: DEFAULT_PHONE,
  whatsapp: DEFAULT_WHATSAPP,
  email: DEFAULT_EMAIL,
  yearsInBusiness: "8",
  fleetCount: "141+",
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...DEFAULTS, ...map };
  } catch {
    return DEFAULTS;
  }
}

export async function setSetting(key: string, value: string) {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
