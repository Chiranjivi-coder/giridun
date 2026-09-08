import Image from "next/image";
import Link from "next/link";
import { BannerFrame } from "@/components/BannerFrame";
import { ProductCard } from "@/components/ProductCard";
import { CtaLink } from "@/components/PageHero";
import { GoshalaMarquee } from "@/components/GoshalaMarquee";
import { CinematicHero } from "@/components/motion/CinematicHero";
import { ColorStretch } from "@/components/motion/ColorStretch";
import { JourneyReel } from "@/components/motion/JourneyReel";
import { productGroups, products } from "@/data/products";
import { posts } from "@/data/journal";
import { site } from "@/data/site";

const featured = products.filter((p) =>
  ["gomay-dhoop", "ghee-diya", "tea-coaster", "mobile-stand", "vermi-compost", "gomay-rakhi", "dantamanjan", "ganeshji"].includes(p.id)
);

const why = [
  { title: "Sustainable", text: "Encouraging natural and environmentally responsible alternatives." },
  { title: "Rooted in Goseva", text: "Our work is inspired by the traditional Indian relationship with Gomata." },
  { title: "Rural Empowerment", text: "Creating opportunities for rural communities and women artisans." },
  { title: "Indian Heritage", text: "Bringing traditional knowledge and craftsmanship into contemporary products." },
  { title: "Handmade with Care", text: "Products are crafted with attention to detail, purpose and authenticity." },
];

const galleryBanners = [
  { src: "/hero/hea4.jpeg", label: "Goshala" },
  { src: "/hero/hea3.jpeg", label: "Farm & Goseva" },
];

const galleryMoments = [
  { src: "/products/page_3_img_1.jpeg", label: "Product making", width: 358, height: 394 },
  { src: "/products/page_3_img_2.jpeg", label: "Ghee diyas", width: 356, height: 394 },
  { src: "/products/TC.png", label: "Corporate gifting", width: 231, height: 248 },
  { src: "/products/page_4_img_2.jpeg", label: "Festival crafts", width: 357, height: 394 },
];

