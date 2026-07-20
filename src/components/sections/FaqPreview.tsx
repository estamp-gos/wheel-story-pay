import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAQS, FAQ_PREVIEW_IDS } from "@/lib/faqs";
import { Accordion } from "@/components/ui/Accordion";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function FaqPreview() {
  const items = FAQ_PREVIEW_IDS.map((id) => FAQS.find((f) => f.id === id)!).filter(Boolean);

  return (
    <section className="py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              FAQs
            </p>
            <h2 className="reveal-item mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Answers before you buy a report
            </h2>
          </div>
          <Link
            href="/faqs"
            className="reveal-item inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary transition-colors duration-200 hover:text-accent"
          >
            View all FAQs
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="reveal-item">
          <Accordion items={items} />
        </div>
      </SectionReveal>
    </section>
  );
}
