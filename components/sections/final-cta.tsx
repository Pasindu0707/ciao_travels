"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/lib/hooks";
import { cinemaEase, luxuryEase, D } from "@/lib/motion";
import { TextMaskReveal, MagneticButton } from "@/components/motion";

export function FinalCta() {
  const ref = React.useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden py-32 sm:py-40 lg:py-52"
    >
      <motion.div
        style={reduced ? undefined : { y: imageY }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src="https://images.unsplash.com/photo-1605649461784-4f51b5cdc97a?auto=format&fit=crop&w=2880&q=85"
          alt="Quiet Galle Fort courtyard at golden hour"
          fill
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/55 to-background/95" />
      <div className="absolute inset-0 -z-10 grain" />

      <div className="container-luxe">
        <motion.div
          initial={
            reduced
              ? { clipPath: "inset(0 0 0% 0)" }
              : { clipPath: "inset(0 0 100% 0)" }
          }
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: reduced ? 0 : D.slower, ease: cinemaEase }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : D.base, ease: luxuryEase }}
            className="eyebrow justify-center before:!w-12"
          >
            Begin a journey
          </motion.p>

          <TextMaskReveal
            text={"Sri Lanka is small.\nWe make it feel enormous."}
            emphasis={["small.", "enormous."]}
            delay={0.25}
            staggerChildren={0.08}
            duration={1.1}
            as="h2"
            className="mt-10 font-display text-[clamp(2.75rem,6.5vw,6.5rem)] leading-[0.96] tracking-tight text-balance text-foreground"
          />
          <span id="cta-heading" className="sr-only">
            Begin a journey
          </span>

          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduced ? 0 : D.slow,
              ease: luxuryEase,
              delay: reduced ? 0 : 0.7,
            }}
            className="mx-auto mt-10 max-w-2xl text-pretty text-base leading-[1.65] text-muted-foreground sm:text-lg"
          >
            One conversation is usually enough to know whether we&apos;re a fit. Write to us
            below — and we&apos;ll respond within twenty-four hours with a thoughtful first
            sketch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduced ? 0 : D.slow,
              ease: luxuryEase,
              delay: reduced ? 0 : 0.9,
            }}
            className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <MagneticButton strength={0.22}>
              <Button asChild size="xl" variant="primary" className="w-full sm:w-auto sm:min-w-56">
                <Link href="/plan">
                  Plan your journey
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.18}>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto sm:min-w-56">
                <Link href="/contact">Speak with a planner</Link>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 1.1 }}
            className="mt-14 text-[0.62rem] uppercase tracking-[0.42em] font-medium text-muted-foreground"
          >
            No call centres · No sales pressure · Always private
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
