import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Users, MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { journeys } from "@/content/journeys";
import { FinalCta } from "@/components/sections/final-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Signature Journeys",
  description:
    "Private, curated travel journeys across Sri Lanka — from the Cultural Triangle to the south coast, designed by planners who have travelled every route.",
  path: "/journeys",
});

export default function JourneysPage() {
  return (
    <>
      <PageHero
        eyebrow="Signature journeys"
        title="Itineraries we have _lived_."
        intro="A selection of our most loved private journeys. Each one is a starting point — to be refined entirely around the way you travel."
        image="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2880&q=85"
        imageAlt="Pre-dawn view of the Sri Lankan jungle"
      />

      <section className="py-20 sm:py-28">
        <div className="container-luxe">
          <ul className="flex flex-col gap-16 lg:gap-24">
            {journeys.map((j, i) => (
              <li key={j.slug}>
                <article className="group grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Link
                    href={`/journeys/${j.slug}`}
                    className={`relative block aspect-[4/5] overflow-hidden rounded-xl bg-card ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={j.cover}
                      alt={j.coverAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1400ms] ease-luxury group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute left-6 top-6 flex items-center gap-3">
                      <span className="number-tag !text-cream/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.6rem] uppercase tracking-[0.22em] text-cream/80">
                        {j.category}
                      </span>
                    </div>
                  </Link>

                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {j.subtitle}
                    </p>
                    <h2 className="mt-4 font-display text-display-md text-foreground lg:text-display-lg">
                      <Link href={`/journeys/${j.slug}`} className="link-underline">
                        {j.name}
                      </Link>
                    </h2>
                    <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                      {j.intro}
                    </p>

                    {/* Meta */}
                    <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
                      <Meta icon={Clock} label="Duration" value={j.durationLabel} />
                      <Meta icon={Users} label="Group" value={j.groupSize} />
                      <Meta icon={MapPin} label="Pace" value={j.pace} />
                    </dl>

                    {/* Highlights */}
                    <ul className="mt-6 space-y-2 text-sm">
                      {j.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex gap-3 text-muted-foreground">
                          <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 flex items-center justify-between">
                      <p className="text-sm">
                        <span className="text-muted-foreground">From </span>
                        <span className="font-display text-2xl text-foreground">
                          ${j.priceFrom.toLocaleString()}
                        </span>
                        <span className="ml-1 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                          / guest
                        </span>
                      </p>
                      <Link
                        href={`/journeys/${j.slug}`}
                        className="group/btn inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-gold"
                      >
                        See itinerary
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:rotate-45" />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <Icon className="h-4 w-4 text-gold" />
      <dt className="mt-2 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}
