import { prisma } from "./prisma";
import { DEFAULT_EMAIL, DEFAULT_PHONE, DEFAULT_WHATSAPP } from "./constants";
import type { AdminRole } from "./auth";

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

/** Phone / WhatsApp — owner only. CEO desk cannot change these. */
export const OWNER_ONLY_SETTING_KEYS = ["phone", "whatsapp"] as const;

const ALLOWED_KEYS = new Set<keyof SiteSettings>([
  "phone",
  "whatsapp",
  "email",
  "yearsInBusiness",
  "fleetCount",
]);

export function isOwnerOnlySettingKey(key: string): boolean {
  return (OWNER_ONLY_SETTING_KEYS as readonly string[]).includes(key);
}

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

export async function setSetting(key: string, value: string, role: AdminRole = "admin") {
  if (!ALLOWED_KEYS.has(key as keyof SiteSettings)) {
    throw new Error(`Setting "${key}" is not editable.`);
  }
  if (role === "developer" && isOwnerOnlySettingKey(key)) {
    throw new Error(`CEO desk cannot change ${key}. Contact the site owner.`);
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
