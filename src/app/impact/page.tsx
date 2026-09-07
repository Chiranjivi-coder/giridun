import { PageHero, CtaLink } from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata = { title: "Our Impact" };

const chain = [
  "Goseva",
  "Rural Livelihood",
  "Traditional Knowledge",
  "Sustainable Products",
  "Conscious Consumption",
];

export default function ImpactPage() {
  return (
    <>
      <PageHero
        kicker="Our Impact"
        title="Every Product Has a Bigger Story"
        text="When you choose Giridhan, you are supporting a larger ecosystem built around Goseva, rural livelihood and responsible living."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl bg-white p-8 border border-forest/10">
            <p className="text-4xl font-serif text-forest">{site.cows}</p>
            <p className="mt-2 text-muted">Indigenous cows in our care since 2021</p>
          </article>
          <article className="rounded-3xl bg-white p-8 border border-forest/10">
            <p className="text-4xl font-serif text-forest">{site.products}</p>
            <p className="mt-2 text-muted">Gomay and cow-based products across categories</p>
          </article>
          <article className="rounded-3xl bg-white p-8 border border-forest/10">
            <p className="text-4xl font-serif text-forest">Handmade</p>
            <p className="mt-2 text-muted">Opportunities for rural communities and women artisans</p>
          </article>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {chain.map((c, i) => (
            <span key={c} className="rounded-full bg-forest px-5 py-2 text-cream text-sm">
              {c}
              {i < chain.length - 1 ? " →" : ""}
            </span>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-muted leading-relaxed">
          We believe that business can be a force for environmental responsibility, social impact and
          cultural preservation. From goshala care in Dhawda to products that enter homes across
          India and beyond, each purchase strengthens the bond between Gau, Gram and Prakriti.
        </p>
        <div className="mt-8">
          <CtaLink href="/products">Choose Giridhan →</CtaLink>
        </div>
      </section>
    </>
  );
}
