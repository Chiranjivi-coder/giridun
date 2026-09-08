"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magicui/marquee";
import { GOSHALA_GALLERY, type GalleryItem } from "@/data/gallery";

interface GoshalaMarqueeProps {
  className?: string;
  title?: string;
  subtitle?: string;
  kicker?: string;
}

const firstRow = GOSHALA_GALLERY.slice(0, 5);
const secondRow = GOSHALA_GALLERY.slice(5);

function GoshalaCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <figure
      onClick={onClick}
      className={cn(
        "group/card relative h-68 w-60 sm:h-80 sm:w-76 md:w-84 cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl border border-forest/15 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] select-none shrink-0 touch-pan-y"
      )}
    >
      {/* Background Image with smooth zoom on hover */}
      <div className="absolute inset-0 bg-sand/30">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 260px, (max-width: 768px) 310px, 340px"
          className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-108"
        />
      </div>

      {/* Atmospheric Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/30 to-black/20 transition-opacity duration-300 group-hover/card:via-forest/40" />

      {/* Top Bar: Category Pill & Zoom Cue */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
        <span className="rounded-full bg-cream/90 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-forest shadow-xs border border-forest/10">
          {item.category}
        </span>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-forest/80 backdrop-blur-xs text-cream opacity-85 shadow-xs transition group-hover/card:bg-lime group-hover/card:text-forest group-hover/card:opacity-100 group-hover/card:scale-110">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>

      {/* Bottom Information Card */}
      <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 text-cream z-10">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-lime font-medium uppercase tracking-wider mb-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
          <span>Giridhan Sanctuary</span>
        </div>
        <h4 className="font-serif text-base sm:text-lg font-bold leading-snug line-clamp-1 group-hover/card:text-lime transition-colors">
          {item.title}
        </h4>
        <p className="mt-1 text-[11px] sm:text-xs text-cream/80 line-clamp-2 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </figure>
  );
}

export function GoshalaMarquee({
  className,
  kicker = "Sacred Moments In Motion",
  title = "Continuous Goshala Darshan Stream",
  subtitle = "Glide through real, heartwarming moments of our 75+ indigenous Gir and Sahiwal cows. Tap any image to view in high resolution.",
}: GoshalaMarqueeProps) {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  return (
    <section className={cn("relative py-12 md:py-16 overflow-hidden", className)}>
      {/* Section Header */}
      <div className="mb-8 md:mb-10 text-center max-w-3xl mx-auto px-4">
        {kicker && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest border border-forest/15">
            <span className="h-2 w-2 rounded-full bg-leaf animate-pulse" />
            {kicker}
          </span>
        )}
        {title && <h2 className="mt-3 font-serif text-3xl md:text-4xl text-forest">{title}</h2>}
        {subtitle && <p className="mt-2.5 text-sm md:text-base text-muted leading-relaxed">{subtitle}</p>}
      </div>

      {/* Marquee Rows Container */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        {/* Row 1: Leftward scroll */}
        <Marquee pauseOnHover className="[--duration:35s] [--gap:0.875rem] sm:[--gap:1.25rem] py-2">
          {firstRow.map((item) => (
            <GoshalaCard
              key={item.id}
              item={item}
              onClick={() => setActiveModalItem(item)}
            />
          ))}
        </Marquee>

        {/* Row 2: Rightward scroll (Reverse) */}
        <Marquee reverse pauseOnHover className="[--duration:35s] [--gap:0.875rem] sm:[--gap:1.25rem] py-2">
          {secondRow.map((item) => (
            <GoshalaCard
              key={item.id}
              item={item}
              onClick={() => setActiveModalItem(item)}
            />
          ))}
        </Marquee>

        {/* Side Soft Feather Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 md:w-44 bg-gradient-to-r from-cream via-cream/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 md:w-44 bg-gradient-to-l from-cream via-cream/80 to-transparent z-20" />
      </div>

      {/* Mobile-Friendly Hint */}
      <div className="mt-4 text-center">
        <p className="text-[11px] sm:text-xs text-muted/80 flex items-center justify-center gap-1.5">
          <span>👆</span>
          <span>Tap any photograph to open full-screen darshan view</span>
        </p>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-forest/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-forest/80 text-cream transition hover:bg-forest active:scale-95 shadow-md"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="relative h-[55vh] md:h-[65vh] w-full bg-sand/30">
              <Image
                src={activeModalItem.src}
                alt={activeModalItem.alt}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 85vw"
              />
            </div>

            {/* Modal Details */}
            <div className="p-5 md:p-6 bg-cream/90 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-forest/10">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-leaf">
                  {activeModalItem.category}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-forest mt-0.5">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs md:text-sm text-muted mt-1 max-w-xl leading-relaxed">
                  {activeModalItem.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/917559228525?text=${encodeURIComponent(
                    `Hello Giridhan, I saw "${activeModalItem.title}" in your Goshala gallery and would like to visit!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-forest px-5 py-2.5 text-xs font-semibold text-cream transition hover:bg-leaf active:scale-95 shadow-xs"
                >
                  Schedule Sanctuary Visit →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
