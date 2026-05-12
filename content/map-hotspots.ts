/**
 * Seven curated hotspots for the interactive Sri Lanka map section.
 * Linked journeys reference real slugs from `content/journeys.ts`.
 */

export interface MapHotspot {
  id: string;
  name: string;
  /** One evocative line — editorial tone. */
  moodLine: string;
  /** Who this region suits best (single phrase). */
  bestFor: string;
  /** Suggested stay length for this chapter of the island. */
  idealDuration: string;
  /** Journey slug from `journeys` — shown as the linked itinerary. */
  linkedJourneySlug: string;
  image: string;
  imageAlt: string;
  /** SVG coordinates in viewBox space `200 60 600 800`. */
  coordinates: { x: number; y: number };
  /** Optional deep link to destination detail page. */
  destinationPageSlug?: string;
}

export const MAP_HOTSPOTS: MapHotspot[] = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    moodLine: "Dawn light on a fifth-century sky palace.",
    bestFor: "Ancient kingdoms & slow climbs",
    idealDuration: "2–3 nights",
    linkedJourneySlug: "the-ceylon-classic",
    destinationPageSlug: "sigiriya",
    image:
      "https://images.unsplash.com/photo-1588258524675-3fa3cb1052bd?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Sigiriya rock fortress rising through tropical forest at sunrise",
    coordinates: { x: 532, y: 358 },
  },
  {
    id: "kandy",
    name: "Kandy",
    moodLine: "Temple drums and a lake that remembers kings.",
    bestFor: "Sacred culture & evening rituals",
    idealDuration: "2 nights",
    linkedJourneySlug: "the-ceylon-classic",
    destinationPageSlug: "kandy",
    image:
      "https://images.unsplash.com/photo-1577094945207-ec24cf2d36e2?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Kandy lake and hills at dusk",
    coordinates: { x: 468, y: 458 },
  },
  {
    id: "tea-country",
    name: "Tea Country",
    moodLine: "Mist, brass kettles, and ridges that never end.",
    bestFor: "Slow mornings & planter's verandahs",
    idealDuration: "3–4 nights",
    linkedJourneySlug: "tea-and-temples",
    image:
      "https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Tea terraces and mist in Sri Lanka hill country",
    coordinates: { x: 518, y: 508 },
  },
  {
    id: "ella",
    name: "Ella",
    moodLine: "Trains in the clouds and waterfalls below.",
    bestFor: "Hikers & scenic rail lovers",
    idealDuration: "2–3 nights",
    linkedJourneySlug: "tea-and-temples",
    destinationPageSlug: "ella",
    image:
      "https://images.unsplash.com/photo-1586804580207-1ce0b8731437?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Green hills and Ella Gap at sunrise",
    coordinates: { x: 582, y: 558 },
  },
  {
    id: "yala",
    name: "Yala",
    moodLine: "Leopard light — low, gold, utterly still.",
    bestFor: "Wildlife & private safari rhythm",
    idealDuration: "2 nights",
    linkedJourneySlug: "wild-ceylon",
    destinationPageSlug: "yala",
    image:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Leopard resting on a rock in Yala National Park",
    coordinates: { x: 642, y: 758 },
  },
  {
    id: "galle",
    name: "Galle",
    moodLine: "Ramparts, coral stone, and long afternoons.",
    bestFor: "Heritage walks & coastal calm",
    idealDuration: "2 nights",
    linkedJourneySlug: "honeymoon-in-ceylon",
    destinationPageSlug: "galle",
    image:
      "https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Galle Fort lighthouse and sea walls at golden hour",
    coordinates: { x: 418, y: 742 },
  },
  {
    id: "south-coast",
    name: "South Coast",
    moodLine: "Crescents of sand, palms, and glass-clear shallows.",
    bestFor: "Beach days & blue-water escapes",
    idealDuration: "3–5 nights",
    linkedJourneySlug: "honeymoon-in-ceylon",
    destinationPageSlug: "mirissa",
    image:
      "https://images.unsplash.com/photo-1583072117121-1c3ea58c5f1c?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Palm-lined tropical bay on Sri Lanka's south coast",
    coordinates: { x: 452, y: 788 },
  },
];
