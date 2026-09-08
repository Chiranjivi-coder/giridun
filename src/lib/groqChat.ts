import { Groq } from "groq-sdk";
import { buildSystemPrompt } from "@/data/chatbotKnowledge";
import { getProduct, type Product } from "@/data/products";

export interface ChatMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ParsedActionItem {
  type: "order" | "product";
  product: Product;
  qty: number;
}

import { streamLocalBackupResponse } from "./localBackupChat";

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";

let groqClientInstance: Groq | null = null;

function getGroqClient(): Groq | null {
  if (!GROQ_API_KEY) {
    return null;
  }
  if (!groqClientInstance) {
    try {
      groqClientInstance = new Groq({
        apiKey: GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
      });
    } catch (e) {
      console.warn("Failed to initialize Groq client:", e);
      return null;
    }
  }
  return groqClientInstance;
}

/**
 * 6-TIER RESILIENT CASCADE ARCHITECTURE (per specification diagram):
 * 
 * [User asks a question]
 *       │
 *       ▼
 * [Tier 1: openai/gpt-oss-20b] ──(Success)───────────────┐
 *       │ (Error / Rate Limit / Timeout)                 │
 *       ▼                                                │
 * [Tier 2: groq/compound] ───────(Success)───────────────┤
 *       │ (Error / Rate Limit / Timeout)                 │
 *       ▼                                                │
 * [Tier 3: groq/compound-mini] ──(Success)───────────────┤
 *       │ (Error / Rate Limit / Timeout)                 │
 *       ▼                                                │
 * [Tier 4: openai/gpt-oss-120b] ─(Success)───────────────┤
 *       │ (Error / Rate Limit / Timeout)                 │
 *       ▼                                                │
 * [Tier 5: qwen/qwen3.6-27b] ────(Success)───────────────┤
 *       │ (Network Loss / API Outage)                    │
 *       ▼                                                │
 * [Tier 6: Local Offline Knowledge Engine] ──(Success)───┤
 *                                                        ▼
 *                                         [Stream Clean Answer to Chatbot]
 */

interface TierConfig {
  tierNumber: number;
  model: string;
  name: string;
  timeoutMs: number;
}

const AI_TIERS: TierConfig[] = [
  { tierNumber: 1, model: "openai/gpt-oss-20b", name: "Tier 1: openai/gpt-oss-20b", timeoutMs: 8000 },
  { tierNumber: 2, model: "groq/compound", name: "Tier 2: groq/compound", timeoutMs: 8000 },
  { tierNumber: 3, model: "groq/compound-mini", name: "Tier 3: groq/compound-mini", timeoutMs: 8000 },
  { tierNumber: 4, model: "openai/gpt-oss-120b", name: "Tier 4: openai/gpt-oss-120b", timeoutMs: 9000 },
  { tierNumber: 5, model: "qwen/qwen3.6-27b", name: "Tier 5: qwen/qwen3.6-27b", timeoutMs: 9000 },
];

/**
 * Filters out internal thinking/reasoning tags ensuring only clean text streams to the user.
 */
function cleanStreamChunk(rawText: string): string {
  // Remove closed <think>...</think> blocks
  let clean = rawText.replace(/<think>[\s\S]*?<\/think>/gi, "");
  // If unclosed <think> is in progress, strip from <think> to end
  if (clean.includes("<think>")) {
    clean = clean.replace(/<think>[\s\S]*$/gi, "");
  }
  // Strip compound model reasoning markers
  clean = clean.replace(/\*\*Reasoning\*\*[\s\S]*?(?=\*\*Final|\*\*Chosen|Answer:|$)/gi, "");
  return clean.trimStart();
}

