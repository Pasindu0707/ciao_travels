"use client";

import * as React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { D, inView, luxuryEase } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Tag = "div" | "ul" | "ol" | "section" | "article";

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before the first child animates. */
  delayChildren?: number;
  /** Time between each child. Keep small for premium feel. */
  staggerChildren?: number;
  once?: boolean;
  as?: Tag;
}

/**
 * Stagger — orchestrates an in-view sequence for its `StaggerItem` children.
 *
 * The container itself does not animate visually; it only schedules its
 * children. Pair with `<StaggerItem>` for the actual reveal.
 */
export function Stagger({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.1,
  once = true,
  as = "div",
}: StaggerProps) {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : staggerChildren,
        delayChildren: reduced ? 0 : delayChildren,
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
      variants={container}
    >
      {children}
    </Comp>
  );
}

type ItemTag = "div" | "li" | "article" | "section";

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical translate in px. */
  y?: number;
  /** Per-item duration. */
  duration?: number;
  as?: ItemTag;
}

/**
 * StaggerItem — the per-child reveal used inside a `<Stagger>` container.
 */
export function StaggerItem({
  children,
  className,
  y = 24,
  duration = D.slow,
  as = "div",
}: StaggerItemProps) {
  const reduced = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : duration,
        ease: luxuryEase,
      },
    },
  };

  const Comp = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <Comp className={cn(className)} variants={item}>
      {children}
    </Comp>
  );
}
