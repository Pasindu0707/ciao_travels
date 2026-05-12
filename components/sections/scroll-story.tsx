"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTransition } from "@/components/motion";
import { useMediaQuery } from "@/lib/hooks";

const STORY = [
  {
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2400&q=85",
    alt: "Sigiriya jungle at dawn",
    chapter: "Chapter 01",
    location: "Cultural Triangle · 05:42",
    title: "Before the world wakes",
    body:
      "We begin in the soft hour before the first jeep. A private gate. A private path. The rock to ourselves. Mist hangs in the water gardens. The frescoes still sleep, and the only sound is the hush of warm wind through the dagobas.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581618017028-f9f10f0fb8c2?auto=format&fit=crop&w=2400&q=85",
    alt: "Tea hills in morning mist",
    chapter: "Chapter 02",
    location: "Hill Country · 10:17",
    title: "Up into the green",
    body:
      "By mid-morning, the road climbs. Tea ridges fold into one another like quiet conversations. We stop for cardamom curd. Then again. And again. Because the point of the highlands is not to arrive — it is to slow until the air thins.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=2400&q=85",
    alt: "Wild leopard in evening light",
    chapter: "Chapter 03",
    location: "Yala National Park · 17:48",
    title: "The wild hour",
    body:
      "Down on the south, dusk belongs to the leopards. Our tracker drives away from the convoys, into a stretch of jungle few jeeps reach. The wind drops. Something moves through the long grass. He whispers a word. Everyone stops breathing.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=2400&q=85",
    alt: "Galle Fort ramparts at golden hour",
    chapter: "Chapter 04",
    location: "Galle Fort · 18:31",
    title: "Saturday in Galle",
    body:
      "We end where the Dutch ended — on a coral-stone rampart, gin in hand, the call to prayer drifting across the bay. You will not want to go home. That, too, is by design.",
  },
];

export function ScrollStory() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Heavy pinned storytelling is disabled on touch / mobile.
    if (prefersReducedMotion || !desktop || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".story-panel");
      const images = gsap.utils.toArray<HTMLElement>(".story-image");
      const progress = document.querySelector<HTMLElement>(".story-progress-bar");

      ScrollTrigger.create({
        trigger: ".scroll-story-stage",
        start: "top top",
        end: () => `+=${panels.length * window.innerHeight}`,
        pin: ".story-pin",
        anticipatePin: 1,
      });

      // Progress bar
      if (progress) {
        ScrollTrigger.create({
          trigger: ".scroll-story-stage",
          start: "top top",
          end: () => `+=${panels.length * window.innerHeight}`,
          onUpdate: (self) => {
            progress.style.transform = `scaleY(${self.progress})`;
          },
        });
      }

      // Cross-fade images per panel
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => activate(i),
          onEnterBack: () => activate(i),
        });
      });

      function activate(i: number) {
        images.forEach((img, j) => {
          gsap.to(img, {
            autoAlpha: j === i ? 1 : 0,
            scale: j === i ? 1 : 1.04,
            duration: 1.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      }

      activate(0);
    }, containerRef);

    return () => ctx.revert();
  }, [desktop]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="story-heading"
      className="scroll-story relative bg-background"
    >
      <div className="container-luxe py-24 sm:py-32">
        <SectionTransition
          eyebrow="A day in the field"
          title={"From first light\nto last call."}
          emphasis={["first", "light"]}
          intro="Four short hours, drawn from a real itinerary in March. Scroll on."
          align="center"
          hairline
        />
        <span id="story-heading" className="sr-only">
          A day in the field
        </span>
      </div>

      <div className="scroll-story-stage relative grid grid-cols-1 lg:grid-cols-2">
        {/* Pinned image stack */}
        <div className="story-pin relative h-[100svh] w-full">
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
            {STORY.map((s, i) => (
              <div
                key={i}
                className="story-image absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40 lg:from-transparent lg:via-transparent lg:to-black/40" />
                <div className="absolute inset-0 vignette" />
                <div className="absolute inset-0 grain" />
              </div>
            ))}
          </div>
        </div>

        {/* Text panels */}
        <div className="relative">
          {/* Vertical progress bar */}
          <div className="pointer-events-none absolute left-8 top-0 hidden h-full w-px bg-border lg:block">
            <div
              className="story-progress-bar h-full w-full origin-top bg-gold"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {STORY.map((s, i) => (
            <article
              key={i}
              className="story-panel flex min-h-[100svh] items-center px-8 py-24 sm:px-12 lg:pl-24 lg:pr-20"
            >
              <div className="max-w-lg">
                <div className="flex items-center gap-4">
                  <span className="number-tag">{s.chapter}</span>
                  <span className="h-px w-10 bg-foreground/15" />
                  <span className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                    {s.location}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.04] tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-7 text-pretty text-base leading-[1.75] text-muted-foreground sm:text-lg lg:text-[1.1rem]">
                  {s.body}
                </p>

                <div className="mt-10 h-px w-16 bg-gold" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
