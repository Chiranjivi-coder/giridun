import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata = { title: "Sustainable Gifting" };

const giftProducts = products.filter((p) =>
  ["tea-coaster", "mobile-stand", "pen-stand", "card-holder", "gomay-rakhi", "ganeshji", "balaji-magnet", "tiranga-magnet"].includes(p.id)
);

export default function GiftingPage() {
  return (
    <>
      <PageHero
        kicker="Sustainable Gifting"
        title="Give a Gift That Creates an Impact"
        text="Eco-conscious gifting that combines Indian heritage, craftsmanship and sustainability — for corporates, festivals, weddings and international delegations."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-muted leading-relaxed">
            Looking for something meaningful beyond conventional corporate gifts? Giridhan offers
            handmade, cow-based lifestyle and spiritual products that tell a story of India,
            sustainability and rural empowerment.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              "Corporate Gifting",
              "Festivals & Celebrations",
              "Wedding & Event Gifting",
              "Employee Gifts",
              "International Delegations",
              "Sustainable Brand Gifting",
              "Custom & Bulk Orders",
            ].map((i) => (
              <li key={i} className="rounded-xl bg-white border border-forest/10 px-4 py-3">
                {i}
              </li>
            ))}
          </ul>
        </div>
        <figure className="overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-forest/10">
          <Image
            src="/products/TC.png"
            alt="Giridhan tea coaster gift"
            width={231}
            height={248}
            className="mx-auto h-auto w-full max-w-sm"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </figure>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <h2 className="font-serif text-4xl text-forest">Gift-ready favourites</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {giftProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h2 className="font-serif text-3xl text-forest mb-6">Enquire for Corporate Gifting</h2>
        <ContactForm />
      </section>
    </>
  );
}
