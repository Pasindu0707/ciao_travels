import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Render light text/marks for placement over a dark hero. */
  transparent?: boolean;
  className?: string;
}

/**
 * Brand mark. Stateless — caller controls `transparent` so the
 * page only owns one scroll listener (the Navbar).
 */
export function Logo({ transparent = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Ciao Ceylon Tours — home"
      className={cn(
        "group inline-flex items-center gap-3.5 focus-ring rounded-full",
        className
      )}
    >
      <span
        aria-hidden
        className="relative grid h-9 w-9 place-items-center rounded-full border border-gold/45 transition-transform duration-700 ease-luxury group-hover:rotate-[18deg]"
      >
        <span className="absolute inset-1 rounded-full border border-gold/20" />
        <span className="font-display text-base font-semibold text-gold">C</span>
      </span>
      <span
        className={cn(
          "flex flex-col leading-none transition-colors duration-700",
          transparent ? "text-cream" : "text-foreground"
        )}
      >
        <span className="font-display text-[0.95rem] tracking-tight">
          Ciao Ceylon
        </span>
        <span
          className={cn(
            "mt-1 text-[0.55rem] uppercase tracking-[0.34em] transition-colors duration-700",
            transparent ? "text-cream/55" : "text-muted-foreground"
          )}
        >
          Tours · Est. 2014
        </span>
      </span>
    </Link>
  );
}
