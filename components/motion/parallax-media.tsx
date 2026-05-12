"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion, useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface ParallaxMediaProps {
  children: React.ReactNode;
  className?: string;
  /** 0–1 strength of the parallax. 0.3 is a tide-like default. */
  speed?: number;
  /** Disable the effect below this min-width breakpoint. Default 1024px. */
  disableBelow?: number;
  /** Force-enable on mobile. Rare — most things should not parallax on touch. */
  enableMobile?: boolean;
}

/**
 * ParallaxMedia — wraps an image (or any media) and applies a subtle
 * scroll-linked vertical parallax via GSAP ScrollTrigger.
 *
 *  - Skipped on `prefers-reduced-motion`.
 *  - Skipped below a desktop breakpoint by default.
 *  - The wrapped element is positioned absolutely inside an
 *    `overflow-hidden` parent so it stays cropped.
 *
 * Use for hero images, journey covers, gallery thumbnails — anywhere a
 * fixed background would normally feel heavy.
 */
export function ParallaxMedia({
  children,
  className,
  speed = 0.3,
  disableBelow = 1024,
  enableMobile = false,
}: ParallaxMediaProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useMediaQuery(`(min-width: ${disableBelow}px)`);

  const active = !reduced && (desktop || enableMobile);

  React.useEffect(() => {
    if (!active || !wrapRef.current || !innerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const amount = Math.max(2, Math.min(14, speed * 14));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [active, speed]);

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden", className)}>
      <div
        ref={innerRef}
        className={cn(
          "absolute inset-x-0 will-change-transform",
          active ? "-top-[14%] h-[128%]" : "inset-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}
