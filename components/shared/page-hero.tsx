"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { D, luxuryEase } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { TextMaskReveal } from "@/components/motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  /** Wrap a word in underscores (e.g. `_island_`) to render in italic serif gold. */
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  align = "left",
}: PageHeroProps) {
  const reduced = useReducedMotion();

  // Extract emphasis tokens marked with `_word_` syntax and clean the title.
  const emphasis: string[] = [];
  const cleanTitle = title
    .split(" ")
    .map((w) => {
      if (w.startsWith("_") && w.endsWith("_")) {
        const inner = w.slice(1, -1);
        emphasis.push(inner);
        return inner;
      }
      return w;
    })
    .join(" ");

  return (
    <section className="relative isolate flex min-h-[80svh] w-full items-end overflow-hidden pb-16 pt-40 sm:pb-20 lg:pb-28">
      <motion.div
        initial={{ scale: reduced ? 1 : 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduced ? 0 : 2.2, ease: luxuryEase }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 cinema-overlay" />
        <div className="absolute inset-0 grain" />
      </motion.div>

      <div className="container-luxe w-full">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduced ? 0 : 0.4,
            duration: reduced ? 0 : D.base,
            ease: luxuryEase,
          }}
          className={cn("eyebrow-on-dark", align === "center" && "justify-center")}
        >
          <span>{eyebrow}</span>
        </motion.p>

        <TextMaskReveal
          text={cleanTitle}
          emphasis={emphasis}
          immediate
          delay={0.55}
          staggerChildren={0.07}
          duration={1.0}
          as="h1"
          className={cn(
            "mt-10 max-w-5xl font-display text-display-2xl text-cream",
            align === "center" && "mx-auto text-center"
          )}
        />

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduced ? 0 : 1.4,
              duration: reduced ? 0 : D.slow,
              ease: luxuryEase,
            }}
            className={cn(
              "mt-10 max-w-2xl text-pretty text-base leading-relaxed text-cream/85 sm:text-lg",
              align === "center" && "mx-auto text-center"
            )}
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
