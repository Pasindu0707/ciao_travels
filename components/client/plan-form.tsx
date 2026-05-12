"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Controller, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Sparkles,
  Heart,
  Users,
  Trees,
  PartyPopper,
  Compass,
  Gem,
  Tent,
  Building2,
  Layers,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { D, luxuryEase } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

const flexibilityValues = ["fixed", "week", "month", "suggest"] as const;
const travelStyleValues = [
  "romantic",
  "honeymoon",
  "family",
  "multigen",
  "friends",
  "solo",
  "celebration",
] as const;
const comfortValues = ["boutique", "five-star", "ultra-luxury", "mix"] as const;

const schema = z
  .object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    flexibility: z.enum(flexibilityValues, {
      errorMap: () => ({ message: "Choose how flexible your dates are." }),
    }),

    adults: z.number().int().min(1, "At least one adult.").max(20),
    children: z.number().int().min(0).max(12),
    childrenAges: z.string().optional(),

    travelStyle: z.enum(travelStyleValues, {
      errorMap: () => ({ message: "Pick the closest fit." }),
    }),

    interests: z
      .array(z.string())
      .min(1, "Choose at least one — even one is fine."),

    comfortLevel: z.enum(comfortValues, {
      errorMap: () => ({ message: "Pick a comfort level you'd like to begin with." }),
    }),

    brief: z
      .string()
      .min(40, "A line or two helps us begin — please share at least 40 characters.")
      .max(1500, "Please keep your brief under 1500 characters."),

    name: z.string().min(2, "Please share your full name."),
    email: z.string().email("That email doesn't look quite right."),
    phone: z.string().optional(),
    country: z.string().min(2, "Where are you reaching out from?"),
    consent: z.boolean().refine((v) => v === true, {
      message: "Please confirm before sending.",
    }),
  })
  .refine(
    (data) =>
      !data.endDate || !data.startDate || data.endDate >= data.startDate,
    {
      message: "Return date should fall on or after the start date.",
      path: ["endDate"],
    }
  );

type FormValues = z.infer<typeof schema>;

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */

const STEPS: Array<{
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  intro: string;
  fields: Array<keyof FormValues>;
}> = [
  {
    id: "dates",
    label: "Dates",
    eyebrow: "Chapter one",
    title: "When does your story begin?",
    intro:
      "Approximate dates are perfect. We'll refine the exact rhythm together.",
    fields: ["startDate", "endDate", "flexibility"],
  },
  {
    id: "travellers",
    label: "Travellers",
    eyebrow: "Chapter two",
    title: "Who is coming with you?",
    intro: "We design every itinerary around the people travelling.",
    fields: ["adults", "children", "childrenAges"],
  },
  {
    id: "style",
    label: "Style",
    eyebrow: "Chapter three",
    title: "How do you like to travel?",
    intro: "Pick the closest fit. We can blend the rest in.",
    fields: ["travelStyle"],
  },
  {
    id: "interests",
    label: "Interests",
    eyebrow: "Chapter four",
    title: "What pulls you toward Sri Lanka?",
    intro:
      "Pick everything that resonates. We'll weave it through your route.",
    fields: ["interests"],
  },
  {
    id: "comfort",
    label: "Comfort",
    eyebrow: "Chapter five",
    title: "How do you like to land at the end of the day?",
    intro:
      "A starting point only. Most journeys mix two or three of these.",
    fields: ["comfortLevel"],
  },
  {
    id: "brief",
    label: "Brief",
    eyebrow: "Chapter six",
    title: "Tell us about your dream trip.",
    intro:
      "Anything goes — favourite hotels elsewhere, mobility needs, celebrations, dietary preferences, hopes, hesitations.",
    fields: ["brief"],
  },
  {
    id: "contact",
    label: "Contact",
    eyebrow: "Chapter seven",
    title: "Where shall we send your first sketch?",
    intro:
      "A real planner replies within 24 hours. Your details stay with our small team.",
    fields: ["name", "email", "phone", "country", "consent"],
  },
];

/* ------------------------------------------------------------------ */
/* Options                                                             */
/* ------------------------------------------------------------------ */

const FLEXIBILITY_OPTIONS: {
  value: (typeof flexibilityValues)[number];
  label: string;
  description: string;
}[] = [
  { value: "fixed", label: "Fixed dates", description: "These dates are firm." },
  { value: "week", label: "Within a week", description: "Flex of a few days either way." },
  { value: "month", label: "Within a month", description: "Open to the best window nearby." },
  { value: "suggest", label: "Suggest a season", description: "We'll recommend the right time." },
];

