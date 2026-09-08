export interface GalleryItem {
  id: string;
  title: string;
  category: "Goshala Sanctuary" | "Indigenous Cows" | "Calf Care" | "Product Making" | "Farm & Soil";
  src: string;
  originalSrc: string;
  alt: string;
  desc: string;
  aspect: "portrait" | "landscape";
  featured?: boolean;
}

export const GOSHALA_GALLERY: GalleryItem[] = [
  {
    id: "goshala-herd-peaceful",
    title: "Herd of Indigenous Cows at Sanctuary",
    category: "Goshala Sanctuary",
    src: "/goshala_images/goshala-herd-indigenous-cows.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.15 AM.jpeg",
    alt: "Herd of 75+ indigenous Gir and Sahiwal cows resting peacefully at Giridhan Goshala",
    desc: "Over 75+ indigenous Gir and Sahiwal cows thriving in our open, loving sanctuary in Dhawda, Bhokardan.",
    aspect: "landscape",
    featured: true,
  },
  {
    id: "goshala-sahiwal-morning",
    title: "Serene Sahiwal Cow in Golden Sunlight",
    category: "Indigenous Cows",
    src: "/goshala_images/goshala-sahiwal-cow-morning.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.15 AM (1).jpeg",
    alt: "Serene Sahiwal cow lying down in warm golden morning sunlight",
    desc: "A pure indigenous cow enjoying the peaceful open atmosphere and golden morning sunshine.",
    aspect: "landscape",
    featured: true,
  },
  {
    id: "goshala-mother-calf",
    title: "Maternal Love & Gentle Ahimsa Care",
    category: "Calf Care",
    src: "/goshala_images/goshala-mother-cow-and-calf.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.06 AM (2).jpeg",
    alt: "Mother cow standing protectively next to her sweet young calf",
    desc: "Unconditional maternal bond in our Ahimsa sanctuary where calves stay close to their mothers.",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "goshala-calf-portrait",
    title: "Young Gir Calf with Sacred Tilak",
    category: "Calf Care",
    src: "/goshala_images/goshala-young-gir-calf-portrait.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.16 AM (1).jpeg",
    alt: "Adorable close-up portrait of a young Gir calf with traditional tilak",
    desc: "Every newborn calf is blessed and nurtured with traditional Ayurvedic and holistic care.",
    aspect: "portrait",
    featured: true,
  },
  {
    id: "goshala-water-trough",
    title: "Fresh Clean Water & Pure Nutrition",
    category: "Goshala Sanctuary",
    src: "/goshala_images/goshala-cow-drinking-pure-water.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.16 AM.jpeg",
    alt: "Indigenous cow drinking clean water from sunlight-lit stone trough",
    desc: "Continuous access to natural clean drinking water and sun-cured green fodder.",
    aspect: "portrait",
  },
  {
    id: "goshala-calf-mineral",
    title: "Natural Organic Mineral Salt Nutrition",
    category: "Calf Care",
    src: "/goshala_images/goshala-calf-mineral-care.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.05 AM.jpeg",
    alt: "Young Gir calf licking a natural organic mineral salt block",
    desc: "Essential trace minerals provided free-choice to support strong immunity and healthy development.",
    aspect: "portrait",
  },
  {
    id: "goshala-cow-mineral-block",
    title: "Traditional Care with Halter & Bell",
    category: "Indigenous Cows",
    src: "/goshala_images/goshala-cow-mineral-salt.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.06 AM.jpeg",
    alt: "Indigenous cow with decorative bell and rope halter licking mineral block",
    desc: "Honoring traditional Indian animal husbandry with loving daily care and attention.",
    aspect: "portrait",
  },
  {
    id: "goshala-courtyard-resting",
    title: "Peaceful Courtyard Darshan",
    category: "Goshala Sanctuary",
    src: "/goshala_images/goshala-cows-resting-courtyard.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.07 AM.jpeg",
    alt: "Indigenous cows resting in the goshala courtyard under the sun",
    desc: "Open, cage-free environment where cows roam freely, socialize, and rest under natural skies.",
    aspect: "portrait",
  },
  {
    id: "goshala-open-paddock",
    title: "Sunlit Open Paddock Sanctuary",
    category: "Indigenous Cows",
    src: "/goshala_images/goshala-cows-sunlit-paddock.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.06 AM (1).jpeg",
    alt: "Cows and calves in the open earthen paddock",
    desc: "Natural earthen soil flooring that keeps cows grounded and preserves their hoof health.",
    aspect: "portrait",
  },
  {
    id: "goshala-peaceful-panorama",
    title: "Gau Seva Sanctuary Panorama",
    category: "Goshala Sanctuary",
    src: "/goshala_images/goshala-peaceful-cows-sunlight.jpg",
    originalSrc: "/goshala_images/WhatsApp Image 2026-09-07 at 9.39.16 AM (2).jpeg",
    alt: "Panoramic view of indigenous cows resting in harmony at Giridhan Goshala",
    desc: "Living harmony between Gau, Gram, and Prakriti in the rural heartland of Jalna, Maharashtra.",
    aspect: "landscape",
  },
];

export const ALL_GALLERY_CATEGORIES = [
  "All",
  "Goshala Sanctuary",
  "Indigenous Cows",
  "Calf Care",
  "Product Making",
  "Farm & Soil",
] as const;

export type GalleryCategory = (typeof ALL_GALLERY_CATEGORIES)[number];
