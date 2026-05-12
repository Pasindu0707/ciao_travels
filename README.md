# Ciao Ceylon Tours — Luxury Sri Lanka Travel

A production-grade marketing website for a fictional (cinematic) luxury travel brand: **Ciao Ceylon Tours**.

> Quiet luxury meets tropical cinema.
> Slow, editorial, conversion-focused, fully themable (light + dark).

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 3 + custom design tokens (light / dark themes)
- **UI primitives:** [shadcn/ui](https://ui.shadcn.com) (heavily customised) on top of Radix
- **Motion:** Framer Motion (component animations) + GSAP ScrollTrigger (pinned storytelling)
- **Smooth scroll:** [Lenis](https://github.com/studio-freight/lenis) — disabled when `prefers-reduced-motion`
- **Forms:** React Hook Form + Zod resolvers
- **Notifications:** Sonner
- **Icons:** lucide-react
- **Typography:** Fraunces (display) · Cormorant Garamond (serif) · Manrope (sans) — all via `next/font/google`
- **Theme:** `next-themes` (class strategy, dark by default)

## Design tokens

Two complete themes are wired through CSS variables in `app/globals.css`.

### Light — "warm ivory"
- Background: warm ivory
- Text: charcoal
- Primary: tea-gold
- Secondary: ocean-teal
- Surfaces: glassy off-white (`.glass`, `.glass-strong`)

### Dark — "midnight teal cinema"
- Background: deep midnight teal
- Text: warm cream
- Primary: soft gold
- Secondary: subtle teal
- No neon; everything is cinematic, soft and editorial.

Custom utilities: `.container-luxe` · `.container-narrow` · `.container-reading` · `.eyebrow` · `.number-tag` · `.link-underline` · `.cinema-overlay` · `.grain` · `.hairline` · `.mask-fade-*` · `.bg-grid-faint`.

## Pages

| Route | Purpose |
|---|---|
| `/` | Cinematic homepage (16 sections, see below) |
| `/about` | Brand manifesto + team |
| `/journeys` | Signature journeys index |
| `/journeys/[slug]` | Journey detail (itinerary, inclusions, sticky CTA) |
| `/destinations/[slug]` | Destination editorial page |
| `/experiences` | Filterable experiences library |
| `/gallery` | Filterable bento gallery + lightbox |
| `/journal` | Editorial journal index |
| `/journal/[slug]` | Long-form article with drop-cap |
| `/faq` | Filterable FAQ accordion |
| `/contact` | Contact page with RHF + Zod form |
| `/plan` | 3-step bespoke trip brief (RHF + Zod) |

Plus `sitemap.xml`, `robots.txt`, JSON-LD organisation / website / trip / article / breadcrumb schemas, custom `not-found.tsx`, and `loading.tsx`.

## Homepage section order

1. Sticky transparent navbar (auto-blurs on scroll, mobile sheet)
2. Cinematic hero (kinetic typography, side-meta, scroll cue)
3. Trust rail (marquee of press logos)
4. Destination highlight grid (bento)
5. Interactive Sri Lanka SVG map (hover → editorial card)
6. Signature journeys (3-up editorial)
7. GSAP scroll storytelling (pinned image stack, 4 chapters)
8. Why choose us (4 pillars)
9. Testimonials carousel + trust stats
10. Planning timeline (4 steps)
11. Gallery preview (bento with hover captions)
12. Journal preview (3 latest)
13. FAQ accordion preview
14. Final CTA (full-bleed cinematic)
15. Floating WhatsApp button (appears after scroll)
16. Editorial footer (giant wordmark, newsletter, social)

## Folder structure

```
.
├── app/
│   ├── (root, layout, page, globals.css, sitemap, robots, loading, not-found)
│   ├── about/
│   ├── contact/
│   ├── destinations/[slug]/
│   ├── experiences/
│   ├── faq/
│   ├── gallery/
│   ├── journal/[slug]/
│   ├── journeys/[slug]/
│   └── plan/
├── components/
│   ├── ui/         — shadcn primitives (button, input, dialog, sheet, …)
│   ├── layout/     — navbar, footer, theme-toggle, logo, WhatsApp FAB
│   ├── providers/  — theme + Lenis + Sonner
│   ├── sections/   — homepage sections
│   ├── shared/     — page-hero, section-heading
│   └── client/     — client-island components used inside server pages
├── content/        — strongly-typed data (journeys, destinations, journal, …)
├── lib/            — utils, fonts, motion, seo, site config
└── public/         — static assets
```

## Server vs Client components

- **Server by default.** Page files in `app/**/page.tsx` are server components and export `metadata`.
- **Client only where required:** motion (`framer-motion`), animation hooks, forms, theme toggle, Lenis. Co-located in `components/client/`, `components/providers/`, or marked `"use client"` inline.

## Accessibility & motion

- Honours `prefers-reduced-motion` — Lenis disables itself, GSAP storytelling exits gracefully, and global CSS clamps animation durations.
- Skip-to-content link at the top of `<body>`.
- Focus rings, semantic landmarks, alt text on every image.

## SEO

- `lib/seo.ts` exposes `buildMetadata()` + JSON-LD helpers (`Organization`, `WebSite`, `TouristTrip`, `Article`, `BreadcrumbList`).
- Per-page `metadata` overrides (title / description / canonical / OG).
- `app/sitemap.ts` automatically includes all journey, destination and journal slugs.
- `app/robots.ts` blocks `/api/` and `/admin/`.

## Quick start

```bash
# 1. Install
npm install

# 2. Dev
npm run dev

# 3. Build & start
npm run build
npm run start

# 4. Type-check
npm run typecheck
```

Open http://localhost:3000.

## Customising

- **Brand tokens** → `app/globals.css` (CSS variables) + `tailwind.config.ts`.
- **Copy & content** → everything is in `content/*.ts` (strongly typed).
- **Contact info / social** → `lib/site.ts`.
- **Images** → Currently sourced from Unsplash via `next/image` remote patterns (`next.config.ts`). Swap for your own CDN before launch.
- **Forms** → `components/client/contact-form.tsx` and `components/client/plan-form.tsx`. Wire `onSubmit` to your API route (`app/api/contact/route.ts`) or to a transactional email provider (Resend, Postmark…).

## Production notes

- Replace Unsplash URLs with your owned/licensed imagery.
- Add a real `og.jpg` (1200×630) at `public/og.jpg`.
- Add `favicon.ico` / `apple-icon.png`.
- Update `siteConfig.url`, phone, email, WhatsApp number in `lib/site.ts`.
- Connect the forms to your backend.
- Add analytics (e.g. `@vercel/analytics`) in `app/layout.tsx`.

## License

Demo / portfolio project. Replace photography and copy with your own before production use.
