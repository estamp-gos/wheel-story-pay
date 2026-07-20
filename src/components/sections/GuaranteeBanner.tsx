import Link from "next/link";
import { BadgeCheck, RefreshCw, Shield, Zap } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Button } from "@/components/ui/Button";

const POINTS = [
  {
    icon: Zap,
    title: "Instant delivery",
    text: "On-screen access plus email as soon as the scan completes.",
  },
  {
    icon: Shield,
    title: "Secure checkout",
    text: "Encrypted payment — we never store your full card details.",
  },
  {
    icon: RefreshCw,
    title: "Fair refund policy",
    text: "Full refund if we fail to generate a report for a valid VIN.",
  },
  {
    icon: BadgeCheck,
    title: "No subscription trap",
    text: "Pay once per report. Cancel nothing. Keep the PDF forever.",
  },
];

export function GuaranteeBanner() {
  return (
    <section className="py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal-item overflow-hidden rounded-3xl border border-border bg-primary text-on-primary shadow-lg">
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-white/10 p-8 sm:p-10 lg:border-r lg:border-b-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Buyer protection
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
                Confidence before the handshake
              </h2>
              <p className="mt-4 max-w-md text-slate-300">
                Check the history first. Walk into every used-car conversation knowing what the
                seller already knows — and what they hoped you wouldn&apos;t ask.
              </p>
              <Link href="/#check-vin" className="mt-8 inline-block cursor-pointer">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-slate-100 hover:text-primary"
                >
                  Check a VIN now
                </Button>
              </Link>
            </div>

            <ul className="grid gap-0 sm:grid-cols-2">
              {POINTS.map((point, i) => (
                <li
                  key={point.title}
                  className={`border-white/10 p-6 sm:p-7 ${
                    i % 2 === 0 ? "sm:border-r" : ""
                  } ${i < 2 ? "border-b" : ""}`}
                >
                  <point.icon className="mb-3 h-5 w-5 text-slate-300" aria-hidden />
                  <h3 className="font-heading text-base font-semibold">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{point.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
