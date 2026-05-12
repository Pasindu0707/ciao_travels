export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid min-h-[100svh] place-items-center bg-background"
    >
      <div className="flex flex-col items-center gap-7">
        <span className="relative grid h-14 w-14 place-items-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-gold/30 animate-quiet-pulse"
          />
          <span
            aria-hidden
            className="absolute inset-2 rounded-full border border-gold/15"
          />
          <span className="relative font-display text-xl text-gold">C</span>
        </span>
        <p className="text-[0.62rem] uppercase tracking-[0.36em] text-muted-foreground">
          One moment …
        </p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
