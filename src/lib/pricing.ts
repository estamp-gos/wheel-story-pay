import { BASE_PRICE_USD } from "./constants";

export type PricingResult = {
  countryCode: string;
  currency: string;
  locale: string;
  rate: number;
  amount: number;
  formatted: string;
  baseUsd: number;
};

const COUNTRY_CURRENCY: Record<string, { currency: string; locale: string }> = {
  US: { currency: "USD", locale: "en-US" },
  GB: { currency: "GBP", locale: "en-GB" },
  UK: { currency: "GBP", locale: "en-GB" },
  IE: { currency: "EUR", locale: "en-IE" },
  DE: { currency: "EUR", locale: "de-DE" },
  FR: { currency: "EUR", locale: "fr-FR" },
  ES: { currency: "EUR", locale: "es-ES" },
  IT: { currency: "EUR", locale: "it-IT" },
  NL: { currency: "EUR", locale: "nl-NL" },
  BE: { currency: "EUR", locale: "nl-BE" },
  AT: { currency: "EUR", locale: "de-AT" },
  PT: { currency: "EUR", locale: "pt-PT" },
  FI: { currency: "EUR", locale: "fi-FI" },
  CA: { currency: "CAD", locale: "en-CA" },
  AU: { currency: "AUD", locale: "en-AU" },
  NZ: { currency: "NZD", locale: "en-NZ" },
  JP: { currency: "JPY", locale: "ja-JP" },
  CH: { currency: "CHF", locale: "de-CH" },
  SE: { currency: "SEK", locale: "sv-SE" },
  NO: { currency: "NOK", locale: "nb-NO" },
  DK: { currency: "DKK", locale: "da-DK" },
  SG: { currency: "SGD", locale: "en-SG" },
  HK: { currency: "HKD", locale: "en-HK" },
  IN: { currency: "INR", locale: "en-IN" },
  AE: { currency: "AED", locale: "en-AE" },
  SA: { currency: "SAR", locale: "ar-SA" },
  MX: { currency: "MXN", locale: "es-MX" },
  BR: { currency: "BRL", locale: "pt-BR" },
};

const DEFAULT: PricingResult = {
  countryCode: "US",
  currency: "USD",
  locale: "en-US",
  rate: 1,
  amount: BASE_PRICE_USD,
  formatted: formatCurrency(BASE_PRICE_USD, "en-US", "USD"),
  baseUsd: BASE_PRICE_USD,
};

let ratesCache: { rates: Record<string, number>; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 1000 * 60 * 60 * 4; // 4 hours

export function formatCurrency(amount: number, locale: string, currency: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "JPY" ? 0 : 2,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

export function resolveCurrency(countryCode: string) {
  const code = countryCode.toUpperCase();
  return COUNTRY_CURRENCY[code] ?? { currency: "USD", locale: "en-US" };
}

export async function fetchExchangeRates(): Promise<Record<string, number>> {
  const now = Date.now();
  if (ratesCache && now - ratesCache.fetchedAt < CACHE_TTL_MS) {
    return ratesCache.rates;
  }

  const endpoints = [
    "https://open.er-api.com/v6/latest/USD",
    "https://api.exchangerate-api.com/v4/latest/USD",
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        signal: AbortSignal.timeout(5000),
        cache: "no-store",
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { rates?: Record<string, number> };
      if (!data.rates) continue;
      ratesCache = { rates: data.rates, fetchedAt: now };
      return data.rates;
    } catch {
      // try next endpoint
    }
  }

  return ratesCache?.rates ?? { USD: 1 };
}

export async function buildPricing(countryCode: string): Promise<PricingResult> {
  try {
    const { currency, locale } = resolveCurrency(countryCode || "US");
    const rates = await fetchExchangeRates();
    const rate = rates[currency] ?? 1;
    const amount = currency === "JPY" ? Math.round(BASE_PRICE_USD * rate) : Math.round(BASE_PRICE_USD * rate * 100) / 100;

    return {
      countryCode: (countryCode || "US").toUpperCase(),
      currency,
      locale,
      rate,
      amount,
      formatted: formatCurrency(amount, locale, currency),
      baseUsd: BASE_PRICE_USD,
    };
  } catch {
    return DEFAULT;
  }
}

export function getDefaultPricing(): PricingResult {
  return DEFAULT;
}
