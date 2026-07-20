"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePricing } from "@/components/providers/PricingProvider";

function CheckContent() {
  const params = useSearchParams();
  const { pricing } = usePricing();
  const query = params.get("q") || "—";
  const type = params.get("type") || "vin";
  const price = params.get("price") || pricing.formatted;

  return (
    <div className="mx-auto max-w-2xl px-4 py-28 sm:px-6 lg:px-8">
      <Link
        href="/#check-vin"
        className="mb-8 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-secondary transition-colors duration-200 hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to search
      </Link>

      <div className="rounded-2xl border border-border bg-surface p-8 shadow-lg">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-on-primary">
          <FileSearch className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Report ready to unlock</h1>
        <p className="mt-3 text-foreground-muted">
          This is a frontend placeholder for checkout. In production, this page would process
          payment and deliver the full history report.
        </p>

        <dl className="mt-8 space-y-4 rounded-xl border border-border bg-background p-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-foreground-muted">{type === "plate" ? "Plate" : "VIN"}</dt>
            <dd className="font-mono font-semibold text-foreground">{query}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-foreground-muted">Report type</dt>
            <dd className="font-semibold text-foreground">Standard History Report</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-border pt-4">
            <dt className="text-foreground-muted">Price</dt>
            <dd className="font-heading text-xl font-bold text-accent-warm">{price}</dd>
          </div>
        </dl>

        <p className="mt-4 flex items-center gap-2 text-xs text-foreground-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
          Prices shown in {pricing.currency} based on your location
        </p>

        <a
          href="https://checkout.freemius.com/product/27824/plan/45987/"
          className="mt-8 block cursor-pointer"
          rel="noopener noreferrer"
        >
          <Button size="lg" className="w-full">
            Continue to checkout
          </Button>
        </a>
      </div>
    </div>
  );
}

export default function CheckPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-28 text-foreground-muted">Loading…</div>
      }
    >
      <CheckContent />
    </Suspense>
  );
}
