"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(useGSAP);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (open) {
        gsap.fromTo(
          menu,
          { autoAlpha: 0, y: prefersReduced ? 0 : -12 },
          { autoAlpha: 1, y: 0, duration: prefersReduced ? 0 : 0.35, ease: "power2.out" },
        );
      }
    },
    { dependencies: [open] },
  );

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-surface/90 py-2 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex cursor-pointer items-center gap-2.5 transition-opacity duration-200 hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-on-primary shadow-sm">
            <Shield className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "bg-muted text-foreground"
                    : "text-secondary hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/#check-vin" className="ml-2 cursor-pointer">
            <Button size="sm">Check VIN</Button>
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors duration-200 hover:bg-muted md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={menuRef}
          className="border-t border-border bg-surface px-4 py-4 shadow-md md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="cursor-pointer rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors duration-200 hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#check-vin" className="mt-2 cursor-pointer">
              <Button className="w-full">Check VIN</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
