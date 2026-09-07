import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-deep text-cream pb-28 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={52} height={52} className="rounded-full bg-cream p-1" />
            <div>
              <p className="font-semibold">Giridhan Organics</p>
              <p className="text-xs uppercase tracking-[0.18em] text-lime">Goshala · Farm</p>
            </div>
          </div>
          <p className="mt-5 max-w-md font-serif text-2xl leading-snug text-cream/95">
            {site.footerTagline}
          </p>
          <p className="mt-4 text-sm text-cream/70">
            Goseva · Sustainability · Rural Empowerment · Indian Heritage
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-lime">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-lime">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-lime">Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/85">
            <li>{site.address}</li>
            <li>
              <a href={site.phoneHref} className="hover:text-lime">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:text-lime">
                {site.email}
              </a>
            </li>
            <li className="flex gap-4 pt-2">
              <a href={site.facebook} target="_blank" rel="noreferrer" className="hover:text-lime">
                Facebook
              </a>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-lime">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/50">
        © 2026 Giridhan Organics. All rights reserved.
      </div>
    </footer>
  );
}
