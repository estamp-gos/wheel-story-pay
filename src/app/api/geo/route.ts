import { NextRequest, NextResponse } from "next/server";
import { buildPricing, getDefaultPricing } from "@/lib/pricing";

function countryFromHeaders(req: NextRequest): string | null {
  const headers = req.headers;
  const candidates = [
    headers.get("x-vercel-ip-country"),
    headers.get("cf-ipcountry"),
    headers.get("x-country-code"),
    headers.get("cloudfront-viewer-country"),
  ];

  for (const value of candidates) {
    const code = value?.trim().toUpperCase();
    if (code && /^[A-Z]{2}$/.test(code) && code !== "XX" && code !== "T1") {
      return code;
    }
  }

  return null;
}

export async function GET(req: NextRequest) {
  try {
    const override = req.nextUrl.searchParams.get("country")?.trim().toUpperCase();
    const country =
      override && /^[A-Z]{2}$/.test(override)
        ? override
        : countryFromHeaders(req) || "US";

    const pricing = await buildPricing(country);
    return NextResponse.json(pricing, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(getDefaultPricing(), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
