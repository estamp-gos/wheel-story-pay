"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { OFFICE_ADDRESS, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/constants";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL: FormState = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Subject is required.";
    if (!form.message.trim() || form.message.trim().length < 10)
      next.message = "Please include a message (at least 10 characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    console.log("[Vehicle Check contact]", form);
    setSubmitting(false);
    setSuccess(true);
    setForm(INITIAL);
  };

  return (
    <div className="pt-24">
      <section className="border-b border-border bg-muted/40 pb-12 pt-10">
        <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Contact
          </p>
          <h1 className="reveal-item mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="reveal-item mt-4 max-w-xl text-foreground-muted">
            Questions about a report, billing, or finding your VIN? Send a message — typical first
            response is under two minutes during peak hours.
          </p>
        </SectionReveal>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-14 lg:px-8">
          <div className="lg:col-span-3">
            {success ? (
              <div className="rounded-2xl border border-success/20 bg-success/5 p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-success" aria-hidden />
                <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Message sent</h2>
                <p className="mt-2 text-foreground-muted">
                  Thanks for reaching out. Our support team will reply to your email shortly.
                </p>
                <Button className="mt-6" variant="outline" onClick={() => setSuccess(false)}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    error={errors.name}
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    autoComplete="name"
                  />
                  <Field
                    label="Email"
                    type="email"
                    error={errors.email}
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    autoComplete="email"
                  />
                </div>
                <div className="mt-5">
                  <Field
                    label="Subject"
                    error={errors.subject}
                    value={form.subject}
                    onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
                  />
                </div>
                <div className="mt-5">
                  <label className="block text-sm font-semibold text-foreground">
                    Message
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="mt-1.5 w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                      aria-invalid={Boolean(errors.message)}
                    />
                  </label>
                  {errors.message && (
                    <p className="mt-1 text-sm text-accent" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>
                <Button type="submit" size="lg" className="mt-6" disabled={submitting}>
                  {submitting ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="font-heading text-lg font-semibold text-foreground">Contact details</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="cursor-pointer text-foreground transition-colors duration-200 hover:text-accent"
                  >
                    {SUPPORT_EMAIL}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <a
                    href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`}
                    className="cursor-pointer text-foreground transition-colors duration-200 hover:text-accent"
                  >
                    {SUPPORT_PHONE}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="text-foreground-muted">{OFFICE_ADDRESS}</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="text-foreground-muted">
                    Support: Mon–Fri 8am–8pm PT
                    <br />
                    Purchased reports: available 24/7
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-muted/60 p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Need a quick answer?
              </h2>
              <p className="mt-2 text-sm text-foreground-muted">
                Browse common questions about reports, pricing, and finding your VIN.
              </p>
              <Link
                href="/faqs"
                className="mt-4 inline-flex cursor-pointer text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
              >
                Visit FAQs →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-foreground">
      {label}
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
        aria-invalid={Boolean(error)}
      />
      {error && (
        <span className="mt-1 block text-sm font-medium text-accent" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
