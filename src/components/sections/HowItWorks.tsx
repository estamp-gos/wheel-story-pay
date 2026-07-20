import { SectionReveal } from "@/components/ui/SectionReveal";
import { HOW_IT_WORKS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            How it works
          </p>
          <h2 className="reveal-item mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            From VIN to verdict in minutes
          </h2>
        </div>

        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((step, index) => (
            <li
              key={step.step}
              className="reveal-item relative rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              <span className="font-heading text-4xl font-bold text-muted-dark">{step.step}</span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{step.description}</p>
              {index < HOW_IT_WORKS.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border lg:block"
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ol>
      </SectionReveal>
    </section>
  );
}
