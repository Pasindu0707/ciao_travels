export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  summary: string;
  details: string[];
}

export interface Journey {
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  durationDays: number;
  durationLabel: string;
  groupSize: string;
  priceFrom: number;
  currency: string;
  cover: string;
  coverAlt: string;
  hero: string;
  intro: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  destinations: string[];
  pace: "Slow" | "Balanced" | "Active";
  category: "Signature" | "Honeymoon" | "Family" | "Wildlife" | "Cultural";
  featured?: boolean;
}

export const journeys: Journey[] = [
  {
    slug: "the-ceylon-classic",
    name: "The Ceylon Classic",
    subtitle: "Cultural Triangle · Hill Country · South Coast",
    tagline: "Twelve days through the island's most luminous chapters.",
    durationDays: 12,
    durationLabel: "12 days · 11 nights",
    groupSize: "2 to 6 guests",
    priceFrom: 7800,
    currency: "USD",
    cover:
      "https://images.unsplash.com/photo-1588258524675-3fa3cb1052bd?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Sigiriya rock at dawn through palm leaves",
    hero:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2400&q=80",
    intro:
      "A complete portrait of Sri Lanka — from the frescoes of Sigiriya to the cinnamon backwaters of the south. Twelve quiet days, three remarkable hotels, one private driver who will quickly feel like family.",
    description:
      "Our most loved journey, sequenced for travellers who want to understand the island rather than tick it off. We pace the route around your meals and your mornings — sunrise on the rock, slow afternoons in tea country, a long Saturday in Galle Fort.",
    highlights: [
      "Pre-dawn private ascent of Sigiriya",
      "Two nights in a 19th-century planter's bungalow",
      "Blue train through the hill country",
      "Private leopard tracker in Yala",
      "Golden-hour walk on Galle's ramparts",
    ],
    inclusions: [
      "11 nights in hand-picked boutique hotels and luxury tented camps",
      "Private chauffeur-guide in a fully serviced vehicle",
      "All entrance fees, taxes & permits",
      "Daily breakfast, four signature dinners",
      "Curated experiences (cooking class, tea estate, leopard safari)",
      "24/7 concierge support during your trip",
    ],
    exclusions: ["International flights", "Travel insurance", "Beverages unless specified", "Personal expenses"],
    destinations: ["Negombo", "Sigiriya", "Kandy", "Ella", "Yala", "Galle", "Mirissa"],
    pace: "Balanced",
    category: "Signature",
    featured: true,
    itinerary: [
      { day: 1, title: "Arrival in Colombo", location: "Negombo", summary: "Welcome by your private chauffeur. Sea breeze and an unhurried first night.", details: ["Private airport transfer", "Sundowner at a quiet beach lodge", "Light coastal dinner"] },
      { day: 2, title: "Into the Cultural Triangle", location: "Sigiriya", summary: "A morning drive inland to the heart of the ancient kingdoms.", details: ["Coconut estate stop", "Check-in at jungle villa", "Sundown at Pidurangala"] },
      { day: 3, title: "The Lion's Rock at Dawn", location: "Sigiriya", summary: "Private pre-dawn ascent before the crowds. Afternoon at leisure.", details: ["Sigiriya summit before sunrise", "Frescoes and water gardens", "Floating breakfast on return"] },
      { day: 4, title: "Polonnaruwa & Minneriya", location: "Sigiriya", summary: "Ancient capitals by morning, gathering elephants by afternoon.", details: ["Polonnaruwa cycling tour", "Minneriya jeep safari", "Tank-side dinner"] },
      { day: 5, title: "To the Last Kingdom", location: "Kandy", summary: "Through spice gardens to the lake-rimmed capital.", details: ["Matale spice garden", "Temple of the Tooth evening puja", "Hill-country boutique stay"] },
      { day: 6, title: "Blue Train to the Tea Country", location: "Ella", summary: "One of the world's great train journeys.", details: ["First-class observation carriage", "Tea-estate lunch", "Sunset at Little Adam's Peak"] },
      { day: 7, title: "Tea, Mist, Stillness", location: "Ella", summary: "Plantation visit, factory tasting, slow afternoon.", details: ["Private tea-plucking session", "Master's tasting", "Nine Arches at golden hour"] },
      { day: 8, title: "Descent to the Wild South", location: "Yala", summary: "Down from the hills into leopard country.", details: ["Private waterfall stop", "Tented camp arrival", "Sundowner by the lagoon"] },
      { day: 9, title: "Leopard Country", location: "Yala", summary: "Two private safaris with the park's most trusted tracker.", details: ["Dawn safari", "Bush breakfast", "Afternoon safari"] },
      { day: 10, title: "The South Coast", location: "Mirissa", summary: "Empty beaches, gentle surf, a boutique villa.", details: ["Coastal drive", "Whale-watching boat (seasonal)", "Beach dinner"] },
      { day: 11, title: "Galle Fort", location: "Galle", summary: "Saturday in the prettiest colonial fort in Asia.", details: ["Rampart walk", "Antique gallery tour", "Townhouse dinner"] },
      { day: 12, title: "Departure", location: "Colombo", summary: "A leisurely transfer back to Colombo and onward flights.", details: ["Slow morning", "Private transfer", "Departure lounge access"] },
    ],
  },
  {
    slug: "tea-and-temples",
    name: "Tea & Temples",
    subtitle: "Hill Country immersion",
    tagline: "Eight slow days in the cool green heart of the island.",
    durationDays: 8,
    durationLabel: "8 days · 7 nights",
    groupSize: "2 to 4 guests",
    priceFrom: 5400,
    currency: "USD",
    cover:
      "https://images.unsplash.com/photo-1586804580207-1ce0b8731437?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Tea plantation rows in the Sri Lankan hill country",
    hero:
      "https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=2400&q=80",
    intro:
      "A focused itinerary for travellers who want to slow down and stay deep. Two nights each in three planter's bungalows, with mornings of mist and afternoons of tea.",
    description:
      "Sri Lanka's hill country is one of the most beautiful tea regions on earth — and one of the least understood. We unpack it gently, with master pluckers, factory walk-throughs, and long lunches on verandahs that haven't changed since 1923.",
    highlights: [
      "Three heritage planter's bungalows",
      "Private master taster session",
      "Dawn train through the tea hills",
      "Knuckles Mountain Range trek",
      "Hidden waterfall picnic",
    ],
    inclusions: [
      "7 nights in heritage bungalows",
      "Private chauffeur-guide",
      "All entrance fees & taxes",
      "Daily breakfast & lunch, three dinners",
      "Tea-factory tours and master tasting",
    ],
    exclusions: ["International flights", "Travel insurance", "Personal expenses"],
    destinations: ["Kandy", "Hatton", "Nuwara Eliya", "Ella"],
    pace: "Slow",
    category: "Signature",
    featured: true,
    itinerary: [
      { day: 1, title: "Welcome to Kandy", location: "Kandy", summary: "Arrive, settle, and ease into hill-country time.", details: ["Airport pickup", "Lakeside dinner", "Temple of the Tooth puja"] },
      { day: 2, title: "Botanicals & Old Roads", location: "Kandy", summary: "A long, slow day in the gardens of Peradeniya.", details: ["Royal Botanical Gardens", "Cinnamon estate visit"] },
      { day: 3, title: "Into the High Country", location: "Hatton", summary: "Drive past waterfalls into the heart of the tea hills.", details: ["Bungalow check-in", "Factory walk-through"] },
      { day: 4, title: "Master Taster's Morning", location: "Hatton", summary: "A private session with one of Ceylon's most respected tea tasters.", details: ["Tasting cupping", "Picnic on the estate"] },
      { day: 5, title: "Nuwara Eliya", location: "Nuwara Eliya", summary: "Little England — colonial gardens and cool mornings.", details: ["Horton Plains walk", "Strawberry farm visit"] },
      { day: 6, title: "Blue Train to Ella", location: "Ella", summary: "One of the world's most beautiful train journeys.", details: ["First-class observation seats", "Lipton's Seat sunset"] },
      { day: 7, title: "Ella at Dawn", location: "Ella", summary: "Nine Arches at first light, then a slow farewell.", details: ["Sunrise at Nine Arches", "Estate lunch"] },
      { day: 8, title: "Onward", location: "Colombo", summary: "Private transfer to Colombo or onward connection.", details: ["Slow descent", "Airport drop-off"] },
    ],
  },
  {
    slug: "wild-ceylon",
    name: "Wild Ceylon",
    subtitle: "Tracking leopards, elephants & whales",
    tagline: "Ten days for travellers who would rather spot than shop.",
    durationDays: 10,
    durationLabel: "10 days · 9 nights",
    groupSize: "2 to 4 guests",
    priceFrom: 8200,
    currency: "USD",
    cover:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Wild leopard on a granite outcrop in Yala",
    hero:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2400&q=80",
    intro:
      "A wildlife journey that takes seriously what Sri Lanka does best — leopards in Yala, elephant gatherings in Wilpattu, blue whales off Mirissa.",
    description:
      "Sri Lanka is one of the most biodiverse places on Earth for its size. We work with a small circle of trackers, biologists and tented-camp owners to deliver wildlife encounters that feel intimate, ethical, and rare.",
    highlights: [
      "Three nights in luxury tented camps",
      "Private tracker in Yala and Wilpattu",
      "Pelagic blue-whale charter",
      "Bird-watching with a resident naturalist",
      "Turtle nesting site (seasonal)",
    ],
    inclusions: [
      "9 nights including 3 in tented camps",
      "All park fees, jeep & tracker",
      "Whale-watching private charter",
      "Daily breakfast & dinner",
      "Naturalist guide throughout",
    ],
    exclusions: ["International flights", "Travel insurance"],
    destinations: ["Wilpattu", "Sigiriya", "Yala", "Mirissa"],
    pace: "Active",
    category: "Wildlife",
    featured: true,
    itinerary: [
      { day: 1, title: "Arrival", location: "Negombo", summary: "Soft arrival on the coast.", details: ["Private transfer", "Quiet lagoon hotel"] },
      { day: 2, title: "Into the Wild North-West", location: "Wilpattu", summary: "Sri Lanka's largest and least-visited national park.", details: ["Tented camp arrival", "Sundowner safari"] },
      { day: 3, title: "Wilpattu Full Day", location: "Wilpattu", summary: "All-day safari with bush breakfast and lagoon lunch.", details: ["Dawn drive", "Bush breakfast", "Late afternoon drive"] },
      { day: 4, title: "Cultural Pause", location: "Sigiriya", summary: "Two days of ancient cities for balance.", details: ["Sigiriya climb", "Polonnaruwa cycling"] },
      { day: 5, title: "Sigiriya & Minneriya", location: "Sigiriya", summary: "The Gathering — Asia's largest annual elephant congregation.", details: ["Private safari to Minneriya tank", "Sunset by the water"] },
      { day: 6, title: "South to Yala", location: "Yala", summary: "Long drive south to the leopard country.", details: ["Tented camp", "Sundowner with the trackers"] },
      { day: 7, title: "Two Yala Safaris", location: "Yala", summary: "Dawn and dusk, both with private trackers.", details: ["Dawn drive", "Bush breakfast", "Dusk drive"] },
      { day: 8, title: "To the Whales", location: "Mirissa", summary: "Down to the south coast for the open ocean.", details: ["Coastal villa check-in", "Briefing with skipper"] },
      { day: 9, title: "Blue Whale Charter", location: "Mirissa", summary: "Private boat into the trench.", details: ["Pre-dawn departure", "Whale encounters", "Beach lunch"] },
      { day: 10, title: "Departure", location: "Colombo", summary: "Coastal drive back and onward flight.", details: ["Slow morning", "Airport transfer"] },
    ],
  },
  {
    slug: "honeymoon-in-ceylon",
    name: "Honeymoon in Ceylon",
    subtitle: "Tea bungalows, beach villas, candlelit dinners",
    tagline: "Nine quiet days for two — and absolutely no rush.",
    durationDays: 9,
    durationLabel: "9 days · 8 nights",
    groupSize: "2 guests",
    priceFrom: 9800,
    currency: "USD",
    cover:
      "https://images.unsplash.com/photo-1583072117121-1c3ea58c5f1c?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Private villa pool overlooking a Sri Lankan palm cove",
    hero:
      "https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=2400&q=80",
    intro:
      "A honeymoon shaped around long lunches, lazy mornings, and the kind of sunsets you only get to see together.",
    description:
      "Two heritage hotels, one private villa, and a sequence of moments quietly orchestrated by our team — including a candlelit dinner on a private sandbar, a couples' Ayurveda morning, and a sunrise tea on the ramparts of Galle Fort.",
    highlights: [
      "Private candlelit beach dinner",
      "Couples' Ayurveda treatment",
      "Heritage planter's bungalow",
      "Plunge-pool villa on the south coast",
      "Sunrise tea on Galle Fort ramparts",
    ],
    inclusions: [
      "8 nights including a private villa",
      "Private chauffeur-guide",
      "Sparkling welcome & honeymoon turn-downs",
      "Two signature dinners, daily breakfast",
      "Couples' Ayurveda session",
    ],
    exclusions: ["International flights", "Beverages", "Spa add-ons"],
    destinations: ["Negombo", "Kandy", "Ella", "Galle", "Tangalle"],
    pace: "Slow",
    category: "Honeymoon",
    itinerary: [
      { day: 1, title: "Arrival", location: "Negombo", summary: "A private welcome, a lagoon hotel, a soft first night.", details: ["Private transfer", "Welcome dinner"] },
      { day: 2, title: "To Kandy", location: "Kandy", summary: "Through pineapple country to the hill capital.", details: ["Spice garden stop", "Evening puja"] },
      { day: 3, title: "Tea Country", location: "Ella", summary: "A long, scenic day into the high country.", details: ["Train journey", "Estate sundowner"] },
      { day: 4, title: "Slow Day in Ella", location: "Ella", summary: "Plantation lunch, plunge-pool afternoon, candlelit dinner.", details: ["Estate walk", "Couples' massage"] },
      { day: 5, title: "South Coast Villa", location: "Tangalle", summary: "Down to your private villa.", details: ["Beach arrival", "Sundowner on the terrace"] },
      { day: 6, title: "Private Sandbar Dinner", location: "Tangalle", summary: "A meal arranged just for you.", details: ["Boat to the sandbar", "Candlelit table for two"] },
      { day: 7, title: "Galle Day", location: "Galle", summary: "Antiques, lunch, ramparts at golden hour.", details: ["Antique tour", "Heritage townhouse dinner"] },
      { day: 8, title: "Ayurveda Morning", location: "Tangalle", summary: "A couples' treatment overlooking the sea.", details: ["Spa morning", "Quiet afternoon"] },
      { day: 9, title: "Onward", location: "Colombo", summary: "Coastal drive to the airport.", details: ["Slow morning", "Private transfer"] },
    ],
  },
  {
    slug: "family-ceylon",
    name: "Family Ceylon",
    subtitle: "Designed for travellers seven to seventy",
    tagline: "Ten days that keep everyone — including teenagers — happy.",
    durationDays: 10,
    durationLabel: "10 days · 9 nights",
    groupSize: "Up to 6 guests",
    priceFrom: 7100,
    currency: "USD",
    cover:
      "https://images.unsplash.com/photo-1582033922056-7826a5f1c873?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Family looking up at the Sigiriya rock from below",
    hero:
      "https://images.unsplash.com/photo-1605649461784-4f51b5cdc97a?auto=format&fit=crop&w=2400&q=80",
    intro:
      "A pace that respects everyone's appetite for adventure. Cooking classes, train rides, safari jeeps, body-boards — and quiet pool afternoons in between.",
    description:
      "We design family itineraries the way we design our own — with options at every step, kids' guides where it helps, and hotels that genuinely welcome younger travellers.",
    highlights: [
      "Family-friendly tea-country bungalow",
      "Cooking class with grandmothers",
      "Two-jeep private safari",
      "Surf lesson on the south coast",
      "Cycling through ancient Polonnaruwa",
    ],
    inclusions: [
      "9 nights in family-suited boutique hotels",
      "Private chauffeur-guide",
      "Kid-friendly guides where helpful",
      "All park fees & permits",
      "Daily breakfast",
    ],
    exclusions: ["International flights", "Travel insurance"],
    destinations: ["Negombo", "Sigiriya", "Kandy", "Ella", "Yala", "Mirissa"],
    pace: "Balanced",
    category: "Family",
    itinerary: [
      { day: 1, title: "Arrival", location: "Negombo", summary: "Soft landing on the coast.", details: ["Private transfer", "Pool afternoon"] },
      { day: 2, title: "Cultural Triangle", location: "Sigiriya", summary: "Drive inland to ancient kingdoms.", details: ["Lunch stop", "Pidurangala evening"] },
      { day: 3, title: "Sigiriya & Cycling", location: "Sigiriya", summary: "Climb the rock, cycle through Polonnaruwa.", details: ["Sigiriya summit", "Family cycle tour"] },
      { day: 4, title: "Kandy", location: "Kandy", summary: "Spice gardens and cultural show.", details: ["Spice garden", "Drum performance"] },
      { day: 5, title: "Tea Country Train", location: "Ella", summary: "All aboard the famous blue train.", details: ["First-class seats", "Estate afternoon"] },
      { day: 6, title: "Hill Country Play", location: "Ella", summary: "Hike, swim under a waterfall, picnic.", details: ["Little Adam's Peak", "Diyaluma swim"] },
      { day: 7, title: "Wild Yala", location: "Yala", summary: "Two-jeep safari for the whole family.", details: ["Dawn safari", "Pool afternoon"] },
      { day: 8, title: "Surf & Sand", location: "Mirissa", summary: "Beach time, body-boards, gentle waves.", details: ["Surf lesson", "Beach dinner"] },
      { day: 9, title: "Cooking & Galle", location: "Galle", summary: "Cooking class with local grandmothers, ramparts at dusk.", details: ["Family cooking class", "Rampart walk"] },
      { day: 10, title: "Onward", location: "Colombo", summary: "Slow drive back to Colombo.", details: ["Airport transfer"] },
    ],
  },
  {
    slug: "the-quiet-coast",
    name: "The Quiet Coast",
    subtitle: "An east-coast retreat",
    tagline: "Seven barefoot days where almost no one goes.",
    durationDays: 7,
    durationLabel: "7 days · 6 nights",
    groupSize: "2 to 4 guests",
    priceFrom: 4600,
    currency: "USD",
    cover:
      "https://images.unsplash.com/photo-1578507067149-b87de2c1f60d?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Empty beach at Nilaveli with palm shadows",
    hero:
      "https://images.unsplash.com/photo-1559688636-72fe51adcde1?auto=format&fit=crop&w=2400&q=80",
    intro:
      "The east coast is Sri Lanka at its quietest — wide white bays, Tamil temples, fishermen at dawn. Seven days here is enough to forget your own name in the best way.",
    description:
      "A seasonal journey (May to September) for travellers who would rather be on the water than near it. We pair Trincomalee with a private beach villa and two days of reef snorkelling at Pigeon Island.",
    highlights: [
      "Private beach villa for 4 nights",
      "Pigeon Island snorkelling",
      "Blue-whale charter (seasonal)",
      "Koneswaram temple at dawn",
      "Stilt fishermen sunrise",
    ],
    inclusions: [
      "6 nights including 4 at a private villa",
      "Private chauffeur-guide",
      "Snorkel charter to Pigeon Island",
      "All entrance fees",
      "Daily breakfast",
    ],
    exclusions: ["International flights", "Spa", "Watersports rentals"],
    destinations: ["Sigiriya", "Trincomalee", "Pasikuda"],
    pace: "Slow",
    category: "Signature",
    itinerary: [
      { day: 1, title: "Arrival", location: "Colombo", summary: "Welcome and overnight near the airport.", details: ["Private transfer", "Lagoon dinner"] },
      { day: 2, title: "Cross-country to the East", location: "Trincomalee", summary: "Drive through Sigiriya region to the east coast.", details: ["Sigiriya lunch", "Beach arrival"] },
      { day: 3, title: "Pigeon Island", location: "Trincomalee", summary: "Reef snorkelling with a private boat.", details: ["Snorkel charter", "Picnic lunch"] },
      { day: 4, title: "Koneswaram & Town", location: "Trincomalee", summary: "Temple at dawn, town at dusk.", details: ["Temple visit", "Old town walk"] },
      { day: 5, title: "Quiet Beach Day", location: "Pasikuda", summary: "South to Pasikuda's calm bay.", details: ["Villa arrival", "Sunset terrace"] },
      { day: 6, title: "Slow Coast", location: "Pasikuda", summary: "A full day of rest and shoreline.", details: ["Late breakfast", "Sundowner sail"] },
      { day: 7, title: "Departure", location: "Colombo", summary: "Drive back via Sigiriya region.", details: ["Airport transfer"] },
    ],
  },
];

export function getJourneyBySlug(slug: string) {
  return journeys.find((j) => j.slug === slug);
}

export function getFeaturedJourneys() {
  return journeys.filter((j) => j.featured);
}
