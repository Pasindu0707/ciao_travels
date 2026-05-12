import { trustLogos } from "@/content/testimonials";
import { Reveal } from "@/components/motion";

export function TrustRail() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="relative border-y border-border bg-background py-12 lg:py-14"
    >
      <h2 id="trust-heading" className="sr-only">
        Featured in
      </h2>

      <Reveal y={14} duration={0.9} className="container-luxe">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="flex items-center gap-4 lg:shrink-0">
            <span className="h-px w-8 bg-gold/60" />
            <p className="text-[0.62rem] uppercase tracking-[0.42em] text-muted-foreground font-medium">
              As featured in
            </p>
          </div>

          <div className="relative w-full max-w-5xl overflow-hidden mask-fade-x">
            <div className="flex w-max items-center gap-14 will-change-transform animate-marquee lg:gap-20">
              {[...trustLogos, ...trustLogos].map((logo, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap font-display text-lg font-light tracking-tight text-foreground/40 transition-colors duration-700 hover:text-foreground lg:text-xl"
                  aria-hidden={i >= trustLogos.length}
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
