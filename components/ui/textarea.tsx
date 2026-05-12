import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[140px] w-full resize-none rounded-none border-0 border-b border-foreground/20 bg-transparent px-1 py-2 font-sans text-base text-foreground placeholder:text-muted-foreground/70 transition-colors duration-500 ease-luxury",
        "focus-visible:border-gold focus-visible:outline-none",
        "aria-[invalid=true]:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
