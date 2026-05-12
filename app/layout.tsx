import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontDisplay, fontSerif, fontSans } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { buildMetadata, jsonLdOrganization, jsonLdWebsite } from "@/lib/seo";

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5EFE0" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1F26" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSerif.variable} ${fontSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite()) }}
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
