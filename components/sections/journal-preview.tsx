import Image from "next/image";
import Link from "next/link";
import { journal } from "@/content/journal";
import { formatDate } from "@/lib/utils";
import {
  SectionTransition,
  Stagger,
  StaggerItem,
  ParallaxMedia,
} from "@/components/motion";

const preview = journal.slice(0, 3);

export function JournalPreview() {
  return (
    <section
      aria-labelledby="journal-heading"
      className="relative py-32 sm:py-40 lg:py-48"
    >
      <div className="container-luxe">
        <SectionTransition
          eyebrow="From the journal"
          title={"Letters from\nCeylon."}
          emphasis={["Ceylon."]}
          intro="Field notes, travel guides and quiet observations from our team in Colombo. Twice a season, sometimes more."
          side={
            <Link
              href="/journal"
              className="link-underline inline-block text-[0.7rem] uppercase tracking-[0.32em] text-foreground/80"
            >
              Read every letter
            </Link>
          }
        />

        <Stagger
          className="mt-20 grid gap-x-8 gap-y-14 md:grid-cols-3 lg:gap-x-10"
          staggerChildren={0.14}
        >
          {preview.map((p, i) => (
            <StaggerItem key={p.slug} as="article" className="group">
              <Link
                href={`/journal/${p.slug}`}
                className="focus-ring block rounded-xl"
                aria-label={`Read: ${p.title}`}
              >
                <ParallaxMedia
                  speed={0.22}
                  className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card"
                >
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1800ms] ease-luxury group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.05] transition-colors duration-700 group-hover:ring-gold/25" />

                  <div className="absolute left-5 top-5 inline-flex items-center gap-3 rounded-full bg-background/80 px-3 py-1.5 backdrop-blur-md">
                    <span className="number-tag">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.58rem] uppercase tracking-[0.28em] font-medium text-foreground">
                      {p.category}
                    </span>
                  </div>
                </ParallaxMedia>
              </Link>

              <div className="mt-7">
                <p className="text-[0.6rem] uppercase tracking-[0.28em] font-medium text-muted-foreground">
                  {formatDate(p.publishedAt)} · {p.readTime}
                </p>
                <h3 className="mt-4 font-display text-[1.55rem] leading-[1.15] tracking-tight text-foreground">
                  <Link href={`/journal/${p.slug}`} className="link-underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-4 text-pretty text-[0.92rem] leading-[1.7] text-muted-foreground">
                  {p.excerpt}
                </p>
                <p className="mt-5 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                  by {p.author}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
