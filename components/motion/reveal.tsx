"use client";

import * as React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { D, inView, luxuryEase } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "section" | "article" | "li" | "header" | "footer" | "p" | "span";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical translate distance in px (mobile-friendly default). */
  y?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay in seconds before the reveal begins. */
  delay?: number;
  /** Only animate once. Defaults to true. */
  once?: boolean;
  /** Render as a different element. */
  as?: RevealTag;
}

/**
 * Reveal — the foundational entrance animation.
 *
 * Quiet, slow, never bouncy. Honours `prefers-reduced-motion`.
 * Use for paragraphs, columns, single-element reveals.
 */
export function Reveal({
  children,
  className,
  y = 28,
  duration = D.slow,
  delay = 0,
  once = true,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : duration,
        ease: luxuryEase,
        delay: reduced ? 0 : delay,
      },
    },
  };

  const Comp = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <Comp
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: inView.margin }}
      variants={variants}
    >
      {children}
    </Comp>
  );
}
