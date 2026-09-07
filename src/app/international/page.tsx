import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";

export const metadata = { title: "International & Partnerships" };

const partners = [
  "Retailers",
  "Gift Stores",
  "Indian Communities",
  "Sustainability Organisations",
  "Corporates",
  "Hotels",
  "Distributors",
  "International Partners",
];

const opportunities = [
  "Retail & Distribution",
  "Corporate Gifting",
  "International Collaborations",
  "Sustainable Product Partnerships",
  "Custom Products",
  "Bulk Orders",
];

export default function InternationalPage() {
  return (
    <>
      <PageHero
        kicker="Giridhan for the World"
        title="Taking Indian Sustainable Craft Beyond Borders"
        text="We are open to collaborations with conscious consumers and businesses across the world. Let’s create a sustainable partnership."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="font-serif text-3xl text-forest">We collaborate with</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {partners.map((p) => (
            <span key={p} className="rounded-full bg-white border border-forest/15 px-4 py-2 text-sm">
              {p}
            </span>
          ))}
        </div>
        <h2 className="mt-14 font-serif text-3xl text-forest">Partnership Opportunities</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {opportunities.map((o) => (
            <article key={o} className="rounded-2xl bg-white p-6 border border-forest/10">
              {o}
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-16 md:px-6">
        <h2 className="font-serif text-3xl text-forest mb-6">Become a Giridhan Partner</h2>
        <ContactForm />
      </section>
    </>
  );
}
