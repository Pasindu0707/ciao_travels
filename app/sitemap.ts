import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { journeys } from "@/content/journeys";
import { destinations } from "@/content/destinations";
import { journal } from "@/content/journal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/journeys",
    "/experiences",
    "/gallery",
    "/journal",
    "/faq",
    "/contact",
    "/plan",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.7,
  }));

  const journeyRoutes = journeys.map((j) => ({
    url: `${base}/journeys/${j.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journalRoutes = journal.map((p) => ({
    url: `${base}/journal/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...journeyRoutes, ...destinationRoutes, ...journalRoutes];
}
