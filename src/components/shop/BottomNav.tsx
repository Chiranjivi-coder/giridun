"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/components/shop/ShopProvider";

const items = [
  { href: "/", label: "Home", color: "text-leaf", icon: "leaf" },
  { href: "/products", label: "Products", color: "text-ink", icon: "search" },
  { href: "/gifting", label: "Gifting", color: "text-[#e07a2f]", icon: "gift" },
  { href: "/saved", label: "Saved", color: "text-ink", icon: "heart" },
  { href: "/bag", label: "Bag", color: "text-forest", icon: "bag" },
] as const;

function Icon({ name }: { name: (typeof items)[number]["icon"] }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "leaf") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
        <path d="M5 19c8-1 14-8 14-16-7 0-14 6-14 16z" />
        <path d="M5 19c4-6 8-9 14-10" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" />
      </svg>
    );
  }
  if (name === "gift") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
        <rect x="3" y="10" width="18" height="11" rx="1.5" />
        <path d="M12 10v11M3 14h18" />
        <path d="M12 10c-2.5-4-6-4-6-1.5S9 11 12 10c2.5-4 6-4 6-1.5S15 11 12 10z" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
        <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...common}>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const { cartCount, saved } = useShop();

  return (
    <nav
      className="md:hidden fixed inset-x-0 bottom-0 z-[70] rounded-t-[1.6rem] bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(22,56,43,0.12)]"
      aria-label="Primary"
    >
      <ul className="grid grid-cols-5 px-1 pt-2 pb-1">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const badge =
            item.icon === "bag" ? cartCount : item.icon === "heart" ? saved.length : 0;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative flex flex-col items-center gap-0.5 py-1 text-[11px] ${
                  item.icon === "gift"
                    ? "text-[#e07a2f]"
                    : item.icon === "bag"
                      ? "text-forest"
                      : active
                        ? "text-leaf"
                        : "text-[#3a3a3a]"
                }`}
              >
                <span
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full ${
                    active ? "bg-lime/35 shadow-[0_0_16px_rgba(143,191,74,0.55)]" : ""
                  }`}
                >
                  <Icon name={item.icon} />
                  {badge > 0 && (
                    <span className="absolute -right-1 -top-0.5 min-w-4 rounded-full bg-forest px-1 text-[9px] leading-4 text-cream text-center">
                      {badge}
                    </span>
                  )}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
