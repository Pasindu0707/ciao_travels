import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-700 ease-luxury disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-charcoal shadow-soft hover:bg-gold-deep hover:text-cream hover:shadow-gold-glow",
        secondary: "bg-foreground text-background hover:bg-foreground/90",
        outline:
          "border border-foreground/20 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/5",
        ghost: "bg-transparent text-foreground hover:bg-foreground/5",
        link: "h-auto px-0 py-0 text-foreground hover:text-gold underline-offset-8 hover:underline rounded-none",
        glass:
          "border border-cream/20 bg-cream/10 text-cream backdrop-blur-md hover:border-cream/40 hover:bg-cream/15",
      },
      size: {
        sm: "h-9 px-5 text-xs",
        md: "h-11 px-7 text-sm",
        lg: "h-[3.25rem] px-9 text-[0.78rem] uppercase tracking-[0.22em]",
        xl: "h-[3.75rem] px-12 text-[0.78rem] uppercase tracking-[0.24em]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
