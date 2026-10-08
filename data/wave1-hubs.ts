import type { LandingPage } from "./pages";

const quoteLinks =
  "A quote is confirmed on [how a quote is confirmed](/how-to-book). The phone desk is [contact](/contact-book-now). [Which rules apply only in Dehradun](/faq) explains that the Dehradun fleet and its prices are not this page.";

export const WAVE1_CITY_HUBS: LandingPage[] = [
  {
    slug: "car-rental-delhi",
    type: "category",
    title: "Car Rental in Delhi | Arora Cars",
    h1: "Car rental in Delhi",
    description:
      "Car rental in Delhi for a city day, IGI airport, New Delhi station, or a trip toward Agra, Jaipur, or Chandigarh. Request a quote. No Delhi fleet is listed here.",
    primaryKeyword: "car rental Delhi",
    secondaryKeywords: ["car hire Delhi", "rent a car Delhi", "cab rental Delhi"],
    badge: "Quote · Local partners",
    enquiryCity: "Delhi",
    heroImage: "",
    intro:
      "This page is a Delhi rental enquiry, not a garage in the city and not a car from the Dehradun fleet. Use it when you need a car in Delhi and you have not yet chosen self-drive or a driver. The quote asks which part of the city the car starts in.",
    faqs: [
      {
        q: "Which Delhi areas can be a pickup?",
        a: "Name the place in the quote. Connaught Place and Aerocity are common. Gurugram and Noida are NCR pickups the partner confirms or declines. They are not assumed.",
      },
      {
        q: "Is this self-drive or with a driver?",
        a: "Either. Say which one you want. This hub does not split them into a second booking. A driver is the usual ask for IGI and for a first trip to Agra.",
      },
      {
        q: "Do you have a car waiting in Delhi?",
        a: "No. Nothing on this page is live inventory. Availability is checked with a local rental partner after you send the city, dates, and pickup.",
      },
      {
        q: "How is an airport pickup different from a city day?",
        a: "IGI needs the terminal, T1 or T3, and the flight time. A city day needs the hotel or office and the hours. Put that in the quote. There is no Arora Cars counter in the terminal.",
      },
      {
        q: "What does this page not promise?",
        a: "No price, no deposit, no named model as available, no review score, and no Delhi office.",
      },
    ],
    sections: [
      {
        heading: "Where a Delhi car actually starts",
        body: "Connaught Place is the centre people name for a hotel or a meeting. Aerocity is the hotel belt beside Indira Gandhi International, and it is a different drive from CP even though both are 'Delhi'. A south Delhi guest house and a departure from Aerocity should not be written as the same pickup. If the car must start in Gurugram or Noida, say so. That is an NCR question for the partner, not a promise that every Delhi booking covers the suburbs.",
      },
      {
        heading: "City day, airport, or a highway out of Delhi",
        body: "A Delhi day is hours inside the city. An IGI transfer is Terminal 1 or Terminal 3 plus a flight time. Those terminals are different meeting points. New Delhi Railway Station (NDLS) is the main train arrival. Hazrat Nizamuddin is the other long-distance railhead for many southbound trains. Say which station, and which side of NDLS, because Ajmeri Gate and Paharganj are not the same curb. Outstation from Delhi on this hub means Agra on the Yamuna Expressway, Jaipur on NH48, or Chandigarh on the plains highway. Those are different trips. Chandigarh is where a later hill drive would start. It is not part of the Delhi day.",
      },
      {
        heading: "Driver or keys",
        body: "Say in the quote if you want to drive or if you want a chauffeur. Delhi self-drive is the job where you handle the city or the highway yourself. A driver is the usual request for a terminal pickup, a full day of meetings, or a first run to the Taj. This page does not pretend both products are the same car with a different label.",
      },
      {
        heading: "What the quote will and will not lock",
        body: `Send the rental city as Delhi, the pickup, the dates, and whether you need a driver. The reply is a partner quote. It is not a confirmed car, and it is not a rate copied from another site. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-mumbai",
    type: "category",
    title: "Car Rental in Mumbai | Arora Cars",
    h1: "Car rental in Mumbai",
    description:
      "Car rental in Mumbai for South Mumbai, Bandra, Andheri, CSMIA, or CSMT. Request a quote from local partners. No Mumbai fleet or fare is listed.",
    primaryKeyword: "car rental Mumbai",
    secondaryKeywords: ["car hire Mumbai", "rent a car Mumbai", "cab rental Mumbai"],
    badge: "Quote · Local partners",
    enquiryCity: "Mumbai",
    heroImage: "",
    intro:
      "Use this page for a car that starts in Mumbai. It is an enquiry to local rental partners. It does not offer a vehicle from Dehradun, and it does not show a Mumbai price list.",
    faqs: [
      {
        q: "Which Mumbai areas can be a pickup?",
        a: "South Mumbai, Bandra, and Andheri are the zones to name. Navi Mumbai is a separate drive. Ask for it in the quote. It is not included by default.",
      },
      {
        q: "Self-drive or with a driver?",
        a: "Tell us which. A driver is the usual choice for CSMIA and for a first trip up the Ghats. Self-drive is for someone who will handle the expressway themselves.",
      },
      {
        q: "Is a car reserved when I open this page?",
        a: "No. There is no Mumbai inventory on this site. The form asks the partner to check dates.",
      },
      {
        q: "What should an airport or station quote include?",
        a: "For CSMIA, say Terminal 1 or Terminal 2. For a train, say CSMT or Lokmanya Tilak Terminus in Kurla. They are not the same meeting point.",
      },
      {
        q: "What is not on this page?",
        a: "No fare, no deposit, no supplier name, and no airport counter.",
      },
    ],
    sections: [
      {
        heading: "South Mumbai is not Andheri",
        body: "A pickup in Colaba or Fort is a South Mumbai job. Bandra is the western suburbs. Andheri is the usual belt for the airport side of the city. Traffic between those three changes the day more than the car category does. Write the neighbourhood in the quote. If the guest is in Navi Mumbai, say Vashi, Nerul, or Panvel. That is not a South Mumbai hop, and it is not a second city page.",
      },
      {
        heading: "Airport, CSMT, and the two highways people mix up",
        body: "Chhatrapati Shivaji Maharaj International (BOM) has Terminal 1 and Terminal 2 as different kerbs. The quote needs the terminal, not only the word airport. There is no rental counter of ours inside either terminal. CSMT is the main terminus in South Mumbai. Long-distance trains that use Lokmanya Tilak Terminus start in Kurla, which is a different pickup. Leaving the city, Mumbai to Pune is the expressway. Lonavala is the short Ghats trip and is often a same-day return. Nashik is a longer outstation. Do not describe all three as one 'out of Mumbai' product.",
      },
      {
        heading: "What to ask for",
        body: "A local day is an 8-hour shape inside Greater Mumbai. An outstation quote is a different minimum because the car leaves the city. Say which one, and whether you want the keys or a driver. SUVs come up for luggage on the expressway. Name seats and bags. Do not expect a model to be marked available here.",
      },
      {
        heading: "How the Mumbai quote works",
        body: `The form on this page already sets the rental city to Mumbai. Change it if that is wrong. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-bengaluru",
    type: "category",
    title: "Car Rental in Bangalore | Arora Cars",
    h1: "Car rental in Bangalore",
    description:
      "Car rental in Bangalore (Bengaluru) for Indiranagar, Whitefield, Koramangala, Electronic City, or Kempegowda airport. Request a quote. No fleet is listed.",
    primaryKeyword: "car rental Bangalore",
    secondaryKeywords: ["car hire Bangalore", "rent a car Bangalore", "cab rental Bangalore"],
    badge: "Quote · Local partners",
    enquiryCity: "Bangalore",
    heroImage: "",
    intro:
      "The address of this page stays Bengaluru. The city people search is Bangalore. One line of both is enough: Bangalore (Bengaluru). This is a quote for a car that starts there. It is not the Dehradun fleet under another name.",
    faqs: [
      {
        q: "Do I search Bangalore or Bengaluru?",
        a: "Both names are the same city. This page targets Bangalore. The URL keeps Bengaluru so we do not publish a second spelling.",
      },
      {
        q: "Which neighbourhoods can be a pickup?",
        a: "Indiranagar, Koramangala, Whitefield, and Electronic City are the ones to name. They are not the same distance from the airport.",
      },
      {
        q: "Can I collect at Kempegowda?",
        a: "Ask for Kempegowda (BLR) in the quote and name the terminal only after you know which one your flight uses. There is no Arora Cars desk in the airport.",
      },
      {
        q: "Is a car shown as available?",
        a: "No. Bangalore availability is checked with a local partner after the quote. No rate is published here.",
      },
    ],
    sections: [
      {
        heading: "The neighbourhood changes the airport drive",
        body: "Kempegowda International sits well north of the neighbourhoods where most stays are. Whitefield is an east-side tech corridor. Indiranagar and Koramangala are inner east and south-east. Electronic City is south, past the longer run down Hosur Road. A quote that only says Bangalore hides a cross-city transfer that can dominate the trip. Name the pickup. Outer Ring Road traffic is why the start time matters as much as the date.",
      },
      {
        heading: "Station, and the trips that leave the city",
        body: "The main station for this page is KSR Bengaluru City, still called Bangalore City or Majestic. Yesvantpur is the other railhead for many northbound trains. Say which one. A city day is not a Mysore run. Mysore (Mysuru) is the main highway trip south. Coorg, meaning Madikeri, is a hill stay and usually more than a drop. Chikkamagaluru is a separate coffee-hill trip. Tell the quote which of those you mean. This hub does not open a second URL for the spelling Mysore.",
      },
      {
        heading: "Without a driver, or with one",
        body: "Self-drive is the Bangalore search for teams and visitors who want the car themselves. A driver fits a Kempegowda arrival with bags, or a first highway day toward Mysore. Monthly hire is a different job again, for someone posted to the city for weeks. Say 'month' in the note if that is the plan. No monthly price is on this page.",
      },
      {
        heading: "What we need from you",
        body: `Leave the city as Bangalore unless the trip is somewhere else. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-hyderabad",
    type: "category",
    title: "Car Rental in Hyderabad | Arora Cars",
    h1: "Car rental in Hyderabad",
    description:
      "Car rental in Hyderabad for HITEC City, Gachibowli, Banjara Hills, RGIA Shamshabad, or Secunderabad. Request a quote. No local fleet is published.",
    primaryKeyword: "car rental Hyderabad",
    secondaryKeywords: ["car hire Hyderabad", "rent a car Hyderabad", "cab rental Hyderabad"],
    badge: "Quote · Local partners",
    enquiryCity: "Hyderabad",
    heroImage: "",
    intro:
      "A Hyderabad car on this page starts in Hyderabad. The enquiry goes to a local rental partner. Cars and prices shown elsewhere on this website are the Dehradun fleet and do not travel with this request.",
    faqs: [
      {
        q: "Where can the car start?",
        a: "HITEC City, Gachibowli, and Banjara Hills are the usual zones. Shamshabad is the airport, not a west-city office pickup.",
      },
      {
        q: "Which station?",
        a: "Secunderabad Junction is the long-distance station to name. Nampally (Hyderabad Deccan) is the other city station. Say which one.",
      },
      {
        q: "Do you list Hyderabad cars or prices?",
        a: "No. The quote is a request. It does not confirm a model, a deposit, or a same-day car.",
      },
      {
        q: "Is Srisailam a city booking?",
        a: "No. Srisailam is a driver trip into the Nallamala ghat. Mention it in the notes. This hub will not sell a darshan ticket.",
      },
    ],
    sections: [
      {
        heading: "West Hyderabad and the old city are different drives",
        body: "HITEC City and Gachibowli are the west work belt. Banjara Hills is a central stay. A guest there is not already at the airport. Rajiv Gandhi International (HYD) is at Shamshabad, south of the city, so a HITEC City flight transfer crosses Hyderabad. Put the start point in the quote. Do not write only 'Hyderabad airport' if the pickup is a west-city hotel.",
      },
      {
        heading: "Trains, and three different roads out",
        body: "Secunderabad Junction is the station this enquiry should name for a long-distance train. Nampally is the other central station. They are not interchangeable. Leaving the city, Warangal is the shorter highway hop. Vijayawada is the longer road east. Srisailam leaves the highway for the ghat toward the temple. A self-drive pitch is a poor default for that last stretch. If Srisailam is the plan, ask for a driver and do not expect temple tickets in the reply.",
      },
      {
        heading: "Keys, driver, or a month",
        body: "Self-drive fits a week on the Outer Ring Road when you want the car yourself. A driver fits Shamshabad and the highway drops. A month is a project stay in the west of the city, not a cheaper one-day rate. Say which of the three the dates are for.",
      },
      {
        heading: "Sending the Hyderabad quote",
        body: `The city field should read Hyderabad. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-pune",
    type: "category",
    title: "Car Rental in Pune | Arora Cars",
    h1: "Car rental in Pune",
    description:
      "Car rental in Pune for Shivajinagar, Hinjawadi, Kothrud, Viman Nagar, or Pune airport. Request a quote. No Pune fleet or price is shown.",
    primaryKeyword: "car rental Pune",
    secondaryKeywords: ["car hire Pune", "rent a car Pune", "cab rental Pune"],
    badge: "Quote · Local partners",
    enquiryCity: "Pune",
    heroImage: "",
    intro:
      "This is the Pune hub. The car, if a partner confirms one, starts in Pune. It is not a Dehradun vehicle repositioned for the booking, and this page does not publish a rate.",
    faqs: [
      {
        q: "Which Pune pickups should I name?",
        a: "Shivajinagar, Hinjawadi, Kothrud, and Viman Nagar cover the usual requests. Hinjawadi to the airport is a cross-city transfer, not a Viman Nagar hop.",
      },
      {
        q: "Is Pune airport a long transfer?",
        a: "Pune Airport (PNQ) is at Lohegaon, inside the eastern city. Viman Nagar is adjacent. A Hinjawadi pickup is the long one. There is no terminal counter of ours.",
      },
      {
        q: "Mumbai, Lonavala, or Mahabaleshwar?",
        a: "Those are three different trips from Pune. Lonavala is the short hill. Mahabaleshwar is the longer ghat stay. Mumbai is the expressway. Say which.",
      },
      {
        q: "Will I see cars and prices?",
        a: "No. Availability is a partner check after the quote.",
      },
    ],
    sections: [
      {
        heading: "Hinjawadi and the airport are not neighbours",
        body: "Pune Airport at Lohegaon sits on the east side, with Viman Nagar beside it. Hinjawadi and the west IT belt are a cross-city drive, especially at shift-change hours. Kothrud and Shivajinagar are central-west and central stays. A quote that says only Pune forces the partner to guess the start. Name the area. A monthly car for a Hinjawadi project is a different request from a weekend that leaves for the hills the same afternoon.",
      },
      {
        heading: "The station, and the three exits people book",
        body: "Pune Junction is the train meeting point. Ask which exit. Do not assume a second station page. Out of the city, the expressway to Mumbai is one product, including a drop at a Mumbai address or a flight. Lonavala is the nearer hill and is often back the same day. Mahabaleshwar is the longer climb via Wai and is normally a night there. A first Mahabaleshwar trip is usually easier with a driver. Say if you still want the keys.",
      },
      {
        heading: "What belongs in the note",
        body: "Passengers, bags, and whether the car stays overnight. An SUV request is about seats for the Mumbai or Mahabaleshwar run, not a model we are advertising as in stock.",
      },
      {
        heading: "Pune quote",
        body: `Keep the rental city as Pune. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-chennai",
    type: "category",
    title: "Car Rental in Chennai | Arora Cars",
    h1: "Car rental in Chennai",
    description:
      "Car rental in Chennai for T. Nagar, Anna Nagar, OMR, MAA airport, or Central station. Request a quote. No Chennai fleet is listed.",
    primaryKeyword: "car rental Chennai",
    secondaryKeywords: ["car hire Chennai", "rent a car Chennai", "cab rental Chennai"],
    badge: "Quote · Local partners",
    enquiryCity: "Chennai",
    heroImage: "",
    intro:
      "A Chennai enquiry starts here. The page does not list cars, deposits, or a local office. If a partner has a car for your dates, that is confirmed after the quote, not by this page.",
    faqs: [
      {
        q: "Where do Chennai pickups usually start?",
        a: "T. Nagar, Anna Nagar, and OMR are the areas to write down. The airport at Meenambakkam is a different point again.",
      },
      {
        q: "Which station name should I use?",
        a: "MGR Chennai Central is the main terminus. Egmore is the other station. Say which train you are on.",
      },
      {
        q: "Mahabalipuram or Pondicherry?",
        a: "Mahabalipuram is the short East Coast Road trip. Pondicherry (Puducherry) is the longer ECR drive, often with a night there. They are not one booking.",
      },
      {
        q: "Are prices on this page?",
        a: "No. Do not treat any number you have seen on a Dehradun page as a Chennai rate.",
      },
    ],
    sections: [
      {
        heading: "OMR, T. Nagar, and the airport",
        body: "T. Nagar is the central shopping stay. Anna Nagar is north-central. Old Mahabalipuram Road is the southern IT corridor, and a week there is a common self-drive shape. Chennai International (MAA) is at Meenambakkam / Tirusulam, which is not an OMR pickup. Say the area, and for a flight say which kerb you expect once you know domestic or international. We do not staff a counter in the terminal.",
      },
      {
        heading: "Central, Egmore, and the coast road",
        body: "MGR Chennai Central is the station to name unless the train ends at Egmore. The coast is a separate decision. Mahabalipuram is a short East Coast Road outing, sometimes half a day. Pondicherry is the longer ECR run. The spelling on a future route page will stay Puducherry. In the quote, Pondicherry is the word to use. Vellore is an inland highway drop, not a beach day. Tirupati is a different trip again. Do not write Vellore if you mean Tirupati.",
      },
      {
        heading: "Driver, keys, or a month on OMR",
        body: "A driver is the usual first ECR trip and the usual airport arrival. Self-drive suits someone who already wants the coast road or a work week. A monthly car is that work stay, not a weekend in Pondicherry priced as thirty days. Say which.",
      },
      {
        heading: "Chennai quote",
        body: `The rental city on the form is Chennai. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-kolkata",
    type: "category",
    title: "Car Rental in Kolkata | Arora Cars",
    h1: "Car rental in Kolkata",
    description:
      "Car rental in Kolkata for Park Street, Salt Lake, New Town, Dum Dum airport, or Howrah. Request a quote. No Kolkata cars or fares are published.",
    primaryKeyword: "car rental Kolkata",
    secondaryKeywords: ["car hire Kolkata", "rent a car Kolkata", "cab rental Kolkata"],
    badge: "Quote · Local partners",
    enquiryCity: "Kolkata",
    heroImage: "",
    intro:
      "Kolkata pickups have to say which side of the Hooghly the car starts on. This page is that enquiry. It is not a Dehradun car, and it is not a fare table.",
    faqs: [
      {
        q: "Which side of the river?",
        a: "Park Street is central Kolkata. Salt Lake and New Town are east. Howrah Junction is across the river. Write the side.",
      },
      {
        q: "Where is the airport?",
        a: "Netaji Subhas Chandra Bose International (CCU) is at Dum Dum, north of the centre. Salt Lake is closer than Howrah. There is no rental desk of ours in the terminal.",
      },
      {
        q: "Is Darjeeling a day trip from Kolkata?",
        a: "No. Treat Darjeeling as a multi-day hill transfer. Digha is the beach trip. Shantiniketan is the shorter cultural outing. Name the one you mean.",
      },
      {
        q: "Does this page show cars?",
        a: "No. A partner checks availability after the quote. Nothing is reserved by opening the page.",
      },
    ],
    sections: [
      {
        heading: "Park Street, Salt Lake, and Howrah",
        body: "Park Street and the central hotels are on the Kolkata side. Salt Lake and New Town are the east, closer to the airport corridor than a Howrah address is. Howrah Junction is across the Hooghly. A station pickup is not a Park Street pickup, and the bridge approach is its own meeting problem. Sealdah is the other major terminus. If the train is Sealdah, say Sealdah. Do not send the driver to Howrah.",
      },
      {
        heading: "Dum Dum, then the three trips out",
        body: "CCU at Dum Dum is north of the central city. A New Town guest and a south Kolkata guest are different airport drives. Beyond the city, Digha is the beach, usually a day or one night on the plains. Shantiniketan is the shorter cultural run. Darjeeling is not a day return. The car usually stays overnight, and the hill section is a driver job unless a partner explicitly agrees to self-drive. Do not ask this hub to bundle a tea-estate tour.",
      },
      {
        heading: "What to put in the quote",
        body: "City or outstation, driver or keys, and the rail or flight detail if there is one. A monthly stay in Salt Lake or New Town should say 'month' so it is not priced in your mind as a single day. No monthly figure is published.",
      },
      {
        heading: "Kolkata quote",
        body: `Leave the city as Kolkata. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-ahmedabad",
    type: "category",
    title: "Car Rental in Ahmedabad | Arora Cars",
    h1: "Car rental in Ahmedabad",
    description:
      "Car rental in Ahmedabad for SG Highway, Navrangpura, Satellite, SVPI airport, or Kalupur station. Request a quote. No fleet or fare is shown.",
    primaryKeyword: "car rental Ahmedabad",
    secondaryKeywords: ["car hire Ahmedabad", "rent a car Ahmedabad", "cab rental Ahmedabad"],
    badge: "Quote · Local partners",
    enquiryCity: "Ahmedabad",
    heroImage: "",
    intro:
      "This hub is for a car that starts in Ahmedabad. The Dehradun garage does not cover it. Send a quote and a local partner confirms whether they can do the dates.",
    faqs: [
      {
        q: "Which Ahmedabad areas should I name?",
        a: "SG Highway, Navrangpura, and Satellite. The airport and Kalupur station are separate meeting points.",
      },
      {
        q: "What is the airport code?",
        a: "Sardar Vallabhbhai Patel International (AMD). Say which side of the city you are starting from. There is no Arora Cars counter there.",
      },
      {
        q: "Kevadia, Mount Abu, or Udaipur?",
        a: "Kevadia is the Statue of Unity day or overnight. Mount Abu is the hill station across the Rajasthan border. Udaipur is the long intercity hire. Pick one in the notes.",
      },
      {
        q: "Will you quote a permit fee on this page?",
        a: "No. Any state-border paperwork is something the partner confirms in the reply. This page does not invent a fee.",
      },
    ],
    sections: [
      {
        heading: "SG Highway and Kalupur",
        body: "SG Highway and Satellite are the west side people use for offices and newer stays. Navrangpura is central. Ahmedabad Junction at Kalupur is the station, and it is not an SG Highway curb. Sardar Vallabhbhai Patel International is its own approach depending on whether you start on the west or the east. Write the start. A month on SG Highway is a work booking. A Sunday to the Statue of Unity is not that month.",
      },
      {
        heading: "Three departures, three jobs",
        body: "Kevadia, also called Ekta Nagar by some travellers, is the Statue of Unity trip. Use one quote for it. Do not expect a monument ticket. Mount Abu is the hill road into Rajasthan. The ghat is the reason to say if you want a driver. Udaipur is the long highway hire, a drop or several days. The border is mentioned only so the partner can say what paperwork they need. It is not a fee printed here.",
      },
      {
        heading: "Driver or self-drive",
        body: "Self-drive fits a highway day you are happy to drive. Ask before you assume a self-drive car is the right tool for the Mount Abu hill. A driver is the straightforward request for Kevadia as a long day and for a first Rajasthan crossing.",
      },
      {
        heading: "Ahmedabad quote",
        body: `The city field is Ahmedabad. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-jaipur",
    type: "category",
    title: "Car Rental in Jaipur | Arora Cars",
    h1: "Car rental in Jaipur",
    description:
      "Car rental in Jaipur for MI Road, C-Scheme, the airport, or Jaipur Junction. Request a quote. No Jaipur fleet, palace package, or price is listed.",
    primaryKeyword: "car rental Jaipur",
    secondaryKeywords: ["car hire Jaipur", "rent a car Jaipur", "cab rental Jaipur"],
    badge: "Quote · Local partners",
    enquiryCity: "Jaipur",
    heroImage: "",
    intro:
      "Jaipur rentals on this page are partner quotes. Amer is a sightseeing drop, not an office. Nothing here is a Dehradun car with a Jaipur label.",
    faqs: [
      {
        q: "Where should the car meet me?",
        a: "MI Road and C-Scheme are the usual hotel belt. A venue toward Amer is a different transfer. Jaipur airport and Jaipur Junction are different again.",
      },
      {
        q: "Do you sell fort tickets?",
        a: "No. The car is the hire. Monument entry is separate and is not bundled.",
      },
      {
        q: "Agra, Delhi, or Udaipur from Jaipur?",
        a: "Those are three routes with Jaipur as the start. A Delhi-to-Agra trip is a different origin. Say where the car begins.",
      },
      {
        q: "Is a decorated wedding car in stock?",
        a: "No stock is listed. A wedding movement can be described in the notes. It is still a quote, not a reserved car.",
      },
    ],
    sections: [
      {
        heading: "MI Road, Amer, and two arrival points",
        body: "MI Road and C-Scheme are where many stays sit. Amer is the fort side. A hotel on MI Road and a venue toward Amer are different transfers, which matters for weddings as much as for a fort morning. Jaipur International (JAI) is on the edge of the city. Jaipur Junction is the train station. Send the flight or the train, not a guess that 'the driver will know'. There is no counter inside the airport or the station.",
      },
      {
        heading: "A fort day is not the highway",
        body: "A day of forts with a driver is the main Jaipur shape. Self-drive is for someone who wants the highway themselves. Leaving Jaipur, Agra is the Taj run that starts here, not the one that starts in Delhi. Delhi itself is the NH48 return or drop, sometimes at a Delhi hotel and sometimes at IGI. Udaipur is the long road south and is usually a full day or a night in between. Write one destination. A loop can be discussed in the quote. It is not a package on this page.",
      },
      {
        heading: "Weddings and larger cars",
        body: "Guest movements between a hotel and a venue are a Jaipur request. Say the date, both addresses, and how many people. An SUV or Innova-class note means seats and bags. It does not mean that model is parked for you. No decorated car is advertised as available.",
      },
      {
        heading: "Jaipur quote",
        body: `Keep the rental city as Jaipur. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-goa",
    type: "category",
    title: "Car Rental in Goa | Arora Cars",
    h1: "Car rental in Goa",
    description:
      "Car rental in Goa for Panaji, Calangute, Margao, Mopa, or Dabolim. Request a quote. Scooters, prices, and a Goa fleet are not listed on this page.",
    primaryKeyword: "car rental Goa",
    secondaryKeywords: ["car hire Goa", "rent a car Goa", "cab rental Goa"],
    badge: "Quote · Local partners",
    enquiryCity: "Goa",
    heroImage: "",
    intro:
      "A car in Goa is usually a group with luggage, an airport arrival, or a move between coasts. This page is that quote. It is not a scooter, and it is not a car from Dehradun.",
    faqs: [
      {
        q: "North Goa or South Goa?",
        a: "Say which. Panaji, Calangute, and Candolim are the north belt. Margao and Palolem are the south. A cross-Goa hotel move is a long transfer, not a ten-minute hop.",
      },
      {
        q: "Mopa or Dabolim?",
        a: "Both are Goa airports. Mopa (GOX) is the north airport. Dabolim (GOI) is closer to Vasco and the south. The quote must say which flight you are on. There is one enquiry for both. There is no terminal counter.",
      },
      {
        q: "Is this the scooter page?",
        a: "No. A scooter for a beach belt is a different request. Mention it only if you need a car as well. Dudhsagar is a car day trip, not a scooter ride, and a jeep to the falls is not included.",
      },
      {
        q: "Are Goa cars and prices listed?",
        a: "No. A local partner checks the dates after you write the coast, the airport, and the pickup.",
      },
    ],
    sections: [
      {
        heading: "Name the coast before the car",
        body: "North Goa pickups that people actually say are Panaji, Calangute, and Candolim. South Goa pickups are Margao and, further down, Palolem. NH66 between those belts is the trip, not a city-centre hop. If the stay is in the north and the venue or the next hotel is in the south, say both ends. A car is the right ask once there is luggage or that cross-Goa move. A few kilometres between north-coast beaches is often a scooter conversation. This page does not turn that into a car booking.",
      },
      {
        heading: "Two airports, one enquiry",
        body: "Manohar International at Mopa (GOX) serves the north and is the closer airport for Panaji, Calangute, and Candolim. Dabolim (GOI) is the older airport, closer to Vasco, Margao, and the south. Tell the quote which airport the flight uses. Do not assign an airline from memory. Madgaon station in Margao is the main Konkan Railway arrival. Thivim is the stop many north-coast trains use. A Madgaon arrival going to Calangute is a long northbound transfer. Say the station.",
      },
      {
        heading: "What this hub will not add",
        body: "Dudhsagar can be mentioned as a day trip by car. The hire often stops before the falls, and a local jeep is a separate arrangement if the forest rule still requires it. Do not expect the jeep, a guide, or an entry ticket inside this quote. A wedding transfer is dates, hotels, and which airport the guests use. No resort is a partner of this page, and no decorated car is in stock.",
      },
      {
        heading: "Goa quote",
        body: `Set the city to Goa and write the village or beach, not only the state. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: "car-rental-chandigarh",
    type: "category",
    title: "Car Rental in Chandigarh | Arora Cars",
    h1: "Car rental in Chandigarh",
    description:
      "Car rental in Chandigarh for the Tricity, IXC airport, Shimla, or Manali. Request a quote. No fleet, permit fee, or hill price is published.",
    primaryKeyword: "car rental Chandigarh",
    secondaryKeywords: ["car hire Chandigarh", "rent a car Chandigarh", "cab rental Chandigarh"],
    badge: "Quote · Local partners",
    enquiryCity: "Chandigarh",
    heroImage: "",
    intro:
      "Chandigarh on this page means the Tricity: Chandigarh, Mohali, and Panchkula as pickup areas, not three extra city sites. The enquiry is for a local partner. It is not a Dehradun hill car.",
    faqs: [
      {
        q: "Do Mohali and Panchkula need their own pages?",
        a: "No. Name them as the pickup. Sector 17 is the centre people use for Chandigarh itself. The airport serves the whole Tricity.",
      },
      {
        q: "Shimla or Manali?",
        a: "Shimla is the shorter hill hop via Kalka. Manali is longer and usually more than one day. The quote stops at Manali. It does not promise Rohtang or the Atal Tunnel.",
      },
      {
        q: "Is a Himachal permit included?",
        a: "No. If the partner needs one for a self-drive car, they say so in the quote. This page does not state that a permit is included and does not print a fee.",
      },
      {
        q: "Is this the same as a Dehradun to Mussoorie booking?",
        a: "No. Those are different mountains and a different fleet. Use this page only when the car starts in the Tricity.",
      },
    ],
    sections: [
      {
        heading: "Sector 17, Mohali, and the airport",
        body: "Sector 17 is the centre to name when the stay is in Chandigarh proper. Mohali and Panchkula are part of the same pickup area for this enquiry. Shaheed Bhagat Singh International (IXC) serves that Tricity. Say which town the driver should open the door in. Chandigarh Junction is the station and is not the airport curb. There is no rental counter at either.",
      },
      {
        heading: "The hill is the product",
        body: "Most useful trips from here are Shimla and Manali, not a sightseeing loop of the sectors. Shimla is the climb after Kalka and Parwanoo, often a day each way or one night. Self-drive and a chauffeur are both plausible. Manali needs more time. If you want to go past Manali, the partner has to confirm the car and the permit. Do not read this page as permission for Rohtang. Amritsar is the plains trip in the other direction, often for the Golden Temple, and it should not be described with hill roads.",
      },
      {
        heading: "A month in the Tricity",
        body: "A monthly car for work in Chandigarh or Mohali is a different note from a weekend in Shimla. Say 'month' if that is the stay. No monthly rate is printed, and no SUV is marked in stock. Seats and luggage are enough.",
      },
      {
        heading: "Chandigarh quote",
        body: `The rental city is Chandigarh even if the pickup pin is Mohali or Panchkula. ${quoteLinks}`,
      },
    ],
    relatedSlugs: [],
  },
];

export const WAVE1_CITY_HUB_SLUGS = new Set(WAVE1_CITY_HUBS.map((page) => page.slug));

export function isWave1CityHubPath(path: string) {
  const slug = path.split("?")[0].replace(/\/$/, "").split("/").filter(Boolean)[0] || "";
  return WAVE1_CITY_HUB_SLUGS.has(slug);
}