export default function HomePage() {
  return (
    <>
      <CinematicHero />

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-24 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-leaf">Our Story</p>
            <h2 data-split="words" className="mt-2 font-serif text-4xl md:text-5xl text-forest">
              From Goseva to Sustainable Living
            </h2>
            <p data-reveal className="mt-5 text-muted leading-relaxed">
              Giridhan’s journey began with a simple belief — Goseva can create a positive impact on
              people, animals, farmers and the environment.
            </p>
            <p data-reveal className="mt-4 text-muted leading-relaxed">
              Since 2021, Giridhan has been working towards creating meaningful value from indigenous
              cow resources while supporting a more sustainable rural ecosystem. Today we care for{" "}
              {site.cows} indigenous cows and offer {site.products} Gomay and cow-based products.
            </p>
            <p data-reveal className="mt-6 text-sm font-medium text-forest">
              Goseva · Sustainability · Traditional Knowledge · Rural Livelihood · Natural Products
            </p>
          </div>
          <BannerFrame
            src="/hero/hea4.jpeg"
            alt="Giridhan goshala illustration"
            className="rounded-3xl shadow-sm ring-1 ring-forest/10"
          />
        </div>
      </section>

      <ColorStretch />

      <section className="bg-sand/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:py-24 md:grid-cols-2 md:px-6">
          <article data-reveal className="rounded-3xl bg-white p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-leaf">Our Vision</p>
            <h2 data-split="words" className="mt-2 font-serif text-3xl text-forest">
              Reviving Tradition. Creating Sustainable Futures.
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              We envision a future where traditional Indian knowledge and modern sustainable practices
              come together to create opportunities for rural communities while encouraging
              environmentally responsible lifestyles. Our vision is to make sustainability a part of
              everyday living.
            </p>
          </article>
          <article data-reveal className="rounded-3xl bg-forest p-8 text-cream">
            <p className="text-xs uppercase tracking-[0.28em] text-lime">Our Mission</p>
            <ul className="mt-5 space-y-3 text-cream/90">
              <li>Promote sustainable and natural alternatives</li>
              <li>Create meaningful value from indigenous cow resources</li>
              <li>Support rural livelihoods and women artisans</li>
              <li>Preserve traditional Indian knowledge and craftsmanship</li>
              <li>Encourage responsible consumption</li>
              <li>Build a stronger connection between Gau, Gram and Prakriti</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-24 md:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-leaf">Indigenous Cows</p>
        <h2 data-split="words" className="mt-2 font-serif text-4xl text-forest">
          Celebrating India’s Indigenous Cow Heritage
        </h2>
        <p data-reveal className="mt-4 max-w-3xl text-muted leading-relaxed">
          India is home to a rich diversity of indigenous cattle breeds. Giridhan believes in
          respecting and preserving this heritage while creating sustainable opportunities around the
          rural ecosystem. Our initiatives are inspired by the relationship between Gomata,
          agriculture, rural communities and nature.
        </p>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-24 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-leaf">Our Products</p>
              <h2 data-split="words" className="mt-2 font-serif text-4xl text-forest">
                Natural. Traditional. Thoughtfully Crafted.
              </h2>
            </div>
            <CtaLink href="/products">Explore All Products →</CtaLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {productGroups.map((g) => (
              <Link
                key={g.title}
                href={g.href}
                data-reveal
                className="rounded-3xl border border-forest/10 p-6 transition hover:-translate-y-1 hover:border-leaf"
              >
                <h3 className="font-serif text-2xl text-forest">{g.title}</h3>
                <p className="mt-2 text-sm text-muted">{g.text}</p>
                <ul className="mt-4 space-y-1 text-sm">
                  {g.items.map((i) => (
                    <li key={i}>· {i}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.map((p) => (
              <div key={p.id} data-reveal>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-24 md:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-leaf">Why Giridhan?</p>
        <h2 data-split="words" className="mt-2 font-serif text-4xl text-forest">
          More Than a Product. It’s a Purpose.
        </h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-5">
          {why.map((w) => (
            <article key={w.title} data-reveal className="rounded-2xl bg-sand/60 p-5">
              <h3 className="font-medium text-forest">{w.title}</h3>
              <p className="mt-2 text-sm text-muted">{w.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest text-cream">
        <div data-parallax="30" className="hero-orb absolute -left-20 top-0 h-64 w-64 rounded-full bg-lime/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:py-24 md:grid-cols-2 md:px-6 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-lime">Sustainable Gifting</p>
            <h2 data-split="words" className="mt-2 font-serif text-4xl">
              Give a Gift That Creates an Impact
            </h2>
            <p data-reveal className="mt-4 text-cream/75 leading-relaxed">
              Looking for something meaningful beyond conventional corporate gifts? Giridhan offers
              eco-conscious gifting solutions that combine Indian heritage, craftsmanship and
              sustainability. Your gift can tell a story of India, sustainability and rural
              empowerment.
            </p>
            <div className="mt-6">
              <CtaLink href="/gifting">Enquire for Corporate Gifting →</CtaLink>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm">
            {["Corporate Gifting", "Festivals & Celebrations", "Wedding & Event Gifting", "Employee Gifts", "International Delegations", "Custom & Bulk Orders"].map(
              (item) => (
                <li key={item} data-reveal className="rounded-2xl border border-cream/15 px-4 py-4">
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-24 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <BannerFrame
            src="/hero/hea3.jpeg"
            alt="From our goshala to your home"
            className="rounded-3xl shadow-sm ring-1 ring-forest/10"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-leaf">Giridhan for the World</p>
            <h2 data-split="words" className="mt-2 font-serif text-4xl text-forest">
              Taking Indian Sustainable Craft Beyond Borders
            </h2>
            <p data-reveal className="mt-4 text-muted leading-relaxed">
              Giridhan aims to introduce India’s traditional cow-based craftsmanship and sustainable
              products to conscious consumers and businesses across the world.
            </p>
            <p data-reveal className="mt-4 text-sm text-forest">
              Retailers · Gift Stores · Indian Communities · Sustainability Organisations · Corporates
              · Hotels · Distributors · International Partners
            </p>
            <div className="mt-6">
              <CtaLink href="/international">Become a Giridhan Partner →</CtaLink>
            </div>
          </div>
        </div>
      </section>

      <JourneyReel />

      <section className="py-12 md:py-20 overflow-hidden bg-sand/20 border-y border-forest/10">
        <GoshalaMarquee
          kicker="Ahimsa Sanctuary Stream"
          title="Experience Giridhan Goshala & Sanctuary"
          subtitle="Real, continuous glimpses of our 75+ indigenous Gir & Sahiwal cows, young calves, and selfless Goseva in Dhawda, Bhokardan."
        />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 px-4">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream shadow-md transition hover:bg-leaf active:scale-95"
          >
            <span>Explore Full Gallery & Videos</span>
            <span>→</span>
          </Link>
          <a
            href="https://wa.me/917559228525?text=Hello%20Giridhan,%20I%20would%20like%20to%20visit%20your%20Goshala%20Sanctuary."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-6 py-3 text-sm font-semibold text-forest shadow-2xs transition hover:bg-sand/60 active:scale-95"
          >
            <span>Schedule Goshala Darshan</span>
            <span>🐄</span>
          </a>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-24 md:px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-leaf">Giridhan Journal</p>
              <h2 data-split="words" className="mt-2 font-serif text-4xl text-forest">
                Stories of Sustainability, Tradition & Impact
              </h2>
            </div>
            <CtaLink href="/blog">Read Our Stories →</CtaLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-reveal
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-forest/10 transition hover:-translate-y-1"
              >
                <BannerFrame src={post.image} alt={post.title} className="rounded-none" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider text-leaf">{post.category}</p>
                  <h3 className="mt-1 font-serif text-2xl text-forest">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep text-cream">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-24 md:px-6 md:flex md:items-center md:justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-lime">Contact Us</p>
            <h2 data-split="words" className="mt-2 font-serif text-4xl">
              Let’s Connect
            </h2>
            <p data-reveal className="mt-3 max-w-xl text-cream/70">
              Product enquiries, bulk orders, corporate gifting or partnerships — we’d love to hear
              from you.
            </p>
            <p className="mt-4">
              {site.phone} · {site.address}
            </p>
          </div>
          <CtaLink href="/contact">Get in Touch →</CtaLink>
        </div>
      </section>
    </>
  );
}