const STYLE_OPTIONS: {
  value: (typeof travelStyleValues)[number];
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "romantic", label: "Romantic getaway", description: "Just the two of you — slow mornings, candlelit nights.", Icon: Heart },
  { value: "honeymoon", label: "Honeymoon", description: "A milestone trip, quietly orchestrated.", Icon: Sparkles },
  { value: "family", label: "Family with children", description: "Designed for travellers seven to seventy.", Icon: Users },
  { value: "multigen", label: "Multi-generational", description: "Grandparents to grandchildren, paced thoughtfully.", Icon: Trees },
  { value: "friends", label: "Friends together", description: "Two couples, a group of four, a celebration of six.", Icon: PartyPopper },
  { value: "solo", label: "Solo escape", description: "Time alone — with a planner quietly behind you.", Icon: Compass },
  { value: "celebration", label: "A milestone", description: "An anniversary, birthday, vow renewal.", Icon: Gem },
];

const INTERESTS_OPTIONS: { value: string; label: string }[] = [
  { value: "wildlife", label: "Wildlife & safari" },
  { value: "tea", label: "Tea country & gardens" },
  { value: "beach", label: "Beaches & ocean" },
  { value: "culture", label: "Culture & temples" },
  { value: "wellness", label: "Wellness & Ayurveda" },
  { value: "adventure", label: "Adventure & hiking" },
  { value: "gastronomy", label: "Food & gastronomy" },
  { value: "surf", label: "Surf & water sports" },
  { value: "photography", label: "Photography & art" },
  { value: "honeymoon-moments", label: "Honeymoon moments" },
  { value: "family-wonder", label: "Family wonder" },
];

const COMFORT_OPTIONS: {
  value: (typeof comfortValues)[number];
  label: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    value: "boutique",
    label: "Boutique heritage",
    description: "Planter's bungalows, villas, character-rich hideaways.",
    Icon: Tent,
  },
  {
    value: "five-star",
    label: "Five-star",
    description: "Recognised names — Anantara, Cape Weligama, Wild Coast.",
    Icon: Building2,
  },
  {
    value: "ultra-luxury",
    label: "Ultra-luxury",
    description: "Private villas, tented camps, very few neighbours.",
    Icon: Gem,
  },
  {
    value: "mix",
    label: "A thoughtful mix",
    description: "Let us blend the best of each across the route.",
    Icon: Layers,
  },
];

/* ------------------------------------------------------------------ */
/* The form                                                            */
/* ------------------------------------------------------------------ */

