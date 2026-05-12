"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { D, inView, luxuryEase } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Mode = "word" | "line" | "char";
type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface TextMaskRevealProps {
  /** Text to reveal. `\n` always creates a line break. */
  text: string;
  /** Tokens to render as italic-serif gold emphasis (punctuation is stripped for matching). */
  emphasis?: string[];
  /** Reveal unit. `word` is the default and best for headlines. */
  mode?: Mode;
  /** Stagger between units. */
  staggerChildren?: number;
  /** Initial delay (seconds) before the sequence starts. */
  delay?: number;
  /** Per-unit duration. */
  duration?: number;
  /** Animate immediately on mount instead of waiting for in-view. */
  immediate?: boolean;
  /** Element to render the text inside. */
  as?: Tag;
  className?: string;
}

/**
 * TextMaskReveal — kinetic editorial typography.
 *
 * Each unit (word, line, or character) sits inside an overflow-hidden mask
 * and slides up from below with a slow, luxury ease. Honours
 * `prefers-reduced-motion` by collapsing to a soft fade.
 *
 *  - `mode="word"`  → ideal for hero & section headlines.
 *  - `mode="line"`  → ideal for short multi-line copy.
 *  - `mode="char"`  → use sparingly; signature flourishes only.
 *
 * `\n` in the input always creates a hard line break, including in word mode.
 */
export function TextMaskReveal({
  text,
  emphasis = [],
  mode = "word",
  staggerChildren = 0.07,
  delay = 0,
  duration = D.slow,
  immediate = false,
  as = "h2",
  className,
}: TextMaskRevealProps) {
  const reduced = useReducedMotion();
  const Tag = as as "h2";

  // Split into lines first (preserves any \n hard-breaks).
  const lines = React.useMemo(() => text.split("\n"), [text]);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : staggerChildren,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const item: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { y: "115%", opacity: 0 },
        visible: {
          y: "0%",
          opacity: 1,
          transition: { duration, ease: luxuryEase },
        },
      };

  const motionProps = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, margin: inView.margin },
      };

  const isEm = (raw: string) => {
    const clean = raw.replace(/[.,!?;:]/g, "");
    return emphasis.includes(clean) || emphasis.includes(raw);
  };

  /** Render a single token wrapped in a mask. */
  const renderToken = (raw: string, key: React.Key, extraClass?: string) => {
    const display = raw === "" ? "\u00A0" : raw;
    return (
      <span
        key={key}
        className={cn(
          "relative overflow-hidden align-top",
          mode === "char" ? "inline-block leading-none" : "inline-block",
          mode === "word" && "mr-[0.22em] pb-[0.1em]",
          mode === "char" && "pb-[0.1em]",
          extraClass
        )}
      >
        <motion.span className="inline-block" variants={item}>
          {isEm(raw) ? (
            <em className="font-serif font-light italic text-gold">{display}</em>
          ) : (
            display
          )}
        </motion.span>
      </span>
    );
  };

  return (
    <Tag className={cn(className)}>
      <motion.span
        variants={container}
        {...motionProps}
        className="inline-block"
      >
        {lines.map((line, li) => {
          if (mode === "line") {
            // Whole-line mask. Each line becomes its own animated block.
            return (
              <span key={`l-${li}`} className="block overflow-hidden pb-[0.08em]">
                <motion.span className="inline-block" variants={item}>
                  {isEm(line) ? (
                    <em className="font-serif font-light italic text-gold">
                      {line || "\u00A0"}
                    </em>
                  ) : (
                    line || "\u00A0"
                  )}
                </motion.span>
              </span>
            );
          }

          if (mode === "char") {
            const chars = Array.from(line);
            return (
              <span key={`l-${li}`} className="block">
                {chars.map((c, ci) => renderToken(c, `c-${li}-${ci}`))}
              </span>
            );
          }

          // mode === "word"
          const words = line.split(" ");
          return (
            <span key={`l-${li}`} className="block">
              {words.map((w, wi) => renderToken(w, `w-${li}-${wi}`))}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
