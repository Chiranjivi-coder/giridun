import { products, type Product } from "@/data/products";
import { site } from "@/data/site";
import type { ChatMessage } from "./groqChat";

/**
 * Intelligent Local Backup Knowledge Engine
 * 
 * When Groq API is unreachable, rate-limited, times out, or encounters any network failure,
 * this engine steps in to provide instant, high-quality, culturally respectful answers
 * with exact product cards [PRODUCT:id] and [ORDER:id:qty] tags.
 */

interface KnowledgeTopic {
  keywords: string[];
  generateResponse: (query: string, history: ChatMessage[]) => {
    text: string;
    productIds?: string[];
    orderItems?: { id: string; qty: number }[];
  };
}

// Phonetic and multilingual aliases
function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const TOPICS: KnowledgeTopic[] = [
  // 1. DIYA / DIVA / DEEPAK / OIL LAMP / GHEE BATTI
  {
    keywords: [
      "diya",
      "diva",
      "deepak",
      "diyo",
      "batti",
      "ghee diya",
      "panchagavya diya",
      "gomay diya",
      "panti",
      "lamp",
      "oil lamp",
    ],
    generateResponse: (query) => {
      const isOrder = /order|buy|chahiye|mangwana|kharid/i.test(query);
      const qtyMatch = query.match(/(\d+)/);
      const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;

      if (isOrder) {
        return {
          text: `**Namaste! 🙏**\n\nI have added **${qty} × Ghee Diya (50 pc)** to your selection!\n\nOur Pure Desi Ghee Diyas are crafted from pure Gir cow ghee and organic cotton wicks. They burn cleanly for ~30 minutes with zero paraffin or toxic soot.\n\nTap **+ Add to Bag** below to confirm, and you can place the order directly via WhatsApp or our secure cart!`,
          orderItems: [{ id: "ghee-diya", qty }],
        };
      }

      return {
        text: `**Namaste! 🙏**\n\nLooking for sacred **Diyas** for your home puja, temple, or festival celebrations? At **Giridhan Organics**, we offer authentic, cow-based lighting essentials:\n\n🪔 **Ghee Diya (50 pc) [₹175]** — Pre-molded ready-to-light pure Desi Ghee battis. Burns evenly for 30 minutes with a divine, soot-free aroma.\n🪔 **Gomay Panti / Diya [₹20]** — Traditional eco-friendly cow-dung diya that can be immersed in soil after use, returning to mother Earth.\n\nTap **+ Add to Bag** on any item below to add it directly to your order:`,
        productIds: ["ghee-diya", "gomay-panti"],
      };
    },
  },

  // 2. DHOOP / INCENSE / AGARBATTI / HAVAN / CAMPHOR
  {
    keywords: [
      "dhoop",
      "dhup",
      "agarbatti",
      "incense",
      "loban",
      "guggal",
      "camphor",
      "kapoor",
      "bhimseni",
      "havan",
      "sambrani",
      "kund",
      "agnihotra",
      "bhasm",
      "cow dung cake",
      "gobar cake",
      "kanda",
    ],
    generateResponse: (query) => {
      const isOrder = /order|buy|chahiye|mangwana|kharid/i.test(query);
      const qtyMatch = query.match(/(\d+)/);
      const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;

      if (isOrder) {
        return {
          text: `**Namaste! 🙏**\n\nCertainly! I have added **${qty} × Gomay Dhoop (4 in 1)** to your selection.\n\nHandcrafted with sacred cow dung, pure Guggal, Loban, and natural resins, it purifies household air and creates an uplifting spiritual atmosphere without harmful chemicals or charcoal.\n\nTap **+ Add to Bag** below to review your cart or place your order via WhatsApp:`,
          orderItems: [{ id: "gomay-dhoop", qty }],
        };
      }

      return {
        text: `**Namaste! 🙏**\n\nHere are our pure **Gomay Puja & Dhoop Essentials**, handcrafted with 100% charcoal-free herbal ingredients:\n\n🌿 **Gomay Dhoop (4 in 1) [₹225]** — Enriched with Guggal, Loban, Camphor & natural herbs to cleanse negative energies.\n🪔 **Cup Dhoop [₹110]** — Convenient Gomay cups with sacred samagri for daily evening aarti.\n🔥 **Agnihotra Havan Kund [₹50] & Padma Kund [₹75]** — Sacred geometry Gomay vessels for healing daily home homa.\n🌿 **Bhimseni Camphor [₹80] & Shubha Cow Dung Cakes [₹50–₹80]** — Pure essentials for sacred daily rituals.\n\nSelect your items below:`,
        productIds: ["gomay-dhoop", "cup-dhoop", "bhimseni-camphor", "havan-kund"],
      };
    },
  },

  // 3. AYURVEDA / HEALTHCARE / DANTAMANJAN / HRIDAYAMRUT / PIDANTAK / GOMUTRA ARK
  {
    keywords: [
      "dantamanjan",
      "dant manjan",
      "tooth",
      "teeth",
      "powder",
      "toothpaste",
      "dental",
      "oral",
      "manjan",
      "hridayamrut",
      "heart",
      "cardiac",
      "cholesterol",
      "blood pressure",
      "pidantak",
      "pain",
      "oil",
      "joint",
      "knee",
      "arthritis",
      "shubha arogyam",
      "immunity",
      "vitality",
      "ark",
      "gomutra",
      "cow urine",
      "detox",
      "ubatan",
      "scrub",
      "skin",
      "health",
      "ayurvedic",
    ],
    generateResponse: (query) => {
      const q = query.toLowerCase();
      if (q.includes("dant") || q.includes("tooth") || q.includes("teeth") || q.includes("manjan")) {
        return {
          text: `**Namaste! 🙏**\n\n**Dantamanjan (Red) 50g [₹150]** is one of our most beloved healthcare formulas!\n\n🌿 **Key Ingredients**: Purified Gomay ash, clove oil (laung), rock salt (saindhav namak), babool bark, and ayurvedic herbs.\n✨ **Benefits**: Strengthens gums, prevents sensitivity, eliminates bad breath, and cleanses plaque without chemical foaming agents (SLS) or artificial abrasives.\n\nTap **+ Add to Bag** below to purchase:`,
          productIds: ["dantamanjan"],
        };
      }

      if (q.includes("pain") || q.includes("oil") || q.includes("joint") || q.includes("knee") || q.includes("pidantak")) {
        return {
          text: `**Namaste! 🙏**\n\n**Pidantak Oil (8 ml) [₹125]** is an authentic Ayurvedic formulation designed for fast, natural relief from:\n\n- Joint pain and knee discomfort\n- Lower back stiffness and muscular fatigue\n- Neck and shoulder soreness\n\nInfused with therapeutic herbs and cow ghee base for deep penetration.\n\nTap **+ Add to Bag** below to try it:`,
          productIds: ["pidantak-oil"],
        };
      }

      if (q.includes("ark") || q.includes("urine") || q.includes("gomutra") || q.includes("detox")) {
        return {
          text: `**Namaste! 🙏**\n\n**Gomutra Ark (1 Litre) [₹250]**:\nPure steam-distilled indigenous cow urine prepared strictly per classical Ayurvedic texts.\n\n✨ **Benefits**: Enhances metabolism, acts as a gentle cellular detoxifier, supports liver function, and boosts natural resistance.\n\nTap **+ Add to Bag** below to add to your order:`,
          productIds: ["gomutra-ark"],
        };
      }

      return {
        text: `**Namaste! 🙏**\n\nHere are our traditional **Ayurvedic Healthcare & Wellness** formulations made with pure Gomay, Gomutra distillate, and therapeutic herbs:\n\n🦷 **Dantamanjan (Red) [₹150]** — Herbal tooth powder for healthy gums and strong teeth.\n❤️ **Hridayamrut 60g [₹90]** — Classical heart tonic with Arjuna, ginger, garlic, and pure honey.\n🌿 **Pidantak Oil [₹125]** — Soothing relief for joint pain and muscular stiffness.\n✨ **Shubha Arogyam [₹210]** — Daily herbal immunity and vitality booster.\n💧 **Gomutra Ark 1L [₹250]** — Steam-distilled pure detox elixir.\n\nSelect any product below:`,
        productIds: ["dantamanjan", "pidantak-oil", "hridayamrut", "shubha-arogyam", "gomutra-ark"],
      };
    },
  },

  // 4. AGRICULTURE / VERMI COMPOST / ORGANIC FARMING / KHAT
  {
    keywords: [
      "compost",
      "vermi",
      "vermicompost",
      "fertilizer",
      "khat",
      "soil",
      "farming",
      "plants",
      "garden",
      "agriculture",
      "vermi wash",
      "earthworm",
      "organic compost",
    ],
    generateResponse: () => {
      return {
        text: `**Namaste! 🙏**\n\nFor chemical-free gardening, terrace farming, and agricultural soil nourishment, Giridhan Organics provides 100% natural, farm-aged solutions:\n\n🌾 **Vermi Compost (1 kg) [₹75]** — High-grade "Black Gold" produced by earthworms feeding on aged Gomay. Rich in active soil microbiology, humus, and balanced N-P-K.\n🌿 **Organic Compost [₹45]** — Completely decomposed farm manure that aerates the soil and improves water retention.\n💧 **Vermi Wash (1 Litre) [₹125]** — Organic liquid foliar spray packed with micro-nutrients, natural growth hormones, and protective enzymes for vegetables and flowers.\n\nSelect your farming products below:`,
        productIds: ["vermi-compost", "organic-compost", "vermi-wash"],
      };
    },
  },

  // 5. HOUSEHOLD / CLEANERS / GONYLE / BARTAN POWDER
  {
    keywords: [
      "cleaner",
      "gonyle",
      "floor",
      "phenyl",
      "lemon",
      "rose",
      "dish",
      "bartan",
      "powder",
      "reetha",
      "soapnut",
      "washing",
      "household",
    ],
    generateResponse: () => {
      return {
        text: `**Namaste! 🙏**\n\nSwitch your home to toxic-free, safe **Household Bio-Cleaners**:\n\n🍋 **Gonyle Lemon Floor Cleaner 1L [₹90]** — Natural disinfectant floor wash powered by distilled Gomutra and pure citrus essential oils. 100% safe for babies and pets!\n🌹 **Gonyle Rose Floor Cleaner 1L [₹90]** — Gentle floral fragrance with natural germ-repelling protection.\n✨ **Vedic Bartan Powder 125g [₹75]** — Traditional wood and cow-dung ash combined with tamarind and soapnut (Reetha). Leaves brass, copper, and cookware sparkling without synthetic chemicals.\n\nChoose your cleaners below:`,
        productIds: ["gonyle-lemon", "gonyle-rose", "bartan-powder"],
      };
    },
  },

  // 6. SACRED DECOR / WALL HANGINGS / MAGNETS / GANESHJI / RAKHI
  {
    keywords: [
      "decor",
      "wall hanging",
      "hanging",
      "symbol",
      "om",
      "swastik",
      "shri yantra",
      "lakshmi paule",
      "shubh labh",
      "ram",
      "jai shriram",
      "balaji",
      "magnet",
      "rakhi",
      "ganesh",
      "ganeshji",
      "idol",
      "murti",
      "evil eye",
      "keychain",
      "coaster",
      "pen stand",
      "mobile stand",
      "card holder",
    ],
    generateResponse: (query) => {
      const q = query.toLowerCase();
      if (q.includes("ganesh")) {
        return {
          text: `**Namaste! 🙏**\n\n**Eco Ganeshji Idol (5 inch) [₹200]**:\nHandcrafted with sacred Gomay and natural binders. 100% eco-friendly and dissolves cleanly in water during loving home visarjan, leaving no toxic residue in our water bodies.\n\nTap **+ Add to Bag** below to add it:`,
          productIds: ["ganeshji"],
        };
      }

      if (q.includes("rakhi")) {
        return {
          text: `**Namaste! 🙏**\n\n**Gomay Rakhi [₹25]**:\nTraditional eco-friendly rakhi made from purified Gomay. Embedded with holy seeds that can be planted in soil after Raksha Bandhan to bloom into sacred Tulsi or flowering plants!\n\nTap **+ Add to Bag** below to order:`,
          productIds: ["gomay-rakhi"],
        };
      }

      return {
        text: `**Namaste! 🙏**\n\nHere are our most popular **Handcrafted Gomay Decor & Sacred Plaque** pieces:\n\n✨ **Lakshmi Paule [₹200]** — Auspicious footprints of Goddess Lakshmi to invite prosperity.\n🕉️ **Om Wall Hanging [₹175] & Swastik Wall Hanging [₹175]** — Sacred energetic symbols for entrances and puja rooms.\n🚩 **Jai Shriram Wall Hanging [₹175] & Ram Wall Hanging [₹125]** — Divine handcrafted wall blessings.\n🧿 **Evil Eye Wall Hanging [₹175] & Balaji Magnet [₹75]** — Protective and sacred home accents.\n\nSelect below:`,
        productIds: ["lakshmi-paule", "om-wall", "swastik-wall", "jai-shriram", "evil-eye"],
      };
    },
  },

  // 7. OUR STORY / GOSEVA / ABOUT US / LOCATION / JALNA
  {
    keywords: [
      "story",
      "about",
      "goseva",
      "cows",
      "cow",
      "who are you",
      "mission",
      "gir",
      "sahiwal",
      "history",
      "farm",
      "founder",
      "philosophy",
      "why giridhan",
    ],
    generateResponse: () => {
      return {
        text: `**Namaste! 🙏 Welcome to Giridhan Organics (गिरिधन ऑर्गेनिक्स).**\n\n**Our Roots & Mission:**\n- 📍 **Location**: Dhawda, Bhokardan, Dist. Jalna (Maharashtra), India.\n- 🌿 **Founded**: 2021.\n- 🐄 **Selfless Goseva**: Our sanctuary cares for over 75+ indigenous Gir, Sahiwal, and local cows through lifelong Goshala care.\n- 🌸 **Guiding Principle**: *"Gau, Gram, and Prakriti"* — Revitalizing rural livelihoods, empowering village women artisans, and preserving timeless Vedic ecology.\n- 🍃 **Purity Guarantee**: All our products are 100% chemical-free, charcoal-free, and ethically handcrafted.\n\nWould you like to explore our **Puja Essentials**, **Ayurvedic Healthcare**, or **Natural Farming** solutions?`,
        productIds: ["ghee-diya", "gomay-dhoop", "dantamanjan", "vermi-compost"],
      };
    },
  },

  // 8. HOW TO ORDER / ORDERING / SHIPPING / PAYMENT / WHATSAPP
  {
    keywords: [
      "order",
      "how to order",
      "buy",
      "purchase",
      "payment",
      "delivery",
      "shipping",
      "cod",
      "courier",
      "checkout",
      "bag",
      "cart",
    ],
    generateResponse: () => {
      return {
        text: `**Namaste! 🙏 Ordering with Giridhan is quick and simple:**\n\n1. **Browse in Chat or Website**: Tap **"+ Add to Bag"** on any product card above.\n2. **Review Bag**: Tap the **"Your Added Bag"** drawer at the bottom of the chat to check quantities and total.\n3. **One-Tap WhatsApp Checkout**: Tap **"Order via WhatsApp"** to instantly send your pre-filled cart details to our Goshala team at **+91 75592 28525**.\n4. **Pan-India Delivery**: We securely pack and courier directly from our farm in Jalna to your doorstep!\n\nHere are some of our popular staples to get you started:`,
        productIds: ["ghee-diya", "gomay-dhoop", "dantamanjan"],
      };
    },
  },

  // 9. CONTACT / PHONE / VISIT / ADDRESS / WHATSAPP NUMBER
  {
    keywords: [
      "contact",
      "phone",
      "number",
      "call",
      "whatsapp",
      "email",
      "address",
      "visit",
      "where",
      "location",
      "reach",
    ],
    generateResponse: () => {
      return {
        text: `**Namaste! 🙏 We would love to assist you:**\n\n- 📞 **Phone / WhatsApp**: [+91 75592 28525](https://wa.me/917559228525?text=Namaste!%20I%20am%20inquiring%20about%20Giridhan%20Organics%20products.)\n- ✉️ **Email**: ${site.email}\n- 📍 **Goshala Address**: Dhawda, Bhokardan, Dist. Jalna - 431114, Maharashtra, India.\n- 🕒 **Timing**: Monday – Saturday, 9:00 AM – 7:00 PM\n\nYou are always welcome to visit our goshala to experience authentic Goseva in person!`,
      };
    },
  },

  // 10. CORPORATE GIFTING / HAMPERS / BULK ORDERS
  {
    keywords: [
      "gift",
      "gifting",
      "hamper",
      "corporate",
      "wedding",
      "festival",
      "bulk",
      "diwali gift",
      "wholesale",
    ],
    generateResponse: () => {
      return {
        text: `**Namaste! 🙏 We craft meaningful, eco-friendly Gift Hampers:**\n\n- 🎁 **Festive Hampers**: Curated sets of Pure Ghee Diyas, Gomay Dhoop, Sacred Wall Plaques, and herbal essentials.\n- 💼 **Corporate & Event Gifts**: Sustainable desk sets featuring Gomay mobile stands, pen holders, and tea coasters with custom packaging.\n- 🌿 **Plantable Rakhis & Tokens**: Eco-friendly celebration kits for schools, corporate gatherings, and spiritual trusts.\n\nReach us on WhatsApp at **+91 75592 28525** for customized gift hampers and bulk pricing!`,
        productIds: ["mobile-stand", "pen-stand", "tea-coaster", "ghee-diya"],
      };
    },
  },

  // 11. FULL CATALOG / ALL PRODUCTS / PRICING
  {
    keywords: [
      "all products",
      "catalog",
      "price list",
      "all",
      "list",
      "best sellers",
      "top products",
      "products",
      "menu",
      "what do you sell",
      "categories",
    ],
    generateResponse: () => {
      return {
        text: `**Namaste! 🙏 Here is a curated selection of Giridhan's top best sellers:**\n\n🪔 **Ghee Diya (50 pc) [₹175]** — Ready-to-light pure Desi cow ghee battis.\n🌿 **Gomay Dhoop (4 in 1) [₹225]** — 100% natural, charcoal-free dhoop sticks.\n🦷 **Dantamanjan (Red) 50g [₹150]** — Ayurvedic tooth powder for healthy gums.\n🌾 **Vermi Compost (1 kg) [₹75]** — Organic nutrient-dense fertilizer for soil.\n✨ **Lakshmi Paule [₹200]** — Handcrafted sacred Gomay wall plaque.\n\nTap **+ Add to Bag** on any item below to start your order:`,
        productIds: ["ghee-diya", "gomay-dhoop", "dantamanjan", "vermi-compost", "lakshmi-paule"],
      };
    },
  },
];

