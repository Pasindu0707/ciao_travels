import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-foreground/15 bg-foreground/5 text-muted-foreground",
        gold: "border-gold/40 bg-gold/10 text-gold-deep dark:text-gold",
        teal: "border-teal/40 bg-teal/10 text-teal dark:text-cream",
        outline: "border-foreground/20 text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
