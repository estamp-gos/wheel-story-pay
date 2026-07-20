import { SvgImage } from "@/components/ui/SvgImage";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { EDUCATION_STATS } from "@/lib/constants";

export function StatsEducation() {
  return (
    <section className="py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="reveal-item order-2 lg:order-1">
            <SvgImage
              src="/images/vin-guide.svg"
              alt="Diagram showing where to find a VIN on a vehicle windshield and door jamb"
              width={640}
              height={480}
              className="w-full rounded-2xl border border-border shadow-md"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Always check before you buy
            </p>
            <h2 className="reveal-item mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Used-car surprises are expensive. History is not.
            </h2>
            <p className="reveal-item mt-4 text-base leading-relaxed text-foreground-muted">
              Sellers may omit flood damage, rolled-back mileage, or prior salvage brands. A
              five-minute report can change the negotiation — or stop a bad purchase entirely.
            </p>
            <div className="reveal-item mt-8 grid gap-4 sm:grid-cols-3">
              {EDUCATION_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-surface p-4 shadow-sm"
                >
                  <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs leading-snug text-foreground-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
