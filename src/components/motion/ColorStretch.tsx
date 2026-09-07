"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export function ColorStretch({
  kicker = "Gau · Gram · Prakriti",
  line = "Business as a force for earth, craft and community.",
}: {
  kicker?: string;
  line?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const section = root.current;
      if (!section || prefersReducedMotion()) return;
      if (window.innerWidth < 768) return;
      const panel = section.querySelector(".stretch-panel");
      const copy = section.querySelector(".stretch-copy");

      gsap
        .timeline({
          scrollTrigger: {
            id: "color-stretch",
            trigger: section,
            start: "top top",
            end: "+=160%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        })
        .fromTo(
          panel,
          { scaleY: 0.045, scaleX: 0.22, borderRadius: 80 },
          { scaleY: 1, scaleX: 1, borderRadius: 0, ease: "none" }
        )
        .fromTo(copy, { opacity: 0, y: 40, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", ease: "none" }, 0.35);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative min-h-[46vh] overflow-hidden bg-cream md:h-screen">
      <div className="stretch-panel absolute inset-0 origin-center bg-forest max-md:scale-100" />
      <div className="stretch-copy relative z-10 flex min-h-[46vh] md:h-full flex-col items-center justify-center px-6 py-16 text-center text-cream">
        <p className="text-xs uppercase tracking-[0.4em] text-lime">{kicker}</p>
        <h2 className="mt-5 max-w-3xl font-serif text-3xl md:text-6xl leading-tight">{line}</h2>
      </div>
    </section>
  );
}
