import type { WaveId } from "./types";

/**
 * Wave switches — capacity can exist while a wave stays disabled.
 * Wave 2 generates a PREVIEW manifest only until explicitly published.
 */
export const WAVE_CONFIG: Record<
  WaveId,
  { enabled: boolean; publish: boolean; label: string; description: string }
> = {
  existing: {
    enabled: true,
    publish: true,
    label: "Existing",
    description: "Wave 1 + taxi cluster + Dehradun core — locked static.",
  },
  wave2: {
    enabled: true,
    publish: true,
    label: "Wave 2",
    description: "High-commercial Uttarakhand expansion — approved for production from frozen manifest.",
  },
  wave3: {
    enabled: true,
    publish: true,
    label: "Wave 3",
    description: "Major intercity + airport/railway connectivity expansion.",
  },
  wave4: {
    enabled: false,
    publish: false,
    label: "Wave 4",
    description: "Secondary towns, hill stations, sightseeing long-tail.",
  },
  wave5: {
    enabled: false,
    publish: false,
    label: "Wave 5",
    description: "Broader vehicle-specific commercial intent.",
  },
  wave6: {
    enabled: false,
    publish: false,
    label: "Wave 6",
    description: "Long-tail locations/routes that pass eligibility + GSC approval workflow.",
  },
};

export function isWaveEnabled(wave: WaveId): boolean {
  return WAVE_CONFIG[wave]?.enabled === true;
}

export function isWavePublishable(wave: WaveId): boolean {
  return WAVE_CONFIG[wave]?.enabled === true && WAVE_CONFIG[wave]?.publish === true;
}
