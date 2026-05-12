"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";
import { useScrolled } from "@/lib/hooks";
import { luxuryEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled(32);
  const [open, setOpen] = React.useState(false);

  // Close mobile sheet on route change.
  React.useEffect(() => setOpen(false), [pathname]);

  // The homepage hero is dark — use cream marks until the user scrolls.
  const transparent = !scrolled && pathname === "/";

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: luxuryEase, delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-700 ease-luxury",
        scrolled
          ? "border-b border-border/60 bg-background/75 py-2.5 backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent py-5"
      )}
    >
      <div className="container-luxe flex items-center justify-between gap-4">
        <Logo transparent={transparent} />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteConfig.nav.map((item) => {
            const href: string = item.href;
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring relative rounded-full px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] transition-colors duration-500",
                  active
                    ? "text-gold"
                    : transparent
                    ? "text-cream/75 hover:text-cream"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-4 right-4 h-px bg-gold"
                    transition={{ duration: 0.7, ease: luxuryEase }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle
            className={cn(
              "hidden sm:inline-flex",
              transparent &&
                "border-cream/25 !text-cream hover:!border-gold hover:!text-gold"
            )}
          />
          <Button
            asChild
            size="sm"
            variant="primary"
            className="hidden md:inline-flex"
          >
            <Link href="/plan">Plan your journey</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  "focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 lg:hidden",
                  transparent
                    ? "border-cream/25 text-cream hover:border-gold hover:text-gold"
                    : "border-foreground/15 text-foreground hover:border-gold hover:text-gold"
                )}
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-7 sm:max-w-md">
              <div className="mt-6 flex h-[calc(100svh-3.5rem)] flex-col">
                <Logo />
                <nav aria-label="Mobile" className="mt-10 flex flex-col">
                  {siteConfig.nav.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex items-baseline gap-5 border-b border-border py-5"
                    >
                      <span className="number-tag w-10">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-3xl tracking-tight text-foreground transition-colors duration-500 group-hover:text-gold">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Button
                      asChild
                      variant="primary"
                      size="md"
                      className="flex-1"
                    >
                      <Link href="/plan">Plan your journey</Link>
                    </Button>
                  </div>
                  <dl className="mt-10 space-y-2">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${siteConfig.contact.email}`}
                          className="text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground transition-colors hover:text-gold"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Phone</dt>
                      <dd>
                        <a
                          href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                          className="text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground transition-colors hover:text-gold"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
