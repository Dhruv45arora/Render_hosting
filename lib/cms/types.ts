import type { Faq } from "@/data/pages";

/** Unified landing shape for static Wave 1 + CMS SeoPage dual render. */
export type ResolvedLanding = {
  slug: string;
  source: "static" | "cms";
  type: "category" | "route" | "info";
  title: string;
  h1: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  badge: string;
  intro: string;
  heroImage: string;
  gallery?: { src: string; alt: string }[];
  categoryFilter?: string;
  driveFilter?: string;
  faqs: Faq[];
  sections: { heading: string; body: string }[];
  relatedSlugs: string[];
  enquiryCity?: string;
  primaryCta?: string;
  secondaryCta?: string;
  submitLabel?: string;
  canonicalSlug?: string;
  includes?: string[];
  excludes?: string[];
  howToBook?: string[];
  /** When set, fleet grid uses VehicleLocation for this location id. */
  locationId?: number;
  locationSlug?: string;
  locationName?: string;
  serviceMode?: string;
  pageType?: string;
  showFleet: boolean;
  indexable: boolean;
  /** True only for Dehradun desk entity — never partner / non-Dehradun cities. */
  emitLocalBusiness: boolean;
};

export type ResolvedBlogPost = {
  slug: string;
  source: "static" | "cms";
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  date: string;
  dateModified?: string;
  author?: string;
  heroImage: string;
  excerpt: string;
  body: { heading?: string; html: string }[];
  indexable: boolean;
};
