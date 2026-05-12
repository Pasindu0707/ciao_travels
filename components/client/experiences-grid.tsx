"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type Experience } from "@/content/experiences";
import { fadeUp, staggerContainer, inView, luxuryEase } from "@/lib/motion";
import { FilterChips } from "@/components/shared/filter-chips";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "All",
  "Culinary",
  "Wildlife",
  "Wellness",
  "Cultural",
  "Adventure",
] as const;

export function ExperiencesGrid({ experiences }: { experiences: Experience[] }) {
  const [category, setCategory] =
    React.useState<(typeof CATEGORIES)[number]>("All");

  const items =
    category === "All"
      ? experiences
      : experiences.filter((e) => e.category === category);

  return (
    <>
      <FilterChips
        options={CATEGORIES}
        value={category}
        onChange={setCategory}
        label="Filter experiences by category"
        className="justify-center"
      />

      <AnimatePresence mode="wait" initial={false}>
        {items.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="mt-16"
          >
            <EmptyState
              title="No experiences under this lens."
              description="Try another category — or tell us what you're chasing and we'll arrange it privately."
              action={
                <Button asChild variant="outline" size="md">
                  <Link href="/plan">Brief a planner</Link>
                </Button>
              }
            />
          </motion.div>
        ) : (
          <motion.div
            key={category}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: inView.margin }}
            className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
          >
            {items.map((e, i) => (
              <motion.article
                key={e.slug}
                variants={fadeUp}
                className="group relative"
              >
                <Link
                  href="/plan"
                  className="focus-ring block rounded-xl"
                  aria-label={`${e.name} — brief us to include this`}
                >
                  <div className="card-luxe card-luxe-hover relative aspect-[4/5]">
                    <Image
                      src={e.image}
                      alt={e.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-3">
                      <span className="number-tag !text-cream/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.6rem] uppercase tracking-[0.22em] text-cream/80">
                        {e.category}
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="font-display text-2xl tracking-tight text-cream">
                        {e.name}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-cream/75">
                        {e.location} · {e.duration}
                      </p>
                    </div>
                  </div>
                </Link>
                <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
