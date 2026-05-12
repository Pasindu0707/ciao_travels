"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { D, inView, luxuryEase } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { TextMaskReveal } from "./text-mask-reveal";
import { cn } from "@/lib/utils";

interface SectionTransitionProps {
  /** Small all-caps label above the title. */
  eyebrow?: string;
  /** Main heading. Multi-word; emphasis tokens are styled in italic serif gold. */
  title: string;
  /** Words from `title` to render in italic serif gold. */
  emphasis?: string[];
  /** Optional sub-paragraph below the title. */
  intro?: React.ReactNode;
  /** Optional content rendered on the side (e.g., link, button). */
  side?: React.ReactNode;
  /** Header alignment. */
  align?: "left" | "center";
  /** Heading element to render. */
  as?: "h2" | "h3";
  /** Override the title `clamp()` scale. */
  size?: "lg" | "xl";
  className?: string;
  /** Show animated hairline above the eyebrow. */
  hairline?: boolean;
  /** Use cream text — for placement over dark surfaces. */
  invert?: boolean;
}

/**
 * SectionTransition — the consistent reveal pattern used at the top of
 * every homepage section.
 *
 * Composition:
 *   ┌ optional gold hairline ──────────────────┐
 *   │  eyebrow                                 │
 *   │  TITLE (mask reveal, word-by-word)       │
 *   │  intro / side                            │
 *   └──────────────────────────────────────────┘
 *
 * Honours `prefers-reduced-motion`. All translates collapse to fades.
 */
export function SectionTransition({
  eyebrow,
  title,
  emphasis,
  intro,
  side,
  align = "left",
  as = "h2",
  size = "xl",
  className,
  hairline = false,
  invert = false,
}: SectionTransitionProps) {
  const reduced = useReducedMotion();

  const isCenter = align === "center";
  const hasSide = !!side;

  const titleClass = cn(
    "max-w-[18ch] text-balance font-display leading-[0.98] tracking-tight",
    size === "xl"
      ? "text-[clamp(2.5rem,5vw,5rem)]"
      : "text-[clamp(2.25rem,4.2vw,4.25rem)]",
    invert ? "text-cream" : "text-foreground",
    isCenter && "mx-auto"
  );

  const eyebrowClass = cn(
    invert ? "eyebrow-on-dark" : "eyebrow",
    isCenter && "justify-center before:!w-12"
  );

  return (
    <div
      className={cn(
        "grid items-end gap-10",
        hasSide && !isCenter && "lg:grid-cols-[1.3fr_1fr] lg:gap-24",
        isCenter && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      <div className={cn(isCenter && "flex flex-col items-center")}>
        {hairline && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: inView.margin }}
            transition={{ duration: reduced ? 0 : 1.4, ease: luxuryEase }}
            className={cn(
              "mb-8 h-px w-20 origin-left",
              invert ? "bg-gold/70" : "bg-gold/60",
              isCenter && "origin-center mx-auto"
            )}
            aria-hidden
          />
        )}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: inView.margin }}
            transition={{ duration: reduced ? 0 : D.base, ease: luxuryEase }}
            className={eyebrowClass}
          >
            {eyebrow}
          </motion.p>
        )}

        <TextMaskReveal
          text={title}
          emphasis={emphasis}
          delay={eyebrow ? 0.15 : 0.05}
          as={as}
          className={cn(titleClass, "mt-8")}
        />
      </div>

      {(intro || side) && (
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: inView.margin }}
          transition={{
            duration: reduced ? 0 : D.slow,
            ease: luxuryEase,
            delay: reduced ? 0 : 0.35,
          }}
          className={cn(
            "max-w-md space-y-7",
            isCenter && "mx-auto max-w-2xl text-center"
          )}
        >
          {intro && (
            <p
              className={cn(
                "text-pretty text-base leading-[1.7] sm:text-lg",
                invert ? "text-cream/80" : "text-muted-foreground"
              )}
            >
              {intro}
            </p>
          )}
          {side}
        </motion.div>
      )}
    </div>
  );
}
