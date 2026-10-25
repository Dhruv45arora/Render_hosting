import { fingerprintSimilarity } from "./eligibility";
import type { PageCandidate } from "./types";

export type SimilarityHit = {
  a: string;
  b: string;
  similarity: number;
  sharedSections: string[];
};

/**
 * Flag suspiciously similar SEO fingerprints (ignores nav/CTA chrome — those are not in fingerprints).
 * Threshold 0.85 catches near-duplicate location swaps with identical fact sets.
 */
export function findSimilarPages(pages: PageCandidate[], threshold = 0.85): SimilarityHit[] {
  const hits: SimilarityHit[] = [];
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const a = pages[i];
      const b = pages[j];
      // Different intents / services / vehicles are distinct commercial pages
      if (a.intent !== b.intent) continue;
      if (a.serviceId && b.serviceId && a.serviceId !== b.serviceId) continue;
      if (a.vehicleId && b.vehicleId && a.vehicleId !== b.vehicleId) continue;
      const sim = fingerprintSimilarity(a.contentFingerprint, b.contentFingerprint);
      if (sim < threshold) continue;
      const sharedSections = sharedPrefixes(a.contentFingerprint, b.contentFingerprint);
      hits.push({ a: a.slug, b: b.slug, similarity: Math.round(sim * 1000) / 10, sharedSections });
    }
  }
  return hits.sort((x, y) => y.similarity - x.similarity);
}

function sharedPrefixes(a: string[], b: string[]): string[] {
  const B = new Set(b);
  const kinds = new Set<string>();
  for (const t of a) {
    if (!B.has(t)) continue;
    const kind = t.split(":")[0];
    if (kind === "use") kinds.add("introduction/use-cases");
    else if (kind === "near") kinds.add("nearby-destinations");
    else if (kind === "tx") kinds.add("transport");
    else if (kind === "tour") kinds.add("tourism-context");
    else if (kind === "svc") kinds.add("service");
  }
  return Array.from(kinds);
}

export function formatSimilarityReport(hits: SimilarityHit[]): string {
  if (!hits.length) return "Content similarity QA: no pairs above threshold.";
  const lines = [`Content similarity QA: ${hits.length} pair(s) above threshold`, ""];
  for (const h of hits.slice(0, 40)) {
    lines.push("Potential duplicate:");
    lines.push(`  ${h.a}`);
    lines.push(`  ${h.b}`);
    lines.push(`Similarity: ${h.similarity}%`);
    lines.push(`Sections: ${h.sharedSections.join(", ") || "(fingerprint overlap)"}`);
    lines.push("");
  }
  return lines.join("\n");
}
