export const categories = [
  { id: "all", label: "All" },
  { id: "spiritual", label: "Spiritual" },
  { id: "puja", label: "Puja Samagri" },
  { id: "healthcare", label: "Health Care" },
  { id: "household", label: "Household" },
  { id: "agriculture", label: "Agriculture" },
  { id: "corporate", label: "Corporate" },
  { id: "festival", label: "Festival" },
  { id: "decor", label: "Home Decor" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Exclude<CategoryId, "all">;
  image: string;
};

export const products: Product[] = [
  { id: "lakshmi-paule", name: "Lakshmi Paule", price: 200, category: "spiritual", image: "/products/LP.png" },
  { id: "udbatti-stand", name: "Udbatti Stand", price: 50, category: "spiritual", image: "/products/UB.png" },
  { id: "tulsi-vrindavan", name: "Tulsi Vrindavan", price: 200, category: "spiritual", image: "/products/TW.png" },
  { id: "mangalam-set", name: "Mangalam Set", price: 125, category: "spiritual", image: "/products/MG.png" },
  { id: "havan-kund", name: "Havan Kund", price: 50, category: "spiritual", image: "/products/HK.png" },
  { id: "padma-kund", name: "Padma Kund", price: 75, category: "spiritual", image: "/products/PK.png" },
  { id: "shri-yantra", name: "Shri Yantra", price: 150, category: "spiritual", image: "/products/SY.png" },
  { id: "pen-stand", name: "Pen Stand", price: 200, category: "corporate", image: "/products/PH.png" },
  { id: "card-holder", name: "Card Holder", price: 100, category: "corporate", image: "/products/CH.png" },
  { id: "mobile-stand", name: "Mobile Stand", price: 175, category: "corporate", image: "/products/MS.png" },
  { id: "tea-coaster", name: "Tea Coaster", price: 175, category: "corporate", image: "/products/TC.png" },
  { id: "dantamanjan", name: "Dantamanjan (Red) 50g", price: 150, category: "healthcare", image: "/products/DANT.jpeg" },
  { id: "hridayamrut", name: "Hridayamrut 60g", price: 90, category: "healthcare", image: "/products/HRI.jpeg" },
  { id: "pidantak-oil", name: "Pidantak Oil (8 ml)", price: 125, category: "healthcare", image: "/products/OIL.jpeg" },
  { id: "shubha-arogyam", name: "Shubha Arogyam", price: 210, category: "healthcare", image: "/products/SARO.jpeg" },
  { id: "gomutra-ubatan", name: "Gomutra Ubatan", price: 70, category: "healthcare", image: "/products/GOM.jpeg" },
  { id: "gomutra-ark", name: "Gomutra Ark (1 Litre)", price: 250, category: "healthcare", image: "/products/ARK.jpeg" },
  { id: "gomay-dhoop", name: "Gomay Dhoop (4 in 1)", price: 225, category: "puja", image: "/products/page_3_img_1.jpeg" },
  { id: "cup-dhoop", name: "Cup Dhoop", price: 110, category: "puja", image: "/products/page_3_img_16.jpeg" },
  { id: "ghee-diya", name: "Ghee Diya (50 pc)", price: 175, category: "puja", image: "/products/page_3_img_2.jpeg" },
  { id: "bhimseni-camphor", name: "Bhimseni Camphor", price: 80, category: "puja", image: "/products/page_3_img_3.jpeg" },
  { id: "cow-dung-cake-big", name: "Shubha Cow Dung Cake (Big)", price: 80, category: "puja", image: "/products/page_3_img_4.jpeg" },
  { id: "cow-dung-cake-small", name: "Shubha Cow Dung Cake (Small)", price: 50, category: "puja", image: "/products/page_3_img_5.jpeg" },
  { id: "gomutra-500", name: "Gomutra (500 ml)", price: 50, category: "puja", image: "/products/page_3_img_17.jpeg" },
  { id: "sanskarit-bhasm", name: "Sanskarit Bhasm (20g)", price: 50, category: "puja", image: "/products/page_3_img_7.jpeg" },
  { id: "gonyle-lemon", name: "Gonyle Lemon Floor Cleaner 1L", price: 90, category: "household", image: "/products/page_4_img_11.jpeg" },
  { id: "gonyle-rose", name: "Gonyle Rose Floor Cleaner 1L", price: 90, category: "household", image: "/products/page_4_img_9.jpeg" },
  { id: "bartan-powder", name: "Bartan Powder 125g", price: 75, category: "household", image: "/products/page_4_img_10.jpeg" },
  { id: "vermi-compost", name: "Vermi Compost (1 kg)", price: 75, category: "agriculture", image: "/products/page_4_img_7.jpeg" },
  { id: "organic-compost", name: "Organic Compost", price: 45, category: "agriculture", image: "/products/page_4_img_6.jpeg" },
  { id: "vermi-wash", name: "Vermi Wash (1 Litre)", price: 125, category: "agriculture", image: "/products/page_4_img_8.jpeg" },
  { id: "holi-colors", name: "Holi Colors (Eco-Friendly)", price: 90, category: "festival", image: "/products/page_4_img_1.jpeg" },
  { id: "gomay-rakhi", name: "Gomay Rakhi", price: 25, category: "festival", image: "/products/page_4_img_2.jpeg" },
  { id: "ganeshji", name: "Ganeshji (5 inch)", price: 200, category: "festival", image: "/products/page_4_img_3.jpeg" },
  { id: "gomay-panti", name: "Gomay Panti (Diya)", price: 20, category: "festival", image: "/products/page_4_img_5.jpeg" },
  { id: "balaji-magnet", name: "Balaji Magnet", price: 75, category: "decor", image: "/products/BALAJIKEY.png" },
  { id: "adishakti-big", name: "Adishakti Magnet (Big)", price: 175, category: "decor", image: "/products/ADI.png" },
  { id: "adishakti-small", name: "Adishakti Magnet (Small)", price: 125, category: "decor", image: "/products/ADIs.jpeg" },
  { id: "childrens-magnet", name: "Children's Special Magnet", price: 150, category: "decor", image: "/products/CHI.jpeg" },
  { id: "tiranga-magnet", name: "Tiranga Magnet", price: 175, category: "decor", image: "/products/TRI.jpeg" },
  { id: "vithu-mauli-big", name: "Vithu Mauli Magnet (Big)", price: 175, category: "decor", image: "/products/VM.jpeg" },
  { id: "vithu-mauli-small", name: "Vithu Mauli Magnet (Small)", price: 125, category: "decor", image: "/products/VMs.jpeg" },
  { id: "evil-eye", name: "Evil Eye Wall Hanging", price: 175, category: "decor", image: "/products/EEW.jpeg" },
  { id: "keychains", name: "Keychains", price: 75, category: "decor", image: "/products/KEY.jpeg" },
  { id: "om-wall", name: "Om Wall Hanging", price: 175, category: "decor", image: "/products/OM.jpeg" },
  { id: "shree-wall", name: "Shree Wall Hanging", price: 175, category: "decor", image: "/products/SHREE.jpeg" },
  { id: "swastik-wall", name: "Swastik Wall Hanging", price: 175, category: "decor", image: "/products/SWASTIK.jpeg" },
  { id: "shubh-labh", name: "Shubh-Labh Wall Hanging", price: 175, category: "decor", image: "/products/SL.jpeg" },
  { id: "ram-wall", name: "Ram Wall Hanging", price: 125, category: "decor", image: "/products/RAM.jpeg" },
  { id: "jai-shriram", name: "Jai Shriram Wall Hanging", price: 175, category: "decor", image: "/products/SHRIRAM.jpeg" },
];

export const productGroups = [
  {
    title: "Gomay & Spiritual Products",
    text: "Traditional puja and wellness products crafted from cow-based materials.",
    items: ["Gomay Dhoop", "Cup Dhoop", "Dhoop Sticks", "Cow Dung Cakes", "Ghee Diyas"],
    href: "/products?cat=puja",
  },
  {
    title: "Agriculture & Natural Products",
    text: "Cow-based nourishment for soil, farms and home gardens.",
    items: ["Vermi Compost", "Organic Compost", "Vermi Wash", "Cow-based agricultural products"],
    href: "/products?cat=agriculture",
  },
  {
    title: "Sustainable Lifestyle & Gifting",
    text: "Handmade pieces for homes, desks and meaningful occasions.",
    items: ["Tea Coasters", "Mobile Stands", "Pen Stands", "Card Holders", "Fridge Magnets", "Rakhis"],
    href: "/gifting",
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function inquireUrl(name: string) {
  const text = encodeURIComponent(
    `Namaste, I would like to enquire about ${name} from Giridhan Organics.`
  );
  return `https://wa.me/917559228525?text=${text}`;
}

export function orderUrl(lines: string, total: number) {
  const text = encodeURIComponent(
    `Namaste, I would like to place an order from Giridhan Organics:\n\n${lines}\n\nTotal: ₹ ${total}`
  );
  return `https://wa.me/917559228525?text=${text}`;
}
