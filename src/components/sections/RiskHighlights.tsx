"use client";

import { useRef } from "react";
import {
  AlertTriangle,
  Droplets,
  Gauge,
  ShieldOff,
  FileWarning,
  Ban,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionReveal } from "@/components/ui/SectionReveal";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const RISKS = [
  {
    icon: AlertTriangle,
    title: "Hidden accidents",
    detail: "Insurance & auction damage events sellers often omit",
    level: 86,
  },
  {
    icon: Gauge,
    title: "Odometer rollbacks",
    detail: "Mileage gaps across title and service checkpoints",
    level: 72,
  },
  {
    icon: Droplets,
    title: "Flood & salvage brands",
    detail: "Title brands that can wipe thousands off resale value",
    level: 64,
  },
  {
    icon: ShieldOff,
    title: "Theft & recovery flags",
    detail: "Stolen-vehicle and recovery status before you pay",
    level: 58,
  },
  {
    icon: FileWarning,
    title: "Open recalls",
    detail: "Unfixed manufacturer safety campaigns still active",
    level: 79,
  },
  {
    icon: Ban,
    title: "Lemon / rebuild titles",
    detail: "Branded titles that limit financing and insurance",
    level: 51,
  },
];

export function RiskHighlights() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const bars = ref.current?.querySelectorAll(".risk-bar-fill");
      if (!bars?.length) return;

      if (prefersReduced) {
        bars.forEach((bar) => {
          const el = bar as HTMLElement;
          el.style.width = el.dataset.level ? `${el.dataset.level}%` : "0%";
        });
        return;
      }

      gsap.fromTo(
        bars,
        { width: "0%" },
        {
          width: (_i, target) => `${(target as HTMLElement).dataset.level || 0}%`,
          duration: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <section className="border-y border-border bg-primary py-16 text-on-primary sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Risk radar
            </p>
            <h2 className="reveal-item mt-3 font-heading text-3xl font-bold sm:text-4xl">
              The problems a quick look can&apos;t catch
            </h2>
            <p className="reveal-item mt-4 text-base leading-relaxed text-slate-300">
              A clean paint job and a polished listing don&apos;t mean a clean history. Vehicle Check
              surfaces the high-cost risks that show up after you&apos;ve already paid.
            </p>
            <div className="reveal-item mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-heading text-lg font-semibold">Average buyer savings</p>
              <p className="mt-1 font-heading text-4xl font-bold tracking-tight">$2,400+</p>
              <p className="mt-2 text-sm text-slate-400">
                Negotiated or avoided after spotting undisclosed damage or title issues in a report.
              </p>
            </div>
          </div>

          <div ref={ref} className="reveal-item grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {RISKS.map((risk) => (
              <article
                key={risk.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-200 hover:bg-white/10"
              >
                <div className="mb-3 flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                    <risk.icon className="h-5 w-5 text-slate-200" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold">{risk.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{risk.detail}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    <span>Detection strength</span>
                    <span>{risk.level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="risk-bar-fill h-full rounded-full bg-slate-200"
                      data-level={risk.level}
                      style={{ width: 0 }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
