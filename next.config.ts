import type { NextConfig } from "next";

/** GitHub project pages live under /<repo>; set BASE_PATH in CI (e.g. /ciao_travels). */
const rawBase = process.env.BASE_PATH?.trim();
const basePath =
  rawBase && rawBase !== "/"
    ? rawBase.startsWith("/")
      ? rawBase
      : `/${rawBase}`
    : undefined;

const nextConfig: NextConfig = {
  ...(basePath
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  reactStrictMode: true,
  images: {
    unoptimized: Boolean(basePath),
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
