import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/client/contact-form";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with the Ciao Ceylon Tours team — a real planner will reply within 24 hours. No call centres, no auto-responders.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="A real planner. _Within_ a day."
        intro="Tell us a little about how you travel and what you'd love to see. We'll come back to you within twenty-four hours, from a human, in Colombo."
        image="https://images.unsplash.com/photo-1577094945207-ec24cf2d36e2?auto=format&fit=crop&w=2880&q=85"
        imageAlt="Kandy temple lights at twilight"
      />

      <section className="py-20 sm:py-28">
        <div className="container-luxe grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Contact info */}
          <aside>
            <p className="eyebrow">Speak with us</p>
            <h2 className="mt-6 text-display-md text-balance">
              Three ways to reach a planner.
            </h2>

            <div className="mt-12 space-y-8">
              <Method icon={Mail} label="Email" value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
              <Method icon={Phone} label="Phone" value={siteConfig.contact.phone} href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} />
              <Method
                icon={MessageCircle}
                label="WhatsApp"
                value="Chat with a planner"
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              />
            </div>

            <Separator className="my-12" />

            <p className="eyebrow">Visit us</p>
            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-gold" />
              <div>
                <p className="text-sm text-foreground">{siteConfig.contact.address}</p>
                <p className="mt-2 text-xs text-muted-foreground">By appointment only</p>
              </div>
            </div>

            <Separator className="my-12" />

            <p className="eyebrow">Office hours</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Mon — Fri</dt>
                <dd className="text-foreground">9:00 — 18:00 SLT</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Saturday</dt>
                <dd className="text-foreground">10:00 — 14:00 SLT</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Sunday</dt>
                <dd className="text-foreground">Closed</dd>
              </div>
              <div className="pt-3">
                <p className="text-xs text-muted-foreground">
                  Travelling guests are supported 24/7 by our on-ground concierge.
                </p>
              </div>
            </dl>
          </aside>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card/40 p-8 lg:p-12">
            <p className="eyebrow">Write to us</p>
            <h2 className="mt-6 text-display-md">A first conversation.</h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
              No forms, no scripts, no sales call. The more you share now, the better the
              first sketch we'll send back.
            </p>

            <div className="mt-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Method({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a href={href} className="group flex items-start gap-4">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-foreground/15 text-foreground transition-colors group-hover:border-gold group-hover:text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-lg text-foreground transition-colors group-hover:text-gold">
          {value}
        </p>
      </div>
    </a>
  );
}
