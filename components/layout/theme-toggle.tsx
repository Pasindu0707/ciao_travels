"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : "dark";
  const isDark = current === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "focus-ring group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors duration-500 hover:border-gold hover:text-gold",
        className
      )}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-700 ease-luxury",
          isDark ? "scale-0 -rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-700 ease-luxury",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-45 opacity-0"
        )}
        aria-hidden
      />
    </button>
  );
}
