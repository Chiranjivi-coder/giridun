"use client";

import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/components/shop/ShopProvider";
import { getProduct, orderUrl } from "@/data/products";

export default function BagPage() {
  const { cart, setQty, removeFromBag, cartTotal, cartCount, clearBag } = useShop();
  const lines = cart
    .map((i) => {
      const p = getProduct(i.id);
      return p ? `${p.name} × ${i.qty} — ₹ ${p.price * i.qty}` : "";
    })
    .filter(Boolean)
    .join("\n");

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-16">
      <h1 className="font-serif text-4xl text-forest">Your bag</h1>
      <p className="mt-2 text-muted">{cartCount} item{cartCount === 1 ? "" : "s"}</p>

      {cart.length === 0 ? (
        <div className="mt-10 rounded-3xl bg-white p-8 text-center border border-forest/10">
          <p>Your bag is empty.</p>
          <Link href="/products" className="mt-4 inline-flex rounded-full bg-forest px-5 py-2.5 text-cream">
            Shop products
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {cart.map((item) => {
            const p = getProduct(item.id);
            if (!p) return null;
            return (
              <article key={item.id} className="flex gap-4 rounded-2xl bg-white p-3 border border-forest/10">
                <Link href={`/products/${p.id}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-sand/40">
                  <Image src={p.image} alt="" fill className="object-contain p-1" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/products/${p.id}`} className="font-medium leading-snug">
                    {p.name}
                  </Link>
                  <p className="text-sm text-forest">₹ {p.price}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-forest/15 text-sm">
                      <button type="button" className="px-3 py-1" onClick={() => setQty(item.id, item.qty - 1)}>
                        −
                      </button>
                      <span className="w-6 text-center">{item.qty}</span>
                      <button type="button" className="px-3 py-1" onClick={() => setQty(item.id, item.qty + 1)}>
                        +
                      </button>
                    </div>
                    <button type="button" className="text-xs text-muted" onClick={() => removeFromBag(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
          <div className="rounded-2xl bg-forest p-5 text-cream">
            <div className="flex justify-between text-lg">
              <span>Total</span>
              <span>₹ {cartTotal}</span>
            </div>
            <p className="mt-2 text-sm text-cream/70">Checkout via WhatsApp. We’ll confirm stock, shipping and payment.</p>
            <a
              href={orderUrl(lines, cartTotal)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full justify-center rounded-full bg-lime py-3 font-semibold text-forest"
            >
              Place order on WhatsApp
            </a>
            <button type="button" onClick={clearBag} className="mt-3 w-full text-sm text-cream/60">
              Clear bag
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
