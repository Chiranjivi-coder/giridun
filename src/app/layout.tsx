import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { site } from "@/data/site";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Goshala • Farm`,
    template: `%s | ${site.name}`,
  },
  description:
    "Giridhan Organics is an initiative rooted in Goseva, sustainable living and rural empowerment. Naturally sourced cow-based products from Dhawda, Maharashtra.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <FirebaseAnalytics />
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
