"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";

const ACTIVITY = [
  { city: "Austin, TX", make: "2018 Toyota Camry", flag: "Clear title" },
  { city: "London, UK", make: "2020 BMW 3 Series", flag: "1 accident found" },
  { city: "Toronto, CA", make: "2019 Honda CR-V", flag: "No theft record" },
  { city: "Berlin, DE", make: "2017 VW Golf", flag: "Open recall" },
  { city: "Chicago, IL", make: "2021 Ford F-150", flag: "Odometer verified" },
  { city: "Sydney, AU", make: "2016 Mazda CX-5", flag: "2 prior owners" },
];

export function LiveActivity() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ACTIVITY.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const current = ACTIVITY[index];

  return (
    <section className="py-10">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-item overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
              </span>
              <p className="text-sm font-semibold text-foreground">Live report activity</p>
            </div>

            <div
              key={index}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground-muted"
            >
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <MapPin className="h-3.5 w-3.5 text-secondary" aria-hidden />
                {current.city}
              </span>
              <span className="hidden text-border sm:inline">|</span>
              <span>{current.make}</span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-success/10 px-2 py-1 text-xs font-semibold text-success">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                {current.flag}
              </span>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
