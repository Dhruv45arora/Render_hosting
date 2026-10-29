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

const ALLOWED_KEYS = new Set<keyof SiteSettings>([
  "phone",
  "whatsapp",
  "email",
  "yearsInBusiness",
  "fleetCount",
]);

export async function getSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany();
    const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return {
      ...DEFAULTS,
      ...map,
      phone: map.phone || DEFAULT_PHONE,
      whatsapp: map.whatsapp || DEFAULT_WHATSAPP,
    };
  } catch {
    return DEFAULTS;
  }
}

export async function setSetting(key: string, value: string) {
  if (!ALLOWED_KEYS.has(key as keyof SiteSettings)) {
    throw new Error(`Setting "${key}" is not editable.`);
  }
  const trimmed = value.trim();
  if ((key === "phone" || key === "whatsapp") && !/^\d{10}$/.test(trimmed)) {
    throw new Error("Phone / WhatsApp must be a 10-digit Indian mobile number.");
  }
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value: trimmed },
    create: { key, value: trimmed },
  });
}
