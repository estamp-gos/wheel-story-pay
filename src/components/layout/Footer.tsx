import Link from "next/link";
import { Globe, MessageCircle, Share2, Shield, Users } from "lucide-react";
import { NAV_LINKS, SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/constants";

const LEGAL = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookie Preferences" },
];

const SOCIAL = [
  { href: "#", label: "X / Twitter", Icon: Share2 },
  { href: "#", label: "Community", Icon: Users },
  { href: "#", label: "Messages", Icon: MessageCircle },
  { href: "#", label: "Website", Icon: Globe },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-on-primary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <Shield className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-heading text-lg font-bold">{SITE_NAME}</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-300">
            Vehicle history and inspection insights that help buyers and sellers make confident
            decisions — before money changes hands.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-slate-200">
            Quick links
          </h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="cursor-pointer text-sm text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#check-vin"
                className="cursor-pointer text-sm text-slate-300 transition-colors duration-200 hover:text-white"
              >
                Check VIN
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-slate-200">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="cursor-pointer transition-colors duration-200 hover:text-white"
              >
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`}
                className="cursor-pointer transition-colors duration-200 hover:text-white"
              >
                {SUPPORT_PHONE}
              </a>
            </li>
            <li className="pt-1 text-slate-400">Mon–Fri 8am–8pm PT · Reports 24/7</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-slate-200">
            Follow
          </h3>
          <div className="flex gap-2">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-white/5 text-slate-200 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <ul className="mt-6 space-y-2">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="cursor-pointer text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p>For informational purposes. Not a substitute for a physical inspection.</p>
        </div>
      </div>
    </footer>
  );
}
