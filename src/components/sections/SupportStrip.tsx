import { SectionReveal } from "@/components/ui/SectionReveal";
import { SUPPORT_METRICS, TRUST_STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function SupportStrip() {
  return (
    <section className="border-y border-border bg-surface py-12">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="reveal-item grid grid-cols-3 gap-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-foreground-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="reveal-item grid grid-cols-3 gap-4 border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            {SUPPORT_METRICS.map((m) => (
              <div key={m.label} className="text-center sm:text-left">
                <p className="font-heading text-xl font-bold text-foreground sm:text-2xl">{m.value}</p>
                <p className="mt-1 text-xs text-foreground-muted sm:text-sm">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
