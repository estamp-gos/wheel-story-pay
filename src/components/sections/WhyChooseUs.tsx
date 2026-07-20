import {
  Clock3,
  FileDown,
  Globe2,
  Lock,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

const HIGHLIGHTS = [
  {
    icon: ScanSearch,
    title: "Multi-source scan",
    text: "Title, auction, insurance, recall, and theft databases checked in one pass.",
    span: "sm:col-span-2",
  },
  {
    icon: Clock3,
    title: "Minutes, not days",
    text: "Most reports are ready before you leave the lot.",
    span: "",
  },
  {
    icon: FileDown,
    title: "Shareable PDF",
    text: "Send findings to a mechanic, lender, or seller with one link.",
    span: "",
  },
  {
    icon: Globe2,
    title: "Localized pricing",
    text: "See the report cost in your currency, based on where you browse.",
    span: "",
  },
  {
    icon: Lock,
    title: "Private by design",
    text: "Encrypted checkout and private report delivery to your email.",
    span: "",
  },
  {
    icon: Sparkles,
    title: "Plain-language flags",
    text: "No data dump — clear risk labels you can act on immediately.",
    span: "sm:col-span-2",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Why Vehicle Check
            </p>
            <h2 className="reveal-item mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Built for the moment you almost say yes
            </h2>
            <p className="reveal-item mt-4 text-base text-foreground-muted">
              Fast enough for a driveway decision. Thorough enough to change the negotiation.
            </p>
          </div>
          <Link href="/#check-vin" className="reveal-item cursor-pointer shrink-0">
            <Button size="lg">Check a VIN</Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <article
              key={item.title}
              className={`reveal-item group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-md ${item.span}`}
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-on-primary transition-transform duration-200 group-hover:scale-105">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
