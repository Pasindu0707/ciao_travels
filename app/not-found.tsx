import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TextMaskReveal, Reveal } from "@/components/motion";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2880&q=85"
        alt="Sri Lankan jungle in soft morning mist"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 cinema-overlay" aria-hidden />
      <div className="absolute inset-0 -z-10 cinema-overlay-side" aria-hidden />
      <div className="absolute inset-0 -z-10 grain" aria-hidden />

      <div className="container-luxe">
        <Reveal y={12} duration={0.9}>
          <p className="number-tag !text-cream/70">Error · 404</p>
        </Reveal>

        <TextMaskReveal
          text={"A path\nnot yet travelled."}
          emphasis={["travelled."]}
          immediate
          delay={0.3}
          staggerChildren={0.09}
          duration={1.1}
          as="h1"
          className="mt-8 max-w-3xl font-display text-display-2xl text-cream"
        />

        <Reveal y={16} duration={1.0} delay={0.4}>
          <p className="mt-9 max-w-xl text-pretty text-base leading-[1.65] text-cream/85 sm:text-lg">
            The page you were looking for has moved, or perhaps it never existed.
            Let us help you find your way back.
          </p>
        </Reveal>

        <Reveal y={12} duration={0.9} delay={0.65}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button asChild size="lg" variant="primary">
              <Link href="/">Return home</Link>
            </Button>
            <Button asChild size="lg" variant="glass">
              <Link href="/journeys">Browse journeys</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
