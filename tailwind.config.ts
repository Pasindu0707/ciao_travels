import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // Brand palette
        ivory: "hsl(var(--ivory))",
        charcoal: "hsl(var(--charcoal))",
        gold: {
          DEFAULT: "hsl(var(--gold))",
          soft: "hsl(var(--gold-soft))",
          deep: "hsl(var(--gold-deep))",
        },
        teal: {
          DEFAULT: "hsl(var(--teal))",
          deep: "hsl(var(--teal-deep))",
          midnight: "hsl(var(--teal-midnight))",
        },
        cream: "hsl(var(--cream))",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Fraunces", "serif"],
        display: ["var(--font-display)", "Fraunces", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.75rem, 6vw, 5.5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.875rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        "radial-fade": "radial-gradient(ellipse at center, hsl(var(--background)) 0%, transparent 70%)",
      },
      boxShadow: {
        "soft": "0 1px 2px hsl(var(--foreground) / 0.04), 0 4px 16px hsl(var(--foreground) / 0.06)",
        "elev": "0 10px 40px -10px hsl(var(--foreground) / 0.18)",
        "gold-glow": "0 0 0 1px hsl(var(--gold) / 0.25), 0 8px 30px -8px hsl(var(--gold) / 0.35)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 70s linear infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.22, 1, 0.36, 1)",
        "smooth": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
