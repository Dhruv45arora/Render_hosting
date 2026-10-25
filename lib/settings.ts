import { prisma } from "./prisma";
import { DEFAULT_EMAIL, DEFAULT_PHONE, DEFAULT_WHATSAPP } from "./constants";

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  yearsInBusiness: string;
  fleetCount: string;
};

/** Keys that must never be changed through admin UI or admin API. */
export const PROTECTED_SETTING_KEYS = ["phone", "whatsapp"] as const;

export type ProtectedSettingKey = (typeof PROTECTED_SETTING_KEYS)[number];

export function isProtectedSettingKey(key: string): key is ProtectedSettingKey {
  return (PROTECTED_SETTING_KEYS as readonly string[]).includes(key);
}

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
    // Protected numbers always come from trusted defaults/env code path, not admin edits.
    return {
      ...DEFAULTS,
      ...map,
      phone: DEFAULT_PHONE,
      whatsapp: DEFAULT_WHATSAPP,
    };
  } catch {
    return DEFAULTS;
  }
}

export async function setSetting(key: string, value: string) {
  if (isProtectedSettingKey(key)) {
    throw new Error(`Setting "${key}" is protected and cannot be modified through admin.`);
  }
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
