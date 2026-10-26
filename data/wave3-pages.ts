import type { LandingPage } from "./pages";
import { publishWave3FromManifest, type Wave3PublishResult } from "./seo-engine/publish-wave3-from-manifest";

export type { Wave3PublishResult };

export function buildWave3Pages(
  coreLandingSlugs: Iterable<string>,
  wave2Slugs: Iterable<string>
): Wave3PublishResult {
  return publishWave3FromManifest(coreLandingSlugs, wave2Slugs);
}

export function isWave3Slug(slug: string, pages: LandingPage[]) {
  return pages.some((p) => p.slug === slug);
}
