"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Please share your full name."),
  email: z.string().email("That email doesn't look right."),
  phone: z.string().optional(),
  subject: z.string().min(3, "A short subject helps us route this."),
  message: z.string().min(20, "Tell us a little more — at least a few sentences."),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 900));
    console.log("Contact submission:", values);
    toast.success("Thank you. We'll be in touch within 24 hours.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10" noValidate>
      <div className="grid gap-10 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name?.message}>
          <Input id="name" placeholder="Jane Whitford" {...register("name")} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input id="email" type="email" placeholder="jane@whitford.co" {...register("email")} />
        </Field>
      </div>
      <div className="grid gap-10 sm:grid-cols-2">
        <Field id="phone" label="Phone (optional)" error={errors.phone?.message}>
          <Input id="phone" placeholder="+1 555 0100" {...register("phone")} />
        </Field>
        <Field id="subject" label="Subject" error={errors.subject?.message}>
          <Input id="subject" placeholder="A quiet enquiry" {...register("subject")} />
        </Field>
      </div>
      <Field id="message" label="Tell us a little" error={errors.message?.message}>
        <Textarea
          id="message"
          rows={6}
          placeholder="When you're thinking of travelling, who's coming with you, and anything you already know you'd love to do…"
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col items-start gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We reply within 24 hours. No call centres, no auto-responders.
        </p>
        <Button type="submit" disabled={isSubmitting} size="lg" variant="primary">
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
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
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
