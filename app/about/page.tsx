import Image from "next/image";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Ciao Ceylon Tours is a small house of travel planners, drivers and concierges based in Colombo — designing private journeys across Sri Lanka since 2014.",
  path: "/about",
});

const TEAM = [
  {
    name: "Tharindu Jayasuriya",
    role: "Founder & lead planner",
    bio: "Born in Kandy. Trained in hospitality in Geneva. Has slept in every hotel on our list — usually twice.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Imali Fernandopulle",
    role: "Hill country specialist",
    bio: "Grew up on a tea estate in Hatton. Knows which factory makes the best Uva, and which planter still grows real cardamom.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Chiara Marini",
    role: "Concierge lead",
    bio: "Half-Italian, half-Sri Lankan. Has answered the phone at 3am, in three languages, more times than she will admit.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Roshan Wijesuriya",
    role: "Wildlife & wilderness",
    bio: "A field biologist who has spent more time in Yala than most leopards. Knows every tracker by name.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small house, _by_ design."
        intro="Ciao Ceylon was founded in 2014 by a Sri Lankan hotelier who'd grown tired of selling the country in three-day packages. We've stayed small ever since — and we plan to keep it that way."
        image="https://images.unsplash.com/photo-1605649461784-4f51b5cdc97a?auto=format&fit=crop&w=2880&q=85"
        imageAlt="Galle Fort streets at golden hour"
      />

      {/* Manifesto */}
      <section className="py-24 sm:py-32 lg:py-40">
        <div className="container-narrow">
          <p className="eyebrow">Our quiet manifesto</p>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <h2 className="text-display-md text-balance lg:text-display-lg">
              We believe luxury is <em className="font-serif italic text-gold">attention</em>,
              not abundance.
            </h2>
            <div className="space-y-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                The travel industry is loud. It moves quickly, it sells aggressively, and it
                often confuses size with success. We have built Ciao Ceylon to be the opposite
                of all those things.
              </p>
              <p>
                We accept a limited number of journeys each year. Our team is small enough that
                you&apos;ll meet most of them. Every itinerary is drafted from scratch, every hotel
                personally inspected, every guide chosen by hand.
              </p>
              <p>
                Sri Lanka is a small country. We think it deserves to be travelled slowly. We
                hope, after a trip with us, you&apos;ll agree.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image triptych */}
      <section className="container-luxe pb-24 sm:pb-32">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            "https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1583072117121-1c3ea58c5f1c?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=85",
          ].map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl ${
                i === 1 ? "aspect-[3/4] sm:row-span-2 sm:translate-y-12" : "aspect-[3/4]"
              }`}
            >
              <Image src={src} alt="Sri Lanka editorial moments" fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 sm:py-32 lg:py-40 border-t border-border bg-card/30">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The team"
            title={<>The people <em className="font-serif italic text-gold">behind</em> your trip.</>}
            intro="Twelve full-time planners, twenty-two long-serving chauffeur-guides, four field naturalists. You'll meet most of them in person."
            align="center"
          />

          <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {TEAM.map((p, i) => (
              <article key={p.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card">
                  <Image
                    src={p.image}
                    alt={`Portrait of ${p.name}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-[1400ms] ease-luxury group-hover:grayscale-0 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-6 number-tag">0{i + 1}</p>
                <h3 className="mt-2 font-display text-2xl text-foreground">{p.name}</h3>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {p.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="By the numbers"
            title="Quietly, for over a decade."
            align="center"
          />
          <div className="mt-16 grid grid-cols-2 gap-12 lg:grid-cols-4">
            {[
              { n: "2014", l: "Founded in Colombo" },
              { n: "380+", l: "Private journeys" },
              { n: "38", l: "Countries served" },
              { n: "98%", l: "Return guests" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display text-display-md text-foreground">{s.n}</p>
                <p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FinalCta />
    </>
  );
}
