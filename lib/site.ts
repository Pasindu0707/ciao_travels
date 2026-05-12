const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ciaoceylon.com";

export const siteConfig = {
  name: "Ciao Ceylon Tours",
  shortName: "Ciao Ceylon",
  tagline: "Curated luxury journeys across Sri Lanka",
  description:
    "Ciao Ceylon Tours crafts private, cinematic itineraries through Sri Lanka's tea hills, ancient cities, wild coasts and quiet jungles — for travellers who prefer the road less photographed.",
  url: siteUrl,
  ogImage: "/og.jpg",
  locale: "en-US",
  contact: {
    email: "hello@ciaoceylon.com",
    phone: "+94 77 000 0000",
    whatsapp: "94770000000",
    address: "Galle Face Terrace, Colombo 03, Sri Lanka",
  },
  social: {
    instagram: "https://instagram.com/ciaoceylon",
    facebook: "https://facebook.com/ciaoceylon",
    pinterest: "https://pinterest.com/ciaoceylon",
    youtube: "https://youtube.com/@ciaoceylon",
  },
  nav: [
    { label: "Journeys", href: "/journeys" },
    { label: "Experiences", href: "/experiences" },
    { label: "Gallery", href: "/gallery" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const,
  footerNav: {
    explore: [
      { label: "Signature Journeys", href: "/journeys" },
      { label: "Experiences", href: "/experiences" },
      { label: "Destinations", href: "/journeys" },
      { label: "Gallery", href: "/gallery" },
      { label: "Journal", href: "/journal" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Plan a Trip", href: "/plan" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
    legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
