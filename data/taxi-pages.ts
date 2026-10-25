/**
 * Uttarakhand Taxi SEO cluster — enquiry-led pages (no fabricated fleet/fares).
 * Arora Cars desk: Clock Tower, Dehradun. Taxi/chauffeur quotes via Call / WhatsApp / form.
 * Images: existing fleet + destination assets (see TAXI_IMAGE_TODO).
 */
import type { Faq, LandingGalleryImage, LandingPage } from "./pages";

export const TAXI_IMAGE_TODO = [
  "Dedicated airport curb / Jolly Grant terminal photo (using sedan + travel context for now)",
  "Dedicated railway station pickup photo (using sedan + city context for now)",
  "East Uttarakhand destination stills for Almora / Pithoragarh / Ranikhet (using hill/fleet mix)",
];

const P = "8445619130";
const IMG = {
  sedan: "/images/fleet/sedan-white.jpg",
  sedanPrem: "/images/fleet/sedan-premium.jpg",
  hatch: "/images/fleet/hatchback-silver.jpg",
  luxury: "/images/fleet/luxury-sedan-black.jpg",
  innova: "/images/fleet/mpv-innova-silver.jpg",
  suv: "/images/fleet/suv-compact-white.jpg",
  fortuner: "/images/fleet/suv-fortuner-white.jpg",
  scorpio: "/images/fleet/suv-scorpio-black.jpg",
  bolero: "/images/fleet/suv-bolero-utility.jpg",
  catSedan: "/images/categories/sedan-dehradun.jpg",
  catSuv: "/images/categories/suv-dehradun.jpg",
  mussoorie: "/images/destinations/mussoorie-hills.jpg",
  rishikesh: "/images/destinations/rishikesh-ghat.jpg",
  haridwar: "/images/destinations/haridwar-ghat.jpg",
  chardham: "/images/destinations/chardham-temple.jpg",
} as const;

function bookFaqs(topic: string): Faq[] {
  return [
    {
      q: `How do I book ${topic}?`,
      a: `Call or WhatsApp Arora Cars on ${P}. Share pickup point, date/time, passengers and bags. We confirm a chauffeur quote — this is not a self-drive checkout and not a meter-taxi app fare.`,
    },
    {
      q: "Do you publish fixed taxi fares on this page?",
      a: "No. Hill routes, waiting, night runs and vehicle class change the quote. We confirm before you pay any advance.",
    },
    {
      q: "Is this a self-drive rental?",
      a: "No. These taxi pages are for a car with a driver. For keys-only hire from Dehradun see our self-drive rental pages.",
    },
  ];
}

function taxiPage(
  partial: Omit<LandingPage, "badge" | "primaryCta" | "secondaryCta" | "submitLabel" | "heroImage"> & {
    badge?: string;
    heroImage: string;
    gallery?: LandingGalleryImage[];
  }
): LandingPage {
  return {
    badge: partial.badge || "Taxi · With driver · Quote",
    primaryCta: "Call for taxi quote",
    secondaryCta: "WhatsApp pickup details",
    submitLabel: "Request taxi quote",
    ...partial,
  };
}

/** Hub — /taxi */
export const TAXI_HUB: LandingPage = taxiPage({
  slug: "taxi",
  type: "info",
  title: "Taxi Service in Uttarakhand | Local, Outstation & Airport | Arora Cars",
  h1: "Taxi service across Uttarakhand",
  description:
    "Chauffeur taxi enquiries for Dehradun, Rishikesh, Haridwar, Mussoorie, Nainital and major Uttarakhand routes. Airport, station, sightseeing and Char Dham road transfers. Call 8445619130.",
  primaryKeyword: "taxi service Uttarakhand",
  secondaryKeywords: ["taxi Dehradun", "outstation taxi Uttarakhand", "airport taxi Dehradun"],
  badge: "Uttarakhand taxi desk",
  enquiryCity: "Dehradun",
  heroImage: IMG.sedanPrem,
  gallery: [
    { src: IMG.innova, alt: "Innova-class MPV used for family and outstation taxi enquiries from Dehradun" },
    { src: IMG.mussoorie, alt: "Hill road toward Mussoorie — common outstation taxi route from Dehradun" },
  ],
  intro:
    "Arora Cars handles chauffeur taxi enquiries from our Dehradun desk for local city runs, intercity drops, airport and railway pickups, hill-station transfers and pilgrimage road legs that a car can actually reach. We do not list live taxi meters or invent fares here — you get a quote on WhatsApp or call after you share the route.",
  faqs: [
    ...bookFaqs("a taxi in Uttarakhand"),
    {
      q: "Which cities do these pages cover?",
      a: "City hubs include Dehradun, Rishikesh, Haridwar, Mussoorie, Haldwani, Nainital and more Garhwal/Kumaon towns. Route pages cover the high-intent corridors people actually search.",
    },
  ],
  sections: [
    {
      heading: "What you can enquire for",
      body: "Local taxi hours inside a city, one-way and round-trip outstation runs, Jolly Grant airport transfers, railway station pickups, sightseeing days in Mussoorie / Rishikesh / Nainital, and Char Dham road packages that stop at the correct motorable points — not fake temple-door drops.",
    },
    {
      heading: "City taxi services",
      body: "Start with [taxi in Dehradun](/taxi-service-in-dehradun), [Rishikesh](/taxi-service-in-rishikesh), [Haridwar](/taxi-service-in-haridwar), [Mussoorie](/taxi-service-in-mussoorie), [Haldwani](/taxi-service-in-haldwani) or [Nainital](/taxi-service-in-nainital). Each hub explains local pickups and nearby destinations — not a copy-paste city name swap.",
    },
    {
      heading: "Popular routes",
      body: "High-intent corridors include [Dehradun to Mussoorie taxi](/dehradun-to-mussoorie-taxi), [Dehradun to Rishikesh](/dehradun-to-rishikesh-taxi), [Dehradun to Haridwar](/dehradun-to-haridwar-taxi), [Dehradun to Delhi](/dehradun-to-delhi-taxi), [Haldwani to Nainital](/haldwani-to-nainital-taxi) and [Delhi to Dehradun](/delhi-to-dehradun-taxi).",
    },
    {
      heading: "Airport, station & pilgrimage",
      body: "Arrival pages: [Dehradun airport taxi](/dehradun-airport-taxi), [Dehradun railway station taxi](/dehradun-railway-station-taxi), [Kathgodam to Nainital](/kathgodam-railway-station-to-nainital-taxi). Pilgrimage: [Char Dham from Dehradun](/char-dham-taxi-service-from-dehradun), [Kedarnath road taxi](/kedarnath-taxi-from-dehradun) (with honest road limits).",
    },
    {
      heading: "How a taxi quote works",
      body: `Share city or route, date, time, passenger count and luggage. We reply on call or WhatsApp (${P}) with a chauffeur option. Self-drive fleet cards and daily rental prices on other pages are a different product.`,
    },
  ],
  relatedSlugs: [
    "taxi-service-in-dehradun",
    "dehradun-to-mussoorie-taxi",
    "dehradun-airport-taxi",
    "char-dham-taxi-service-from-dehradun",
    "chauffeur-driven-car-rental-dehradun",
    "contact-book-now",
  ],
});

function cityTaxi(opts: {
  slug: string;
  city: string;
  titleCity: string;
  keyword: string;
  pickups: string;
  nearby: string;
  transport: string;
  useCases: string;
  heroImage: string;
  gallery: LandingGalleryImage[];
  related: string[];
  extraFaq?: Faq;
}): LandingPage {
  return taxiPage({
    slug: opts.slug,
    type: "category",
    title: `Taxi Service in ${opts.titleCity} | Local & Outstation | Arora Cars`,
    h1: `Taxi service in ${opts.city}`,
    description: `Taxi service in ${opts.city} for local pickups, station/airport links and outstation drops. Chauffeur quote from Arora Cars — call ${P}. No fake fares listed.`,
    primaryKeyword: opts.keyword,
    secondaryKeywords: [`taxi ${opts.city}`, `cab service ${opts.city}`, `outstation taxi ${opts.city}`],
    enquiryCity: opts.city,
    heroImage: opts.heroImage,
    gallery: opts.gallery,
    intro: `Need a car with a driver in ${opts.city}? This page is for local and outstation taxi enquiries — not a self-drive garage listing and not a promise that a car is waiting on every street. Tell us the pickup, time and destination; we confirm a chauffeur quote from the Arora Cars desk.`,
    faqs: [
      {
        q: `Which areas in ${opts.city} can be a pickup?`,
        a: opts.pickups,
      },
      {
        q: `What nearby places do guests usually book from ${opts.city}?`,
        a: opts.nearby,
      },
      ...bookFaqs(`a taxi in ${opts.city}`),
      ...(opts.extraFaq ? [opts.extraFaq] : []),
    ],
    sections: [
      {
        heading: `Local taxi use in ${opts.city}`,
        body: opts.useCases,
      },
      {
        heading: "Transport points that matter",
        body: opts.transport,
      },
      {
        heading: "Local, outstation, one-way and round trip",
        body: `Say whether you need hours inside ${opts.city}, a one-way drop, or a round trip with waiting. Hill towns and aarti traffic change timing — we plan the day on the quote, not with a fake “fixed package” printed here.`,
      },
      {
        heading: "Vehicle classes we can quote",
        body: "Depending on passengers and luggage we quote sedan, compact SUV, Innova-class MPV or larger SUVs from chauffeur inventory. Exact unit is confirmed when you book — photos on this site are reference, not a reserved taxi.",
      },
      {
        heading: "How to enquire",
        body: `WhatsApp or call ${P} with ${opts.city} as the rental city, pickup pin, date and passenger count. Or use the quote form on this page.`,
      },
    ],
    relatedSlugs: opts.related,
  });
}

