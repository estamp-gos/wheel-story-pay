"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { FAQS, FAQ_CATEGORIES } from "@/lib/faqs";

export default function FaqsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | "reports" | "pricing" | "service">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((faq) => {
      const catOk = category === "all" || faq.category === category;
      if (!catOk) return false;
      if (!q) return true;
      return (
        faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const grouped = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    items: filtered.filter((f) => f.category === cat.id),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="pt-24">
      <section className="border-b border-border bg-muted/40 pb-12 pt-10">
        <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Help center
          </p>
          <h1 className="reveal-item mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="reveal-item mt-4 max-w-xl text-foreground-muted">
            Search by keyword or browse by topic. Still stuck?{" "}
            <Link href="/contact" className="cursor-pointer font-semibold text-primary hover:text-accent">
              Contact support
            </Link>
            .
          </p>

          <div className="reveal-item relative mt-8 max-w-xl">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-foreground-muted"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 text-sm shadow-sm transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              aria-label="Search FAQs"
            />
          </div>

          <div className="reveal-item mt-4 flex flex-wrap gap-2">
            <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
              All
            </FilterChip>
            {FAQ_CATEGORIES.map((cat) => (
              <FilterChip
                key={cat.id}
                active={category === cat.id}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </FilterChip>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          {grouped.length === 0 ? (
            <p className="text-center text-foreground-muted">
              No questions match &ldquo;{query}&rdquo;. Try another keyword or{" "}
              <Link href="/contact" className="cursor-pointer font-semibold text-primary hover:text-accent">
                contact us
              </Link>
              .
            </p>
          ) : (
            grouped.map((group) => (
              <div key={group.id}>
                <h2 className="mb-4 font-heading text-xl font-bold text-foreground">{group.label}</h2>
                <Accordion items={group.items} />
              </div>
            ))
          )}
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface px-8 py-10 shadow-sm sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Ready to run a check?</h2>
              <p className="mt-2 text-foreground-muted">Enter a VIN or plate on the homepage.</p>
            </div>
            <Link href="/#check-vin" className="cursor-pointer">
              <Button size="lg">Check VIN</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-primary text-on-primary"
          : "border border-border bg-surface text-secondary hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}
