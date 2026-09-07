"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export function PageTransition() {
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    registerGsap();
    const el = overlay.current;
    if (!el || prefersReducedMotion()) return;

    if (first.current) {
      first.current = false;
      gsap.set(el, { scaleY: 0 });
      return;
    }

    const tl = gsap.timeline();
    tl.set(el, { transformOrigin: "50% 0%", scaleY: 0 })
      .to(el, { scaleY: 1, duration: 0.45, ease: "power3.inOut" })
      .set(el, { transformOrigin: "50% 100%" })
      .to(el, { scaleY: 0, duration: 0.5, ease: "power3.inOut" });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlay}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] origin-top bg-forest"
      style={{ transform: "scaleY(0)" }}
    />
  );
}
