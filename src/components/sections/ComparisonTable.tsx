import { Check, X } from "lucide-react";
import Link from "next/link";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

const ROWS = [
  { label: "Accident & damage history", without: false, withReport: true },
  { label: "Title brand / salvage flags", without: false, withReport: true },
  { label: "Odometer consistency check", without: false, withReport: true },
  { label: "Theft & stolen records", without: false, withReport: true },
  { label: "Open safety recalls", without: "Maybe", withReport: true },
  { label: "Prior listing / photo trail", without: false, withReport: true },
  { label: "Negotiation leverage", without: false, withReport: true },
];

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Buy smarter
          </p>
          <h2 className="reveal-item mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Guessing vs. knowing
          </h2>
          <p className="reveal-item mt-4 text-base text-foreground-muted">
            A test drive shows how it feels today. A history report shows what it has been through.
          </p>
        </div>

        <div className="reveal-item mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-border bg-muted/60 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-secondary sm:px-6 sm:text-sm">
            <span>What you get</span>
            <span className="text-center">Without report</span>
            <span className="text-center text-primary">With Vehicle Check</span>
          </div>
          <ul>
            {ROWS.map((row, i) => (
              <li
                key={row.label}
                className={`grid grid-cols-[1.4fr_1fr_1fr] items-center px-4 py-3.5 text-sm sm:px-6 ${
                  i % 2 === 0 ? "bg-surface" : "bg-muted/30"
                }`}
              >
                <span className="pr-2 font-medium text-foreground">{row.label}</span>
                <span className="flex justify-center">
                  {row.without === false ? (
                    <X className="h-5 w-5 text-foreground-muted/50" aria-label="No" />
                  ) : (
                    <span className="text-xs text-foreground-muted">{row.without}</span>
                  )}
                </span>
                <span className="flex justify-center">
                  {row.withReport === true ? (
                    <Check className="h-5 w-5 text-success" aria-label="Yes" />
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border bg-primary px-4 py-5 text-center sm:px-6">
            <Link href="/#check-vin" className="cursor-pointer">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-slate-100 hover:text-primary"
              >
                Get the full picture
              </Button>
            </Link>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