function routeTaxi(opts: {
  slug: string;
  from: string;
  to: string;
  h1: string;
  title: string;
  keyword: string;
  overview: string;
  considerations: string;
  destinationNote: string;
  heroImage: string;
  gallery: LandingGalleryImage[];
  related: string[];
  enquiryCity: string;
}): LandingPage {
  return taxiPage({
    slug: opts.slug,
    type: "route",
    title: opts.title,
    h1: opts.h1,
    description: `${opts.h1} — one-way or round-trip chauffeur enquiry with Arora Cars. Call ${P}. Route notes without invented km or fare claims.`,
    primaryKeyword: opts.keyword,
    secondaryKeywords: [`${opts.from} to ${opts.to} cab`, `${opts.from} ${opts.to} taxi service`],
    enquiryCity: opts.enquiryCity,
    heroImage: opts.heroImage,
    gallery: opts.gallery,
    intro: opts.overview,
    faqs: [
      {
        q: "One-way or round trip?",
        a: "Both can be quoted. One-way is a drop at the destination. Round trip keeps the car for the return (and waiting if you ask). Night returns on hill roads need an honest driver-rest conversation.",
      },
      {
        q: "Can I change the pickup point?",
        a: `Yes — hotel, home, station or airport in/near ${opts.from}. Put the exact pin in the quote so the chauffeur knows the curb.`,
      },
      ...bookFaqs(`a taxi from ${opts.from} to ${opts.to}`),
    ],
    sections: [
      {
        heading: `${opts.from} → ${opts.to}: what this service covers`,
        body: `Chauffeur pickup in/near ${opts.from}, road transfer toward ${opts.to}, and drop at the address you name. It is not a shared tempo seat and not a self-drive handover midway.`,
      },
      {
        heading: "Travel considerations",
        body: opts.considerations,
      },
      {
        heading: `Arriving in ${opts.to}`,
        body: opts.destinationNote,
      },
      {
        heading: "Vehicle fit",
        body: "Couples and light luggage often fit a sedan. Families and pilgrimage bags usually need Innova-class or SUV. We match class to your passenger count — no bargain stickers or invented low fares on this page.",
      },
      {
        heading: "Booking steps",
        body: `1) Send route and date on WhatsApp ${P}. 2) Confirm one-way vs round trip. 3) Share passenger/bag count. 4) Receive chauffeur quote. 5) Pay only the advance we agree — never a random website coupon.`,
      },
    ],
    relatedSlugs: opts.related,
  });
}

