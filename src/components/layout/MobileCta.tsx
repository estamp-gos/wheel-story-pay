"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export function MobileCta() {
  return (
    <Link
      href="/#check-vin"
      className="fixed bottom-5 right-5 z-40 inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-accent-hover md:hidden"
      aria-label="Check VIN"
    >
      <Search className="h-4 w-4" aria-hidden />
      Check VIN
    </Link>
  );
}
