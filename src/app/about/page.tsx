import type { Metadata } from "next";
import Link from "next/link";
import { Database, Eye, HeartHandshake, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SvgImage } from "@/components/ui/SvgImage";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${SITE_NAME} exists — vehicle history transparency for every used-car decision.`,
};

const STATS = [
  { value: 8, suffix: "+", label: "Years helping buyers verify vehicles" },
  { value: 12, suffix: "M+", label: "Reports generated worldwide" },
  { value: 70, suffix: "+", label: "Databases connected" },
];

const TEAM = [
  { name: "Elena Vargas", role: "Head of Product", image: "/images/team-1.svg" },
  { name: "David Okonkwo", role: "Data Partnerships", image: "/images/team-2.svg" },
  { name: "Hannah Brooks", role: "Customer Trust", image: "/images/team-3.svg" },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="hero-wash border-b border-border pb-16 pt-10">
        <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            About {SITE_NAME}
          </p>
          <h1 className="reveal-item mt-3 max-w-3xl font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Transparency is the best protection for used-car buyers
          </h1>
          <p className="reveal-item mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            We built {SITE_NAME} so anyone — not just dealers with proprietary tools — can see the
            history that shapes a vehicle&apos;s true value and risk.
          </p>
        </SectionReveal>
      </section>

      <section className="py-16 sm:py-20">
        <SectionReveal className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div>
            <h2 className="reveal-item font-heading text-3xl font-bold text-foreground">Our mission</h2>
            <p className="reveal-item mt-4 text-base leading-relaxed text-foreground-muted">
              Every year, buyers lose money to undisclosed accidents, flood titles, and odometer
              fraud. Our mission is simple: put clear, actionable vehicle history in front of
              people before they commit — whether they&apos;re buying from a dealer, a private
              seller, or an online marketplace.
            </p>
            <div className="reveal-item mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: Target, title: "Buyer-first", text: "Designed for decisions, not data dumps." },
                { icon: Eye, title: "Plain language", text: "Risk signals explained without jargon." },
                { icon: Database, title: "Multi-source", text: "Title, auction, insurance & recall feeds." },
                { icon: HeartHandshake, title: "Fair access", text: "One-time pricing. No forced subscriptions." },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-surface p-4">
                  <item.icon className="mb-2 h-5 w-5 text-accent" aria-hidden />
                  <p className="font-heading font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-foreground-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-item">
            <SvgImage
              src="/images/about-office.svg"
              alt="Vehicle Check team workspace illustration"
              width={800}
              height={500}
              className="w-full rounded-2xl border border-border shadow-md"
            />
          </div>
        </SectionReveal>
      </section>

      <section className="bg-primary py-14 text-on-primary">
        <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="reveal-item text-center sm:text-left">
                <p className="font-heading text-4xl font-bold">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="py-16 sm:py-20">
        <SectionReveal className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div className="reveal-item order-2 lg:order-1">
            <SvgImage
              src="/images/about-data.svg"
              alt="Illustration of connected vehicle data sources"
              width={640}
              height={400}
              className="w-full rounded-2xl border border-border shadow-md"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="reveal-item font-heading text-3xl font-bold text-foreground">
              How we source our data
            </h2>
            <p className="reveal-item mt-4 text-base leading-relaxed text-foreground-muted">
              Reports combine title and registration events, insurance and auction damage records,
              theft databases, manufacturer recall feeds, and available listing history. We
              continuously expand partnerships so coverage stays deep — and we clearly mark when a
              section returns limited data.
            </p>
            <p className="reveal-item mt-4 text-base leading-relaxed text-foreground-muted">
              No history report replaces a physical inspection. We exist to make sure you walk into
              that inspection already knowing what to ask.
            </p>
          </div>
        </SectionReveal>
      </section>

      <section className="bg-muted/50 py-16 sm:py-20">
        <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="reveal-item font-heading text-3xl font-bold text-foreground">The people behind the product</h2>
          <p className="reveal-item mt-3 max-w-xl text-foreground-muted">
            Product, data, and support specialists focused on one outcome: fewer bad used-car
            surprises.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="reveal-item text-center">
                <SvgImage
                  src={member.image}
                  alt=""
                  width={200}
                  height={200}
                  className="mx-auto h-36 w-36 rounded-2xl border border-border shadow-sm"
                />
                <p className="mt-4 font-heading text-lg font-semibold text-foreground">{member.name}</p>
                <p className="text-sm text-foreground-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </SectionReveal>
      </section>

      <section className="py-16">
        <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal-item flex flex-col items-start justify-between gap-6 rounded-2xl bg-primary px-8 py-10 text-on-primary sm:flex-row sm:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">Ready to check a vehicle?</h2>
              <p className="mt-2 text-slate-300">Run a VIN or plate search in under a minute.</p>
            </div>
            <Link href="/#check-vin" className="cursor-pointer">
              <Button size="lg">Check VIN</Button>
            </Link>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}
