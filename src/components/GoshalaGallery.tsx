"use client";

import { useState } from "react";
import Image from "next/image";
import { GOSHALA_GALLERY, type GalleryItem, ALL_GALLERY_CATEGORIES, type GalleryCategory } from "@/data/gallery";

interface GoshalaGalleryProps {
  initialLimit?: number;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export function GoshalaGallery({
  initialLimit,
  showFilters = true,
  title = "Goshala Sanctuary & Indigenous Cows",
  subtitle = "Witness the peaceful life, loving care, and pure heritage of our 75+ Gir & Sahiwal cows in Bhokardan, Jalna.",
}: GoshalaGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems = GOSHALA_GALLERY.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const displayedItems = initialLimit ? filteredItems.slice(0, initialLimit) : filteredItems;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-leaf font-semibold">Live From Dhawda Goshala</p>
          <h3 className="mt-1 font-serif text-3xl md:text-4xl text-forest">{title}</h3>
          {subtitle && <p className="mt-2 text-sm text-muted max-w-2xl">{subtitle}</p>}
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {ALL_GALLERY_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 ${
                    active
                      ? "bg-forest text-cream shadow-sm ring-2 ring-forest/20"
                      : "bg-white text-ink/75 hover:bg-sand/60 border border-forest/15"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-leaf/40"
          >
            {/* Image Box */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand/30">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-forest/85 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-cream backdrop-blur-xs border border-lime/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                  {item.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-forest opacity-0 shadow-sm backdrop-blur-xs transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-3.5 text-cream">
                <h4 className="font-serif text-sm font-semibold leading-snug line-clamp-1 group-hover:text-lime transition-colors">
                  {item.title}
                </h4>
                <p className="mt-1 text-[11px] text-cream/80 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
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
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-forest/80 text-cream transition hover:bg-forest active:scale-95"
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
                sizes="(max-width: 1024px) 100vw, 80vw"
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
                <p className="text-xs md:text-sm text-muted mt-1 max-w-xl">
                  {activeModalItem.desc}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/917559228525?text=Hello%20Giridhan,%20I%20would%20like%20to%20know%20more%20about%20your%20Goshala%20Sanctuary."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-forest px-4 py-2 text-xs font-semibold text-cream transition hover:bg-leaf active:scale-95 shrink-0"
                >
                  Schedule Goshala Visit →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
