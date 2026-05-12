import Image from "next/image";
import { Clock, Mail, Lock, ShieldCheck } from "lucide-react";
import { PlanForm } from "@/components/client/plan-form";
import { Reveal, TextMaskReveal } from "@/components/motion";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plan a private Sri Lanka journey",
  description:
    "Tell us how you travel and we'll draft a fully designed private Sri Lanka journey, hotel by hotel, within forty-eight hours.",
  path: "/plan",
});

export default function PlanPage() {
  return (
    <>
      {/* Quieter cinematic header */}
      <section className="relative isolate flex min-h-[68svh] w-full items-end overflow-hidden pb-16 pt-40 sm:min-h-[72svh] sm:pb-20 lg:min-h-[76svh] lg:pb-28">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1586804580207-1ce0b8731437?auto=format&fit=crop&w=2880&q=85"
            alt="Misted tea ridges and a single quiet path in the Sri Lankan hill country"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 cinema-overlay" />
          <div className="absolute inset-0 cinema-overlay-side" />
          <div className="absolute inset-0 grain" />
        </div>

        <div className="container-luxe w-full">
          <Reveal y={12} duration={0.9}>
            <p className="eyebrow-on-dark">
              <span>Concierge intake · Ciao Ceylon</span>
            </p>
          </Reveal>

          <TextMaskReveal
            text={"Start your tailored\nSri Lanka journey."}
            emphasis={["tailored", "journey."]}
            immediate
            delay={0.45}
            staggerChildren={0.08}
            duration={1.05}
            as="h1"
            className="mt-10 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,5.75rem)] leading-[0.98] tracking-tight text-cream"
          />

          <Reveal y={16} duration={1.0} delay={0.4}>
            <p className="mt-9 max-w-xl text-pretty text-base font-light leading-[1.65] text-cream/85 sm:text-lg">
              Seven quiet questions. No call centres, no sales pressure. A real
              planner from our Colombo team will reply within twenty-four hours,
              and a first sketch will arrive within forty-eight.
            </p>
          </Reveal>

          <Reveal y={10} duration={0.9} delay={0.7}>
            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.62rem] uppercase tracking-[0.3em] font-medium text-cream/70">
              <li className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-gold/80" /> Always private
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-gold/80" /> Locally led
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-gold/80" /> Replied within 24 hours
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="relative py-24 sm:py-32 lg:py-40">
        <div className="container-luxe">
          <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-20 xl:gap-28">
            {/* Aside — quieter, editorial */}
            <Reveal>
              <aside className="lg:sticky lg:top-32">
                <p className="eyebrow">Why we ask</p>
                <h2 className="mt-7 max-w-md font-display text-[clamp(1.75rem,2.6vw,2.4rem)] leading-[1.05] tracking-tight">
                  A real brief, written by a real human, makes the difference.
                </h2>
                <p className="mt-7 max-w-md text-pretty text-[0.95rem] leading-[1.7] text-muted-foreground">
                  Every answer below is read by a planner in Colombo before
                  we draft a single line. Skip what doesn&apos;t matter to you. Be
                  generous where it does.
                </p>

                <div className="my-10 hairline" />

                <ul className="space-y-6 text-sm">
                  <li className="flex items-start gap-3.5">
                    <Clock className="mt-0.5 h-4 w-4 text-gold" />
                    <span className="text-muted-foreground">
                      <span className="text-foreground">Reply within 24 hours.</span>{" "}
                      First sketch within 48.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <Mail className="mt-0.5 h-4 w-4 text-gold" />
                    <span className="text-muted-foreground">
                      <span className="text-foreground">Always a real planner.</span>{" "}
                      Never a sales call, never a chatbot.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-gold" />
                    <span className="text-muted-foreground">
                      <span className="text-foreground">No obligation.</span>{" "}
                      Drafting a sketch is part of how we begin.
                    </span>
                  </li>
                  <li className="flex items-start gap-3.5">
                    <Lock className="mt-0.5 h-4 w-4 text-gold" />
                    <span className="text-muted-foreground">
                      <span className="text-foreground">Quietly held.</span>{" "}
                      Your details stay with our small team. Never shared.
                    </span>
                  </li>
                </ul>
              </aside>
            </Reveal>

            {/* The glass form card */}
            <Reveal y={32} duration={1.0} delay={0.1}>
              <div className="relative">
                {/* Soft gold accent */}
                <div
                  aria-hidden
                  className="absolute -inset-x-6 -top-6 h-32 -z-10 bg-gradient-to-b from-gold/[0.08] via-gold/[0.02] to-transparent blur-2xl"
                />
                <div className="glass relative overflow-hidden rounded-2xl shadow-soft sm:rounded-3xl">
                  <div className="hairline-gold" aria-hidden />
                  <div className="p-6 sm:p-10 lg:p-14">
                    <PlanForm />
                  </div>
                  <div className="hairline" aria-hidden />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
