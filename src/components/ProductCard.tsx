"use client";

import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/components/shop/ShopProvider";
import { type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const { addToBag, toggleSaved, isSaved } = useShop();
  const saved = isSaved(product.id);

  return (
    <article className="group overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square bg-sand/40">
        <Link href={`/products/${product.id}`} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>
        <button
          type="button"
          aria-label={saved ? "Remove from saved" : "Save"}
          onClick={() => toggleSaved(product.id)}
          className={`absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm ${
            saved ? "text-[#c45c5c]" : "text-ink/60"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
            <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
          </svg>
        </button>
      </div>
      <div className="p-3 md:p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium leading-snug text-sm md:text-base">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-forest font-semibold">₹ {product.price}</p>
        <button
          type="button"
          onClick={() => addToBag(product.id)}
          className="mt-3 inline-flex w-full justify-center rounded-full bg-forest px-3 py-2 text-sm text-cream hover:bg-leaf"
        >
          Add to bag
        </button>
      </div>
    </article>
  );
}
