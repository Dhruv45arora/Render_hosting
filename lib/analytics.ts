import { prisma } from "./prisma";

export type PathLeadStats = {
  calls: number;
  wa: number;
};

/** One Call / WhatsApp tap with server timestamp (visitor phone is not available from the click). */
export type LeadClickEvent = {
  at: string; // ISO
  kind: "call" | "wa";
  path: string;
};

export type DayStats = {
  views: number;
  uniques: number;
  calls: number;
  wa: number;
  /** Per-path Call/WA taps (lead clicks — not cookie-gated). */
  paths?: Record<string, PathLeadStats>;
};

export type AnalyticsBlob = {
  days: Record<string, DayStats>;
  totalViews: number;
  totalUniques: number;
  totalCalls: number;
  totalWa: number;
  /** Newest-first log of individual WA/Call taps (capped). */
  leadEvents?: LeadClickEvent[];
};

const KEY = "analytics_v1";
const MAX_LEAD_EVENTS = 200;

function emptyDay(): DayStats {
  return { views: 0, uniques: 0, calls: 0, wa: 0 };
}

function emptyBlob(): AnalyticsBlob {
  return { days: {}, totalViews: 0, totalUniques: 0, totalCalls: 0, totalWa: 0, leadEvents: [] };
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
      leadEvents: Array.isArray(parsed.leadEvents) ? parsed.leadEvents : [],
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
  path?: string;
  at?: string;
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
  const path = (input.path || "").trim();
  if (path && (input.call || input.wa)) {
    if (!day.paths) day.paths = {};
    const safe = path.slice(0, 180);
    const p = day.paths[safe] || { calls: 0, wa: 0 };
    if (input.call) p.calls += 1;
    if (input.wa) p.wa += 1;
    day.paths[safe] = p;

    const at = input.at && !Number.isNaN(Date.parse(input.at)) ? input.at : new Date().toISOString();
    const evt: LeadClickEvent = {
      at,
      kind: input.call ? "call" : "wa",
      path: safe,
    };
    const prev = data.leadEvents || [];
    data.leadEvents = [evt, ...prev].slice(0, MAX_LEAD_EVENTS);
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

export function topLeadPaths(data: AnalyticsBlob, limit = 20) {
  const agg: Record<string, PathLeadStats> = {};
  for (const day of Object.values(data.days)) {
    if (!day.paths) continue;
    for (const [path, s] of Object.entries(day.paths)) {
      const cur = agg[path] || { calls: 0, wa: 0 };
      cur.calls += s.calls || 0;
      cur.wa += s.wa || 0;
      agg[path] = cur;
    }
  }
  return Object.entries(agg)
    .map(([path, s]) => ({ path, calls: s.calls, wa: s.wa, total: s.calls + s.wa }))
    .sort((a, b) => b.total - a.total || b.wa - a.wa)
    .slice(0, limit);
}

export function recentLeadEvents(data: AnalyticsBlob, limit = 50): LeadClickEvent[] {
  return (data.leadEvents || []).slice(0, limit);
}

export function toCookieTrafficData(data: AnalyticsBlob) {
  return {
    totalViews: data.totalViews,
    totalUniques: data.totalUniques,
    totalCalls: data.totalCalls,
    totalWa: data.totalWa,
    rows: analyticsDayRows(data),
    topPaths: topLeadPaths(data),
    recentLeads: recentLeadEvents(data, 50),
  };
}

export function analyticsDayRows(data: AnalyticsBlob) {
  return Object.keys(data.days)
    .sort()
    .reverse()
    .map((date) => ({
      date,
      views: data.days[date]?.views || 0,
      uniques: data.days[date]?.uniques || 0,
      calls: data.days[date]?.calls || 0,
      wa: data.days[date]?.wa || 0,
    }));
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
