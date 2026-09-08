"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { BottomNav } from "@/components/shop/BottomNav";
import { ShopProvider } from "@/components/shop/ShopProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { RevealEngine } from "@/components/motion/RevealEngine";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <ShopProvider>
      <SmoothScroll />
      <PageTransition />
      <RevealEngine />
      <Header />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ChatWidget />
      <BottomNav />
    </ShopProvider>
  );
}
