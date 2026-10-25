import { resolveLanding } from "@/lib/cms/resolve-landing";

export type RelatedLink = {
  slug: string;
  h1: string;
  description: string;
};

/** Resolve related slugs for internal links (static or published CMS). Skips misses. */
export async function resolveRelatedLinks(slugs: string[]): Promise<RelatedLink[]> {
  const out: RelatedLink[] = [];
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const resolved = await resolveLanding(slug);
    if (resolved.kind !== "page") continue;
    out.push({
      slug: resolved.page.slug,
      h1: resolved.page.h1,
      description: resolved.page.description,
    });
  }
  return out;
}
