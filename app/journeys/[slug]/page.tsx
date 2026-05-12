import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Users, MapPin, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { journeys, getJourneyBySlug } from "@/content/journeys";
import { buildMetadata, jsonLdTrip, jsonLdBreadcrumb } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { FinalCta } from "@/components/sections/final-cta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const j = getJourneyBySlug(slug);
  if (!j) return buildMetadata({ title: "Journey not found", noindex: true });
  return buildMetadata({
    title: j.name,
    description: j.intro,
    path: `/journeys/${j.slug}`,
    image: j.hero,
  });
}

export default async function JourneyDetailPage({ params }: Props) {
  const { slug } = await params;
  const journey = getJourneyBySlug(slug);
  if (!journey) notFound();

  const currentIndex = journeys.findIndex((j) => j.slug === slug);
  const prev = journeys[(currentIndex - 1 + journeys.length) % journeys.length];
  const next = journeys[(currentIndex + 1) % journeys.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdTrip({
              name: journey.name,
              description: journey.intro,
              image: journey.hero,
              url: `${siteConfig.url}/journeys/${journey.slug}`,
              duration: journey.durationLabel,
              price: journey.priceFrom,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Home", url: siteConfig.url },
              { name: "Journeys", url: `${siteConfig.url}/journeys` },
              { name: journey.name, url: `${siteConfig.url}/journeys/${journey.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[90svh] w-full items-end overflow-hidden pb-16 pt-40">
        <Image src={journey.hero} alt={journey.coverAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 cinema-overlay" />
        <div className="absolute inset-0 -z-10 grain" />

        <div className="container-luxe w-full">
          <div className="flex items-center gap-3 text-cream/70">
            <Link href="/journeys" className="text-[0.65rem] uppercase tracking-[0.22em] hover:text-gold">
              ← All journeys
            </Link>
            <span className="text-cream/30">·</span>
            <span className="text-[0.65rem] uppercase tracking-[0.22em]">{journey.category}</span>
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-display-2xl text-cream">
            {journey.name}
          </h1>
          <p className="mt-4 text-base uppercase tracking-[0.22em] text-cream/70">
            {journey.subtitle}
          </p>
          <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-cream/85 sm:text-lg">
            {journey.intro}
          </p>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-6 border-y border-cream/15 py-6 lg:grid-cols-4">
            <HeroMeta icon={Clock} label="Duration" value={journey.durationLabel} />
            <HeroMeta icon={Users} label="Group" value={journey.groupSize} />
            <HeroMeta icon={MapPin} label="Pace" value={journey.pace} />
            <HeroMeta
              icon={() => <span className="text-gold">$</span>}
              label="From"
              value={`$${journey.priceFrom.toLocaleString()} / guest`}
            />
          </dl>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 sm:py-28">
        <div className="container-luxe grid gap-16 lg:grid-cols-[2fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Overview</p>
            <h2 className="mt-6 text-display-lg text-balance">{journey.tagline}</h2>
            <p className="mt-8 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {journey.description}
            </p>

            <Separator className="my-16" />

            <p className="eyebrow">Highlights</p>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {journey.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-base text-foreground">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <Separator className="my-16" />

            <p className="eyebrow">Day by day</p>
            <ol className="mt-10 space-y-12">
              {journey.itinerary.map((d) => (
                <li key={d.day} className="grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
                  <div className="lg:w-40">
                    <p className="number-tag">Day {String(d.day).padStart(2, "0")}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {d.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{d.title}</h3>
                    <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
                      {d.summary}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {d.details.map((det) => (
                        <li key={det} className="flex gap-3">
                          <span className="mt-2 h-px w-4 shrink-0 bg-gold" />
                          {det}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="glass-strong rounded-xl p-8">
              <p className="eyebrow">Plan this journey</p>
              <p className="mt-4 font-display text-3xl text-foreground">{journey.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{journey.durationLabel}</p>

              <p className="mt-8 text-sm">
                <span className="text-muted-foreground">From </span>
                <span className="font-display text-3xl text-foreground">
                  ${journey.priceFrom.toLocaleString()}
                </span>
                <span className="ml-1 text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
                  / guest
                </span>
              </p>

              <Button asChild size="lg" variant="primary" className="mt-8 w-full">
                <Link href="/plan">Enquire privately</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="mt-3 w-full">
                <Link href="/contact">Speak to a planner</Link>
              </Button>

              <Separator className="my-8" />

              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">Destinations</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {journey.destinations.map((d) => (
                  <Badge key={d} variant="outline" className="!normal-case !tracking-normal !text-xs">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Inclusions / Exclusions */}
      <section className="border-t border-border bg-card/30 py-20 sm:py-28">
        <div className="container-luxe grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow">What's included</p>
            <ul className="mt-8 space-y-4">
              {journey.inclusions.map((it) => (
                <li key={it} className="flex items-start gap-3 text-base">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-foreground">{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Not included</p>
            <ul className="mt-8 space-y-4">
              {journey.exclusions.map((it) => (
                <li key={it} className="flex items-start gap-3 text-base">
                  <X className="mt-1 h-4 w-4 shrink-0 text-foreground/30" />
                  <span className="text-muted-foreground">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Next / Prev */}
      <section className="py-20 sm:py-24">
        <div className="container-luxe grid gap-8 md:grid-cols-2">
          <Link href={`/journeys/${prev.slug}`} className="group rounded-xl border border-border p-8 transition-colors hover:border-gold/40">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              <ArrowLeft className="mr-2 inline h-3 w-3" /> Previous journey
            </p>
            <p className="mt-4 font-display text-2xl text-foreground group-hover:text-gold">{prev.name}</p>
          </Link>
          <Link href={`/journeys/${next.slug}`} className="group rounded-xl border border-border p-8 text-right transition-colors hover:border-gold/40">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              Next journey <ArrowRight className="ml-2 inline h-3 w-3" />
            </p>
            <p className="mt-4 font-display text-2xl text-foreground group-hover:text-gold">{next.name}</p>
          </Link>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

function HeroMeta({
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
      <dt className="mt-2 text-[0.6rem] uppercase tracking-[0.22em] text-cream/60">{label}</dt>
      <dd className="mt-1 text-sm text-cream">{value}</dd>
    </div>
  );
}
