"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getDefaultPricing, type PricingResult } from "@/lib/pricing";

type PricingContextValue = {
  pricing: PricingResult;
  loading: boolean;
  refresh: () => void;
};

const PricingContext = createContext<PricingContextValue | null>(null);

/** Detect country in the browser so VPN extensions affect the result. */
async function detectClientCountry(): Promise<string | null> {
  const providers: Array<() => Promise<string | null>> = [
    async () => {
      // Cloudflare trace — often respects browser/system VPN routing
      const res = await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const text = await res.text();
      const match = text.match(/(?:^|\n)loc=([A-Z]{2})(?:\n|$)/i);
      return match?.[1]?.toUpperCase() || null;
    },
    async () => {
      const res = await fetch("https://api.country.is/", {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { country?: string };
      return data.country?.toUpperCase() || null;
    },
    async () => {
      const res = await fetch("https://ipwho.is/", {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { success?: boolean; country_code?: string };
      if (data.success === false || !data.country_code) return null;
      return data.country_code.toUpperCase();
    },
    async () => {
      const res = await fetch("https://ipapi.co/json/", {
        signal: AbortSignal.timeout(4000),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return null;
      const data = (await res.json()) as { country_code?: string; error?: boolean };
      if (data.error || !data.country_code) return null;
      return data.country_code.toUpperCase();
    },
  ];

  for (const provider of providers) {
    try {
      const code = await provider();
      if (code && /^[A-Z]{2}$/.test(code)) return code;
    } catch {
      // try next provider
    }
  }

  return null;
}

export function PricingProvider({ children }: { children: ReactNode }) {
  const [pricing, setPricing] = useState<PricingResult>(getDefaultPricing());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // Dev/test override: /?country=DE forces a currency (useful when VPN doesn't route fetch)
      const override =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("country")?.toUpperCase()
          : null;

      const country =
        override && /^[A-Z]{2}$/.test(override)
          ? override
          : await detectClientCountry();

      const url = country
        ? `/api/geo?country=${encodeURIComponent(country)}`
        : "/api/geo";

      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error("geo failed");
      const data = (await res.json()) as PricingResult;
      setPricing(data);
    } catch {
      setPricing(getDefaultPricing());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const value = useMemo(
    () => ({ pricing, loading, refresh: load }),
    [pricing, loading, load],
  );

  return (
    <PricingContext.Provider value={value}>{children}</PricingContext.Provider>
  );
}

export function usePricing() {
  const ctx = useContext(PricingContext);
  if (!ctx) {
    throw new Error("usePricing must be used within PricingProvider");
  }
  return ctx;
}
