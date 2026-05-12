export interface Destination {
  slug: string;
  name: string;
  region: "Cultural Triangle" | "Hill Country" | "Southern Coast" | "Northern Plains" | "East Coast" | "Wild Interior";
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  highlights: string[];
  bestMonths: string[];
  coordinates: { x: number; y: number };
  drivingFromColombo: string;
}

export const destinations: Destination[] = [
  {
    slug: "sigiriya",
    name: "Sigiriya",
    region: "Cultural Triangle",
    tagline: "The lion's rock — a fifth-century sky palace.",
    description:
      "A 200-metre granite monolith crowned by the ruins of a vanished king's pleasure court, surrounded by water gardens older than most cathedrals.",
    longDescription:
      "King Kashyapa raised his fortress and his hubris on this stone in 477 CE. Today, the climb at dawn is one of South Asia's quiet pilgrimages — through frescoed sisters, past mirror walls polished to memory, up the lion's paws and into the wind. From the summit, the jungle stretches to every horizon, broken only by the dagobas of Polonnaruwa and the silhouette of Pidurangala.",
    image:
      "https://images.unsplash.com/photo-1588258524675-3fa3cb1052bd?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Sigiriya rock fortress at dawn, surrounded by emerald jungle",
    gallery: [
      { src: "https://images.unsplash.com/photo-1546708973-b169ce5fa432?auto=format&fit=crop&w=1600&q=80", alt: "Frescoes inside Sigiriya" },
      { src: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80", alt: "View from Sigiriya summit" },
      { src: "https://images.unsplash.com/photo-1582033922056-7826a5f1c873?auto=format&fit=crop&w=1600&q=80", alt: "Water gardens at Sigiriya" },
    ],
    highlights: ["Pre-dawn private summit", "Royal water gardens", "Pidurangala viewpoint", "Frescoes & mirror wall"],
    bestMonths: ["Jan", "Feb", "Mar", "Apr", "Sep", "Oct"],
    coordinates: { x: 530, y: 360 },
    drivingFromColombo: "4 hr 15 min",
  },
  {
    slug: "kandy",
    name: "Kandy",
    region: "Cultural Triangle",
    tagline: "The last royal capital, cradled by mist.",
    description: "A lake-rimmed highland city, home to the Sacred Tooth Relic and the rhythm of evening drums.",
    longDescription:
      "Kandy sits in a green amphitheatre of forested hills, its lake reflecting the white walls of the Temple of the Tooth. By day, the city pulses with markets and monks. By dusk, oil lamps flicker as drummers gather for puja — a sound that has marked these doors for five centuries.",
    image:
      "https://images.unsplash.com/photo-1577094945207-ec24cf2d36e2?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Kandy lake and Temple of the Tooth at twilight",
    gallery: [
      { src: "https://images.unsplash.com/photo-1578508079472-12a0a3a96b9c?auto=format&fit=crop&w=1600&q=80", alt: "Temple of the Tooth at dusk" },
      { src: "https://images.unsplash.com/photo-1578508045030-12e57ce28196?auto=format&fit=crop&w=1600&q=80", alt: "Kandy lake panorama" },
    ],
    highlights: ["Temple of the Tooth puja", "Royal Botanical Gardens", "Hill-country drum performance", "Tea factory tour"],
    bestMonths: ["Jan", "Feb", "Mar", "Apr", "Sep", "Oct"],
    coordinates: { x: 470, y: 460 },
    drivingFromColombo: "3 hr 00 min",
  },
  {
    slug: "ella",
    name: "Ella",
    region: "Hill Country",
    tagline: "Tea-velvet ridges, hidden waterfalls, slow trains.",
    description: "A village suspended above the southern plains, where the air is thinner and the silence louder.",
    longDescription:
      "Ella is a quiet town of guesthouses, eucalyptus, and tea-leaf air. The Nine Arches Bridge curves through the jungle like a bracelet; Little Adam's Peak rises just behind. From here, you can watch the blue trains thread the green hills below — or take one yourself, all the way to Nuwara Eliya.",
    image:
      "https://images.unsplash.com/photo-1586804580207-1ce0b8731437?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Tea plantations rolling toward Ella Gap at sunrise",
    gallery: [
      { src: "https://images.unsplash.com/photo-1622219809260-ce065fc5277f?auto=format&fit=crop&w=1600&q=80", alt: "Nine Arches Bridge" },
      { src: "https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=1600&q=80", alt: "Tea pluckers at work" },
    ],
    highlights: ["Nine Arches Bridge at sunrise", "Tea-estate breakfast", "Little Adam's Peak hike", "Scenic train to Kandy"],
    bestMonths: ["Jan", "Feb", "Mar", "Apr"],
    coordinates: { x: 580, y: 560 },
    drivingFromColombo: "6 hr 30 min",
  },
  {
    slug: "galle",
    name: "Galle",
    region: "Southern Coast",
    tagline: "A Dutch fort, a sea wall, a quiet Saturday.",
    description: "The most photogenic colonial fort in Asia — and a lazy afternoon waiting to be lost in.",
    longDescription:
      "Built by the Portuguese, fortified by the Dutch, polished by time, Galle is a tiny world of coral-stone ramparts, antique shops, and shaded courtyards. Cricket on the green, gin on the sea wall, dinner in a 200-year-old townhouse — Galle rewards travellers who slow down enough to listen to it.",
    image:
      "https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Galle Fort lighthouse and ramparts at sunset",
    gallery: [
      { src: "https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?auto=format&fit=crop&w=1600&q=80", alt: "Galle Fort streets" },
      { src: "https://images.unsplash.com/photo-1605649461784-4f51b5cdc97a?auto=format&fit=crop&w=1600&q=80", alt: "Galle ramparts at dusk" },
    ],
    highlights: ["Private rampart walk at golden hour", "Antique gallery tour", "Stilt fishermen at Koggala", "Heritage townhouse dinner"],
    bestMonths: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    coordinates: { x: 420, y: 750 },
    drivingFromColombo: "1 hr 45 min",
  },
  {
    slug: "yala",
    name: "Yala",
    region: "Wild Interior",
    tagline: "The highest density of leopards on Earth.",
    description: "Scrub jungle, granite outcrops, lagoons and elephants at dusk — and somewhere, a leopard.",
    longDescription:
      "Yala spans 979 km² of monsoon forest and brackish lagoons in the deep south. Beyond its famous leopards, the park holds sloth bears, peacocks, painted storks, and the occasional saltwater crocodile. We travel with the park's most respected trackers and stay in a tented camp on the boundary, far from the convoys.",
    image:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Wild leopard on a rock at Yala National Park",
    gallery: [
      { src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1600&q=80", alt: "Yala elephants at dusk" },
    ],
    highlights: ["Private leopard tracker", "Bush breakfast in the park", "Tented camp at the boundary", "Birding lagoon walk"],
    bestMonths: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    coordinates: { x: 640, y: 760 },
    drivingFromColombo: "5 hr 30 min",
  },
  {
    slug: "trincomalee",
    name: "Trincomalee",
    region: "East Coast",
    tagline: "Whales, white beaches, an emperor's harbour.",
    description: "One of the world's great natural harbours, with reef snorkelling at Pigeon Island and blue whales offshore from March to August.",
    longDescription:
      "The eastern coast belongs to a slower Sri Lanka — Tamil temples ring small white bays, fishermen lay sails on the sand at dawn, and seabirds wheel above empty stretches of Nilaveli. From May to August, blue whales feed in the trench just offshore, and the waters of Pigeon Island ripple with reef fish.",
    image:
      "https://images.unsplash.com/photo-1578507067149-b87de2c1f60d?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Empty white-sand beach at Nilaveli with palm shadows",
    gallery: [
      { src: "https://images.unsplash.com/photo-1559588239-9b5e7cb3c5e9?auto=format&fit=crop&w=1600&q=80", alt: "Nilaveli beach" },
    ],
    highlights: ["Private blue-whale charter", "Pigeon Island snorkel", "Koneswaram temple at dawn", "Beach cabana stay"],
    bestMonths: ["May", "Jun", "Jul", "Aug", "Sep"],
    coordinates: { x: 660, y: 320 },
    drivingFromColombo: "5 hr 45 min",
  },
  {
    slug: "jaffna",
    name: "Jaffna",
    region: "Northern Plains",
    tagline: "Palmyrah, lagoons, Tamil temples — Sri Lanka's other half.",
    description: "A peninsula apart — Hindu kovils, crab curries, fortress ruins, and the slow ferry to Delft.",
    longDescription:
      "Jaffna is what Sri Lanka was before the rest of Sri Lanka. Cyclists and oxen share the road; the smell is jasmine and curry leaf; the temples ring with bells at dusk. Few travellers come here, which is precisely why we do. We pair it with a stay at a restored 1930s heritage house and a ferry crossing to the wild horses of Delft Island.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Nallur Kovil temple gopuram in golden light",
    gallery: [
      { src: "https://images.unsplash.com/photo-1605649461784-4f51b5cdc97a?auto=format&fit=crop&w=1600&q=80", alt: "Jaffna lagoon" },
    ],
    highlights: ["Nallur Kovil at sundown", "Delft Island wild horses", "Heritage townhouse stay", "Crab curry tasting"],
    bestMonths: ["Jan", "Feb", "Mar", "Apr", "Sep", "Oct", "Nov"],
    coordinates: { x: 480, y: 130 },
    drivingFromColombo: "7 hr 30 min",
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    region: "Southern Coast",
    tagline: "Crescent bay, palm shade, blue water year-round.",
    description: "A horseshoe of soft sand where blue whales pass close to shore and the surf is forgiving.",
    longDescription:
      "Mirissa is the south coast at its gentlest — a bay you can walk in twenty minutes, fishermen pulling nets at dawn, and a thin restaurant strip that comes alive only after sundown. Between December and April, we send guests offshore for the world's most reliable blue-whale encounters.",
    image:
      "https://images.unsplash.com/photo-1583072117121-1c3ea58c5f1c?auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Mirissa beach palm trees and turquoise sea",
    gallery: [
      { src: "https://images.unsplash.com/photo-1559688636-72fe51adcde1?auto=format&fit=crop&w=1600&q=80", alt: "Mirissa palm beach" },
    ],
    highlights: ["Sunrise blue-whale boat", "Private surf lesson", "Coconut Hill at golden hour", "Boutique villa stay"],
    bestMonths: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    coordinates: { x: 470, y: 780 },
    drivingFromColombo: "2 hr 30 min",
  },
];
