"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { siteConfig } from "@/lib/site";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate mt-32 overflow-hidden border-t border-border bg-background">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      <div className="container-luxe py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand column */}
          <div>
            <Logo />
            <p className="mt-10 max-w-sm text-pretty text-[0.95rem] leading-[1.7] text-muted-foreground">
              We design private, unhurried journeys across Sri Lanka — for
              travellers who measure luxury in stillness, taste, and the people
              they meet.
            </p>

            <dl className="mt-12 space-y-4 text-sm">
              <Row
                label="Email"
                value={siteConfig.contact.email}
                href={`mailto:${siteConfig.contact.email}`}
              />
              <Row
                label="Phone"
                value={siteConfig.contact.phone}
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              />
              <Row label="Office" value={siteConfig.contact.address} />
            </dl>
          </div>

          <FooterColumn title="Explore" items={siteConfig.footerNav.explore} />
          <FooterColumn title="Company" items={siteConfig.footerNav.company} />

          <NewsletterColumn />
        </div>

        {/* Giant wordmark */}
        <div className="mt-28 mask-fade-b" aria-hidden>
          <p className="select-none font-display text-[18vw] font-light leading-[0.85] tracking-tighter text-foreground/[0.045] lg:text-[14vw]">
            Ceylon
          </p>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="text-[0.7rem] text-muted-foreground">
            &copy; {year} {siteConfig.name}. Crafted with care in Colombo.
          </p>
          <div className="flex items-center gap-7">
            {siteConfig.footerNav.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground transition-colors hover:text-foreground focus-ring rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-[0.62rem] font-medium uppercase tracking-[0.36em] text-muted-foreground">
        {title}
      </h4>
      <ul className="mt-7 space-y-4">
        {items.map((item) => (
          <li key={item.label + item.href}>
            <Link
              href={item.href}
              className="link-underline text-[0.95rem] text-foreground/80 hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const valueEl = (
    <span className="text-foreground/85 transition-colors group-hover/row:text-gold">
      {value}
    </span>
  );
  return (
    <div className="group/row flex items-baseline gap-4">
      <dt className="w-12 shrink-0 text-[0.6rem] uppercase tracking-[0.32em] text-foreground/45">
        {label}
      </dt>
      <dd>
        {href ? (
          <a href={href} className="focus-ring rounded-sm">
            {valueEl}
          </a>
        ) : (
          valueEl
        )}
      </dd>
    </div>
  );
}

function NewsletterColumn() {
  type Status = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = React.useState<Status>("idle");
  const [email, setEmail] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    const ok = /^\S+@\S+\.\S+$/.test(email.trim());
    if (!ok) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  }

  return (
    <div>
      <h4 className="text-[0.62rem] font-medium uppercase tracking-[0.36em] text-muted-foreground">
        Letters from Ceylon
      </h4>
      <p className="mt-5 text-pretty text-[0.92rem] leading-[1.7] text-foreground/80">
        A quiet email twice a season. Field notes, new journeys, and the months
        we think you should travel.
      </p>

      {status === "success" ? (
        <p
          role="status"
          className="mt-7 text-sm text-foreground/85"
          aria-live="polite"
        >
          Subscribed.{" "}
          <span className="text-muted-foreground">
            Your first letter will arrive soon.
          </span>
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className={cn(
            "mt-7 flex items-end border-b transition-colors duration-500 focus-within:border-gold",
            status === "error" ? "border-destructive" : "border-foreground/20"
          )}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="your@email.com"
            autoComplete="email"
            className="w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="focus-ring rounded-sm px-1 py-3 text-[0.62rem] uppercase tracking-[0.32em] text-gold transition-colors hover:text-gold-deep disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-xs text-destructive"
        >
          Please enter a valid email.
        </p>
      )}

      <div className="mt-10 flex items-center gap-3">
        <SocialIcon href={siteConfig.social.instagram} label="Instagram">
          <Instagram className="h-4 w-4" />
        </SocialIcon>
        <SocialIcon href={siteConfig.social.facebook} label="Facebook">
          <Facebook className="h-4 w-4" />
        </SocialIcon>
        <SocialIcon href={siteConfig.social.youtube} label="YouTube">
          <Youtube className="h-4 w-4" />
        </SocialIcon>
        <SocialIcon href={siteConfig.social.pinterest} label="Pinterest">
          <PinterestIcon className="h-4 w-4" />
        </SocialIcon>
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all duration-500 hover:border-gold hover:bg-gold/5 hover:text-gold"
    >
      {children}
    </a>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12.04 2C6.78 2 4 5.43 4 9.18c0 1.74.93 3.91 2.42 4.6.23.1.35.06.4-.16.04-.16.23-.92.32-1.28.03-.12.01-.22-.08-.34-.5-.6-.9-1.7-.9-2.74 0-2.65 2-5.21 5.41-5.21 2.95 0 5.01 2.01 5.01 4.89 0 3.25-1.64 5.5-3.77 5.5-1.18 0-2.06-.97-1.78-2.16.34-1.42.99-2.95.99-3.97 0-.92-.49-1.68-1.51-1.68-1.2 0-2.16 1.24-2.16 2.9 0 1.06.36 1.78.36 1.78s-1.2 5.08-1.42 6.02c-.42 1.78.05 4.32.09 4.55.02.14.18.18.26.07.13-.17 1.74-2.59 2.18-3.95.16-.49.91-3.54.91-3.54.45.86 1.76 1.6 3.16 1.6 4.16 0 6.99-3.79 6.99-8.86C20 5.21 16.65 2 12.04 2Z" />
    </svg>
  );
}
