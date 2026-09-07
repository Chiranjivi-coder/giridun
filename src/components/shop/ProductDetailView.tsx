"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useShop } from "@/components/shop/ShopProvider";
import { categories, inquireUrl, Product } from "@/data/products";

export function ProductDetailView({ product }: { product: Product }) {
  const { addToBag, toggleSaved, isSaved } = useShop();
  const [qty, setQty] = useState(1);

  const saved = isSaved(product.id);
  const cat = categories.find((c) => c.id === product.category)?.label;

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-16">
      <Link href="/products" className="text-sm text-leaf">
        ← All products
      </Link>
      <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-start">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-white border border-forest/10">
          <Image src={product.image} alt={product.name} fill className="object-contain p-8" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-leaf">{cat}</p>
          <h1 className="mt-2 font-serif text-3xl md:text-5xl text-forest">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-forest">₹ {product.price}</p>
          <p className="mt-4 text-muted leading-relaxed">
            Handmade cow-based Giridhan product. Crafted with care for wellness, home and gifting.
            Shipping and bulk rates available on request.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-forest/15">
              <button type="button" className="px-4 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button type="button" className="px-4 py-2" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToBag(product.id, qty)}
              className="flex-1 rounded-full bg-forest py-3 text-cream font-medium"
            >
              Add to bag
            </button>
            <button
              type="button"
              onClick={() => toggleSaved(product.id)}
              className={`h-12 w-12 rounded-full border ${saved ? "border-[#c45c5c] text-[#c45c5c]" : "border-forest/20"}`}
              aria-label="Save"
            >
              ♥
            </button>
          </div>
          <Link href={inquireUrl(product.name)} target="_blank" className="mt-4 inline-block text-sm text-leaf">
            Enquire on WhatsApp →
          </Link>
        </div>
      </div>
    </section>
  );
}
