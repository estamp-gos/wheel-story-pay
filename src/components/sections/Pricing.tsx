"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { usePricing } from "@/components/providers/PricingProvider";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

const INCLUDES = [
  "Full multi-database vehicle history scan",
  "Accident, title brand & odometer analysis",
  "Theft check and open recall flags",
  "Downloadable PDF + shareable link",
  "Email delivery within minutes",
];

export function Pricing() {
  const { pricing } = usePricing();

  return (
    <section id="pricing" className="py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Simple pricing
            </p>
            <h2 className="reveal-item mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              One report. Full clarity. No subscription.
            </h2>
            <p className="reveal-item mt-4 text-base leading-relaxed text-foreground-muted">
              Pay once for a complete history report. Prices are localized from our USD base rate
              using live exchange data for your region.
            </p>
            <ul className="reveal-item mt-6 space-y-3">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal-item rounded-2xl border border-border bg-surface p-8 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Standard Report
            </p>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-heading text-5xl font-bold text-accent-warm">
                {pricing.formatted}
              </span>
              <span className="mb-2 text-sm text-foreground-muted">per VIN</span>
            </div>
            <p className="mt-2 text-xs text-foreground-muted">
              Prices shown in {pricing.currency} ({pricing.countryCode}) based on your location
            </p>
            <Link href="/#check-vin" className="mt-8 block cursor-pointer">
              <Button size="lg" className="w-full">
                Check a VIN now
              </Button>
            </Link>
            <p className="mt-4 text-center text-xs text-foreground-muted">
              Secure checkout · Instant access · No hidden fees
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
