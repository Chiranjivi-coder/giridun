"use client";

import type { ReactNode } from "react";
import Link from "next/link";

export function PageHero({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
        <p className="text-xs uppercase tracking-[0.28em] text-lime">{kicker}</p>
        <h1 data-split="chars" className="mt-3 max-w-3xl font-serif text-3xl leading-tight md:text-6xl">
          {title}
        </h1>
        <p data-reveal className="mt-5 max-w-2xl text-cream/80 leading-relaxed">
          {text}
        </p>
        <div className="mt-10 h-px w-24 origin-left bg-lime" data-reveal />
      </div>
    </section>
  );
}

export function CtaLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-forest transition hover:brightness-95 hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}
