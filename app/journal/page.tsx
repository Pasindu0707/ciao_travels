import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/shared/page-hero";
import { journal } from "@/content/journal";
import { formatDate } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Journal",
  description:
    "Field notes, travel guides, and quiet observations from our team in Colombo — the journal of Ciao Ceylon Tours.",
  path: "/journal",
});

export default function JournalPage() {
  const [featured, ...rest] = journal;
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Letters from _Ceylon_."
        intro="Field notes, travel guides, and quiet observations from our team. Twice a season, sometimes more."
        image="https://images.unsplash.com/photo-1591635566278-12d0334ce05c?auto=format&fit=crop&w=2880&q=85"
        imageAlt="Galle Fort streets at golden hour"
      />

      {/* Featured */}
      <section className="py-16 sm:py-24">
        <div className="container-luxe">
          <Link href={`/journal/${featured.slug}`} className="group block">
            <article className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-card lg:aspect-auto lg:min-h-[520px]">
                <Image
                  src={featured.cover}
                  alt={featured.coverAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[1400ms] ease-luxury group-hover:scale-[1.04]"
                />
                <div className="absolute left-5 top-5 inline-flex items-center gap-3 rounded-full bg-background/80 px-3 py-1 backdrop-blur-sm">
                  <span className="number-tag">Featured</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.22em] text-foreground">
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {formatDate(featured.publishedAt)} · {featured.readTime}
                </p>
                <h2 className="mt-4 font-display text-display-md text-foreground lg:text-display-lg text-balance">
                  {featured.title}
                </h2>
                <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {featured.excerpt}
                </p>
                <p className="mt-6 text-sm text-foreground">By {featured.author}</p>
                <span className="link-underline mt-8 inline-block text-sm uppercase tracking-[0.22em] text-foreground/80">
                  Read the letter
                </span>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* List */}
      <section className="border-t border-border py-20 sm:py-28">
        <div className="container-luxe">
          <p className="eyebrow">More from the journal</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {rest.map((p, i) => (
              <article key={p.slug} className="group">
                <Link href={`/journal/${p.slug}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-card">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1400ms] ease-luxury group-hover:scale-[1.06]"
                    />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-3 rounded-full bg-background/80 px-3 py-1 backdrop-blur-sm">
                      <span className="number-tag">0{i + 2}</span>
                      <span className="text-[0.6rem] uppercase tracking-[0.22em] text-foreground">
                        {p.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <p className="mt-6 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {formatDate(p.publishedAt)} · {p.readTime}
                </p>
                <h3 className="mt-3 font-display text-2xl text-foreground leading-snug">
                  <Link href={`/journal/${p.slug}`} className="link-underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {p.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
