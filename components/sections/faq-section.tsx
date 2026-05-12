import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/content/faq";
import { Reveal, TextMaskReveal } from "@/components/motion";

const preview = faqs.slice(0, 6);

interface FaqSectionProps {
  items?: typeof faqs;
  showLink?: boolean;
  title?: string;
  emphasis?: string[];
}

export function FaqSection({
  items = preview,
  showLink = true,
  title = "Questions,\nanswered.",
  emphasis = ["answered."],
}: FaqSectionProps) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="relative overflow-hidden border-t border-border bg-card/30 py-32 sm:py-40 lg:py-48"
    >
      <div className="container-luxe">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow">Frequently asked</p>
            <TextMaskReveal
              text={title}
              emphasis={emphasis}
              delay={0.1}
              as="h2"
              className="mt-8 font-display text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.98] tracking-tight text-balance"
            />
            <span id="faq-heading" className="sr-only">
              Frequently asked questions
            </span>
            <p className="mt-10 text-pretty text-base leading-[1.7] text-muted-foreground">
              Still unsure? Write to a planner directly — we reply within twenty-four
              hours, from a real human, in Colombo.
            </p>
            {showLink && (
              <Link
                href="/faq"
                className="link-underline mt-10 inline-block text-[0.7rem] uppercase tracking-[0.32em] text-foreground/80"
              >
                Read the full FAQ
              </Link>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, i) => (
                <AccordionItem key={item.question} value={`item-${i}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
