"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type FaqItem } from "@/content/faq";
import { fadeUp } from "@/lib/motion";
import { FilterChips } from "@/components/shared/filter-chips";
import { EmptyState } from "@/components/shared/empty-state";

const CATEGORIES = [
  "All",
  "Planning",
  "Logistics",
  "On the Ground",
  "Money & Booking",
] as const;

export function FaqFilter({ faqs }: { faqs: FaqItem[] }) {
  const [filter, setFilter] =
    React.useState<(typeof CATEGORIES)[number]>("All");
  const items =
    filter === "All" ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <>
      <FilterChips
        options={CATEGORIES}
        value={filter}
        onChange={setFilter}
        label="Filter questions by category"
      />

      {items.length === 0 ? (
        <div className="mt-14">
          <EmptyState
            title="Nothing here yet."
            description="We haven't written a question under this category. Send us yours and we'll answer personally."
          />
        </div>
      ) : (
        <motion.div
          key={filter}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      )}
    </>
  );
}
