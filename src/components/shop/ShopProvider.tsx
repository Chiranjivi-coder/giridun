"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { getProduct, products } from "@/data/products";

type CartItem = { id: string; qty: number };

type ShopSnap = { cart: CartItem[]; saved: string[] };

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
const CHANGE = "giridhan-shop-change";
const empty: ShopSnap = { cart: [], saved: [] };

let memory: ShopSnap = empty;
let hydrated = false;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  memory = {
    cart: readJson<CartItem[]>(CART_KEY, []),
    saved: readJson<string[]>(SAVED_KEY, []),
  };
  hydrated = true;
}

function write(next: ShopSnap) {
  memory = next;
  localStorage.setItem(CART_KEY, JSON.stringify(next.cart));
  localStorage.setItem(SAVED_KEY, JSON.stringify(next.saved));
  window.dispatchEvent(new Event(CHANGE));
}

function subscribe(onChange: () => void) {
  hydrate();
  const onStorage = () => {
    memory = {
      cart: readJson<CartItem[]>(CART_KEY, []),
      saved: readJson<string[]>(SAVED_KEY, []),
    };
    onChange();
  };
  window.addEventListener(CHANGE, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  hydrate();
  return memory;
}

function getServerSnapshot() {
  return empty;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { cart, saved } = snap;

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
        const found = memory.cart.find((i) => i.id === id);
        write({
          ...memory,
          cart: found
            ? memory.cart.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
            : [...memory.cart, { id, qty }],
        });
      },
      setQty: (id, qty) => {
        write({
          ...memory,
          cart:
            qty < 1
              ? memory.cart.filter((i) => i.id !== id)
              : memory.cart.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },
      removeFromBag: (id) => write({ ...memory, cart: memory.cart.filter((i) => i.id !== id) }),
      toggleSaved: (id) =>
        write({
          ...memory,
          saved: memory.saved.includes(id)
            ? memory.saved.filter((x) => x !== id)
            : [...memory.saved, id],
        }),
      isSaved: (id) => saved.includes(id),
      clearBag: () => write({ ...memory, cart: [] }),
    };
  }, [cart, saved]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
