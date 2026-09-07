"use client";

import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

function splitNode(el: HTMLElement, type: "chars" | "words") {
  if (el.dataset.splitDone === "true") return;
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);

  const words = text.split(/(\s+)/);
  el.innerHTML = words
    .map((part) => {
      if (/^\s+$/.test(part)) return part;
      if (type === "words") {
        return `<span class="split-word"><span class="split-inner">${part}</span></span>`;
      }
      const chars = [...part]
        .map((ch) => `<span class="split-char"><span class="split-inner">${ch}</span></span>`)
        .join("");
      return `<span class="split-word">${chars}</span>`;
    })
    .join("");
}

export function RevealEngine() {
  const pathname = usePathname();

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const type = el.dataset.split === "words" ? "words" : "chars";
        splitNode(el, type);
        const inners = el.querySelectorAll(".split-inner");
        gsap.set(inners, { yPercent: 115, rotateX: 18, opacity: 0 });
        el.dataset.splitDone = "true";
        const inView = el.getBoundingClientRect().top < window.innerHeight * 0.92;
        gsap.to(inners, {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.9,
          delay: inView ? 0.08 : 0,
          stagger: type === "chars" ? 0.018 : 0.05,
          ease: "power3.out",
          scrollTrigger: inView
            ? undefined
            : { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: Number(el.dataset.delay || 0) + (i % 4) * 0.04,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const dist = Number(el.dataset.parallax || 60);
        gsap.fromTo(
          el,
          { y: -dist },
          {
            y: dist,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.18 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { dependencies: [pathname] }
  );

  return null;
}
