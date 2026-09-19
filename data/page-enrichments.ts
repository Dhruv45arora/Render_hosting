import type { Faq, LandingPage } from "./pages";

/** Deepen existing commercial pages — merges onto LANDING_PAGES by slug. */
export type PageEnrichment = Partial<
  Pick<
    LandingPage,
    | "title"
    | "h1"
    | "description"
    | "primaryKeyword"
    | "secondaryKeywords"
    | "intro"
    | "sections"
    | "faqs"
    | "relatedSlugs"
    | "badge"
  >
> & {
  /** Prefer another URL for indexing when this page is a legacy/near-duplicate. */
  canonicalSlug?: string;
  includes?: string[];
  excludes?: string[];
  howToBook?: string[];
};

const P = "8057772925";

export const PAGE_ENRICHMENTS: Record<string, PageEnrichment> = {
  "self-drive-car-rental-dehradun": {
    title: "Self Drive Car Rental in Dehradun | Documents, Deposit & Booking | Arora Cars",
    description:
      "Self drive car rental in Dehradun — hatchbacks, sedans and SUVs. Documents, deposit, fuel and km policy explained. Book on WhatsApp or call 8057772925.",
    sections: [
      {
        heading: "What self drive means at Arora Cars",
        body: "You drive; we provide a hill-checked car from Clock Tower, Dehradun. You choose pickup at our desk, your hotel, Dehradun Railway Station, ISBT, or Jolly Grant Airport (delivery charges apply when agreed). Fuel is typically as-is / as-is unless you choose full-to-full. Daily km limits and extra-km rates are confirmed before you leave — they are listed on each vehicle card.",
      },
      {
        heading: "Documents, age and deposit",
        body: "Bring a valid driving licence held for at least one year, one government photo ID, and the refundable deposit shown on the vehicle page (varies by model). Drivers must be 21+. We photograph the licence at handover. NRI guests can share documents on WhatsApp before arrival.",
      },
      {
        heading: "Where guests usually go",
        body: "City runs, Sahastradhara and Robber's Cave, Mussoorie day trips, Rishikesh and Haridwar, and longer Uttarakhand routes when you tell us in advance. Mountain nights and Char Dham approaches need an honest conversation first — self drive is not the right product for every itinerary.",
      },
      {
        heading: "Self drive vs a car with driver",
        body: "Choose self drive when you want flexibility and already drive Indian hills. Choose chauffeur for Jolly Grant arrivals, Haridwar aarti traffic, multi-day yatra, or any night you do not want to be on a hairpin. See our chauffeur hub and the self-drive vs chauffeur guide for a side-by-side.",
      },
    ],
    faqs: [
      {
        q: "What documents do I need for self drive in Dehradun?",
        a: "Valid driving licence (1+ year), government photo ID (Aadhaar, passport or voter ID), and the refundable security deposit for that car. Share copies on WhatsApp before arrival if you prefer a pre-check.",
      },
      {
        q: "Is there a minimum age?",
        a: "Drivers must be at least 21 with a licence valid for one year or more.",
      },
      {
        q: "Can I take a self drive car to Mussoorie or Rishikesh?",
        a: "Yes, with prior intimation. Uttarakhand outstation use including Mussoorie, Rishikesh, Haridwar and agreed Char Dham approach roads is allowed when the booking says so.",
      },
      {
        q: "How do I book?",
        a: `Call or WhatsApp ${P} with dates, pickup point and the model you want. Or open a vehicle page and send the booking form — it lands in our inbox.`,
      },
    ],
    relatedSlugs: [
      "car-rental-dehradun",
      "suv-rental-dehradun",
      "documents-required-self-drive",
      "car-rental-dehradun-to-mussoorie",
      "chauffeur-driven-car-rental-dehradun",
      "how-to-book",
      "car-rental-pricing-dehradun",
    ],
    includes: [
      "Hill-checked hatchback, sedan or SUV as booked",
      "Agreed daily km package (see vehicle page)",
      "Roadside support number for the rental period",
      "Pickup options across Dehradun when arranged",
    ],
    excludes: [
      "Fuel (as-is / as-is unless full-to-full agreed)",
      "Tolls, parking and hill permits",
      "Extra km beyond the package",
      "Damage beyond normal wear — deposit / policy excess applies",
    ],
    howToBook: [
      "Pick a car or SUV from the fleet below or the full fleet page",
      `WhatsApp or call ${P} with dates and pickup point`,
      "Share licence + ID; pay the agreed advance",
      "Collect the car, check scratches together, drive",
    ],
  },

  "chauffeur-driven-car-rental-dehradun": {
    title: "Car Rental with Driver in Dehradun | Chauffeur & Outstation | Arora Cars",
    description:
      "Car hire with driver in Dehradun for airport, Mussoorie, Rishikesh, Haridwar and Char Dham. Local drivers, clear daily rates. Call 8057772925.",
    primaryKeyword: "car rental with driver Dehradun",
    secondaryKeywords: [
      "chauffeur driven car Dehradun",
      "outstation car rental Dehradun",
      "private car with driver Dehradun",
    ],
    sections: [
      {
        heading: "When a driver is the better product",
        body: "Airport arrivals, evening Haridwar aarti, fog on the Mussoorie climb, multi-day Char Dham, and family trips with elders. You pay a chauffeur daily rate that includes the driver; tolls, parking and night-halt allowances are confirmed before you book.",
      },
      {
        heading: "Vehicles we send with a driver",
        body: "Dzire and similar sedans for 1–3 guests, Ertiga or Innova for families, Creta/Scorpio/XUV700 for hill comfort, Tempo Traveller for groups. Luxury sedans and wedding cars are chauffeur-only.",
      },
      {
        heading: "Outstation from Dehradun",
        body: "Mussoorie, Rishikesh, Haridwar, Nainital, Auli and Char Dham circuits are regular chauffeur jobs. Share passenger count, luggage and whether you need a same-day return or overnight — the quote changes with nights and waiting.",
      },
    ],
    faqs: [
      {
        q: "Is the driver included in the daily rate?",
        a: "Yes. Tolls, parking, hill permits and night-halt allowances are extra and stated before confirmation.",
      },
      {
        q: "Do you cover outstation trips?",
        a: "Yes — Mussoorie, Rishikesh, Haridwar, Nainital, Auli and full Char Dham packages with hill-experienced drivers.",
      },
      {
        q: "How do I book a car with driver?",
        a: `Call or WhatsApp ${P} with date, pickup (hotel / station / ISBT / Jolly Grant) and destination.`,
      },
    ],
    relatedSlugs: [
      "car-rental-dehradun",
      "jolly-grant-airport-car-rental",
      "car-rental-char-dham-yatra",
      "self-drive-car-rental-dehradun",
      "outstation-car-rental-dehradun",
      "how-to-book",
    ],
    includes: ["Driver for the booked hours/days", "Vehicle as confirmed", "Local hill-route familiarity on request"],
    excludes: ["Tolls, parking, permits", "Driver night-halt / meal allowances on multi-day trips", "Fuel when quoted separately"],
    howToBook: [
      "Tell us date, passengers and destination",
      `WhatsApp ${P} or use the contact form`,
      "Confirm vehicle class and inclusions",
      "Driver meets you at the agreed pin",
    ],
  },

  "bike-rental-dehradun": {
    title: "Bike Rental in Dehradun | Bullet, Himalayan & Commuters | Arora Cars",
    description:
      "Bike on rent in Dehradun — Royal Enfield Bullet, Classic, Himalayan, Pulsar and more. Helmets, deposit and station pickup. WhatsApp 8057772925.",
    sections: [
      {
        heading: "Which bike for which trip",
        body: "City and short hops: Splendor, Unicorn, Pulsar 150. Tourist classic: Bullet / Classic 350 for Mussoorie. Longer hill touring: Himalayan or Interceptor after we brief you. We prefer 150cc+ for the Mussoorie climb when two-up.",
      },
      {
        heading: "Pickup points",
        body: "Clock Tower / Paltan Bazaar desk, Dehradun Railway Station exit, and ISBT by arrangement. Share your train or bus time so we are waiting with the bike and a helmet.",
      },
      {
        heading: "What you need",
        body: "Two-wheeler licence, photo ID, and the deposit listed on the model page. One helmet is included; ask for a second. Tell us the route before you leave — highway scooty use and late-night returns have different rules.",
      },
    ],
    relatedSlugs: [
      "scooty-on-rent-dehradun",
      "bike-rental-dehradun-to-mussoorie",
      "bike-rental-near-isbt-dehradun",
      "documents-required-self-drive",
      "car-rental-pricing-dehradun",
      "how-to-book",
    ],
    includes: ["Bike as booked", "One helmet", "Agreed km package"],
    excludes: ["Fuel", "Second helmet unless requested", "Traffic fines"],
  },

  "scooty-on-rent-dehradun": {
    title: "Scooty on Rent in Dehradun | Activa Rental Near Station | Arora Cars",
    description:
      "Activa and scooty on rent in Dehradun — railway station pickup available. Automatic scooters for city sightseeing. Book 8057772925.",
    sections: [
      {
        heading: "Why tourists search “scooty on rent in Dehradun”",
        body: "An Activa is the lowest-stress way to do Paltan Bazaar, Robber's Cave, Sahastradhara and evening food runs if you are not taking a car. Activa 6G and Activa 125 are our highest-stock models; Jupiter, Access and Dio are alternatives when Activa is booked out.",
      },
      {
        heading: "Railway station and airport",
        body: "We deliver Activa near the Dehradun railway station exit on request. Jolly Grant guests usually take a chauffeur car to the hotel first, then a scooty for city days — a scooty on the airport highway is not our default recommendation for first-time riders.",
      },
      {
        heading: "Scooty vs bike for Mussoorie or Rishikesh",
        body: "City: scooty. Mussoorie climb or Rishikesh highway two-up: bike or car is usually safer. We will say no to a booking if the route and the rider do not match.",
      },
    ],
    relatedSlugs: [
      "scooty-rental-near-railway-station-dehradun",
      "bike-rental-dehradun",
      "car-rental-dehradun-sahastradhara",
      "how-to-book",
      "car-rental-pricing-dehradun",
    ],
  },

  "suv-rental-dehradun": {
    title: "SUV Rental in Dehradun | Self Drive & With Driver | Arora Cars",
    description:
      "SUV on rent in Dehradun — Creta, Brezza, Thar, Innova, Scorpio, XUV700. Self drive or chauffeur for Mussoorie and Char Dham. Call 8057772925.",
    sections: [
      {
        heading: "Why an SUV on Uttarakhand roads",
        body: "Ground clearance and cooling matter on the Mussoorie climb and yatra approaches. Couples often book Venue, Brezza or Nexon. Families book Creta, Seltos or Alcazar. Groups and Char Dham: Innova, Scorpio-N, XUV700 or Bolero. Adventure weekends: Thar or Jimny when available.",
      },
      {
        heading: "Self drive SUV or with driver",
        body: "Self drive SUVs are popular for Mussoorie weekends. Multi-day Char Dham and night hill driving are usually better with a chauffeur — see the Char Dham and chauffeur pages for that product.",
      },
    ],
    relatedSlugs: [
      "self-drive-car-rental-dehradun",
      "car-rental-dehradun",
      "suv-rental-dehradun-to-mussoorie",
      "self-drive-car-chardham-yatra",
      "car-rental-char-dham-yatra",
    ],
  },

  "tempo-traveller-rental-dehradun": {
    title: "Tempo Traveller Rental Dehradun | 12, 17, 20 Seater | Arora Cars",
    description:
      "Tempo Traveller on rent in Dehradun with driver — 9 to 26 seater, AC options, Char Dham and group tours. Call 8057772925.",
    sections: [
      {
        heading: "Which seating for which group",
        body: "9–12 seater for one extended family. 15–17 for two families or a small tour batch. 20–26 for larger yatra groups. Urbania when you want coach-style seats without hiring a bus. All Tempo Travellers go with a driver.",
      },
      {
        heading: "Char Dham and hill groups",
        body: "A 12-seater is the most booked yatra van from Dehradun. We plan luggage so elderly passengers are not climbing over bags at every halt. AC helps on lower stretches; it matters less at altitude.",
      },
    ],
    relatedSlugs: [
      "tempo-traveller-char-dham-yatra",
      "car-rental-char-dham-yatra",
      "wedding-car-rental-dehradun",
      "how-to-book",
    ],
  },

  "luxury-car-rental-dehradun": {
    relatedSlugs: [
      "wedding-car-rental-dehradun",
      "jolly-grant-airport-car-rental",
      "car-rental-dehradun",
      "chauffeur-driven-car-rental-dehradun",
    ],
  },

  "wedding-car-rental-dehradun": {
    relatedSlugs: [
      "luxury-car-rental-dehradun",
      "tempo-traveller-rental-dehradun",
      "jolly-grant-airport-car-rental",
      "contact-book-now",
    ],
  },

  "car-rental-dehradun-to-mussoorie": {
    title: "Dehradun to Mussoorie Car Rental | Self Drive & Driver | Arora Cars",
    description:
      "Car rental Dehradun to Mussoorie — about 34 km / 1h 15m. Self drive or chauffeur SUV recommended for the climb. Book 8057772925.",
    sections: [
      {
        heading: "Route at a glance",
        body: "Dehradun to Mussoorie is roughly 34 km and often about 1 hour 15 minutes in clear traffic. The climb steepens after Rajpur Road. Sunday evenings and holiday descents queue. Approximate distance and time — always check live traffic before you leave.",
      },
      {
        heading: "Self drive or chauffeur",
        body: "Self drive is fine in daylight if you are comfortable with hairpins. After dark, in monsoon mist, or with elders in the car, take a driver. We recommend Creta, Brezza or Dzire for couples; Innova or Ertiga for families with luggage.",
      },
      {
        heading: "Parking and Mall Road",
        body: "Mall Road is not a long-stay car park. Use designated stands and walk. A compact SUV is easier in town than a large Fortuner if you insist on self-drive into the bazaar.",
      },
      {
        heading: "Bike and scooty options",
        body: "Bullet and Himalayan day rides are popular. Scooty is better kept for Dehradun city unless you are an experienced rider — see the bike Mussoorie page for two-wheeler specifics.",
      },
    ],
    faqs: [
      {
        q: "How far is Mussoorie from Dehradun by car?",
        a: "About 34 km. Typical drive time is around 1 hour 15 minutes without heavy traffic. Treat both as approximate.",
      },
      {
        q: "Self drive or driver for Mussoorie?",
        a: "Self drive in daylight if you know hill roads. Prefer a chauffeur after dark, in fog, or for a relaxed family trip.",
      },
      {
        q: "How do I book?",
        a: `WhatsApp or call ${P} with date, passenger count and whether you want self drive or a driver.`,
      },
    ],
    relatedSlugs: [
      "suv-rental-dehradun-to-mussoorie",
      "bike-rental-dehradun-to-mussoorie",
      "self-drive-car-rental-mussoorie",
      "self-drive-car-rental-dehradun",
      "car-rental-dehradun",
      "jolly-grant-airport-car-rental",
    ],
  },

  "car-rental-dehradun-to-rishikesh": {
    sections: [
      {
        heading: "Route at a glance",
        body: "Dehradun to Rishikesh is about 43 km — often around an hour on the highway in clear conditions. Popular combo: Jolly Grant pickup then Rishikesh drop, or a two-day loop with Haridwar aarti.",
      },
      {
        heading: "Vehicle choice",
        body: "Sedan or compact SUV for most guests. Tapovan and Laxman Jhula parking is tight — a compact car or a chauffeur who knows the drop points beats a large SUV in the old town.",
      },
      {
        heading: "Bike note",
        body: "150cc+ bikes are fine for experienced riders. Scooty on the highway is allowed only after we talk — see the bike Rishikesh page.",
      },
    ],
    relatedSlugs: [
      "bike-rental-dehradun-to-rishikesh",
      "car-rental-dehradun-to-haridwar",
      "jolly-grant-airport-car-rental",
      "car-rental-dehradun",
      "chauffeur-driven-car-rental-dehradun",
    ],
  },

  "car-rental-dehradun-to-haridwar": {
    sections: [
      {
        heading: "Route at a glance",
        body: "Dehradun to Haridwar is about 52 km — often around 1 hour 20 minutes. Evening aarti timing matters more than the kilometres. We plan waiting and return so you are not stuck in bazaar traffic after dark.",
      },
      {
        heading: "Why chauffeur is often easier",
        body: "Lanes near Har Ki Pauri are not self-drive friendly at peak aarti. A driver who knows drop-and-wait points saves the evening. Same-night return to Dehradun is the usual pattern.",
      },
    ],
    relatedSlugs: [
      "chauffeur-driven-car-rental-haridwar",
      "car-rental-dehradun-to-rishikesh",
      "car-rental-dehradun",
      "dehradun-to-rishikesh-haridwar-self-drive",
    ],
  },

  "car-rental-char-dham-yatra": {
    title: "Char Dham Yatra Car Rental from Dehradun | Innova, Scorpio, Tempo | Arora Cars",
    description:
      "Char Dham taxi and car rental from Dehradun — Innova, Scorpio, XUV700 and Tempo Traveller with hill drivers. Call 8057772925.",
    primaryKeyword: "Char Dham taxi from Dehradun",
    secondaryKeywords: ["Char Dham car rental Dehradun", "Innova Char Dham", "Char Dham Tempo Traveller"],
    sections: [
      {
        heading: "What we actually book",
        body: "Multi-day chauffeur packages from Dehradun covering all four dhams or a two-dham split (Yamunotri–Gangotri or Kedarnath–Badrinath). Drivers who have run this circuit that season — not a one-off outstation hire.",
      },
      {
        heading: "Vehicle guide",
        body: "Up to 4 guests: Innova or XUV700. 6–7: Scorpio-N or Crysta. 8–12: Tempo Traveller 12s. We do not send small hatches on this route. Self drive exists as a separate product for experienced hill drivers only.",
      },
      {
        heading: "Planning honesty",
        body: "Road openings, weather and last-mile jeep/trek segments change every season. WhatsApp your travel week — we confirm what is open before you pay an advance. Individual dham pages cover Yamunotri, Gangotri, Kedarnath and Badrinath approaches.",
      },
    ],
    relatedSlugs: [
      "tempo-traveller-char-dham-yatra",
      "self-drive-car-chardham-yatra",
      "car-rental-kedarnath",
      "car-rental-badrinath",
      "car-rental-yamunotri",
      "car-rental-gangotri",
      "chauffeur-driven-car-rental-dehradun",
    ],
  },

  "self-drive-car-chardham-yatra": {
    primaryKeyword: "self drive Char Dham",
    secondaryKeywords: ["self drive car Char Dham yatra", "SUV Char Dham from Dehradun"],
    title: "Self Drive Car for Char Dham Yatra from Dehradun | Arora Cars",
    description:
      "Self drive SUV for Char Dham from Dehradun — experienced hill drivers only. Serviced SUVs, km packages, route briefing. Call 8057772925.",
    relatedSlugs: [
      "car-rental-char-dham-yatra",
      "suv-rental-dehradun",
      "tempo-traveller-char-dham-yatra",
      "self-drive-car-rental-dehradun",
    ],
  },

  "jolly-grant-airport-car-rental": {
    title: "Jolly Grant Airport Car Rental | Dehradun Airport Pickup | Arora Cars",
    description:
      "Dehradun airport car rental — Jolly Grant (DED) pickup to city, Mussoorie or Rishikesh. Dzire, Innova, Creta with driver. Call 8057772925.",
    sections: [
      {
        heading: "How airport pickup works",
        body: "Share your flight number. We track delays within a reasonable window and meet you at arrivals with a nameboard. Airport jobs are chauffeur — you are not signing self-drive papers at the kerb. Self drive handover can happen later at your hotel.",
      },
      {
        heading: "Which vehicle",
        body: "1–3 guests: Dzire. 4–6 with bags: Ertiga or Innova. Luxury: Camry or E-Class when booked. Mussoorie and Rishikesh drops are common same-day transfers.",
      },
    ],
    relatedSlugs: [
      "chauffeur-driven-car-rental-dehradun",
      "car-rental-near-dehradun-railway-station",
      "car-rental-dehradun-to-mussoorie",
      "car-rental-dehradun-to-rishikesh",
      "car-rental-dehradun",
    ],
  },

  "car-rental-near-dehradun-railway-station": {
    sections: [
      {
        heading: "Station pickup",
        body: "Share your train number. We wait at the exit with a nameboard — car, Innova, or Activa if that is what you booked. Late-night arrivals are routine; we operate booking and pickup around the clock.",
      },
      {
        heading: "Scooty and bike at the station",
        body: "Many tourists want an Activa at the railway exit. See the dedicated scooty-near-railway page for licence and deposit details.",
      },
    ],
    relatedSlugs: [
      "scooty-rental-near-railway-station-dehradun",
      "bike-rental-near-isbt-dehradun",
      "jolly-grant-airport-car-rental",
      "car-rental-dehradun",
    ],
  },

  "car-rental-pricing-dehradun": {
    title: "Car Rental Prices in Dehradun | Bike, Scooty & Tempo Rates | Arora Cars",
    description:
      "Transparent rental pricing in Dehradun — starting daily rates for cars, SUVs, Activa, Bullet and Tempo Traveller. Confirm live rates on 8057772925.",
    sections: [
      {
        heading: "How to read our prices",
        body: "Every vehicle card shows a starting price per day from our live fleet database. Peak weekends, Char Dham season and wedding dates can be higher — seasonal overrides in admin exist for that reason. Fuel is not included unless the booking says full-to-full.",
      },
      {
        heading: "Ballpark starting rates (off-peak, confirm before booking)",
        body: "Scooty from about ₹450/day. Commuter bikes from about ₹400. Royal Enfield from about ₹1,200. Hatchbacks from about ₹1,400. SUVs from about ₹2,200. Tempo Traveller 12-seater from about ₹5,500. Luxury chauffeur from about ₹8,000. Always confirm the exact payable on WhatsApp — cards can change with availability.",
      },
      {
        heading: "What affects the final quote",
        body: "Duration (daily / weekly / monthly), km package, self drive vs chauffeur, outstation nights, airport or station delivery, and seasonal demand. Deposits are refundable after inspection and vary by vehicle class.",
      },
    ],
    relatedSlugs: [
      "car-fleet-dehradun",
      "car-rental-dehradun",
      "self-drive-car-rental-dehradun",
      "scooty-on-rent-dehradun",
      "how-to-book",
    ],
  },

  "documents-required-self-drive": {
    title: "Documents Required for Self Drive Rental in Dehradun | Arora Cars",
    relatedSlugs: [
      "self-drive-car-rental-dehradun",
      "how-to-book",
      "insurance-info",
      "faq",
      "car-rental-dehradun",
    ],
  },

  "how-to-book": {
    relatedSlugs: ["contact-book-now", "faq", "car-rental-dehradun", "cancellation-policy"],
  },

  "faq": {
    sections: [
      {
        heading: "Still need a human?",
        body: `Call or WhatsApp ${P}. Same-day needs are faster by phone than email. Office reference: Clock Tower, Dehradun – 248001.`,
      },
    ],
    relatedSlugs: ["how-to-book", "documents-required-self-drive", "contact-book-now", "car-rental-dehradun"],
  },

  "dehradun-to-mussoorie-self-drive": {
    canonicalSlug: "car-rental-dehradun-to-mussoorie",
    intro:
      "This legacy URL stays live for old links. For the full Dehradun → Mussoorie rental guide (self drive and chauffeur), use our main Mussoorie car rental page.",
    sections: [
      {
        heading: "Continue on the main Mussoorie page",
        body: "Distance, vehicle advice, parking notes and booking CTAs are maintained on /car-rental-dehradun-to-mussoorie. Self drive cars and SUVs for Mussoorie are listed there and on the self-drive hub.",
      },
    ],
    relatedSlugs: ["car-rental-dehradun-to-mussoorie", "self-drive-car-rental-dehradun", "suv-rental-dehradun-to-mussoorie"],
  },

  "char-dham-yatra-car-rental": {
    canonicalSlug: "car-rental-char-dham-yatra",
    intro:
      "This legacy Char Dham URL is preserved for existing links and Search Console history. The full circuit guide lives on our main Char Dham car rental page.",
    sections: [
      {
        heading: "Use the primary Char Dham page",
        body: "Vehicle options, Tempo Traveller groups and dham-wise links are updated on /car-rental-char-dham-yatra. Book on the same number: 8057772925.",
      },
    ],
    relatedSlugs: ["car-rental-char-dham-yatra", "tempo-traveller-char-dham-yatra", "self-drive-car-chardham-yatra"],
  },

  "two-wheeler-rental-dehradun": {
    canonicalSlug: "bike-rental-dehradun",
    intro:
      "Two-wheeler rental in Dehradun covers bikes and scooty. For model lists and booking, use the bike hub and the scooty/Activa hub — this page exists so the umbrella search query has a clean landing URL.",
    relatedSlugs: ["bike-rental-dehradun", "scooty-on-rent-dehradun", "car-rental-dehradun"],
  },

  "car-rental-kedarnath": {
    title: "Car Rental Dehradun to Kedarnath | Taxi & SUV with Driver | Arora Cars",
    description:
      "Kedarnath taxi and car rental from Dehradun to Sonprayag / Gaurikund sector. Bolero, Innova, Tempo with hill drivers. Call 8057772925.",
    primaryKeyword: "car rental Dehradun to Kedarnath",
    secondaryKeywords: ["Kedarnath taxi from Dehradun", "Kedarnath cab booking Dehradun", "Bolero Kedarnath"],
    sections: [
      {
        heading: "What this booking covers",
        body: "Chauffeur SUV or Tempo from Dehradun toward the Kedarnath motorable head (Sonprayag / Gaurikund sector as open that season). Last mile is trek or helicopter — not a car. We stage overnight stops when the same-day push is unrealistic.",
      },
      {
        heading: "Vehicle options",
        body: "Bolero for traditional yatra groups. Innova / Crysta for families who want more comfort on the long highway days. Tempo Traveller when the group is larger than one SUV. Self drive only after we confirm the guest has serious hill experience.",
      },
      {
        heading: "Distance and time (approximate)",
        body: "Dehradun to the Sonprayag sector is a long hill day — plan overnight stops rather than treating it like a city transfer. Exact hours depend on season, landslides and convoy rules. We confirm the open route when you share dates.",
      },
      {
        heading: "Fuel, tolls and drivers",
        body: "Outstation chauffeur packages include the driver and vehicle. Fuel, tolls, parking and driver allowance are confirmed in the WhatsApp quote — not invented on the page as a fake fixed fare.",
      },
    ],
    faqs: [
      {
        q: "Does the rental car go up to Kedarnath temple?",
        a: "No. Cars stop at the motorable head. Temple access is by trek, pony or helicopter as per current rules.",
      },
      {
        q: "Can I book one-way only?",
        a: "Usually we quote round-trip or multi-day with overnight staging. One-way drop-offs need an explicit quote.",
      },
      {
        q: "How do I book?",
        a: `WhatsApp ${P} with travel dates, passenger count and overnight preference.`,
      },
    ],
    relatedSlugs: [
      "car-rental-badrinath",
      "car-rental-char-dham-yatra",
      "tempo-traveller-char-dham-yatra",
      "suv-rental-dehradun",
      "chauffeur-driven-car-rental-dehradun",
    ],
    howToBook: [
      "Share dates and group size on WhatsApp",
      "We confirm road status for that week",
      "Choose Bolero / Innova / Tempo",
      "Pay agreed advance; driver details before departure",
    ],
  },

  "car-rental-badrinath": {
    title: "Car Rental Dehradun to Badrinath | Taxi & SUV | Arora Cars",
    description:
      "Badrinath taxi and car rental from Dehradun via Joshimath. SUV and Tempo with hill drivers. Call 8057772925.",
    primaryKeyword: "car rental Dehradun to Badrinath",
    secondaryKeywords: ["Badrinath taxi from Dehradun", "Badrinath cab booking", "Badrinath trip from Dehradun"],
    sections: [
      {
        heading: "Route overview",
        body: "Badrinath is the longest of the four dhams from Dehradun. Packages are multi-day with a driver. We only confirm when that season’s Joshimath / Mana road notes look workable.",
      },
      {
        heading: "Vehicles",
        body: "Innova, Scorpio, XUV700 or Tempo Traveller. Not a hatchback product. Optional Joshimath or Auli night if you ask up front so the km package stays honest.",
      },
    ],
    faqs: [
      {
        q: "Can we combine Kedarnath and Badrinath?",
        a: "Yes — that is a common two-dham split. Share nights so we quote the circuit correctly.",
      },
      {
        q: "Is self drive available?",
        a: "Only for experienced hill drivers after briefing. Most families book chauffeur for this route.",
      },
    ],
    relatedSlugs: [
      "car-rental-kedarnath",
      "car-rental-dehradun-to-auli",
      "car-rental-char-dham-yatra",
      "tempo-traveller-char-dham-yatra",
    ],
  },

  "car-rental-gangotri": {
    title: "Car Rental Dehradun to Gangotri | Taxi Booking | Arora Cars",
    description:
      "Gangotri taxi and car rental from Dehradun — hill SUVs and Tempo Traveller with driver. Call 8057772925.",
    primaryKeyword: "taxi Dehradun to Gangotri",
    secondaryKeywords: ["Gangotri taxi booking", "Gangotri car rental", "Gangotri trip from Dehradun"],
    sections: [
      {
        heading: "What to expect",
        body: "Longer than a map glance suggests. We plan fuel, driver rest and a realistic arrival so the last gorge is not done in the dark. Often paired with Yamunotri as a western two-dham.",
      },
      {
        heading: "Vehicle choice",
        body: "Innova, Scorpio or Tempo. Self drive only for experienced hill drivers after a briefing.",
      },
    ],
    relatedSlugs: ["car-rental-yamunotri", "car-rental-char-dham-yatra", "tempo-traveller-char-dham-yatra"],
  },

  "car-rental-yamunotri": {
    title: "Car Rental Dehradun to Yamunotri | Taxi & SUV | Arora Cars",
    description:
      "Yamunotri yatra car rental from Dehradun — SUV or Tempo with driver till Janki Chatti. Call 8057772925.",
    primaryKeyword: "taxi Dehradun to Yamunotri",
    secondaryKeywords: ["Yamunotri taxi booking", "Yamunotri trip from Dehradun", "Yamunotri car rental"],
    sections: [
      {
        heading: "Road vs trek",
        body: "Motorable till Janki Chatti (as open that season), then trek or palanquin to the temple. We stage the car and driver for the return so the group is not stranded at dusk.",
      },
      {
        heading: "Typical pairing",
        body: "Yamunotri is often combined with Gangotri. Tell us your nights — we quote a two-dham circuit, not a misleading one-way drop.",
      },
    ],
    relatedSlugs: ["car-rental-gangotri", "car-rental-char-dham-yatra", "tempo-traveller-char-dham-yatra"],
  },

  "tempo-traveller-char-dham-yatra": {
    title: "Tempo Traveller for Char Dham Yatra from Dehradun | 12–26 Seater | Arora Cars",
    description:
      "Char Dham Tempo Traveller from Dehradun — 12, 17, 20 and 26 seater with driver for group yatra. Call 8057772925.",
    primaryKeyword: "Char Dham Tempo Traveller",
    secondaryKeywords: ["tempo traveller Char Dham", "12 seater tempo Char Dham", "tempo traveller for Kedarnath"],
    sections: [
      {
        heading: "When a Tempo makes sense",
        body: "Families and yatra groups larger than one SUV. One vehicle, one driver, luggage under the seats. Seat count must include bags — do not book every seat if you have large suitcases.",
      },
      {
        heading: "Sizes we quote",
        body: "12 seater for one extended family. 15–17 for two families. 20–26 for larger batches. Exact availability changes by season — WhatsApp the headcount.",
      },
    ],
    relatedSlugs: [
      "tempo-traveller-rental-dehradun",
      "car-rental-char-dham-yatra",
      "car-rental-kedarnath",
      "car-rental-badrinath",
    ],
  },

  "bike-rental-near-isbt-dehradun": {
    title: "Bike & Scooty Rental near ISBT Dehradun | Arora Cars",
    description:
      "Bike and Activa on rent near ISBT Dehradun — bus-stand pickup with licence check. Call 8057772925.",
    sections: [
      {
        heading: "ISBT pickup",
        body: "Share your bus ETA. We meet near the main ISBT exit with the bike or Activa and a helmet. Exact pin goes on WhatsApp so you do not cross the highway twice with luggage.",
      },
      {
        heading: "Need a car instead?",
        body: "Groups with bags often want a Dzire or Innova at ISBT rather than a two-wheeler. See car rental near ISBT.",
      },
    ],
    relatedSlugs: [
      "car-rental-near-isbt-dehradun",
      "scooty-on-rent-dehradun",
      "bike-rental-dehradun",
      "car-rental-near-dehradun-railway-station",
    ],
  },

  "car-rental-near-isbt-dehradun": {
    title: "Car Rental near ISBT Dehradun | Pickup & Self Drive | Arora Cars",
    description:
      "Car rental near ISBT Dehradun — chauffeur pickup or self drive handover after your bus arrival. Call 8057772925.",
    primaryKeyword: "car rental near ISBT Dehradun",
    secondaryKeywords: ["taxi near ISBT Dehradun", "vehicle rental near ISBT Dehradun"],
    sections: [
      {
        heading: "Bus-stand pickup that works",
        body: "Volvos and hill buses dump tired travellers at ISBT. Share your bus and ETA — we meet with a Dzire, Ertiga or Innova for onward Dehradun, Mussoorie or Rishikesh. Self drive papers are easier at Clock Tower or your hotel than on the bus-stand kerb.",
      },
      {
        heading: "Two-wheelers at the same point",
        body: "Solo travellers often want an Activa or Pulsar at ISBT. That product lives on the bike-near-ISBT page with licence and deposit rules.",
      },
    ],
    faqs: [
      {
        q: "Can you wait if the bus is late?",
        a: "Yes within a reasonable window when you share live location or an updated ETA on WhatsApp.",
      },
      {
        q: "Self drive at ISBT?",
        a: "Possible by arrangement. Many guests prefer hotel handover after a chauffeur transfer from the bus stand.",
      },
    ],
    relatedSlugs: [
      "bike-rental-near-isbt-dehradun",
      "car-rental-near-dehradun-railway-station",
      "jolly-grant-airport-car-rental",
      "car-rental-dehradun",
      "chauffeur-driven-car-rental-dehradun",
    ],
    howToBook: [
      "WhatsApp bus name + ETA + passenger count",
      "Choose car, SUV or two-wheeler",
      "We send meeting pin",
      "Pay agreed amount; drive or ride on",
    ],
  },
};

export function mergePage(
  base: LandingPage
): LandingPage & {
  canonicalSlug?: string;
  includes?: string[];
  excludes?: string[];
  howToBook?: string[];
} {
  const e = PAGE_ENRICHMENTS[base.slug];
  if (!e) return base;
  return {
    ...base,
    title: e.title ?? base.title,
    h1: e.h1 ?? base.h1,
    description: e.description ?? base.description,
    primaryKeyword: e.primaryKeyword ?? base.primaryKeyword,
    secondaryKeywords: e.secondaryKeywords ?? base.secondaryKeywords,
    intro: e.intro ?? base.intro,
    badge: e.badge ?? base.badge,
    sections: e.sections ?? base.sections,
    faqs: e.faqs ?? base.faqs,
    relatedSlugs: e.relatedSlugs ?? base.relatedSlugs,
    canonicalSlug: e.canonicalSlug,
    includes: e.includes,
    excludes: e.excludes,
    howToBook: e.howToBook,
  };
}
