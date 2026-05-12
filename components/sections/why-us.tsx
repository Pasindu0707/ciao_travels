import { Compass, Diamond, HandHeart, Leaf } from "lucide-react";
import {
  Reveal,
  Stagger,
  StaggerItem,
  TextMaskReveal,
} from "@/components/motion";

const PILLARS = [
  {
    icon: Compass,
    n: "01",
    title: "Designed, never assembled",
    body:
      "Every itinerary is drafted by a person who has slept in every hotel we recommend. No templates. No shared departures. No agency floor in another country.",
  },
  {
    icon: Diamond,
    n: "02",
    title: "Quietly, the best",
    body:
      "Heritage planter's bungalows. Family villas. Two of Sri Lanka's most loved tented camps. Hotels we send our friends to — and return to ourselves.",
  },
  {
    icon: HandHeart,
    n: "03",
    title: "On the ground, always",
    body:
      "Our chauffeur-guides have been with us for an average of seven years. Our concierge picks up the phone at three in the morning, in three languages.",
  },
  {
    icon: Leaf,
    n: "04",
    title: "Travel that gives back",
    body:
      "Two percent of every booking funds the conservation of Yala's leopards and Wilpattu's elephants. Quietly, every year, without an Instagram caption.",
  },
];

export function WhyUs() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative overflow-hidden border-t border-border bg-card/30 py-32 sm:py-40 lg:py-48"
    >
      <div className="container-luxe">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">Why Ciao Ceylon</p>
            <TextMaskReveal
              text={"A small house,\nby design."}
              emphasis={["house,"]}
              delay={0.1}
              className="mt-8 max-w-[14ch] text-balance font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-tight"
            />
            <p className="mt-10 max-w-md text-pretty text-base leading-[1.7] text-muted-foreground sm:text-lg">
              We accept a limited number of journeys each year. It is the only way we
              know how to deliver the kind of trip you'll remember in detail, twenty
              years from now.
            </p>

            <div className="mt-12 hairline-gold" />

            <div className="mt-12 grid grid-cols-2 gap-8">
              <Stat n="58" label="Journeys per year, max" />
              <Stat n="7 yrs" label="Avg guide tenure" />
            </div>
          </Reveal>

          <Stagger
            className="grid gap-x-10 gap-y-14 sm:grid-cols-2"
            staggerChildren={0.12}
          >
            {PILLARS.map((p) => (
              <StaggerItem key={p.title} className="group">
                <div className="flex items-center gap-4">
                  <span className="number-tag">{p.n}</span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold transition-colors duration-700 group-hover:border-gold group-hover:bg-gold/10">
                    <p.icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl tracking-tight text-foreground lg:text-[1.6rem]">
                  {p.title}
                </h3>
                <p className="mt-4 text-pretty text-[0.95rem] leading-[1.7] text-muted-foreground">
                  {p.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl tracking-tight text-foreground">{n}</p>
      <p className="mt-2 text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