export async function sendStreamingMessage(
  conversation: ChatMessage[],
  onChunk: (delta: string, accumulated: string) => void,
  onFinish?: (fullText: string) => void,
  onError?: (err: Error) => void
): Promise<string> {
  const lastUserMsg = [...conversation].reverse().find((m) => m.role === "user");
  const query = lastUserMsg?.content || "";

  const groq = getGroqClient();

  // If no Groq client / API key, proceed directly to Tier 6: Local Offline Knowledge Engine
  if (!groq) {
    console.info("[Tier 6: Local Offline Knowledge Engine] Groq client not configured; activating local offline engine.");
    return await streamLocalBackupResponse(query, conversation, onChunk, onFinish);
  }

  const systemPrompt = buildSystemPrompt();

  // Prepare message history for Groq
  const groqMessages = [
    { role: "system" as const, content: systemPrompt },
    ...conversation.map((m) => ({
      role: m.role as "user" | "assistant" | "system",
      content: m.content,
    })),
  ];

  let fullCleanResponse = "";
  let success = false;

  // Execute Tier 1 through Tier 5 Cascade
  for (const tier of AI_TIERS) {
    try {
      console.info(`[Cascade] Attempting ${tier.name}...`);

      let timeoutId: NodeJS.Timeout;
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error(`${tier.name} timed out after ${tier.timeoutMs}ms`));
        }, tier.timeoutMs);
      });

      const completionPromise = groq.chat.completions.create({
        messages: groqMessages,
        model: tier.model,
        temperature: 0.7,
        max_completion_tokens: 2048,
        top_p: 1,
        stream: true,
      });

      const chatCompletion = await Promise.race([completionPromise, timeoutPromise]);
      clearTimeout(timeoutId!);

      let rawAccumulated = "";
      let previousCleanLength = 0;
      let streamedAnyCleanChunk = false;

      for await (const chunk of chatCompletion) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          rawAccumulated += delta;
          const currentClean = cleanStreamChunk(rawAccumulated);

          // If there is new clean content after stripping think/reasoning tags
          if (currentClean.length > previousCleanLength) {
            const cleanDelta = currentClean.slice(previousCleanLength);
            previousCleanLength = currentClean.length;
            fullCleanResponse = currentClean;
            streamedAnyCleanChunk = true;
            onChunk(cleanDelta, fullCleanResponse);
          }
        }
      }

      if (streamedAnyCleanChunk && fullCleanResponse.trim().length > 0) {
        console.info(`[Cascade] ${tier.name} succeeded. Streaming clean answer to chatbot.`);
        success = true;
        break; // Clean answer successfully delivered!
      }
    } catch (tierErr: any) {
      console.warn(`[Cascade] ${tier.name} failed (Error/Rate Limit/Timeout):`, tierErr?.message || tierErr);
      // If clean answer was already being streamed to the user, do not restart with another model
      if (fullCleanResponse.trim().length > 10) {
        success = true;
        break;
      }
      // Otherwise smoothly cascade to the next tier
    }
  }

  // Tier 6: Local Offline Knowledge Engine (invoked on Network Loss, API Outage, or all AI tiers exhausted)
  if (!success || !fullCleanResponse.trim()) {
    console.warn("[Cascade] All remote AI tiers failed or timed out. Activating [Tier 6: Local Offline Knowledge Engine].");
    try {
      return await streamLocalBackupResponse(query, conversation, onChunk, onFinish);
    } catch (backupErr: any) {
      console.error("[Cascade] Tier 6 error:", backupErr);
      if (onError) onError(backupErr);
      throw backupErr;
    }
  }

  if (onFinish) {
    onFinish(fullCleanResponse);
  }
  return fullCleanResponse;
}

/**
 * Extracts [ORDER:id:qty] and [PRODUCT:id] tags from AI responses
 * and returns clean text plus rich item objects.
 */
export function extractActionsFromText(text: string): {
  cleanText: string;
  items: ParsedActionItem[];
} {
  const items: ParsedActionItem[] = [];
  const seenIds = new Set<string>();

  // Match [ORDER:product_id:qty]
  const orderRegex = /\[ORDER:([a-z0-9-]+)(?::(\d+))?\]/gi;
  let match: RegExpExecArray | null;

  while ((match = orderRegex.exec(text)) !== null) {
    const productId = match[1].toLowerCase();
    const qty = match[2] ? parseInt(match[2], 10) : 1;
    const product = getProduct(productId);
    if (product && !seenIds.has(productId)) {
      items.push({ type: "order", product, qty: Math.max(1, qty) });
      seenIds.add(productId);
    }
  }

  // Match [PRODUCT:product_id]
  const productRegex = /\[PRODUCT:([a-z0-9-]+)\]/gi;
  while ((match = productRegex.exec(text)) !== null) {
    const productId = match[1].toLowerCase();
    const product = getProduct(productId);
    if (product && !seenIds.has(productId)) {
      items.push({ type: "product", product, qty: 1 });
      seenIds.add(productId);
    }
  }

  // Remove the tags from the user-facing text
  const cleanText = text
    .replace(/\[ORDER:[a-z0-9-]+(?::\d+)?\]/gi, "")
    .replace(/\[PRODUCT:[a-z0-9-]+\]/gi, "")
    .trim();

  return { cleanText, items };
}
