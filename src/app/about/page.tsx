import { BannerFrame } from "@/components/BannerFrame";
import { PageHero, CtaLink } from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Us"
        title="From Goseva to Sustainable Living"
        text="Giridhan Organics is rooted in Goseva, sustainable living and rural empowerment — connecting Indian heritage with modern sustainable lifestyles."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 grid gap-10 md:grid-cols-2 md:items-center">
        <BannerFrame
          src="/hero/hea1.jpeg"
          alt="Trust the purity. Feel the difference."
          className="rounded-3xl shadow-sm ring-1 ring-forest/10"
        />
        <div>
          <h2 data-split="words" className="font-serif text-4xl text-forest">Goshala Service & Dedication</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Since 2021, we have been engaged in Goseva and currently care for around {site.cows}{" "}
            indigenous cows. We are striving to successfully run a goshala based on cow dung and cow
            urine. By conducting new experiments, we create cow dung-based products with the aim of
            bringing Goseva into every home.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            The preservation and nurturing of indigenous cattle is the need of the hour, and we are
            committed to this cause. Our farming is now completely based on cow dung and cow urine,
            which has significantly enhanced the quality of our grains.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <blockquote className="font-serif text-3xl md:text-4xl text-forest max-w-4xl leading-snug">
            “To build a compassionate and eco-conscious world where spiritual values and sustainable
            practices go hand in hand, and to inspire society towards cow-based sustainable living,
            ensuring harmony between tradition, environment, and future generations.”
          </blockquote>
          <p className="mt-6 text-muted">
            Cows are nature’s partners—turning grass into nourishment, enriching soil, and sustaining
            a greener, cleaner world.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 grid gap-8 md:grid-cols-2">
        <article>
          <h2 className="font-serif text-3xl text-forest">Vision</h2>
          <p className="mt-3 text-muted leading-relaxed">
            Reviving tradition. Creating sustainable futures. We envision a future where traditional
            Indian knowledge and modern sustainable practices come together to create opportunities
            for rural communities while encouraging environmentally responsible lifestyles.
          </p>
        </article>
        <article>
          <h2 className="font-serif text-3xl text-forest">Indigenous Cow Heritage</h2>
          <p className="mt-3 text-muted leading-relaxed">
            India is home to a rich diversity of indigenous cattle breeds. Giridhan believes in
            respecting and preserving this heritage while creating sustainable opportunities around
            the rural ecosystem — Gau, Gram and Prakriti.
          </p>
        </article>
      </section>

      <section className="bg-forest text-cream px-4 py-14 text-center">
        <p className="font-serif text-3xl">Support Our Mission</p>
        <div className="mt-6">
          <CtaLink href="/contact">Connect With Us →</CtaLink>
        </div>
      </section>
    </>
  );
}
