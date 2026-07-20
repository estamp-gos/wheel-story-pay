"use client";

import { useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ensure panels animate height smoothly when toggled via CSS + GSAP
    },
    { scope: containerRef },
  );

  const toggle = (id: string, panel: HTMLDivElement | null) => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isOpening = openId !== id;
    setOpenId(isOpening ? id : null);

    if (!panel || prefersReduced) return;

    if (isOpening) {
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" },
      );
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div ref={containerRef} className="divide-y divide-border rounded-xl border border-border bg-surface">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${baseId}-${item.id}-btn`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className="px-5">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-accent"
              onClick={(e) => {
                const panel = document.getElementById(panelId) as HTMLDivElement | null;
                toggle(item.id, panel);
                void e;
              }}
            >
              <span className="font-heading text-base font-semibold text-foreground md:text-lg">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-secondary transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden ${isOpen ? "pb-5" : "h-0 opacity-0"}`}
            >
              <p className="max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
