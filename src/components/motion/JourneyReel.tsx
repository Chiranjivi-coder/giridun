"use client";

import { useRef } from "react";
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

  return (
    <section ref={root} className="relative bg-sand/50">
      {/* Mobile view (< 768px): Vertical narrative flow */}
      <div className="block md:hidden px-4 py-14">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.28em] text-leaf">Our Journey</p>
          <h2 data-split="words" className="mt-2 font-serif text-4xl text-forest">
            2021 → Today
          </h2>
          <p className="mt-3 text-sm text-muted">
            From humble Goseva roots to a growing circular sustainability movement.
          </p>
        </div>
        <div className="space-y-4">
          {items.map((j) => (
            <article
              key={j.year}
              data-reveal
              className="rounded-2xl bg-white p-6 shadow-sm border border-forest/5"
            >
              <div className="flex items-center justify-between">
                <p className="font-serif text-3xl font-medium text-leaf">{j.year}</p>
                <span className="text-[11px] font-semibold tracking-wider text-muted/60 uppercase">
                  {j.phase}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed">{j.title}</p>
            </article>
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
