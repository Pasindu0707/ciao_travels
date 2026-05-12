import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/content/gallery";
import {
  SectionTransition,
  Stagger,
  StaggerItem,
  ParallaxMedia,
} from "@/components/motion";
import { cn } from "@/lib/utils";

const preview = gallery.slice(0, 8);

export function GalleryPreview() {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="relative overflow-hidden border-t border-border bg-card/30 py-32 sm:py-40 lg:py-48"
    >
      <div className="container-luxe">
        <SectionTransition
          eyebrow="Field notes"
          title={"The island,\nin pictures."}
          emphasis={["pictures"]}
          intro="A living archive of photographs taken on and around our journeys — quietly updated every season, never sourced from stock."
          side={
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.32em] text-foreground/80"
            >
              <span className="link-underline">Open the gallery</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45 group-hover:text-gold" />
            </Link>
          }
        />

        <Stagger
          className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 lg:gap-5"
          staggerChildren={0.06}
        >
          {preview.map((img, i) => {
            const isFeature = i % 5 === 0;
            return (
              <StaggerItem
                key={i}
                className={cn(
                  "group relative overflow-hidden rounded-md",
                  isFeature && "sm:col-span-2 sm:row-span-2"
                )}
              >
                <figure
                  className={cn(
                    "relative w-full overflow-hidden",
                    isFeature ? "aspect-square" : "aspect-[3/4]"
                  )}
                >
                  <ParallaxMedia
                    speed={isFeature ? 0.28 : 0.18}
                    className="absolute inset-0"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover transition-transform duration-[1600ms] ease-luxury group-hover:scale-[1.06]"
                    />
                  </ParallaxMedia>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.04] transition-colors duration-700 group-hover:ring-gold/30" />
                  <figcaption className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 text-[0.6rem] uppercase tracking-[0.28em] text-cream font-medium opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.caption}
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
