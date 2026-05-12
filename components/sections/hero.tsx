"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion, useMediaQuery } from "@/lib/hooks";
import { cinemaEase, luxuryEase, D } from "@/lib/motion";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const mediaRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 768px)");

  /* ----- GSAP-driven hero parallax (per spec) ----- */
  React.useEffect(() => {
    if (reduced || !desktop || !sectionRef.current || !mediaRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaRef.current,
        { yPercent: 0, scale: 1.04 },
        {
          yPercent: 12,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, desktop]);

  /* ----- Framer Motion content soft-falloff ----- */
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, -28]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0.45]);
  const [scrolled, setScrolled] = React.useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] w-full items-end overflow-hidden"
    >
      {/* Cinematic background — mask reveal + GSAP parallax */}
      <motion.div
        initial={
          reduced ? { clipPath: "inset(0 0 0% 0)" } : { clipPath: "inset(0 0 100% 0)" }
        }
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: reduced ? 0 : 2.2, ease: cinemaEase }}
        className="absolute inset-0 -z-10"
      >
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          <Image
            src="https://images.unsplash.com/photo-1588258524675-3fa3cb1052bd?auto=format&fit=crop&w=2880&q=85"
            alt="Sigiriya rock fortress rising from misted jungle at first light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 cinema-overlay" />
        <div className="absolute inset-0 cinema-overlay-side" />
        <div className="absolute inset-0 grain" />
      </motion.div>

      {/* Vertical editorial line — left */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.6, delay: 1.0, ease: luxuryEase }}
        className="absolute left-6 top-32 bottom-32 hidden w-px origin-top bg-cream/15 lg:block"
        aria-hidden
      />

      {/* Top-left rotated volume label */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 1.6, ease: luxuryEase }}
        className="absolute left-0 top-1/2 hidden -translate-y-1/2 origin-left -rotate-90 pl-14 lg:block"
      >
        <p className="text-[0.62rem] uppercase tracking-[0.42em] font-medium text-cream/55">
          Volume 01 — Ceylon · Private journeys, since 2014
        </p>
      </motion.div>

      {/* Top-right meta */}
      <motion.aside
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.5, ease: luxuryEase }}
        className="absolute right-6 top-28 hidden text-right md:block lg:right-14"
      >
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-cream/55">
          Now in season
        </p>
        <p className="mt-2.5 font-display text-2xl tracking-tight text-cream">
          Cultural Triangle
        </p>
        <p className="mt-1 text-[0.7rem] font-light text-cream/65">
          May — September · East Coast
        </p>
      </motion.aside>

      {/* Main content */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-luxe relative w-full pb-20 pt-44 sm:pb-24 lg:pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D.base, delay: 0.5, ease: luxuryEase }}
          className="eyebrow-on-dark"
        >
          <span>Private journeys · Sri Lanka</span>
        </motion.div>

        {/* Cinematic kinetic headline */}
        <TextMaskReveal
          text="Sri Lanka, tailored with soul."
          emphasis={["soul"]}
          immediate
          delay={0.7}
          staggerChildren={0.085}
          duration={1.2}
          as="h1"
          className="mt-10 max-w-[18ch] font-display text-kinetic text-cream text-[clamp(3rem,8.5vw,8.5rem)]"
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D.slow, delay: 1.6, ease: luxuryEase }}
          className="mt-10 max-w-[44ch] text-balance text-base font-light leading-[1.55] text-cream/85 sm:text-lg lg:text-[1.2rem]"
        >
          Private, locally led journeys through ancient kingdoms, misty tea country,
          wild safaris and golden coastlines — crafted, never assembled.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: D.slow, delay: 1.9, ease: luxuryEase }}
          className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5"
        >
          <MagneticButton strength={0.2}>
            <Button asChild size="lg" variant="primary" className="w-full sm:w-auto sm:min-w-52">
              <Link href="/plan">
                Plan your journey
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:rotate-45" />
              </Link>
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.18}>
            <Button asChild size="lg" variant="glass" className="w-full sm:w-auto sm:min-w-52">
              <Link href="/journeys">Explore signature routes</Link>
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Editorial bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.4 }}
          className="mt-20 flex flex-col gap-8 border-t border-cream/15 pt-8 text-cream/80 md:flex-row md:items-end md:justify-between"
        >
          {/* Scroll cue — calm, no bounce */}
          <div
            className="flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.36em]"
            aria-hidden
          >
            <span className="relative inline-block h-7 w-px overflow-hidden bg-cream/20">
              <motion.span
                className="absolute inset-0 bg-gold"
                initial={{ y: "-100%" }}
                animate={
                  reduced || scrolled ? { y: "0%" } : { y: ["-100%", "100%"] }
                }
                transition={{
                  duration: 2.8,
                  repeat: scrolled || reduced ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
            <span>Scroll to begin</span>
          </div>

          {/* Stats */}
          <dl className="grid grid-cols-3 gap-8 sm:gap-12 md:text-right">
            <Stat n="11+" label="Years in Ceylon" />
            <Stat n="38" label="Countries served" />
            <Stat n="5.0" label="Average rating" />
          </dl>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="min-w-0">
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl tracking-tight text-cream sm:text-4xl">
        {n.includes("+") ? (
          <>
            {n.replace("+", "")}
            <span className="text-gold">+</span>
          </>
        ) : (
          n
        )}
      </dd>
      <p className="mt-1.5 text-[0.6rem] uppercase tracking-[0.24em] font-medium text-cream/55">
        {label}
      </p>
    </div>
  );
}
