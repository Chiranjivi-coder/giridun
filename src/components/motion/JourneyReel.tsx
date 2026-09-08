"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

const items = [
  { year: "2021", phase: "Milestone 01", title: "Giridhan begins its Goseva journey." },
  { year: "Growing", phase: "Milestone 02", title: "Development of cow-based and sustainable products." },
  { year: "40+", phase: "Milestone 03", title: "Expanding into wellness, spiritual, agricultural, lifestyle and gifting." },
  { year: "People", phase: "Milestone 04", title: "Creating opportunities through handmade and value-added products." },
  { year: "World", phase: "Milestone 05", title: "Exploring international markets and sustainability partnerships." },
];

export function JourneyReel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = root.current;
      if (!section || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = section.querySelector(".journey-desktop-track");
        if (!track) return;
        const distance = (track as HTMLElement).scrollWidth - window.innerWidth;
        if (distance <= 0) return;

        const tween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            id: "journey-pin",
            trigger: section,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const handleMobileScroll = () => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / items.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveMobileIndex(Math.min(items.length - 1, Math.max(0, index)));
  };

  const scrollToMobileIndex = (index: number) => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / items.length;
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
    setActiveMobileIndex(index);
  };

  return (
    <section ref={root} className="relative bg-sand/50 overflow-hidden">
      {/* Mobile view (< 768px): Smooth horizontally scrollable swipeable carousel */}
      <div className="block md:hidden px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-leaf">Our Journey</p>
            <h2 data-split="words" className="mt-1 font-serif text-4xl text-forest">
              2021 → Today
            </h2>
            <p className="mt-1.5 text-xs text-muted">
              From humble Goseva roots to sustainable living.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-leaf bg-white/80 border border-forest/10 px-2.5 py-1 rounded-full shadow-xs">
            <span>Swipe</span>
            <span className="animate-pulse">→</span>
          </div>
        </div>

        {/* Scrollable track with snap */}
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          data-lenis-prevent
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 -mx-4 px-4 scrollbar-none touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {items.map((j, idx) => (
            <article
              key={j.year}
              onClick={() => scrollToMobileIndex(idx)}
              className={`w-[78vw] max-w-[20rem] shrink-0 snap-start rounded-2xl p-6 shadow-sm border transition-all duration-300 flex flex-col justify-between ${
                activeMobileIndex === idx
                  ? "bg-white border-leaf/40 ring-1 ring-leaf/20 scale-[1.01]"
                  : "bg-white/80 border-forest/5 opacity-90"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-serif text-3xl font-medium text-leaf">{j.year}</p>
                  <span className="text-[11px] font-semibold tracking-wider text-muted/60 uppercase">
                    {j.phase}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">{j.title}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-[11px] text-muted/60 pt-3 border-t border-forest/5">
                <span>Phase {idx + 1} of {items.length}</span>
                <span className="text-leaf font-medium">Giridhan Organics</span>
              </div>
            </article>
          ))}
        </div>

        {/* Indicator dots */}
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToMobileIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeMobileIndex === idx ? "w-6 bg-leaf" : "w-1.5 bg-forest/20 hover:bg-forest/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop view (>= 768px): Horizontal pinned reel */}
      <div className="hidden md:block overflow-hidden">
        <div className="journey-desktop-track flex w-max items-center gap-8 px-16 py-24">
          <div className="w-[min(90vw,28rem)] shrink-0 pr-8">
            <p className="text-xs uppercase tracking-[0.28em] text-leaf">Our Journey</p>
            <h2 data-split="words" className="mt-2 font-serif text-6xl lg:text-7xl text-forest">
              2021 → Today
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              From our goshala beginnings to sustainable craftsmanship and global partnerships.
            </p>
          </div>
          {items.map((j) => (
            <article
              key={j.year}
              className="h-64 w-[min(80vw,22rem)] shrink-0 rounded-3xl bg-white p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                <p className="font-serif text-4xl text-leaf">{j.year}</p>
                <p className="mt-4 text-muted leading-relaxed">{j.title}</p>
              </div>
              <span className="text-xs font-semibold tracking-wider text-muted/60 uppercase">
                {j.phase}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
