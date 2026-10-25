import { ADDRESS_LINE, DEFAULT_EMAIL, SITE_NAME, SITE_URL } from "./constants";
import type { ResolvedLanding } from "@/lib/cms/types";

export function localBusinessSchema(phone: string, email?: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return {
    "@context": "https://schema.org",
    "@type": "CarRental",
    name: SITE_NAME,
    image: `${SITE_URL}/images/fleet/hatchback-silver.jpg`,
    "@id": `${SITE_URL}/#organization`,
    url: SITE_URL,
    telephone: `+91-${digits}`,
    email: email || DEFAULT_EMAIL,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Clock Tower",
      addressLocality: "Dehradun",
      addressRegion: "Uttarakhand",
      postalCode: "248001",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 30.3165, longitude: 78.0322 },
    areaServed: [
      "Dehradun",
      "Mussoorie",
      "Rishikesh",
      "Haridwar",
      "Char Dham",
      "Nainital",
      "Jolly Grant Airport",
      "Uttarakhand",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    description: `Vehicle rental in Dehradun (${ADDRESS_LINE}): self drive and chauffeur cars, bikes, scooty, SUVs and Tempo Traveller.`,
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
  dateModified?: string;
  image: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.dateModified || opts.date,
    author: { "@type": opts.author ? "Person" : "Organization", name: opts.author || SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo512.png` },
    },
    image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}`,
    mainEntityOfPage: `${SITE_URL}/blog/${opts.slug}`,
  };
}

export function webPageSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function productOfferSchema(opts: {
  name: string;
  description: string;
  image: string;
  slug: string;
  pricePerDay: number;
  availability: string;
}) {
  const available = opts.availability === "available";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}`,
    brand: { "@type": "Brand", name: SITE_NAME },
    url: `${SITE_URL}/rent/${opts.slug}`,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/rent/${opts.slug}`,
      priceCurrency: "INR",
      price: opts.pricePerDay,
      availability: available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      priceValidUntil: `${new Date().getFullYear()}-12-31`,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}

/** Optional Service node for CMS service/location pages (not a fake LocalBusiness). */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    ...(opts.areaServed
      ? { areaServed: { "@type": "City", name: opts.areaServed } }
      : {}),
  };
}

export function landingBreadcrumbs(
  page: ResolvedLanding,
  parent?: { name: string; path: string } | null
): { name: string; path: string }[] {
  const crumbs: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
  if (parent?.name && parent.path) crumbs.push(parent);
  crumbs.push({ name: page.h1, path: `/${page.slug}` });
  return crumbs;
}

/**
 * JSON-LD bundle for dual-rendered landings.
 * CarRental/LocalBusiness only when `emitLocalBusiness` (Dehradun desk).
 */
export function landingPageSchemas(
  page: ResolvedLanding,
  settings: { phone: string; email: string },
  parentCrumb?: { name: string; path: string } | null
) {
  const crumbs = landingBreadcrumbs(page, parentCrumb);
  const data: Record<string, unknown>[] = [
    webPageSchema({ name: page.h1, description: page.description, path: `/${page.slug}` }),
    breadcrumbSchema(crumbs),
  ];
  if (page.faqs.length) data.push(faqSchema(page.faqs));
  if (page.emitLocalBusiness) {
    data.push(localBusinessSchema(settings.phone, settings.email));
  } else if (
    page.source === "cms" &&
    (page.pageType === "SERVICE_LOCATION" ||
      page.pageType === "LOCATION" ||
      page.pageType === "ROUTE" ||
      page.pageType === "AIRPORT" ||
      page.pageType === "STATION")
  ) {
    data.push(
      serviceSchema({
        name: page.h1,
        description: page.description,
        path: `/${page.slug}`,
        areaServed: page.locationName || page.enquiryCity,
      })
    );
  }
  return data;
}
