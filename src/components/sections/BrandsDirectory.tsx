import { VEHICLE_MAKES } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function BrandsDirectory() {
  return (
    <section className="bg-muted/40 py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Supported makes
          </p>
          <h2 className="reveal-item mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Coverage across popular brands
          </h2>
          <p className="reveal-item mt-4 text-base text-foreground-muted">
            From everyday commuters to luxury and performance vehicles — if it has a VIN, we can
            usually pull a history trail.
          </p>
        </div>

        <div className="reveal-item mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {VEHICLE_MAKES.map((make) => (
            <div
              key={make}
              className="rounded-lg border border-border bg-surface px-3 py-3 text-center text-sm font-medium text-secondary transition-colors duration-200 hover:border-primary/20 hover:text-foreground"
            >
              {make}
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