export const TAXI_CITY_PAGES: LandingPage[] = [
  cityTaxi({
    slug: "taxi-service-in-dehradun",
    city: "Dehradun",
    titleCity: "Dehradun",
    keyword: "taxi service in Dehradun",
    pickups:
      "Clock Tower / city hotels, Rajpur Road, ISBT, Dehradun Railway Station, and Jolly Grant Airport (DED) when you name the terminal time. Delivery from the desk is agreed on the quote.",
    nearby:
      "Mussoorie, Rishikesh, Haridwar, Dhanaulti, Chakrata approaches, and Delhi highway drops are the most common chauffeur asks from Dehradun.",
    transport:
      "Dehradun Railway Station and ISBT are separate curbs — say which one. Jolly Grant is outside the city; flight time matters more than “airport taxi” as a vague label.",
    useCases:
      "Hotel transfers, office days on Rajpur Road, family station pickups, and same-day hill escapes when you do not want to self-drive the Mussoorie climb.",
    heroImage: IMG.sedan,
    gallery: [
      { src: IMG.catSedan, alt: "Sedan for local taxi enquiries in Dehradun city" },
      { src: IMG.innova, alt: "MPV option for family taxi transfers from Dehradun" },
    ],
    related: [
      "taxi",
      "dehradun-to-mussoorie-taxi",
      "dehradun-to-rishikesh-taxi",
      "dehradun-to-haridwar-taxi",
      "dehradun-to-delhi-taxi",
      "dehradun-airport-taxi",
      "dehradun-railway-station-taxi",
      "char-dham-taxi-service-from-dehradun",
      "chauffeur-driven-car-rental-dehradun",
    ],
  }),
  cityTaxi({
    slug: "taxi-service-in-rishikesh",
    city: "Rishikesh",
    titleCity: "Rishikesh",
    keyword: "taxi service in Rishikesh",
    pickups:
      "Tapovan, Laxman Jhula / Ram Jhula side (name the ghat or hotel), Geeta Nagar, and highway hotels toward Haridwar. Narrow lanes near the jhulas need a clear meeting pin.",
    nearby: "Haridwar aarti timings, Dehradun / Jolly Grant, Mussoorie day runs, and Neelkanth road trips are frequent chauffeur asks.",
    transport:
      "Rishikesh does not have a major airport — most flyers use Jolly Grant then road. Yog Nagari Rishikesh / Haridwar railheads are the usual train story; say which station.",
    useCases:
      "Ashram drop-offs, rafting-camp mornings, evening aarti in Haridwar with return, and airport runs when your flight is out of Dehradun.",
    heroImage: IMG.rishikesh,
    gallery: [
      { src: IMG.sedanPrem, alt: "Chauffeur sedan for taxi service around Rishikesh" },
      { src: IMG.suv, alt: "SUV option for Rishikesh outstation taxi enquiries" },
    ],
    related: [
      "taxi",
      "rishikesh-to-dehradun-taxi",
      "rishikesh-to-mussoorie-taxi",
      "haridwar-to-rishikesh-taxi",
      "dehradun-airport-to-rishikesh-taxi",
      "rishikesh-sightseeing-taxi",
      "taxi-service-in-haridwar",
      "taxi-service-in-dehradun",
    ],
  }),
  cityTaxi({
    slug: "taxi-service-in-haridwar",
    city: "Haridwar",
    titleCity: "Haridwar",
    keyword: "taxi service in Haridwar",
    pickups:
      "Har Ki Pauri side hotels (name the gate), railway station exits, bus stand area, and hotels on the bypass. Aarti evenings need an early pickup plan — do not assume a car can wait on the ghat itself.",
    nearby: "Rishikesh, Dehradun, Mussoorie, and Char Dham road starts toward Guptkashi / Joshimath corridors are common.",
    transport: "Haridwar Junction is the main rail arrival. Airport guests usually land at Jolly Grant and continue by road — say flight time in the quote.",
    useCases: "Station pickup with luggage, evening Ganga aarti with waiting, temple circuits, and onward hill departures the next morning.",
    heroImage: IMG.haridwar,
    gallery: [
      { src: IMG.innova, alt: "Family MPV for Haridwar taxi and pilgrimage transfers" },
      { src: IMG.sedan, alt: "Sedan taxi enquiry for Haridwar city and station runs" },
    ],
    related: [
      "taxi",
      "haridwar-to-rishikesh-taxi",
      "haridwar-to-dehradun-taxi",
      "haridwar-to-mussoorie-taxi",
      "char-dham-taxi-service-from-haridwar",
      "dehradun-airport-to-haridwar-taxi",
      "taxi-service-in-rishikesh",
      "taxi-service-in-dehradun",
    ],
  }),
  cityTaxi({
    slug: "taxi-service-in-mussoorie",
    city: "Mussoorie",
    titleCity: "Mussoorie",
    keyword: "taxi service in Mussoorie",
    pickups:
      "Library / Mall Road hotels (many need a short walk — cars cannot always stop at the shop door), Landour side, Picture Palace area, and hotels below on the Dehradun road. Name the property.",
    nearby: "Dehradun city/airport, Kempty area day plans, Dhanaulti, and return drops to Rishikesh or Haridwar.",
    transport:
      "There is no Mussoorie airport or major railway. Almost everyone arrives via Dehradun road — fog and Sunday traffic change timing more than a brochure claim.",
    useCases: "Hotel check-in transfers, Mall Road sightseeing with waiting, and evening descents to Dehradun when you do not want to drive hairpins in the dark.",
    heroImage: IMG.mussoorie,
    gallery: [
      { src: IMG.suv, alt: "SUV suited to Mussoorie hill-road taxi enquiries" },
      { src: IMG.sedanPrem, alt: "Sedan for Mussoorie to Dehradun taxi transfers" },
    ],
    related: [
      "taxi",
      "dehradun-to-mussoorie-taxi",
      "mussoorie-sightseeing-taxi",
      "dehradun-airport-to-mussoorie-taxi",
      "rishikesh-to-mussoorie-taxi",
      "haridwar-to-mussoorie-taxi",
      "taxi-service-in-dehradun",
    ],
  }),
  cityTaxi({
    slug: "taxi-service-in-haldwani",
    city: "Haldwani",
    titleCity: "Haldwani",
    keyword: "taxi service in Haldwani",
    pickups: "City hotels, ISBT side, and road links toward Kathgodam. Haldwani is the plains hub for much of Kumaon — say the neighbourhood, not only “Haldwani”.",
    nearby: "Nainital, Bhimtal, Kathgodam station connections, and longer plains runs toward Rudrapur / Kashipur when needed.",
    transport: "Kathgodam railway is the key railhead next door — many “Haldwani taxi” searches are really station-to-lake runs. Airport is not local; guests often connect via Pantnagar or Delhi legs.",
    useCases: "Market/hotel transfers, dawn departures to Nainital, and station pickups timed to train ETAs.",
    heroImage: IMG.catSuv,
    gallery: [
      { src: IMG.suv, alt: "SUV for Haldwani and Nainital taxi corridor enquiries" },
      { src: IMG.innova, alt: "MPV for family taxi from Haldwani toward the hills" },
    ],
    related: [
      "taxi",
      "haldwani-to-nainital-taxi",
      "kathgodam-to-nainital-taxi",
      "kathgodam-railway-station-to-nainital-taxi",
      "taxi-service-in-nainital",
      "taxi-service-in-rudrapur",
      "nainital-sightseeing-taxi",
    ],
  }),
  cityTaxi({
    slug: "taxi-service-in-nainital",
    city: "Nainital",
    titleCity: "Nainital",
    keyword: "taxi service in Nainital",
    pickups:
      "Mall Road / Tallital / Mallital hotels — many streets are restricted; we meet at the allowed motorable point for your hotel. Say Tallital vs Mallital clearly.",
    nearby: "Bhimtal, Sattal, Naukuchiatal day circuits, and plains drops back to Haldwani / Kathgodam for trains.",
    transport: "No airport in town. Kathgodam is the rail story. Road from Haldwani is the default arrival — weekend traffic jams are real.",
    useCases: "Lake-area hotel transfers, sightseeing loops, and evening returns to the plains for overnight trains.",
    heroImage: IMG.fortuner,
    gallery: [
      { src: IMG.suv, alt: "SUV taxi option for Nainital hill roads" },
      { src: IMG.mussoorie, alt: "Hill-station travel context for Nainital taxi guests" },
    ],
    related: [
      "taxi",
      "nainital-sightseeing-taxi",
      "haldwani-to-nainital-taxi",
      "kathgodam-to-nainital-taxi",
      "dehradun-to-nainital-taxi",
      "taxi-service-in-haldwani",
      "taxi-service-in-almora",
    ],
  }),
  cityTaxi({
    slug: "taxi-service-in-roorkee",
    city: "Roorkee",
    titleCity: "Roorkee",
    keyword: "taxi service in Roorkee",
    pickups: "IIT / campus side, city hotels, and highway approaches toward Haridwar or Dehradun. Name the gate or hotel.",
    nearby: "Haridwar, Dehradun, Rishikesh day or overnight plans, and Delhi-direction highway drops.",
    transport: "Roorkee sits on the plains rail/road grid — guests often combine campus visits with Haridwar aarti the same evening.",
    useCases: "Campus guest pickups, station links, and onward pilgrimage or hill transfers the next morning.",
    heroImage: IMG.hatch,
    gallery: [
      { src: IMG.sedan, alt: "Sedan for Roorkee local and outstation taxi quotes" },
      { src: IMG.haridwar, alt: "Haridwar is a common onward taxi destination from Roorkee" },
    ],
    related: ["taxi", "taxi-service-in-haridwar", "taxi-service-in-dehradun", "haridwar-to-dehradun-taxi", "dehradun-to-haridwar-taxi"],
  }),
  cityTaxi({
    slug: "taxi-service-in-kashipur",
    city: "Kashipur",
    titleCity: "Kashipur",
    keyword: "taxi service in Kashipur",
    pickups: "City hotels and industrial/highway approaches. Kashipur is a Kumaon plains connector — pin the exact site.",
    nearby: "Rudrapur, Haldwani corridor, and longer hill approaches toward Nainital when planned as a full transfer.",
    transport: "Plains rail/road town — not a hill garage. Most taxi asks are intercity connectors rather than Mall Road tourism.",
    useCases: "Business hotel transfers and onward drops toward Haldwani / Nainital with an early start.",
    heroImage: IMG.sedanPrem,
    gallery: [
      { src: IMG.innova, alt: "MPV for Kashipur outstation taxi enquiries" },
      { src: IMG.catSedan, alt: "Sedan option for Kashipur city taxi quotes" },
    ],
    related: ["taxi", "taxi-service-in-rudrapur", "taxi-service-in-haldwani", "taxi-service-in-nainital", "haldwani-to-nainital-taxi"],
  }),
  cityTaxi({
    slug: "taxi-service-in-rudrapur",
    city: "Rudrapur",
    titleCity: "Rudrapur",
    keyword: "taxi service in Rudrapur",
    pickups: "Industrial area hotels, city side, and highway approaches. Say SIDCUL / hotel name clearly.",
    nearby: "Kashipur, Haldwani, and Nainital when the brief is a hill weekend after a plains stay.",
    transport: "Pantnagar airport is the nearby aviation story for some guests — confirm if your flight is there vs Delhi.",
    useCases: "Corporate guest transfers and weekend hill departures with luggage.",
    heroImage: IMG.luxury,
    gallery: [
      { src: IMG.sedanPrem, alt: "Premium sedan enquiry for Rudrapur taxi transfers" },
      { src: IMG.suv, alt: "SUV for Rudrapur to hill-station taxi runs" },
    ],
    related: ["taxi", "taxi-service-in-kashipur", "taxi-service-in-haldwani", "dehradun-to-nainital-taxi", "taxi-service-in-nainital"],
  }),
  cityTaxi({
    slug: "taxi-service-in-almora",
    city: "Almora",
    titleCity: "Almora",
    keyword: "taxi service in Almora",
    pickups: "Mall / hotel belt and motorable points below steep lanes. Almora is a ridge town — cars stop where the road allows.",
    nearby: "Kausani, Binsar approaches, Ranikhet side, and long plains returns via Haldwani.",
    transport: "No local airport. Guests usually rail to Kathgodam then climb, or road from Haldwani.",
    useCases: "Hotel transfers, day trips to viewpoints, and multi-day Kumaon circuits on enquiry.",
    heroImage: IMG.bolero,
    gallery: [
      { src: IMG.scorpio, alt: "SUV suited to Almora hill-road taxi enquiries" },
      { src: IMG.suv, alt: "Compact SUV for Almora local taxi quotes" },
    ],
    related: ["taxi", "taxi-service-in-ranikhet", "taxi-service-in-nainital", "taxi-service-in-haldwani", "taxi-service-in-pithoragarh"],
  }),
  cityTaxi({
    slug: "taxi-service-in-ranikhet",
    city: "Ranikhet",
    titleCity: "Ranikhet",
    keyword: "taxi service in Ranikhet",
    pickups: "Cantonment-adjacent hotels and Mall Road motorable points. Military areas may restrict waiting — follow your hotel’s advice on the meeting curb.",
    nearby: "Almora, Nainital region links, and plains drops to Kathgodam / Haldwani for trains.",
    transport: "Hill cantonment town — arrival is almost always by road from the plains railheads.",
    useCases: "Quiet hotel transfers and sightseeing days with flexible waiting.",
    heroImage: IMG.scorpio,
    gallery: [
      { src: IMG.bolero, alt: "Utility SUV for Ranikhet taxi road conditions" },
      { src: IMG.innova, alt: "MPV for family taxi to Ranikhet" },
    ],
    related: ["taxi", "taxi-service-in-almora", "taxi-service-in-nainital", "haldwani-to-nainital-taxi", "taxi-service-in-haldwani"],
  }),
  cityTaxi({
    slug: "taxi-service-in-pithoragarh",
    city: "Pithoragarh",
    titleCity: "Pithoragarh",
    keyword: "taxi service in Pithoragarh",
    pickups: "Town hotels and motorable bazaar approaches. This is far-east Kumaon — expect longer road days from the plains.",
    nearby: "Munsiyari / Dharchula direction enquiries are specialist — tell us the exact destination; not every winter road is open.",
    transport: "Long road from Haldwani side. Flights are not a local default — plan buffers.",
    useCases: "Town transfers and carefully planned multi-day hill legs when roads are open.",
    heroImage: IMG.bolero,
    gallery: [
      { src: IMG.scorpio, alt: "SUV for long-distance taxi enquiries toward Pithoragarh" },
      { src: IMG.fortuner, alt: "Larger SUV option for Pithoragarh family transfers" },
    ],
    related: ["taxi", "taxi-service-in-almora", "taxi-service-in-haldwani", "taxi-service-in-nainital"],
    extraFaq: {
      q: "Are all high passes open year-round?",
      a: "No. Seasonal closures and landslides happen. We only confirm a chauffeur date when the road story is realistic for that week.",
    },
  }),
  cityTaxi({
    slug: "taxi-service-in-kotdwar",
    city: "Kotdwar",
    titleCity: "Kotdwar",
    keyword: "taxi service in Kotdwar",
    pickups: "Railway station side and town hotels. Kotdwar is a gate for parts of Garhwal — name the onward village or ashram if that is the real destination.",
    nearby: "Lansdowne direction, Haridwar/Dehradun plains links, and longer Garhwal climbs when planned.",
    transport: "Railhead importance is high — many guests arrive by train then need a hill vehicle.",
    useCases: "Station pickup with bags and onward cantonment or hill drops.",
    heroImage: IMG.sedan,
    gallery: [
      { src: IMG.suv, alt: "SUV for Kotdwar to hill taxi transfers" },
      { src: IMG.innova, alt: "MPV for family taxi from Kotdwar railway" },
    ],
    related: ["taxi", "taxi-service-in-haridwar", "taxi-service-in-dehradun", "haridwar-to-dehradun-taxi"],
  }),
  cityTaxi({
    slug: "taxi-service-in-srinagar-uttarakhand",
    city: "Srinagar",
    titleCity: "Srinagar Uttarakhand",
    keyword: "taxi service in Srinagar Uttarakhand",
    pickups: "Town hotels and highway points on the Rishikesh–Joshimath corridor. Always say “Srinagar Garhwal / Uttarakhand” so it is not confused with Srinagar Kashmir.",
    nearby: "Rudraprayag side, Joshimath approaches in season, and returns toward Rishikesh / Haridwar.",
    transport: "Highway town on the Char Dham road network — altitude and season matter for onward legs.",
    useCases: "Overnight halt transfers and pilgrimage corridor taxi days.",
    heroImage: IMG.chardham,
    gallery: [
      { src: IMG.innova, alt: "MPV for Srinagar Uttarakhand pilgrimage taxi corridor" },
      { src: IMG.scorpio, alt: "SUV for Garhwal highway taxi from Srinagar" },
    ],
    related: [
      "taxi",
      "char-dham-taxi-service-from-dehradun",
      "char-dham-taxi-service-from-haridwar",
      "badrinath-taxi-from-dehradun",
      "taxi-service-in-rishikesh",
      "taxi-service-in-tehri",
    ],
    extraFaq: {
      q: "Is this Srinagar in Kashmir?",
      a: "No. This page is Srinagar in Pauri Garhwal, Uttarakhand — on the highway toward Joshimath / Badrinath side.",
    },
  }),
  cityTaxi({
    slug: "taxi-service-in-tehri",
    city: "Tehri",
    titleCity: "Tehri / New Tehri",
    keyword: "taxi service in Tehri",
    pickups: "New Tehri town points and lake-side hotels when motorable. Old Tehri submerged areas are not a pickup — use the current town names your hotel gives.",
    nearby: "Chamba, Mussoorie-side links, and Rishikesh / Dehradun returns.",
    transport: "Hill reservoir town — road timing depends on weather and weekend traffic from the plains.",
    useCases: "Hotel transfers and lake-area day plans with a driver who knows the current road, not a 1990s map.",
    heroImage: IMG.suv,
    gallery: [
      { src: IMG.fortuner, alt: "SUV for Tehri hill-station taxi enquiries" },
      { src: IMG.mussoorie, alt: "Hill landscape context for Tehri taxi guests" },
    ],
    related: ["taxi", "taxi-service-in-dehradun", "taxi-service-in-mussoorie", "taxi-service-in-srinagar-uttarakhand", "dehradun-to-mussoorie-taxi"],
  }),
];

