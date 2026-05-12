import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin, Calendar, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/content/destinations";
import { journeys } from "@/content/journeys";
import { buildMetadata, jsonLdBreadcrumb } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { FinalCta } from "@/components/sections/final-cta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const d = destinations.find((x) => x.slug === slug);
  if (!d) return buildMetadata({ title: "Destination not found", noindex: true });
  return buildMetadata({
    title: d.name,
    description: d.description,
    path: `/destinations/${d.slug}`,
    image: d.image,
  });
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((d) => d.slug === slug);
  if (!destination) notFound();

  const relatedJourneys = journeys.filter((j) =>
    j.destinations.some((dest) => dest.toLowerCase().includes(destination.name.toLowerCase()))
  );

  const ALL_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Home", url: siteConfig.url },
              { name: "Destinations", url: `${siteConfig.url}/journeys` },
              { name: destination.name, url: `${siteConfig.url}/destinations/${destination.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[90svh] w-full items-end overflow-hidden pb-16 pt-40">
        <Image
          src={destination.image}
          alt={destination.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 cinema-overlay" />
        <div className="absolute inset-0 -z-10 grain" />

        <div className="container-luxe w-full">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-cream/70">
            {destination.region}
          </p>
          <h1 className="mt-4 font-display text-display-2xl text-cream">{destination.name}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-cream/85">
            {destination.tagline}
          </p>
        </div>
      </section>

      {/* Intro + meta */}
      <section className="py-20 sm:py-28">
        <div className="container-luxe grid gap-16 lg:grid-cols-[2fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">About {destination.name}</p>
            <h2 className="mt-6 max-w-3xl text-display-lg text-balance">
              {destination.description}
            </h2>
            <p className="mt-10 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {destination.longDescription}
            </p>

            <p className="eyebrow mt-16">Why we send guests here</p>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {destination.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-base text-foreground">
                  <span className="mt-2 h-px w-5 shrink-0 bg-gold" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-xl border border-border bg-card/50 p-8">
              <p className="eyebrow">Quick facts</p>
              <dl className="mt-6 space-y-6">
                <Fact icon={MapPin} label="Region" value={destination.region} />
                <Fact icon={Car} label="From Colombo" value={destination.drivingFromColombo} />
                <Fact icon={Calendar} label="Best months" value="" />
              </dl>

              <div className="mt-3 grid grid-cols-6 gap-1">
                {ALL_MONTHS.map((m) => {
                  const ok = destination.bestMonths.includes(m);
                  return (
                    <span
                      key={m}
                      className={`rounded-md py-1.5 text-center text-[0.6rem] uppercase tracking-[0.18em] ${
                        ok
                          ? "bg-gold/15 text-gold border border-gold/40"
                          : "border border-border text-muted-foreground/50"
                      }`}
                    >
                      {m}
                    </span>
                  );
                })}
              </div>

              <Button asChild size="lg" variant="primary" className="mt-8 w-full">
                <Link href="/plan">Include in my journey</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Gallery */}
      {destination.gallery.length > 0 && (
        <section className="border-t border-border py-20 sm:py-28">
          <div className="container-luxe">
            <p className="eyebrow">Field gallery</p>
            <h2 className="mt-6 max-w-2xl text-display-md text-balance">
              {destination.name}, in pictures.
            </h2>

            <div className="mt-16 grid gap-4 md:grid-cols-3 lg:gap-6">
              {destination.gallery.map((g, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl bg-card ${
                    i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related journeys */}
      {relatedJourneys.length > 0 && (
        <section className="border-t border-border bg-card/30 py-20 sm:py-28">
          <div className="container-luxe">
            <p className="eyebrow">Journeys that include {destination.name}</p>
            <h2 className="mt-6 text-display-md text-balance">
              Travel here, with us.
            </h2>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedJourneys.slice(0, 3).map((j) => (
                <Link
                  key={j.slug}
                  href={`/journeys/${j.slug}`}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={j.cover}
                      alt={j.coverAlt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1400ms] ease-luxury group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.22em] text-cream/70">
                          {j.durationLabel}
                        </p>
                        <h3 className="mt-2 font-display text-xl text-cream">{j.name}</h3>
                      </div>
                      <span className="inline-grid h-10 w-10 place-items-center rounded-full border border-cream/40 text-cream transition-all group-hover:bg-gold group-hover:border-gold group-hover:text-charcoal">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-1 h-4 w-4 text-gold" />
      <div>
        <dt className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</dt>
        {value && <dd className="mt-1 text-sm text-foreground">{value}</dd>}
      </div>
    </div>
  );
}
