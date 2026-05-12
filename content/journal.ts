export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  publishedAt: string;
  category: "Field Notes" | "Travel Guide" | "Conservation" | "Culture";
  readTime: string;
  cover: string;
  coverAlt: string;
}

export const journal: JournalPost[] = [
  {
    slug: "twelve-mornings-in-the-cultural-triangle",
    title: "Twelve mornings in the Cultural Triangle",
    excerpt:
      "A field journal from twelve consecutive sunrises spent in the heart of Sri Lanka's ancient kingdoms — what changes, and what doesn't.",
    body: "The first morning, the wind came off the tank before the light did, carrying the wet smell of the lotus. The second morning was the same, except for a single peacock calling from the far jungle. By the fourth, we had stopped naming what was different and started noticing what stayed the same. Sigiriya's rock kept its silence. The bicycles in Polonnaruwa kept their rust. Every morning the same monk swept the same step at Lankathilaka, and every morning he raised the same hand to us. We came looking for the kings; we left thinking about the sweeper.",
    author: "Tharindu Jayasuriya",
    publishedAt: "2026-03-08",
    category: "Field Notes",
    readTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Pre-dawn mist over the Cultural Triangle jungle",
  },
  {
    slug: "the-correct-way-to-drink-ceylon-tea",
    title: "The correct way to drink Ceylon tea",
    excerpt:
      "After twenty-three estates and one very patient master taster, a few things become very clear.",
    body: "First: throw out everything you have ever been told about black tea. Ceylon is not English breakfast and it is not Earl Grey. It is a high-altitude product made by humans, and it deserves to be treated like wine. Brew it short. Drink it without milk first. Pay attention to where the leaf came from — Uva is different from Dimbula is different from Nuwara Eliya. And, please, never reheat it.",
    author: "Imali Fernandopulle",
    publishedAt: "2026-02-22",
    category: "Travel Guide",
    readTime: "5 min read",
    cover:
      "https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Hands picking tea in the Sri Lankan hill country",
  },
  {
    slug: "an-afternoon-with-the-leopards-of-yala",
    title: "An afternoon with the leopards of Yala",
    excerpt:
      "Why we still send guests to Yala — and how we make sure the encounter is ethical.",
    body: "There are 11,000 km² of leopard habitat on this island and a hundred jeeps clustered around one rock. We do not believe in that kind of safari. So we take a different gate, a different route, a different time. Our trackers are paid better and tip less. They drive away from sightings, not toward them. The leopards we find are usually unbothered; sometimes we don't find any at all. Both are correct outcomes.",
    author: "Roshan Wijesuriya",
    publishedAt: "2026-01-30",
    category: "Conservation",
    readTime: "7 min read",
    cover:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "A leopard resting on a rock in Yala National Park",
  },
  {
    slug: "the-quiet-hotels-we-love-most",
    title: "The quiet hotels we love most",
    excerpt:
      "A note on the seven properties we send the most guests to — and the one we have stopped using.",
    body: "There is a kind of hotel we love: small enough that the manager knows your name, old enough to have stories, and run by someone who used to live somewhere else. We list seven of them here. There is also a property we have stopped using — beautiful on Instagram, exhausting in person. We don't name it, but if you ask us in person, we will.",
    author: "Chiara Marini",
    publishedAt: "2026-01-12",
    category: "Travel Guide",
    readTime: "8 min read",
    cover:
      "https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Boutique colonial hotel courtyard in Galle Fort",
  },
  {
    slug: "what-we-mean-by-luxury",
    title: "What we mean by luxury",
    excerpt:
      "A small manifesto. Soft towels and silent rooms — but, more than that, attention.",
    body: "Luxury, for us, is not the thread count. It is the thirty seconds someone takes to remember that you like a slice of lime in your soda. It is the umbrella left for you in the car. It is the second cup of coffee, poured without you asking. It is, more than anything, attention — paid quietly, paid often, paid without performance.",
    author: "Tharindu Jayasuriya",
    publishedAt: "2025-12-04",
    category: "Culture",
    readTime: "4 min read",
    cover:
      "https://images.unsplash.com/photo-1583072117121-1c3ea58c5f1c?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "A linen-draped table set for two beside a Sri Lankan beach",
  },
  {
    slug: "monsoons-explained",
    title: "Monsoons, explained — by someone who lives here",
    excerpt:
      "There is no such thing as a bad month in Sri Lanka. There are only better and worse halves of the island.",
    body: "The internet will tell you that Sri Lanka has a monsoon season. The internet is wrong. Sri Lanka has two monsoons — the yala (May–September) and the maha (October–January) — and they fall on different halves of the island. Which is to say: in any month of the year, half of Sri Lanka is beautiful. The trick is being on that half.",
    author: "Imali Fernandopulle",
    publishedAt: "2025-11-18",
    category: "Travel Guide",
    readTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1586804580207-1ce0b8731437?auto=format&fit=crop&w=2000&q=80",
    coverAlt: "Mist hanging over the tea hills near Ella",
  },
];

export function getJournalBySlug(slug: string) {
  return journal.find((p) => p.slug === slug);
}
