import { ADDRESS_LINE, DEFAULT_EMAIL, SITE_NAME, SITE_URL } from "./constants";

export function localBusinessSchema(phone: string, email?: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return {
    "@context": "https://schema.org",
    "@type": "CarRental",
    name: SITE_NAME,
    image: `${SITE_URL}/images/fleet/hatchback-silver.jpg`,
    "@id": `${SITE_URL}/`,
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
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/fleet/hatchback-silver.jpg` },
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
      availability: available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceValidUntil: `${new Date().getFullYear()}-12-31`,
      seller: { "@type": "Organization", name: SITE_NAME },
    },
  };
}
