"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { luxuryEase, D } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { SectionTransition } from "@/components/motion";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const total = testimonials.length;
  const reduced = useReducedMotion();

  const goTo = React.useCallback(
    (i: number, dir = 1) => {
      setDirection(dir);
      setIndex(((i % total) + total) % total);
    },
    [total]
  );
  const next = React.useCallback(() => goTo(index + 1, 1), [index, goTo]);
  const prev = () => goTo(index - 1, -1);

  React.useEffect(() => {
    if (reduced) return;
    const id = setInterval(next, 11000);
    return () => clearInterval(id);
  }, [next, reduced]);

  const t = testimonials[index];

  const slide = {
    enter: (d: number) =>
      reduced ? { opacity: 0 } : { opacity: 0, y: 24 * d },
    center: { opacity: 1, y: 0 },
    exit: (d: number) =>
      reduced ? { opacity: 0 } : { opacity: 0, y: -16 * d },
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden py-32 sm:py-40 lg:py-48"
    >
      {/* Background gold quote mark */}
      <div
        aria-hidden
        className="absolute -right-12 top-12 select-none lg:right-0 lg:top-32"
      >
        <span className="font-serif text-[28rem] leading-none text-foreground/[0.03] lg:text-[36rem]">
          &ldquo;
        </span>
      </div>

      <div className="container-luxe relative">
        <SectionTransition
          eyebrow="Trusted by travellers"
          title="Letters we've kept."
          emphasis={["kept."]}
          align="center"
        />
        <span id="testimonials-heading" className="sr-only">
          Testimonials
        </span>

        <div className="mt-24 grid items-center gap-16 lg:grid-cols-[2fr_1fr] lg:gap-24">
          {/* Quote */}
          <div className="relative min-h-[320px] lg:min-h-[360px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={t.author}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduced ? 0.2 : D.slow, ease: luxuryEase }}
                className="relative"
              >
                <div className="flex items-center gap-1.5 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="mt-8 font-display text-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.18] tracking-tight text-foreground">
                  <span className="text-gold">&ldquo;</span>
                  {t.quote}
                  <span className="text-gold">&rdquo;</span>
                </p>

                <footer className="mt-10 flex items-center gap-4">
                  <span className="h-px w-12 bg-gold" />
                  <div>
                    <p className="font-display text-lg text-foreground tracking-tight">
                      {t.author}
                    </p>
                    <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground font-medium">
                      {t.origin} · {t.trip}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls + stats */}
          <div className="flex flex-col gap-12 lg:items-end">
            <div className="grid grid-cols-2 gap-x-10 gap-y-8 lg:text-right">
              <Stat n="11+" label="Years in Ceylon" />
              <Stat n="380+" label="Private journeys" />
              <Stat n="98%" label="Return guests" />
              <Stat n="5.0" label="Average rating" />
            </div>

            <div className="flex items-center gap-3 self-start lg:self-end">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all duration-500 hover:border-gold hover:bg-gold/5 hover:text-gold"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span
                aria-live="polite"
                className="min-w-[3.5rem] text-center font-display text-sm tabular-nums tracking-wider text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
                <span className="mx-1.5 text-foreground/20">/</span>
                {String(total).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all duration-500 hover:border-gold hover:bg-gold/5 hover:text-gold"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bars */}
        <div className="mt-20 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "focus-ring h-px rounded-full transition-all duration-700 ease-luxury",
                i === index
                  ? "w-16 scale-y-[3] bg-gold"
                  : "w-10 bg-foreground/15 hover:bg-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-display text-[2.5rem] leading-none tracking-tight text-foreground">
        {n}
      </p>
      <p className="mt-2 text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground font-medium">
        {label}
      </p>
    </div>
  );
}
