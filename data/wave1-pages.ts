import type { LandingPage } from "./pages";
import { WAVE1_CITY_HUBS, WAVE1_CITY_HUB_SLUGS } from "./wave1-hubs";

const CHECK = "Check Availability with Local Rental Partners";
const PROCESS =
  "How the quote is confirmed is on [how a quote works](/how-to-book). The phone desk is [contact](/contact-book-now). [Which rules apply only in Dehradun](/faq) is why this page has no fleet and no price.";

type RouteSpec = {
  slug: string;
  h1: string;
  title: string;
  primary: string;
  secondary: string;
  facts: string;
  cannibal: string;
  reverse?: string;
};

type CitySpec = {
  slug: string;
  name: string;
  city: string;
  areas: string;
  self: string;
  driver: string;
  airportSlug: string;
  airportTitle: string;
  airportH1: string;
  airportPrimary: string;
  airportFacts: string;
  stationSlug: string;
  stationLabel: string;
  stationFacts: string;
  suv: string;
  monthly: string;
  routes: RouteSpec[];
};

const CITIES: CitySpec[] = [
  {
    slug: "delhi",
    name: "Delhi",
    city: "Delhi",
    areas: "Connaught Place is the centre people name. Aerocity is the hotel belt beside the airport and is a different pickup from CP. Gurugram and Noida are NCR questions for the partner, not a claimed service area.",
    self: "Delhi self-drive means you take the keys for the city or a highway run. Do not treat a restricted-road or odd-even rule as fact on this page. The partner can add a local condition when they reply.",
    driver: "A Delhi driver is the usual ask for an IGI transfer, a meeting day, or a first trip toward Agra. A city day is not the same job as leaving for Jaipur.",
    airportSlug: "delhi-airport-car-rental",
    airportTitle: "Delhi Airport Car Rental (IGI T1 and T3) | Arora Cars",
    airportH1: "Delhi airport car rental",
    airportPrimary: "Delhi airport car rental",
    airportFacts: "One page for Indira Gandhi International (DEL). Terminal 1 and Terminal 3 are different meeting points, so the quote needs the terminal and the flight time. Aerocity hotels sit beside the airport and are still not a terminal curb. Do not name Terminal 2 unless you have checked that it is operating. There is no Arora Cars counter inside the airport.",
    stationSlug: "new-delhi",
    stationLabel: "New Delhi Railway Station",
    stationFacts: "NDLS is this page. Ajmeri Gate and Paharganj are different meeting sides, so the quote needs the train and the exit. Hazrat Nizamuddin is named once for southbound trains that do not use NDLS. There is no second station URL and no railway counter.",
    suv: "A Delhi SUV ask is usually seats and luggage for a family, a guest move, or an outstation. Innova-class is an example of the ask, not a car marked in stock.",
    monthly: "A Delhi month is a relocate or a long project: one handover and a kilometre plan agreed in the quote. It is not a discounted daily page, and no monthly rupee figure is published.",
    routes: [
      {
        slug: "agra",
        h1: "Delhi to Agra car rental",
        title: "Delhi to Agra Car Rental | Arora Cars",
        primary: "Delhi to Agra car rental",
        secondary: "Delhi to Agra cab; Delhi to Agra taxi",
        facts: "The car starts in Delhi. This is the Yamuna Expressway trip for the Taj, usually a day or an overnight with a driver. Say whether you need a same-day return or to leave the car in Agra. No monument ticket is included. Distance and duration are confirmed in the quote, not copied from a cab site.",
        cannibal: "This is not the Jaipur-to-Agra page.",
        reverse: "",
      },
      {
        slug: "jaipur",
        h1: "Delhi to Jaipur car rental",
        title: "Delhi to Jaipur Car Rental | Arora Cars",
        primary: "Delhi to Jaipur car rental",
        secondary: "Delhi to Jaipur cab; Delhi to Jaipur taxi",
        facts: "The car starts in Delhi and uses NH48 toward Jaipur. It can be a drop or a longer Rajasthan stay. The Jaipur hub is the page for a trip that starts there afterward.",
        cannibal: "The reverse trip is a different page because the pickup city changes.",
        reverse: "car-rental-jaipur-to-delhi",
      },
      {
        slug: "chandigarh",
        h1: "Delhi to Chandigarh car rental",
        title: "Delhi to Chandigarh Car Rental | Arora Cars",
        primary: "Delhi to Chandigarh car rental",
        secondary: "Delhi to Chandigarh cab; Delhi to Chandigarh taxi",
        facts: "This is a plains highway drop into the Tricity. The page ends at Chandigarh. A later Shimla or Manali drive starts on the Chandigarh pages, not here.",
        cannibal: "Not the Chandigarh city hub and not Chandigarh to Shimla.",
      },
    ],
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    city: "Mumbai",
    areas: "South Mumbai, Bandra, and Andheri are the pickups to name. Navi Mumbai is a separate drive and is a quote question, not a second city page.",
    self: "Mumbai self-drive is for someone who will handle the expressway or a local day. Tolls and parking stay the renter's cost unless the quote says otherwise. No restricted-plate rule is stated here.",
    driver: "A Mumbai driver is the default for CSMIA, a south-to-suburb day, and the Ghats. A local day and an outstation are different quote shapes.",
    airportSlug: "mumbai-airport-car-rental",
    airportTitle: "Mumbai Airport Car Rental (CSMIA T1 and T2) | Arora Cars",
    airportH1: "Mumbai airport car rental",
    airportPrimary: "Mumbai airport car rental",
    airportFacts: "Chhatrapati Shivaji Maharaj International (BOM). Terminal 1 and Terminal 2 are different kerbs. The quote needs the terminal, not only the word airport. Do not mention a Navi Mumbai airport unless it is confirmed open, and do not create a second airport URL. There is no rental counter in the terminal.",
    stationSlug: "csmt-mumbai",
    stationLabel: "CSMT",
    stationFacts: "Chhatrapati Shivaji Maharaj Terminus is this page. The forecourt and the suburban-side exits are different meeting points. Lokmanya Tilak Terminus in Kurla is named once for long-distance trains that do not use CSMT. No LTT URL.",
    suv: "A Mumbai SUV ask is usually bags and a group for the Pune expressway or Lonavala. Seats and luggage only. No model grid.",
    monthly: "Mumbai month-scale hire is a real separate job from a daily, for someone posted to the city. No monthly rupee plan is published.",
    routes: [
      {
        slug: "pune",
        h1: "Mumbai to Pune car rental",
        title: "Mumbai to Pune Car Rental | Arora Cars",
        primary: "Mumbai to Pune car rental",
        secondary: "Mumbai to Pune cab; Mumbai to Pune taxi",
        facts: "The car starts in Mumbai and uses the expressway. Say if it is a one-way drop or a car that stays in Pune. Weekend duration includes getting out of Mumbai, which the quote should not pretend is only expressway time.",
        cannibal: "Not the Lonavala page. The reverse pickup is the Pune-to-Mumbai page.",
        reverse: "car-rental-pune-to-mumbai",
      },
      {
        slug: "lonavala",
        h1: "Mumbai to Lonavala car rental",
        title: "Mumbai to Lonavala Car Rental | Arora Cars",
        primary: "Mumbai to Lonavala car rental",
        secondary: "Mumbai to Lonavala cab; Mumbai to Lonavala taxi",
        facts: "This is the short Ghats trip from Mumbai, often a same-day return, sometimes a night in Lonavala or Khandala. The car starts in Mumbai.",
        cannibal: "Not the Pune-to-Lonavala page.",
      },
      {
        slug: "nashik",
        h1: "Mumbai to Nashik car rental",
        title: "Mumbai to Nashik Car Rental | Arora Cars",
        primary: "Mumbai to Nashik car rental",
        secondary: "Mumbai to Nashik cab; Mumbai to Nashik taxi",
        facts: "A longer outstation than Lonavala, used as a point-to-point hire. Do not turn it into a winery package or a vineyard tie-up.",
        cannibal: "Thinner than Mumbai to Pune. Do not copy that page.",
      },
    ],
  },
  {
    slug: "bengaluru",
    name: "Bangalore",
    city: "Bangalore",
    areas: "The URL stays Bengaluru. The words on the page say Bangalore. Indiranagar, Koramangala, Whitefield, and Electronic City are different distances from the airport. Name the pickup.",
    self: "Bangalore self-drive is the without-driver job. Outer Ring Road traffic is why the quote needs a start time, not only a date. Document rules start from the national guide. The partner can add a local condition.",
    driver: "A Bangalore driver covers a Kempegowda transfer, a tech-park day, and departures toward Mysore or Coorg. Whitefield to the airport is a long cross-city transfer.",
    airportSlug: "bengaluru-airport-car-rental",
    airportTitle: "Bangalore Airport Car Rental (Kempegowda) | Arora Cars",
    airportH1: "Bangalore airport car rental",
    airportPrimary: "Bangalore airport car rental",
    airportFacts: "Kempegowda International (BLR) is north of the city. One URL. The title says Bangalore. Say whether pickup is Whitefield, Indiranagar, or Electronic City, because those drives are not the same. Confirm the current terminal split before the copy names separate doors. No airline desk of ours.",
    stationSlug: "ksr-bengaluru",
    stationLabel: "KSR Bangalore City station",
    stationFacts: "KSR Bengaluru City, still called Bangalore City or Majestic, is the only station URL. The heading says Bangalore. Yesvantpur is named once for northbound trains. Majestic is crowded, so the quote should ask which exit. No second station page.",
    suv: "A Bangalore SUV ask is usually a family weekend toward Mysore or Coorg, or a 6–7 seat airport run with bags. No model list.",
    monthly: "A Bangalore month is a project stay, distinct from a weekend self-drive. No rupee plan.",
    routes: [
      {
        slug: "mysuru",
        h1: "Bangalore to Mysore car rental",
        title: "Bangalore to Mysore Car Rental | Arora Cars",
        primary: "Bangalore to Mysore car rental",
        secondary: "Bangalore to Mysore cab; Bangalore to Mysuru taxi",
        facts: "The URL keeps mysuru. The heading says Mysore, with Mysuru in parentheses once. This is the main highway trip south, a day or a night halt. It is not the Coorg page. There is no second URL spelled Mysore.",
        cannibal: "Do not create a Bangalore-spelled duplicate of this URL.",
      },
      {
        slug: "coorg",
        h1: "Bangalore to Coorg car rental",
        title: "Bangalore to Coorg Car Rental | Arora Cars",
        primary: "Bangalore to Coorg car rental",
        secondary: "Bangalore to Coorg cab; Bangalore to Madikeri taxi",
        facts: "Coorg means Madikeri for this trip. It is a hill stay, usually more than a drop. The car is for the highway and the estate roads, not a sightseeing package.",
        cannibal: "Not Mysore and not Chikkamagaluru.",
      },
      {
        slug: "chikkamagaluru",
        h1: "Bangalore to Chikkamagaluru car rental",
        title: "Bangalore to Chikkamagaluru Car Rental | Arora Cars",
        primary: "Bangalore to Chikkamagaluru car rental",
        secondary: "Bangalore to Chikkamagaluru cab; Bangalore to Chikmagalur taxi",
        facts: "A coffee-hill trip from Bangalore. Real, and thinner than Mysore. Write the hill arrival and an overnight. Do not reuse the Coorg paragraphs.",
        cannibal: "Weaker than Mysore and Coorg. Keep the destination specific.",
      },
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    city: "Hyderabad",
    areas: "HITEC City and Gachibowli are the west work belt. Banjara Hills is a central stay. None of those is already at Shamshabad.",
    self: "Hyderabad self-drive fits a week on the Outer Ring Road. The Srisailam ghat is a poor default for a first self-drive. Send that trip to the route page and ask for a driver.",
    driver: "A Hyderabad driver is the Shamshabad run and the highway drops. HITEC City to the airport crosses the city.",
    airportSlug: "hyderabad-airport-car-rental",
    airportTitle: "Hyderabad Airport Car Rental (RGIA Shamshabad) | Arora Cars",
    airportH1: "Hyderabad airport car rental",
    airportPrimary: "Hyderabad airport car rental",
    airportFacts: "Rajiv Gandhi International (HYD) is at Shamshabad, south of the city. One URL. A HITEC City pickup, a Secunderabad pickup, and an old-city pickup are different drives. Confirm terminal names before splitting domestic and international doors. No terminal counter.",
    stationSlug: "secunderabad",
    stationLabel: "Secunderabad Junction",
    stationFacts: "Secunderabad Junction is the long-distance station for this page. Nampally, also called Hyderabad Deccan, is named once. No Nampally URL.",
    suv: "A Hyderabad SUV ask is a family highway trip, especially toward Srisailam or Vijayawada. Seats and bags only.",
    monthly: "A month in Hyderabad is a west-city project. It is not a one-day HITEC City booking stretched on a calendar.",
    routes: [
      {
        slug: "warangal",
        h1: "Hyderabad to Warangal car rental",
        title: "Hyderabad to Warangal Car Rental | Arora Cars",
        primary: "Hyderabad to Warangal car rental",
        secondary: "Hyderabad to Warangal cab; Hyderabad to Warangal taxi",
        facts: "The shorter highway hop of the Hyderabad routes. A day trip or a simple drop, not a pilgrimage page.",
        cannibal: "Not Vijayawada and not Srisailam.",
      },
      {
        slug: "vijayawada",
        h1: "Hyderabad to Vijayawada car rental",
        title: "Hyderabad to Vijayawada Car Rental | Arora Cars",
        primary: "Hyderabad to Vijayawada car rental",
        secondary: "Hyderabad to Vijayawada cab; Hyderabad to Vijayawada taxi",
        facts: "The longer east highway trip. An intercity drop or an overnight, not a city rental.",
        cannibal: "Not the Warangal page.",
      },
      {
        slug: "srisailam",
        h1: "Hyderabad to Srisailam car rental",
        title: "Hyderabad to Srisailam Car Rental | Arora Cars",
        primary: "Hyderabad to Srisailam car rental",
        secondary: "Hyderabad to Srisailam cab; Hyderabad to Srisailam taxi",
        facts: "Lead with a driver. The trip leaves the highway for the Nallamala ghat toward the temple. Do not sell darshan slots, tonsure, or temple tickets. Self-drive is only something the partner can confirm. Any private-vehicle limit on the last stretch is checked before it is stated as a rule.",
        cannibal: "A pilgrimage transfer, not the Hyderabad hub and not Warangal.",
      },
    ],
  },
  {
    slug: "pune",
    name: "Pune",
    city: "Pune",
    areas: "Shivajinagar, Kothrud, Hinjawadi, and Viman Nagar are the pickups. The airport is on the east side. Hinjawadi is a cross-city drive, not a Viman Nagar hop.",
    self: "Pune self-drive is used for a Hinjawadi week or for a renter driving the expressway or the Mahabaleshwar ghat. The quote should say which.",
    driver: "A Pune driver is the easier option for a first Mahabaleshwar trip and for guests who land and leave the same day for Lonavala.",
    airportSlug: "pune-airport-car-rental",
    airportTitle: "Pune Airport Car Rental (PNQ Lohegaon) | Arora Cars",
    airportH1: "Pune airport car rental",
    airportPrimary: "Pune airport car rental",
    airportFacts: "Pune Airport (PNQ) is at Lohegaon, inside the eastern city. Viman Nagar is adjacent. Hinjawadi is the long transfer. One URL. Confirm the terminal doors before describing them. No rental counter.",
    stationSlug: "pune",
    stationLabel: "Pune Junction",
    stationFacts: "Pune Junction is the only station URL. Ask which exit. Do not add a Shivajinagar station page.",
    suv: "A Pune SUV ask is the family trip toward Mumbai or Mahabaleshwar. Seats and the ghat, not a model grid.",
    monthly: "A monthly Pune car is typically a Hinjawadi or Kharadi project, not a weekend Lonavala hire.",
    routes: [
      {
        slug: "mumbai",
        h1: "Pune to Mumbai car rental",
        title: "Pune to Mumbai Car Rental | Arora Cars",
        primary: "Pune to Mumbai car rental",
        secondary: "Pune to Mumbai cab; Pune to Mumbai taxi",
        facts: "The car starts in Pune and uses the expressway. Say if the drop is a Mumbai address or a CSMIA flight. City-entry time is part of the quote, not only the expressway.",
        cannibal: "Reverse of the Mumbai-to-Pune page.",
        reverse: "car-rental-mumbai-to-pune",
      },
      {
        slug: "lonavala",
        h1: "Pune to Lonavala car rental",
        title: "Pune to Lonavala Car Rental | Arora Cars",
        primary: "Pune to Lonavala car rental",
        secondary: "Pune to Lonavala cab; Pune to Lonavala taxi",
        facts: "From Pune, Lonavala is the nearer hill and is often back the same day. The car starts in Pune, not Mumbai.",
        cannibal: "Not the Mumbai-to-Lonavala page.",
      },
      {
        slug: "mahabaleshwar",
        h1: "Pune to Mahabaleshwar car rental",
        title: "Pune to Mahabaleshwar Car Rental | Arora Cars",
        primary: "Pune to Mahabaleshwar car rental",
        secondary: "Pune to Mahabaleshwar cab; Pune to Mahabaleshwar taxi",
        facts: "The longer hill stay via Wai, not a Lonavala clone. Ghat driving and an overnight are the normal shape. No hotel package. Any monsoon limit stays off the page until it is checked.",
        cannibal: "Not the Lonavala page.",
      },
    ],
  },
  {
    slug: "chennai",
    name: "Chennai",
    city: "Chennai",
    areas: "T. Nagar, Anna Nagar, and OMR are the city pickups. The airport at Meenambakkam is a different point from an OMR office.",
    self: "Chennai self-drive suits an OMR week or a renter who wants the East Coast Road. Documents stay on the national guide. The partner confirms any local condition.",
    driver: "A Chennai driver is the usual airport, Central, and first-time ECR trip. Keep temple-tour language off this page.",
    airportSlug: "chennai-airport-car-rental",
    airportTitle: "Chennai Airport Car Rental (MAA) | Arora Cars",
    airportH1: "Chennai airport car rental",
    airportPrimary: "Chennai airport car rental",
    airportFacts: "Chennai International (MAA) is at Meenambakkam / Tirusulam. One URL. Name separate domestic and international kerbs only if that split is still true. No terminal counter.",
    stationSlug: "chennai-central",
    stationLabel: "MGR Chennai Central",
    stationFacts: "MGR Chennai Central is this page. Egmore is named once for trains that end there. No Egmore URL. Exit names go in the quote only after they are confirmed.",
    suv: "A Chennai SUV ask is a family East Coast Road trip or a group airport arrival. Seats and bags, not a model list.",
    monthly: "A monthly Chennai car is usually an OMR or Guindy work stay, not a weekend in Pondicherry.",
    routes: [
      {
        slug: "mahabalipuram",
        h1: "Chennai to Mahabalipuram car rental",
        title: "Chennai to Mahabalipuram Car Rental | Arora Cars",
        primary: "Chennai to Mahabalipuram car rental",
        secondary: "Chennai to Mahabalipuram cab; Chennai to Mahabalipuram taxi",
        facts: "The short East Coast Road trip, often a half day or a same-day return. The shore is context for the drive. This page does not sell monument tickets.",
        cannibal: "Not the Pondicherry page. Mahabalipuram can be a stop on that longer drive, but this URL is the short trip.",
      },
      {
        slug: "puducherry",
        h1: "Chennai to Pondicherry car rental",
        title: "Chennai to Pondicherry Car Rental | Arora Cars",
        primary: "Chennai to Pondicherry car rental",
        secondary: "Chennai to Pondicherry cab; Chennai to Puducherry taxi",
        facts: "The URL stays puducherry. The heading says Pondicherry, with Puducherry in parentheses once. This is the longer East Coast Road drive, often with a night there. Use the coast road as the default only if it is still the usual rental routing. No second spelling URL.",
        cannibal: "Do not create a Pondicherry-spelled duplicate.",
      },
      {
        slug: "vellore",
        h1: "Chennai to Vellore car rental",
        title: "Chennai to Vellore Car Rental | Arora Cars",
        primary: "Chennai to Vellore car rental",
        secondary: "Chennai to Vellore cab; Chennai to Vellore taxi",
        facts: "An inland highway drop. Weaker as tourism than Mahabalipuram. Write a point-to-point hire. Do not invent a hospital or fort package, and do not turn this into Tirupati.",
        cannibal: "Tirupati is not this URL.",
      },
    ],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    city: "Kolkata",
    areas: "Park Street is central Kolkata. Salt Lake and New Town are east. Howrah is across the Hooghly. The quote has to say which side.",
    self: "Kolkata self-drive is for someone who knows the city. A first Darjeeling trip should be asked as a driver job, not sold as an easy self-drive.",
    driver: "A Kolkata driver is the Dum Dum run, a Howrah arrival, and the beach or hill departure. Park Street to Howrah crosses the river.",
    airportSlug: "kolkata-airport-car-rental",
    airportTitle: "Kolkata Airport Car Rental (CCU Dum Dum) | Arora Cars",
    airportH1: "Kolkata airport car rental",
    airportPrimary: "Kolkata airport car rental",
    airportFacts: "Netaji Subhas Chandra Bose International (CCU) is at Dum Dum, north of the centre. Salt Lake and New Town are closer than Howrah or south Kolkata. One URL. No terminal counter.",
    stationSlug: "howrah",
    stationLabel: "Howrah Junction",
    stationFacts: "Howrah Junction is the only station URL. The forecourt is the meeting point, and it is not a Park Street pickup. Sealdah is named once as the other terminus. No Sealdah URL.",
    suv: "A Kolkata SUV ask is a family run toward Digha or a Darjeeling departure with luggage. The hill route has its own page.",
    monthly: "A monthly Kolkata car is a Salt Lake or New Town stay. Keep it practical. No monthly rate.",
    routes: [
      {
        slug: "digha",
        h1: "Kolkata to Digha car rental",
        title: "Kolkata to Digha Car Rental | Arora Cars",
        primary: "Kolkata to Digha car rental",
        secondary: "Kolkata to Digha cab; Kolkata to Digha taxi",
        facts: "The beach trip. Usually a day or one night on the plains. Not a hill page.",
        cannibal: "Not Shantiniketan and not Darjeeling.",
      },
      {
        slug: "shantiniketan",
        h1: "Kolkata to Shantiniketan car rental",
        title: "Kolkata to Shantiniketan Car Rental | Arora Cars",
        primary: "Kolkata to Shantiniketan car rental",
        secondary: "Kolkata to Shantiniketan cab; Kolkata to Shantiniketan taxi",
        facts: "A shorter cultural outstation. A day or an overnight. Do not invent a campus tour.",
        cannibal: "Thinner than Digha and Darjeeling.",
      },
      {
        slug: "darjeeling",
        h1: "Kolkata to Darjeeling car rental",
        title: "Kolkata to Darjeeling Car Rental | Arora Cars",
        primary: "Kolkata to Darjeeling car rental",
        secondary: "Kolkata to Darjeeling cab; Kolkata to Darjeeling taxi",
        facts: "A multi-day hill transfer, not a day return. The car usually stays overnight. The hill section is a driver job unless the partner confirms self-drive. No tea-estate package and no invented hill permit.",
        cannibal: "Not Digha, and not a Dehradun hill route.",
      },
    ],
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    city: "Ahmedabad",
    areas: "SG Highway, Satellite, and Navrangpura are the city pickups. Kalupur station and the airport are different curbs.",
    self: "Ahmedabad self-drive fits SG Highway or a highway day you will drive. Ask before assuming self-drive is right for the Mount Abu hill.",
    driver: "A driver is the straightforward Ahmedabad ask for a long Kevadia day and for the Rajasthan border trips.",
    airportSlug: "ahmedabad-airport-car-rental",
    airportTitle: "Ahmedabad Airport Car Rental (SVPI) | Arora Cars",
    airportH1: "Ahmedabad airport car rental",
    airportPrimary: "Ahmedabad airport car rental",
    airportFacts: "Sardar Vallabhbhai Patel International (AMD). One URL. Say whether the pickup is on SG Highway or the east side. No terminal counter.",
    stationSlug: "ahmedabad",
    stationLabel: "Ahmedabad Junction",
    stationFacts: "Ahmedabad Junction at Kalupur is the only station URL. Ask for the exit. Do not add a Maninagar page.",
    suv: "An Ahmedabad SUV ask is a family trip toward Mount Abu or Udaipur. Seats and the state border, not a model list.",
    monthly: "A monthly Ahmedabad car is a local work month. No rate card.",
    routes: [
      {
        slug: "kevadia",
        h1: "Ahmedabad to Kevadia car rental",
        title: "Ahmedabad to Kevadia Car Rental | Arora Cars",
        primary: "Ahmedabad to Kevadia car rental",
        secondary: "Ahmedabad to Kevadia cab; Ahmedabad to Ekta Nagar taxi",
        facts: "The Statue of Unity trip, a long day or an overnight. Travellers also say Ekta Nagar. This is still one URL. Do not sell a monument ticket or a viewing slot.",
        cannibal: "Not Mount Abu.",
      },
      {
        slug: "mount-abu",
        h1: "Ahmedabad to Mount Abu car rental",
        title: "Ahmedabad to Mount Abu Car Rental | Arora Cars",
        primary: "Ahmedabad to Mount Abu car rental",
        secondary: "Ahmedabad to Mount Abu cab; Ahmedabad to Mount Abu taxi",
        facts: "A hill station across the Rajasthan border. The hill road is the point. Any permit or ghat limit is confirmed by the partner in the quote. It is not printed here as included, and no fee is invented.",
        cannibal: "Not the Udaipur page and not a Dehradun hill page.",
      },
      {
        slug: "udaipur",
        h1: "Ahmedabad to Udaipur car rental",
        title: "Ahmedabad to Udaipur Car Rental | Arora Cars",
        primary: "Ahmedabad to Udaipur car rental",
        secondary: "Ahmedabad to Udaipur cab; Ahmedabad to Udaipur taxi",
        facts: "The long intercity hire, a drop or several days. The border is mentioned only so the quote can ask what paperwork the partner needs. No permit fee on this page.",
        cannibal: "Not the Jaipur-to-Udaipur page. The origin is Ahmedabad.",
      },
    ],
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    city: "Jaipur",
    areas: "MI Road and C-Scheme are the hotel belt. Amer is a sightseeing drop, not an office. The airport and the junction are different arrivals.",
    self: "Jaipur self-drive is for the highway. A first fort day is usually a driver. Say which one the quote is.",
    driver: "The main Jaipur product is a driver for the forts or for guests moving between a hotel and a venue. No palace-ticket bundle.",
    airportSlug: "jaipur-airport-car-rental",
    airportTitle: "Jaipur Airport Car Rental (JAI) | Arora Cars",
    airportH1: "Jaipur airport car rental",
    airportPrimary: "Jaipur airport car rental",
    airportFacts: "Jaipur International (JAI) is on the edge of the city. A hotel on MI Road and a venue toward Amer are different transfers. One URL. No terminal counter.",
    stationSlug: "jaipur",
    stationLabel: "Jaipur Junction",
    stationFacts: "Jaipur Junction is the only station URL. It is a different pickup from the airport. Ask for the exit.",
    suv: "A Jaipur SUV or Innova-class note means seats for guests or a family highway trip. It does not mean that model is in stock, and it does not mean a decorated car.",
    monthly: "A monthly Jaipur car is a work month or a long family stay. It is thinner than a wedding week. No rate card.",
    routes: [
      {
        slug: "agra",
        h1: "Jaipur to Agra car rental",
        title: "Jaipur to Agra Car Rental | Arora Cars",
        primary: "Jaipur to Agra car rental",
        secondary: "Jaipur to Agra cab; Jaipur to Agra taxi",
        facts: "The car starts in Jaipur. This is not the Delhi-to-Agra page. Fatehpur Sikri is mentioned only if the renter asks. Do not build a circuit package or sell a Taj ticket.",
        cannibal: "Not the Delhi-to-Agra page.",
      },
      {
        slug: "delhi",
        h1: "Jaipur to Delhi car rental",
        title: "Jaipur to Delhi Car Rental | Arora Cars",
        primary: "Jaipur to Delhi car rental",
        secondary: "Jaipur to Delhi cab; Jaipur to Delhi taxi",
        facts: "NH48 from Jaipur. A drop at a Delhi hotel or at IGI. The car starts in Jaipur.",
        cannibal: "Reverse of the Delhi-to-Jaipur page.",
        reverse: "car-rental-delhi-to-jaipur",
      },
      {
        slug: "udaipur",
        h1: "Jaipur to Udaipur car rental",
        title: "Jaipur to Udaipur Car Rental | Arora Cars",
        primary: "Jaipur to Udaipur car rental",
        secondary: "Jaipur to Udaipur cab; Jaipur to Udaipur taxi",
        facts: "The long road south. Usually a full day or an overnight, not a fort morning in Jaipur.",
        cannibal: "Not the Ahmedabad-to-Udaipur page.",
      },
    ],
  },
  {
    slug: "goa",
    name: "Goa",
    city: "Goa",
    areas: "Panaji, Calangute, and Candolim are the north belt. Margao and Palolem are the south. A cross-coast move is a long transfer.",
    self: "A self-drive car in Goa is for renters who do not want a scooter, usually for NH66 between coasts or an airport arrival with luggage. Scooter licence talk stays off this page.",
    driver: "A Goa driver is the product for airport luggage, a wedding transfer, and Dudhsagar. Short beach hops are a different request.",
    airportSlug: "goa-airport-car-rental",
    airportTitle: "Goa Airport Car Rental (Mopa and Dabolim) | Arora Cars",
    airportH1: "Goa airport car rental",
    airportPrimary: "Goa airport car rental",
    airportFacts: "One URL for both airports. Manohar International (GOX) at Mopa is the north airport, closer to Panaji, Calangute, and Candolim. Dabolim (GOI) is closer to Vasco, Margao, and the south. The quote must say which airport. Do not assign an airline to either airport in the copy. Do not create a Mopa-only URL. No terminal counter.",
    stationSlug: "madgaon",
    stationLabel: "Madgaon station",
    stationFacts: "Madgaon, in Margao, is the main Konkan Railway station and the only station URL. Thivim is named once because many north-coast trains stop there. A Madgaon arrival going to Calangute is a long northbound transfer.",
    suv: "A Goa SUV ask is a group with luggage on NH66 or a wedding transfer. It is not a substitute for a scooter. Seats and bags only.",
    monthly: "A monthly car in Goa is a long stay, thinner than a metro subscription. No winter rate is published.",
    routes: [
      {
        slug: "north-goa-to-south-goa",
        h1: "North Goa to South Goa car rental",
        title: "North Goa to South Goa Car Rental | Arora Cars",
        primary: "North Goa to South Goa car rental",
        secondary: "Calangute to Palolem cab; Panaji to Margao taxi",
        facts: "This URL is the in-state move, for example Calangute or Panaji to Palolem or Margao. Name the pair in the quote. It is not an airport page and not a second Goa homepage. Open on the cross-Goa transfer.",
        cannibal: "Overlaps the Goa hub if the copy becomes a second homepage.",
      },
      {
        slug: "gokarna",
        h1: "Goa to Gokarna car rental",
        title: "Goa to Gokarna Car Rental | Arora Cars",
        primary: "Goa to Gokarna car rental",
        secondary: "Goa to Gokarna cab; Goa to Gokarna taxi",
        facts: "A coastal outstation into Karnataka, usually from south Goa. The state border is mentioned only so the partner can confirm paperwork. No beach-camp package and no invented border fee.",
        cannibal: "Not the North Goa to South Goa page.",
      },
      {
        slug: "dudhsagar",
        h1: "Goa to Dudhsagar car rental",
        title: "Goa to Dudhsagar Car Rental | Arora Cars",
        primary: "Goa to Dudhsagar car rental",
        secondary: "Goa to Dudhsagar cab; Dudhsagar taxi",
        facts: "A day trip by car. Private cars are often stopped before the falls and a local jeep is separate. State that only after the current forest rule is checked. Do not include a jeep, a guide, or an entry ticket in the quote.",
        cannibal: "Not the Goa bike page. Dudhsagar is not a scooter trip.",
      },
    ],
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    city: "Chandigarh",
    areas: "The pickup area is the Tricity: Chandigarh, Mohali, and Panchkula. Sector 17 is the centre. Do not create Mohali or Panchkula hubs.",
    self: "Chandigarh self-drive is a real hill product, especially toward Shimla. A Himachal permit is something the partner confirms with the car. This page does not say a permit is included.",
    driver: "A Chandigarh driver is the alternative for guests who flew into IXC and do not want the hill road. Rohtang and the Atal Tunnel stay on the Manali page, not here.",
    airportSlug: "chandigarh-airport-car-rental",
    airportTitle: "Chandigarh Airport Car Rental (IXC) | Arora Cars",
    airportH1: "Chandigarh airport car rental",
    airportPrimary: "Chandigarh airport car rental",
    airportFacts: "Shaheed Bhagat Singh International (IXC) serves the Tricity. Mohali and Panchkula pickups belong in the quote, not on new pages. One URL. No terminal counter.",
    stationSlug: "chandigarh",
    stationLabel: "Chandigarh Junction",
    stationFacts: "Chandigarh Junction is the only station URL. It is a different meeting point from IXC. Ask for the exit.",
    suv: "A Chandigarh SUV ask is the hill departure with luggage. Shimla and Manali have their own pages for the drive itself.",
    monthly: "A monthly Chandigarh car is a Tricity work month. It is thinner than the hill routes. No rate.",
    routes: [
      {
        slug: "shimla",
        h1: "Chandigarh to Shimla car rental",
        title: "Chandigarh to Shimla Car Rental | Arora Cars",
        primary: "Chandigarh to Shimla car rental",
        secondary: "Chandigarh to Shimla cab; Chandigarh to Shimla taxi",
        facts: "The main hill hop, via Kalka and the climb after Parwanoo. Often a day each way or one night. Self-drive and a driver are both plausible. The partner confirms Himachal paperwork in the quote. No cab fare is copied onto this page.",
        cannibal: "Not Chandigarh to Manali, and not any Dehradun-to-Mussoorie URL.",
      },
      {
        slug: "manali",
        h1: "Chandigarh to Manali car rental",
        title: "Chandigarh to Manali Car Rental | Arora Cars",
        primary: "Chandigarh to Manali car rental",
        secondary: "Chandigarh to Manali cab; Chandigarh to Manali taxi",
        facts: "Longer than Shimla, and usually more than one day. The page ends at Manali. Do not promise Rohtang Pass or Atal Tunnel access. Travel past Manali is only if the partner confirms the car and the permit.",
        cannibal: "Not the Shimla page. A Delhi-to-Manali page is not part of this wave.",
      },
      {
        slug: "amritsar",
        h1: "Chandigarh to Amritsar car rental",
        title: "Chandigarh to Amritsar Car Rental | Arora Cars",
        primary: "Chandigarh to Amritsar car rental",
        secondary: "Chandigarh to Amritsar cab; Chandigarh to Amritsar taxi",
        facts: "A plains trip, often toward the Golden Temple. No hill copy. A drop or a same-day return. Do not sell a darshan package.",
        cannibal: "Do not reuse the Shimla paragraphs.",
      },
    ],
  },
];

function hub(slug: string) {
  return `car-rental-${slug}`;
}
function self(slug: string) {
  return `self-drive-car-rental-${slug}`;
}
function driver(slug: string) {
  return `chauffeur-driven-car-rental-${slug}`;
}
function suv(slug: string) {
  return `suv-rental-${slug}`;
}
function monthly(slug: string) {
  return `monthly-car-rental-${slug}`;
}
function station(slug: string) {
  return `car-rental-near-${slug}-railway-station`;
}
function routeUrl(city: string, route: string) {
  if (route === "north-goa-to-south-goa") return "car-rental-north-goa-to-south-goa";
  return `car-rental-${city}-to-${route}`;
}

function page(
  partial: Omit<LandingPage, "badge" | "heroImage" | "primaryCta" | "secondaryCta"> &
    Partial<Pick<LandingPage, "primaryCta" | "secondaryCta" | "submitLabel">>
): LandingPage {
  return {
    badge: "Quote · Local partners",
    heroImage: "",
    primaryCta: "Request a Quote",
    secondaryCta: CHECK,
    ...partial,
  };
}

function never(job: string) {
  return `Nothing on this page is a reserved car. ${job} No fleet size, no price, no deposit, no supplier name, no review, and no local office. A Dehradun vehicle is not assigned to this enquiry. ${PROCESS}`;
}

function buildCity(c: CitySpec): LandingPage[] {
  const routes = c.routes.map((r) => routeUrl(c.slug, r.slug));
  const airport = c.airportSlug;
  const stationSlug = station(c.stationSlug);
  const pages: LandingPage[] = [
    page({
      slug: self(c.slug),
      type: "category",
      title: `Self-Drive Car Rental in ${c.name} | Arora Cars`,
      h1: `Self-drive car rental in ${c.name}`,
      description: `Self-drive car rental in ${c.name}. You take the keys. Request a quote. No fleet, deposit, or price is listed.`,
      primaryKeyword: `self drive car rental ${c.name}`,
      secondaryKeywords: [`self drive cars ${c.name}`, `car rental without driver ${c.name}`],
      enquiryCity: c.city,
      intro: `This page is the without-driver enquiry for ${c.name}. It is not the city hub, and it is not a Dehradun car.`,
      faqs: [
        { q: "Who drives?", a: `You do. Say so in the quote. A driver is a different page.` },
        { q: "What documents are certain on this page?", a: "None as a local rule. The national guide is a baseline. The partner can add a condition. No deposit figure is published." },
        { q: "Is a car available today?", a: "Not from this page. Availability is a partner check after the city, dates, and pickup are sent." },
        { q: "Can this be an airport collection?", a: "Mention it, then use the airport page for the terminal detail." },
      ],
      sections: [
        { heading: `Driving yourself in ${c.name}`, body: c.self },
        { heading: "Where the car starts", body: c.areas },
        {
          heading: "Documents without a made-up deposit",
          body: `Read [the document guide](/documents-required-self-drive) as a baseline only. [Insurance](/insurance-info) explains cover in general. Figures on those Dehradun pages are not a ${c.name} deposit or excess.`,
        },
        { heading: "What this quote does not lock", body: never("The keys are the product.") },
      ],
      relatedSlugs: [hub(c.slug), monthly(c.slug), suv(c.slug), driver(c.slug), "documents-required-self-drive", "insurance-info", "how-to-book"],
    }),
    page({
      slug: driver(c.slug),
      type: "category",
      title: `Car Rental with Driver in ${c.name} | Arora Cars`,
      h1: `Car rental with driver in ${c.name}`,
      description: `Car rental with driver in ${c.name} for a city day, an airport, or an outstation. Request a quote. No chauffeur is named and no fare is listed.`,
      primaryKeyword: `car rental with driver ${c.name}`,
      secondaryKeywords: [`chauffeur driven car ${c.name}`, `cab with driver ${c.name}`],
      enquiryCity: c.city,
      intro: `This page is the with-driver enquiry for ${c.name}. It is not a second homepage.`,
      faqs: [
        { q: "How is a local day different from an outstation?", a: "A local day stays in the city. An outstation names a destination. Say which, because the quote changes." },
        { q: "What does an airport pickup need?", a: "The airport page has the terminal detail. This page needs you to say that a driver is required." },
        { q: "Is a driver assigned on this page?", a: "No. No chauffeur is named, and no car is reserved." },
        { q: "Are overnight trips possible?", a: "Ask in the quote. Nothing here promises a night halt is included." },
      ],
      sections: [
        { heading: `When ${c.name} needs a driver`, body: c.driver },
        { heading: "Pickup, not a tour package", body: `${c.areas} Airport detail stays on [${c.airportH1}](/${airport}). Station detail stays on [the station page](/${stationSlug}).` },
        { heading: "Outstation from here", body: `The named trips are ${routes.map((slug, i) => `[${c.routes[i].h1}](/${slug})`).join(", ")}. Open the one that matches the destination.` },
        { heading: "What a driver quote does not include", body: never("No uniform, training claim, or named driver.") },
      ],
      relatedSlugs: [hub(c.slug), airport, stationSlug, ...routes, "how-to-book", "contact-book-now"],
    }),
    page({
      slug: airport,
      type: "route",
      title: c.airportTitle,
      h1: c.airportH1,
      description: `${c.airportH1}. The quote needs the terminal and the flight time. No airport counter and no fare.`,
      primaryKeyword: c.airportPrimary,
      secondaryKeywords: [`${c.name} airport pickup`, `${c.name} airport drop`],
      enquiryCity: c.city,
      intro: `This is only the airport job for ${c.name}. A city day belongs on the hub.`,
      faqs: [
        { q: "Which terminal?", a: "Send the terminal and the flight time. A terminal change is a different curb." },
        { q: "Is there a meeting counter?", a: "No. The partner confirms a meeting point outside any claim of an in-terminal desk." },
        { q: "How is this different from the railway station?", a: "Different building, different road. Use the station page for a train." },
        { q: "Does sending the form reserve a car?", a: "No. It asks a local partner to check." },
      ],
      sections: [
        { heading: "The airport, not the whole city", body: c.airportFacts },
        { heading: "What changes the drive", body: c.areas },
        { heading: "Driver for a flight", body: `Most airport asks want a driver. Say that, or say you want the keys. The with-driver page is [car rental with driver in ${c.name}](/${driver(c.slug)}).` },
        { heading: "No fare on this page", body: never("Flight tracking is not offered.") },
      ],
      relatedSlugs: [hub(c.slug), driver(c.slug), stationSlug, "how-to-book"],
    }),
    page({
      slug: stationSlug,
      type: "route",
      title: `Car Rental near ${c.stationLabel} | Arora Cars`,
      h1: `Car rental near ${c.stationLabel}`,
      description: `Car rental near ${c.stationLabel}. Send the train and the exit. No railway counter and no fare.`,
      primaryKeyword: `car rental near ${c.stationLabel}`,
      secondaryKeywords: [`${c.stationLabel} pickup`, `train station cab ${c.name}`],
      enquiryCity: c.city,
      intro: `This page is the train arrival for ${c.stationLabel}. Other stations in ${c.name} stay as a mention, not another URL.`,
      faqs: [
        { q: "Which exit?", a: "Send the train number and the exit you expect. The two sides of a large station are different meetings." },
        { q: "Is this the airport?", a: "No. Use the airport page for a flight." },
        { q: "Is there a counter on the platform?", a: "No. There is no partnership with the railway." },
        { q: "Early morning trains?", a: "Put the arrival time in the quote. Nothing here promises a car is waiting." },
      ],
      sections: [
        { heading: c.stationLabel, body: c.stationFacts },
        { heading: "Station versus hotel", body: c.areas },
        { heading: "A driver is the usual ask", body: `Say if you need a driver. [Car rental with driver in ${c.name}](/${driver(c.slug)}) is that product. The airport is [${c.airportH1}](/${airport}).` },
        { heading: "What is not included", body: never("No platform-ticket rule is stated here.") },
      ],
      relatedSlugs: [hub(c.slug), driver(c.slug), airport, "how-to-book"],
    }),
    page({
      slug: suv(c.slug),
      type: "category",
      title: `SUV Rental in ${c.name} | Arora Cars`,
      h1: `SUV rental in ${c.name}`,
      description: `SUV rental in ${c.name} for seats and luggage. Request a quote. No model is listed as available.`,
      primaryKeyword: `SUV rental ${c.name}`,
      secondaryKeywords: [`SUV on rent ${c.name}`, `Innova rental ${c.name}`],
      enquiryCity: c.city,
      intro: `This page is the larger-vehicle ask in ${c.name}. It is not a second city homepage.`,
      faqs: [
        { q: "When is an SUV the right ask?", a: "When the group or the luggage will not fit a sedan. Say seats and bags." },
        { q: "Does Innova mean that car is available?", a: "No. It is an example of the kind of vehicle people ask for. The partner confirms what they can offer." },
        { q: "Self-drive or driver?", a: "Say which. Both are quotes, not stock." },
        { q: "Is there a price?", a: "No price and no deposit on this page." },
      ],
      sections: [
        { heading: `The SUV job in ${c.name}`, body: c.suv },
        { heading: "Where it starts", body: c.areas },
        { heading: "Trips that often need the seats", body: `If the trip leaves the city, open the matching route: ${routes.map((slug, i) => `[${c.routes[i].h1}](/${slug})`).join(", ")}.` },
        { heading: "No model grid", body: never("A model name is not stock.") },
      ],
      relatedSlugs: [hub(c.slug), driver(c.slug), self(c.slug), routes[0], "how-to-book"],
    }),
    page({
      slug: monthly(c.slug),
      type: "category",
      title: `Monthly Car Rental in ${c.name} | Arora Cars`,
      h1: `Monthly car rental in ${c.name}`,
      description: `Monthly car rental in ${c.name}. One handover for a month, agreed in a quote. No monthly price.`,
      primaryKeyword: `monthly car rental ${c.name}`,
      secondaryKeywords: [`car subscription ${c.name}`, `long term car hire ${c.name}`],
      enquiryCity: c.city,
      primaryCta: "Request a Monthly Quote",
      submitLabel: "Request a Monthly Quote",
      intro: `This is the month-scale enquiry for ${c.name}, not a daily rental rewritten with the word month.`,
      faqs: [
        { q: "How is a month different from a daily?", a: "One handover and a kilometre plan agreed in the quote, instead of booking day by day. No number is fixed on this page." },
        { q: "Can the term be extended?", a: "Ask in the quote. An extension is not automatic." },
        { q: "Which documents?", a: "The partner says what they need. Dehradun vehicle pages do not set that list for this city." },
        { q: "Is a subscription price shown?", a: "No." },
      ],
      sections: [
        { heading: `A month in ${c.name}`, body: c.monthly },
        { heading: "Still name the neighbourhood", body: c.areas },
        {
          heading: "Not a Dehradun monthly rate",
          body: `Cancellation timing for Dehradun bookings is explained on [the cancellation guide](/cancellation-policy). That page does not price a ${c.name} month.`,
        },
        { heading: "What the monthly quote must say", body: never("No comparison table of prices.") },
      ],
      relatedSlugs: [hub(c.slug), self(c.slug), suv(c.slug), "cancellation-policy", "how-to-book"],
    }),
  ];

  for (const r of c.routes) {
    const slug = routeUrl(c.slug, r.slug);
    pages.push(
      page({
        slug,
        type: "route",
        title: r.title,
        h1: r.h1,
        description: `${r.h1}. The car starts in ${c.name}. Request a quote. No fare and no sightseeing ticket.`,
        primaryKeyword: r.primary,
        secondaryKeywords: r.secondary.split("; ").map((s) => s.trim()),
        enquiryCity: c.city,
        intro: r.cannibal,
        faqs: [
          { q: "One-way or round trip?", a: "Say which. A drop and a car that stays are different quotes." },
          { q: "Driver or self-drive?", a: `Say which. The with-driver page for the origin is separate from this route.` },
          { q: "Does this include tickets or permits?", a: "No. Tickets, monument entry, and permits are not included unless a partner writes them into a later quote." },
          { q: "Is the distance printed here?", a: "No. The partner confirms timing for your date. A number from another website is not copied here." },
        ],
        sections: [
          { heading: "This origin and this destination", body: r.facts },
          { heading: `Starting in ${c.name}`, body: c.areas },
          { heading: "Keep the pickup city straight", body: r.cannibal },
          { heading: "No fare table", body: never("No sightseeing ticket.") },
        ],
        relatedSlugs: [hub(c.slug), driver(c.slug), self(c.slug), r.reverse || "", "how-to-book"].filter(Boolean),
      })
    );
  }

  return pages;
}

const EXTRA: LandingPage[] = [
  page({
    slug: "wedding-car-rental-delhi",
    type: "category",
    title: "Wedding Car Rental in Delhi | Arora Cars",
    h1: "Wedding car rental in Delhi",
    description: "Wedding car rental in Delhi for a timed venue pickup. Request a wedding transport quote. No decorated car is in stock.",
    primaryKeyword: "wedding car rental Delhi",
    secondaryKeywords: ["wedding car hire Delhi", "baraat car Delhi"],
    enquiryCity: "Delhi",
    primaryCta: "Request a Wedding Transport Quote",
    submitLabel: "Request a Wedding Transport Quote",
    intro: "This is event transport in Delhi, not a daily hire and not a decorated-car inventory.",
    faqs: [
      { q: "What should the quote include?", a: "Date, venue area, hotel, and whether the car is for the couple, the guests, or both." },
      { q: "Is a decorated car reserved?", a: "No. Decoration is a request, not stock." },
      { q: "South Delhi or a Gurugram venue?", a: "Name it. Gurugram is a quote question, not an assumed service area." },
      { q: "Is this the SUV page?", a: "No. The SUV page is about seats. This page is the event." },
    ],
    sections: [
      { heading: "Delhi weddings are timed transfers", body: "The quote needs the venue and the hotel. A south Delhi venue, a Punjabi Bagh start, and a Gurugram venue are different drives. Baraat timing belongs in the note." },
      { heading: "Guest cars and the couple's car", body: "Say which cars are which. An SUV ask for guests belongs with the seat count, on the SUV page if you only need a larger car and not a wedding schedule." },
      { heading: "No florist and no venue partner", body: never("No decorated-car photo is presented as stock.") },
    ],
    relatedSlugs: ["car-rental-delhi", "chauffeur-driven-car-rental-delhi", "suv-rental-delhi", "how-to-book"],
  }),
  page({
    slug: "wedding-car-rental-jaipur",
    type: "category",
    title: "Wedding Car Rental in Jaipur | Arora Cars",
    h1: "Wedding car rental in Jaipur",
    description: "Wedding car rental in Jaipur between hotels and venues. Request a wedding transport quote. No palace booking and no bridal-car stock.",
    primaryKeyword: "wedding car rental Jaipur",
    secondaryKeywords: ["bridal car Jaipur", "wedding car hire Jaipur"],
    enquiryCity: "Jaipur",
    primaryCta: "Request a Wedding Transport Quote",
    submitLabel: "Request a Wedding Transport Quote",
    intro: "Jaipur wedding transport is a quote for hotel and venue movements. Amer-side venues are not a city-centre hop.",
    faqs: [
      { q: "What do you need?", a: "Hotel, venue, date, and guest count." },
      { q: "Airport guests?", a: "Use the Jaipur airport page for the flight, and say on this page that the cars are for the wedding." },
      { q: "Is a palace booked with the car?", a: "No." },
      { q: "Is a bridal car in stock?", a: "No." },
    ],
    sections: [
      { heading: "MI Road is not Amer", body: "Many stays are on MI Road or in C-Scheme. Venues toward Amer are a different transfer. Send both addresses." },
      { heading: "Guest flights", body: "Guest airport pickups are described on [Jaipur airport car rental](/jaipur-airport-car-rental). This page keeps the wedding schedule." },
      { heading: "No palace partnership", body: never("No bridal car is listed as available.") },
    ],
    relatedSlugs: ["car-rental-jaipur", "chauffeur-driven-car-rental-jaipur", "suv-rental-jaipur", "jaipur-airport-car-rental", "how-to-book"],
  }),
  page({
    slug: "wedding-car-rental-goa",
    type: "category",
    title: "Wedding Car Rental in Goa | Arora Cars",
    h1: "Wedding car rental in Goa",
    description: "Wedding car rental in Goa for hotel and venue transfers. Say which coast and which airport. No resort partnership.",
    primaryKeyword: "wedding car rental Goa",
    secondaryKeywords: ["destination wedding car Goa"],
    enquiryCity: "Goa",
    primaryCta: "Request a Wedding Transport Quote",
    submitLabel: "Request a Wedding Transport Quote",
    intro: "Goa wedding cars move people between a hotel and a venue, often with luggage and often from one of two airports.",
    faqs: [
      { q: "Which airport?", a: "Mopa or Dabolim. The airport page explains the split. This page needs the guest list timing." },
      { q: "North venue and south hotel?", a: "That is a long transfer. Name both ends." },
      { q: "How many cars?", a: "Say how many you want quoted. None are reserved here." },
      { q: "Decorated cars?", a: "A request only. Not stock." },
    ],
    sections: [
      { heading: "Coast first", body: "A north-coast hotel and a south-coast venue are not a short hop. Name the beaches or towns." },
      { heading: "Flights", body: "Guests may land at Mopa or Dabolim. [Goa airport car rental](/goa-airport-car-rental) is the one page for both. Do not expect a resort to be a partner of this page." },
      { heading: "Not the scooter page", body: never("Wedding transfers are cars, not bikes.") },
    ],
    relatedSlugs: ["car-rental-goa", "chauffeur-driven-car-rental-goa", "goa-airport-car-rental", "suv-rental-goa", "how-to-book"],
  }),
  page({
    slug: "bike-rental-goa",
    type: "category",
    title: "Bike and Scooter Rental in Goa | Arora Cars",
    h1: "Bike and scooter rental in Goa",
    description: "Bike and scooter rental in Goa for short coastal hops. Check availability with local partners. No scooter price and no Dudhsagar ride.",
    primaryKeyword: "bike rental Goa",
    secondaryKeywords: ["scooter rental Goa", "Activa on rent Goa"],
    enquiryCity: "Goa",
    primaryCta: "Check Scooter Availability with Local Partners",
    secondaryCta: "Request a Quote",
    submitLabel: "Request a Quote",
    intro: "This page is a scooter or motorcycle for beach distances in Goa. It is not a car, and it is not a Dehradun two-wheeler.",
    faqs: [
      { q: "Scooter or motorcycle?", a: "Say which. Activa is an example of the ask, not a listed unit." },
      { q: "Where can it be delivered?", a: "Name the north-coast or south-coast stay. They are different deliveries." },
      { q: "What licence and deposit?", a: "The partner confirms both. No number and no licence class are published here." },
      { q: "Can I ride to Dudhsagar?", a: "No. That trip is a car page, not this one." },
    ],
    sections: [
      { heading: "Where a scooter is the right tool", body: "Calangute, Baga, Anjuna, and Panaji are the usual north-coast hops. A south-coast stay is a different delivery. Once the trip is an airport with luggage or a cross-Goa move, ask for a car instead." },
      { heading: "Not Dudhsagar", body: "The falls are on [Goa to Dudhsagar car rental](/car-rental-goa-to-dudhsagar). Do not describe a scooter route there." },
      {
        heading: "Documents without a Goa deposit figure",
        body: "[The document guide](/documents-required-self-drive) is a general ID note. Goa two-wheeler conditions are confirmed by the partner. Do not treat a Dehradun bike page as this fleet.",
      },
      { heading: "No daily scooter price", body: never("No helmet rule is stated unless it has been checked for this page, and it has not been added as a claim.") },
    ],
    relatedSlugs: ["car-rental-goa", "self-drive-car-rental-goa", "car-rental-goa-to-dudhsagar", "documents-required-self-drive", "how-to-book"],
  }),
];

export const WAVE1_PAGES: LandingPage[] = [...CITIES.flatMap(buildCity), ...EXTRA];

const HUB_RELATED: Record<string, string[]> = {};
for (const c of CITIES) {
  const extra =
    c.slug === "delhi"
      ? ["wedding-car-rental-delhi"]
      : c.slug === "jaipur"
        ? ["wedding-car-rental-jaipur"]
        : c.slug === "goa"
          ? ["wedding-car-rental-goa", "bike-rental-goa"]
          : [];
  HUB_RELATED[hub(c.slug)] = [
    self(c.slug),
    driver(c.slug),
    c.airportSlug,
    station(c.stationSlug),
    suv(c.slug),
    monthly(c.slug),
    ...c.routes.map((r) => routeUrl(c.slug, r.slug)),
    ...extra,
    "how-to-book",
    "contact-book-now",
    "faq",
  ];
}
for (const hubPage of WAVE1_CITY_HUBS) {
  if (HUB_RELATED[hubPage.slug]) hubPage.relatedSlugs = HUB_RELATED[hubPage.slug];
}

export const WAVE1_PAGE_SLUGS = new Set(WAVE1_PAGES.map((p) => p.slug));

export function isWave1PartnerPath(path: string) {
  const slug = path.split("?")[0].replace(/\/$/, "").split("/").filter(Boolean)[0] || "";
  return WAVE1_CITY_HUB_SLUGS.has(slug) || WAVE1_PAGE_SLUGS.has(slug);
}
