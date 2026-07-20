"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { VinForm } from "@/components/ui/VinForm";
import { SvgImage } from "@/components/ui/SvgImage";
import { SITE_TAGLINE } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const items = ref.current?.querySelectorAll(".hero-animate");
      if (!items?.length) return;

      if (prefersReduced) {
        gsap.set(items, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.05,
          clearProps: "transform",
        },
      );
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="check-vin"
      className="hero-wash relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-7">
          <p className="hero-animate mb-4 inline-flex items-center rounded-md border border-border bg-surface/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-secondary backdrop-blur-sm">
            Vehicle history · Inspection insights
          </p>
          <h1 className="hero-animate font-heading text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-[3.5rem]">
            {SITE_TAGLINE}
          </h1>
          <p className="hero-animate mt-5 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            Enter a VIN or plate and uncover accidents, title brands, odometer gaps, theft records,
            and ownership history — before you sign anything.
          </p>
          <div className="hero-animate mt-8">
            <VinForm />
          </div>
        </div>

        <div className="hero-animate relative lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl" aria-hidden />
            <SvgImage
              src="/images/hero-report.svg"
              alt="Sample Vehicle Check vehicle history report preview"
              width={640}
              height={720}
              priority
              className="relative w-full drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
