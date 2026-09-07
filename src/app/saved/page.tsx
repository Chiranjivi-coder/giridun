"use client";

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/components/shop/ShopProvider";
import { getProduct } from "@/data/products";

export default function SavedPage() {
  const { saved } = useShop();
  const items = saved.map(getProduct).filter(Boolean);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-16">
      <h1 className="font-serif text-4xl text-forest">Saved</h1>
      <p className="mt-2 text-muted">Products you want to come back to.</p>
      {items.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-white p-8 text-center border border-forest/10">
          <p>Nothing saved yet. Tap the heart on a product.</p>
          <Link href="/products" className="mt-4 inline-flex rounded-full bg-forest px-5 py-2.5 text-cream">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}
