import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { journal, getJournalBySlug } from "@/content/journal";
import { formatDate } from "@/lib/utils";
import { buildMetadata, jsonLdArticle, jsonLdBreadcrumb } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { FinalCta } from "@/components/sections/final-cta";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getJournalBySlug(slug);
  if (!p) return buildMetadata({ title: "Article not found", noindex: true });
  return buildMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/journal/${p.slug}`,
    image: p.cover,
  });
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params;
  const post = getJournalBySlug(slug);
  if (!post) notFound();

  const idx = journal.findIndex((p) => p.slug === slug);
  const more = [journal[(idx + 1) % journal.length], journal[(idx + 2) % journal.length]];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdArticle({
              title: post.title,
              description: post.excerpt,
              image: post.cover,
              url: `${siteConfig.url}/journal/${post.slug}`,
              publishedAt: post.publishedAt,
              author: post.author,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBreadcrumb([
              { name: "Home", url: siteConfig.url },
              { name: "Journal", url: `${siteConfig.url}/journal` },
              { name: post.title, url: `${siteConfig.url}/journal/${post.slug}` },
            ])
          ),
        }}
      />

      <article>
        {/* Hero */}
        <section className="relative isolate flex min-h-[80svh] w-full items-end overflow-hidden pb-16 pt-40">
          <Image src={post.cover} alt={post.coverAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 cinema-overlay" />
          <div className="absolute inset-0 -z-10 grain" />

          <div className="container-luxe w-full">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-cream/70 hover:text-gold"
            >
              <ArrowLeft className="h-3 w-3" />
              All letters
            </Link>
            <p className="mt-6 text-[0.65rem] uppercase tracking-[0.32em] text-cream/70">
              {post.category} · {formatDate(post.publishedAt)} · {post.readTime}
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-display-2xl text-cream text-balance">
              {post.title}
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-cream/85">
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="py-20 sm:py-28">
          <div className="container-reading">
            <p className="font-display text-sm text-muted-foreground">By {post.author}</p>

            <div className="mt-12 space-y-8 text-pretty font-serif text-[1.25rem] leading-[1.75] text-foreground/90">
              {post.body.split("\n").map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-gold"
                      : ""
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-16 hairline" />
            <div className="mt-8 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Written by {post.author}
              </p>
              <Link href="/journal" className="link-underline text-xs uppercase tracking-[0.22em]">
                Back to the journal
              </Link>
            </div>
          </div>
        </section>
      </article>

      {/* More from journal */}
      <section className="border-t border-border bg-card/30 py-20 sm:py-28">
        <div className="container-luxe">
          <p className="eyebrow">Continue reading</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-16">
            {more.map((m) => (
              <Link key={m.slug} href={`/journal/${m.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-card">
                  <Image
                    src={m.cover}
                    alt={m.coverAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1400ms] ease-luxury group-hover:scale-[1.06]"
                  />
                </div>
                <p className="mt-5 text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">
                  {m.category} · {formatDate(m.publishedAt)}
                </p>
                <h3 className="mt-3 font-display text-2xl text-foreground link-underline inline-block">
                  {m.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
