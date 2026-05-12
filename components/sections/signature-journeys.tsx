import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedJourneys } from "@/content/journeys";
import {
  SectionTransition,
  Stagger,
  StaggerItem,
  ParallaxMedia,
  Reveal,
  MagneticButton,
} from "@/components/motion";
import { Button } from "@/components/ui/button";

const featured = getFeaturedJourneys();

export function SignatureJourneys() {
  return (
    <section
      aria-labelledby="journeys-heading"
      className="relative py-32 sm:py-40 lg:py-48"
    >
      <div className="container-luxe">
        <SectionTransition
          eyebrow="Signature journeys"
          title={"Itineraries we have\nlived ourselves."}
          emphasis={["ourselves"]}
          intro="Every journey here has been walked, slept and tasted by our team. None of them is set in stone — they're starting points for a private itinerary, tailored entirely around you."
          side={
            <Link
              href="/journeys"
              className="link-underline inline-block text-[0.7rem] uppercase tracking-[0.32em] text-foreground/80"
            >
              Browse every route
            </Link>
          }
        />

        <Stagger
          as="ul"
          className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-20"
          staggerChildren={0.14}
        >
          {featured.map((j, i) => (
            <StaggerItem
              key={j.slug}
              as="li"
              className="group relative flex h-full flex-col"
            >
              <Link
                href={`/journeys/${j.slug}`}
                className="focus-ring block rounded-xl"
                aria-label={`Read the ${j.name} itinerary`}
              >
                <ParallaxMedia
                  speed={0.25}
                  className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card"
                >
                  <Image
                    src={j.cover}
                    alt={j.coverAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1800ms] ease-luxury group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.05] transition-colors duration-700 group-hover:ring-gold/25" />

                  <div className="absolute left-5 top-5 flex items-center gap-3">
                    <span className="number-tag !text-cream/65">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-cream/30" />
                    <span className="text-[0.58rem] uppercase tracking-[0.28em] font-medium text-cream/65">
                      {j.category}
                    </span>
                  </div>

                  <div className="absolute bottom-5 right-5 inline-grid h-12 w-12 place-items-center rounded-full border border-cream/30 text-cream transition-all duration-700 ease-out group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </ParallaxMedia>
              </Link>

              <div className="mt-7 flex flex-1 flex-col">
                <p className="text-[0.6rem] uppercase tracking-[0.28em] font-medium text-muted-foreground">
                  {j.durationLabel} · {j.pace} pace
                </p>
                <h3 className="mt-4 font-display text-3xl tracking-tight text-foreground">
                  <Link href={`/journeys/${j.slug}`} className="link-underline">
                    {j.name}
                  </Link>
                </h3>
                <p className="mt-3 text-pretty text-[0.95rem] leading-[1.65] text-muted-foreground">
                  {j.tagline}
                </p>

                <ul className="mt-5 space-y-2 text-[0.85rem] text-muted-foreground/90">
                  {j.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex items-end justify-between gap-4 border-t border-border pt-6">
                  <p className="text-sm">
                    <span className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                      From
                    </span>
                    <br />
                    <span className="font-display text-xl text-foreground">
                      ${j.priceFrom.toLocaleString()}
                    </span>
                    <span className="ml-1 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                      / guest
                    </span>
                  </p>
                  <Link
                    href={`/journeys/${j.slug}`}
                    className="link-underline text-[0.7rem] uppercase tracking-[0.28em] text-gold"
                  >
                    Read itinerary
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-24 flex flex-col items-center gap-6 text-center">
            <p className="font-display text-xl text-foreground sm:text-2xl">
              None quite right?
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Every journey we craft is bespoke. Tell us how you travel and we'll design
              one entirely your own — within forty-eight hours.
            </p>
            <MagneticButton>
              <Button asChild size="lg" variant="outline">
                <Link href="/plan">Design my private journey</Link>
              </Button>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
