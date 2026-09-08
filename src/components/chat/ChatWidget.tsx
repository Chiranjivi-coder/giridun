"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/components/shop/ShopProvider";
import { site } from "@/data/site";
import { CHAT_QUICK_QUERIES } from "@/data/chatbotKnowledge";
import {
  sendStreamingMessage,
  extractActionsFromText,
  type ChatMessage,
  type ParsedActionItem,
} from "@/lib/groqChat";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-msg",
  role: "assistant",
  content: `Namaste! 🙏 Welcome to **Giridhan Organics**. 

I am your AI assistant, powered by the complete knowledge of our **Ahimsa Goshala, indigenous cows, and 40+ natural sustainable products**.

You can ask me anything about our products, ingredients, traditional benefits, or **order directly right here in the chat!**`,
  timestamp: Date.now(),
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showTooltip, setShowTooltip] = useState(true);

  const { addToBag, cartCount } = useShop();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  // Handle quantity changes for in-chat order cards
  const updateItemQty = (productId: string, delta: number, defaultQty: number) => {
    setQuantities((prev) => {
      const current = prev[productId] !== undefined ? prev[productId] : defaultQty;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const getItemQty = (productId: string, defaultQty: number) => {
    return quantities[productId] !== undefined ? quantities[productId] : defaultQty;
  };

  // Add to Bag action from Chat
  const handleAddToBag = (item: ParsedActionItem) => {
    const qty = getItemQty(item.product.id, item.qty);
    addToBag(item.product.id, qty);
    setAddedIds((prev) => ({ ...prev, [item.product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.product.id]: false }));
    }, 2500);
  };

  // Add all items in an order block to Bag
  const handleAddAllToBag = (items: ParsedActionItem[]) => {
    items.forEach((item) => {
      const qty = getItemQty(item.product.id, item.qty);
      addToBag(item.product.id, qty);
      setAddedIds((prev) => ({ ...prev, [item.product.id]: true }));
    });
    setTimeout(() => {
      setAddedIds({});
    }, 2500);
  };

  // WhatsApp direct order URL for specific items
  const generateWhatsAppOrderUrl = (items: ParsedActionItem[]) => {
    const lines = items.map((item) => {
      const qty = getItemQty(item.product.id, item.qty);
      const subtotal = item.product.price * qty;
      return `• ${item.product.name} × ${qty} — ₹${subtotal}`;
    });
    const total = items.reduce((sum, item) => {
      const qty = getItemQty(item.product.id, item.qty);
      return sum + item.product.price * qty;
    }, 0);

    const text = encodeURIComponent(
      `Namaste Giridhan Organics, I want to place an order via AI Assistant:\n\n${lines.join(
        "\n"
      )}\n\n*Total Amount:* ₹${total}\n\nPlease confirm availability and payment details.`
    );
    return `https://wa.me/917559228525?text=${text}`;
  };

  // Send message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isGenerating) return;

    setInputValue("");
    setShowTooltip(false);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const assistantPlaceholderId = `assistant-${Date.now()}`;
    const newHistory: ChatMessage[] = [...messages, userMessage];

    setMessages([
      ...newHistory,
      {
        id: assistantPlaceholderId,
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      },
    ]);

    setIsGenerating(true);

    try {
      await sendStreamingMessage(
        newHistory,
        (_delta, accumulated) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantPlaceholderId ? { ...m, content: accumulated } : m
            )
          );
        },
        () => {
          setIsGenerating(false);
        },
        (err) => {
          console.error("Chat streaming error:", err);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantPlaceholderId
                ? {
                    ...m,
                    content:
                      "Namaste! 🙏 I apologize, I encountered a brief connection issue. Please feel free to retry or connect with us directly on WhatsApp at +91 75592 28525.",
                  }
                : m
            )
          );
          setIsGenerating(false);
        }
      );
    } catch {
      setIsGenerating(false);
    }
  };

  const handleResetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setQuantities({});
    setAddedIds({});
  };

  return (
    <>
      {/* FLOATING CHAT BUTTON */}
      <div className="fixed bottom-[9.5rem] right-4 z-50 md:bottom-24 md:right-5 flex flex-col items-end">
        {/* Tooltip badge */}
        {!isOpen && showTooltip && (
          <div className="relative mb-2 hidden md:flex items-center gap-2 rounded-2xl bg-forest px-3.5 py-2 text-xs font-medium text-cream shadow-xl border border-lime/30 animate-bounce">
            <span className="h-2 w-2 rounded-full bg-lime animate-ping" />
            <span>Ask Giridhan AI • Order Here</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="ml-1 text-cream/60 hover:text-cream"
              aria-label="Dismiss tooltip"
            >
              ✕
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          aria-label={isOpen ? "Close AI Chat" : "Open Giridhan AI Assistant"}
          className="group relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-forest text-cream shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-lime/40"
        >
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <>
              {/* Pulsing halo */}
              <span className="absolute inset-0 rounded-full bg-lime/20 animate-ping opacity-60" />
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="text-lime">
                <path d="M12 2a8 8 0 0 0-8 8c0 2.2.9 4.2 2.3 5.7L5 21l5.5-1.3c.5.2 1 .3 1.5.3a8 8 0 0 0 8-8 8 8 0 0 0-8-8z" />
                <path d="M9.5 9h.01M14.5 9h.01" strokeWidth="2.6" />
                <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* CHAT MODAL WINDOW */}
      {isOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[80] md:inset-auto md:bottom-24 md:right-5 md:w-[420px] md:max-w-[calc(100vw-2.5rem)] h-[100dvh] md:h-[620px] md:max-h-[calc(100dvh-7rem)] flex flex-col rounded-none md:rounded-3xl bg-[#fbf9f4] md:border md:border-forest/15 shadow-[0_20px_50px_rgba(22,56,43,0.3)] overflow-hidden overscroll-contain"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between bg-forest px-4 py-3.5 text-cream shrink-0 border-b border-forest/20">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 rounded-full bg-[#f6f3ea] p-1 overflow-hidden shrink-0 border border-lime/40">
                <Image src="/logo.png" alt="Giridhan" fill className="object-contain p-0.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-base font-semibold leading-none">
                    Giridhan AI
                  </h3>
                  <span className="rounded-full bg-lime/20 px-1.5 py-0.5 text-[10px] font-medium text-lime">
                    Groq 20B
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-cream/75">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                  <span>Online • Quick Answers & Orders</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="rounded-full p-2 text-cream/70 hover:bg-cream/10 hover:text-cream transition"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="rounded-full p-2 text-cream/70 hover:bg-cream/10 hover:text-cream transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* QUICK QUERY CHIPS BAR (Horizontally scrollable with data-lenis-prevent) */}
          <div
            data-lenis-prevent
            className="flex items-center gap-2 overflow-x-auto bg-white/85 px-3 py-2 border-b border-forest/10 scrollbar-none shrink-0 touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted shrink-0">
              Quick:
            </span>
            {CHAT_QUICK_QUERIES.map((q) => (
              <button
                key={q.label}
                type="button"
                disabled={isGenerating}
                onClick={() => handleSendMessage(q.query)}
                className="shrink-0 rounded-full border border-forest/15 bg-white px-3 py-1 text-xs text-forest hover:border-leaf hover:bg-sand/60 transition active:scale-95 disabled:opacity-50 shadow-2xs"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* MESSAGES CONTAINER (Vertically scrollable with data-lenis-prevent) */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto p-4 space-y-4 text-sm leading-relaxed overscroll-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              const { cleanText, items } = isUser
                ? { cleanText: msg.content, items: [] }
                : extractActionsFromText(msg.content);

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  {/* Sender label */}
                  <span className="mb-1 px-1 text-[11px] font-medium text-muted/80">
                    {isUser ? "You" : "Giridhan Assistant"}
                  </span>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 shadow-sm ${
                      isUser
                        ? "bg-forest text-cream rounded-br-none"
                        : "bg-white text-ink border border-forest/10 rounded-bl-none"
                    }`}
                  >
                    {/* Render text with basic markdown formatting */}
                    <div className="whitespace-pre-wrap break-words space-y-2">
                      {cleanText || (isGenerating && !isUser ? (
                        <div className="flex items-center gap-1.5 py-1 text-muted">
                          <span className="h-2 w-2 rounded-full bg-leaf animate-bounce" />
                          <span className="h-2 w-2 rounded-full bg-leaf animate-bounce [animation-delay:0.2s]" />
                          <span className="h-2 w-2 rounded-full bg-leaf animate-bounce [animation-delay:0.4s]" />
                          <span className="ml-1 text-xs text-muted">Thinking...</span>
                        </div>
                      ) : null)}
                    </div>
                  </div>

                  {/* INTERACTIVE ORDER / PRODUCT CARDS */}
                  {!isUser && items.length > 0 && (
                    <div className="mt-3 w-full max-w-[94%] rounded-2xl bg-white p-3.5 border-2 border-leaf/30 shadow-md">
                      <div className="flex items-center justify-between pb-2 border-b border-forest/10">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">🛍️</span>
                          <span className="font-semibold text-xs text-forest uppercase tracking-wider">
                            Order Assistant
                          </span>
                        </div>
                        <span className="text-xs text-muted">
                          {items.length} item{items.length === 1 ? "" : "s"}
                        </span>
                      </div>

                      <div className="mt-2.5 space-y-2.5">
                        {items.map((item) => {
                          const currentQty = getItemQty(item.product.id, item.qty);
                          const isAdded = !!addedIds[item.product.id];
                          const subtotal = item.product.price * currentQty;

                          return (
                            <div
                              key={item.product.id}
                              className="flex items-center gap-3 rounded-xl bg-sand/40 p-2 border border-forest/5"
                            >
                              <div className="relative h-14 w-14 rounded-lg bg-white p-1 overflow-hidden shrink-0 border border-forest/10">
                                <Image
                                  src={item.product.image}
                                  alt={item.product.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <h4 className="font-medium text-xs text-forest truncate">
                                  {item.product.name}
                                </h4>
                                <p className="text-xs text-muted">
                                  ₹{item.product.price} each ·{" "}
                                  <strong className="text-forest">₹{subtotal}</strong>
                                </p>

                                {/* Quantity selector */}
                                <div className="mt-1 flex items-center gap-2">
                                  <div className="inline-flex items-center rounded-lg bg-white border border-forest/15 text-xs">
                                    <button
                                      type="button"
                                      className="px-2 py-0.5 text-muted hover:text-forest"
                                      onClick={() => updateItemQty(item.product.id, -1, item.qty)}
                                    >
                                      −
                                    </button>
                                    <span className="w-5 text-center font-medium">
                                      {currentQty}
                                    </span>
                                    <button
                                      type="button"
                                      className="px-2 py-0.5 text-muted hover:text-forest"
                                      onClick={() => updateItemQty(item.product.id, 1, item.qty)}
                                    >
                                      +
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleAddToBag(item)}
                                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                                      isAdded
                                        ? "bg-leaf text-white"
                                        : "bg-forest text-cream hover:bg-leaf"
                                    }`}
                                  >
                                    {isAdded ? "✓ Added" : "+ Add to Bag"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Summary & Combined Actions */}
                      <div className="mt-3 pt-2.5 border-t border-forest/10 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-forest">
                          <span>Total Calculated:</span>
                          <span className="text-sm">
                            ₹
                            {items.reduce((sum, i) => {
                              const q = getItemQty(i.product.id, i.qty);
                              return sum + i.product.price * q;
                            }, 0)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddAllToBag(items)}
                            className="flex items-center justify-center gap-1 rounded-xl bg-forest px-3 py-2 text-xs font-medium text-cream hover:bg-leaf transition active:scale-95 shadow-sm"
                          >
                            <span>🛒</span>
                            <span>Add All to Bag</span>
                          </button>

                          <a
                            href={generateWhatsAppOrderUrl(items)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-semibold text-white hover:opacity-90 transition active:scale-95 shadow-sm"
                          >
                            <span>📲</span>
                            <span>Order via WhatsApp</span>
                          </a>
                        </div>

                        {cartCount > 0 && (
                          <Link
                            href="/bag"
                            onClick={() => setIsOpen(false)}
                            className="mt-1 text-center text-xs text-leaf font-medium underline underline-offset-2 hover:text-forest"
                          >
                            View Cart ({cartCount} item{cartCount === 1 ? "" : "s"}) →
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FORM */}
          <div className="bg-white p-3 border-t border-forest/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about products, goseva, or order directly..."
                disabled={isGenerating}
                className="flex-1 rounded-full bg-sand/60 px-4 py-2.5 text-xs md:text-sm text-ink placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-leaf/40 border border-forest/10 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isGenerating}
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream transition hover:bg-leaf disabled:opacity-40 active:scale-95 shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between px-2 text-[10px] text-muted">
              <span>Giridhan AI · Groq 20B</span>
              <span className="text-leaf">Orders fulfilled via Goshala Team</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
