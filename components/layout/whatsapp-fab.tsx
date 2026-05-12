"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { useScrolled, useReducedMotion } from "@/lib/hooks";
import { luxuryEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function WhatsAppFab() {
  // Appear after the user has begun reading.
  const visible = useScrolled(420);
  const reduced = useReducedMotion();

  const href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    "Hello Ciao Ceylon — I'd love to plan a private trip to Sri Lanka."
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="wa"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with a planner on WhatsApp"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: luxuryEase }}
          className={cn(
            "group fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-[#1FA855] px-4 py-3 text-cream shadow-elev",
            "transition-[background-color,transform] duration-500 ease-luxury hover:bg-[#16864A] hover:shadow-gold-glow",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "safe-bottom safe-right sm:bottom-7 sm:right-7 sm:px-5 sm:py-3.5"
          )}
        >
          <span className="relative grid h-6 w-6 place-items-center">
            {!reduced && (
              <span
                aria-hidden
                className="absolute inset-0 -m-1.5 rounded-full bg-cream/25 animate-quiet-pulse"
              />
            )}
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.24em] sm:inline">
            Chat with a planner
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.11 4.93A10 10 0 0 0 4.05 17.39L3 21l3.71-1.02a10 10 0 0 0 12.4-15.05ZM12 19.2a7.18 7.18 0 0 1-3.66-1l-.26-.16-2.2.6.6-2.14-.17-.27A7.2 7.2 0 1 1 19.2 12 7.21 7.21 0 0 1 12 19.2Zm4.13-5.39c-.22-.11-1.32-.65-1.53-.73s-.36-.11-.5.11-.58.72-.71.87-.26.16-.48.05a5.93 5.93 0 0 1-1.74-1.07 6.58 6.58 0 0 1-1.21-1.5c-.13-.22 0-.34.1-.45s.22-.26.33-.39a1.46 1.46 0 0 0 .22-.36.39.39 0 0 0 0-.38c-.06-.11-.5-1.2-.69-1.64s-.36-.37-.5-.38h-.42a.83.83 0 0 0-.6.28 2.49 2.49 0 0 0-.78 1.85 4.32 4.32 0 0 0 .9 2.31 9.88 9.88 0 0 0 3.79 3.34c.53.23.94.36 1.26.46a3.06 3.06 0 0 0 1.4.09 2.29 2.29 0 0 0 1.5-1.06 1.85 1.85 0 0 0 .13-1.06c-.05-.11-.2-.17-.42-.28Z" />
    </svg>
  );
}
