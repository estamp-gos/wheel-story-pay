import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { PricingProvider } from "@/components/providers/PricingProvider";
import { JsReady } from "@/components/JsReady";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const headingFont = IBM_Plex_Sans_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Vehicle History & Inspection Reports`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_TAGLINE}. Uncover accidents, title brands, odometer gaps, theft records, and ownership history before you buy.`,
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <JsReady />
        <PricingProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileCta />
        </PricingProvider>
      </body>
    </html>
  );
}
