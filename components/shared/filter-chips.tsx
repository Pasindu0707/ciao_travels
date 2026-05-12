"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FilterChipsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  /** Accessible label for the entire group. */
  label?: string;
  className?: string;
}

/**
 * FilterChips — the rounded-border filter pills used on Gallery, FAQ,
 * and Experiences. Centralised here to avoid drift.
 *
 * Behaviour:
 *  - Group is a `radiogroup` (single select).
 *  - Arrow keys move between chips.
 *  - Selected chip gets gold border + tint + slightly darker text.
 */
export function FilterChips<T extends string>({
  options,
  value,
  onChange,
  label = "Filter",
  className,
}: FilterChipsProps<T>) {
  const groupRef = React.useRef<HTMLDivElement>(null);

  function move(direction: 1 | -1) {
    const idx = options.indexOf(value);
    const next = ((idx + direction) % options.length + options.length) % options.length;
    onChange(options[next]);
    requestAnimationFrame(() => {
      groupRef.current
        ?.querySelector<HTMLElement>(`[data-chip="${options[next]}"]`)
        ?.focus();
    });
  }

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={label}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {options.map((o) => {
        const selected = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            data-chip={o}
            onClick={() => onChange(o)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                move(1);
              }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                move(-1);
              }
            }}
            className={cn(
              "focus-ring rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.22em] transition-colors duration-500",
              selected
                ? "border-gold bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
