"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-border first:border-t-0", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "focus-ring group flex flex-1 items-start justify-between gap-8 rounded-sm py-8 text-left font-display text-[1.3rem] leading-[1.25] tracking-tight text-foreground transition-colors duration-500 hover:text-gold [&[data-state=open]]:text-gold sm:text-[1.4rem] lg:text-2xl",
        className
      )}
      {...props}
    >
      {children}
      <span className="relative mt-2 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-foreground/20 transition-colors duration-500 group-hover:border-gold group-data-[state=open]:border-gold group-data-[state=open]:bg-gold/10">
        <Plus className="h-3 w-3 transition-all duration-500 ease-luxury group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
        <Minus className="absolute h-3 w-3 opacity-0 transition-all duration-500 ease-luxury group-data-[state=open]:opacity-100" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base text-muted-foreground data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "pb-8 pr-12 max-w-2xl text-[0.95rem] leading-[1.75]",
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
