export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  date: string;
  heroImage: string;
  excerpt: string;
  body: { heading?: string; html: string }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "best-time-to-visit-chakrata",
    title: "Best Time to Visit Chakrata from Dehradun (and What to Drive)",
    description: "When to visit Chakrata from Dehradun, road conditions, and whether to rent a Thar, Creta or Bolero. Arora Cars guide.",
    primaryKeyword: "best time to visit Chakrata",
    secondaryKeywords: ["Chakrata from Dehradun", "Thar rental Chakrata"],
    date: "2026-03-12",
    heroImage: "/images/destinations/mussoorie-hills.jpg",
    excerpt: "Chakrata is quieter than Mussoorie and rougher in patches. Season and vehicle choice matter more than the brochure photos.",
    body: [
      { html: "<p>Chakrata sits west of Dehradun, past a cantonment and a stretch of forest road that does not forgive a tired city hatch. If you are renting from Dehradun, treat this as a hill day, not a mall-road evening.</p>" },
      { heading: "Best months", html: "<p><strong>April–June</strong> for clear views and open cafes. <strong>September–November</strong> after the monsoon has eased. December–February is beautiful and cold; confirm ice on shaded bends before you take a self-drive Thar. July–August is hit-and-miss — we sometimes pause self-drive on the worst-cut stretches.</p>" },
      { heading: "What to rent", html: "<p>Couples who just want the ridge: Creta or Brezza. Photographers and off-tarmac curiosity: Thar or Jimny. Families with elders: Bolero or Innova with a driver. A scooty is the wrong tool for this road.</p>" },
      { heading: "Book from Dehradun", html: "<p>See our <a href=\"/car-rental-dehradun-to-chakrata\">Chakrata car rental page</a> or WhatsApp 8979490332 with your dates.</p>" },
    ],
  },
  {
    slug: "dehradun-to-kedarnath-road-trip-guide",
    title: "Dehradun to Kedarnath Road Trip Guide (Car vs Tempo)",
    description: "How to plan Dehradun to Kedarnath by road — Sonprayag, overnight stops, Innova vs Bolero vs Tempo Traveller.",
    primaryKeyword: "Dehradun to Kedarnath road trip",
    secondaryKeywords: ["Kedarnath car rental", "Sonprayag from Dehradun"],
    date: "2026-04-02",
    heroImage: "/images/destinations/chardham-temple.jpg",
    excerpt: "The car only goes so far. Plan the motorable head, the trek, and the driver’s rest — not just the temple photo.",
    body: [
      { html: "<p>From Dehradun you are looking at a long highway day toward Guptkashi / Sitapur / Sonprayag, then a local jeep or trek. Anyone selling a “drive to the temple door” is not telling the truth.</p>" },
      { heading: "Vehicle choice", html: "<p><strong>Innova Crysta</strong> if comfort and elders matter. <strong>Bolero</strong> if you want the traditional yatra workhorse. <strong>12-seater Tempo</strong> if the whole family must stay together. Self-drive is possible for experienced hill drivers; most families should take a chauffeur.</p>" },
      { heading: "Timing", html: "<p>Start before dawn from Dehradun if you want a same-day arrival at the last motorable point. Better: a night at Guptkashi or Sitapur. We quote multi-day packages on <a href=\"/car-rental-kedarnath\">/car-rental-kedarnath</a>.</p>" },
    ],
  },
  {
    slug: "dehradun-to-mussoorie-self-drive-tips",
    title: "Dehradun to Mussoorie Self Drive Tips (Hairpins, Fog, Parking)",
    description: "Practical self-drive tips for Dehradun to Mussoorie — engine braking, fog, Sunday traffic and Mall Road parking.",
    primaryKeyword: "Dehradun to Mussoorie self drive tips",
    secondaryKeywords: ["Mussoorie self drive", "car rental Dehradun to Mussoorie"],
    date: "2026-02-18",
    heroImage: "/images/destinations/mussoorie-hills.jpg",
    excerpt: "34 km is not the hard part. The hard part is the last 12 km of hairpins and the Sunday evening descent.",
    body: [
      { html: "<p>Use engine braking. Do not ride the brakes the whole way down. If fog sits on the ridge after 4 pm, slow down and use dipped beams — not hazards as a driving style.</p>" },
      { heading: "Parking", html: "<p>Mall Road is not your long-stay car park. Use designated stands and walk. A compact SUV is easier than a Fortuner if you insist on self-drive into town.</p>" },
      { heading: "Rent the right car", html: "<p>We recommend Creta, Brezza or Dzire. Read <a href=\"/car-rental-dehradun-to-mussoorie\">the Mussoorie rental page</a> and book on 8979490332.</p>" },
    ],
  },
  {
    slug: "rishikesh-weekend-from-dehradun",
    title: "Rishikesh Weekend from Dehradun: Car, Bike or Scooty?",
    description: "Plan a Rishikesh weekend from Dehradun — when to take a car, a Bullet, or stay on an Activa in the city.",
    primaryKeyword: "Rishikesh weekend from Dehradun",
    secondaryKeywords: ["bike rental Dehradun to Rishikesh", "car rental Dehradun to Rishikesh"],
    date: "2026-01-22",
    heroImage: "/images/destinations/rishikesh-ghat.jpg",
    excerpt: "43 km of highway, then tight Tapovan lanes. The vehicle that felt right at Clock Tower may be wrong at Laxman Jhula.",
    body: [
      { html: "<p>Take a <strong>car with driver</strong> if you have luggage and a hotel on the Ganga. Take a <strong>bike</strong> if you want the highway and already ride. Take a <strong>scooty</strong> only if you are staying in Dehradun and doing a cautious day trip — we will tell you if we do not like the idea.</p>" },
      { heading: "Parking", html: "<p>Old town parking is the constraint. Many guests leave the car at the hotel and walk the ghats.</p>" },
      { heading: "Book", html: "<p><a href=\"/car-rental-dehradun-to-rishikesh\">Cars</a> · <a href=\"/bike-rental-dehradun-to-rishikesh\">Bikes</a> · WhatsApp 8979490332.</p>" },
    ],
  },
  {
    slug: "char-dham-yatra-car-rental-guide",
    title: "Char Dham Yatra Car Rental Guide from Dehradun",
    description: "How to choose Innova, Scorpio or Tempo Traveller for Char Dham from Dehradun, with realistic day plans.",
    primaryKeyword: "Char Dham yatra car rental guide",
    secondaryKeywords: ["Innova Char Dham", "Tempo Traveller Char Dham"],
    date: "2026-04-20",
    heroImage: "/images/destinations/chardham-temple.jpg",
    excerpt: "Four dhams, one tired driver if you plan badly. Vehicle choice is the easy part; the itinerary is the work.",
    body: [
      { html: "<p>From Dehradun, a full circuit is a week-ish trip if you want to stay human. Two-dham splits (Yamunotri–Gangotri, Kedarnath–Badrinath) are kinder.</p>" },
      { heading: "Fleet", html: "<p>4 pax: Innova or XUV700. 6–7: Scorpio-N. 8–12: Tempo 12s. Urbania if you want coach seats without a bus.</p>" },
      { heading: "Pages", html: "<p><a href=\"/car-rental-char-dham-yatra\">Circuit cars</a> · <a href=\"/tempo-traveller-char-dham-yatra\">Tempo</a> · <a href=\"/self-drive-car-chardham-yatra\">Self drive (experienced only)</a>.</p>" },
    ],
  },
  {
    slug: "best-scooty-for-dehradun-tourists",
    title: "Best Scooty for Dehradun Tourists: Activa 6G vs 125 vs Jupiter",
    description: "Which scooty to rent in Dehradun — Activa 6G, Activa 125, Jupiter, Access. Tourist comparison.",
    primaryKeyword: "best scooty for Dehradun tourists",
    secondaryKeywords: ["Activa rental Dehradun", "scooty on rent in Dehradun"],
    date: "2026-03-01",
    heroImage: "/images/fleet/scooty-activa.jpg",
    excerpt: "If you searched “scooty on rent in Dehradun”, you probably want an Activa. Here is when to pay extra for 125cc.",
    body: [
      { html: "<p><strong>Activa 6G</strong> is the default: light, familiar, enough for city + Sahastradhara. <strong>Activa 125</strong> if two-up with a backpack, or a cautious hop toward Rishikesh after we talk. <strong>Jupiter / Access</strong> if you want storage and a flatter floor.</p>" },
      { heading: "Station pickup", html: "<p>We deliver at the railway exit. See <a href=\"/scooty-rental-near-railway-station-dehradun\">scooty near railway station</a>.</p>" },
    ],
  },
  {
    slug: "self-drive-vs-chauffeur-dehradun",
    title: "Self Drive vs Chauffeur in Dehradun: Which Should You Book?",
    description: "Self drive or car with driver in Dehradun? Honest comparison for Mussoorie, airport and Char Dham.",
    primaryKeyword: "self drive vs chauffeur Dehradun",
    secondaryKeywords: ["car with driver Dehradun", "self drive car rental Dehradun"],
    date: "2026-02-05",
    heroImage: "/images/fleet/hatchback-silver.jpg",
    excerpt: "Self drive wins on freedom. A driver wins on fog, aarti traffic and yatra nights. Pick the trip, not the identity.",
    body: [
      { html: "<p>Choose <strong>self drive</strong> for city days, a daylight Mussoorie run, and if you already drive in Indian hills. Choose <strong>chauffeur</strong> for Jolly Grant, Haridwar aarti, Char Dham, and any night you do not want to be the person on the hairpin.</p>" },
      { heading: "Price", html: "<p>A chauffeur Dzire is often only a little more than a self-drive Creta once you add fuel anxiety and parking time. Ask us to quote both.</p>" },
    ],
  },
  {
    slug: "nainital-from-dehradun-by-car",
    title: "Nainital from Dehradun by Car: Distance, Time and Vehicle",
    description: "Driving from Dehradun to Nainital — time, route notes, and whether to self-drive or take a chauffeur SUV.",
    primaryKeyword: "Nainital from Dehradun by car",
    secondaryKeywords: ["car rental Dehradun to Nainital"],
    date: "2026-03-28",
    heroImage: "/images/destinations/mussoorie-hills.jpg",
    excerpt: "Longer than Mussoorie, prettier if you like lakes, worse if you start at 11 am on a Saturday.",
    body: [
      { html: "<p>Treat Nainital as a proper outstation day or an overnight. An SUV or Innova is the right class. Mallital parking fills early — a driver who already has a stand in mind is worth it on weekends.</p>" },
      { heading: "Book", html: "<p><a href=\"/car-rental-dehradun-to-nainital\">Dehradun to Nainital car rental</a> · 8979490332.</p>" },
    ],
  },
  {
    slug: "auli-road-trip-from-dehradun",
    title: "Auli Road Trip from Dehradun: Season, SUV and Cutoffs",
    description: "Planning Dehradun to Auli by car — winter cutoffs, Joshimath nights, and which SUV we will actually release.",
    primaryKeyword: "Auli road trip from Dehradun",
    secondaryKeywords: ["car rental Dehradun to Auli"],
    date: "2026-01-08",
    heroImage: "/images/destinations/chardham-temple.jpg",
    excerpt: "Auli is seasonal. We will refuse a booking before we send a hatch into a closed road.",
    body: [
      { html: "<p>Winter ski weeks and summer meadow weeks are different products. WhatsApp the exact dates. We check that season’s Joshimath / Auli notes before confirming an SUV.</p>" },
      { heading: "Vehicle", html: "<p>Capable SUV + hill driver. Self-drive only for people who have done this road before. See <a href=\"/car-rental-dehradun-to-auli\">/car-rental-dehradun-to-auli</a>.</p>" },
    ],
  },
  {
    slug: "wedding-car-rental-dehradun-guide",
    title: "Wedding Car Rental in Dehradun: Lead Car, Guest Fleet, Timing",
    description: "How to book wedding cars in Dehradun and Mussoorie — Mercedes lead car, Innova guest fleet, décor and airport arrivals.",
    primaryKeyword: "wedding car rental Dehradun guide",
    secondaryKeywords: ["bridal car Dehradun", "Mussoorie destination wedding cars"],
    date: "2026-02-14",
    heroImage: "/images/categories/wedding-car-dehradun.jpg",
    excerpt: "The lead car is the photograph. The guest fleet is the logistics. Budget both.",
    body: [
      { html: "<p>Book the decorated Mercedes / BMW / Camry for the couple, then a uniform Innova or Fortuner set for family. Destination weddings in Mussoorie need staggered hotel pickups — we run a simple movement sheet.</p>" },
      { heading: "Airport", html: "<p>Outstation guests landing at Jolly Grant should not meet the baraat car at arrivals. Use a separate airport Innova, then swap at the hotel.</p>" },
      { heading: "Page", html: "<p><a href=\"/wedding-car-rental-dehradun\">Wedding car rental Dehradun</a>.</p>" },
    ],
  },
  {
    slug: "jolly-grant-airport-pickup-tips",
    title: "Jolly Grant Airport Pickup Tips (Dehradun)",
    description: "How airport car rental works at Jolly Grant — flight tracking, vehicle size, and Mussoorie vs city drops.",
    primaryKeyword: "Jolly Grant airport pickup",
    secondaryKeywords: ["Dehradun airport taxi", "Jolly Grant car rental"],
    date: "2026-01-15",
    heroImage: "/images/fleet/hatchback-silver.jpg",
    excerpt: "Share the flight number. Do not book a 2-seater mindset when you have four check-in bags.",
    body: [
      { html: "<p>DED is a small airport that still produces pile-ups when three Delhi flights land together. We pre-position. You walk out; the board has your name.</p>" },
      { heading: "What to book", html: "<p>Dzire for 1–3. Ertiga or Innova for families. Luxury sedan if that is the trip. Self-drive handover is better at the hotel, not the kerb.</p>" },
      { heading: "Link", html: "<p><a href=\"/jolly-grant-airport-car-rental\">Airport car rental page</a>.</p>" },
    ],
  },
  {
    slug: "dehradun-local-sightseeing-by-scooty",
    title: "Dehradun Local Sightseeing by Scooty (Half-Day Loop)",
    description: "A half-day Dehradun scooty loop: Clock Tower, Robber's Cave, Sahastradhara, and when to switch to a car.",
    primaryKeyword: "Dehradun local sightseeing scooty",
    secondaryKeywords: ["Sahastradhara scooty", "Robber's Cave Activa"],
    date: "2026-03-08",
    heroImage: "/images/fleet/scooty-activa.jpg",
    excerpt: "For two people with light bags, an Activa beats a car in Dehradun traffic. For elders, it does not.",
    body: [
      { html: "<p>Morning: Robber’s Cave while it is quiet. Midday: Sahastradhara. Evening: Paltan Bazaar on foot — park the scooty, do not thread the market at rush hour.</p>" },
      { heading: "Rent", html: "<p><a href=\"/scooty-on-rent-dehradun\">Scooty hub</a> · <a href=\"/car-rental-dehradun-sahastradhara\">Sahastradhara page</a>.</p>" },
    ],
  },
  {
    slug: "car-rental-in-dehradun-complete-guide",
    title: "Car Rental in Dehradun: Complete Guide (Self Drive & Driver)",
    description:
      "How car rental in Dehradun works — self drive vs chauffeur, pickup points, documents, deposits and when to book an SUV. Arora Cars guide.",
    primaryKeyword: "car rental in Dehradun guide",
    secondaryKeywords: ["rent a car in Dehradun", "car hire Dehradun"],
    date: "2026-09-01",
    heroImage: "/images/fleet/hatchback-silver.jpg",
    excerpt:
      "One desk, two products: self drive when you want the wheel, chauffeur when the hills or the airport ask for a driver.",
    body: [
      {
        html: "<p><strong>Short answer:</strong> Book a self drive hatch/sedan/SUV for flexible city and daylight Mussoorie trips. Book a chauffeur car for Jolly Grant, Haridwar aarti, multi-day Char Dham, or night hill driving. Start at our <a href=\"/car-rental-dehradun\">car rental Dehradun hub</a>.</p>",
      },
      {
        heading: "Pickup points that actually work",
        html: "<p>Clock Tower / city hotels, Dehradun Railway Station, ISBT, and Jolly Grant Airport. Airport jobs are chauffeur. Self drive handover can follow at the hotel. See <a href=\"/jolly-grant-airport-car-rental\">airport</a> and <a href=\"/car-rental-near-dehradun-railway-station\">railway</a> pages.</p>",
      },
      {
        heading: "Documents and deposit (self drive)",
        html: "<p>Licence (1+ year), photo ID, refundable deposit by model. Details: <a href=\"/documents-required-self-drive\">documents page</a>. Minimum age 21.</p>",
      },
      {
        heading: "Pricing without the fog",
        html: "<p>Live starting rates sit on each vehicle card. Fuel, tolls, extra km and peak dates change the final amount — confirm on WhatsApp before advance. Overview: <a href=\"/car-rental-pricing-dehradun\">pricing</a>.</p>",
      },
      {
        heading: "Book",
        html: "<p>Call or WhatsApp <strong>8979490332</strong>. Or open a model under <a href=\"/car-fleet-dehradun\">fleet</a> and send the form.</p>",
      },
    ],
  },
  {
    slug: "self-drive-car-rental-documents-deposit-rules",
    title: "Self Drive Car Rental in Dehradun: Documents, Deposit and Rules",
    description:
      "Documents, deposit, age limit, fuel and km rules for self drive car rental in Dehradun. Practical checklist from Arora Cars.",
    primaryKeyword: "documents required for self drive car rental",
    secondaryKeywords: ["security deposit self drive car Dehradun", "self drive rental Dehradun"],
    date: "2026-09-01",
    heroImage: "/images/fleet/hatchback-silver.jpg",
    excerpt: "Three things at handover: licence, ID, deposit. Everything else is confirmed on the booking message.",
    body: [
      {
        html: "<p>This guide matches what we collect at Clock Tower, Dehradun. It does not invent extra paperwork. Full policy pages: <a href=\"/documents-required-self-drive\">documents</a>, <a href=\"/insurance-info\">insurance</a>, <a href=\"/terms-and-conditions\">terms</a>.</p>",
      },
      {
        heading: "Checklist",
        html: "<ul><li>Driving licence valid 1+ year</li><li>Aadhaar / passport / voter ID</li><li>Refundable deposit for that car (see vehicle page)</li><li>Live selfie with licence at handover</li></ul>",
      },
      {
        heading: "Fuel and km",
        html: "<p>Default fuel is as-is / as-is. Daily km packages and per-km extras are on the model page. Ask for full-to-full if you prefer that accounting.</p>",
      },
      {
        heading: "Book self drive",
        html: "<p><a href=\"/self-drive-car-rental-dehradun\">Self drive hub</a> · WhatsApp 8979490332.</p>",
      },
    ],
  },
  {
    slug: "bike-vs-scooty-dehradun-mussoorie",
    title: "Bike vs Scooty for Dehradun and Mussoorie",
    description:
      "Should you rent a bike or an Activa in Dehradun? City vs Mussoorie climb, two-up riding, and when to take a car instead.",
    primaryKeyword: "bike vs scooty Dehradun",
    secondaryKeywords: ["Activa vs Bullet Dehradun", "scooty for Mussoorie"],
    date: "2026-09-02",
    heroImage: "/images/fleet/bike-bullet-classic.jpg",
    excerpt: "City sightseeing loves an Activa. The Mussoorie climb usually wants a bike — or a car.",
    body: [
      {
        html: "<p><strong>City / Robber's Cave / Sahastradhara:</strong> Activa or similar scooty. <strong>Mussoorie climb two-up:</strong> 150cc+ bike or a car. We will refuse a highway scooty booking if the rider is not ready.</p>",
      },
      {
        heading: "Links",
        html: "<p><a href=\"/scooty-on-rent-dehradun\">Scooty hub</a> · <a href=\"/bike-rental-dehradun\">Bike hub</a> · <a href=\"/bike-rental-dehradun-to-mussoorie\">Bike to Mussoorie</a>.</p>",
      },
    ],
  },
  {
    slug: "tempo-traveller-seating-guide-dehradun",
    title: "12 vs 17 vs 20 Seater Tempo Traveller from Dehradun",
    description:
      "Which Tempo Traveller size for family, wedding guests or Char Dham from Dehradun — 12, 17, 20 and 26 seater guide.",
    primaryKeyword: "12 seater vs 17 seater tempo traveller",
    secondaryKeywords: ["tempo traveller seating Dehradun", "tempo traveller Char Dham"],
    date: "2026-09-02",
    heroImage: "/images/fleet/tempo-traveller-white.jpg",
    excerpt: "Count passengers and bags, not just seats on a brochure.",
    body: [
      {
        html: "<p><strong>12 seater:</strong> one extended family / small Char Dham group. <strong>15–17:</strong> two families. <strong>20–26:</strong> larger yatra batches. All with driver from Dehradun.</p>",
      },
      {
        heading: "Book",
        html: "<p><a href=\"/tempo-traveller-rental-dehradun\">Tempo hub</a> · <a href=\"/tempo-traveller-char-dham-yatra\">Char Dham Tempo</a> · 8979490332.</p>",
      },
    ],
  },
  {
    slug: "uttarakhand-road-trip-vehicle-guide",
    title: "Which Car is Best for a Uttarakhand Road Trip from Dehradun?",
    description:
      "Hatch, sedan, SUV or Innova for Uttarakhand trips from Dehradun — Mussoorie, Rishikesh and Char Dham vehicle advice.",
    primaryKeyword: "best car for Uttarakhand road trip",
    secondaryKeywords: ["SUV for Mussoorie", "Innova Char Dham"],
    date: "2026-09-03",
    heroImage: "/images/fleet/suv-compact-white.jpg",
    excerpt: "Match the car to the climb and the luggage — not to a brochure photo.",
    body: [
      {
        html: "<p>Couples / light bags: Dzire or Creta. Families: Innova or Ertiga. Rough approaches / yatra: Scorpio, Bolero or XUV700 with a driver. Thar for adventure weekends when available.</p>",
      },
      {
        heading: "Next",
        html: "<p><a href=\"/suv-rental-dehradun\">SUV rental</a> · <a href=\"/car-rental-dehradun\">Car rental hub</a> · <a href=\"/car-rental-char-dham-yatra\">Char Dham cars</a>.</p>",
      },
    ],
  },
  {
    slug: "weekly-monthly-car-rental-dehradun-guide",
    title: "Weekly and Monthly Car Rental in Dehradun",
    description:
      "When weekly or monthly self drive makes sense in Dehradun — km packages, who it suits, how to book with Arora Cars.",
    primaryKeyword: "monthly car rental Dehradun",
    secondaryKeywords: ["weekly car rental Dehradun", "long term car rental Dehradun"],
    date: "2026-09-03",
    heroImage: "/images/fleet/hatchback-silver.jpg",
    excerpt: "Interns, project staff and slow holidays — duration packages beat stacking daily walk-up rates.",
    body: [
      {
        html: "<p>Weekly and monthly rates exist on selected self drive models (see fleet cards labelled weekly/monthly). Km caps apply. Confirm insurance and service windows on the call.</p>",
      },
      {
        heading: "Pages",
        html: "<p><a href=\"/weekly-car-rental-dehradun\">Weekly</a> · <a href=\"/monthly-car-rental-dehradun\">Monthly</a> · <a href=\"/self-drive-car-rental-dehradun\">Self drive</a>.</p>",
      },
    ],
  },
  {
    slug: "dehradun-railway-station-pickup-guide",
    title: "Dehradun Railway Station Pickup Guide (Car, Bike, Scooty)",
    description:
      "How to arrange car, bike or Activa pickup at Dehradun railway station — what to share, where we meet, late trains.",
    primaryKeyword: "Dehradun railway station car rental pickup",
    secondaryKeywords: ["scooty near Dehradun railway station", "taxi Dehradun station"],
    date: "2026-09-04",
    heroImage: "/images/fleet/hatchback-silver.jpg",
    excerpt: "Share the train number. We wait at the exit — car, Innova or Activa as booked.",
    body: [
      {
        html: "<p>WhatsApp arrival time and coach preference if you have one. Licence ready for two-wheelers. Late Jan Shatabdi / Nanda Devi arrivals are normal for us.</p>",
      },
      {
        heading: "Book",
        html: "<p><a href=\"/car-rental-near-dehradun-railway-station\">Station cars</a> · <a href=\"/scooty-rental-near-railway-station-dehradun\">Station scooty</a> · 8979490332.</p>",
      },
    ],
  },
  {
    slug: "things-to-check-before-rental-car-dehradun",
    title: "Things to Check Before Taking a Rental Car in Dehradun",
    description:
      "Handover checklist for rental cars in Dehradun — scratches, spare, lights, documents and hill-road basics.",
    primaryKeyword: "rental car checklist Dehradun",
    secondaryKeywords: ["before renting a car Dehradun"],
    date: "2026-09-04",
    heroImage: "/images/fleet/hatchback-silver.jpg",
    excerpt: "Five minutes at handover saves an argument at return — especially before a Mussoorie climb.",
    body: [
      {
        html: "<ul><li>Walk around and note existing scratches with us</li><li>Check spare, jack, lights, AC, brakes feel</li><li>Confirm fuel policy and km package on the booking message</li><li>Save our roadside number</li><li>Ask about descent engine braking if you are new to hills</li></ul>",
      },
      {
        heading: "Related",
        html: "<p><a href=\"/self-drive-car-rental-dehradun\">Self drive</a> · <a href=\"/insurance-info\">Insurance</a> · <a href=\"/blog/dehradun-to-mussoorie-self-drive-tips\">Mussoorie self drive tips</a>.</p>",
      },
    ],
  },
];
