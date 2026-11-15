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

const P = "8445619130";

export const PAGE_ENRICHMENTS: Record<string, PageEnrichment> = {
  "self-drive-car-rental-dehradun": {
    title: "Self Drive Car Rental in Dehradun | Documents, Deposit & Booking | Arora Cars",
    description:
      "Self drive car rental in Dehradun — hatchbacks, sedans and SUVs. Documents, deposit, fuel and km policy explained. Book on WhatsApp or call 8445619130.",
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
      "Car hire with driver in Dehradun for airport, Mussoorie, Rishikesh, Haridwar and Char Dham. Local drivers, clear daily rates. Call 8445619130.",
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
 "Bike on rent in Dehradun — Bullet, Himalayan, Pulsar and more. Helmets, deposit, Clock Tower / station / ISBT pickup. Self drive. WhatsApp 8445619130.",
    sections: [
      {
        heading: "Which bike for which trip",
        body: "City and short hops: Splendor, Unicorn, Pulsar 150. Tourist classic: Bullet / Classic 350 for Mussoorie. Longer hill touring: Himalayan or Interceptor after we brief you. We prefer 150cc+ for the Mussoorie climb when two-up.",
      },
      {
 heading: "Bullet on rent in Dehradun",
 body: "Classic / Bullet 350 is our most requested tourist bike for Mall Road photos and the Mussoorie climb. Confirm dates early for weekends — stock is limited.",
 },
 {
 heading: "Himalayan bike rental",
 body: "Himalayan suits Chakrata, longer ridge days and guests who want more travel luggage than a Classic. We brief gearing, return-by time and weather before handover.",
 },
 {
 heading: "Pickup near Clock Tower, railway or ISBT",
 body: "Clock Tower / Paltan Bazaar desk is the default. Dehradun Railway Station exit and ISBT pickup are by arrangement — share train or bus time so we wait with the bike and a helmet.",
      },
      {
        heading: "What you need",
        body: "Two-wheeler licence, photo ID, and the deposit listed on the model page. One helmet is included; ask for a second. Tell us the route before you leave — highway scooty use and late-night returns have different rules.",
      },
      {
 heading: "Scooty vs bike · duration and fuel",
 body: "City food runs often prefer Activa (scooty hub). Mussoorie or highway two-up usually needs a motorcycle. Daily hire is standard; weekly packages are labelled on cards. Fuel is not included unless agreed. Walk around lights, brakes and tyres at handover.",
 },
 ],
 faqs: [
 {
 q: "Do you give helmets?",
 a: "Yes, one helmet is included. A second helmet can be added on request.",
 },
 {
 q: "Can I ride to Mussoorie?",
 a: "Yes on our 150cc+ and RE bikes. Tell us the route so we brief you on the climb and return time.",
 },
 {
 q: "Is Bullet on rent available in Dehradun?",
 a: "Yes — Classic / Bullet 350 is our most requested tourist bike. Confirm dates on WhatsApp; peak weekends sell out.",
 },
 {
 q: "Can I pick up near Clock Tower or ISBT?",
 a: "Clock Tower / Paltan Bazaar is our usual desk. Railway exit and ISBT pickup are by arrangement — share train or bus time so we are waiting with the bike.",
 },
 {
 q: "How do I book a bike?",
 a: `Call or WhatsApp ${P} with dates, pickup point and the model. Or open a vehicle card below and send the form.`,
      },
    ],
    relatedSlugs: [
      "scooty-on-rent-dehradun",
      "bike-rental-dehradun-to-mussoorie",
      "bike-rental-near-isbt-dehradun",
 "car-rental-near-clock-tower-dehradun",
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
 "Activa on rent in Dehradun — automatic scooty for city sightseeing, railway station pickup available. Call or WhatsApp 8445619130 to book.",
 primaryKeyword: "scooty on rent in Dehradun",
 secondaryKeywords: [
 "Activa rental Dehradun",
 "scooty rental near railway station Dehradun",
 "best scooty for Dehradun tourists",
 "Activa 125 on rent Dehradun",
 ],
 intro:
 "The phrase people actually search: scooty on rent in Dehradun. Activa 6G, Activa 125, Jupiter, Access and Dio — delivered at the railway station, Clock Tower area or ISBT by arrangement. Starting rates are on each card; confirm before you pay an advance.",
    sections: [
      {
        heading: "Why tourists search “scooty on rent in Dehradun”",
        body: "An Activa is the lowest-stress way to do Paltan Bazaar, Robber's Cave, Sahastradhara and evening food runs if you are not taking a car. Activa 6G and Activa 125 are our highest-stock models; Jupiter, Access and Dio are alternatives when Activa is booked out.",
      },
      {
 heading: "Best scooty for first-time tourists — Activa 6G vs 125",
 body: "Most first-time visitors are fine on <strong>Activa 6G</strong> for city loops. Choose <strong>Activa 125</strong> if you are two-up with a backpack or want a bit more pull on gentle climbs. This page is for <em>renting</em> a scooty — not buying one. See our short comparison guide, then book from the cards below.",
 },
 {
 heading: "Railway station, Clock Tower and ISBT pickup",
 body: "We deliver Activa near the Dehradun railway station exit on request — details on <a href=\"/scooty-rental-near-railway-station-dehradun\">scooty near railway station</a>. Clock Tower / Paltan hotels can walk up or request hotel delivery. Bus arrivals: share ETA for <a href=\"/bike-rental-near-isbt-dehradun\">ISBT two-wheeler pickup</a>. Jolly Grant guests usually take a chauffeur car to the hotel first, then a scooty for city days — a scooty on the airport highway is not our default for first-time riders.",
      },
      {
        heading: "Scooty vs bike for Mussoorie or Rishikesh",
 body: "City: scooty. Mussoorie climb or Rishikesh highway two-up: <a href=\"/bike-rental-dehradun\">bike</a> or <a href=\"/car-rental-dehradun\">car</a> is usually safer. We will say no to a booking if the route and the rider do not match.",
      },
      {
        heading: "Scooter rental, documents and deposit",
        body: "Scooter rental in Dehradun means this Activa and scooty fleet. You need a two-wheeler licence, a photo ID, and the refundable deposit shown on the model. Daily hire is standard; a weekly Activa package is listed separately when you want several days. Fuel is extra unless agreed.",
      },
    ],
 faqs: [
 {
 q: "Is Activa available daily?",
 a: "Activa 6G and 125 are our highest-stock scooters. Peak weekends sell out — WhatsApp a day ahead.",
 },
 {
 q: "Railway station pickup?",
 a: "Yes. Search scooty rental near railway station Dehradun — we meet you at the exit with the Activa.",
 },
 {
 q: "What is the best scooty for a first-time tourist in Dehradun?",
 a: "Activa 6G for solo or light city runs. Activa 125 if two-up with bags. For Mussoorie climb or highway two-up, we usually recommend a bike or car instead.",
 },
 {
 q: "What documents do I need for a scooty?",
 a: "Two-wheeler licence, photo ID, and the refundable deposit shown on the model card. One helmet is included.",
 },
 {
 q: "Do you offer weekly Activa rental?",
 a: "Yes when labelled on the vehicle card. Share dates on WhatsApp and we confirm the km package.",
 },
 {
 q: `How do I book an Activa?`,
 a: `Call or WhatsApp Arora Cars on ${P}. Share dates and pickup (station, Clock Tower, ISBT or hotel).`,
 },
 ],
    relatedSlugs: [
      "scooty-rental-near-railway-station-dehradun",
      "bike-rental-dehradun",
 "bike-rental-near-clock-tower-dehradun",
 "bike-rental-near-isbt-dehradun",
 "car-rental-dehradun",
      "car-rental-dehradun-sahastradhara",
      "how-to-book",
      "car-rental-pricing-dehradun",
    ],
  },

  "suv-rental-dehradun": {
    title: "SUV Rental in Dehradun | Self Drive & With Driver | Arora Cars",
    description:
      "SUV on rent in Dehradun — Creta, Brezza, Thar, Innova, Scorpio, XUV700. Self drive or chauffeur for Mussoorie and Char Dham. Call 8445619130.",
    sections: [
      {
        heading: "Why an SUV on Uttarakhand roads",
        body: "Ground clearance and cooling matter on the Mussoorie climb and yatra approaches. Couples often book Venue, Brezza or Nexon. Families book Creta, Seltos or Alcazar. Groups and Char Dham: Innova, Scorpio-N, XUV700 or Bolero. Adventure weekends: Thar or Jimny when available.",
      },
      {
        heading: "Self drive SUV or with driver",
        body: "Self drive SUVs are popular for Mussoorie weekends. Multi-day Char Dham and night hill driving are usually better with a chauffeur — see the Char Dham and chauffeur pages for that product.",
      },
      {
        heading: "Seven-seaters (MUV) on this list",
        body: "Innova, Ertiga, XL6, Carens and similar 6–7 seaters are booked from this SUV fleet, not from a separate MUV desk. Use them for families and airport groups. A Tempo Traveller is the next step when one MUV is not enough.",
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
      "Tempo Traveller on rent in Dehradun with driver — 9 to 26 seater, AC options, Char Dham and group tours. Call 8445619130.",
    sections: [
      {
        heading: "Which seating for which group",
        body: "9–12 seater for one extended family. 15–17 for two families or a small tour batch. 20–26 for larger yatra groups. Urbania when you want coach-style seats without hiring a bus. All Tempo Travellers go with a driver.",
      },
      {
        heading: "Char Dham and hill groups",
        body: "A 12-seater is the most booked yatra van from Dehradun. We plan luggage so elderly passengers are not climbing over bags at every halt. AC helps on lower stretches; it matters less at altitude.",
      },
      {
        heading: "Traveller van, not a full-size bus",
        body: "Tempo Traveller and Force Urbania are the group vehicles we actually run — 9 to 26 seats with a driver. We do not list a full-size bus. If the group is larger than one Tempo, book two vehicles and tell us the movement plan.",
      },
    ],
    relatedSlugs: [
      "tempo-traveller-char-dham-yatra",
      "car-rental-char-dham-yatra",
      "wedding-car-rental-dehradun",
      "how-to-book",
    ],
  },

 // luxury / three-wheeler / chota hathi: enriched in data/pages.ts core (avoid double override)

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
      "Car rental Dehradun to Mussoorie — about 34 km / 1h 15m. Self drive or chauffeur SUV recommended for the climb. Book 8445619130.",
    secondaryKeywords: ["self drive Mussoorie", "SUV hire Dehradun to Mussoorie"],
    sections: [
      {
        heading: "Route at a glance",
        body: "Dehradun to Mussoorie is roughly 34 km and often about 1 hour 15 minutes in clear traffic. The climb steepens after Rajpur Road. Sunday evenings and holiday descents crawl. Approximate distance and time — always check live traffic before you leave.",
      },
      {
        heading: "Self drive or chauffeur",
        body: "Self drive is fine in daylight if you are comfortable with hairpins. After dark, in monsoon mist, or with elders in the car, take a driver. We recommend Creta, Brezza or Dzire for couples; Innova or Ertiga for families with luggage.",
      },
      {
        heading: "Car rental vs point-to-point taxi",
        body: "This page is for hiring a car for the Mussoorie trip (self drive or with driver for the period you need). For a one-way or round-trip chauffeur transfer with pickup and drop only, use <a href=\"/dehradun-to-mussoorie-taxi\">Dehradun to Mussoorie taxi</a>.",
      },
      {
        heading: "Parking and Mall Road",
        body: "Mall Road is not a long-stay car park. Use designated stands and walk. A compact SUV is easier in town than a large Fortuner if you insist on self-drive into the bazaar.",
      },
      {
        heading: "Bike and scooty options",
        body: "Bullet and Himalayan day rides are popular. Scooty is better kept for Dehradun city unless you are an experienced rider — see the bike Mussoorie page for two-wheeler specifics.",
      },
      {
        heading: "How to choose the vehicle",
        body: "Two people and light bags: hatchback, compact SUV, or a Bullet if you want to ride. A family with suitcases: Innova or Ertiga. First time on this climb, or travelling after dark: chauffeur. Fuel, tolls and Mall Road parking are extra. Confirm the km package before you leave Dehradun.",
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
        q: "Should I book car rental or a taxi transfer?",
        a: "Car rental when you need the vehicle for hours or days. Point-to-point chauffeur transfer only — use the Dehradun to Mussoorie taxi page.",
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
      "dehradun-to-mussoorie-taxi",
    ],
  },
  "car-rental-dehradun-to-rishikesh": {
    title: "Car Rental Dehradun to Rishikesh | Self Drive & With Driver | Arora Cars",
    secondaryKeywords: ["self drive Rishikesh", "car hire Dehradun to Rishikesh"],
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
        heading: "Car rental vs point-to-point taxi",
        body: "Book this page when you need the car for hours or days (self drive or with driver). For a chauffeur transfer with pickup and drop only, see <a href=\"/dehradun-to-rishikesh-taxi\">Dehradun to Rishikesh taxi</a>.",
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
      "dehradun-to-rishikesh-taxi",
    ],
  },
  "car-rental-dehradun-to-haridwar": {
    secondaryKeywords: ["chauffeur driven car Haridwar", "self drive Haridwar from Dehradun"],
    sections: [
      {
        heading: "Route at a glance",
        body: "Dehradun to Haridwar is about 52 km — often around 1 hour 20 minutes. Evening aarti timing matters more than the kilometres. We plan waiting and return so you are not stuck in bazaar traffic after dark.",
      },
      {
        heading: "Why chauffeur is often easier",
        body: "Lanes near Har Ki Pauri are not self-drive friendly at peak aarti. A driver who knows drop-and-wait points saves the evening. Same-night return to Dehradun is the usual pattern.",
      },
      {
        heading: "Car rental vs point-to-point taxi",
        body: "This page is car hire for the Haridwar trip. For a one-way or round-trip chauffeur transfer only, open <a href=\"/dehradun-to-haridwar-taxi\">Dehradun to Haridwar taxi</a>.",
      },
    ],
    relatedSlugs: [
      "chauffeur-driven-car-rental-haridwar",
      "car-rental-dehradun-to-rishikesh",
      "car-rental-dehradun",
      "dehradun-to-rishikesh-haridwar-self-drive",
      "dehradun-to-haridwar-taxi",
    ],
  },
  "car-rental-char-dham-yatra": {
    title: "Char Dham Yatra Car Rental from Dehradun | Innova, Scorpio, Tempo | Arora Cars",
    description:
      "Char Dham taxi and car rental from Dehradun — Innova, Scorpio, XUV700 and Tempo Traveller with hill drivers. Call 8445619130.",
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
      "Self drive SUV for Char Dham from Dehradun — experienced hill drivers only. Serviced SUVs, km packages, route briefing. Call 8445619130.",
    relatedSlugs: [
      "car-rental-char-dham-yatra",
      "suv-rental-dehradun",
      "tempo-traveller-char-dham-yatra",
      "self-drive-car-rental-dehradun",
    ],
  },

 "car-rental-dehradun": {
 title: "Car Rental in Dehradun | Self Drive & With Driver | Arora Cars",
 description:
 "Car hire in Dehradun — self drive or with driver. Hatchbacks, SUVs and Innovas; Clock Tower, station, ISBT and Jolly Grant pickup. Call or WhatsApp 8445619130.",
 intro:
 "Arora Cars is a Dehradun rental desk for people who need a car — not an app with a franchise sticker. Self drive or chauffeur, city runs or Mussoorie / Rishikesh / Haridwar / Char Dham, pickup at Clock Tower, railway, ISBT or Jolly Grant.",
 sections: [
 {
 heading: "What “car rental in Dehradun” covers here",
 body: "Hatchbacks and sedans for city and airport runs, SUVs for Mussoorie and family trips, chauffeur Innovas for groups, plus links out to bike, scooty and Tempo Traveller when a car is the wrong tool. One desk, one phone number, clear pickup points.",
 },
 {
 heading: "Self drive or chauffeur — pick the trip, not the identity",
 body: "Self drive: daylight Mussoorie, city sightseeing, travellers who already drive Indian hills. Chauffeur: Jolly Grant, Haridwar aarti, Char Dham, fog and night hairpins. Open the <a href=\"/self-drive-car-rental-dehradun\">self-drive</a> or <a href=\"/chauffeur-driven-car-rental-dehradun\">with-driver</a> hub for process details; use this page to choose the category and see live cars.",
 },
 {
 heading: "Car rental vs taxi vs monthly hire",
 body: "<strong>Car rental</strong> on this hub means hiring a vehicle (self drive or with driver) for hours or days from our Dehradun desk. <strong>Taxi / trip quote</strong> is a chauffeur transfer with a clear pickup and drop — start at <a href=\"/taxi-service-in-dehradun\">taxi service in Dehradun</a> or <a href=\"/taxi\">Uttarakhand taxi</a>. <strong>Monthly hire</strong> is a 30-day self-drive package for long stays — see <a href=\"/monthly-car-rental-dehradun\">monthly car rental</a>. Tell us the trip; we will point you to the right page.",
 },
 {
 heading: "Outstation and local",
 body: "Local: Clock Tower, Paltan Bazaar, Sahastradhara, Robber's Cave. Outstation: Mussoorie (~34 km), Rishikesh (~43 km), Haridwar (~52 km), plus Char Dham and other Uttarakhand routes we confirm when you book. Distances and times are approximate.",
 },
 {
 heading: "Airport, station and ISBT pickup",
 body: "Jolly Grant (DED) is usually chauffeur — see <a href=\"/jolly-grant-airport-car-rental\">Jolly Grant airport taxi &amp; car rental</a>. Railway station and ISBT can be car or scooty depending on luggage. Share flight or train time on WhatsApp so we pre-position. Wedding and luxury chauffeur cars are listed on their own hubs when the trip is not a standard hatchback hire.",
 },
 {
 heading: "How booking works",
 body: `Browse a model below or on the fleet page, then WhatsApp or call ${P} with dates and pickup. Or send the on-site booking form from a vehicle page. Documents for self drive are listed on the documents page; chauffeur bookings need a contact and pickup pin.`,
 },
 {
 heading: "Hatchback, sedan, or a 7-seater",
 body: "Hatchbacks such as Swift and i20 suit city days and light Mussoorie trips. Sedans such as Dzire and City suit airport runs and luggage. Seven-seaters such as Ertiga, Innova and Carens are on the SUV list — use them when the group does not fit a sedan. Starting rates are on each card; confirm the payable amount before you pay an advance.",
 },
 {
 heading: "Who usually books a car",
 body: "Tourists for Mussoorie, Rishikesh and Haridwar. Families who need a boot and a third row. Couples on a weekend. Business travellers who want a chauffeur from Jolly Grant. Groups larger than one SUV should look at Tempo Traveller instead of stacking cars.",
 },
 ],
 faqs: [
 {
 q: "Do you offer both self drive and cars with driver?",
 a: "Yes. Self drive for guests who want the wheel; chauffeur for airport, aarti traffic, multi-day yatra and anyone who prefers not to drive the hills at night.",
 },
 {
 q: "Where can I get picked up?",
 a: "Clock Tower / city hotels, Dehradun Railway Station, ISBT, and Jolly Grant Airport. Delivery charges are agreed when you book.",
 },
 {
 q: "How are prices shown?",
 a: "Each vehicle card shows a starting daily rate from our live fleet list. Fuel, tolls, extra km and peak dates can change the final payable — we confirm before you pay an advance.",
 },
 {
 q: "Do you offer car rental with driver from Dehradun?",
 a: "Yes. Chauffeur cars cover Jolly Grant airport, city full-days, Mussoorie / Rishikesh / Haridwar outstation and multi-day yatra. Open the with-driver hub for process details, or pick a model below and tell us you need a driver.",
 },
 {
 q: "Is monthly car rental available?",
 a: "Weekly and monthly self-drive packages exist on selected models (look for weekly/monthly labels on fleet cards). Km caps and service windows are confirmed on the call — not invented as a flat website fare.",
 },
 {
 q: "Should I book a car rental or a taxi?",
 a: "Book car rental when you need the vehicle for the day or longer (self drive or with driver). Book a taxi page when you want a point-to-point chauffeur transfer with a clear pickup and drop.",
 },
 {
 q: `How do I book a car in Dehradun?`,
 a: `Call or WhatsApp Arora Cars on ${P}. Share dates, pickup point (hotel, railway station, ISBT, Jolly Grant Airport) and we confirm the vehicle within minutes.`,
 },
 ],
 relatedSlugs: [
 "self-drive-car-rental-dehradun",
 "chauffeur-driven-car-rental-dehradun",
 "suv-rental-dehradun",
 "jolly-grant-airport-car-rental",
 "taxi-service-in-dehradun",
 "taxi",
 "monthly-car-rental-dehradun",
 "wedding-car-rental-dehradun",
 "luxury-car-rental-dehradun",
 "bike-rental-dehradun",
 "scooty-on-rent-dehradun",
 "tempo-traveller-rental-dehradun",
 "three-wheeler-auto-rental-dehradun",
 "chota-hathi-mini-truck-rental-dehradun",
 "car-rental-pricing-dehradun",
 "documents-required-self-drive",
 "car-rental-dehradun-to-mussoorie",
 "car-fleet-dehradun",
 "how-to-book",
 ],
 },

 "monthly-car-rental-dehradun": {
 title: "Monthly Car Rental in Dehradun | 30-Day Self Drive Hire | Arora Cars",
 description:
 "Monthly self drive car hire in Dehradun from a local desk — not an app subscription. Km cap and models confirmed on call. WhatsApp 8445619130.",
 primaryKeyword: "monthly car rental Dehradun",
 secondaryKeywords: [
 "monthly self drive Dehradun",
 "long term car hire Dehradun",
 "30 day car rental Dehradun",
 "monthly car rental rates in Dehradun",
 ],
 badge: "30-day local desk hire",
 intro:
 "For interns, project staff and winter-stay families who need a car in Dehradun for about a month. This is a local-desk monthly hire with a clear km cap — not a national car-subscription app. Hatchback and SUV options (for example Swift- or Creta-class when available) are confirmed on WhatsApp before you pay an advance.",
 sections: [
 {
 heading: "Who monthly hire is for",
 body: "Long-stay visitors, project teams, interns and families who want one car for city and nearby highway use without buying a vehicle. Tourists in town for a weekend should use daily or <a href=\"/weekly-car-rental-dehradun\">weekly rental</a> instead.",
 },
 {
 heading: "What is included vs what you pay extra",
 body: "The monthly package covers the vehicle for the agreed period and keeps it on our insurance with scheduled service windows. Fuel, tolls, parking and kilometres beyond the agreed cap are extra. Exact km cap and deposit sit on the model discussion — we confirm before advance, not as a fake website flat rate.",
 },
 {
 heading: "Monthly hire vs car subscription apps",
 body: "Subscription apps market flexible online leases across cities. Our product is a Dehradun desk rental: you speak to us on WhatsApp or phone, collect or take delivery locally, and return the same car at the end of the term. If you need a pan-India subscription product, we are not that — if you need a reliable month in Dehradun, start here.",
 },
 {
 heading: "Documents, deposit and service",
 body: "Same self-drive basics as shorter hires: valid licence (1+ year), photo ID, age 21+, and the refundable deposit for that model. See <a href=\"/documents-required-self-drive\">documents required</a>. We pull the car for scheduled service during the month when due — you are renting a road-legal car, not buying one.",
 },
 {
 heading: "Monthly vs weekly",
 body: "Seven to fourteen days usually fit weekly packages. Around 30 days, monthly is the cleaner quote. Open <a href=\"/self-drive-car-rental-dehradun\">self drive car rental</a> for shorter trips and the live fleet cards.",
 },
 ],
 faqs: [
 {
 q: `How do I book monthly rental?`,
 a: `Call or WhatsApp Arora Cars on ${P} with start date, approximate end date, and whether you need a hatchback or SUV.`,
 },
 {
 q: "Is this a car subscription?",
 a: "No. It is a 30-day (or agreed) self-drive hire from our Dehradun desk with a km cap confirmed on the call — not a national subscription app.",
 },
 {
 q: "Can I keep the car longer than 30 days?",
 a: "Often yes by extending before the end date. Rate and km cap are reconfirmed for the extension.",
 },
 {
 q: "What about servicing during the month?",
 a: "We keep the car on our insurance and schedule service when due. You get a temporary arrangement or timing agreed so you are not stranded without notice.",
 },
 {
 q: "Do you offer monthly cars with a driver?",
 a: "Chauffeur-by-the-month is a separate quote — tell us hours and routes. This page focuses on self-drive monthly hire.",
 },
 {
 q: "Are monthly rates listed as a single website price?",
 a: "No flat invented website fare. Starting daily cards help orientation; the monthly payable and km cap are confirmed on WhatsApp for the model you want.",
 },
 ],
 relatedSlugs: [
 "weekly-car-rental-dehradun",
 "self-drive-car-rental-dehradun",
 "car-rental-dehradun",
 "documents-required-self-drive",
 "car-rental-pricing-dehradun",
 "contact-book-now",
 "how-to-book",
 ],
 howToBook: [
 "WhatsApp start date + hatchback or SUV preference",
 "We confirm model, km cap and deposit",
 "Share licence + ID; pay agreed advance",
 "Collect or take delivery in Dehradun",
 ],
 },

  "jolly-grant-airport-car-rental": {
 title: "Jolly Grant Airport Taxi & Car Rental | Dehradun (DED) Pickup | Arora Cars",
 h1: "Jolly Grant Airport Taxi & Car Rental",
    description:
 "Jolly Grant (DED) airport taxi and car rental — flight-tracked chauffeur pickup to Dehradun, Mussoorie or Rishikesh. Call or WhatsApp 8445619130.",
 primaryKeyword: "Jolly Grant airport car rental",
 secondaryKeywords: [
 "Dehradun airport taxi",
 "Jolly Grant airport taxi",
 "Dehradun airport car rental",
 "car rental at dehradun airport",
 "DED airport pickup",
 ],
 badge: "DED · Taxi & car pickup",
 intro:
 "Flight number in, chauffeur car at the Jolly Grant (DED) arrivals kerb. City hotels, Mussoorie, Rishikesh or Haridwar drops are the usual transfers. Airport jobs are with driver — you are not signing self-drive papers at the terminal. Self drive handover can happen later at your hotel if you want a car for the rest of the trip.",
    sections: [
      {
 heading: "How airport pickup and flight coordination work",
 body: "Share your flight number or PNR. We track delays within a reasonable window and meet you at arrivals with a nameboard. Waiting inside that agreed window is part of the pickup plan; longer holds are confirmed on WhatsApp so there are no surprises.",
 },
 {
 heading: "Airport taxi transfer vs longer car hire",
 body: "Most guests need a <strong>chauffeur airport transfer</strong> (taxi-style pickup and drop). That is what this page books first. If you also want a self-drive car for later days, we can hand over at the hotel after the airport leg — or open the main <a href=\"/car-rental-dehradun\">car rental in Dehradun</a> hub. For a dedicated taxi-framed page see <a href=\"/dehradun-airport-taxi\">Dehradun airport taxi</a>.",
 },
 {
 heading: "Which vehicle for pickup and drop-off",
 body: "1–3 guests: Dzire or similar sedan. 4–6 with bags: Ertiga or Innova. Luxury: Camry or E-Class when booked. Tell us passenger count and luggage so we do not undersize the boot.",
 },
 {
 heading: "City, Mussoorie, Rishikesh or Haridwar",
 body: "Same-day drops to Dehradun hotels are the most common. Mussoorie and Rishikesh are regular onward transfers from DED; Haridwar too when timed with your flight. Multi-day chauffeur after landing is quoted separately on the <a href=\"/chauffeur-driven-car-rental-dehradun\">with-driver hub</a>.",
 },
 {
 heading: "What we do not send to the airport",
 body: "Auto rickshaws and scooty are not airport products — the highway run and luggage make a chauffeur car the right tool. Railway arrivals use <a href=\"/car-rental-near-dehradun-railway-station\">station car pickup</a> instead.",
 },
 ],
 faqs: [
 {
 q: "Do you track flights?",
 a: "Yes. Share the PNR or flight number; we adjust for delays without extra waiting charges within a reasonable agreed window.",
 },
 {
 q: "Is this a taxi or a car rental?",
 a: "Airport pickups are chauffeur transfers (taxi-style). You can add self-drive car hire after hotel handover if you need a car for later days.",
 },
 {
 q: `How do I book airport pickup?`,
 a: `Call or WhatsApp Arora Cars on ${P} with flight number, passenger count and drop point (city, Mussoorie, Rishikesh or Haridwar).`,
 },
 {
 q: "Night flights?",
 a: "Yes — share the ETA. Late arrivals are routine when we have the flight details in advance.",
 },
 {
 q: "Meet-and-greet?",
 a: "Nameboard at arrivals is standard for pre-booked pickups. Tell us the passenger name to display.",
 },
 {
 q: "Can I self drive from the airport kerb?",
 a: "We do not do self-drive paperwork at the terminal. Take the chauffeur transfer first; self drive can start at your hotel afterward.",
      },
    ],
    relatedSlugs: [
 "dehradun-airport-taxi",
 "taxi-service-in-dehradun",
      "chauffeur-driven-car-rental-dehradun",
 "car-rental-dehradun",
      "car-rental-near-dehradun-railway-station",
      "car-rental-dehradun-to-mussoorie",
      "car-rental-dehradun-to-rishikesh",
 "how-to-book",
 ],
 howToBook: [
 "WhatsApp flight number + drop point + passenger count",
 "We confirm vehicle class and waiting window",
 "Driver meets you at arrivals with a nameboard",
 "Optional: self-drive handover later at your hotel",
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
      "Transparent rental pricing in Dehradun — starting daily rates for cars, SUVs, Activa, Bullet and Tempo Traveller. Confirm live rates on 8445619130.",
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
 relatedSlugs: ["contact-book-now", "faq", "car-rental-dehradun", "cancellation-policy", "privacy-policy"],
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
 "This legacy Char Dham URL is preserved for existing links and Search Console history. The full circuit guide lives on our main Char Dham car rental page. Trips leave from Dehradun.",
    sections: [
      {
        heading: "Use the primary Char Dham page",
        body: "Vehicle options, Tempo Traveller groups and dham-wise links are updated on /car-rental-char-dham-yatra. Book on the same number: 8445619130.",
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
      "Kedarnath taxi and car rental from Dehradun to Sonprayag / Gaurikund sector. Bolero, Innova, Tempo with hill drivers. Call 8445619130.",
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
      "Badrinath taxi and car rental from Dehradun via Joshimath. SUV and Tempo with hill drivers. Call 8445619130.",
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
      "Gangotri taxi and car rental from Dehradun — hill SUVs and Tempo Traveller with driver. Call 8445619130.",
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
      "Yamunotri yatra car rental from Dehradun — SUV or Tempo with driver till Janki Chatti. Call 8445619130.",
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
      "Char Dham Tempo Traveller from Dehradun — 12, 17, 20 and 26 seater with driver for group yatra. Call 8445619130.",
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

 "three-wheeler-auto-rental-dehradun": {
 title: "Auto Rickshaw Rent per Day in Dehradun | 3 Wheeler & E-Rickshaw | Arora Cars",
 description:
 "Auto rickshaw rent per day in Dehradun — passenger auto, e-rickshaw and full-day city packages. Call or WhatsApp 8445619130 for booking.",
 primaryKeyword: "auto rickshaw rent per day Dehradun",
 secondaryKeywords: [
 "auto rickshaw rental Dehradun",
 "auto rent per day",
 "auto kiraya Dehradun",
 "e-rickshaw rental Dehradun",
 "3 wheeler on rent Dehradun",
 "electric auto rent Dehradun",
 ],
 badge: "Per day · Kiraya · Full-day auto",
 intro:
 "Book a passenger auto, e-rickshaw or goods three-wheeler from our Dehradun desk — a rental package with a clear starting daily rate, not a street flag-down fare. Useful for Clock Tower, Paltan Bazaar and short hotel hops. Autos do not serve Jolly Grant Airport; use airport car pickup for flights. Starting rates are on each vehicle card below; confirm the payable amount before you pay an advance.",
 sections: [
 {
 heading: "Auto rent per day / kiraya — how it works",
 body: "Each card shows a starting ₹/day (and ₹/km where it applies). That is the rental kiraya for the booked package, not a meter estimate for a random street hop. Fuel, waiting beyond the package and late-night returns can change the final amount — we confirm on WhatsApp before you pay an advance. Open the <a href=\"/rent/auto-rickshaw-rental-dehradun\">passenger auto</a>, <a href=\"/rent/auto-rickshaw-full-day-dehradun\">full-day tourist auto</a> or <a href=\"/rent/e-rickshaw-rental-dehradun\">e-rickshaw</a> card for the listed starting rate.",
 },
 {
 heading: "Passenger auto vs e-rickshaw vs goods auto",
 body: "Passenger auto for people and light bags around Clock Tower, Paltan Bazaar and hotel hops. E-rickshaw for quieter local area movement where range allows. Goods auto for small market loads. When you need a flat bed and more volume, use the <a href=\"/chota-hathi-mini-truck-rental-dehradun\">Chota Hathi / mini truck hub</a> instead.",
 },
 {
 heading: "When an auto wins — and when it does not",
 body: "Autos suit short Dehradun city runs. For Mussoorie, Rishikesh or Haridwar, book a <a href=\"/car-rental-dehradun\">car</a> or bike instead. Jolly Grant (DED) airport transfers are chauffeur car jobs — see <a href=\"/jolly-grant-airport-car-rental\">Jolly Grant airport car rental</a>.",
 },
 {
 heading: "How to enquire",
 body: `Call or WhatsApp ${P} with dates, pickup pin (hotel, railway, ISBT) and whether you need a passenger auto, e-rickshaw or goods three-wheeler. Or open a vehicle page below and send the booking form.`,
 },
 ],
 faqs: [
 {
 q: `How do I book an auto?`,
 a: `Call or WhatsApp Arora Cars on ${P}. Share dates, pickup point (hotel, railway station, ISBT) and whether you need a passenger auto, e-rickshaw or goods three-wheeler.`,
 },
 {
 q: "What is auto rent per day / kiraya here?",
 a: "It is a booked rental package with a starting daily rate on the vehicle card — not a negotiated street fare for one hop. We confirm fuel, waiting and return time on WhatsApp before any advance.",
 },
 {
 q: "Full-day tourist auto?",
 a: "Yes. An 8-hour city package covers typical Dehradun sightseeing without per-km surprises — see the Auto Rickshaw Full Day card for the listed starting rate.",
 },
 {
 q: "Do you have e-rickshaw / electric auto on rent?",
 a: "Yes — open the E-Rickshaw vehicle page from the cards below for quiet local area movement. Range and battery rules are confirmed at handover.",
 },
 {
 q: "Can autos go to Jolly Grant Airport?",
 a: "No. Dehradun airport transfers use a chauffeur car. Book Jolly Grant airport car rental for flight pickups.",
 },
 {
 q: "What is the Arora Cars phone number for auto booking?",
 a: `Call or WhatsApp ${P}. Same number for passenger auto, e-rickshaw and goods three-wheeler enquiries.`,
 },
 {
 q: "Passenger auto vs goods auto?",
 a: "Passenger auto / e-rickshaw for people and light bags. Goods auto for market loads and small commercial runs. Mini trucks (Chota Hathi) are a separate hub when the load needs a bed.",
 },
 ],
 relatedSlugs: [
 "chota-hathi-mini-truck-rental-dehradun",
 "scooty-on-rent-dehradun",
 "car-rental-near-clock-tower-dehradun",
 "car-rental-near-isbt-dehradun",
 "jolly-grant-airport-car-rental",
 "contact-book-now",
 "how-to-book",
 "car-rental-pricing-dehradun",
 ],
 howToBook: [
 "Choose passenger auto, full-day package, e-rickshaw or goods auto from the cards below",
 `WhatsApp or call ${P} with dates and pickup pin`,
 "Confirm the starting rate and any waiting rules",
 "Driver meets you at the agreed Dehradun point",
 ],
 },

 "chota-hathi-mini-truck-rental-dehradun": {
 title: "Chota Hathi Booking in Dehradun | Tata Ace & Mini Truck | Arora Cars",
 description:
 "Chota Hathi booking in Dehradun for shifting and goods — Tata Ace, Dost, Jeeto, Intra and Bolero pickup. Call or WhatsApp 8445619130. Rates on vehicle cards; confirm before advance.",
 primaryKeyword: "chota hathi booking Dehradun",
 secondaryKeywords: [
 "chota hathi booking",
 "chota hathi on rent Dehradun",
 "mini truck rental Dehradun",
 "Tata Ace rental Dehradun",
 "goods carrier rental Dehradun",
 "rent a dost Dehradun",
 ],
 badge: "Booking · Shifting · Market goods",
 intro:
 "Book a Chota Hathi / mini truck from Dehradun for house shifting, shop stock or construction material. Tata Ace, Super Ace, Jeeto, Intra, Dost and Bolero pickup are listed below. Most commercial customers take a driver. Starting rates are on each card — we confirm the right vehicle and payable amount before you pay an advance.",
 sections: [
 {
 heading: "How Chota Hathi booking works",
 body: `WhatsApp or call ${P} with pickup and drop points, load type (cartons, furniture, shop stock) and date. Or open a model card such as <a href="/rent/tata-ace-chota-hathi-dehradun">Tata Ace (Chota Hathi)</a>, <a href="/rent/ashok-leyland-dost-dehradun">Dost</a> or <a href="/rent/bolero-pickup-dehradun">Bolero pickup</a> and send the form. We confirm vehicle fit before any advance.`,
 },
 {
 heading: "What to tell us before the quote",
 body: "Pickup and drop pins inside Dehradun (or outstation if needed), approximate load, floors or lift access, and whether you need a driver. Labour for loading and unloading is not always included — ask on the call if you need helpers. Society gate passes are your responsibility where the building requires them.",
 },
 {
 heading: "What fits in a Chota Hathi",
 body: "A PG or 1 BHK move, restaurant supplies, hardware runs and short commercial hops. Bolero pickup when you need more bed length for hill roads. For people-only sightseeing, use the <a href=\"/three-wheeler-auto-rental-dehradun\">auto / e-rickshaw hub</a> instead.",
 },
 {
 heading: "Goods auto vs Chota Hathi",
 body: "A goods auto suits small market runs. Chota Hathi / Ace / Dost / Bolero pickup when you need a flat bed and more volume. Starting ₹/day and ₹/km are on the vehicle card; distance, waiting and hill stretches can change the quote.",
 },
 ],
 faqs: [
 {
 q: `How do I book a mini truck?`,
 a: `Call or WhatsApp Arora Cars on ${P}. Share pickup/drop points, load type and date — or open a model card below and send the form.`,
 },
 {
 q: "How do I book a Chota Hathi in Dehradun?",
 a: `WhatsApp or call ${P} with pickup/drop points, load type and date. We confirm Ace / Dost / pickup fit before you pay an advance.`,
 },
 {
 q: "Is same-day Chota Hathi booking possible?",
 a: "Often yes when a vehicle is free — share the load and pins early in the day. Peak shifting days fill faster; we will say so honestly if nothing fits.",
 },
 {
 q: "Are loading helpers included?",
 a: "Not by default. Ask on the call if you need labour for stairs or heavy items; helper charges are confirmed separately when available.",
 },
 {
 q: "With or without driver?",
 a: "Both. Most commercial customers take a driver. Self drive needs a valid LMV and a goods-experience check on the call.",
 },
 {
 q: "Auto rickshaw or mini truck for goods?",
 a: "Goods auto suits small market runs. Chota Hathi / Ace / Bolero pickup when you need a flat bed and more volume. See the three-wheeler hub for passenger autos.",
 },
 {
 q: "Will a Chota Hathi fit a PG or 1 BHK shift?",
 a: "Usually yes for a compact move. Tell us sofa/fridge count and floor access so we do not undersize the vehicle.",
 },
 ],
 relatedSlugs: [
 "three-wheeler-auto-rental-dehradun",
 "contact-book-now",
 "how-to-book",
 "car-rental-pricing-dehradun",
 "tempo-traveller-rental-dehradun",
 "car-rental-dehradun",
 ],
 howToBook: [
 "Share pickup, drop, load type and date on WhatsApp",
 "We confirm Ace / Dost / Bolero pickup fit and starting rate",
 "Pay the agreed advance",
 "Vehicle arrives at the agreed pin",
 ],
 },

  "bike-rental-near-isbt-dehradun": {
 title: "Bike & Scooty Pickup near ISBT Dehradun | Bus Stand Rental | Arora Cars",
    description:
 "Bike and Activa pickup near ISBT Dehradun — share bus ETA, get a WhatsApp meeting pin, licence check on the spot. Call 8445619130. Full fleet on the bike hub.",
 primaryKeyword: "bike rental near ISBT Dehradun",
 secondaryKeywords: [
 "scooty ISBT Dehradun",
 "two wheeler near bus stand Dehradun",
 "Activa near ISBT Dehradun",
 ],
 badge: "ISBT bus-stand pickup",
 intro:
 "Coming in by Volvo or hill bus? We meet near Dehradun ISBT with an Activa, Pulsar or Bullet by arrangement — so you are not hunting a rental after a long ride. This page is for ISBT pickup logistics. For the full model list and Mussoorie advice, use the main bike rental hub.",
    sections: [
      {
 heading: "Where we meet at ISBT",
 body: "Share your bus name and ETA on WhatsApp. We send a short walk pin from the main ISBT exit so you do not cross the highway twice with luggage. One helmet comes with the bike or Activa.",
 },
 {
 heading: "What to carry",
 body: "Two-wheeler licence and a photo ID. Deposit matches the model card. If paperwork feels heavy after an overnight bus, we can complete a quick check at the pin or finish details at Clock Tower — tell us which you prefer.",
 },
 {
 heading: "Activa vs bike after a long bus",
 body: "Tired and luggage-light: Activa for city hotels and food runs. Want Mussoorie or a classic ride the same day: Pulsar / Bullet from the cards — still confirm the route. City-wide models and Bullet / Himalayan guidance live on <a href=\"/bike-rental-dehradun\">bike rental in Dehradun</a>.",
      },
      {
        heading: "Need a car instead?",
 body: "Groups with bags often want a Dzire or Innova at the bus stand rather than a two-wheeler. See <a href=\"/car-rental-near-isbt-dehradun\">car rental near ISBT</a>.",
 },
 {
 heading: "Evening and late arrivals",
 body: "Late buses are routine when you share a live ETA. Very late first-time riders may get a next-morning briefing before hill routes — we would rather delay a hill ride than hand over a bike to someone too tired to ride safely.",
 },
 ],
 faqs: [
 {
 q: `How do I book ISBT bike pickup?`,
 a: `Call or WhatsApp Arora Cars on ${P} with bus name, ETA and whether you want Activa, Pulsar or Bullet.`,
 },
 {
 q: "Can you wait if the bus is late?",
 a: "Yes within a reasonable window when you share live location or an updated ETA on WhatsApp.",
 },
 {
 q: "Can I get a scooty / Activa at ISBT?",
 a: "Yes by arrangement. Activa suits city hops after the bus; for Mussoorie climb we usually steer you to a bike or car.",
 },
 {
 q: "Do I complete documents at the bus stand?",
 a: "Licence and ID are checked at handover. Deposit follows the model card. Some guests prefer a quick ISBT check and full briefing at Clock Tower — say which you want.",
 },
 {
 q: "Is this the main bike rental page for Dehradun?",
 a: "No — this page is ISBT pickup only. Open the bike rental in Dehradun hub for the full fleet, Bullet and Himalayan advice.",
      },
    ],
    relatedSlugs: [
      "bike-rental-dehradun",
 "scooty-on-rent-dehradun",
 "car-rental-near-isbt-dehradun",
 "bike-rental-near-clock-tower-dehradun",
      "car-rental-near-dehradun-railway-station",
 "how-to-book",
 ],
 howToBook: [
 "WhatsApp bus name + ETA + preferred model",
 "We send the ISBT meeting pin",
 "Show licence + ID; pay agreed amount",
 "Ride on — or switch to a car if bags win",
 ],
 },

 "bike-rental-near-clock-tower-dehradun": {
 title: "Bike on Rent near Clock Tower Dehradun | Paltan Bazaar Pickup | Arora Cars",
 description:
 "Bike on rent near Clock Tower and Paltan Bazaar Dehradun — Bullet, Pulsar, Activa, same-hour pickup. Call or WhatsApp 8445619130.",
 primaryKeyword: "bike rental near Clock Tower Dehradun",
 secondaryKeywords: [
 "Paltan Bazaar bike on rent",
 "bike on rent near Clock Tower Dehradun",
 "Activa near Paltan Bazaar",
 ],
 badge: "Clock Tower · Paltan Bazaar",
 intro:
 "Walk from Paltan Bazaar hotels and pick up a bike or scooty the same hour at our Clock Tower area desk. This page is for city-centre pickup. For the full model list, Bullet / Himalayan advice and Mussoorie rules, use the main bike hub.",
 sections: [
 {
 heading: "Clock Tower and Paltan Bazaar pickup",
 body: "Our home ground. Share your hotel name near Clock Tower / Paltan Bazaar — walk-up handover is usually fastest, or we deliver to the hotel pin when agreed. Evening bazaar traffic is slow; leave extra time if you are riding out at rush hour.",
 },
 {
 heading: "Helmets and documents",
 body: "Two-wheeler licence, photo ID, and the deposit on the model card. One helmet is included; ask for a second. We do not release bikes after late night without a next-morning briefing if you are new to the city.",
 },
 {
 heading: "What you can pick up here",
 body: "Activa and commuter bikes for city food runs; Pulsar / Bullet when you want a classic ride. Full fleet and hill-route briefing live on <a href=\"/bike-rental-dehradun\">bike rental in Dehradun</a>. Prefer automatic only? See <a href=\"/scooty-on-rent-dehradun\">scooty on rent</a>.",
 },
 {
 heading: "Arriving by bus instead?",
 body: "ISBT arrivals should use <a href=\"/bike-rental-near-isbt-dehradun\">bike pickup near ISBT</a> so we meet you at the bus stand, not at Clock Tower first.",
 },
 ],
 faqs: [
 {
 q: `How do I book a Clock Tower bike?`,
 a: `Call or WhatsApp Arora Cars on ${P} with the model and your hotel near Clock Tower / Paltan Bazaar.`,
 },
 {
 q: "Can I walk up the same day?",
 a: "Often yes for Activa and commuter bikes. Bullet and weekend peaks sell out — WhatsApp before you walk across.",
 },
 {
 q: "Do you deliver to hotels near Paltan Bazaar?",
 a: "Yes within the Clock Tower / central hotel belt when agreed. Exact pin and any delivery note are confirmed on WhatsApp.",
 },
 {
 q: "Where is the full bike list?",
 a: "On the bike rental in Dehradun hub — this page is for Clock Tower / Paltan pickup, not the complete catalogue.",
 },
 ],
 relatedSlugs: [
 "bike-rental-dehradun",
 "scooty-on-rent-dehradun",
 "car-rental-near-clock-tower-dehradun",
 "bike-rental-near-isbt-dehradun",
 "how-to-book",
 ],
 howToBook: [
 "WhatsApp model + hotel / Clock Tower pin",
 "Confirm same-hour or delivery slot",
 "Show licence + ID; pay deposit as listed",
 "Helmet on, ride out",
    ],
  },

  "car-rental-near-isbt-dehradun": {
    title: "Car Rental near ISBT Dehradun | Pickup & Self Drive | Arora Cars",
    description:
      "Car rental near ISBT Dehradun — chauffeur pickup or self drive handover after your bus arrival. Call 8445619130.",
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

  // ——— Batch T1: Uttarakhand taxi Tier-1 (existing URLs only) ———
  taxi: {
    title: "Taxi Service in Uttarakhand | Local, Outstation & Airport | Arora Cars",
    h1: "Taxi service across Uttarakhand",
    description:
      "Book chauffeur taxi enquiries across Uttarakhand — Dehradun desk for local, outstation, Jolly Grant airport and hill transfers. Call or WhatsApp 8445619130. Quote-based; no fake fares.",
    primaryKeyword: "taxi service Uttarakhand",
    secondaryKeywords: [
      "outstation taxi Uttarakhand",
      "taxi booking Uttarakhand",
      "airport taxi Dehradun",
      "Uttarakhand cab service",
    ],
    badge: "Uttarakhand taxi desk · Quote",
    intro:
      "Arora Cars takes chauffeur taxi enquiries from our Dehradun desk for city runs, intercity drops, Jolly Grant and station pickups, hill-station transfers and pilgrimage road legs a car can actually reach. This hub is for point-to-point taxi quotes — not self-drive fleet hire and not a meter-taxi app. Share the route on WhatsApp or call; we confirm before you pay any advance.",
    sections: [
      {
        heading: "What you can enquire for",
        body: "Local hours inside a city, one-way and round-trip outstation runs, Jolly Grant airport transfers, railway pickups, sightseeing days in Mussoorie / Rishikesh / Nainital, and Char Dham road packages that stop at motorable points — not invented temple-door drops.",
      },
      {
        heading: "Taxi vs car rental",
        body: "<strong>Taxi</strong> on these pages means a chauffeur transfer with a clear pickup and drop. <strong>Car rental</strong> means hiring a vehicle for hours or days (self drive or with driver) from the Dehradun desk — start at <a href=\"/car-rental-dehradun\">car rental in Dehradun</a>. Tell us the trip; we will point you to the right page.",
      },
      {
        heading: "City taxi services",
        body: "Start with <a href=\"/taxi-service-in-dehradun\">taxi in Dehradun</a> (full desk), then enquiry pages for <a href=\"/taxi-service-in-rishikesh\">Rishikesh</a>, <a href=\"/taxi-service-in-haridwar\">Haridwar</a>, <a href=\"/taxi-service-in-mussoorie\">Mussoorie</a>, <a href=\"/taxi-service-in-haldwani\">Haldwani</a> and <a href=\"/taxi-service-in-nainital\">Nainital</a>. Each page has local pickup notes — not a city-name swap.",
      },
      {
        heading: "Popular routes",
        body: "High-intent corridors: <a href=\"/dehradun-to-mussoorie-taxi\">Dehradun to Mussoorie taxi</a>, <a href=\"/dehradun-to-rishikesh-taxi\">Dehradun to Rishikesh</a>, <a href=\"/dehradun-to-haridwar-taxi\">Dehradun to Haridwar</a>, plus Delhi, Nainital and Haldwani links from the city pages.",
      },
      {
        heading: "Airport, station & pilgrimage",
        body: "<a href=\"/dehradun-airport-taxi\">Dehradun airport taxi (Jolly Grant)</a>, <a href=\"/dehradun-railway-station-taxi\">railway station taxi</a>, and pilgrimage: <a href=\"/char-dham-taxi-service-from-dehradun\">Char Dham from Dehradun</a> with honest road limits.",
      },
      {
        heading: "How a taxi quote works",
        body: `Share city or route, date, time, passengers and bags. We reply on call or WhatsApp (${P}) with a chauffeur option. One-way is a drop; round trip keeps the car for the return and agreed waiting. Self-drive prices on other pages are a different product.`,
      },
    ],
    faqs: [
      {
        q: "How do I book a taxi in Uttarakhand?",
        a: `Call or WhatsApp Arora Cars on ${P}. Share pickup, drop, date/time and passenger count. We confirm a chauffeur quote — not a live meter fare.`,
      },
      {
        q: "Do you publish fixed taxi fares?",
        a: "No. Hill routes, waiting, night runs and vehicle class change the quote. We confirm before any advance.",
      },
      {
        q: "One-way or round trip?",
        a: "Both can be quoted. Say which you need and whether the driver should wait. Night hill returns need an honest rest conversation.",
      },
      {
        q: "Are you based only in Dehradun?",
        a: "The desk operates from Dehradun. Other Uttarakhand city pages are enquiry-led chauffeur quotes for those routes — we do not invent branch offices.",
      },
      {
        q: "Is this self-drive?",
        a: "No. Taxi pages are car-with-driver transfers. For keys-only hire see self-drive car rental in Dehradun.",
      },
    ],
    relatedSlugs: [
      "taxi-service-in-dehradun",
      "taxi-service-in-rishikesh",
      "taxi-service-in-haridwar",
      "taxi-service-in-mussoorie",
      "taxi-service-in-nainital",
      "taxi-service-in-haldwani",
      "dehradun-to-mussoorie-taxi",
      "dehradun-to-rishikesh-taxi",
      "dehradun-to-haridwar-taxi",
      "dehradun-airport-taxi",
      "char-dham-taxi-service-from-dehradun",
      "car-rental-dehradun",
      "chauffeur-driven-car-rental-dehradun",
      "contact-book-now",
    ],
  },

  "taxi-service-in-dehradun": {
    title: "Taxi Service in Dehradun | Local, Outstation & Airport | Arora Cars",
    h1: "Taxi service in Dehradun",
    description:
      "Taxi service in Dehradun from our Clock Tower desk — local runs, Mussoorie / Rishikesh / Haridwar transfers, station and Jolly Grant pickups. Call or WhatsApp 8445619130 for a chauffeur quote.",
    primaryKeyword: "taxi service in Dehradun",
    secondaryKeywords: [
      "Dehradun taxi service",
      "cab service Dehradun",
      "outstation taxi Dehradun",
      "local taxi Dehradun",
    ],
    badge: "Dehradun desk · With driver · Quote",
    intro:
      "Need a car with a driver in Dehradun? This page is for local and outstation taxi enquiries from the Arora Cars desk at Clock Tower — hotel transfers, ISBT and railway pickups, Jolly Grant links, and same-day hill drops when you do not want to self-drive. It is not a self-drive garage listing and not a promise that a car is waiting on every street. Share pickup, time and destination; we confirm a chauffeur quote.",
    sections: [
      {
        heading: "Local taxi use in Dehradun",
        body: "Hotel and Rajpur Road runs, family station pickups, office days, and short city hops when a private chauffeur is simpler than juggling apps. Name the hotel or pin — Clock Tower, railway and ISBT are different curbs.",
      },
      {
        heading: "Outstation corridors from Dehradun",
        body: "Most common chauffeur asks: <a href=\"/dehradun-to-mussoorie-taxi\">Dehradun to Mussoorie taxi</a>, <a href=\"/dehradun-to-rishikesh-taxi\">Dehradun to Rishikesh</a>, <a href=\"/dehradun-to-haridwar-taxi\">Dehradun to Haridwar</a>, plus Delhi and Nainital when planned as a full transfer. One-way or round trip — say which.",
      },
      {
        heading: "Airport and station",
        body: "Jolly Grant (DED) is outside the city — use <a href=\"/dehradun-airport-taxi\">Dehradun airport taxi</a> and share flight time. For trains see <a href=\"/dehradun-railway-station-taxi\">railway station taxi</a>. Flight or train ETA matters more than a vague “airport taxi” label.",
      },
      {
        heading: "Taxi vs car rental vs day chauffeur",
        body: "<strong>Taxi</strong> = point-to-point transfer. <strong>Car rental</strong> = hire for hours or days (self drive or with driver) — <a href=\"/car-rental-dehradun\">car rental in Dehradun</a>. <strong>Day chauffeur hire</strong> for a full local day package — <a href=\"/chauffeur-driven-car-rental-dehradun\">chauffeur-driven car rental</a>. We will steer you if the brief mixes products.",
      },
      {
        heading: "Vehicle classes we can quote",
        body: "Sedan, compact SUV, Innova-class MPV or larger SUVs depending on passengers and bags. Exact unit is confirmed when you book — site photos are reference, not a reserved taxi.",
      },
      {
        heading: "How to enquire",
        body: `WhatsApp or call ${P} with Dehradun as the city, pickup pin, date and passenger count — or use the quote form on this page.`,
      },
    ],
    faqs: [
      {
        q: "Which areas in Dehradun can be a pickup?",
        a: "Clock Tower / city hotels, Rajpur Road, ISBT, Dehradun Railway Station, and Jolly Grant Airport when you name the terminal time. Delivery from the desk is agreed on the quote.",
      },
      {
        q: "Do you publish fixed fares?",
        a: "No. Route, waiting, night runs and vehicle class change the quote. We confirm before any advance.",
      },
      {
        q: "Taxi or Uber-style app?",
        a: "We quote a private chauffeur for your trip — not a shared ride and not a live street meter from an app map.",
      },
      {
        q: "Night hill returns?",
        a: "Possible when planned. Fog and hairpins need an honest driver-rest conversation — we will not invent a “guaranteed 1 hour” claim.",
      },
      {
        q: "How do I book a taxi in Dehradun?",
        a: `Call or WhatsApp ${P}. Share pickup, drop, date/time and bags.`,
      },
    ],
    relatedSlugs: [
      "taxi",
      "dehradun-to-mussoorie-taxi",
      "dehradun-to-rishikesh-taxi",
      "dehradun-to-haridwar-taxi",
      "dehradun-to-delhi-taxi",
      "dehradun-airport-taxi",
      "dehradun-railway-station-taxi",
      "char-dham-taxi-service-from-dehradun",
      "chauffeur-driven-car-rental-dehradun",
      "car-rental-dehradun",
      "contact-book-now",
    ],
  },

  "taxi-service-in-mussoorie": {
    title: "Taxi Service in Mussoorie | Hill Transfers & Local | Arora Cars",
    h1: "Taxi service in Mussoorie",
    description:
      "Taxi service in Mussoorie for hotel transfers, Mall Road meeting points and Dehradun / airport links. Chauffeur quote from Arora Cars — call 8445619130. Enquiry-led; no fake fares.",
    primaryKeyword: "taxi service in Mussoorie",
    secondaryKeywords: ["Mussoorie taxi", "cab in Mussoorie", "Mussoorie to Dehradun taxi"],
    badge: "Hill station · Enquiry quote",
    intro:
      "Need a car with a driver in Mussoorie? This page is for local and outstation taxi enquiries — hotel check-ins, Mall Road meeting points, and descents to Dehradun or Jolly Grant. Fulfilment is arranged from the Arora Cars Dehradun desk as a chauffeur quote; we do not claim a Mussoorie shopfront or invent fixed Mall Road fares. Name the property and time.",
    sections: [
      {
        heading: "Local taxi use in Mussoorie",
        body: "Hotel transfers, sightseeing with waiting, and evening descents when you do not want to drive hairpins in the dark. Many Mall Road hotels need a short walk — cars cannot always stop at the shop door.",
      },
      {
        heading: "Arriving via Dehradun",
        body: "There is no Mussoorie airport or major railway. Most guests use <a href=\"/dehradun-to-mussoorie-taxi\">Dehradun to Mussoorie taxi</a> or <a href=\"/dehradun-airport-to-mussoorie-taxi\">airport to Mussoorie</a>. Fog and Sunday traffic change timing more than a brochure claim.",
      },
      {
        heading: "Taxi vs car rental on this climb",
        body: "Point-to-point chauffeur transfer → this taxi cluster. Hiring a car for the day (self drive or with driver) → <a href=\"/car-rental-dehradun-to-mussoorie\">car rental Dehradun to Mussoorie</a>.",
      },
      {
        heading: "How to enquire",
        body: `WhatsApp or call ${P} with Mussoorie hotel name, date and whether you need local hours or a plains drop.`,
      },
    ],
    faqs: [
      {
        q: "Which areas in Mussoorie can be a pickup?",
        a: "Library / Mall Road hotels (often a short walk from the car), Landour side, Picture Palace area, and hotels on the Dehradun road. Name the property.",
      },
      {
        q: "Do you have a Mussoorie branch?",
        a: "No invented branch claim. We arrange chauffeur quotes for Mussoorie pickups and drops from the Dehradun desk.",
      },
      {
        q: "How do I book?",
        a: `Call or WhatsApp ${P} with hotel pin, date and passenger count.`,
      },
    ],
    relatedSlugs: [
      "taxi",
      "taxi-service-in-dehradun",
      "dehradun-to-mussoorie-taxi",
      "mussoorie-sightseeing-taxi",
      "dehradun-airport-to-mussoorie-taxi",
      "rishikesh-to-mussoorie-taxi",
      "haridwar-to-mussoorie-taxi",
      "car-rental-dehradun-to-mussoorie",
    ],
  },

  "taxi-service-in-rishikesh": {
    title: "Taxi Service in Rishikesh | Ashram, Ghat & Airport Links | Arora Cars",
    h1: "Taxi service in Rishikesh",
    description:
      "Taxi service in Rishikesh for Tapovan, ashram and ghat-area pickups, Haridwar aarti runs and Jolly Grant links. Chauffeur quote — call 8445619130. Enquiry-led; no fake fares.",
    primaryKeyword: "taxi service in Rishikesh",
    secondaryKeywords: ["Rishikesh taxi", "cab service Rishikesh", "Rishikesh airport taxi"],
    badge: "Enquiry quote · With driver",
    intro:
      "Need a car with a driver in Rishikesh? This page is for local and outstation taxi enquiries — ashram drops, Tapovan / jhula meeting pins, Haridwar aarti with return, and airport runs via Jolly Grant. Arranged as a chauffeur quote from Arora Cars; not a self-drive listing and not a claim that a car waits on every ghat lane. Share the exact pin and time.",
    sections: [
      {
        heading: "Local taxi use in Rishikesh",
        body: "Ashram and hotel drops, rafting-camp mornings, and evening plans toward Haridwar. Narrow lanes near Laxman Jhula / Ram Jhula need a clear meeting pin — we may meet at a wider curb.",
      },
      {
        heading: "Airport and Dehradun links",
        body: "Rishikesh has no major airport. Flyers usually use <a href=\"/dehradun-airport-to-rishikesh-taxi\">Dehradun airport to Rishikesh taxi</a> or <a href=\"/dehradun-to-rishikesh-taxi\">Dehradun to Rishikesh taxi</a>. Say flight or hotel time in the quote.",
      },
      {
        heading: "Taxi vs car rental",
        body: "Transfer with pickup and drop → taxi pages. Hire for the day or longer → <a href=\"/car-rental-dehradun-to-rishikesh\">car rental Dehradun to Rishikesh</a>.",
      },
      {
        heading: "How to enquire",
        body: `WhatsApp or call ${P} with Rishikesh area (Tapovan, Ram Jhula, highway hotel), date and passenger count.`,
      },
    ],
    faqs: [
      {
        q: "Which areas in Rishikesh can be a pickup?",
        a: "Tapovan, Laxman Jhula / Ram Jhula side (name ghat or hotel), Geeta Nagar, and highway hotels toward Haridwar.",
      },
      {
        q: "Do you drop at the ghats?",
        a: "Share the ashram, hotel or ghat access point. Final drop depends on local vehicle restrictions that day.",
      },
      {
        q: "How do I book?",
        a: `Call or WhatsApp ${P}. Share pickup pin, drop and time.`,
      },
    ],
    relatedSlugs: [
      "taxi",
      "taxi-service-in-dehradun",
      "taxi-service-in-haridwar",
      "dehradun-to-rishikesh-taxi",
      "rishikesh-to-dehradun-taxi",
      "rishikesh-to-mussoorie-taxi",
      "haridwar-to-rishikesh-taxi",
      "dehradun-airport-to-rishikesh-taxi",
      "rishikesh-sightseeing-taxi",
      "car-rental-dehradun-to-rishikesh",
    ],
  },

  "taxi-service-in-haridwar": {
    title: "Taxi Service in Haridwar | Station, Aarti & Outstation | Arora Cars",
    h1: "Taxi service in Haridwar",
    description:
      "Taxi service in Haridwar for station pickups, Har Ki Pauri-area hotels and outstation drops. Chauffeur quote from Arora Cars — 8445619130. Enquiry-led; honest aarti waiting notes; no fake fares.",
    primaryKeyword: "taxi service in Haridwar",
    secondaryKeywords: ["Haridwar taxi", "cab service Haridwar", "Haridwar station taxi"],
    badge: "Enquiry quote · With driver",
    intro:
      "Need a car with a driver in Haridwar? This page is for station luggage runs, hotel transfers and evening aarti plans with clear waiting instructions — plus onward links to Rishikesh, Dehradun or Mussoorie. Chauffeur quotes are arranged via Arora Cars; we do not invent a ghat-side office or fixed aarti package prices. Name the gate or station exit.",
    sections: [
      {
        heading: "Local taxi use in Haridwar",
        body: "Haridwar Junction arrivals with bags, hotel check-ins, and evening Ganga aarti with waiting where traffic police allow — cars do not wait on the ghat itself. Early pickup plans beat last-minute aarti chaos.",
      },
      {
        heading: "Outstation and pilgrimage corridor",
        body: "Common asks: Rishikesh, Dehradun, Mussoorie, and Char Dham road starts. City taxi stays on this page; multi-day yatra framing lives on <a href=\"/char-dham-taxi-service-from-haridwar\">Char Dham taxi from Haridwar</a>. From Dehradun use <a href=\"/dehradun-to-haridwar-taxi\">Dehradun to Haridwar taxi</a>.",
      },
      {
        heading: "Airport note",
        body: "Most flyers land at Jolly Grant then continue by road — <a href=\"/dehradun-airport-to-haridwar-taxi\">airport to Haridwar taxi</a>. Share flight time.",
      },
      {
        heading: "Taxi vs car rental",
        body: "Point-to-point transfer → taxi. Period hire → <a href=\"/car-rental-dehradun-to-haridwar\">car rental Dehradun to Haridwar</a>.",
      },
      {
        heading: "How to enquire",
        body: `WhatsApp or call ${P} with Haridwar pickup (station exit, hotel gate or bypass), date and whether aarti waiting is required.`,
      },
    ],
    faqs: [
      {
        q: "Which areas in Haridwar can be a pickup?",
        a: "Har Ki Pauri side hotels (name the gate), railway station exits, bus stand area, and bypass hotels. Aarti evenings need an early plan.",
      },
      {
        q: "Can the car wait at the ghat?",
        a: "Usually no. The car waits where traffic police allow; you walk the last stretch.",
      },
      {
        q: "How do I book?",
        a: `Call or WhatsApp ${P} with pin, time and passenger count.`,
      },
    ],
    relatedSlugs: [
      "taxi",
      "taxi-service-in-dehradun",
      "taxi-service-in-rishikesh",
      "dehradun-to-haridwar-taxi",
      "haridwar-to-dehradun-taxi",
      "haridwar-to-rishikesh-taxi",
      "haridwar-to-mussoorie-taxi",
      "char-dham-taxi-service-from-haridwar",
      "dehradun-airport-to-haridwar-taxi",
      "car-rental-dehradun-to-haridwar",
    ],
  },

  "taxi-service-in-nainital": {
    title: "Taxi Service in Nainital | Lake Area & Plains Links | Arora Cars",
    description:
      "Taxi service in Nainital for hotel meeting points and Haldwani / Kathgodam links. Chauffeur enquiry via Arora Cars — 8445619130. No fake fares.",
    primaryKeyword: "taxi service in Nainital",
    secondaryKeywords: ["Nainital taxi", "cab in Nainital"],
    relatedSlugs: [
      "taxi",
      "nainital-sightseeing-taxi",
      "haldwani-to-nainital-taxi",
      "kathgodam-to-nainital-taxi",
      "dehradun-to-nainital-taxi",
      "taxi-service-in-haldwani",
    ],
  },

  "taxi-service-in-haldwani": {
    title: "Taxi Service in Haldwani | Gateway to Nainital | Arora Cars",
    description:
      "Taxi service in Haldwani for city transfers and Nainital / Kathgodam corridor runs. Chauffeur enquiry via Arora Cars — 8445619130. No fake fares.",
    primaryKeyword: "taxi service in Haldwani",
    secondaryKeywords: ["Haldwani taxi", "cab Haldwani Nainital"],
    relatedSlugs: [
      "taxi",
      "haldwani-to-nainital-taxi",
      "kathgodam-to-nainital-taxi",
      "kathgodam-railway-station-to-nainital-taxi",
      "taxi-service-in-nainital",
      "nainital-sightseeing-taxi",
    ],
  },

  "dehradun-to-mussoorie-taxi": {
    title: "Dehradun to Mussoorie Taxi | One-Way & Round Trip | Arora Cars",
    h1: "Dehradun to Mussoorie taxi",
    description:
      "Dehradun to Mussoorie taxi — chauffeur one-way or round-trip for the hill climb. Hotel drop with honest traffic and fog notes. Call or WhatsApp 8445619130 for a quote.",
    primaryKeyword: "Dehradun to Mussoorie taxi",
    secondaryKeywords: ["Dehradun Mussoorie cab", "taxi Dehradun to Mussoorie", "Mussoorie taxi from Dehradun"],
    intro:
      "Book a chauffeur for the Dehradun–Mussoorie climb when you want the hairpins handled for you. One-way hotel drop or round trip with waiting — quote on call or WhatsApp, not a printed fake fare.",
    sections: [
      {
        heading: "Dehradun → Mussoorie: what this service covers",
        body: "Chauffeur pickup in/near Dehradun, road transfer toward Mussoorie, and drop at the motorable point for your hotel. Not a shared tempo seat and not a self-drive handover midway.",
      },
      {
        heading: "Travel considerations",
        body: "Sunday and holiday traffic near Mussoorie can stall the last stretch. Fog in winter and wet roads in monsoon matter more than a “1 hour guaranteed” claim. Mall Road often needs a short walk from the car drop.",
      },
      {
        heading: "Arriving in Mussoorie",
        body: "Tell us Library / Mall Road vs Picture Palace vs Landour hotel names when you can. Landour properties may need a different motorable point than Mall Road shops.",
      },
      {
        heading: "Taxi transfer vs car rental",
        body: "This page is a point-to-point chauffeur transfer. If you want to hire a car for the Mussoorie trip (self drive or with driver for hours/days), use <a href=\"/car-rental-dehradun-to-mussoorie\">car rental Dehradun to Mussoorie</a> instead.",
      },
      {
        heading: "Vehicle fit",
        body: "Couples and light luggage often fit a sedan. Families usually need Innova-class or SUV. Class is matched to passenger count — no invented low fares on this page.",
      },
      {
        heading: "Booking steps",
        body: `1) Send route and date on WhatsApp ${P}. 2) Confirm one-way vs round trip. 3) Share passenger/bag count. 4) Receive chauffeur quote. 5) Pay only the agreed advance.`,
      },
    ],
    faqs: [
      {
        q: "One-way or round trip?",
        a: "Both can be quoted. One-way is a drop at Mussoorie. Round trip keeps the car for the return (and waiting if you ask).",
      },
      {
        q: "Taxi or car rental for Mussoorie?",
        a: "Taxi = chauffeur transfer with pickup and drop. Car rental = hire the vehicle for a period — see the car rental Dehradun to Mussoorie page.",
      },
      {
        q: "How do I book?",
        a: `Call or WhatsApp ${P} with pickup pin, hotel name and date.`,
      },
    ],
    relatedSlugs: [
      "taxi",
      "taxi-service-in-dehradun",
      "taxi-service-in-mussoorie",
      "mussoorie-sightseeing-taxi",
      "dehradun-airport-to-mussoorie-taxi",
      "dehradun-to-rishikesh-taxi",
      "car-rental-dehradun-to-mussoorie",
    ],
  },

  "dehradun-to-rishikesh-taxi": {
    title: "Dehradun to Rishikesh Taxi | Chauffeur Transfer | Arora Cars",
    h1: "Dehradun to Rishikesh taxi",
    description:
      "Dehradun to Rishikesh taxi — chauffeur transfer to ashrams, Tapovan or highway hotels. One-way or round trip quote on 8445619130. No fake fares.",
    primaryKeyword: "Dehradun to Rishikesh taxi",
    secondaryKeywords: ["Dehradun Rishikesh cab", "taxi Dehradun to Rishikesh"],
    intro:
      "Plains-and-foothill chauffeur transfer from Dehradun city or hotel to Rishikesh ashrams, Tapovan or highway hotels — timed to your check-in. Quote on call; not a self-drive handover.",
    sections: [
      {
        heading: "Dehradun → Rishikesh: what this service covers",
        body: "Chauffeur pickup in/near Dehradun, road transfer toward Rishikesh, and drop at the pin you name. Not a shared seat and not keys-only hire.",
      },
      {
        heading: "Travel considerations",
        body: "Laxman Jhula lanes are tight; we may meet at a wider pin. Rafting mornings need an early start; evening returns should respect driver rest if you also want a same-day Mussoorie idea.",
      },
      {
        heading: "Arriving in Rishikesh",
        body: "Name Tapovan vs Ram Jhula vs highway hotel. “Rishikesh” alone is not a curb.",
      },
      {
        heading: "Taxi transfer vs car rental",
        body: "Point-to-point chauffeur → this page. Period hire (self drive or with driver) → <a href=\"/car-rental-dehradun-to-rishikesh\">car rental Dehradun to Rishikesh</a>.",
      },
      {
        heading: "Booking steps",
        body: `WhatsApp ${P} with pickup, Rishikesh pin, date, one-way vs round trip and bag count.`,
      },
    ],
    faqs: [
      {
        q: "One-way or round trip?",
        a: "Both can be quoted. Say if the driver should wait in Rishikesh.",
      },
      {
        q: "Airport instead of city pickup?",
        a: "Use Dehradun airport to Rishikesh taxi when you land at Jolly Grant.",
      },
      {
        q: "How do I book?",
        a: `Call or WhatsApp ${P}.`,
      },
    ],
    relatedSlugs: [
      "taxi",
      "taxi-service-in-dehradun",
      "taxi-service-in-rishikesh",
      "rishikesh-to-dehradun-taxi",
      "dehradun-airport-to-rishikesh-taxi",
      "rishikesh-sightseeing-taxi",
      "dehradun-to-haridwar-taxi",
      "car-rental-dehradun-to-rishikesh",
    ],
  },

  "dehradun-to-haridwar-taxi": {
    title: "Dehradun to Haridwar Taxi | Station & Aarti Runs | Arora Cars",
    h1: "Dehradun to Haridwar taxi",
    description:
      "Dehradun to Haridwar taxi for station drops, hotel check-ins and evening aarti plans with clear waiting notes. Chauffeur quote — 8445619130.",
    primaryKeyword: "Dehradun to Haridwar taxi",
    secondaryKeywords: ["Dehradun Haridwar cab", "taxi Dehradun to Haridwar"],
    intro:
      "Chauffeur run from Dehradun to Haridwar for station drops, hotel check-ins, or evening aarti plans with clear waiting instructions. Quote on WhatsApp or call — no invented fixed aarti fare on this page.",
    sections: [
      {
        heading: "Dehradun → Haridwar: what this service covers",
        body: "Chauffeur pickup in/near Dehradun, road transfer to Haridwar, and drop at station exit, hotel gate or bypass pin you name.",
      },
      {
        heading: "Travel considerations",
        body: "Aarti nights crowd the ghat side — cars wait where traffic police allow. Train connections need buffer; do not cut it fine from a Mussoorie descent the same evening without saying so.",
      },
      {
        heading: "Arriving in Haridwar",
        body: "Share Har Ki Pauri hotel gate vs railway station exit vs bypass hotel.",
      },
      {
        heading: "Taxi transfer vs car rental",
        body: "Transfer only → this page. Hire for the trip period → <a href=\"/car-rental-dehradun-to-haridwar\">car rental Dehradun to Haridwar</a>. Multi-day yatra → Char Dham taxi pages.",
      },
      {
        heading: "Booking steps",
        body: `WhatsApp ${P} with pickup, Haridwar pin, date and whether aarti waiting is required.`,
      },
    ],
    faqs: [
      {
        q: "One-way or round trip?",
        a: "Both can be quoted. Round trip with aarti waiting needs an early plan.",
      },
      {
        q: "How do I book?",
        a: `Call or WhatsApp ${P}.`,
      },
    ],
    relatedSlugs: [
      "taxi",
      "taxi-service-in-dehradun",
      "taxi-service-in-haridwar",
      "haridwar-to-dehradun-taxi",
      "dehradun-airport-to-haridwar-taxi",
      "haridwar-to-rishikesh-taxi",
      "char-dham-taxi-service-from-haridwar",
      "car-rental-dehradun-to-haridwar",
    ],
  },

  "dehradun-airport-taxi": {
    title: "Dehradun Airport Taxi | Jolly Grant (DED) Pickup & Drop | Arora Cars",
    h1: "Dehradun airport taxi (Jolly Grant)",
    description:
      "Dehradun airport taxi from Jolly Grant (DED) — chauffeur pickup and drop to city, Mussoorie, Rishikesh or Haridwar. Share flight time. Call 8445619130. Quote-based.",
    primaryKeyword: "Dehradun airport taxi",
    secondaryKeywords: [
      "Jolly Grant airport taxi",
      "DED airport cab",
      "Dehradun airport pickup",
      "Jolly Grant taxi",
    ],
    badge: "DED · Airport taxi quote",
    intro:
      "Flying into Jolly Grant? Send your flight number and destination. We arrange a chauffeur meet — not a curb tout and not a self-drive key handover in the terminal car park unless you separately booked self-drive. This page owns airport taxi transfers; multi-day or self-drive airport hire is covered on the Jolly Grant car rental page.",
    sections: [
      {
        heading: "Pickup and drop",
        body: "Arrival pickup after you exit, or departure drop timed to check-in. Name domestic terminal timing and how many bags. Reasonable delay waiting is part of airport work when you share the flight number; extreme diversions are re-quoted honestly.",
      },
      {
        heading: "Where guests go next",
        body: "Dehradun city, <a href=\"/dehradun-airport-to-mussoorie-taxi\">Mussoorie</a>, <a href=\"/dehradun-airport-to-rishikesh-taxi\">Rishikesh</a>, <a href=\"/dehradun-airport-to-haridwar-taxi\">Haridwar</a> — each is a different clock. Local city taxi context: <a href=\"/taxi-service-in-dehradun\">taxi service in Dehradun</a>.",
      },
      {
        heading: "Airport taxi vs Jolly Grant car rental",
        body: "<strong>Airport taxi</strong> (this page) = chauffeur transfer with pickup and drop. <strong><a href=\"/jolly-grant-airport-car-rental\">Jolly Grant airport car rental</a></strong> = when you also need self-drive after hotel handover or a longer hire framed as car rental. Many guests only need the transfer — start here.",
      },
      {
        heading: "Luggage and travellers",
        body: "Multiple suitcases, elders, and child seats (if required) change the vehicle class. Say it up front — we quote class, not an invented fixed fare table.",
      },
      {
        heading: "How to enquire",
        body: `WhatsApp or call ${P} with flight number, ETA and drop city/hotel.`,
      },
    ],
    faqs: [
      {
        q: "Do you wait if the flight is late?",
        a: "Tell us the flight number. Reasonable delay waiting is part of airport work; extreme diversions are re-quoted honestly.",
      },
      {
        q: "Is this a taxi or a car rental?",
        a: "This page is chauffeur airport taxi. For self-drive or longer car hire around the airport trip, see Jolly Grant airport car rental.",
      },
      {
        q: "How do I book a Dehradun airport taxi?",
        a: `Call or WhatsApp ${P} with flight details and drop pin.`,
      },
    ],
    relatedSlugs: [
      "taxi",
      "taxi-service-in-dehradun",
      "dehradun-airport-to-rishikesh-taxi",
      "dehradun-airport-to-mussoorie-taxi",
      "dehradun-airport-to-haridwar-taxi",
      "jolly-grant-airport-car-rental",
      "dehradun-railway-station-taxi",
      "car-rental-dehradun",
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