/**
 * Generate intelligent local response using embedded catalog and business knowledge
 */
export function generateLocalBackupResponse(
  userQuery: string,
  history: ChatMessage[] = []
): { text: string } {
  const norm = normalize(userQuery);

  // 1. Check direct product name match
  const matchedProduct = products.find((p) => {
    const pName = normalize(p.name);
    return norm.includes(pName) || pName.includes(norm);
  });

  if (matchedProduct && norm.length > 2) {
    const isBuy = /buy|order|chahiye|mangwana|kharid/i.test(userQuery);
    const qtyMatch = userQuery.match(/(\d+)/);
    const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;

    if (isBuy) {
      return {
        text: `**Namaste! 🙏**\n\nI have prepared **${qty} × ${matchedProduct.name}** (₹${matchedProduct.price}) for your order.\n\nHandcrafted with pure, natural cow-based ingredients from our Goshala in Jalna.\n\nTap **+ Add to Bag** below to add to your cart or order via WhatsApp!\n\n[ORDER:${matchedProduct.id}:${qty}]`,
      };
    }

    return {
      text: `**Namaste! 🙏**\n\nHere are the details for **${matchedProduct.name}**:\n\n- 🏷️ **Price**: ₹${matchedProduct.price}\n- 📦 **Category**: ${matchedProduct.category.toUpperCase()}\n- 🌿 **Purity**: 100% natural, cow-based, and chemical-free.\n\nTap **+ Add to Bag** below to add it directly to your cart:\n\n[PRODUCT:${matchedProduct.id}]`,
    };
  }

  // 2. Check topic matchers
  for (const topic of TOPICS) {
    for (const kw of topic.keywords) {
      // Word boundary or inclusion match
      const regex = new RegExp(`\\b${kw}\\b`, "i");
      if (regex.test(norm) || norm.includes(kw)) {
        const result = topic.generateResponse(userQuery, history);
        let finalText = result.text;

        if (result.orderItems && result.orderItems.length > 0) {
          const tags = result.orderItems
            .map((item) => `[ORDER:${item.id}:${item.qty}]`)
            .join(" ");
          finalText += `\n\n${tags}`;
        } else if (result.productIds && result.productIds.length > 0) {
          const tags = result.productIds
            .map((id) => `[PRODUCT:${id}]`)
            .join(" ");
          finalText += `\n\n${tags}`;
        }

        return { text: finalText };
      }
    }
  }

  // 3. Greeting match
  if (/^(hi|hello|namaste|pranam|ram ram|radhe radhe|hey|jai shri krishna)/i.test(norm)) {
    return {
      text: `**Namaste! 🙏 Warm greetings from Giridhan Organics.**\n\nHow can I help you today? You can ask about:\n- 🪔 **Ghee Diyas & Gomay Dhoop** for puja and festivals\n- 🦷 **Dantamanjan & Ayurvedic healthcare**\n- 🌾 **Vermi Compost** for terrace gardens & farming\n- 📖 **Our Goseva mission** & 75+ protected indigenous cows\n- 📦 **Placing an order** directly to your doorstep\n\n[PRODUCT:ghee-diya] [PRODUCT:gomay-dhoop] [PRODUCT:dantamanjan]`,
    };
  }

  // 4. Default helpful fallback (never gives a dead-end error)
  return {
    text: `**Namaste! 🙏**\n\nThank you for reaching out to Giridhan Organics. We offer a full range of 100% natural cow-based puja essentials, Ayurvedic wellness items, and organic farm compost.\n\nHere are some of our most loved daily essentials you can explore:\n\nTap **+ Add to Bag** below, or chat with us on WhatsApp at **+91 75592 28525** for personalized recommendations!\n\n[PRODUCT:ghee-diya] [PRODUCT:gomay-dhoop] [PRODUCT:dantamanjan] [PRODUCT:vermi-compost]`,
  };
}

/**
 * Stream local backup response with smooth human-like typing effect
 */
export async function streamLocalBackupResponse(
  userQuery: string,
  history: ChatMessage[],
  onChunk: (delta: string, accumulated: string) => void,
  onFinish?: (fullText: string) => void
): Promise<string> {
  const { text } = generateLocalBackupResponse(userQuery, history);

  // Divide into natural chunks (words or small phrases)
  const tokens = text.split(/(\s+)/);
  let accumulated = "";

  for (let i = 0; i < tokens.length; i++) {
    accumulated += tokens[i];
    onChunk(tokens[i], accumulated);

    // Fast, responsive streaming (10ms pause every few tokens for natural flow)
    if (i % 3 === 0 && i < tokens.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 8));
    }
  }

  if (onFinish) {
    onFinish(accumulated);
  }

  return accumulated;
}
