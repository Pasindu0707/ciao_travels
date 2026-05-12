import Link from "next/link";
import { Mail, FileText, MapPinned, Plane } from "lucide-react";
import {
  SectionTransition,
  Stagger,
  StaggerItem,
  Reveal,
  MagneticButton,
} from "@/components/motion";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    n: "01",
    icon: Mail,
    title: "A first conversation",
    body:
      "Share what you love and how you travel. We respond within twenty-four hours — no forms, no scripts, no sales call.",
    eta: "Day 01",
  },
  {
    n: "02",
    icon: FileText,
    title: "A draft journey",
    body:
      "Within a week, you receive a fully designed itinerary, hotel-by-hotel, with pricing, photographs and an honest opinion.",
    eta: "Day 04 — 07",
  },
  {
    n: "03",
    icon: MapPinned,
    title: "Refine, together",
    body:
      "We iterate until it feels exactly right. You'll know your guide's name, your driver's face, and which morning to pack light.",
    eta: "Day 08 — 14",
  },
  {
    n: "04",
    icon: Plane,
    title: "Travel quietly",
    body:
      "We meet you at arrivals. Your trip is supported on the ground by our team, twenty-four hours a day, until you wave at departures.",
    eta: "The trip",
  },
];

export function PlanningTimeline() {
  return (
    <section
      aria-labelledby="planning-heading"
      className="relative py-32 sm:py-40 lg:py-48"
    >
      <div className="container-luxe">
        <SectionTransition
          eyebrow="How it works"
          title={"Four quiet steps.\nNo pressure."}
          emphasis={["pressure."]}
          intro="From first email to last-night dinner, every interaction with our team is slow, considered, and entirely on your terms."
          align="center"
          hairline
        />

        <Stagger
          as="ol"
          className="relative mt-24 grid gap-y-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10"
          staggerChildren={0.14}
        >
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[28px] hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block"
          />

          {STEPS.map((s) => (
            <StaggerItem key={s.n} as="li" className="group relative">
              <div className="flex items-center gap-4">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-background text-gold transition-all duration-700 group-hover:bg-gold/10">
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="font-display text-[2.6rem] leading-none tracking-tight text-foreground/[0.12]">
                  {s.n}
                </span>
              </div>

              <div className="mt-8">
                <p className="text-[0.58rem] uppercase tracking-[0.32em] font-medium text-gold/80">
                  {s.eta}
                </p>
                <h3 className="mt-3 font-display text-xl tracking-tight text-foreground lg:text-[1.4rem]">
                  {s.title}
                </h3>
                <p className="mt-4 text-pretty text-[0.92rem] leading-[1.7] text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <div className="mt-20 flex flex-col items-center gap-5">
            <MagneticButton>
              <Button asChild size="lg" variant="primary">
                <Link href="/plan">Start a quiet conversation</Link>
              </Button>
            </MagneticButton>
            <p className="text-xs text-muted-foreground/80">
              We reply within 24 hours, in business hours, from Colombo.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
