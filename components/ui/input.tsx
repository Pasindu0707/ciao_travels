import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-none border-0 border-b border-foreground/20 bg-transparent px-1 py-2 font-sans text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-500 ease-luxury",
          "focus-visible:border-gold focus-visible:outline-none",
          "aria-[invalid=true]:border-destructive",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
