"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, type CategoryId } from "@/data/products";

export function ProductCatalog({ initialCat = "all" }: { initialCat?: CategoryId }) {
  const searchParams = useSearchParams();
  const [cat, setCat] = useState<CategoryId>(
    categories.some((c) => c.id === initialCat) ? initialCat : "all"
  );

  useEffect(() => {
    const catParam = searchParams.get("cat");
    if (catParam && categories.some((c) => c.id === catParam)) {
      setCat(catParam as CategoryId);
    }
  }, [searchParams]);

  const filtered = useMemo(
    () => (cat === "all" ? products : products.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm ${
              cat === c.id ? "bg-forest text-cream" : "bg-white border border-forest/15 hover:border-forest/40"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{filtered.length} products</p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