export function PlanForm() {
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [submitted, setSubmitted] = React.useState<FormValues | null>(null);
  const reduced = useReducedMotion();
  const stepRef = React.useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      startDate: "",
      endDate: "",
      flexibility: undefined,
      adults: 2,
      children: 0,
      childrenAges: "",
      travelStyle: undefined,
      interests: [],
      comfortLevel: undefined,
      brief: "",
      name: "",
      email: "",
      phone: "",
      country: "",
      consent: false,
    },
  });

  const watched = watch();
  const totalSteps = STEPS.length;

  /* Focus first interactive element on step change. */
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      const node = stepRef.current?.querySelector<HTMLElement>(
        "[data-autofocus],input,textarea,select,button[role='radio'],button[type='button']"
      );
      node?.focus({ preventScroll: true });
    }, reduced ? 0 : 380);
    return () => window.clearTimeout(t);
  }, [step, reduced]);

  async function goNext() {
    const fields = STEPS[step].fields as Array<keyof FormValues>;
    const valid = await trigger(fields, { shouldFocus: true });
    if (!valid) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function goPrev() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(values);
    toast.success("Brief received — we'll be in touch within 24 hours.");
  }

  function startOver() {
    reset();
    setSubmitted(null);
    setStep(0);
    setDirection(1);
  }

  if (submitted) {
    return <SuccessState values={submitted} onAnother={startOver} />;
  }

  const current = STEPS[step];

  return (
    <div className="relative">
      {/* Step progress */}
      <StepProgress step={step} totalSteps={totalSteps} steps={STEPS} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          // Prevent accidental form submit when pressing Enter mid-step,
          // and advance instead (except when in a textarea).
          if (
            e.key === "Enter" &&
            step < totalSteps - 1 &&
            !(e.target instanceof HTMLTextAreaElement) &&
            !(e.target as HTMLElement).hasAttribute("data-allow-enter")
          ) {
            e.preventDefault();
            void goNext();
          }
        }}
        noValidate
      >
        <div ref={stepRef} className="relative">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.section
              key={current.id}
              custom={direction}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24 * direction }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: -24 * direction }}
              transition={{ duration: reduced ? 0.15 : D.slow, ease: luxuryEase }}
              aria-labelledby={`step-${current.id}-title`}
            >
              <StepHeader
                eyebrow={current.eyebrow}
                title={current.title}
                intro={current.intro}
                titleId={`step-${current.id}-title`}
              />

              <div className="mt-12">
                {step === 0 && (
                  <DatesStep
                    register={register}
                    control={control}
                    errors={errors}
                  />
                )}
                {step === 1 && (
                  <TravellersStep
                    register={register}
                    control={control}
                    setValue={setValue}
                    watched={watched}
                    errors={errors}
                  />
                )}
                {step === 2 && (
                  <StyleStep control={control} errors={errors} />
                )}
                {step === 3 && (
                  <InterestsStep
                    control={control}
                    errors={errors}
                    watched={watched}
                  />
                )}
                {step === 4 && (
                  <ComfortStep control={control} errors={errors} />
                )}
                {step === 5 && (
                  <BriefStep
                    register={register}
                    errors={errors}
                    watched={watched}
                  />
                )}
                {step === 6 && (
                  <ContactStep
                    register={register}
                    control={control}
                    errors={errors}
                  />
                )}
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-8">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={goPrev}
            disabled={step === 0}
            className={cn(step === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <p className="hidden text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground sm:block">
            Step {String(step + 1).padStart(2, "0")} of{" "}
            {String(totalSteps).padStart(2, "0")}
          </p>

          {step < totalSteps - 1 ? (
            <Button type="button" variant="primary" size="lg" onClick={goNext}>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner /> Sending…
                </span>
              ) : (
                <>
                  Start your tailored Sri Lanka journey
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step Progress                                                       */
/* ------------------------------------------------------------------ */

function StepProgress({
  step,
  totalSteps,
  steps,
}: {
  step: number;
  totalSteps: number;
  steps: typeof STEPS;
}) {
  const pct = ((step + 1) / totalSteps) * 100;

  return (
    <div className="mb-12">
      {/* Mobile: compact bar with current label */}
      <div className="lg:hidden">
        <div className="flex items-baseline justify-between">
          <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
            Step {String(step + 1).padStart(2, "0")} ·{" "}
            <span className="text-foreground">{steps[step].label}</span>
          </p>
          <p className="text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
            {String(totalSteps).padStart(2, "0")}
          </p>
        </div>
        <div className="relative mt-3 h-px w-full overflow-hidden bg-border">
          <motion.span
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            className="absolute inset-y-0 left-0 block bg-gold"
            aria-hidden
          />
        </div>
      </div>

      {/* Desktop: 7-dot rail with labels */}
      <ol
        className="hidden grid-cols-7 gap-2 lg:grid"
        aria-label="Form progress"
      >
        {steps.map((s, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <li key={s.id} className="relative" aria-current={active ? "step" : undefined}>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.65rem] font-medium tabular-nums transition-all duration-700 ease-luxury",
                    active
                      ? "bg-gold text-charcoal shadow-soft"
                      : done
                      ? "border border-gold/60 bg-gold/10 text-gold"
                      : "border border-border text-muted-foreground"
                  )}
                >
                  {done ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "truncate text-[0.62rem] uppercase tracking-[0.22em] transition-colors",
                    active
                      ? "text-foreground"
                      : done
                      ? "text-foreground/70"
                      : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
              </div>
              <div
                className={cn(
                  "mt-3 h-px w-full origin-left transition-colors duration-700",
                  active || done ? "bg-gold" : "bg-border"
                )}
                aria-hidden
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step header                                                         */
/* ------------------------------------------------------------------ */

function StepHeader({
  eyebrow,
  title,
  intro,
  titleId,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  titleId: string;
}) {
  return (
    <header className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={titleId}
        className="mt-5 font-display text-[clamp(1.9rem,3.2vw,2.85rem)] leading-[1.05] tracking-tight text-foreground"
      >
        {title}
      </h2>
      <p className="mt-5 text-pretty text-[0.95rem] leading-[1.7] text-muted-foreground sm:text-base">
        {intro}
      </p>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Step: Dates                                                         */
/* ------------------------------------------------------------------ */

function DatesStep({
  register,
  control,
  errors,
}: {
  register: ReturnType<typeof useForm<FormValues>>["register"];
  control: Control<FormValues>;
  errors: any;
}) {
  return (
    <div className="grid gap-10">
      <div className="grid gap-7 sm:grid-cols-2 sm:gap-8">
        <FieldShell id="startDate" label="Start date" error={errors.startDate?.message}>
          <Input
            id="startDate"
            type="date"
            data-autofocus
            min={new Date().toISOString().split("T")[0]}
            {...register("startDate")}
          />
        </FieldShell>
        <FieldShell id="endDate" label="Return date" error={errors.endDate?.message}>
          <Input id="endDate" type="date" {...register("endDate")} />
        </FieldShell>
      </div>

      <Controller
        control={control}
        name="flexibility"
        render={({ field }) => (
          <RadioCardGroup
            legend="How flexible are these dates?"
            error={errors.flexibility?.message}
            value={field.value}
            onChange={field.onChange}
            name={field.name}
            options={FLEXIBILITY_OPTIONS.map((o) => ({
              value: o.value,
              label: o.label,
              description: o.description,
            }))}
            columns={2}
          />
        )}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step: Travellers                                                    */
/* ------------------------------------------------------------------ */

function TravellersStep({
  register,
  control,
  setValue,
  watched,
  errors,
}: {
  register: ReturnType<typeof useForm<FormValues>>["register"];
  control: Control<FormValues>;
  setValue: ReturnType<typeof useForm<FormValues>>["setValue"];
  watched: FormValues;
  errors: any;
}) {
  return (
    <div className="grid gap-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <Controller
          control={control}
          name="adults"
          render={({ field }) => (
            <NumberStepper
              label="Adults"
              hint="Age 13 and over"
              min={1}
              max={20}
              value={field.value}
              onChange={field.onChange}
              error={errors.adults?.message}
              autoFocus
            />
          )}
        />
        <Controller
          control={control}
          name="children"
          render={({ field }) => (
            <NumberStepper
              label="Children"
              hint="Age 12 and under"
              min={0}
              max={12}
              value={field.value}
              onChange={(n) => {
                field.onChange(n);
                if (n === 0) setValue("childrenAges", "");
              }}
              error={errors.children?.message}
            />
          )}
        />
      </div>

      <AnimatePresence initial={false}>
        {watched.children > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: D.base, ease: luxuryEase }}
          >
            <FieldShell
              id="childrenAges"
              label="Ages of children (optional)"
              error={errors.childrenAges?.message}
            >
              <Input
                id="childrenAges"
                placeholder="e.g. 7 and 11"
                {...register("childrenAges")}
              />
            </FieldShell>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step: Style                                                         */
/* ------------------------------------------------------------------ */

function StyleStep({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: any;
}) {
  return (
    <Controller
      control={control}
      name="travelStyle"
      render={({ field }) => (
        <RadioCardGroup
          legend="Pick the closest fit"
          srOnlyLegend
          value={field.value}
          onChange={field.onChange}
          name={field.name}
          error={errors.travelStyle?.message}
          columns={2}
          options={STYLE_OPTIONS.map((o) => ({
            value: o.value,
            label: o.label,
            description: o.description,
            Icon: o.Icon,
          }))}
        />
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Step: Interests                                                     */
/* ------------------------------------------------------------------ */

function InterestsStep({
  control,
  errors,
  watched,
}: {
  control: Control<FormValues>;
  errors: any;
  watched: FormValues;
}) {
  return (
    <div>
      <Controller
        control={control}
        name="interests"
        render={({ field }) => (
          <fieldset
            aria-describedby={errors.interests ? "interests-error" : undefined}
          >
            <legend className="sr-only">Interests</legend>
            <div className="flex flex-wrap gap-2.5">
              {INTERESTS_OPTIONS.map((opt, i) => {
                const checked = field.value.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    data-autofocus={i === 0 ? true : undefined}
                    onClick={() =>
                      field.onChange(
                        checked
                          ? field.value.filter((v: string) => v !== opt.value)
                          : [...field.value, opt.value]
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        field.onChange(
                          checked
                            ? field.value.filter(
                                (v: string) => v !== opt.value
                              )
                            : [...field.value, opt.value]
                        );
                      }
                    }}
                    data-allow-enter
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-500 ease-luxury",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      checked
                        ? "border-gold bg-gold/10 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--gold)/0.4)]"
                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-4 w-4 place-items-center rounded-full border transition-colors",
                        checked
                          ? "border-gold bg-gold text-charcoal"
                          : "border-foreground/30 bg-transparent"
                      )}
                      aria-hidden
                    >
                      {checked && <Check className="h-2.5 w-2.5" />}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}
      />
      <div className="mt-5 flex items-center justify-between">
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
          {watched.interests?.length || 0} selected
        </p>
        <FieldError id="interests-error" message={errors.interests?.message} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step: Comfort                                                       */
/* ------------------------------------------------------------------ */

function ComfortStep({
  control,
  errors,
}: {
  control: Control<FormValues>;
  errors: any;
}) {
  return (
    <Controller
      control={control}
      name="comfortLevel"
      render={({ field }) => (
        <RadioCardGroup
          legend="Pick a starting point"
          srOnlyLegend
          value={field.value}
          onChange={field.onChange}
          name={field.name}
          error={errors.comfortLevel?.message}
          columns={2}
          options={COMFORT_OPTIONS.map((o) => ({
            value: o.value,
            label: o.label,
            description: o.description,
            Icon: o.Icon,
          }))}
        />
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Step: Brief                                                         */
/* ------------------------------------------------------------------ */

function BriefStep({
  register,
  errors,
  watched,
}: {
  register: ReturnType<typeof useForm<FormValues>>["register"];
  errors: any;
  watched: FormValues;
}) {
  const value = watched.brief || "";
  const count = value.length;
  const max = 1500;

  return (
    <div>
      <FieldShell id="brief" label="Your brief" error={errors.brief?.message}>
        <Textarea
          id="brief"
          data-autofocus
          rows={9}
          maxLength={max}
          placeholder="A leopard-rich safari for our tenth anniversary, in late February. We adore Aman in Kyoto. Two of us, slow pace, plenty of wine, a hill-country bungalow with a verandah we never want to leave…"
          {...register("brief")}
        />
      </FieldShell>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          The more you share, the better the first sketch.
        </p>
        <p
          className={cn(
            "text-[0.7rem] tabular-nums tracking-wider",
            count > max - 100 ? "text-gold" : "text-muted-foreground"
          )}
        >
          {count} / {max}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step: Contact                                                       */
/* ------------------------------------------------------------------ */

function ContactStep({
  register,
  control,
  errors,
}: {
  register: ReturnType<typeof useForm<FormValues>>["register"];
  control: Control<FormValues>;
  errors: any;
}) {
  return (
    <div className="grid gap-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <FieldShell id="name" label="Your full name" error={errors.name?.message}>
          <Input
            id="name"
            data-autofocus
            placeholder="Jane Whitford"
            autoComplete="name"
            {...register("name")}
          />
        </FieldShell>
        <FieldShell id="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="jane@whitford.co"
            autoComplete="email"
            {...register("email")}
          />
        </FieldShell>
        <FieldShell id="phone" label="Phone (optional)" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 555 0100"
            autoComplete="tel"
            {...register("phone")}
          />
        </FieldShell>
        <FieldShell id="country" label="Country" error={errors.country?.message}>
          <Input
            id="country"
            placeholder="United Kingdom"
            autoComplete="country-name"
            {...register("country")}
          />
        </FieldShell>
      </div>

      <Controller
        control={control}
        name="consent"
        render={({ field }) => (
          <div>
            <label className="group flex cursor-pointer items-start gap-4">
              <span
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all duration-500 ease-luxury",
                  field.value
                    ? "border-gold bg-gold text-charcoal"
                    : "border-foreground/30 bg-transparent"
                )}
                aria-hidden
              >
                {field.value && <Check className="h-3 w-3" />}
              </span>
              <input
                type="checkbox"
                className="sr-only"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
              />
              <span className="text-sm leading-[1.65] text-muted-foreground">
                I'd like Ciao Ceylon Tours to send a first itinerary sketch and
                reply to my enquiry. My details stay with the planning team.
              </span>
            </label>
            <FieldError id="consent-error" message={errors.consent?.message} />
          </div>
        )}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Primitives: RadioCardGroup, NumberStepper, FieldShell, FieldError   */
/* ------------------------------------------------------------------ */

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  Icon?: React.ComponentType<{ className?: string }>;
}

function RadioCardGroup({
  legend,
  srOnlyLegend,
  options,
  value,
  onChange,
  name,
  error,
  columns = 2,
}: {
  legend: string;
  srOnlyLegend?: boolean;
  options: RadioOption[];
  value: string | undefined;
  onChange: (v: string) => void;
  name: string;
  error?: string;
  columns?: 2 | 3 | 4;
}) {
  const groupRef = React.useRef<HTMLDivElement>(null);

  function focusByOffset(currentValue: string, offset: number) {
    const idx = options.findIndex((o) => o.value === currentValue);
    const next = ((idx + offset) % options.length + options.length) % options.length;
    onChange(options[next].value);
    requestAnimationFrame(() => {
      groupRef.current
        ?.querySelector<HTMLElement>(`[data-rval="${options[next].value}"]`)
        ?.focus();
    });
  }

  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className={cn(srOnlyLegend ? "sr-only" : "eyebrow mb-5")}>{legend}</legend>
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label={legend}
        className={cn(
          "grid gap-3 sm:gap-4",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-3",
          columns === 4 && "sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {options.map((opt, i) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : value ? -1 : i === 0 ? 0 : -1}
              data-rval={opt.value}
              data-autofocus={i === 0 ? true : undefined}
              onClick={() => onChange(opt.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  focusByOffset(value ?? opt.value, 1);
                }
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  focusByOffset(value ?? opt.value, -1);
                }
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  onChange(opt.value);
                }
              }}
              data-allow-enter
              className={cn(
                "group relative flex items-start gap-4 rounded-xl border bg-background/40 p-5 text-left transition-all duration-500 ease-luxury",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "hover:border-foreground/30",
                selected
                  ? "border-gold bg-gold/[0.06] shadow-[0_0_0_1px_hsl(var(--gold)/0.45),0_18px_40px_-26px_hsl(var(--gold)/0.45)]"
                  : "border-border"
              )}
            >
              {opt.Icon && (
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                    selected
                      ? "border-gold/70 bg-gold/10 text-gold"
                      : "border-border text-muted-foreground group-hover:text-foreground"
                  )}
                  aria-hidden
                >
                  <opt.Icon className="h-4 w-4" />
                </span>
              )}

              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg leading-tight tracking-tight text-foreground">
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="mt-1.5 block text-sm leading-[1.55] text-muted-foreground">
                    {opt.description}
                  </span>
                )}
              </span>

              <span
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-all duration-500",
                  selected
                    ? "border-gold bg-gold text-charcoal"
                    : "border-foreground/25 bg-transparent"
                )}
                aria-hidden
              >
                {selected && <Check className="h-3 w-3" />}
              </span>
            </button>
          );
        })}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}

function NumberStepper({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max = 99,
  error,
  autoFocus,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  error?: string;
  autoFocus?: boolean;
}) {
  const id = React.useId();
  const canDec = value > min;
  const canInc = value < max;

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {hint && (
        <p className="mt-1 text-[0.7rem] text-muted-foreground">{hint}</p>
      )}
      <div
        className={cn(
          "mt-3 flex items-center justify-between rounded-xl border bg-background/40 px-4 py-3.5 transition-colors",
          error ? "border-destructive" : "border-border"
        )}
      >
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          onClick={() => canDec && onChange(value - 1)}
          disabled={!canDec}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 ease-luxury",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            canDec
              ? "border-border text-foreground hover:border-gold hover:bg-gold/5 hover:text-gold"
              : "border-border/60 text-muted-foreground/40"
          )}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        <input
          id={id}
          data-autofocus={autoFocus ? true : undefined}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (Number.isNaN(n)) return;
            onChange(Math.max(min, Math.min(max, n)));
          }}
          className="w-16 bg-transparent text-center font-display text-3xl tabular-nums text-foreground focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          onClick={() => canInc && onChange(value + 1)}
          disabled={!canInc}
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 ease-luxury",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            canInc
              ? "border-border text-foreground hover:border-gold hover:bg-gold/5 hover:text-gold"
              : "border-border/60 text-muted-foreground/40"
          )}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldShell({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="mt-2">{children}</div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25, ease: luxuryEase }}
          className="mt-2 text-xs text-destructive"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border border-current border-r-transparent"
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------------ */
/* Success State                                                       */
/* ------------------------------------------------------------------ */

function SuccessState({
  values,
  onAnother,
}: {
  values: FormValues;
  onAnother: () => void;
}) {
  const reduced = useReducedMotion();
  const interestLabels = values.interests
    .map((v) => INTERESTS_OPTIONS.find((o) => o.value === v)?.label)
    .filter(Boolean) as string[];
  const styleLabel = STYLE_OPTIONS.find((o) => o.value === values.travelStyle)
    ?.label;
  const comfortLabel = COMFORT_OPTIONS.find(
    (o) => o.value === values.comfortLevel
  )?.label;
  const travellers =
    values.adults + (values.children > 0 ? values.children : 0);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.2 : 0.9, ease: luxuryEase }}
      className="relative"
    >
      <p className="eyebrow">Brief received</p>
      <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02] tracking-tight">
        Thank you, {values.name.split(" ")[0]}.
        <br />
        <em className="font-serif font-light italic text-gold">
          A planner is reading your notes.
        </em>
      </h2>
      <p className="mt-7 max-w-2xl text-pretty text-base leading-[1.7] text-muted-foreground sm:text-lg">
        We've received your brief. Within twenty-four hours, a real planner from
        our Colombo team will reply by email — and within forty-eight, a first
        sketch of your journey will arrive.
      </p>

      {/* Brief summary chips */}
      <div className="mt-12 flex flex-wrap gap-2.5">
        {styleLabel && <SummaryChip>{styleLabel}</SummaryChip>}
        {comfortLabel && <SummaryChip>{comfortLabel}</SummaryChip>}
        {travellers > 0 && (
          <SummaryChip>
            {travellers} {travellers === 1 ? "guest" : "guests"}
          </SummaryChip>
        )}
        {interestLabels.slice(0, 5).map((l) => (
          <SummaryChip key={l} muted>
            {l}
          </SummaryChip>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-14 hairline-gold" />
      <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
        <TimelineStep
          n="01"
          title="A first reply"
          body="Within 24 hours, a planner emails to introduce themselves and ask anything that's still unclear."
          eta="Today / tomorrow"
        />
        <TimelineStep
          n="02"
          title="Your first sketch"
          body="Within 48 hours, a complete draft itinerary — hotels, route, pace, indicative pricing."
          eta="By end of week"
        />
        <TimelineStep
          n="03"
          title="Refine, together"
          body="We iterate by email or a call until the trip is yours, then hold it with a 30% deposit."
          eta="A few quiet weeks"
        />
      </ol>

      <div className="mt-14 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Button asChild variant="primary" size="lg">
          <Link href="/journal">Read the journal</Link>
        </Button>
        <Button variant="ghost" size="md" onClick={onAnother}>
          Send another brief
        </Button>
      </div>

      <div className="mt-12 hairline" />
      <div className="mt-8 grid gap-6 text-sm text-muted-foreground sm:grid-cols-3">
        <p className="inline-flex items-start gap-3">
          <Mail className="mt-0.5 h-4 w-4 text-gold" />
          <span>
            Sent to <span className="text-foreground">{values.email}</span>
          </span>
        </p>
        <p className="inline-flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 text-gold" />
          <span>Reply within 24 hours</span>
        </p>
        <p className="inline-flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 text-gold" />
          <span>Crafted in Colombo</span>
        </p>
      </div>
    </motion.div>
  );
}

function SummaryChip({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.22em]",
        muted
          ? "border border-border text-muted-foreground"
          : "border border-gold/40 bg-gold/10 text-foreground"
      )}
    >
      {children}
    </span>
  );
}

function TimelineStep({
  n,
  title,
  body,
  eta,
}: {
  n: string;
  title: string;
  body: string;
  eta: string;
}) {
  return (
    <li>
      <div className="flex items-center gap-4">
        <span className="number-tag">{n}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <p className="mt-5 text-[0.58rem] uppercase tracking-[0.3em] text-gold/80">
        {eta}
      </p>
      <h3 className="mt-2 font-display text-xl tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-[0.92rem] leading-[1.65] text-muted-foreground">
        {body}
      </p>
    </li>
  );
}
