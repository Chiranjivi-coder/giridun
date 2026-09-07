import { PageHero } from "@/components/PageHero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { type CategoryId, categories } from "@/data/products";

export const metadata = { title: "Our Products" };

type Props = { searchParams: Promise<{ cat?: string }> };

export default async function ProductsPage({ searchParams }: Props) {
  const { cat } = await searchParams;
  const initialCat = categories.some((c) => c.id === cat) ? (cat as CategoryId) : "all";

  return (
    <>
      <PageHero
        kicker="Our Products"
        title="Natural. Traditional. Thoughtfully Crafted."
        text="Discover our growing range of Giridhan products designed for wellness, spirituality, lifestyle, gifting and sustainable living."
      />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <ProductCatalog initialCat={initialCat} />
      </section>
    </>
  );
}
