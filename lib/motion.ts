import type { Variants, Transition } from "framer-motion";

/* === Luxury easings — slow, deliberate, never bouncy === */
export const luxuryEase = [0.22, 1, 0.36, 1] as const;
export const cinemaEase = [0.83, 0, 0.17, 1] as const;
export const softEase = [0.65, 0, 0.35, 1] as const;
export const slowOut = [0.16, 1, 0.3, 1] as const;

/* === Durations === */
export const D = {
  fast: 0.6,
  base: 0.9,
  slow: 1.2,
  slower: 1.6,
  cinematic: 2.0,
} as const;

/* === Fade up — calm, slow === */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: D.slow, ease: luxuryEase } },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: D.base, ease: luxuryEase } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: D.slow, ease: luxuryEase } },
};

/* === Mask reveal — clip-path bottom-to-top === */
export const maskReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: D.slower, ease: cinemaEase },
  },
};

export const maskRevealRight: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: D.slower, ease: cinemaEase },
  },
};

/* === Word/line stagger for kinetic typography === */
export const lineStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const lineItem: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: D.slow, ease: luxuryEase },
  },
};

export const wordStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const wordItem: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: D.slow, ease: luxuryEase },
  },
};

/* === Container staggers === */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

export const slowReveal: Transition = {
  duration: D.slower,
  ease: luxuryEase,
};

/* === Default viewport opts for in-view triggers === */
export const inView = { once: true, margin: "-15% 0px -10% 0px" } as const;