export const TAXI_ROUTE_PAGES: LandingPage[] = [
  routeTaxi({
    slug: "dehradun-to-mussoorie-taxi",
    from: "Dehradun",
    to: "Mussoorie",
    h1: "Dehradun to Mussoorie taxi",
    title: "Dehradun to Mussoorie Taxi | One-Way & Round Trip | Arora Cars",
    keyword: "Dehradun to Mussoorie taxi",
    enquiryCity: "Dehradun",
    overview:
      "Book a chauffeur for the Dehradun–Mussoorie climb when you want the hairpins handled for you. One-way hotel drop or round trip with waiting — quote on call, not a printed fake fare.",
    considerations:
      "Sunday and holiday traffic near Mussoorie can stall the last stretch. Fog in winter and wet roads in monsoon matter more than a “1 hour guaranteed” claim. Mall Road often needs a short walk from the car drop.",
    destinationNote:
      "Tell us Tallital-style vs Library/Mall side hotel names when you can. Landour properties may need a different motorable point than Mall Road shops.",
    heroImage: IMG.mussoorie,
    gallery: [
      { src: IMG.suv, alt: "SUV for Dehradun to Mussoorie hill taxi" },
      { src: IMG.sedanPrem, alt: "Sedan chauffeur option Dehradun to Mussoorie" },
    ],
    related: [
      "taxi-service-in-dehradun",
      "taxi-service-in-mussoorie",
      "mussoorie-sightseeing-taxi",
      "dehradun-airport-to-mussoorie-taxi",
      "dehradun-to-rishikesh-taxi",
      "car-rental-dehradun-to-mussoorie",
    ],
  }),
  routeTaxi({
    slug: "dehradun-to-rishikesh-taxi",
    from: "Dehradun",
    to: "Rishikesh",
    h1: "Dehradun to Rishikesh taxi",
    title: "Dehradun to Rishikesh Taxi | Chauffeur Transfer | Arora Cars",
    keyword: "Dehradun to Rishikesh taxi",
    enquiryCity: "Dehradun",
    overview:
      "Plains-and-foothill transfer from Dehradun city or hotel to Rishikesh ashrams, Tapovan, or highway hotels — with driver, timed to your check-in.",
    considerations:
      "Laxman Jhula lanes are tight; we may meet at a wider pin. Rafting mornings need an early start; evening returns should respect driver rest if you also want a same-day Mussoorie idea.",
    destinationNote: "Name Tapovan vs Ram Jhula vs highway hotel. “Rishikesh” alone is not a curb.",
    heroImage: IMG.rishikesh,
    gallery: [
      { src: IMG.sedan, alt: "Sedan taxi Dehradun to Rishikesh" },
      { src: IMG.innova, alt: "Family MPV Dehradun to Rishikesh taxi" },
    ],
    related: [
      "taxi-service-in-dehradun",
      "taxi-service-in-rishikesh",
      "rishikesh-to-dehradun-taxi",
      "dehradun-airport-to-rishikesh-taxi",
      "rishikesh-sightseeing-taxi",
      "dehradun-to-haridwar-taxi",
    ],
  }),
  routeTaxi({
    slug: "dehradun-to-haridwar-taxi",
    from: "Dehradun",
    to: "Haridwar",
    h1: "Dehradun to Haridwar taxi",
    title: "Dehradun to Haridwar Taxi | Station & Aarti Runs | Arora Cars",
    keyword: "Dehradun to Haridwar taxi",
    enquiryCity: "Dehradun",
    overview:
      "Chauffeur run from Dehradun to Haridwar for station drops, hotel check-ins, or evening aarti plans with clear waiting instructions.",
    considerations:
      "Aarti nights crowd the ghat side — cars wait where traffic police allow. Train connections need buffer; do not cut it fine from a Mussoorie descent the same evening without saying so.",
    destinationNote: "Share Har Ki Pauri hotel gate vs railway station exit vs bypass hotel.",
    heroImage: IMG.haridwar,
    gallery: [
      { src: IMG.innova, alt: "MPV for Dehradun to Haridwar family taxi" },
      { src: IMG.sedanPrem, alt: "Sedan chauffeur Dehradun to Haridwar" },
    ],
    related: [
      "taxi-service-in-dehradun",
      "taxi-service-in-haridwar",
      "haridwar-to-dehradun-taxi",
      "dehradun-airport-to-haridwar-taxi",
      "haridwar-to-rishikesh-taxi",
      "char-dham-taxi-service-from-haridwar",
    ],
  }),
  routeTaxi({
    slug: "dehradun-to-delhi-taxi",
    from: "Dehradun",
    to: "Delhi",
    h1: "Dehradun to Delhi taxi",
    title: "Dehradun to Delhi Taxi | One-Way Highway Transfer | Arora Cars",
    keyword: "Dehradun to Delhi taxi",
    enquiryCity: "Dehradun",
    overview:
      "Long highway chauffeur transfer toward Delhi NCR. Tell us whether the drop is Aerocity, a specific terminal area, south Delhi, or another pin — “Delhi” is not one curb.",
    considerations:
      "Night drives and fog season need rest planning. Tolls and waiting at complex gates are settled in the quote. This is not a shared Volvo seat.",
    destinationNote: "IGI terminal numbers, Aerocity hotels, and NCR suburbs are different jobs. Put the pin in WhatsApp.",
    heroImage: IMG.luxury,
    gallery: [
      { src: IMG.innova, alt: "Innova-class taxi Dehradun to Delhi highway" },
      { src: IMG.fortuner, alt: "SUV option for Dehradun to Delhi family transfer" },
    ],
    related: [
      "taxi-service-in-dehradun",
      "delhi-to-dehradun-taxi",
      "delhi-to-rishikesh-taxi",
      "dehradun-to-rishikesh-taxi",
      "dehradun-airport-taxi",
    ],
  }),
  routeTaxi({
    slug: "dehradun-to-nainital-taxi",
    from: "Dehradun",
    to: "Nainital",
    h1: "Dehradun to Nainital taxi",
    title: "Dehradun to Nainital Taxi | Cross-Region Transfer | Arora Cars",
    keyword: "Dehradun to Nainital taxi",
    enquiryCity: "Dehradun",
    overview:
      "Longer Garhwal-to-Kumaon chauffeur day. Plan an early start; this is not a short Mussoorie hop.",
    considerations:
      "Full-day road time, meal stops, and winter daylight matter. Weekend lake traffic at the end can add delay — we do not print a fake “fixed 5-hour” promise.",
    destinationNote: "Mallital vs Tallital hotel access differs. Restricted roads may need a last motorable drop.",
    heroImage: IMG.fortuner,
    gallery: [
      { src: IMG.innova, alt: "MPV for Dehradun to Nainital long taxi day" },
      { src: IMG.scorpio, alt: "SUV for Dehradun to Nainital hill arrival" },
    ],
    related: [
      "taxi-service-in-dehradun",
      "taxi-service-in-nainital",
      "haldwani-to-nainital-taxi",
      "nainital-sightseeing-taxi",
      "dehradun-to-jim-corbett-taxi",
    ],
  }),
  routeTaxi({
    slug: "haridwar-to-rishikesh-taxi",
    from: "Haridwar",
    to: "Rishikesh",
    h1: "Haridwar to Rishikesh taxi",
    title: "Haridwar to Rishikesh Taxi | Short Corridor Transfer | Arora Cars",
    keyword: "Haridwar to Rishikesh taxi",
    enquiryCity: "Haridwar",
    overview: "Short corridor chauffeur between Haridwar and Rishikesh — ideal after aarti or for ashram check-in.",
    considerations: "Evening aarti exit traffic in Haridwar can delay departure. Jhula-side hotels need a precise pin.",
    destinationNote: "Tapovan, Geeta Nagar, and highway hotels are different drops.",
    heroImage: IMG.rishikesh,
    gallery: [
      { src: IMG.sedan, alt: "Sedan taxi Haridwar to Rishikesh" },
      { src: IMG.haridwar, alt: "Haridwar departure context for Rishikesh taxi" },
    ],
    related: [
      "taxi-service-in-haridwar",
      "taxi-service-in-rishikesh",
      "rishikesh-to-dehradun-taxi",
      "haridwar-to-dehradun-taxi",
      "rishikesh-sightseeing-taxi",
    ],
  }),
  routeTaxi({
    slug: "haridwar-to-dehradun-taxi",
    from: "Haridwar",
    to: "Dehradun",
    h1: "Haridwar to Dehradun taxi",
    title: "Haridwar to Dehradun Taxi | Return & Airport Links | Arora Cars",
    keyword: "Haridwar to Dehradun taxi",
    enquiryCity: "Haridwar",
    overview: "Return chauffeur from Haridwar to Dehradun city, hotel, or onward airport timing when you name the flight.",
    considerations: "If you also need Jolly Grant, say so — city drop and airport drop are different quotes.",
    destinationNote: "Clock Tower hotels, Rajpur Road, ISBT, or railway — pick one primary pin.",
    heroImage: IMG.sedanPrem,
    gallery: [
      { src: IMG.innova, alt: "MPV Haridwar to Dehradun taxi" },
      { src: IMG.catSedan, alt: "Sedan for Haridwar to Dehradun transfer" },
    ],
    related: [
      "taxi-service-in-haridwar",
      "taxi-service-in-dehradun",
      "dehradun-to-haridwar-taxi",
      "dehradun-airport-taxi",
      "haridwar-to-rishikesh-taxi",
    ],
  }),
  routeTaxi({
    slug: "rishikesh-to-dehradun-taxi",
    from: "Rishikesh",
    to: "Dehradun",
    h1: "Rishikesh to Dehradun taxi",
    title: "Rishikesh to Dehradun Taxi | City & Airport | Arora Cars",
    keyword: "Rishikesh to Dehradun taxi",
    enquiryCity: "Rishikesh",
    overview: "Chauffeur from Rishikesh back to Dehradun hotels or timed toward Jolly Grant when your flight demands it.",
    considerations: "Early rafting finishes and late ashram check-outs change the clock — share the real time, not a hopeful one.",
    destinationNote: "City vs airport: always state which. Airport needs flight number/time.",
    heroImage: IMG.sedan,
    gallery: [
      { src: IMG.suv, alt: "SUV Rishikesh to Dehradun taxi" },
      { src: IMG.rishikesh, alt: "Rishikesh pickup context for Dehradun taxi" },
    ],
    related: [
      "taxi-service-in-rishikesh",
      "taxi-service-in-dehradun",
      "dehradun-to-rishikesh-taxi",
      "dehradun-airport-to-rishikesh-taxi",
      "rishikesh-to-mussoorie-taxi",
    ],
  }),
  routeTaxi({
    slug: "rishikesh-to-mussoorie-taxi",
    from: "Rishikesh",
    to: "Mussoorie",
    h1: "Rishikesh to Mussoorie taxi",
    title: "Rishikesh to Mussoorie Taxi | Via Dehradun Corridor | Arora Cars",
    keyword: "Rishikesh to Mussoorie taxi",
    enquiryCity: "Rishikesh",
    overview: "Cross-foothill chauffeur day linking Rishikesh stays with a Mussoorie hotel drop — usually via the Dehradun road pattern.",
    considerations: "It is a fuller day than Rishikesh–Haridwar. Fog and weekend Mall Road queues apply at the end.",
    destinationNote: "Share Mussoorie hotel access notes; many need a short walk from the car.",
    heroImage: IMG.mussoorie,
    gallery: [
      { src: IMG.suv, alt: "SUV for Rishikesh to Mussoorie taxi" },
      { src: IMG.innova, alt: "Family MPV Rishikesh to Mussoorie" },
    ],
    related: [
      "taxi-service-in-rishikesh",
      "taxi-service-in-mussoorie",
      "dehradun-to-mussoorie-taxi",
      "mussoorie-sightseeing-taxi",
      "rishikesh-to-dehradun-taxi",
    ],
  }),
  routeTaxi({
    slug: "haldwani-to-nainital-taxi",
    from: "Haldwani",
    to: "Nainital",
    h1: "Haldwani to Nainital taxi",
    title: "Haldwani to Nainital Taxi | Plains to Lake | Arora Cars",
    keyword: "Haldwani to Nainital taxi",
    enquiryCity: "Haldwani",
    overview: "The classic Kumaon climb from Haldwani plains up to Nainital — chauffeur, bags, and hotel pin included in the brief.",
    considerations: "Weekend jams near the lake are common. Early departures help. Monsoon slips need caution.",
    destinationNote: "Tallital and Mallital access rules differ — use your hotel’s meeting instructions.",
    heroImage: IMG.catSuv,
    gallery: [
      { src: IMG.suv, alt: "SUV Haldwani to Nainital taxi climb" },
      { src: IMG.innova, alt: "MPV for Haldwani to Nainital family taxi" },
    ],
    related: [
      "taxi-service-in-haldwani",
      "taxi-service-in-nainital",
      "kathgodam-to-nainital-taxi",
      "kathgodam-railway-station-to-nainital-taxi",
      "nainital-sightseeing-taxi",
    ],
  }),
  routeTaxi({
    slug: "kathgodam-to-nainital-taxi",
    from: "Kathgodam",
    to: "Nainital",
    h1: "Kathgodam to Nainital taxi",
    title: "Kathgodam to Nainital Taxi | Railway Arrival Transfer | Arora Cars",
    keyword: "Kathgodam to Nainital taxi",
    enquiryCity: "Haldwani",
    overview: "Train arrival at Kathgodam then chauffeur up to Nainital — built around ETA, luggage, and hotel access.",
    considerations: "Trains run late. Share PNR/ETA updates on WhatsApp so the driver is not guessing.",
    destinationNote: "Same lake-side access notes as other Nainital transfers — motorable point first.",
    heroImage: IMG.innova,
    gallery: [
      { src: IMG.suv, alt: "SUV Kathgodam to Nainital after train arrival" },
      { src: IMG.sedanPrem, alt: "Sedan option Kathgodam to Nainital taxi" },
    ],
    related: [
      "kathgodam-railway-station-to-nainital-taxi",
      "haldwani-to-nainital-taxi",
      "taxi-service-in-nainital",
      "taxi-service-in-haldwani",
      "nainital-sightseeing-taxi",
    ],
  }),
  routeTaxi({
    slug: "dehradun-to-auli-taxi",
    from: "Dehradun",
    to: "Auli",
    h1: "Dehradun to Auli taxi",
    title: "Dehradun to Auli Taxi | Seasonal Hill Transfer | Arora Cars",
    keyword: "Dehradun to Auli taxi",
    enquiryCity: "Dehradun",
    overview:
      "Seasonal long-haul chauffeur enquiry toward Auli / Joshimath side. Winter sports weeks and monsoon weeks are not the same road story.",
    considerations:
      "Altitude, permit/season notices, and overnight breaks may be required. We will not confirm a reckless same-day turnaround in bad weather.",
    destinationNote: "Auli access is via the Joshimath region pattern — share hotel/ropeway plans so the drop point is realistic.",
    heroImage: IMG.scorpio,
    gallery: [
      { src: IMG.fortuner, alt: "SUV for Dehradun to Auli seasonal taxi" },
      { src: IMG.chardham, alt: "High Himalaya approach context for Auli taxi guests" },
    ],
    related: [
      "taxi-service-in-dehradun",
      "badrinath-taxi-from-dehradun",
      "char-dham-taxi-service-from-dehradun",
      "taxi-service-in-srinagar-uttarakhand",
    ],
  }),
  routeTaxi({
    slug: "haridwar-to-mussoorie-taxi",
    from: "Haridwar",
    to: "Mussoorie",
    h1: "Haridwar to Mussoorie taxi",
    title: "Haridwar to Mussoorie Taxi | Pilgrimage to Hill Station | Arora Cars",
    keyword: "Haridwar to Mussoorie taxi",
    enquiryCity: "Haridwar",
    overview: "Combine a Haridwar stay with a Mussoorie hotel drop in one chauffeur brief — usually a fuller day via the Dehradun foothill pattern.",
    considerations: "Do not stack late aarti and late Mussoorie check-in without buffers. Fog on the climb is real in winter.",
    destinationNote: "Mussoorie hotel motorable points — same rules as other Mussoorie taxi pages.",
    heroImage: IMG.mussoorie,
    gallery: [
      { src: IMG.innova, alt: "MPV Haridwar to Mussoorie taxi" },
      { src: IMG.haridwar, alt: "Haridwar start for Mussoorie taxi day" },
    ],
    related: [
      "taxi-service-in-haridwar",
      "taxi-service-in-mussoorie",
      "dehradun-to-mussoorie-taxi",
      "haridwar-to-dehradun-taxi",
      "mussoorie-sightseeing-taxi",
    ],
  }),
  routeTaxi({
    slug: "delhi-to-dehradun-taxi",
    from: "Delhi",
    to: "Dehradun",
    h1: "Delhi to Dehradun taxi",
    title: "Delhi to Dehradun Taxi | NCR to Uttarakhand | Arora Cars",
    keyword: "Delhi to Dehradun taxi",
    enquiryCity: "Delhi",
    overview:
      "Highway chauffeur enquiry from Delhi NCR toward Dehradun. Pickup pin in Delhi matters as much as the Dehradun hotel drop.",
    considerations:
      "IGI arrival, Aerocity, and Gurugram starts are different. Night fog on the highway needs rest discipline — we quote honestly.",
    destinationNote: "Dehradun hotels, ISBT, or railway — name the drop. Clock Tower desk is our home base, not a Delhi garage.",
    heroImage: IMG.luxury,
    gallery: [
      { src: IMG.innova, alt: "MPV Delhi to Dehradun highway taxi" },
      { src: IMG.sedanPrem, alt: "Sedan option Delhi to Dehradun transfer" },
    ],
    related: [
      "dehradun-to-delhi-taxi",
      "taxi-service-in-dehradun",
      "delhi-to-rishikesh-taxi",
      "dehradun-airport-taxi",
      "taxi",
    ],
  }),
  routeTaxi({
    slug: "delhi-to-rishikesh-taxi",
    from: "Delhi",
    to: "Rishikesh",
    h1: "Delhi to Rishikesh taxi",
    title: "Delhi to Rishikesh Taxi | Direct Chauffeur | Arora Cars",
    keyword: "Delhi to Rishikesh taxi",
    enquiryCity: "Delhi",
    overview: "Long chauffeur day from Delhi NCR toward Rishikesh ashrams or hotels — share both ends precisely.",
    considerations: "Full-day highway. Prefer realistic departure times; stacking a late flight and late ashram check-in is how plans break.",
    destinationNote: "Tapovan vs highway hotel vs jhula-side — same pin discipline as other Rishikesh pages.",
    heroImage: IMG.rishikesh,
    gallery: [
      { src: IMG.fortuner, alt: "SUV Delhi to Rishikesh taxi" },
      { src: IMG.innova, alt: "Family MPV Delhi to Rishikesh" },
    ],
    related: [
      "delhi-to-dehradun-taxi",
      "taxi-service-in-rishikesh",
      "dehradun-to-rishikesh-taxi",
      "rishikesh-sightseeing-taxi",
      "dehradun-airport-to-rishikesh-taxi",
    ],
  }),
];

