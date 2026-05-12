import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  /** Optional CTA element (Button, Link, etc.). */
  action?: React.ReactNode;
  className?: string;
}

/**
 * EmptyState — used when a filter returns no results. Quiet, editorial.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "card-luxe mx-auto flex max-w-xl flex-col items-center px-8 py-14 text-center",
        className
      )}
    >
      <div
        aria-hidden
        className="grid h-12 w-12 place-items-center rounded-full border border-gold/30"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      </div>
      <p className="mt-6 font-display text-xl tracking-tight text-foreground">
        {title}
      </p>
      {description && (
        <p className="mt-3 max-w-md text-[0.92rem] leading-[1.65] text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
