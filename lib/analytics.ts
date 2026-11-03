import { prisma } from "./prisma";

export type DayStats = {
  views: number;
  uniques: number;
  calls: number;
  wa: number;
};

export type AnalyticsBlob = {
  days: Record<string, DayStats>;
  totalViews: number;
  totalUniques: number;
  totalCalls: number;
  totalWa: number;
};

const KEY = "analytics_v1";

function emptyDay(): DayStats {
  return { views: 0, uniques: 0, calls: 0, wa: 0 };
}

function emptyBlob(): AnalyticsBlob {
  return { days: {}, totalViews: 0, totalUniques: 0, totalCalls: 0, totalWa: 0 };
}

export async function readAnalytics(): Promise<AnalyticsBlob> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: KEY } });
    if (!row?.value) return emptyBlob();
    const parsed = JSON.parse(row.value) as AnalyticsBlob;
    return {
      days: parsed.days || {},
      totalViews: parsed.totalViews || 0,
      totalUniques: parsed.totalUniques || 0,
      totalCalls: parsed.totalCalls || 0,
      totalWa: parsed.totalWa || 0,
    };
  } catch {
    return emptyBlob();
  }
}

export async function recordAnalyticsEvent(input: {
  day: string;
  view?: boolean;
  unique?: boolean;
  call?: boolean;
  wa?: boolean;
}) {
  const data = await readAnalytics();
  const day = data.days[input.day] || emptyDay();
  if (input.view) {
    day.views += 1;
    data.totalViews += 1;
  }
  if (input.unique) {
    day.uniques += 1;
    data.totalUniques += 1;
  }
  if (input.call) {
    day.calls += 1;
    data.totalCalls += 1;
  }
  if (input.wa) {
    day.wa += 1;
    data.totalWa += 1;
  }
  data.days[input.day] = day;

  // Keep last ~90 days only
  const keys = Object.keys(data.days).sort();
  if (keys.length > 90) {
    for (const k of keys.slice(0, keys.length - 90)) delete data.days[k];
  }

  await prisma.siteSetting.upsert({
    where: { key: KEY },
    create: { key: KEY, value: JSON.stringify(data) },
    update: { value: JSON.stringify(data) },
  });
  return data;
}

export function summarizeLastDays(data: AnalyticsBlob, n = 7) {
  const keys = Object.keys(data.days).sort().slice(-n);
  return keys.reduce(
    (acc, k) => {
      const d = data.days[k];
      acc.views += d.views;
      acc.uniques += d.uniques;
      acc.calls += d.calls;
      acc.wa += d.wa;
      return acc;
    },
    { views: 0, uniques: 0, calls: 0, wa: 0, days: keys.length }
  );
}
