import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { ProductCatalog } from "@/components/ProductCatalog";

export const metadata = { title: "Our Products" };

export default function ProductsPage() {
  return (
    <>
      <PageHero
        kicker="Our Products"
        title="Natural. Traditional. Thoughtfully Crafted."
        text="Discover our growing range of Giridhan products designed for wellness, spirituality, lifestyle, gifting and sustainable living."
      />
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <Suspense fallback={<div className="py-12 text-center text-muted">Loading products...</div>}>
          <ProductCatalog />
        </Suspense>
      </section>
    </>
  );
}
