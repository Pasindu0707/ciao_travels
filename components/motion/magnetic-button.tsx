"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion, useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Magnitude of the pull (0–0.5 keeps it elegant). Default 0.22. */
  strength?: number;
  /** Inner damping for the spring. Higher = calmer return. Default 28. */
  damping?: number;
  /** Spring stiffness. Default 220. */
  stiffness?: number;
}

/**
 * MagneticButton — gentle cursor-following motion for primary CTAs.
 *
 * Strictly desktop with a fine pointer. Disabled entirely on touch devices
 * or when the user prefers reduced motion. No springs that overshoot.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.22,
  damping = 28,
  stiffness = 220,
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");

  const enabled = desktop && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness, damping, mass: 0.6 });
  const y = useSpring(my, { stiffness, damping, mass: 0.6 });

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(dx * strength);
    my.set(dy * strength);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  if (!enabled) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </motion.span>
  );
}
