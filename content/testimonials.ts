export interface Testimonial {
  quote: string;
  author: string;
  origin: string;
  trip: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We have travelled with every name you'd recognise. Ciao Ceylon is the first agency in years that surprised us — quietly, repeatedly, for twelve days straight.",
    author: "Margaux & Henri Dufort",
    origin: "Paris",
    trip: "The Ceylon Classic",
    rating: 5,
  },
  {
    quote:
      "Nuwan, our chauffeur, became the trip. He knew which tea estate served the best curd at 4pm and which beach was empty on a Thursday. Faultless.",
    author: "Sophie Carrington",
    origin: "London",
    trip: "Tea & Temples",
    rating: 5,
  },
  {
    quote:
      "Two leopards on the second drive. Then a sloth bear with cubs. Our tracker barely spoke and somehow knew everything. The best wildlife trip of our lives.",
    author: "James & Aiko Pierce",
    origin: "Tokyo",
    trip: "Wild Ceylon",
    rating: 5,
  },
  {
    quote:
      "The candlelit dinner on the sandbar — we still talk about it. They didn't tell us in advance. They just arranged it. The whole trip was full of these moments.",
    author: "Liam & Noor Karim",
    origin: "Dubai",
    trip: "Honeymoon in Ceylon",
    rating: 5,
  },
  {
    quote:
      "Travelled with three teenagers — usually a tactical nightmare. Ciao Ceylon read them perfectly. They came home talking about Sri Lanka, not their phones.",
    author: "The Ngyuen Family",
    origin: "Sydney",
    trip: "Family Ceylon",
    rating: 5,
  },
  {
    quote:
      "The hotels were exceptional, but it was the small things — the cardamom in the morning tea, the umbrella in the back of the car — that made it luxurious.",
    author: "Eleanor Whitford",
    origin: "New York",
    trip: "The Ceylon Classic",
    rating: 5,
  },
];

export const trustLogos = [
  "Condé Nast Traveler",
  "Travel + Leisure",
  "Wallpaper*",
  "Robb Report",
  "Forbes Travel Guide",
  "Vogue",
  "Tatler",
  "Monocle",
];