export const TAXI_AIRPORT_STATION_PAGES: LandingPage[] = [
  taxiPage({
    slug: "dehradun-airport-taxi",
    type: "route",
    title: "Dehradun Airport Taxi | Jolly Grant (DED) Pickup & Drop | Arora Cars",
    h1: "Dehradun airport taxi (Jolly Grant)",
    description: `Jolly Grant Airport (DED) taxi pickup and drop with chauffeur. Share flight time for Dehradun, Mussoorie, Rishikesh or Haridwar. Call ${P}.`,
    primaryKeyword: "Dehradun airport taxi",
    secondaryKeywords: ["Jolly Grant airport taxi", "DED airport cab", "Dehradun airport pickup"],
    enquiryCity: "Dehradun",
    heroImage: IMG.sedanPrem,
    gallery: [
      { src: IMG.innova, alt: "MPV for Jolly Grant airport taxi with luggage" },
      { src: IMG.suv, alt: "SUV airport taxi option from Dehradun airport" },
    ],
    intro:
      "Flying into Jolly Grant? Send your flight number and destination city. We arrange a chauffeur meet — not a random curb tout and not a self-drive key handover in the terminal car park unless you separately booked self-drive.",
    faqs: [
      {
        q: "Do you wait if the flight is late?",
        a: "Tell us the flight number. Reasonable delay waiting is part of airport work; extreme diversions are re-quoted honestly.",
      },
      ...bookFaqs("a Dehradun airport taxi"),
    ],
    sections: [
      {
        heading: "Pickup and drop",
        body: "Arrival pickup after you exit, or departure drop timed to check-in. Name domestic terminal timing and how many bags.",
      },
      {
        heading: "Where guests go next",
        body: "Dehradun city, [Mussoorie](/dehradun-airport-to-mussoorie-taxi), [Rishikesh](/dehradun-airport-to-rishikesh-taxi), [Haridwar](/dehradun-airport-to-haridwar-taxi) — each is a different clock.",
      },
      {
        heading: "Luggage and travellers",
        body: "Golf bags, multiple suitcases, elders, and child seats (if you need one) change the vehicle class. Say it up front.",
      },
    ],
    relatedSlugs: [
      "dehradun-airport-to-rishikesh-taxi",
      "dehradun-airport-to-mussoorie-taxi",
      "dehradun-airport-to-haridwar-taxi",
      "taxi-service-in-dehradun",
      "jolly-grant-airport-car-rental",
      "dehradun-railway-station-taxi",
    ],
  }),
  routeTaxi({
    slug: "dehradun-airport-to-rishikesh-taxi",
    from: "Dehradun Airport",
    to: "Rishikesh",
    h1: "Dehradun airport to Rishikesh taxi",
    title: "Dehradun Airport to Rishikesh Taxi | Jolly Grant Transfer | Arora Cars",
    keyword: "Dehradun airport to Rishikesh taxi",
    enquiryCity: "Dehradun",
    overview: "Flight landing at Jolly Grant then chauffeur onward to Rishikesh — built around ETA and hotel pin.",
    considerations: "Late evening flights plus jhula-side hotels need a clear meeting point. Bags from the carousel add time.",
    destinationNote: "Ashram vs Tapovan vs highway hotel — specify.",
    heroImage: IMG.rishikesh,
    gallery: [
      { src: IMG.innova, alt: "Airport MPV Jolly Grant to Rishikesh" },
      { src: IMG.sedanPrem, alt: "Sedan Dehradun airport to Rishikesh taxi" },
    ],
    related: [
      "dehradun-airport-taxi",
      "taxi-service-in-rishikesh",
      "dehradun-to-rishikesh-taxi",
      "dehradun-airport-to-haridwar-taxi",
      "rishikesh-sightseeing-taxi",
    ],
  }),
  routeTaxi({
    slug: "dehradun-airport-to-mussoorie-taxi",
    from: "Dehradun Airport",
    to: "Mussoorie",
    h1: "Dehradun airport to Mussoorie taxi",
    title: "Dehradun Airport to Mussoorie Taxi | Hill Transfer | Arora Cars",
    keyword: "Dehradun airport to Mussoorie taxi",
    enquiryCity: "Dehradun",
    overview: "Jolly Grant arrival to Mussoorie hotel with chauffeur — allow hill time after the flight, especially in fog.",
    considerations: "Do not plan a razor-thin connection to a Mall Road dinner the same night without buffers.",
    destinationNote: "Hotel motorable point in Mussoorie required.",
    heroImage: IMG.mussoorie,
    gallery: [
      { src: IMG.suv, alt: "SUV from Dehradun airport to Mussoorie" },
      { src: IMG.fortuner, alt: "Family SUV airport to Mussoorie taxi" },
    ],
    related: [
      "dehradun-airport-taxi",
      "dehradun-to-mussoorie-taxi",
      "taxi-service-in-mussoorie",
      "mussoorie-sightseeing-taxi",
      "dehradun-airport-to-rishikesh-taxi",
    ],
  }),
  routeTaxi({
    slug: "dehradun-airport-to-haridwar-taxi",
    from: "Dehradun Airport",
    to: "Haridwar",
    h1: "Dehradun airport to Haridwar taxi",
    title: "Dehradun Airport to Haridwar Taxi | Flight to Ghat City | Arora Cars",
    keyword: "Dehradun airport to Haridwar taxi",
    enquiryCity: "Dehradun",
    overview: "Land at Jolly Grant, continue by chauffeur to Haridwar hotels or station-side stays.",
    considerations: "Aarti evening arrivals need patience on the last miles. Share if you also need a next-morning Char Dham start.",
    destinationNote: "Hotel gate vs station — pick the real drop.",
    heroImage: IMG.haridwar,
    gallery: [
      { src: IMG.innova, alt: "MPV Dehradun airport to Haridwar" },
      { src: IMG.sedan, alt: "Sedan airport taxi to Haridwar" },
    ],
    related: [
      "dehradun-airport-taxi",
      "dehradun-to-haridwar-taxi",
      "taxi-service-in-haridwar",
      "char-dham-taxi-service-from-haridwar",
      "dehradun-airport-to-rishikesh-taxi",
    ],
  }),
  taxiPage({
    slug: "dehradun-railway-station-taxi",
    type: "route",
    title: "Dehradun Railway Station Taxi | Pickup & Drop | Arora Cars",
    h1: "Dehradun railway station taxi",
    description: `Taxi pickup and drop at Dehradun Railway Station with chauffeur. Share train ETA and hotel pin. Call ${P}.`,
    primaryKeyword: "Dehradun railway station taxi",
    secondaryKeywords: ["Dehradun station cab", "railway station taxi Dehradun"],
    enquiryCity: "Dehradun",
    heroImage: IMG.sedan,
    gallery: [
      { src: IMG.catSedan, alt: "Sedan for Dehradun railway station taxi pickup" },
      { src: IMG.innova, alt: "MPV for family pickup at Dehradun railway station" },
    ],
    intro:
      "Arriving by train at Dehradun? Send the train name/ETA and whether you need the city, ISBT link, or a same-day hill departure. Station exits differ — describe your coach side if you can.",
    faqs: [
      {
        q: "Trains are often late — what then?",
        a: "WhatsApp the live ETA. We plan waiting reasonably; multi-hour holds are reconfirmed.",
      },
      ...bookFaqs("a Dehradun station taxi"),
    ],
    sections: [
      {
        heading: "Station pickup / drop",
        body: "Meet at an agreed exit, load bags, continue to hotel or onward city. Departure drops should include platform timing buffers.",
      },
      {
        heading: "Onward ideas",
        body: "Same-day [Mussoorie](/dehradun-to-mussoorie-taxi) only if the train is sane. Otherwise rest in Dehradun first.",
      },
    ],
    relatedSlugs: [
      "taxi-service-in-dehradun",
      "dehradun-airport-taxi",
      "dehradun-to-mussoorie-taxi",
      "car-rental-near-dehradun-railway-station",
      "taxi",
    ],
  }),
  taxiPage({
    slug: "kathgodam-railway-station-to-nainital-taxi",
    type: "route",
    title: "Kathgodam Railway Station to Nainital Taxi | Arora Cars",
    h1: "Kathgodam railway station to Nainital taxi",
    description: `Kathgodam station to Nainital chauffeur transfer. Share train ETA and hotel access point. Call ${P}.`,
    primaryKeyword: "Kathgodam railway station to Nainital taxi",
    secondaryKeywords: ["Kathgodam to Nainital cab", "Kathgodam station taxi"],
    enquiryCity: "Haldwani",
    heroImage: IMG.innova,
    gallery: [
      { src: IMG.suv, alt: "SUV from Kathgodam railway station to Nainital" },
      { src: IMG.catSuv, alt: "Hill SUV for Kathgodam station taxi arrivals" },
    ],
    intro:
      "Kathgodam is the rail gate for Nainital. This page is specifically station→lake chauffeur intent — luggage, ETA slips, and restricted hotel roads included in the planning.",
    faqs: [
      {
        q: "Is Kathgodam the same as Haldwani?",
        a: "They are neighbours. Your ticket may say Kathgodam while your hotel says Haldwani pickup — tell us the exact station name on the ticket.",
      },
      ...bookFaqs("Kathgodam station to Nainital taxi"),
    ],
    sections: [
      {
        heading: "Arrival flow",
        body: "Exit station, meet chauffeur at the agreed point, climb toward Nainital with stops if elders need them.",
      },
      {
        heading: "Hotel access",
        body: "Many Nainital hotels are not car-door-to-lobby. We drop at the legal motorable point your property uses.",
      },
    ],
    relatedSlugs: [
      "kathgodam-to-nainital-taxi",
      "haldwani-to-nainital-taxi",
      "taxi-service-in-nainital",
      "taxi-service-in-haldwani",
      "nainital-sightseeing-taxi",
    ],
  }),
];

