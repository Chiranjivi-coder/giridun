"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, products } from "@/data/products";

type CartItem = { id: string; qty: number };

type Shop = {
  cart: CartItem[];
  saved: string[];
  addToBag: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromBag: (id: string) => void;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  cartCount: number;
  cartTotal: number;
  clearBag: () => void;
};

const ShopContext = createContext<Shop | null>(null);

const CART_KEY = "giridhan-cart";
const SAVED_KEY = "giridhan-saved";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const s = localStorage.getItem(SAVED_KEY);
      if (c) setCart(JSON.parse(c));
      if (s) setSaved(JSON.parse(s));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, ready]);

  const value = useMemo<Shop>(() => {
    const cartCount = cart.reduce((n, i) => n + i.qty, 0);
    const cartTotal = cart.reduce((n, i) => {
      const p = getProduct(i.id);
      return n + (p ? p.price * i.qty : 0);
    }, 0);

    return {
      cart,
      saved,
      cartCount,
      cartTotal,
      addToBag: (id, qty = 1) => {
        if (!products.some((p) => p.id === id)) return;
        setCart((prev) => {
          const found = prev.find((i) => i.id === id);
          if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
          return [...prev, { id, qty }];
        });
      },
      setQty: (id, qty) => {
        setCart((prev) =>
          qty < 1 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
        );
      },
      removeFromBag: (id) => setCart((prev) => prev.filter((i) => i.id !== id)),
      toggleSaved: (id) =>
        setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      isSaved: (id) => saved.includes(id),
      clearBag: () => setCart([]),
    };
  }, [cart, saved]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
