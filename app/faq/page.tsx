import { PageHero } from "@/components/shared/page-hero";
import { FaqFilter } from "@/components/client/faq-filter";
import { faqs } from "@/content/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to the questions we are asked most often about planning a private luxury journey in Sri Lanka with Ciao Ceylon Tours.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked"
        title="Everything you'd think to _ask_."
        intro="And a few questions you might not yet — but probably will. Still unsure? A real planner replies within twenty-four hours."
        image="https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=2880&q=85"
        imageAlt="Galle Fort lighthouse at sunset"
      />

      <section className="py-20 sm:py-28">
        <div className="container-narrow">
          <FaqFilter faqs={faqs} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