function sightseeingTaxi(opts: {
  slug: string;
  place: string;
  title: string;
  keyword: string;
  intro: string;
  attractions: string;
  heroImage: string;
  gallery: LandingGalleryImage[];
  related: string[];
  enquiryCity: string;
}): LandingPage {
  return taxiPage({
    slug: opts.slug,
    type: "info",
    title: opts.title,
    h1: `${opts.place} sightseeing taxi`,
    description: `${opts.place} sightseeing taxi with chauffeur — flexible day itinerary on enquiry. Call ${P}. No fake per-km tourist rates published.`,
    primaryKeyword: opts.keyword,
    secondaryKeywords: [`${opts.place} sightseeing cab`, `${opts.place} full day taxi`],
    enquiryCity: opts.enquiryCity,
    heroImage: opts.heroImage,
    gallery: opts.gallery,
    intro: opts.intro,
    faqs: [
      {
        q: "Do you sell a fixed sightseeing package price here?",
        a: "No. Hours, waiting, and peak days change the quote. Share the list of stops and we price the day.",
      },
      ...bookFaqs(`${opts.place} sightseeing taxi`),
    ],
    sections: [
      {
        heading: "Typical stops people ask for",
        body: opts.attractions,
      },
      {
        heading: "How the day works",
        body: "You propose a loose order of places; the driver sequences what the roads and parking allow. It is a private car day, not a bus tour seat.",
      },
      {
        heading: "Full-day vs half-day",
        body: "Tell us roughly how many hours. We do not invent “8 hours ₹xxxx” banners on this page.",
      },
    ],
    relatedSlugs: opts.related,
  });
}

