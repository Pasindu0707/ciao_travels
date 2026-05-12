import type { Metadata } from "next";
import { siteConfig } from "./site";

interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  keywords?: string[];
}

export function buildMetadata(opts: SeoOptions = {}): Metadata {
  const title = opts.title
    ? `${opts.title} — ${siteConfig.shortName}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const description = opts.description ?? siteConfig.description;
  const url = opts.path ? `${siteConfig.url}${opts.path}` : siteConfig.url;
  const image = opts.image ?? `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords: opts.keywords ?? [
      "Sri Lanka luxury travel",
      "Ceylon tours",
      "private guide Sri Lanka",
      "tea country",
      "Yala safari",
      "Sigiriya",
      "Galle",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ciaoceylon",
    },
    robots: opts.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
  };
}

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
      addressCountry: "LK",
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function jsonLdWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/journeys?q={query}`,
      "query-input": "required name=query",
    },
  };
}

export function jsonLdTrip(input: {
  name: string;
  description: string;
  image: string;
  url: string;
  duration: string;
  price?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: input.name,
    description: input.description,
    image: input.image,
    url: input.url,
    itinerary: { "@type": "ItemList" },
    provider: { "@type": "TravelAgency", name: siteConfig.name, url: siteConfig.url },
    ...(input.price && {
      offers: {
        "@type": "Offer",
        price: input.price,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export function jsonLdArticle(input: {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedAt: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.publishedAt,
    author: { "@type": "Person", name: input.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.svg` },
    },
    mainEntityOfPage: input.url,
  };
}

export function jsonLdBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
