import { Reveal } from "@/components/motion";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeading — lighter, ReactNode-friendly header used by inner pages.
 *
 * For pages where the title contains custom JSX (`<em>` etc.). For the
 * homepage, prefer `SectionTransition` which uses a kinetic mask reveal.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow",
            align === "center" && "justify-center before:!w-12"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="mt-8 font-display text-display-lg text-balance lg:text-display-xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-7 text-pretty text-base leading-[1.7] text-muted-foreground sm:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