export const TAXI_TOURISM_PAGES: LandingPage[] = [
  taxiPage({
    slug: "char-dham-taxi-service-from-dehradun",
    type: "route",
    title: "Char Dham Taxi Service from Dehradun | Road Yatra Enquiry | Arora Cars",
    h1: "Char Dham taxi service from Dehradun",
    description: `Char Dham road taxi enquiry from Dehradun with chauffeur — multi-day planning, honest motorable limits. Call ${P}.`,
    primaryKeyword: "Char Dham taxi service from Dehradun",
    secondaryKeywords: ["Char Dham cab from Dehradun", "Chardham yatra taxi Dehradun"],
    enquiryCity: "Dehradun",
    heroImage: IMG.chardham,
    gallery: [
      { src: IMG.innova, alt: "Innova-class vehicle for Char Dham taxi from Dehradun" },
      { src: IMG.scorpio, alt: "SUV for Char Dham road yatra taxi enquiry" },
    ],
    intro:
      "Char Dham by road is a multi-day chauffeur project, not a same-day sightseeing loop. From Dehradun we plan realistic legs, night halts, and the motorable ends of each dham — never a claim that a taxi parks at Kedarnath temple door.",
    faqs: [
      {
        q: "Can a taxi go to Kedarnath temple?",
        a: "No. Road ends at the motorable head (Sonprayag / Gaurikund pattern depending on rules that season). Trek or local arrangements beyond that are separate from the highway taxi.",
      },
      ...bookFaqs("Char Dham taxi from Dehradun"),
    ],
    sections: [
      {
        heading: "What we can cover by road",
        body: "Highway and hill-road chauffeur days toward Yamunotri / Gangotri / Kedarnath road-head / Badrinath side as your permit and season allow. Exact sequence is planned on WhatsApp.",
      },
      {
        heading: "Multi-day enquiry details we need",
        body: "Start date, passenger count, preferred dham order, whether elders need shorter days, and whether you already hold lodge bookings.",
      },
      {
        heading: "Related starts",
        body: "Some families start from [Haridwar](/char-dham-taxi-service-from-haridwar) after aarti. Kedarnath-only road intent: [Kedarnath taxi from Dehradun](/kedarnath-taxi-from-dehradun).",
      },
    ],
    relatedSlugs: [
      "char-dham-taxi-service-from-haridwar",
      "kedarnath-taxi-from-dehradun",
      "badrinath-taxi-from-dehradun",
      "taxi-service-in-dehradun",
      "car-rental-char-dham-yatra",
      "taxi",
    ],
  }),
  taxiPage({
    slug: "char-dham-taxi-service-from-haridwar",
    type: "route",
    title: "Char Dham Taxi Service from Haridwar | Yatra Road Enquiry | Arora Cars",
    h1: "Char Dham taxi service from Haridwar",
    description: `Start Char Dham road travel from Haridwar with a chauffeur quote. Honest road-head limits. Call ${P}.`,
    primaryKeyword: "Char Dham taxi service from Haridwar",
    secondaryKeywords: ["Char Dham cab Haridwar", "Haridwar Chardham taxi"],
    enquiryCity: "Haridwar",
    heroImage: IMG.chardham,
    gallery: [
      { src: IMG.haridwar, alt: "Haridwar as starting city for Char Dham taxi" },
      { src: IMG.innova, alt: "MPV for Char Dham taxi from Haridwar" },
    ],
    intro:
      "Many yatris take aarti in Haridwar then begin the Char Dham road circuit. We quote chauffeur days from Haridwar with the same honesty about motorable ends — especially Kedarnath.",
    faqs: [
      {
        q: "Should we sleep in Haridwar first?",
        a: "Often yes after a long train/flight. An exhausted midnight departure toward the hills is how trips fail.",
      },
      ...bookFaqs("Char Dham taxi from Haridwar"),
    ],
    sections: [
      {
        heading: "Haridwar start pattern",
        body: "Station/hotel pickup, optional aarti timing, then first hill leg as season allows.",
      },
      {
        heading: "Road limits still apply",
        body: "Temple-door myths are false for Kedarnath. We drop where cars are allowed that season.",
      },
    ],
    relatedSlugs: [
      "char-dham-taxi-service-from-dehradun",
      "taxi-service-in-haridwar",
      "kedarnath-taxi-from-dehradun",
      "badrinath-taxi-from-dehradun",
      "haridwar-to-rishikesh-taxi",
    ],
  }),
  taxiPage({
    slug: "kedarnath-taxi-from-dehradun",
    type: "route",
    title: "Kedarnath Taxi from Dehradun | Road-Head Transfer | Arora Cars",
    h1: "Kedarnath taxi from Dehradun",
    description: `Dehradun to Kedarnath road-head taxi enquiry. Cars do not reach the temple — we explain the motorable drop. Call ${P}.`,
    primaryKeyword: "Kedarnath taxi from Dehradun",
    secondaryKeywords: ["Dehradun to Kedarnath cab", "Kedarnath road taxi"],
    enquiryCity: "Dehradun",
    heroImage: IMG.chardham,
    gallery: [
      { src: IMG.scorpio, alt: "SUV for Dehradun toward Kedarnath road-head" },
      { src: IMG.bolero, alt: "Utility SUV used on pilgrimage road taxi enquiries" },
    ],
    intro:
      "Important: a taxi cannot drive to Kedarnath temple. From Dehradun we chauffeur you along the highway/hill road to the permitted motorable head (commonly discussed as Sonprayag / Gaurikund side depending on that season’s rules). Trek, pony, or helicopter beyond that is outside the car segment.",
    faqs: [
      {
        q: "Will you take us to the temple door by car?",
        a: "No. Anyone selling “car to Kedarnath temple” is misleading you. We stop where private cars are allowed.",
      },
      {
        q: "Is this same-day return from Dehradun?",
        a: "Unrealistic for most families. Plan night halt(s). We will say no to unsafe same-day fantasies.",
      },
      ...bookFaqs("Kedarnath road taxi from Dehradun"),
    ],
    sections: [
      {
        heading: "What the car actually does",
        body: "Dehradun (or Haridwar) start → hill highways → last motorable point for Kedarnath trek arrangements. Confirm current local vehicle rules when you travel — they change.",
      },
      {
        heading: "Who this is for",
        body: "Families who want a trusted chauffeur for the long road, not a shared tempo experiment with strangers’ luggage.",
      },
    ],
    relatedSlugs: [
      "char-dham-taxi-service-from-dehradun",
      "badrinath-taxi-from-dehradun",
      "car-rental-kedarnath",
      "taxi-service-in-dehradun",
      "dehradun-to-auli-taxi",
    ],
  }),
  taxiPage({
    slug: "badrinath-taxi-from-dehradun",
    type: "route",
    title: "Badrinath Taxi from Dehradun | Road Transfer Enquiry | Arora Cars",
    h1: "Badrinath taxi from Dehradun",
    description: `Dehradun to Badrinath chauffeur taxi enquiry via the Joshimath corridor in season. Call ${P}.`,
    primaryKeyword: "Badrinath taxi from Dehradun",
    secondaryKeywords: ["Dehradun to Badrinath cab", "Badrinath road taxi"],
    enquiryCity: "Dehradun",
    heroImage: IMG.chardham,
    gallery: [
      { src: IMG.innova, alt: "MPV for Dehradun to Badrinath taxi corridor" },
      { src: IMG.fortuner, alt: "SUV for Badrinath road taxi from Dehradun" },
    ],
    intro:
      "Badrinath is a high road dham — seasonal opening matters. From Dehradun we plan chauffeur days via the Garhwal highway with night halts. Weather and landslides can force holds; we do not pretend otherwise.",
    faqs: [
      {
        q: "Is Badrinath open all year?",
        a: "No. Temple and road access follow seasonal notices. We only confirm travel inside realistic windows.",
      },
      ...bookFaqs("Badrinath taxi from Dehradun"),
    ],
    sections: [
      {
        heading: "Corridor reality",
        body: "Expect a multi-day pattern with possible halt near Joshimath / pipeline towns depending on your pace and lodging.",
      },
      {
        heading: "Combine with Char Dham?",
        body: "Yes on enquiry — see [Char Dham from Dehradun](/char-dham-taxi-service-from-dehradun).",
      },
    ],
    relatedSlugs: [
      "char-dham-taxi-service-from-dehradun",
      "kedarnath-taxi-from-dehradun",
      "dehradun-to-auli-taxi",
      "taxi-service-in-srinagar-uttarakhand",
      "car-rental-badrinath",
    ],
  }),
  routeTaxi({
    slug: "dehradun-to-jim-corbett-taxi",
    from: "Dehradun",
    to: "Jim Corbett",
    h1: "Dehradun to Jim Corbett taxi",
    title: "Dehradun to Jim Corbett Taxi | Safari Gate Transfer | Arora Cars",
    keyword: "Dehradun to Jim Corbett taxi",
    enquiryCity: "Dehradun",
    overview:
      "Chauffeur transfer from Dehradun toward Jim Corbett tiger reserve gates / nearby resorts. Safari jeeps inside the park are a different product — we handle the highway leg to your resort or gate briefing point.",
    considerations:
      "Gate names (Ramnagar side patterns etc.) and resort check-in times matter. We do not sell park entry tickets on this page.",
    destinationNote: "Share resort name or gate. “Corbett” alone is not a GPS pin.",
    heroImage: IMG.scorpio,
    gallery: [
      { src: IMG.suv, alt: "SUV Dehradun to Jim Corbett taxi" },
      { src: IMG.innova, alt: "Family MPV to Corbett resorts from Dehradun" },
    ],
    related: [
      "taxi-service-in-dehradun",
      "dehradun-to-nainital-taxi",
      "taxi-service-in-haldwani",
      "taxi-service-in-nainital",
      "taxi",
    ],
  }),
  sightseeingTaxi({
    slug: "nainital-sightseeing-taxi",
    place: "Nainital",
    title: "Nainital Sightseeing Taxi | Lake District Day Hire | Arora Cars",
    keyword: "Nainital sightseeing taxi",
    enquiryCity: "Nainital",
    intro:
      "Private chauffeur for a Nainital sightseeing day — lake viewpoints, nearby lakes, and hotel returns — sequenced for parking reality, not a brochure fantasy.",
    attractions:
      "Common asks include Snow View / cable-car area approaches, Zoo road, and nearby Bhimtal or Sattal if time allows. Mall Road walking stretches are still walking — the car waits where allowed.",
    heroImage: IMG.fortuner,
    gallery: [
      { src: IMG.suv, alt: "SUV for Nainital sightseeing taxi day" },
      { src: IMG.sedanPrem, alt: "Sedan option for Nainital local sightseeing" },
    ],
    related: [
      "taxi-service-in-nainital",
      "haldwani-to-nainital-taxi",
      "kathgodam-to-nainital-taxi",
      "taxi-service-in-haldwani",
      "dehradun-to-nainital-taxi",
    ],
  }),
  sightseeingTaxi({
    slug: "mussoorie-sightseeing-taxi",
    place: "Mussoorie",
    title: "Mussoorie Sightseeing Taxi | Hill Station Day Hire | Arora Cars",
    keyword: "Mussoorie sightseeing taxi",
    enquiryCity: "Mussoorie",
    intro:
      "Chauffeur for Mussoorie viewpoints and nearby stops when you want the driver to handle parking and hairpins while you enjoy the ridge.",
    attractions:
      "Kempty area, Gun Hill approaches, Company Garden side, and Landour loops are common — traffic police and parking decide the exact order.",
    heroImage: IMG.mussoorie,
    gallery: [
      { src: IMG.suv, alt: "SUV for Mussoorie sightseeing taxi" },
      { src: IMG.sedan, alt: "Sedan for Mussoorie local sightseeing hire" },
    ],
    related: [
      "taxi-service-in-mussoorie",
      "dehradun-to-mussoorie-taxi",
      "dehradun-airport-to-mussoorie-taxi",
      "taxi-service-in-dehradun",
      "rishikesh-to-mussoorie-taxi",
    ],
  }),
  sightseeingTaxi({
    slug: "rishikesh-sightseeing-taxi",
    place: "Rishikesh",
    title: "Rishikesh Sightseeing Taxi | Ghat & Tapovan Day Hire | Arora Cars",
    keyword: "Rishikesh sightseeing taxi",
    enquiryCity: "Rishikesh",
    intro:
      "Private car with driver for Rishikesh temples, viewpoints, and ashram hops — with honest limits on where cars can idle near the jhulas.",
    attractions:
      "Common asks: Triveni / ghat areas as reachable, Beatles ashram approaches if open, Neelkanth half-day if roads allow, and Tapovan hotel circuits.",
    heroImage: IMG.rishikesh,
    gallery: [
      { src: IMG.sedanPrem, alt: "Sedan for Rishikesh sightseeing taxi" },
      { src: IMG.suv, alt: "SUV for Rishikesh and Neelkanth taxi day" },
    ],
    related: [
      "taxi-service-in-rishikesh",
      "dehradun-to-rishikesh-taxi",
      "haridwar-to-rishikesh-taxi",
      "dehradun-airport-to-rishikesh-taxi",
      "taxi-service-in-haridwar",
    ],
  }),
];

export const TAXI_PAGES: LandingPage[] = [
  TAXI_HUB,
  ...TAXI_CITY_PAGES,
  ...TAXI_ROUTE_PAGES,
  ...TAXI_AIRPORT_STATION_PAGES,
  ...TAXI_TOURISM_PAGES,
];

export const TAXI_PAGE_SLUGS = new Set(TAXI_PAGES.map((p) => p.slug));

export function isTaxiPath(path: string) {
  const slug = path.replace(/^\//, "").split("?")[0];
  return slug === "taxi" || TAXI_PAGE_SLUGS.has(slug);
}

