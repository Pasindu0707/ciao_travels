import { Hero } from "@/components/sections/hero";
import { TrustRail } from "@/components/sections/trust-rail";
import { DestinationGrid } from "@/components/sections/destination-grid";
import { SriLankaMap } from "@/components/sections/sri-lanka-map";
import { SignatureJourneys } from "@/components/sections/signature-journeys";
import { ScrollStory } from "@/components/sections/scroll-story";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { PlanningTimeline } from "@/components/sections/planning-timeline";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { JournalPreview } from "@/components/sections/journal-preview";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sri Lanka, tailored with soul",
  description:
    "Private, locally led journeys through ancient kingdoms, misty tea country, wild safaris and golden coastlines — crafted by Ciao Ceylon Tours.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustRail />
      <DestinationGrid />
      <SriLankaMap />
      <SignatureJourneys />
      <ScrollStory />
      <WhyUs />
      <Testimonials />
      <PlanningTimeline />
      <GalleryPreview />
      <JournalPreview />
      <FaqSection />
      <FinalCta />
    </>
  );
}
