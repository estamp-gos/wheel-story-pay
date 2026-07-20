"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck } from "lucide-react";
import { Button } from "./Button";
import { usePricing } from "@/components/providers/PricingProvider";

type VinFormProps = {
  compact?: boolean;
  className?: string;
};

export function VinForm({ compact = false, className = "" }: VinFormProps) {
  const router = useRouter();
  const { pricing } = usePricing();
  const [query, setQuery] = useState("");
  const [reportType, setReportType] = useState<"vin" | "plate">("vin");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = query.trim().toUpperCase();
    if (!value) {
      setError(reportType === "vin" ? "Enter a VIN to continue." : "Enter a plate number.");
      return;
    }
    if (reportType === "vin" && value.length < 11) {
      setError("VINs are typically 17 characters. Double-check and try again.");
      return;
    }
    setError("");
    const params = new URLSearchParams({
      q: value,
      type: reportType,
      price: pricing.formatted,
    });
    router.push(`/check?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full rounded-2xl border border-border bg-surface p-4 shadow-lg sm:p-5 ${className}`}
      noValidate
    >
      <div className={`flex flex-col gap-3 ${compact ? "" : "lg:flex-row lg:items-end"}`}>
        <div className="flex gap-2">
          {(["vin", "plate"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setReportType(type);
                setError("");
              }}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                reportType === type
                  ? "bg-primary text-on-primary"
                  : "bg-muted text-secondary hover:bg-muted-dark/40"
              }`}
            >
              {type === "vin" ? "VIN" : "Plate"}
            </button>
          ))}
        </div>

        <label className="block flex-1">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            {reportType === "vin" ? "Vehicle Identification Number" : "License plate"}
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={reportType === "vin" ? "e.g. 1HGCM82633A004352" : "e.g. ABC-1234"}
            className="h-12 w-full rounded-lg border border-border bg-background px-4 font-mono text-sm text-foreground placeholder:text-foreground-muted/70 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "vin-error" : "vin-help"}
          />
        </label>

        <div className={`flex flex-col gap-2 ${compact ? "" : "lg:min-w-[180px]"}`}>
          <div className="text-center lg:text-left">
            <p className="text-xs text-foreground-muted">Full report from</p>
            <p className="font-heading text-2xl font-bold text-accent-warm">
              {pricing.formatted}
            </p>
          </div>
          <Button type="submit" size="lg" className="w-full">
            <Search className="h-4 w-4" aria-hidden />
            Check now
          </Button>
        </div>
      </div>

      {error ? (
        <p id="vin-error" className="mt-3 text-sm font-medium text-accent" role="alert">
          {error}
        </p>
      ) : (
        <p
          id="vin-help"
          className="mt-3 flex flex-wrap items-center gap-2 text-xs text-foreground-muted"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
          Instant multi-database scan · Secure checkout · Prices in {pricing.currency}
          {pricing.countryCode ? ` (${pricing.countryCode})` : ""} based on your location
        </p>
      )}
    </form>
  );
}
