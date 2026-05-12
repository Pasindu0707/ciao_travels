export interface FaqItem {
  question: string;
  answer: string;
  category: "Planning" | "Logistics" | "On the Ground" | "Money & Booking";
}

export const faqs: FaqItem[] = [
  {
    question: "How far in advance should I book my trip?",
    answer:
      "We design every itinerary from scratch, and the best hotels in Sri Lanka book out months in advance — especially for the December–March high season. For the busiest months, we ask for six to nine months. For most other times, three months is comfortable. We can move faster when needed.",
    category: "Planning",
  },
  {
    question: "What is the best time of year to visit?",
    answer:
      "Sri Lanka has two monsoons, which means there is always somewhere beautiful to be. December through March is ideal for the south and west coasts, the cultural triangle, and the hill country. April to September favours the east coast and the north. We always shape your itinerary around the weather, not against it.",
    category: "Planning",
  },
  {
    question: "Is the website pricing all-inclusive?",
    answer:
      "Our starting prices include private chauffeur-guide, accommodation, all park fees and entrance tickets, daily breakfast and a selection of signature meals, and the curated experiences listed in each itinerary. International flights, travel insurance and personal expenses are excluded.",
    category: "Money & Booking",
  },
  {
    question: "Do you only design private journeys?",
    answer:
      "Yes — every itinerary we craft is private and bespoke. We are not a tour operator and we do not run group departures. If you prefer to travel with friends or family, we are happy to design the journey around your group.",
    category: "Planning",
  },
  {
    question: "What kind of vehicles do you use?",
    answer:
      "Our standard vehicles are Toyota Premio sedans for couples and KDH high-roof vans for small groups. For premium itineraries we provide V8 Land Cruisers. Every vehicle is privately chartered and serviced regularly.",
    category: "Logistics",
  },
  {
    question: "Can you help with visas, flights, and travel insurance?",
    answer:
      "We can advise on visas (Sri Lanka offers a straightforward online ETA) and we are happy to coordinate with your preferred travel advisor on flights. We strongly recommend comprehensive travel insurance and can suggest reliable providers.",
    category: "Logistics",
  },
  {
    question: "What is the deposit and cancellation policy?",
    answer:
      "We hold your trip with a 30% deposit, with the balance due 60 days before arrival. Our cancellation policy is transparent and tiered, with no hidden fees. We are flexible about postponement when life intervenes.",
    category: "Money & Booking",
  },
  {
    question: "Do you accommodate dietary requirements?",
    answer:
      "Always. Sri Lankan cuisine is naturally vegetarian-friendly, and we work easily with vegan, gluten-free, kosher and halal requirements. Please share allergies in detail when we are designing your trip.",
    category: "On the Ground",
  },
  {
    question: "Is Sri Lanka safe to travel in right now?",
    answer:
      "Yes. Sri Lanka is one of South Asia's safest destinations for travellers, with low crime rates and warm hospitality. We monitor conditions continuously and adjust routes when needed. Our team is on call 24/7 during your trip.",
    category: "On the Ground",
  },
  {
    question: "How do you choose your hotels?",
    answer:
      "We stay everywhere we recommend. Our list is small, curated, and refreshed every season. We favour boutique heritage properties, tented camps, and family-run villas over the global chains — though we work with the best chains where they shine.",
    category: "Planning",
  },
];
