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

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";

let groqClientInstance: Groq | null = null;

function getGroqClient(): Groq {
  if (!GROQ_API_KEY) {
    throw new Error(
      "Missing Groq API Key. Please set NEXT_PUBLIC_GROQ_API_KEY in .env.local"
    );
  }
  if (!groqClientInstance) {
    groqClientInstance = new Groq({
      apiKey: GROQ_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  }
  return groqClientInstance;
}

export async function sendStreamingMessage(
  conversation: ChatMessage[],
  onChunk: (delta: string, accumulated: string) => void,
  onFinish?: (fullText: string) => void,
  onError?: (err: Error) => void
): Promise<string> {
  try {
    const groq = getGroqClient();

    const systemPrompt = buildSystemPrompt();

    // Prepare message history for Groq
    const groqMessages = [
      { role: "system" as const, content: systemPrompt },
      ...conversation.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
    ];

    let fullResponse = "";

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: groqMessages,
        model: "openai/gpt-oss-20b",
        temperature: 0.7,
        max_completion_tokens: 2048,
        top_p: 1,
        stream: true,
      });

      for await (const chunk of chatCompletion) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          fullResponse += delta;
          onChunk(delta, fullResponse);
        }
      }
    } catch (modelErr) {
      console.warn("Primary model error, attempting fallback to llama-3.3-70b-versatile:", modelErr);
      const fallbackCompletion = await groq.chat.completions.create({
        messages: groqMessages,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_completion_tokens: 2048,
        top_p: 1,
        stream: true,
      });

      for await (const chunk of fallbackCompletion) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          fullResponse += delta;
          onChunk(delta, fullResponse);
        }
      }
    }

    if (onFinish) {
      onFinish(fullResponse);
    }
    return fullResponse;
  } catch (err: any) {
    console.error("Groq chat error:", err);
    if (onError) onError(err);
    throw err;
  }
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
