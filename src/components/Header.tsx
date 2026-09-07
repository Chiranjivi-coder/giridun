"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useShop } from "@/components/shop/ShopProvider";
import { nav } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { cartCount, saved } = useShop();

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 md:px-6 md:py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Giridhan Organics logo" width={40} height={40} className="h-9 w-9 md:h-12 md:w-12" priority />
          <span className="leading-tight">
            <span className="block truncate text-sm font-semibold tracking-tight text-forest md:text-base">
              Giridhan Organics
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:block">Goshala · Farm</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                  active ? "bg-forest text-cream" : "text-ink/80 hover:text-forest"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          <Link
            href="/saved"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-forest/15 md:inline-flex"
            aria-label="Saved"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
            </svg>
            {saved.length > 0 && (
              <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-leaf" />
            )}
          </Link>
          <Link
            href="/bag"
            className="relative hidden h-10 items-center gap-1.5 rounded-full bg-forest px-3 text-sm text-cream md:inline-flex"
          >
            Bag
            {cartCount > 0 && (
              <span className="rounded-full bg-lime px-1.5 text-[11px] font-semibold text-forest">{cartCount}</span>
            )}
          </Link>
          <Link
            href="/contact"
            className="hidden rounded-full bg-lime px-4 py-2 text-sm font-semibold text-forest lg:inline-flex"
          >
            Enquire Now
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 lg:hidden"
            aria-label="More pages"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-forest/10 bg-cream px-4 pb-4">
          <nav className="flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm border-b border-forest/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
