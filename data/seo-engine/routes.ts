import type { RouteEdge } from "./types";

/**
 * Curated commercially relevant routes — NOT a full A×B matrix.
 * Add edges intentionally; eligibility still re-checks geography + wave.
 */
function edge(
  originId: string,
  destinationId: string,
  opts: Partial<Omit<RouteEdge, "id" | "originId" | "destinationId">> & {
    relevance: RouteEdge["relevance"];
    signals: RouteEdge["signals"];
    tier: RouteEdge["tier"];
    wave?: RouteEdge["wave"];
  }
): RouteEdge {
  return {
    id: `${originId}__${destinationId}`,
    originId,
    destinationId,
    bidirectional: opts.bidirectional ?? true,
    relevance: opts.relevance,
    signals: opts.signals,
    tier: opts.tier,
    wave: opts.wave ?? "wave2",
    notes: opts.notes,
  };
}

export const SEO_ROUTES: RouteEdge[] = [
  // Garhwal core
  edge("dehradun", "mussoorie", { relevance: 3, signals: ["city_tourist", "manually_approved"], tier: "A", bidirectional: true }),
  edge("dehradun", "rishikesh", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("dehradun", "haridwar", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("dehradun", "nainital", { relevance: 3, signals: ["city_tourist", "manually_approved"], tier: "A" }),
  edge("dehradun", "delhi", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("dehradun", "auli", { relevance: 3, signals: ["city_tourist", "manually_approved"], tier: "A" }),
  edge("dehradun", "ramnagar", { relevance: 3, signals: ["city_tourist", "manually_approved"], tier: "A" }),
  edge("dehradun", "dhanaulti", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("dehradun", "chakrata", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("dehradun", "kanatal", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("dehradun", "chopta", { relevance: 2, signals: ["city_tourist", "pilgrimage_roadhead"], tier: "B" }),
  edge("dehradun", "uttarkashi", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("dehradun", "joshimath", { relevance: 2, signals: ["pilgrimage_roadhead", "city_tourist"], tier: "B" }),
  edge("dehradun", "rudraprayag", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("dehradun", "guptkashi", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("dehradun", "tehri", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("dehradun", "lansdowne", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("dehradun", "haldwani", { relevance: 2, signals: ["city_city"], tier: "B" }),
  edge("dehradun", "almora", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("dehradun", "ranikhet", { relevance: 2, signals: ["city_tourist"], tier: "B" }),

  edge("rishikesh", "haridwar", { relevance: 3, signals: ["city_city", "tourist_circuit", "manually_approved"], tier: "A" }),
  edge("rishikesh", "mussoorie", { relevance: 3, signals: ["city_tourist", "manually_approved"], tier: "A" }),
  edge("rishikesh", "delhi", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("rishikesh", "dehradun", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("rishikesh", "chopta", { relevance: 2, signals: ["city_tourist", "pilgrimage_roadhead"], tier: "B" }),
  edge("rishikesh", "joshimath", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("rishikesh", "auli", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("rishikesh", "devprayag", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),

  edge("haridwar", "mussoorie", { relevance: 3, signals: ["city_tourist", "manually_approved"], tier: "A" }),
  edge("haridwar", "dehradun", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("haridwar", "rishikesh", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("haridwar", "delhi", { relevance: 2, signals: ["city_city"], tier: "B" }),
  edge("haridwar", "rudraprayag", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("haridwar", "joshimath", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("haridwar", "guptkashi", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("haridwar", "roorkee", { relevance: 2, signals: ["city_city"], tier: "B" }),

  edge("mussoorie", "dhanaulti", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("mussoorie", "kanatal", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("mussoorie", "haridwar", { relevance: 2, signals: ["city_tourist"], tier: "B" }),

  // Kumaon core
  edge("haldwani", "nainital", { relevance: 3, signals: ["city_tourist", "hub_destination", "manually_approved"], tier: "A" }),
  edge("kathgodam", "nainital", { relevance: 3, signals: ["railway_hill", "hub_destination", "manually_approved"], tier: "A" }),
  edge("haldwani", "ramnagar", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("haldwani", "almora", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("haldwani", "ranikhet", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("haldwani", "bhimtal", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("nainital", "bhimtal", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("nainital", "ramnagar", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("nainital", "mukteshwar", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("nainital", "ranikhet", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("nainital", "almora", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("rudrapur", "nainital", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("rudrapur", "haldwani", { relevance: 2, signals: ["city_city"], tier: "B" }),
  edge("rudrapur", "ramnagar", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("kashipur", "ramnagar", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("kashipur", "nainital", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("almora", "kausani", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("almora", "ranikhet", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("kotdwar", "lansdowne", { relevance: 3, signals: ["railway_hill", "hub_destination"], tier: "B" }),

  // Airport → destinations
  edge("jolly-grant-airport", "dehradun", { relevance: 3, signals: ["airport_tourist", "manually_approved"], tier: "A", bidirectional: false }),
  edge("jolly-grant-airport", "rishikesh", { relevance: 3, signals: ["airport_tourist", "manually_approved"], tier: "A", bidirectional: false }),
  edge("jolly-grant-airport", "mussoorie", { relevance: 3, signals: ["airport_tourist", "manually_approved"], tier: "A", bidirectional: false }),
  edge("jolly-grant-airport", "haridwar", { relevance: 3, signals: ["airport_tourist", "manually_approved"], tier: "A", bidirectional: false }),
  edge("jolly-grant-airport", "dhanaulti", { relevance: 2, signals: ["airport_tourist"], tier: "B", bidirectional: false }),
  edge("jolly-grant-airport", "chakrata", { relevance: 2, signals: ["airport_tourist"], tier: "B", bidirectional: false }),
  edge("pantnagar-airport", "nainital", { relevance: 2, signals: ["airport_tourist"], tier: "B", bidirectional: false }),
  edge("pantnagar-airport", "haldwani", { relevance: 2, signals: ["airport_tourist"], tier: "B", bidirectional: false }),
  edge("pantnagar-airport", "ramnagar", { relevance: 2, signals: ["airport_tourist"], tier: "B", bidirectional: false }),

  // Railway → destinations
  edge("kathgodam-railway", "nainital", { relevance: 3, signals: ["railway_hill", "manually_approved"], tier: "A", bidirectional: false }),
  edge("kathgodam-railway", "bhimtal", { relevance: 2, signals: ["railway_hill"], tier: "B", bidirectional: false }),
  edge("dehradun-railway", "mussoorie", { relevance: 3, signals: ["railway_hill"], tier: "A", bidirectional: false }),
  edge("dehradun-railway", "rishikesh", { relevance: 2, signals: ["hub_destination"], tier: "B", bidirectional: false }),
  edge("haridwar-railway", "rishikesh", { relevance: 2, signals: ["hub_destination"], tier: "B", bidirectional: false }),
  edge("kotdwar-railway", "lansdowne", { relevance: 3, signals: ["railway_hill"], tier: "B", bidirectional: false }),

  // Delhi into UK (existing taxi already has some)
  edge("delhi", "dehradun", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("delhi", "rishikesh", { relevance: 3, signals: ["city_city", "manually_approved"], tier: "A" }),
  edge("delhi", "haridwar", { relevance: 2, signals: ["city_city"], tier: "B" }),
  edge("delhi", "mussoorie", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("delhi", "nainital", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("delhi", "ramnagar", { relevance: 2, signals: ["city_tourist"], tier: "B" }),

  // Additional Wave 2 commercial corridors
  edge("mussoorie", "rishikesh", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("mussoorie", "dehradun", { relevance: 3, signals: ["city_tourist", "manually_approved"], tier: "A" }),
  edge("nainital", "haldwani", { relevance: 3, signals: ["city_tourist", "hub_destination"], tier: "A" }),
  edge("nainital", "kathgodam", { relevance: 3, signals: ["railway_hill", "hub_destination"], tier: "A" }),
  edge("ramnagar", "haldwani", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("ramnagar", "dehradun", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("ranikhet", "haldwani", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("ranikhet", "nainital", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("almora", "haldwani", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("lansdowne", "kotdwar", { relevance: 3, signals: ["railway_hill", "hub_destination"], tier: "B" }),
  edge("lansdowne", "haridwar", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("lansdowne", "dehradun", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("dhanaulti", "mussoorie", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("dhanaulti", "dehradun", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("kanatal", "dehradun", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("kanatal", "mussoorie", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("tehri", "dehradun", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("tehri", "mussoorie", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("srinagar-garhwal", "rishikesh", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("srinagar-garhwal", "dehradun", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("rudraprayag", "dehradun", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("rudraprayag", "haridwar", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("guptkashi", "haridwar", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("guptkashi", "dehradun", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("joshimath", "dehradun", { relevance: 2, signals: ["pilgrimage_roadhead", "city_tourist"], tier: "B" }),
  edge("joshimath", "haridwar", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("auli", "dehradun", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("uttarkashi", "dehradun", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("uttarkashi", "haridwar", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("barkot", "dehradun", { relevance: 2, signals: ["pilgrimage_roadhead"], tier: "B" }),
  edge("roorkee", "haridwar", { relevance: 2, signals: ["city_city"], tier: "B" }),
  edge("roorkee", "dehradun", { relevance: 2, signals: ["city_city"], tier: "B" }),
  edge("kashipur", "haldwani", { relevance: 2, signals: ["city_city"], tier: "B" }),
  edge("mukteshwar", "nainital", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("mukteshwar", "haldwani", { relevance: 2, signals: ["city_tourist"], tier: "B" }),
  edge("kausani", "almora", { relevance: 2, signals: ["tourist_circuit"], tier: "B" }),
  edge("bhimtal", "kathgodam", { relevance: 2, signals: ["railway_hill"], tier: "B" }),
  edge("jolly-grant-airport", "kanatal", { relevance: 2, signals: ["airport_tourist"], tier: "B", bidirectional: false }),
  edge("jolly-grant-airport", "tehri", { relevance: 2, signals: ["airport_tourist"], tier: "B", bidirectional: false }),
  edge("pantnagar-airport", "mukteshwar", { relevance: 2, signals: ["airport_tourist"], tier: "B", bidirectional: false }),
  edge("haridwar-railway", "dehradun", { relevance: 2, signals: ["hub_destination"], tier: "B", bidirectional: false }),
  edge("haridwar-railway", "mussoorie", { relevance: 2, signals: ["railway_hill"], tier: "B", bidirectional: false }),
  edge("dehradun-railway", "haridwar", { relevance: 2, signals: ["hub_destination"], tier: "B", bidirectional: false }),
  edge("kathgodam-railway", "mukteshwar", { relevance: 2, signals: ["railway_hill"], tier: "B", bidirectional: false }),
  edge("kathgodam-railway", "ramnagar", { relevance: 2, signals: ["hub_destination"], tier: "B", bidirectional: false }),
];

export function expandRouteDirections(routes: RouteEdge[] = SEO_ROUTES): Array<{
  originId: string;
  destinationId: string;
  edge: RouteEdge;
}> {
  const out: Array<{ originId: string; destinationId: string; edge: RouteEdge }> = [];
  for (const e of routes) {
    out.push({ originId: e.originId, destinationId: e.destinationId, edge: e });
    if (e.bidirectional) {
      out.push({ originId: e.destinationId, destinationId: e.originId, edge: e });
    }
  }
  return out;
}
