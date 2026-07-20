import { Database, Lock, ShieldCheck, FileBadge } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";

const BADGES = [
  {
    icon: Database,
    title: "70+ Data Sources",
    description: "Title, auction, insurance & recall feeds",
  },
  {
    icon: FileBadge,
    title: "Official-Grade Records",
    description: "NMVTIS-style title brand screening",
  },
  {
    icon: Lock,
    title: "Encrypted Delivery",
    description: "Secure checkout & private report links",
  },
  {
    icon: ShieldCheck,
    title: "Integrity Verified",
    description: "Tamper-evident report fingerprinting",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-surface py-10">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((badge) => (
            <div
              key={badge.title}
              className="reveal-item flex items-start gap-3 rounded-xl border border-border/80 bg-background px-4 py-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary">
                <badge.icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">{badge.title}</p>
                <p className="mt-0.5 text-xs text-foreground-muted">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
