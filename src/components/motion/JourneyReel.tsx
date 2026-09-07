"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

const items = [
  { year: "2021", title: "Giridhan begins its Goseva journey." },
  { year: "Growing", title: "Development of cow-based and sustainable products." },
  { year: "40+", title: "Expanding into wellness, spiritual, agricultural, lifestyle and gifting." },
  { year: "People", title: "Creating opportunities through handmade and value-added products." },
  { year: "World", title: "Exploring international markets and sustainability partnerships." },
];

export function JourneyReel() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = root.current;
      if (!section || prefersReducedMotion() || window.innerWidth < 768) return;
      const track = section.querySelector(".journey-track");
      if (!track) return;
      const distance = (track as HTMLElement).scrollWidth - window.innerWidth;

      gsap.to(track, {
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
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-sand/50">
      <div className="journey-track flex w-max items-center gap-8 px-6 py-24 md:px-16">
        <div className="w-[min(90vw,28rem)] shrink-0 pr-8">
          <p className="text-xs uppercase tracking-[0.28em] text-leaf">Our Journey</p>
          <h2 data-split="words" className="mt-2 font-serif text-5xl text-forest md:text-7xl">
            2021 → Today
          </h2>
        </div>
        {items.map((j) => (
          <article
            key={j.year}
            className="h-64 w-[min(80vw,22rem)] shrink-0 rounded-3xl bg-white p-8 shadow-sm"
          >
            <p className="font-serif text-4xl text-leaf">{j.year}</p>
            <p className="mt-4 text-muted leading-relaxed">{j.title}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
