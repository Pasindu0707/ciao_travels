import { PageHero } from "@/components/shared/page-hero";
import { ExperiencesGrid } from "@/components/client/experiences-grid";
import { experiences } from "@/content/experiences";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Experiences",
  description:
    "Private, curated experiences across Sri Lanka — leopard tracking, tea master tastings, sunrise summits, whale charters and home-kitchen cooking classes.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experiences"
        title="The moments _you_ remember."
        intro="A library of curated experiences that we slot into private journeys — or arrange as standalone afternoons for guests who already have plans."
        image="https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=2880&q=85"
        imageAlt="Tea pluckers in the hill country at dawn"
      />

      <section className="py-20 sm:py-28">
        <div className="container-luxe">
          <ExperiencesGrid experiences={experiences} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
