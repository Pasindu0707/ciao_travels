"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MAP_HOTSPOTS, type MapHotspot } from "@/content/map-hotspots";
import { getJourneyBySlug } from "@/content/journeys";
import { luxuryEase, D } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { SectionTransition } from "@/components/motion";
import { cn } from "@/lib/utils";

const SRI_LANKA_PATH =
  "M520 80 C570 90 605 130 615 180 C625 220 650 250 660 285 C672 325 685 360 695 400 C708 445 720 495 715 540 C708 580 690 615 670 645 C650 680 625 710 600 740 C575 775 545 800 510 815 C470 832 425 838 395 822 C365 805 345 770 335 735 C320 690 312 645 305 600 C300 555 296 510 305 465 C315 415 335 370 355 325 C375 285 395 250 425 215 C455 175 475 130 495 100 C505 85 512 80 520 80 Z";

function DestinationCardContent({
  spot,
  compact,
}: {
  spot: MapHotspot;
  compact?: boolean;
}) {
  const journey = getJourneyBySlug(spot.linkedJourneySlug);

  return (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={spot.image}
          alt={spot.imageAlt}
          fill
          sizes="(max-width: 1024px) 90vw, 45vw"
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
          <p className="text-[0.58rem] uppercase tracking-[0.28em] text-cream/70">{spot.name}</p>
          <p className="mt-1 font-display text-2xl tracking-tight text-cream sm:text-3xl">
            {spot.moodLine}
          </p>
        </div>
      </div>

      <div className={cn("space-y-5", compact ? "p-5 sm:p-6" : "p-6 sm:p-8")}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[0.58rem] uppercase tracking-[0.26em] text-muted-foreground">
              Best for
            </dt>
            <dd className="mt-1.5 text-sm leading-snug text-foreground">{spot.bestFor}</dd>
          </div>
          <div>
            <dt className="text-[0.58rem] uppercase tracking-[0.26em] text-muted-foreground">
              Ideal duration
            </dt>
            <dd className="mt-1.5 font-display text-lg text-foreground">{spot.idealDuration}</dd>
          </div>
        </dl>

        {journey && (
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
            <p className="text-[0.58rem] uppercase tracking-[0.26em] text-muted-foreground">
              Linked journey
            </p>
            <p className="mt-1 font-display text-lg tracking-tight text-foreground">{journey.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{journey.tagline}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          {journey && (
            <Link
              href={`/journeys/${journey.slug}`}
              className="group inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-gold transition-colors hover:text-gold/90"
            >
              View itinerary
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          )}
          {spot.destinationPageSlug && (
            <Link
              href={`/destinations/${spot.destinationPageSlug}`}
              className="link-underline text-[0.68rem] uppercase tracking-[0.28em] text-foreground/75"
            >
              Explore {spot.name}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export function SriLankaMap() {
  const uid = React.useId();
  const reduced = useReducedMotion();
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  const [activeId, setActiveId] = React.useState<string>(MAP_HOTSPOTS[0]?.id ?? "sigiriya");

  const activeIndex = React.useMemo(
    () => MAP_HOTSPOTS.findIndex((h) => h.id === activeId),
    [activeId]
  );

  const active = MAP_HOTSPOTS.find((h) => h.id === activeId) ?? MAP_HOTSPOTS[0];

  /* Carousel scroll → selection (mobile) */
  React.useEffect(() => {
    const root = carouselRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-map-card]"));
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.55)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.getAttribute("data-hotspot-id");
        if (id) setActiveId(id);
      },
      { root, rootMargin: "0px", threshold: [0.55, 0.65, 0.75] }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Map / dots → centre carousel on mobile */
  React.useEffect(() => {
    const node = cardRefs.current.get(activeId);
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!node || !mq.matches) return;
    node.scrollIntoView({ behavior: reduced ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [activeId, reduced]);

  const focusHotspotByIndex = React.useCallback((index: number) => {
    const len = MAP_HOTSPOTS.length;
    const next = ((index % len) + len) % len;
    const id = MAP_HOTSPOTS[next].id;
    setActiveId(id);
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-hotspot-focus="${id}"]`)?.focus();
    });
  }, []);

  const onMapAreaKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const mapFocus = (e.target as HTMLElement).closest("[data-map-hotspot]");
      if (!mapFocus) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        focusHotspotByIndex(activeIndex + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        focusHotspotByIndex(activeIndex - 1);
      }
    },
    [activeIndex, focusHotspotByIndex]
  );

  const gradLand = `map-land-${uid}`;
  const gradPulse = `map-pulse-${uid}`;

  return (
    <section
      aria-labelledby="map-heading"
      className="relative overflow-hidden bg-card/30 py-32 sm:py-40 lg:py-48"
      onKeyDown={onMapAreaKeyDown}
    >
      <div className="absolute inset-0 bg-grid-faint opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, hsl(var(--background) / 0.65) 0%, transparent 72%)",
        }}
      />

      <div className="container-luxe relative">
        <h2 id="map-heading" className="sr-only">
          Interactive map of Sri Lanka — seven destinations
        </h2>

        <p className="sr-only" aria-live="polite">
          Selected destination: {active.name}. {active.moodLine}
        </p>

        <SectionTransition
          eyebrow="The island, plotted"
          title={"One country.\nSeven chapters."}
          emphasis={["Seven"]}
          intro="Hover or focus a point on the map — or swipe the cards on mobile. Each chapter links to a signature journey you can shape around your dates."
          align="center"
          hairline
        />

        {/* One SVG for all breakpoints — avoids duplicate tab stops */}
        <div className="mt-20 flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16 xl:gap-24">
          <MapSvg
            gradLand={gradLand}
            gradPulse={gradPulse}
            activeId={activeId}
            onSelect={setActiveId}
            reduced={reduced}
          />

          {/* Desktop / large tablet: detail card */}
          <div className="relative hidden min-h-[420px] lg:block">
            <AnimatePresence mode="wait">
              {active && (
                <motion.article
                  key={active.id}
                  initial={
                    reduced ? { opacity: 0 } : { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" }
                  }
                  animate={
                    reduced ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }
                  }
                  exit={
                    reduced ? { opacity: 0 } : { opacity: 0, y: -12, clipPath: "inset(100% 0 0 0)" }
                  }
                  transition={{ duration: reduced ? 0.15 : D.slow, ease: luxuryEase }}
                  className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
                  aria-labelledby={`map-card-title-${active.id}`}
                >
                  <div className="sr-only" id={`map-card-title-${active.id}`}>
                    {active.name}
                  </div>
                  <DestinationCardContent spot={active} />
                </motion.article>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet: horizontal cards */}
        <div className="mt-10 lg:hidden">
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:thin]"
            style={{ scrollPaddingInline: "1.25rem" }}
            role="region"
            aria-roledescription="carousel"
            aria-label="Destination highlights"
          >
            {MAP_HOTSPOTS.map((spot) => (
              <motion.div
                key={spot.id}
                data-map-card
                data-hotspot-id={spot.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(spot.id, el);
                  else cardRefs.current.delete(spot.id);
                }}
                initial={false}
                animate={{
                  opacity: spot.id === activeId ? 1 : 0.88,
                  scale: spot.id === activeId ? 1 : 0.985,
                }}
                transition={{ duration: reduced ? 0 : 0.35, ease: luxuryEase }}
                className={cn(
                  "min-w-[min(100%,22rem)] shrink-0 snap-center snap-always overflow-hidden rounded-xl border bg-card shadow-soft transition-[border-color,box-shadow]",
                  spot.id === activeId
                    ? "border-gold/40 shadow-[0_20px_50px_-24px_hsl(var(--gold)/0.35)]"
                    : "border-border"
                )}
              >
                <DestinationCardContent spot={spot} compact />
              </motion.div>
            ))}
          </div>

          <div
            className="mt-6 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Choose destination"
          >
            {MAP_HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                type="button"
                role="tab"
                aria-selected={spot.id === activeId}
                tabIndex={0}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-luxury",
                  spot.id === activeId ? "w-10 bg-gold" : "w-2 bg-foreground/20 hover:bg-foreground/35"
                )}
                onClick={() => {
                  setActiveId(spot.id);
                  cardRefs.current.get(spot.id)?.scrollIntoView({
                    behavior: reduced ? "auto" : "smooth",
                    inline: "center",
                  });
                }}
                aria-label={`Show ${spot.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSvg({
  gradLand,
  gradPulse,
  activeId,
  onSelect,
  reduced,
}: {
  gradLand: string;
  gradPulse: string;
  activeId: string;
  onSelect: (id: string) => void;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 1.2, ease: luxuryEase }}
      className="relative mx-auto w-full max-w-[520px] lg:mx-0"
    >
      <svg
        viewBox="200 60 600 800"
        className="h-auto w-full drop-shadow-sm"
        role="img"
        aria-label="Simplified map outline of Sri Lanka with selectable destination markers"
      >
        <title>Sri Lanka destination map</title>
        <defs>
          <radialGradient id={gradLand} cx="50%" cy="38%" r="72%">
            <stop offset="0%" stopColor="hsl(var(--gold) / 0.22)" />
            <stop offset="50%" stopColor="hsl(var(--gold) / 0.07)" />
            <stop offset="100%" stopColor="hsl(var(--gold) / 0)" />
          </radialGradient>
          <radialGradient id={gradPulse} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--gold) / 0.35)" />
            <stop offset="100%" stopColor="hsl(var(--gold) / 0)" />
          </radialGradient>
        </defs>

        <path
          d={SRI_LANKA_PATH}
          fill={`url(#${gradLand})`}
          stroke="hsl(var(--gold))"
          strokeWidth={1}
          strokeOpacity={0.42}
          strokeDasharray="3 6"
          className="transition-colors dark:stroke-opacity-60"
        />
        <path
          d={SRI_LANKA_PATH}
          fill="none"
          stroke="hsl(var(--foreground) / 0.09)"
          strokeWidth={1}
        />

        {MAP_HOTSPOTS.map((spot) => (
          <HotspotMarker
            key={spot.id}
            spot={spot}
            isActive={activeId === spot.id}
            gradPulse={gradPulse}
            onSelect={() => onSelect(spot.id)}
            reduced={reduced}
          />
        ))}
      </svg>
    </motion.div>
  );
}

function HotspotMarker({
  spot,
  isActive,
  gradPulse,
  onSelect,
  reduced,
}: {
  spot: MapHotspot;
  isActive: boolean;
  gradPulse: string;
  onSelect: () => void;
  reduced: boolean;
}) {
  const { x, y } = spot.coordinates;

  return (
    <g data-map-hotspot data-hotspot-id={spot.id}>
      {!reduced && isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={34}
          fill={`url(#${gradPulse})`}
          initial={false}
          animate={{ opacity: [0.35, 0.62, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <g
        role="button"
        tabIndex={0}
        data-hotspot-focus={spot.id}
        aria-pressed={isActive}
        aria-label={`${spot.name}. ${spot.moodLine}.`}
        className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[8px] focus-visible:outline-gold"
        onMouseEnter={onSelect}
        onFocus={onSelect}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
      >
        {/* ≥44px touch / hit target */}
        <circle cx={x} cy={y} r={36} fill="transparent" />
        <circle
          cx={x}
          cy={y}
          r={isActive ? 17 : 10}
          fill="hsl(var(--gold) / 0.14)"
          stroke="hsl(var(--gold))"
          strokeWidth={1.15}
          className="transition-all duration-700 ease-luxury"
        />
        <circle cx={x} cy={y} r={3.8} fill="hsl(var(--gold))" />
      </g>

      <text
        x={x + 26}
        y={y + 5}
        fontSize={15}
        fill="hsl(var(--foreground))"
        fontFamily="var(--font-display)"
        className={cn(
          "pointer-events-none select-none transition-opacity duration-700",
          isActive ? "opacity-100" : "opacity-55"
        )}
      >
        {spot.name}
      </text>
    </g>
  );
}
