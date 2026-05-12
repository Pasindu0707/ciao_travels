export interface Experience {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  category: "Culinary" | "Wildlife" | "Wellness" | "Cultural" | "Adventure";
}

export const experiences: Experience[] = [
  {
    slug: "private-sigiriya-summit",
    name: "Private Sigiriya summit at dawn",
    short: "Climb the lion's rock before the crowds.",
    description:
      "We arrange entry through a private gate at first light, guided by an archaeologist who has spent decades on the rock. Breakfast at the summit, descent past the empty water gardens.",
    image: "https://images.unsplash.com/photo-1588258524675-3fa3cb1052bd?auto=format&fit=crop&w=1600&q=80",
    location: "Sigiriya",
    duration: "4 hours",
    category: "Cultural",
  },
  {
    slug: "leopard-tracker-yala",
    name: "Leopard tracker private safari",
    short: "Two safaris with Yala's most respected tracker.",
    description:
      "A private jeep, the park's most decorated tracker, and a route designed to avoid the tour-bus circuits. Dawn or dusk — preferably both.",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1600&q=80",
    location: "Yala",
    duration: "Full day",
    category: "Wildlife",
  },
  {
    slug: "tea-master-tasting",
    name: "Tea master's private tasting",
    short: "Cup with one of Ceylon's most respected tasters.",
    description:
      "A private session inside a working tea factory. Six estates, twelve cups, the kind of conversation that changes how you drink tea forever.",
    image: "https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=1600&q=80",
    location: "Hatton",
    duration: "2 hours",
    category: "Culinary",
  },
  {
    slug: "blue-whale-charter",
    name: "Private blue whale charter",
    short: "Out to the trench in your own boat.",
    description:
      "Skip the convoys. We charter a small, fast catamaran with a marine biologist on board and head out to the deeper water where the convoys cannot follow.",
    image: "https://images.unsplash.com/photo-1559688636-72fe51adcde1?auto=format&fit=crop&w=1600&q=80",
    location: "Mirissa",
    duration: "Half day",
    category: "Wildlife",
  },
  {
    slug: "ayurveda-mornings",
    name: "Ayurveda morning ritual",
    short: "A 5,000-year-old reset, for two.",
    description:
      "Private consultation with a senior Ayurvedic physician, followed by a couple's abhyanga and shirodhara in an open-air pavilion above the sea.",
    image: "https://images.unsplash.com/photo-1583072117121-1c3ea58c5f1c?auto=format&fit=crop&w=1600&q=80",
    location: "Galle / Tangalle",
    duration: "3 hours",
    category: "Wellness",
  },
  {
    slug: "cooking-with-grandmothers",
    name: "Cooking with grandmothers",
    short: "Home kitchen, six curries, no shortcuts.",
    description:
      "A morning at the home of a village family, learning the curries they have cooked for sixty years. Lunch on the verandah with the whole house at the table.",
    image: "https://images.unsplash.com/photo-1604908554156-9b6c83c5a4a4?auto=format&fit=crop&w=1600&q=80",
    location: "Hill Country",
    duration: "5 hours",
    category: "Culinary",
  },
  {
    slug: "galle-rampart-sunset",
    name: "Galle Fort rampart walk",
    short: "Golden hour on the most photogenic ramparts in Asia.",
    description:
      "A private historian walks you from the lighthouse to the Flag Rock as the sun drops. We finish at a quiet rooftop with cocktails as the call to prayer drifts across the bay.",
    image: "https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=1600&q=80",
    location: "Galle",
    duration: "2 hours",
    category: "Cultural",
  },
  {
    slug: "knuckles-trek",
    name: "Knuckles range overnight",
    short: "Cloud-forest trek with a mountain camp.",
    description:
      "Two days walking through the cardamom-scented Knuckles range, with an overnight in a hand-built mountain camp pitched on a high ridge.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80",
    location: "Knuckles",
    duration: "2 days",
    category: "Adventure",
  },
];
