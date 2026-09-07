"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "@/components/PageHero";
import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";
import { site } from "@/data/site";

const slides = [
  { src: "/hero/giridhan-hero-farm.jpg", alt: "Indigenous cows grazing at Giridhan farm" },
  { src: "/hero/giridhan-hero-path.jpg", alt: "Cows on a farm path at golden hour" },
  { src: "/hero/giridhan-hero-fields.jpg", alt: "Organic crop fields in rural India" },
  { src: "/hero/giridhan-hero-cow.jpg", alt: "Indigenous Gir cow at the goshala" },
  { src: "/hero/giridhan-hero-pond.jpg", alt: "Village farm and pond at sunrise" },
  { src: "/hero/giridhan-hero-livelihood.jpg", alt: "Rural farm livelihood and natural produce" },
];

export function CinematicHero() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tick = () => setIndex((i) => (i + 1) % slides.length);
    let id = window.setInterval(tick, 6200);
    const onVis = () => {
      window.clearInterval(id);
      if (document.visibilityState === "visible") id = window.setInterval(tick, 6200);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);

      gsap.from(q(".hero-orb"), {
        scale: 0.6,
        opacity: 0,
        duration: 1.6,
        stagger: 0.12,
        ease: "power2.out",
      });

      gsap.from(q(".hero-logo-wrap"), {
        y: 28,
        opacity: 0,
        duration: 1.1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.to(q(".hero-logo-wrap"), {
        y: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(q(".hero-giant"), {
        yPercent: 28,
        opacity: 0.12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      gsap.to(q(".hero-copy"), {
        y: -50,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      registerGsap();
      const frames = gsap.utils.toArray<HTMLElement>(".hero-slide");
      frames.forEach((frame, i) => {
        const active = i === index;
        gsap.to(frame, {
          opacity: active ? 1 : 0,
          duration: prefersReducedMotion() ? 0 : 1.35,
          ease: "power2.inOut",
        });
        const media = frame.querySelector(".hero-ken");
        if (!media) return;
        gsap.killTweensOf(media);
        if (active && !prefersReducedMotion()) {
          const pan = i % 2 === 0 ? 3 : -3;
          gsap.fromTo(
            media,
            { scale: 1.06, xPercent: -pan },
            { scale: 1.18, xPercent: pan, duration: 6.4, ease: "none" }
          );
        }
      });
    },
    { scope: root, dependencies: [index] }
  );

  return (
    <section ref={root} className="relative min-h-[auto] overflow-hidden bg-forest text-cream md:min-h-[100svh]">
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="hero-slide absolute inset-0 overflow-hidden"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="hero-ken absolute -inset-8">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-forest/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-forest/40" />
      </div>
      <p
        className="hero-giant pointer-events-none absolute -left-6 top-20 z-[1] select-none font-serif text-[22vw] leading-none text-cream/[0.08] md:top-8"
        aria-hidden
      >
        GIRIDHAN
      </p>
      <div className="hero-orb absolute -left-24 top-24 z-[1] h-72 w-72 rounded-full bg-leaf/25 blur-3xl" />
      <div className="hero-orb absolute -right-16 bottom-10 z-[1] h-80 w-80 rounded-full bg-lime/15 blur-3xl" />
      <div className="absolute inset-0 z-[1] opacity-[0.08] mix-blend-overlay grain" />

      <div className="relative z-[2] mx-auto grid min-h-0 max-w-7xl items-center gap-8 px-4 pb-16 pt-10 md:min-h-[100svh] md:grid-cols-2 md:gap-10 md:px-6 md:py-24">
        <div className="hero-copy">
          <p className="text-xs uppercase tracking-[0.3em] text-lime">{site.tagline}</p>
          <h1
            data-split="chars"
            className="mt-3 font-serif text-4xl leading-[1.08] md:mt-4 md:text-7xl"
          >
            Nature’s Gift, Sustainable Future
          </h1>
          <p data-reveal className="mt-6 max-w-lg text-lg text-cream/80">
            {site.slogan}
          </p>
          <p data-reveal className="mt-4 max-w-lg text-cream/70 leading-relaxed">
            Giridhan Organics is an initiative rooted in Goseva, sustainable living and rural
            empowerment. We transform naturally sourced cow-based materials into thoughtfully
            crafted products that connect Indian heritage with modern sustainable lifestyles.
          </p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <CtaLink href="/products">Discover Our Products</CtaLink>
            <Link
              href="/about"
              className="inline-flex rounded-full border border-cream/30 px-5 py-2.5 text-sm hover:bg-cream/10"
            >
              Explore Giridhan
            </Link>
            <Link
              href="/international"
              className="inline-flex rounded-full border border-cream/30 px-5 py-2.5 text-sm hover:bg-cream/10"
            >
              Partner With Us
            </Link>
          </div>
        </div>

        <div className="hero-logo-wrap relative mx-auto flex h-44 w-44 items-center justify-center md:h-72 md:w-72">
          <div className="absolute inset-0 rounded-full bg-white/20 ring-1 ring-cream/30 backdrop-blur-[2px]" />
          <div className="absolute inset-3 overflow-hidden rounded-full bg-[#f6f3ea] shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
            <Image
              src="/logo.png"
              alt="Giridhan Organics"
              fill
              className="object-contain p-[12%]"
              sizes="(max-width: 768px) 11rem, 18rem"
              priority
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex justify-center gap-2 pb-24 md:pb-8">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`pointer-events-auto h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-lime" : "w-2 bg-cream/40 hover:bg-cream/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
