"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { type GalleryImage } from "@/content/gallery";
import { fadeUp, staggerContainer, inView, luxuryEase, D } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { FilterChips } from "@/components/shared/filter-chips";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Landscape",
  "People",
  "Wildlife",
  "Detail",
  "Architecture",
] as const;

export function GalleryGrid({ gallery }: { gallery: GalleryImage[] }) {
  const [filter, setFilter] =
    React.useState<(typeof CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = React.useState<GalleryImage | null>(null);
  const reduced = useReducedMotion();
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  const items =
    filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  /* Lock scroll + handle Esc + focus close button when lightbox opens */
  React.useEffect(() => {
    if (!lightbox) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);

    // Focus the close button on next tick so Radix-style focus management
    // does not race with our update.
    const focusTimer = window.setTimeout(
      () => closeBtnRef.current?.focus(),
      40
    );

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [lightbox]);

  return (
    <>
      <FilterChips
        options={CATEGORIES}
        value={filter}
        onChange={setFilter}
        label="Filter photographs by category"
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
              title="Nothing in this corner of the archive."
              description="We add to the gallery every season. Try another filter, or open the full collection."
            />
          </motion.div>
        ) : (
          <motion.div
            key={filter}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: inView.margin }}
            className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {items.map((img, i) => (
              <motion.figure
                key={img.src + i}
                variants={fadeUp}
                className={cn(
                  "card-luxe card-luxe-hover group cursor-pointer",
                  img.span === "wide" && "lg:col-span-2",
                  img.span === "tall" && "row-span-2"
                )}
                onClick={() => setLightbox(img)}
              >
                <button
                  type="button"
                  className="focus-ring absolute inset-0 z-10 rounded-[inherit]"
                  aria-label={`Open photograph — ${img.alt}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(img);
                  }}
                />
                <div
                  className={cn(
                    "relative w-full",
                    img.span === "tall"
                      ? "aspect-[3/5]"
                      : img.span === "wide"
                      ? "aspect-[16/10]"
                      : "aspect-[4/5]"
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <figcaption className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 text-[0.62rem] uppercase tracking-[0.24em] text-cream opacity-0 transition-all duration-700 ease-luxury group-hover:translate-y-0 group-hover:opacity-100">
                    {img.caption}
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : D.fast, ease: luxuryEase }}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/95 p-6 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
          >
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              className="focus-ring absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.figure
              initial={reduced ? { opacity: 0 } : { scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { scale: 0.97, opacity: 0 }}
              transition={{ duration: reduced ? 0.15 : D.fast, ease: luxuryEase }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-5xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-card">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  priority
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-6 text-sm">
                <p className="text-foreground">{lightbox.caption}</p>
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {lightbox.category}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
