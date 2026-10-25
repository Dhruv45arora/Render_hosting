/**
 * Wave 2 Uttarakhand SEO pages — published from the approved frozen manifest
 * at reports/wave2-manifest.json (302 baseline candidates).
 */
import type { LandingPage } from "./pages";
import { publishWave2FromManifest, type Wave2PublishResult } from "./seo-engine/publish-from-manifest";

export type { Wave2PublishResult };

export function buildWave2Pages(coreLandingSlugs: Iterable<string>): Wave2PublishResult {
  return publishWave2FromManifest(coreLandingSlugs);
}

export function isWave2Slug(slug: string, pages: LandingPage[]) {
  return pages.some((p) => p.slug === slug);
}
