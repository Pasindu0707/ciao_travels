import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/content/destinations";
import {
  SectionTransition,
  Stagger,
  StaggerItem,
  ParallaxMedia,
} from "@/components/motion";
import { cn } from "@/lib/utils";

const featured = destinations.slice(0, 6);

export function DestinationGrid() {
  return (
    <section
      aria-labelledby="destinations-heading"
      className="relative py-32 sm:py-40 lg:py-48"
    >
      <div className="container-luxe">
        <SectionTransition
          eyebrow="Where to begin"
          title={"Six landscapes.\nOne teardrop island."}
          emphasis={["teardrop"]}
          intro="From ancient cities of the dry zone to the misted ridges of the tea country — every Sri Lankan region has its own light, its own pace, and its own best month to be visited."
          side={
            <div className="flex items-center gap-4 text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground">
              <span className="h-px w-8 bg-gold/60" />
              <span>06 regions · 27,000 km²</span>
            </div>
          }
        />

        <Stagger
          className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6"
          staggerChildren={0.12}
        >
          {featured.map((d, i) => (
            <StaggerItem
              key={d.slug}
              className={cn(
                "group relative",
                i === 0 && "lg:col-span-7 lg:row-span-2",
                i === 1 && "lg:col-span-5",
                i === 2 && "lg:col-span-5",
                i === 3 && "lg:col-span-4",
                i === 4 && "lg:col-span-4",
                i === 5 && "lg:col-span-4"
              )}
            >
              <Link
                href={`/destinations/${d.slug}`}
                className="focus-ring block h-full rounded-xl"
                aria-label={`Explore ${d.name}`}
              >
                <article
                  className={cn(
                    "relative h-full overflow-hidden rounded-xl bg-card",
                    i === 0
                      ? "min-h-[520px] lg:min-h-[680px]"
                      : "min-h-[300px] lg:min-h-[320px]"
                  )}
                >
                  <ParallaxMedia
                    speed={i === 0 ? 0.35 : 0.22}
                    className="absolute inset-0"
                  >
                    <Image
                      src={d.image}
                      alt={d.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      className="object-cover transition-transform duration-[1600ms] ease-luxury group-hover:scale-[1.04]"
                    />
                  </ParallaxMedia>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/10 transition-opacity duration-700 group-hover:from-black/90" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04] transition-colors duration-700 group-hover:ring-gold/30" />

                  <div className="absolute left-5 top-5 flex items-center gap-3 lg:left-7 lg:top-7">
                    <span className="number-tag !text-cream/65">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-cream/30" />
                    <span className="text-[0.6rem] uppercase tracking-[0.28em] font-medium text-cream/65">
                      {d.region}
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-9">
                    <div className="flex items-end justify-between gap-6">
                      <div className="min-w-0">
                        <h3
                          className={cn(
                            "font-display tracking-tight text-cream",
                            i === 0 ? "text-4xl lg:text-6xl" : "text-3xl lg:text-4xl"
                          )}
                        >
                          {d.name}
                        </h3>
                        <p
                          className={cn(
                            "mt-3 max-w-md text-balance font-light leading-snug text-cream/85",
                            i === 0 ? "text-base lg:text-lg" : "text-sm lg:text-base"
                          )}
                        >
                          {d.tagline}
                        </p>
                      </div>
                      <span className="inline-grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cream/30 text-cream transition-all duration-700 ease-out group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal lg:h-14 lg:w-14">
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-20 flex flex-col items-center gap-5">
          <Link
            href="/journeys"
            className="link-underline text-[0.7rem] uppercase tracking-[0.32em] text-foreground/80"
          >
            View every region
          </Link>
          <p className="max-w-md text-center text-xs text-muted-foreground/80">
            Each destination is paired with a private journey — or composed into one
            entirely your own.
          </p>
        </div>
      </div>
    </section>
  );
}
