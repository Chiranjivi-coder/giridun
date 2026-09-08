import { PageHero, CtaLink } from "@/components/PageHero";
import { GoshalaGallery } from "@/components/GoshalaGallery";
import { site } from "@/data/site";

export const metadata = {
  title: "Goshala Experience Gallery | Giridhan Organics",
  description:
    "Photo gallery of our Ahimsa Goshala Sanctuary in Dhawda, Bhokardan, caring for 75+ indigenous Gir and Sahiwal cows, natural farming, and handcrafted Gomay crafts.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        kicker="Visual Journey"
        title="The Giridhan Experience Gallery"
        text="Witness our sacred Ahimsa goshala sanctuary, indigenous Gir and Sahiwal cows, natural calf nutrition, and handcrafted cow-based products in action."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-20 md:px-6">
        <GoshalaGallery
          title="Ahimsa Goshala & Indigenous Cow Darshan"
          subtitle="Real, authentic glimpses from our farm and sanctuary in Dhawda, Bhokardan Dist. Jalna (Maharashtra)."
        />
      </section>

      {/* VISIT US SECTION */}
      <section className="bg-forest text-cream py-16 px-4 md:px-6 text-center">
        <div className="mx-auto max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-lime font-semibold">Experience in Person</p>
          <h2 className="font-serif text-3xl md:text-4xl">Visit Giridhan Goshala in Jalna</h2>
          <p className="text-cream/80 text-sm md:text-base leading-relaxed">
            We warmly welcome families, conscious farmers, spiritual seekers, and students to visit our
            sanctuary, perform Goseva, and witness circular rural sustainability firsthand.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/917559228525?text=Hello%20Giridhan,%20I%20would%20like%20to%20schedule%20a%20visit%20to%20your%20Goshala%20in%20Jalna."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-forest shadow-md transition hover:bg-white active:scale-95"
            >
              Schedule Sanctuary Visit via WhatsApp →
            </a>
            <CtaLink href="/contact">Get Location & Directions</CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
