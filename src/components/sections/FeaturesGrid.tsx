"use client";

import {
  CarFront,
  Gauge,
  Images,
  Settings2,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SvgImage } from "@/components/ui/SvgImage";

const ICONS: Record<string, LucideIcon> = {
  Gauge,
  Users,
  Images,
  CarFront,
  Settings2,
  ShieldAlert,
};

export function FeaturesGrid() {
  return (
    <section className="bg-muted/50 py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            What&apos;s inside your report
          </p>
          <h2 className="reveal-item mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Every signal that matters — in one place
          </h2>
          <p className="reveal-item mt-4 text-base text-foreground-muted">
            Clear sections, plain language, and evidence you can act on at the dealership or
            driveway.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon] ?? Gauge;
            return (
              <article
                key={feature.title}
                className="reveal-item group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 overflow-hidden rounded-xl border border-border bg-background">
                  <SvgImage
                    src={feature.image}
                    alt=""
                    width={480}
                    height={280}
                    className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-on-primary transition-transform duration-200 group-hover:scale-110">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground-muted">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </SectionReveal>
    </section>
  );
}
