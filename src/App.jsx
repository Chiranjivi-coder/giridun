import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  X,
  Plus,
  Minus,
  Star,
  Sparkles,
  ShieldCheck,
  Truck,
  Leaf,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Check,
  Trash2,
  ChevronDown,
  ChevronUp,
  Share2,
  MessageCircle,
  Award,
  Filter,
  Eye,
  Percent,
  Gift,
  CheckCircle2,
  Globe,
  Building2,
  Users,
  Handshake,
  BookOpen,
  Calendar,
  Clock,
  Compass
} from 'lucide-react';

// --- COMPREHENSIVE PRODUCT CATALOG ---
const ALL_PRODUCTS = [
  // 1. Gomay & Spiritual Products
  { 
    id: 1, 
    name: 'LAKSHMI PAULE', 
    price: 200, 
    originalPrice: 260, 
    category: 'Gomay & Spiritual', 
    img: 'LP.png', 
    rating: 4.9, 
    reviewsCount: 142, 
    badge: 'Bestseller', 
    tag: 'Sacred Energy',
    description: 'Handcrafted sacred Lakshmi Paule infused with sanctified indigenous cow dung and natural Vedic binders. Auspicious symbol to invite Goddess Lakshmi’s blessings, prosperity, and spiritual balance into your household or workplace.',
    benefits: ['Brings positive cosmic vibrations', 'Natural Gomay formulation', 'Handcrafted by Goshala artisans', 'Auspicious for Diwali & Daily Puja'],
    ingredients: 'Pure Indigenous Cow Dung, Sanctified Clay, Natural Binders, Herbal Fragrance'
  },
  { 
    id: 2, 
    name: 'UDBATTI STAND', 
    price: 50, 
    originalPrice: 75, 
    category: 'Gomay & Spiritual', 
    img: 'UB.png', 
    rating: 4.8, 
    reviewsCount: 89, 
    tag: 'Eco Craft',
    description: 'Artisanal eco-friendly Gomay incense holder crafted to burn your natural dhoop and agarbatti sticks safely while releasing subtle earth-purifying aromas.',
    benefits: ['100% biodegradable and heat-resistant', 'Zero toxic chemicals', 'Earthy artisanal look for altars'],
    ingredients: 'Vedic Gomay, Sun-dried Clay, Natural Plant Gum'
  },
  { 
    id: 3, 
    name: 'TULSI VRINDAVAN', 
    price: 200, 
    originalPrice: 260, 
    category: 'Gomay & Spiritual', 
    img: 'TW.png', 
    rating: 5.0, 
    reviewsCount: 210, 
    badge: 'Devotee Pick', 
    tag: 'Holy Sacred',
    description: 'Sacred miniature Gomay Tulsi Vrindavan dedicated to holy rituals. Emits serene devotional vibrations, ideal for daily prayer corners, puja rooms, and vastu harmony.',
    benefits: ['Promotes spiritual tranquility', 'Vedic design aesthetics', 'Enhances positive prana'],
    ingredients: 'Sun-cured Indigenous Cow Dung, Herbal Binders, Sacred Bhasma'
  },
  { 
    id: 4, 
    name: 'MANGALAM SET', 
    price: 125, 
    originalPrice: 165, 
    category: 'Gomay & Spiritual', 
    img: 'MG.png', 
    rating: 4.9, 
    reviewsCount: 76, 
    tag: 'Puja Ritual',
    description: 'Complete auspicious puja accompaniment set carefully prepared from sacred indigenous cow panchyagavya elements for festive celebrations and everyday prayers.',
    benefits: ['Complete ceremonial utility', 'Pure and holy composition', 'Handmade with prayerful intent'],
    ingredients: 'Purified Gomay, Panchagavya essences, Natural Camphor'
  },
  { 
    id: 5, 
    name: 'HAVAN KUND', 
    price: 50, 
    originalPrice: 75, 
    category: 'Gomay & Spiritual', 
    img: 'HK.png', 
    rating: 4.8, 
    reviewsCount: 115, 
    badge: 'Agnihotra', 
    tag: 'Air Purifier',
    description: 'Compact organic Gomay Havan Kund designed for daily agnihotra and homa ceremonies. Purifies indoor atmosphere and neutralizes negative airborne elements.',
    benefits: ['Transforms indoor prana', 'Safe and manageable size for flats', 'Combusts with natural cow ghee and camphor'],
    ingredients: 'Aged Indigenous Cow Dung, Organic Rice Husk, Sanctified Soil'
  },
  { 
    id: 6, 
    name: 'PADMA KUND', 
    price: 75, 
    originalPrice: 100, 
    category: 'Gomay & Spiritual', 
    img: 'PK.png', 
    rating: 4.9, 
    reviewsCount: 68, 
    tag: 'Sacred Lotus',
    description: 'Lotus-inspired Gomay Kund constructed with sacred Vedic proportions to harmonize environmental energies during morning rituals and festive pujas.',
    benefits: ['Sacred lotus geometry', 'Naturally heat insulating', 'Supports organic goshala livelihood'],
    ingredients: 'Gir Cow Dung, Natural Gum, Medicinal Herbs'
  },
  { 
    id: 7, 
    name: 'SHRI YANTRA', 
    price: 150, 
    originalPrice: 200, 
    category: 'Gomay & Spiritual', 
    img: 'SY.png', 
    rating: 5.0, 
    reviewsCount: 184, 
    badge: 'Bestseller', 
    tag: 'Vastu Harmony',
    description: 'Sacred Gomay Shri Yantra plaque crafted with precision sacred geometry. Emits boundless prosperity, wealth consciousness, and high spiritual serenity.',
    benefits: ['Rectifies environmental vastu flaws', 'Symbol of supreme cosmic wealth', 'Suitable for home temple or work cabin'],
    ingredients: 'Purified Cow Dung, Herbal Resins, Protective Natural Varnish'
  },
  { 
    id: 26, 
    name: 'GOMAY DHOOP (4 in 1)', 
    price: 225, 
    originalPrice: 290, 
    category: 'Gomay & Spiritual', 
    img: 'page_3_img_1.jpeg', 
    rating: 5.0, 
    reviewsCount: 360, 
    badge: 'Bestseller', 
    tag: 'Zero Charcoal',
    description: 'Premium 4-in-1 pure cow dung dhoop sticks made with Guggal, Loban, Camphor, and natural resins. 100% chemical and charcoal-free holy aroma that clears negative energies.',
    benefits: ['Zero harmful chemicals or charcoal fumes', 'Long burning time of 45+ minutes', 'Fills premises with temple-like sanctity'],
    ingredients: 'Desi Cow Dung, Pure Guggal, Loban, Kapoor, Jata Mansi, Natural Resins'
  },
  { 
    id: 27, 
    name: 'GOMAY GUGGUL CUP DHOOP', 
    price: 110, 
    originalPrice: 145, 
    category: 'Gomay & Spiritual', 
    img: 'page_3_img_16.jpeg', 
    rating: 4.9, 
    reviewsCount: 190, 
    badge: 'Aromatic', 
    tag: 'Sambrani Cup',
    description: 'Ready-to-light Gomay sambrani cups pre-filled with organic havan samagri, natural Guggul, and pure resins for an enduring divine temple fragrance.',
    benefits: ['Easy to light with matchstick', 'Deep mystical resin aroma', 'Cleanses atmospheric impurities'],
    ingredients: 'Gomay Cup, Guggul, Loban Resins, Natural Essential Oils'
  },
  { 
    id: 28, 
    name: 'PURE DESI GHEE DIYA (50 Pcs)', 
    price: 175, 
    originalPrice: 230, 
    category: 'Gomay & Spiritual', 
    img: 'page_3_img_2.jpeg', 
    rating: 4.9, 
    reviewsCount: 240, 
    badge: 'Pure Cow Ghee', 
    tag: 'No Mess Diya',
    description: 'Pre-molded pure desi cow ghee battis ready for effortless daily puja without messy oil spills. Burns completely with an auspicious bright flame.',
    benefits: ['Pure cow ghee without paraffin wax', '30-minute steady burn duration', 'Leaves no residue or soot in diya'],
    ingredients: '100% Desi Cow Ghee, Pure Cotton Wick, Natural Camphor Essence'
  },
  { 
    id: 29, 
    name: 'BHIMSENI CAMPHOR (100g)', 
    price: 80, 
    originalPrice: 110, 
    category: 'Gomay & Spiritual', 
    img: 'page_3_img_3.jpeg', 
    rating: 5.0, 
    reviewsCount: 215, 
    badge: '100% Pure', 
    tag: 'Smokeless Burn',
    description: 'Unadulterated high-purity Bhimseni Kapur known for sublime vibration energy and clean smokeless burn. Leaves zero black carbon behind.',
    benefits: ['Certified pure crystalline camphor', 'Purifies respiratory passages', 'Repels negative vectors and insects'],
    ingredients: '100% Pure Crystalline Bhimseni Camphor'
  },
  { 
    id: 30, 
    name: 'SHUBHA COW DUNG CAKE (BIG)', 
    price: 80, 
    originalPrice: 105, 
    category: 'Gomay & Spiritual', 
    img: 'page_3_img_4.jpeg', 
    rating: 4.8, 
    reviewsCount: 130, 
    tag: 'Vedic Havan',
    description: 'Sun-dried traditional large desi cow dung cakes for authentic Agnihotra and Vedic ceremonies. Dried naturally without microbial contamination.',
    benefits: ['Even, sustained burning', 'Releases oxygen upon burning with cow ghee', 'Ethically procured from grass-fed cows'],
    ingredients: '100% Indigenous Desi Cow Dung'
  },
  { 
    id: 31, 
    name: 'SHUBHA COW DUNG CAKE (SMALL)', 
    price: 50, 
    originalPrice: 70, 
    category: 'Gomay & Spiritual', 
    img: 'page_3_img_5.jpeg', 
    rating: 4.7, 
    reviewsCount: 95, 
    tag: 'Daily Agnihotra',
    description: 'Convenient sized Gomay cakes perfect for everyday dhoop burning and small sacred fires in modern urban apartments.',
    benefits: ['Perfect size for small havan pots', 'Easy to ignite', 'Clean and well packed'],
    ingredients: 'Desi Cow Dung, Natural Sun-cured'
  },
  { 
    id: 71, 
    name: 'GOMUTRA SACRED WATER (500ml)', 
    price: 50, 
    originalPrice: 70, 
    category: 'Gomay & Spiritual', 
    img: 'page_3_img_17.jpeg', 
    rating: 4.9, 
    reviewsCount: 82, 
    tag: 'Sanctification',
    description: 'Filtered pure ritual-grade cow urine collected before sunrise from happy Gir cows for sanctification rituals, griha pravesh, and vastu shuddhi.',
    benefits: ['Sanctifies premises for holy rituals', 'Authentic traditional collection', 'Hygienically sealed'],
    ingredients: 'Filtered Pure Indigenous Cow Urine'
  },
  { 
    id: 72, 
    name: 'SANSKARIT BHASM (20gm)', 
    price: 50, 
    originalPrice: 70, 
    category: 'Gomay & Spiritual', 
    img: 'page_3_img_7.jpeg', 
    rating: 5.0, 
    reviewsCount: 112, 
    badge: 'Holy Ash', 
    tag: 'Ajna Chakra',
    description: 'Consecrated sacred Gomay Vibhuti prepared according to Agamic tenets for applying on the brow chakra during prayer and meditation.',
    benefits: ['Cooling and calming effect on mind', 'Zero chemical dyes or chalk', 'Finely sieved sacred ash'],
    ingredients: 'Sanctified Cow Dung Ash, Natural Aromatic Herbs'
  },

  // 2. Agriculture & Natural Products
  { 
    id: 36, 
    name: 'VERMI COMPOST (1 Kg)', 
    price: 75, 
    originalPrice: 100, 
    category: 'Agriculture & Natural', 
    img: 'page_4_img_7.jpeg', 
    rating: 5.0, 
    reviewsCount: 280, 
    badge: 'Black Gold', 
    tag: 'Soil Nutrition',
    description: 'Nutrient-rich organic fertilizer produced by earthworms feeding on aged indigenous cow dung. Supercharges roots and multiplies blooms in home gardens.',
    benefits: ['Rich in nitrogen, phosphorus, and potassium', 'Enhances soil water-holding capacity', 'Ideal for balcony pots, vegetables, and flowers'],
    ingredients: '100% Desi Cow Dung Vermicompost'
  },
  { 
    id: 37, 
    name: 'PURE ORGANIC COMPOST', 
    price: 45, 
    originalPrice: 65, 
    category: 'Agriculture & Natural', 
    img: 'page_4_img_6.jpeg', 
    rating: 4.8, 
    reviewsCount: 140, 
    tag: 'Natural Manure',
    description: 'Fully decomposed aged farm manure prepared organically for lush foliage, strong stems, and heavy fruit setting without synthetic urea.',
    benefits: ['Rebuilds depleted garden soil microbiology', 'Slow-release natural nourishment', '100% weed-seed free'],
    ingredients: 'Aged Goshala Manure, Plant Biomass'
  },
  { 
    id: 38, 
    name: 'VERMI WASH LIQUID TONIC (1L)', 
    price: 125, 
    originalPrice: 165, 
    category: 'Agriculture & Natural', 
    img: 'page_4_img_8.jpeg', 
    rating: 4.9, 
    reviewsCount: 175, 
    badge: 'Liquid Elixir', 
    tag: 'Foliar Spray',
    description: 'Liquid foliar spray rich in plant growth hormones, enzymes, and natural pest-repellent amino acids. Revives dull plants within days.',
    benefits: ['Instant foliar spray absorption', 'Protects against leaf curl and fungal pests', 'Encourages vibrant green glossy leaves'],
    ingredients: 'Collected Earthworm Coelomic Fluid & Nutritive Organic Extracts'
  },
  { 
    id: 33, 
    name: 'GONYLE LEMON BIO-CLEANER (1L)', 
    price: 90, 
    originalPrice: 125, 
    category: 'Agriculture & Natural', 
    img: 'page_4_img_11.jpeg', 
    rating: 4.9, 
    reviewsCount: 220, 
    badge: 'Baby & Pet Safe', 
    tag: 'Natural Bio-Floor',
    description: 'Natural non-toxic antiseptic floor wash made from Gomutra distillate and pure citrus lemon oil. Completely biodegradable and safe for greywater garden recycling.',
    benefits: ['Natural disinfectant and bug repellent', 'Run-off nourishes plants and soil', 'Leaves fresh zesty citrus fragrance'],
    ingredients: 'Purified Cow Urine Distillate, Pine Oil, Pure Lemon Essential Oil, Bio-surfactants'
  },
  { 
    id: 34, 
    name: 'GONYLE ROSE BIO-CLEANER (1L)', 
    price: 90, 
    originalPrice: 125, 
    category: 'Agriculture & Natural', 
    img: 'page_4_img_9.jpeg', 
    rating: 4.8, 
    reviewsCount: 160, 
    tag: 'Floral Fresh',
    description: 'Aromatic rose-infused natural bio-cleaner leaving floors sparkling clean and premises free from flies, mosquitoes, and microbial pathogens.',
    benefits: ['Eliminates flies and insects naturally', 'Pleasant Indian rose fragrance', 'Zero harsh chemical residues'],
    ingredients: 'Gomutra Distillate, Rose Fragrance Extract, Pine Derivative'
  },
  { 
    id: 35, 
    name: 'VEDIC BARTAN POWDER (125gm)', 
    price: 75, 
    originalPrice: 99, 
    category: 'Agriculture & Natural', 
    img: 'page_4_img_10.jpeg', 
    rating: 4.9, 
    reviewsCount: 110, 
    tag: 'Chemical-Free',
    description: 'Traditional dishwashing powder combining Gomay ash with tamarind and soapnut. Cuts stubborn grease effortlessly while keeping hands soft.',
    benefits: ['Leaves brass, copper, and steel shining', 'Zero chemical detergent residue on utensils', 'Safe for water drainage and environment'],
    ingredients: 'Wood & Gomay Ash, Reetha (Soapnut), Shikakai, Tamarind Extracts, Lemon Peel'
  },

  // 3. Sustainable Lifestyle & Gifting
  { 
    id: 15, 
    name: 'ORGANIC PEN STAND', 
    price: 200, 
    originalPrice: 250, 
    category: 'Lifestyle & Gifting', 
    img: 'PH.png', 
    rating: 4.7, 
    reviewsCount: 52, 
    badge: 'Eco Desk', 
    tag: 'Corporate Gift',
    description: 'Artisanal organic desk organizer crafted from compressed Gomay with a smooth earthen terracotta finish. Makes a prestigious, eco-conscious executive gift.',
    benefits: ['100% plastic-free desk decor', 'Odorless and highly durable', 'Memorable green corporate gift'],
    ingredients: 'Processed Cow Dung Fiber, Natural Resins, Mineral Colors'
  },
  { 
    id: 16, 
    name: 'ORGANIC CARD HOLDER', 
    price: 100, 
    originalPrice: 135, 
    category: 'Lifestyle & Gifting', 
    img: 'CH.png', 
    rating: 4.6, 
    reviewsCount: 41, 
    tag: 'Green Office',
    description: 'Sleek eco-friendly business card holder showcasing your commitment to sustainability, environmental stewardship, and green enterprise values.',
    benefits: ['Holds 30+ business cards', 'Biodegradable & lightweight', 'Smooth tactile texture'],
    ingredients: 'Compressed Gomay, Natural Plant Binders'
  },
  { 
    id: 17, 
    name: 'ERGONOMIC MOBILE STAND', 
    price: 175, 
    originalPrice: 220, 
    category: 'Lifestyle & Gifting', 
    img: 'MS.png', 
    rating: 4.8, 
    reviewsCount: 97, 
    badge: 'Trending', 
    tag: 'Daily Essential',
    description: 'Sturdy ergonomic desk mobile phone stand handcrafted from seasoned cow dung composite. Features cable pass-through for convenient video calls and charging.',
    benefits: ['Supports all smartphone sizes', 'Radiation neutralizing properties of Gomay', 'Anti-slip sturdy base'],
    ingredients: 'Hard-pressed Cow Dung Composite, Natural Tree Resins'
  },
  { 
    id: 18, 
    name: 'TEA COASTER SET (4 Pcs)', 
    price: 175, 
    originalPrice: 225, 
    category: 'Lifestyle & Gifting', 
    img: 'TC.png', 
    rating: 4.8, 
    reviewsCount: 63, 
    tag: 'Heat Resistant',
    description: 'Heat-resistant, natural aromatic tea and coffee coasters to protect work tables with earthen sophistication and zero plastic waste.',
    benefits: ['Withstands boiling cups', 'Naturally absorbent', 'Elegant rustic texture'],
    ingredients: 'Cow Dung Fiber, Natural Vegetable Sealant'
  },
  { 
    id: 40, 
    name: 'PLANTABLE GOMAY RAKHI', 
    price: 25, 
    originalPrice: 40, 
    category: 'Lifestyle & Gifting', 
    img: 'page_4_img_2.jpeg', 
    rating: 5.0, 
    reviewsCount: 190, 
    badge: 'Plantable Seed', 
    tag: 'Sacred Bond',
    description: 'Biodegradable sacred Gomay rakhi embedded with organic seeds. After the festival, bury the rakhi in a pot to sprout a holy basil or flowering plant.',
    benefits: ['Plantable seed embedded in rakhi', 'Symbol of auspicious sibling love', 'Zero plastic glitter or nylon threads'],
    ingredients: 'Hand-pressed Gomay, Organic Cotton Thread, Viable Plant Seeds'
  },
  { 
    id: 43, 
    name: 'LORD BALAJI FRIDGE MAGNET', 
    price: 75, 
    originalPrice: 100, 
    category: 'Lifestyle & Gifting', 
    img: 'BALAJIKEY.png', 
    rating: 4.9, 
    reviewsCount: 85, 
    badge: 'Devotional', 
    tag: 'Fridge Magnet',
    description: 'Handcrafted Lord Venkateswara fridge/cabinet magnet radiating spiritual grace, positive energy, and divine protection in your kitchen or office.',
    benefits: ['Strong ceramic magnetic back', 'Intricate handcrafted details', 'Durable natural seal'],
    ingredients: 'Gomay Composite, Natural Colors, Magnet'
  },
  { 
    id: 44, 
    name: 'ADISHAKTI (BIG) MAGNET', 
    price: 175, 
    originalPrice: 220, 
    category: 'Lifestyle & Gifting', 
    img: 'ADI.png', 
    rating: 4.9, 
    reviewsCount: 65, 
    tag: 'Shakti Symbol',
    description: 'Intricately molded Adishakti divine symbol bringing auspicious feminine power, harmony, and protective aura to your living space.',
    benefits: ['Bold statement magnet', 'Handcrafted by women artisans', 'Eco-friendly materials'],
    ingredients: 'Gomay Paste, Natural Binders'
  },
  { 
    id: 46, 
    name: 'CHILDREN\'S SPECIAL MAGNET', 
    price: 150, 
    originalPrice: 195, 
    category: 'Lifestyle & Gifting', 
    img: 'CHI.jpeg', 
    rating: 4.8, 
    reviewsCount: 54, 
    tag: 'Kids Decor',
    description: 'Cheerful handcrafted eco-magnet crafted safely for kids study tables, wardrobes, and rooms to bring joyful vibes and eco-awareness.',
    benefits: ['Safe rounded edges', 'Non-toxic vegetable dyes', 'Encourages organic consciousness'],
    ingredients: 'Gomay Paste, Plant-based Dyes'
  },
  { 
    id: 47, 
    name: 'TIRANGA PATRIOTIC MAGNET', 
    price: 175, 
    originalPrice: 220, 
    category: 'Lifestyle & Gifting', 
    img: 'TRI.jpeg', 
    rating: 5.0, 
    reviewsCount: 78, 
    badge: 'National Pride', 
    tag: 'Tricolor',
    description: 'Tricolor Indian national pride magnet made sustainably with organic colors and cow dung base. Display your love for Bharat sustainably.',
    benefits: ['Vibrant national tricolor', 'Eco-conscious patriotic souvenir', 'Long-lasting finish'],
    ingredients: 'Organic Gomay, Mineral Pigments'
  },
  { 
    id: 48, 
    name: 'VITHU MAULI (BIG) MAGNET', 
    price: 175, 
    originalPrice: 225, 
    category: 'Lifestyle & Gifting', 
    img: 'VM.jpeg', 
    rating: 5.0, 
    reviewsCount: 110, 
    badge: 'Pandharpur Grace', 
    tag: 'Mauli Blessing',
    description: 'Lord Vitthal Mauli sacred art magnet to fill your abode with blissful Pandharpur devotion, serenity, and unconditional love.',
    benefits: ['Soulful Maharashtrian cultural art', 'Embossed design detail', 'Brings peace and calm'],
    ingredients: 'Sanctified Gomay, Natural Clay, Color Pigments'
  },
  { 
    id: 50, 
    name: 'EVIL EYE WALL HANGING', 
    price: 175, 
    originalPrice: 230, 
    category: 'Lifestyle & Gifting', 
    img: 'EEW.jpeg', 
    rating: 4.9, 
    reviewsCount: 140, 
    badge: 'Drishti Raksha', 
    tag: 'Vastu Ward',
    description: 'Drishti Dosha protective wall hanging crafted with sacred Gomay to absorb negative energies, evil eye vibrations, and envy at your entrance door.',
    benefits: ['Wards off negative evil eye vibes', 'Ideal for main entryway', 'Traditional vastu protection'],
    ingredients: 'Sun-baked Cow Dung Plaque, Natural Indigo Pigment, Jute Cord'
  },
  { 
    id: 51, 
    name: 'SACRED KEYCHAINS', 
    price: 75, 
    originalPrice: 100, 
    category: 'Lifestyle & Gifting', 
    img: 'KEY.jpeg', 
    rating: 4.7, 
    reviewsCount: 92, 
    tag: 'Pocket Blessing',
    description: 'Durable and lightweight Gomay souvenir keychain blessed with sacred symbolism to carry good omen and grounding energy wherever you travel.',
    benefits: ['Lightweight and crack-resistant', 'Natural earthy scent', 'High quality metallic keyring'],
    ingredients: 'Pressed Gomay, High-strength Natural Varnish, Steel Ring'
  },
  { 
    id: 52, 
    name: 'SACRED OM WALL HANGING', 
    price: 175, 
    originalPrice: 230, 
    category: 'Lifestyle & Gifting', 
    img: 'OM.jpeg', 
    rating: 5.0, 
    reviewsCount: 155, 
    badge: 'Cosmic Prana', 
    tag: 'Meditation Wall',
    description: 'Majestic sacred Om wall talisman vibrating primordial cosmic peace and purity. Enhances meditation halls, living rooms, and yoga sanctuaries.',
    benefits: ['Radiates soothing OM resonance', 'Easy to hang with integrated hook', 'Hand-finished in rich earthen tone'],
    ingredients: 'Aged Indigenous Gomay, Herbal Resins, Mineral Finish'
  },
  { 
    id: 54, 
    name: 'VEDIC SWASTIK WALL HANGING', 
    price: 175, 
    originalPrice: 225, 
    category: 'Lifestyle & Gifting', 
    img: 'SWASTIK.jpeg', 
    rating: 5.0, 
    reviewsCount: 165, 
    badge: 'Auspicious', 
    tag: 'Main Door Vastu',
    description: 'Handcrafted Vedic Swastika hanging to ward off vastu doshas and welcome good fortune at home entryways, puja gates, and cash counters.',
    benefits: ['Rectifies entrance energy faults', 'Ancient cosmic geometry', 'Durable and weather resistant'],
    ingredients: 'Processed Gomay Base, Protective Natural Sealer'
  },
  { 
    id: 55, 
    name: 'SHUBH-LABH WALL HANGING SET', 
    price: 175, 
    originalPrice: 230, 
    category: 'Lifestyle & Gifting', 
    img: 'SL.jpeg', 
    rating: 4.9, 
    reviewsCount: 120, 
    tag: 'Double Fortune',
    description: 'Traditional doorway Shubh-Labh plaque set bringing luck, ethical wealth, and business growth. Traditional Indian craftsmanship at its finest.',
    benefits: ['Two-piece auspicious doorway set', 'Ideal for housewarming or Diwali', 'Supports ethical cow goshala'],
    ingredients: 'Gomay Clay, Organic Colors, Hanging Loops'
  },
  { 
    id: 56, 
    name: 'SHRI RAM WALL HANGING', 
    price: 125, 
    originalPrice: 170, 
    category: 'Lifestyle & Gifting', 
    img: 'RAM.jpeg', 
    rating: 5.0, 
    reviewsCount: 180, 
    badge: 'Maryada Purushottam', 
    tag: 'Divine Grace',
    description: 'Sacred Maryada Purushottam Shri Ram devotional wall plaque with holy earth finish. Instills righteousness, peace, and courage in the home.',
    benefits: ['Embossed holy depiction of Lord Ram', 'Calming earthy texture', 'Perfect spiritual gift'],
    ingredients: 'Sanctified Cow Dung, Herbal Resins'
  },
  { 
    id: 57, 
    name: 'JAI SHRIRAM WALL HANGING', 
    price: 175, 
    originalPrice: 230, 
    category: 'Lifestyle & Gifting', 
    img: 'SHRIRAM.jpeg', 
    rating: 5.0, 
    reviewsCount: 220, 
    badge: 'Bestseller', 
    tag: 'Dharmic Pride',
    description: 'Grand Jai Shri Ram wall centerpiece radiating divine courage, protection, and dharmic peace. A revered showpiece for your sanctuary.',
    benefits: ['High relief 3D sculptural detailing', 'Infused with holy cow dung prana', 'Symbol of truth and righteousness'],
    ingredients: 'Purified Desi Cow Dung, Sun-dried, Natural Pigments'
  },
  { 
    id: 41, 
    name: 'ECO GANESHJI IDOL (5 inch)', 
    price: 200, 
    originalPrice: 260, 
    category: 'Lifestyle & Gifting', 
    img: 'page_4_img_3.jpeg', 
    rating: 5.0, 
    reviewsCount: 210, 
    badge: 'Eco Friendly', 
    tag: 'Home Visarjan',
    description: 'Clay and Gomay hand-sculpted eco-friendly Ganesha idol that dissolves completely in water within minutes for a clean, loving home visarjan.',
    benefits: ['100% water soluble for home visarjan', 'Water can be used to nourish plants', 'Artisanal hand-painted details'],
    ingredients: 'Clay, Cow Dung, Natural Plant Dyes'
  },

  // 4. Traditional Wellness & Health Care
  { 
    id: 19, 
    name: 'DANTAMANJAN (RED) 50g', 
    price: 150, 
    originalPrice: 190, 
    category: 'Traditional Wellness', 
    img: 'DANT.jpeg', 
    rating: 4.9, 
    reviewsCount: 230, 
    badge: 'Ayurvedic Star', 
    tag: 'Tooth & Gum Care',
    description: 'Traditional Ayurvedic red tooth powder formulated with purified Gomay ash, clove, rock salt, babool, and medicinal herbs. Strengthens gums and eliminates plaque naturally.',
    benefits: ['Strengthens teeth roots and gums', 'Prevents bleeding gums and bad breath', 'Free from chemical foaming agents and SLS'],
    ingredients: 'Purified Gomay Ash, Saindhava Salt, Pudina Satva, Clove Oil, Babool Bark, Geru'
  },
  { 
    id: 20, 
    name: 'HRIDAYAMRUT 60gm', 
    price: 90, 
    originalPrice: 125, 
    category: 'Traditional Wellness', 
    img: 'HRI.jpeg', 
    rating: 5.0, 
    reviewsCount: 178, 
    badge: 'Heart Care', 
    tag: 'Holistic Elixir',
    description: 'Traditional herbal and Gomutra ark-assisted wellness formulation designed to assist cardiovascular strength, metabolic balance, and bodily vitality.',
    benefits: ['Promotes healthy arterial circulation', 'Natural adaptogenic heart tonic', 'Time-tested Ayurvedic formulation'],
    ingredients: 'Arjuna Bark, Ginger, Garlic, Pure Gomutra Distillate, Organic Honey'
  },
  { 
    id: 21, 
    name: 'PIDANTAK OIL (8 ml)', 
    price: 125, 
    originalPrice: 165, 
    category: 'Traditional Wellness', 
    img: 'OIL.jpeg', 
    rating: 4.9, 
    reviewsCount: 195, 
    badge: 'Fast Relief', 
    tag: 'Joint Comfort',
    description: 'Deeply penetrating Ayurvedic pain relief oil formulated with potent herbal roots and gomutra distillate for soothing joint stiffness and muscular soreness.',
    benefits: ['Rapid warm transdermal absorption', 'Relieves chronic joint discomfort', '100% herbal active ingredients'],
    ingredients: 'Gandhapura Oil, Nilgiri, Shallaki, Gomutra Ark Extract, Sesame Oil'
  },
  { 
    id: 23, 
    name: 'SHUBHA AROGYAM', 
    price: 210, 
    originalPrice: 270, 
    category: 'Traditional Wellness', 
    img: 'SARO.jpeg', 
    rating: 4.8, 
    reviewsCount: 88, 
    tag: 'Daily Immunity',
    description: 'Comprehensive natural vitality enhancer balancing Tridosha (Vata, Pitta, Kapha) with indigenous cow elixir and restorative Himalayan herbs.',
    benefits: ['Boosts stamina and defense mechanism', 'Aids digestion and cellular detox', 'Handcrafted in small batches'],
    ingredients: 'Desi Cow Ark, Ashwagandha, Giloy, Tulsi, Amla Extract'
  },
  { 
    id: 24, 
    name: 'GOMUTRA UBATAN (HERBAL)', 
    price: 70, 
    originalPrice: 95, 
    category: 'Traditional Wellness', 
    img: 'GOM.jpeg', 
    rating: 4.9, 
    reviewsCount: 145, 
    badge: 'Glow Care', 
    tag: 'Skin Detox',
    description: 'Traditional skin-rejuvenating herbal bath ubtan with antiseptic properties of distilled Gomutra. Gently exfoliates and imparts a radiant complexion.',
    benefits: ['Treats skin allergies & blemishes', 'Removes dead skin cells gently', 'Pleasant natural herbal aroma'],
    ingredients: 'Distilled Gomutra Powder, Turmeric, Chickpea Flour, Sandalwood, Multani Mitti'
  },
  { 
    id: 25, 
    name: 'GOMUTRA ARK (1 Litre)', 
    price: 250, 
    originalPrice: 320, 
    category: 'Traditional Wellness', 
    img: 'ARK.jpeg', 
    rating: 5.0, 
    reviewsCount: 310, 
    badge: 'Bestseller', 
    tag: 'Vedic Detox',
    description: '100% steam-distilled pure indigenous cow urine ark prepared following Charaka Samhita guidelines. Highly regarded for daily cellular cleansing.',
    benefits: ['Powerful internal detoxification', 'Helps regulate blood sugar and digestion', 'Distilled in surgical-grade stainless apparatus'],
    ingredients: '100% Pure Steam Distilled Desi Cow Urine (Ark)'
  }
];

const CATEGORIES = [
  'All',
  'Gomay & Spiritual',
  'Agriculture & Natural',
  'Lifestyle & Gifting',
  'Traditional Wellness',
  'Bestsellers'
];

// --- GALLERY ITEMS ---
const GALLERY_ITEMS = [
  { title: 'Herd of Indigenous Cows at Sanctuary', category: 'Goshala', img: '/goshala_images/goshala-herd-indigenous-cows.jpg', desc: 'Over 75+ indigenous Gir and Sahiwal cows thriving in our open, loving sanctuary in Dhawda, Bhokardan.' },
  { title: 'Serene Sahiwal Cow in Golden Sunlight', category: 'Indigenous Cows', img: '/goshala_images/goshala-sahiwal-cow-morning.jpg', desc: 'A pure indigenous cow enjoying the peaceful open atmosphere and golden morning sunshine.' },
  { title: 'Maternal Love & Gentle Ahimsa Care', category: 'Indigenous Cows', img: '/goshala_images/goshala-mother-cow-and-calf.jpg', desc: 'Unconditional maternal bond in our Ahimsa sanctuary where calves stay close to their mothers.' },
  { title: 'Young Gir Calf with Sacred Tilak', category: 'Indigenous Cows', img: '/goshala_images/goshala-young-gir-calf-portrait.jpg', desc: 'Every newborn calf is blessed and nurtured with traditional Ayurvedic and holistic care.' },
  { title: 'Fresh Clean Water & Pure Nutrition', category: 'Goshala', img: '/goshala_images/goshala-cow-drinking-pure-water.jpg', desc: 'Continuous access to natural clean drinking water and sun-cured green fodder.' },
  { title: 'Natural Organic Mineral Salt Nutrition', category: 'Goshala', img: '/goshala_images/goshala-calf-mineral-care.jpg', desc: 'Essential trace minerals provided free-choice to support strong immunity and healthy development.' },
  { title: 'Traditional Care with Halter & Bell', category: 'Indigenous Cows', img: '/goshala_images/goshala-cow-mineral-salt.jpg', desc: 'Honoring traditional Indian animal husbandry with loving daily care and attention.' },
  { title: 'Peaceful Courtyard Darshan', category: 'Goshala', img: '/goshala_images/goshala-cows-resting-courtyard.jpg', desc: 'Open, cage-free environment where cows roam freely, socialize, and rest under natural skies.' },
  { title: 'Sunlit Open Paddock Sanctuary', category: 'Indigenous Cows', img: '/goshala_images/goshala-cows-sunlit-paddock.jpg', desc: 'Natural earthen soil flooring that keeps cows grounded and preserves their hoof health.' },
  { title: 'Gau Seva Sanctuary Panorama', category: 'Goshala', img: '/goshala_images/goshala-peaceful-cows-sunlight.jpg', desc: 'Living harmony between Gau, Gram, and Prakriti in the rural heartland of Jalna, Maharashtra.' },
  { title: 'Indigenous Desi Cows at Sanctuary', category: 'Indigenous Cows', img: 'hea1.jpeg', desc: 'Loving care and natural green fodder for 75+ Gir & Sahiwal cows.' },
  { title: 'Ahimsa Goshala Daily Seva', category: 'Goshala', img: 'hea2.jpeg', desc: 'Our tranquil spiritual sanctuary in Dhawda, Bhokardan.' },
  { title: 'Handcrafting Pure Gomay Artifacts', category: 'Product Making', img: 'hea3.jpeg', desc: 'Sun-curing and molding sacred geometry with zero chemicals.' },
  { title: 'Artisanal Rural Women Empowerment', category: 'Women Artisans', img: 'hea4.jpeg', desc: 'Generating dignified livelihoods for rural women artisans.' },
  { title: 'Zero Charcoal Dhoop Preparation', category: 'Product Making', img: 'page_3_img_1.jpeg', desc: 'Blending camphor, guggal, and loban resins by hand.' },
  { title: 'Pure Desi Ghee Battis Packing', category: 'Packaging', img: 'page_3_img_2.jpeg', desc: 'Biodegradable, sacred, ready-to-light ghee battis.' },
  { title: 'Natural Organic Vermicompost', category: 'Farm', img: 'page_4_img_7.jpeg', desc: 'Black gold fertilizer nourishing pesticide-free farmlands.' },
  { title: 'Corporate & Custom Gift Hampers', category: 'Corporate Gifting', img: 'page_4_img_12.jpeg', desc: 'Sustainable gifting packages delivered for corporate delegations.' }
];

// --- JOURNAL / BLOG STORIES ---
const JOURNAL_STORIES = [
  {
    id: 1,
    title: 'Connecting Gau, Gram and Prakriti: The Philosophy Behind Giridhan',
    category: 'Goseva & Sustainability',
    date: 'August 2026',
    readTime: '4 min read',
    excerpt: 'How Goseva creates a sustainable cycle connecting indigenous cattle, village empowerment, and ecological restoration.',
    fullText: `India’s ancient wisdom has always placed Gomata at the very center of agricultural prosperity, health, and spiritual sanctity. In our journey since 2021, we have witnessed firsthand how protecting and respecting indigenous cows creates a direct positive ripple effect across rural communities.

When cow dung and cow urine are valued for their natural biochemical and antimicrobial potency, cows are never abandoned once they age. Instead, they remain the most treasured members of the household. 

Giridhan Organics bridges the age-old connection between Gau (the cow), Gram (the village community), and Prakriti (Mother Nature), proving that ancient Vedic living is the world’s most viable model for a sustainable future.`
  },
  {
    id: 2,
    title: 'Why Conscious Corporates are Moving Away from Plastic Gifts to Gomay Crafts',
    category: 'Sustainable Living',
    date: 'July 2026',
    readTime: '3 min read',
    excerpt: 'From pen stands to tea coasters, discover why sustainable cow-dung crafts make the most impactful executive statements.',
    fullText: `Conventional corporate gifts often end up forgotten in desk drawers or adding to plastic landfill waste. Forward-thinking companies today seek gifts that narrate an authentic, values-driven story.

Giridhan’s eco-lifestyle range—including compressed Gomay pen holders, ergonomic smartphone docks, and earthen tea coasters—are heat-resistant, completely odorless, and 100% biodegradable.

When a client or international delegate touches an authentic Giridhan gift, they hold the craftsmanship of Indian rural women, the legacy of indigenous cows, and an inspiring testament to circular sustainability.`
  },
  {
    id: 3,
    title: 'The Science of Agnihotra and Pure Charcoal-Free Gomay Dhoop',
    category: 'Traditional Knowledge',
    date: 'June 2026',
    readTime: '5 min read',
    excerpt: 'Understanding the air-purifying, antimicrobial, and vastu-balancing science of burning desi cow dung with camphor and guggul.',
    fullText: `Modern scientific research has validated what the Atharva Veda documented millennia ago: when dry indigenous cow dung is burned with pure desi cow ghee and camphor, it releases beneficial phenolic compounds, ethylene oxide, and formaldehydes in micro-traces that act as formidable air disinfectants.

Unlike commercial incense which relies on toxic coal dust, synthetic artificial perfumes, and binding polymers, Giridhan Gomay Dhoop is 100% natural. It purifies indoor air without throat irritation, eliminating negative airborne microbes while calming the nervous system for deep meditation and restful sleep.`
  }
];

// --- MAIN APP COMPONENT ---
export default function App() {
  // Cart State (Persisted in localStorage)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('giridhan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('giridhan_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [partnerModalType, setPartnerModalType] = useState('corporate'); // 'corporate', 'partner', 'international'
  const [selectedJournalStory, setSelectedJournalStory] = useState(null);

  // Multi-Page Client Router State
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'about', 'products', 'gifting', 'impact', 'international', 'gallery', 'journal', 'contact'];
      if (validPages.includes(hash)) return hash;
    }
    return 'home';
  });

  // Filters & Navigation
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState('All');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  useEffect(() => {
    try {
      localStorage.setItem('giridhan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('giridhan_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added "${product.name}" to Bag!`);
  };

  const updateCartQty = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = productId => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Item removed from Bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = product => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from Wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        addToast(`Saved "${product.name}" to Wishlist! ❤️`);
        return [...prev, product];
      }
    });
  };

  const isWishlisted = productId => wishlist.some(item => item.id === productId);

  // Cart calculations
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartOriginalSubtotal = cart.reduce((sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity, 0);
  const freeShippingThreshold = 499;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : 49;
  const couponDiscount = appliedCoupon
    ? Math.round(cartSubtotal * (appliedCoupon.discountPercent / 100))
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + shippingFee);
  const totalSavings = (cartOriginalSubtotal - cartSubtotal) + couponDiscount;

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'VEDIC10') {
      setAppliedCoupon({ code: 'VEDIC10', discountPercent: 10, label: '10% Vedic Blessing Off' });
      setCouponError('');
      addToast('🎉 Coupon "VEDIC10" applied! You saved 10%');
    } else if (code === 'GIRIDHAN5') {
      setAppliedCoupon({ code: 'GIRIDHAN5', discountPercent: 5, label: '5% Pure Goshala Off' });
      setCouponError('');
      addToast('🎉 Coupon "GIRIDHAN5" applied!');
    } else {
      setCouponError('Invalid code. Try "VEDIC10" for 10% off!');
    }
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesCategory =
        selectedCategory === 'All'
          ? true
          : selectedCategory === 'Bestsellers'
          ? product.badge?.includes('Bestseller') || product.rating >= 4.9
          : product.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return ALL_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'about', 'products', 'gifting', 'impact', 'international', 'gallery', 'journal', 'contact'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (pageId) => {
    const validPages = ['home', 'about', 'products', 'gifting', 'impact', 'international', 'gallery', 'journal', 'contact'];
    const target = validPages.includes(pageId) ? pageId : 'home';
    setCurrentPage(target);
    window.location.hash = target === 'home' ? '' : target;
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Backwards compatibility alias for components calling scrollToSection
  const scrollToSection = (id) => {
    navigateToPage(id);
  };

  // Checkout modal form state
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'whatsapp_direct',
    notes: ''
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      addToast('Please complete name, phone, and delivery address', 'error');
      return;
    }

    const orderItemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* x ${item.quantity} = ₹${item.product.price * item.quantity}`
      )
      .join('\n');

    const whatsappMessage = `*✨ NEW SACRED ORDER - GIRIDHAN ORGANICS ✨*
---------------------------------------
*Customer Name:* ${checkoutForm.name}
*Phone Number:* ${checkoutForm.phone}
*Delivery Address:* ${checkoutForm.address}, ${checkoutForm.city} - ${checkoutForm.pincode}
*Payment Preference:* ${checkoutForm.paymentMethod === 'cod' ? 'Cash on Delivery' : checkoutForm.paymentMethod === 'upi' ? 'UPI Online Transfer' : 'Direct Goshala Verification'}
${checkoutForm.notes ? `*Special Notes:* ${checkoutForm.notes}\n` : ''}
*--- ORDER ITEMS ---*
${orderItemsText}

*Subtotal:* ₹${cartSubtotal}
${appliedCoupon ? `*Coupon Discount (${appliedCoupon.code}):* -₹${couponDiscount}\n` : ''}*Shipping:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
*Grand Total Payable:* *₹${cartTotal}*
---------------------------------------
_Please confirm my order dispatch. Har Har Mahadev / Jai Gomata!_`;

    const whatsappUrl = `https://wa.me/917559228525?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setOrderConfirmed(true);
    clearCart();
    addToast('Order transmitted to Goshala WhatsApp helpline!', 'success');
  };

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    category: 'Corporate Gifting',
    message: ''
  });

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    const msg = `*🤝 PARTNERSHIP / GIFTING ENQUIRY - GIRIDHAN ORGANICS*
---------------------------------------
*Name:* ${partnerForm.name}
*Organization / Company:* ${partnerForm.organization}
*Email:* ${partnerForm.email}
*Phone:* ${partnerForm.phone}
*Area of Interest:* ${partnerForm.category}
*Requirement:* ${partnerForm.message}
---------------------------------------
_Looking forward to connecting with the Giridhan team._`;
    window.open(`https://wa.me/917559228525?text=${encodeURIComponent(msg)}`, '_blank');
    setIsPartnerModalOpen(false);
    addToast('Thank you! Partnership details shared on WhatsApp.', 'success');
  };

  const openPartnerModal = (type = 'corporate') => {
    setPartnerModalType(type);
    setPartnerForm(prev => ({
      ...prev,
      category: type === 'corporate' ? 'Corporate Gifting' : type === 'international' ? 'International Collaborations' : 'Retail & Distribution'
    }));
    setIsPartnerModalOpen(true);
  };

  // Direct Contact Page Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const msg = `*✉️ CONTACT INQUIRY - GIRIDHAN ORGANICS*
---------------------------------------
*Name:* ${contactForm.name}
*Phone:* ${contactForm.phone}
*Email:* ${contactForm.email || 'Not specified'}
*Subject:* ${contactForm.subject}
*Message:* ${contactForm.message}
---------------------------------------
_Submitted via Giridhan Website Contact Page._`;
    window.open(`https://wa.me/917559228525?text=${encodeURIComponent(msg)}`, '_blank');
    addToast('Thank you! Inquiry forwarded to WhatsApp helpline.', 'success');
    setContactForm({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col font-sans relative selection:bg-amber-200 selection:text-emerald-950 pb-20 sm:pb-0 w-full overflow-x-hidden">
      
      {/* UNIFIED STICKY HEADER FOR ALL DEVICES */}
      <header className="sticky top-0 z-40 w-full shadow-sm">
        {/* 1. SCROLLING MARQUEE ANNOUNCEMENT BAR — inspired by gircowcare.org */}
        <div className="announcement-bar py-2 border-b border-amber-500/20 overflow-hidden" style={{background:'linear-gradient(90deg,#143D24 0%,#1a5c35 50%,#143D24 100%)'}}>
          <div className="flex overflow-hidden relative">
            <div className="animate-marquee flex items-center gap-0">
              {/* Repeat content twice so the marquee loops seamlessly */}
              {[0, 1].map(i => (
                <span key={i} className="inline-flex items-center text-[11px] sm:text-xs font-semibold text-[#F5E6C8] whitespace-nowrap">
                  <span className="mx-4 text-amber-400">🌿</span>
                  <span>Free Delivery on orders above <strong className="text-white">₹499</strong></span>
                  <span className="mx-5 text-amber-500/60">•</span>
                  <span>Use code <strong className="text-amber-300 underline">VEDIC10</strong> for 10% off</span>
                  <span className="mx-5 text-amber-500/60">•</span>
                  <span>🐄 100% Pure Desi Cow Products • Bhokardan Goshala, Jalna Maharashtra</span>
                  <span className="mx-5 text-amber-500/60">•</span>
                  <span>📞 WhatsApp Order: <strong className="text-white">+91 75592 28525</strong></span>
                  <span className="mx-5 text-amber-500/60">•</span>
                  <span>✨ Eco-Friendly Packaging • Zero Chemicals • Traditional Vedic Process</span>
                  <span className="mx-5 text-amber-500/60">•</span>
                  <span>🎁 Custom Corporate &amp; Wedding Gift Hampers Available</span>
                  <span className="mx-5 text-amber-500/60">•</span>
                  <span>🌱 Giridhan Organics — Go Green with Nature's Gift</span>
                  <span className="mx-4 text-amber-400">🌿</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. LUXURY MAIN NAVBAR */}

        <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20 gap-3 xl:gap-6">
              
              {/* Logo & Brand Identity */}
              <div 
                onClick={() => scrollToSection('home')} 
                className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group flex-shrink-0"
              >
                <div className="relative p-0.5 sm:p-1 rounded-full bg-gradient-to-tr from-amber-400/30 to-emerald-600/30 group-hover:scale-105 transition-transform">
                  <img
                    src="/logo.png"
                    alt="Giridhan Organics Logo"
                    className="h-9 w-9 sm:h-11 sm:w-11 object-contain rounded-full shadow-inner bg-white p-0.5"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=100&auto=format&fit=crop&q=60';
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1 sm:space-x-1.5">
                    <span className="font-serif font-extrabold text-lg sm:text-2xl tracking-wide text-emerald-950 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                      GIRIDHAN
                    </span>
                    <span className="font-serif font-light text-sm sm:text-xl text-amber-600 tracking-wider whitespace-nowrap">
                      ORGANICS
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 -mt-1 text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-emerald-800/90 whitespace-nowrap">
                    <span>Goshala</span>
                    <span>•</span>
                    <span>Farm</span>
                    <span className="hidden xs:inline">•</span>
                    <span className="hidden xs:inline text-amber-700">Since 2021</span>
                  </div>
                </div>
              </div>

              {/* Official Website Menu: Cleanly spaced single-line navigation with active page state */}
              <nav className="hidden xl:flex items-center space-x-3 2xl:space-x-5 font-medium text-xs 2xl:text-sm text-stone-700 flex-shrink-0">
                <button 
                  onClick={() => navigateToPage('home')} 
                  className={`transition-all py-1 px-2.5 rounded-full relative whitespace-nowrap ${
                    currentPage === 'home' 
                      ? 'bg-emerald-900 text-amber-300 font-bold shadow-sm' 
                      : 'hover:text-emerald-800 hover:bg-stone-100 font-semibold'
                  }`}
                >
                  Home
                </button>
                <button 
                  onClick={() => navigateToPage('about')} 
                  className={`transition-all py-1 px-2.5 rounded-full relative whitespace-nowrap ${
                    currentPage === 'about' 
                      ? 'bg-emerald-900 text-amber-300 font-bold shadow-sm' 
                      : 'hover:text-emerald-800 hover:bg-stone-100'
                  }`}
                >
                  About Us
                </button>
                <button 
                  onClick={() => navigateToPage('products')} 
                  className={`transition-all py-1 px-2.5 rounded-full relative whitespace-nowrap ${
                    currentPage === 'products' 
                      ? 'bg-emerald-900 text-amber-300 font-bold shadow-sm' 
                      : 'hover:text-emerald-800 hover:bg-stone-100 font-semibold text-emerald-900'
                  }`}
                >
                  Our Products
                </button>
                <button 
                  onClick={() => navigateToPage('gifting')} 
                  className={`transition-all py-1 px-2.5 rounded-full relative whitespace-nowrap flex items-center space-x-1 ${
                    currentPage === 'gifting' 
                      ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm' 
                      : 'hover:text-amber-800 hover:bg-amber-50 text-amber-800 font-medium'
                  }`}
                >
                  <Gift className={`w-3.5 h-3.5 flex-shrink-0 inline ${currentPage === 'gifting' ? 'text-stone-950' : 'text-amber-600'}`} />
                  <span>Sustainable Gifting</span>
                </button>
                <button 
                  onClick={() => navigateToPage('impact')} 
                  className={`transition-all py-1 px-2.5 rounded-full relative whitespace-nowrap ${
                    currentPage === 'impact' 
                      ? 'bg-emerald-900 text-amber-300 font-bold shadow-sm' 
                      : 'hover:text-emerald-800 hover:bg-stone-100'
                  }`}
                >
                  Our Impact
                </button>
                <button 
                  onClick={() => navigateToPage('international')} 
                  className={`transition-all py-1 px-2.5 rounded-full relative whitespace-nowrap ${
                    currentPage === 'international' 
                      ? 'bg-emerald-900 text-amber-300 font-bold shadow-sm' 
                      : 'hover:text-emerald-800 hover:bg-stone-100'
                  }`}
                >
                  International
                </button>
                <button 
                  onClick={() => navigateToPage('journal')} 
                  className={`transition-all py-1 px-2.5 rounded-full relative whitespace-nowrap ${
                    currentPage === 'journal' 
                      ? 'bg-emerald-900 text-amber-300 font-bold shadow-sm' 
                      : 'hover:text-emerald-800 hover:bg-stone-100'
                  }`}
                >
                  Blog
                </button>
                <button 
                  onClick={() => navigateToPage('contact')} 
                  className={`transition-all py-1 px-2.5 rounded-full relative whitespace-nowrap ${
                    currentPage === 'contact' 
                      ? 'bg-emerald-900 text-amber-300 font-bold shadow-sm' 
                      : 'hover:text-emerald-800 hover:bg-stone-100'
                  }`}
                >
                  Contact
                </button>
              </nav>

              {/* Action Icons & Smart Search: Clean alignment on right */}
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                
                {/* Expandable/Interactive Search */}
                <div className="relative">
                  <div className="flex items-center">
                    {/* Collapsed Search Trigger Button (Desktop & Mobile) */}
                    <button
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                      className={`p-2.5 rounded-full text-stone-700 hover:text-emerald-900 hover:bg-stone-100 transition-all duration-200 ${isSearchOpen ? 'bg-stone-100 text-emerald-900' : ''}`}
                      aria-label="Search Catalog"
                    >
                      <Search className="w-5 h-5" />
                    </button>

                    {/* Expandable Search Input (Desktop) */}
                    <div className={`hidden 2xl:block relative transition-all duration-300 overflow-visible ${isSearchOpen || searchQuery ? 'w-56 opacity-100 ml-1' : 'w-0 opacity-0 pointer-events-none'}`}>
                      <input
                        type="text"
                        placeholder="Search 40+ products..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                        className="w-full pl-8 pr-7 py-1.5 rounded-full border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-stone-50 transition-all"
                      />
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Dropdown Floating Search Bar on Click (for screens below 2xl) */}
                  {isSearchOpen && (
                    <div className="2xl:hidden absolute right-0 top-full mt-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-2.5 z-50 animate-fadeIn">
                      <div className="relative">
                        <input
                          type="text"
                          autoFocus
                          placeholder="Search 40+ Gomay products..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                          className="w-full pl-8 pr-8 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 bg-stone-50"
                        />
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        {searchQuery && (
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Autocomplete Suggestions Popup */}
                  {isSearchFocused && searchSuggestions.length > 0 && (
                    <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 animate-fadeIn">
                      <div className="p-2 text-[10px] font-bold uppercase text-stone-400 tracking-wider border-b border-stone-100 flex justify-between items-center">
                        <span>Product Matches ({searchSuggestions.length})</span>
                        <span className="text-emerald-700 cursor-pointer" onMouseDown={() => setIsSearchFocused(false)}>Close</span>
                      </div>
                      {searchSuggestions.map(item => (
                        <div
                          key={item.id}
                          onMouseDown={() => {
                            setQuickViewProduct(item);
                            setSearchQuery('');
                            setIsSearchOpen(false);
                          }}
                          className="flex items-center p-2.5 hover:bg-emerald-50/60 cursor-pointer transition-colors border-b border-stone-100 last:border-b-0 space-x-3"
                        >
                          <img src={item.img} alt={item.name} className="w-9 h-9 object-cover rounded-lg bg-stone-100" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-stone-800 truncate">{item.name}</div>
                            <div className="text-[11px] text-emerald-700 font-medium">₹{item.price} • <span className="text-stone-400">{item.category}</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative p-2.5 text-stone-700 hover:text-red-600 hover:bg-stone-100 rounded-full transition-all duration-200"
                  aria-label="View Wishlist"
                >
                  <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Cart Drawer Trigger with price badge */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center space-x-2 bg-emerald-900 hover:bg-emerald-800 text-white px-3 sm:px-3.5 py-2 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 group"
                  aria-label="View Cart"
                >
                  <div className="relative">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                    {totalCartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-amber-400 text-emerald-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                        {totalCartCount}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:flex flex-col text-left text-xs leading-tight">
                    <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Bag</span>
                    <span className="font-bold text-amber-300">₹{cartSubtotal}</span>
                  </div>
                </button>

                {/* Mobile menu hamburger toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="xl:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
                  aria-label="Toggle Navigation Menu"
                >
                  <div className="w-5 h-4 flex flex-col justify-between">
                    <span className={`block h-0.5 bg-current transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <span className={`block h-0.5 bg-current transition duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-0.5 bg-current transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Complete Blueprint Links */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
            {/* Mobile Search Input directly inside drawer */}
            <div className="pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search 40+ Gomay products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="flex flex-col space-y-1 font-medium text-stone-700 text-sm">
              <button 
                onClick={() => navigateToPage('home')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'home' ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-emerald-50'}`}
              >
                <span>Home</span>
                {currentPage === 'home' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>
              <button 
                onClick={() => navigateToPage('about')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'about' ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-emerald-50'}`}
              >
                <span>About Us (Our Story & Vision)</span>
                {currentPage === 'about' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>
              <button 
                onClick={() => navigateToPage('products')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'products' ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-emerald-50 font-semibold text-emerald-900'}`}
              >
                <span>Our Products (40+ Range)</span>
                {currentPage === 'products' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>
              <button 
                onClick={() => navigateToPage('gifting')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'gifting' ? 'bg-amber-100 text-amber-950 font-bold' : 'hover:bg-amber-50 text-amber-800 font-semibold'}`}
              >
                <span>Sustainable Gifting & Corporate</span>
                {currentPage === 'gifting' && <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />}
              </button>
              <button 
                onClick={() => navigateToPage('impact')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'impact' ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-emerald-50'}`}
              >
                <span>Our Impact & 2021 Timeline</span>
                {currentPage === 'impact' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>
              <button 
                onClick={() => navigateToPage('international')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'international' ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-emerald-50'}`}
              >
                <span>International Collaborations</span>
                {currentPage === 'international' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>
              <button 
                onClick={() => navigateToPage('gallery')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'gallery' ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-emerald-50'}`}
              >
                <span>Experience Gallery</span>
                {currentPage === 'gallery' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>
              <button 
                onClick={() => navigateToPage('journal')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'journal' ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-emerald-50'}`}
              >
                <span>Giridhan Journal (Blog)</span>
                {currentPage === 'journal' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>
              <button 
                onClick={() => navigateToPage('contact')} 
                className={`text-left py-2 px-3 rounded-lg flex items-center justify-between ${currentPage === 'contact' ? 'bg-emerald-100 text-emerald-950 font-bold' : 'hover:bg-emerald-50'}`}
              >
                <span>Contact Us</span>
                {currentPage === 'contact' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />}
              </button>
            </div>
            <div className="pt-3 border-t border-stone-100 flex gap-2">
              <button
                onClick={() => openPartnerModal('corporate')}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs rounded-lg text-center"
              >
                Corporate Gifting
              </button>
              <a
                href="https://wa.me/917559228525"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg text-center flex items-center justify-center space-x-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Helpline</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MULTI-PAGE APPLICATION VIEW CONTAINER WITH DYNAMIC PAGE TRANSITIONS */}
      <main key={currentPage} className="flex-1 animate-pageEnter min-h-[75vh]">
        
        {/* ===================================================
            PAGE 1: HOME (#home)
            =================================================== */}
        {currentPage === 'home' && (
          <div className="space-y-0">
            {/* HERO BANNER - NATURE’S GIFT, SUSTAINABLE FUTURE */}
            <section id="home" className="relative bg-stone-900 overflow-hidden min-h-[520px] lg:min-h-[620px] flex items-center">
              {/* Background Image Carousel Slider */}
              <div className="absolute inset-0 z-0">
                <img
                  src="hea1.jpeg"
                  alt="Giridhan Organics Goshala Farm"
                  className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[8000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/40" />
              </div>

              {/* Decorative AI Vedic Mandala Accent in Hero */}
              <div className="absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 w-72 lg:w-96 h-72 lg:h-96 pointer-events-none opacity-20 hidden md:block animate-spinSlow">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-400">
                  <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                  <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="100" r="25" stroke="currentColor" strokeWidth="1.5" />
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
                    <line key={angle} x1="100" y1="8" x2="100" y2="192" stroke="currentColor" strokeWidth="0.8" transform={`rotate(${angle} 100 100)`} />
                  ))}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                    <polygon key={angle} points="100,15 107,40 100,50 93,40" fill="currentColor" opacity="0.3" transform={`rotate(${angle} 100 100)`} />
                  ))}
                </svg>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
                <div className="max-w-2xl space-y-6">
                  
                  <div className="inline-flex items-center space-x-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>Goshala | Farm • Bhokardan, Jalna</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    Go Green with Giridhan – <span className="text-amber-400 font-serif italic">Nature’s Gift, Sustainable Future</span>
                  </h1>

                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                    Giridhan Organics is an initiative rooted in <strong className="text-white">Goseva, sustainable living and rural empowerment</strong>. We transform naturally sourced cow-based materials into thoughtfully crafted products that connect Indian heritage with modern sustainable lifestyles.
                  </p>

                  <p className="text-amber-200/80 text-xs sm:text-sm italic border-l-2 border-amber-400 pl-3">
                    "From traditional wellness products to eco-friendly lifestyle and gifting products, Giridhan brings the goodness of nature into everyday life."
                  </p>

                  {/* User Requested Key CTAs */}
                  <div className="flex flex-wrap gap-3.5 pt-2">
                    <button
                      onClick={() => navigateToPage('about')}
                      className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-xs sm:text-sm rounded-full shadow-xl transition-all transform hover:-translate-y-0.5 animate-shimmer"
                    >
                      Explore Giridhan
                    </button>
                    <button
                      onClick={() => navigateToPage('products')}
                      className="px-6 py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg transition-all flex items-center space-x-1.5"
                    >
                      <span>Discover Our Products</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openPartnerModal('partner')}
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-xs sm:text-sm rounded-full transition-all flex items-center space-x-1.5"
                    >
                      <Handshake className="w-4 h-4 text-amber-300" />
                      <span>Partner With Us</span>
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* ═══ TRUST BADGES STRIP — inspired by gircowcare.org ═══ */}
            <section className="bg-white border-b border-stone-200/80 py-4 sm:py-5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                  {[
                    { icon: '🐄', title: 'Made at Goshala', desc: 'Bhokardan, Jalna • Since 2021' },
                    { icon: '🌿', title: 'Zero Chemicals', desc: '100% Natural & Pure' },
                    { icon: '📦', title: 'Eco Packaging', desc: 'Jute & Biodegradable' },
                    { icon: '🤝', title: 'Direct from Farm', desc: 'No Middlemen · Fast Dispatch' }
                  ].map((badge, i) => (
                    <div key={i} className="trust-badge flex items-center space-x-3 bg-stone-50 px-4 py-3 rounded-xl border border-stone-200/70">
                      <span className="text-2xl flex-shrink-0">{badge.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">{badge.title}</p>
                        <p className="text-[10px] text-stone-500 leading-tight truncate">{badge.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══ FEATURED PRODUCT CATEGORIES — inspired by gircowcare.org category grid ═══ */}
            <section className="py-14 sm:py-16 bg-[#FFFDF7] border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-100 border border-amber-200">
                    🛒 Shop by Category
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 mt-3">
                    Explore Our Sacred Collections
                  </h2>
                  <p className="text-stone-500 text-sm mt-1.5 max-w-xl mx-auto">
                    Thoughtfully crafted from indigenous cow resources, rooted in tradition and Vedic wisdom.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {[
                    { name: 'Gomay & Spiritual', emoji: '🪔', color: 'from-amber-50 to-amber-100', border: 'border-amber-300', text: 'text-amber-900', count: ALL_PRODUCTS.filter(p=>p.category==='Gomay & Spiritual').length, bg: 'bg-amber-50' },
                    { name: 'Wellness & Ayurveda', emoji: '🌿', color: 'from-emerald-50 to-emerald-100', border: 'border-emerald-300', text: 'text-emerald-900', count: ALL_PRODUCTS.filter(p=>p.category==='Wellness & Ayurveda').length, bg: 'bg-emerald-50' },
                    { name: 'Organic Farming', emoji: '🌾', color: 'from-green-50 to-green-100', border: 'border-green-300', text: 'text-green-900', count: ALL_PRODUCTS.filter(p=>p.category==='Organic Farming').length, bg: 'bg-green-50' },
                    { name: 'Eco Home & Lifestyle', emoji: '🏡', color: 'from-stone-100 to-stone-200', border: 'border-stone-300', text: 'text-stone-800', count: ALL_PRODUCTS.filter(p=>p.category==='Eco Home & Lifestyle').length, bg: 'bg-stone-100' },
                    { name: 'Gift Hampers', emoji: '🎁', color: 'from-rose-50 to-rose-100', border: 'border-rose-300', text: 'text-rose-900', count: ALL_PRODUCTS.filter(p=>p.category==='Gift Hampers').length, bg: 'bg-rose-50' },
                    { name: 'All Products', emoji: '✨', color: 'from-violet-50 to-violet-100', border: 'border-violet-300', text: 'text-violet-900', count: ALL_PRODUCTS.length, bg: 'bg-violet-50' },
                  ].map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (cat.name === 'All Products') {
                          navigateToPage('products');
                          setSelectedCategory('All');
                        } else {
                          navigateToPage('products');
                          setSelectedCategory(cat.name);
                        }
                      }}
                      className={`category-tile group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border bg-gradient-to-b ${cat.color} ${cat.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                    >
                      <span className="text-3xl sm:text-4xl mb-2.5 group-hover:scale-110 transition-transform duration-300 block">
                        {cat.emoji}
                      </span>
                      <span className={`font-bold text-[11px] sm:text-xs leading-tight ${cat.text}`}>
                        {cat.name}
                      </span>
                      <span className={`mt-1.5 text-[10px] ${cat.bg} ${cat.text} border ${cat.border} px-2 py-0.5 rounded-full font-semibold`}>
                        {cat.count} items
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* WHY GIRIDHAN? (5 PILLARS) */}
            <section className="py-16 bg-white border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                    🌏 Why Giridhan?
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-3">
                    More Than a Product. It's a Purpose.
                  </h2>
                  <p className="text-stone-500 text-xs sm:text-sm mt-2">
                    When you choose Giridhan, you embrace a lifestyle rooted in nature, heritage, and genuine human impact.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                  {/* 1. Sustainable */}
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">🌿 Sustainable</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Encouraging natural, chemical-free, and environmentally responsible alternatives for conscious homes.
                    </p>
                  </div>

                  {/* 2. Rooted in Goseva */}
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6 fill-amber-700" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">🐄 Rooted in Goseva</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Our work is inspired by the traditional sacred Indian relationship with Gomata and ethical care.
                    </p>
                  </div>

                  {/* 3. Rural Empowerment */}
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">👩‍🌾 Rural Empowerment</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Creating sustainable livelihood opportunities for rural farming families and skilled women artisans.
                    </p>
                  </div>

                  {/* 4. Indian Heritage */}
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">🇮🇳 Indian Heritage</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Bringing traditional Vedic knowledge, wisdom, and artisanal craftsmanship into contemporary daily products.
                    </p>
                  </div>

                  {/* 5. Handmade with Care */}
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-base text-stone-900 mb-1.5">🤲 Handmade with Care</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Every piece is meticulously crafted with attention to detail, sacred purpose, and uncompromised authenticity.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* FEATURED BESTSELLERS SPOTLIGHT */}
            <section className="py-20 bg-stone-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      ⭐ Featured Bestsellers
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
                      Sacred Offerings for Your Home
                    </h2>
                    <p className="text-stone-500 text-sm mt-1">
                      Handcrafted with pure indigenous cow gomay and natural ayurvedic herbs.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateToPage('products')}
                    className="inline-flex items-center space-x-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 group"
                  >
                    <span>View All 40+ Products</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* 8 Handpicked Showcase Products */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
                  {ALL_PRODUCTS.slice(0, 8).map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => addToCart(product)}
                      onQuickView={() => setQuickViewProduct(product)}
                      isWishlisted={isWishlisted(product.id)}
                      onToggleWishlist={() => toggleWishlist(product)}
                    />
                  ))}
                </div>

                {/* Explore Full Catalog Banner Card */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 text-white p-8 sm:p-12 shadow-xl border border-emerald-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl text-center md:text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                      40+ Handcrafted Gomay Range
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Looking for Diyas, Fertilizers, or Decor?
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm">
                      Explore our complete catalog sorted by categories with detailed specifications, dimensions, and customer reviews.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateToPage('products')}
                    className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-extrabold text-sm rounded-full shadow-2xl transition-all transform hover:scale-105 whitespace-nowrap"
                  >
                    Explore Complete Catalog →
                  </button>
                </div>
              </div>
            </section>

            {/* SUSTAINABLE GIFTING SPOTLIGHT BANNER */}
            <section className="py-16 bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50 border-y border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                      🎁 Sustainable Gifting
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900">
                      Give a Gift That Tells an Indian Story
                    </h2>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                      Custom engraved corporate hampers, wedding gifts, and festive boxes crafted from pure cow dung and eco-friendly jute packaging. Zero plastic, 100% biodegradable, and supporting rural women artisans.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => navigateToPage('gifting')}
                        className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center space-x-2"
                      >
                        <span>Explore Corporate & Festive Gifting →</span>
                      </button>
                      <button
                        onClick={() => openPartnerModal('corporate')}
                        className="px-6 py-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all"
                      >
                        Request Sample Hamper Box
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-md space-y-3 text-center">
                    <div className="p-3 bg-amber-100 text-amber-800 rounded-full w-fit mx-auto">
                      <Gift className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">Custom Corporate Branding</h4>
                    <p className="text-xs text-stone-500">Laser engrave your company insignia on pen stands, diaries, and gift cards.</p>
                    <div className="text-xs font-bold text-emerald-800 pt-1">Direct Dispatch Across India & Abroad</div>
                  </div>
                </div>
              </div>
            </section>

            {/* IMPACT SNAPSHOT */}
            <section className="py-16 bg-stone-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                      💚 Circular Sustainability
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-white mt-2">
                      The Giridhan Sustainable Cycle
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateToPage('impact')}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                  >
                    <span>Read Full Impact Story & Timeline →</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center">
                    <span className="text-amber-400 font-bold text-lg font-serif">1. Goseva</span>
                    <p className="text-[11px] text-stone-400 mt-1">Ethical lifetime care of 75+ desi cows</p>
                  </div>
                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center">
                    <span className="text-emerald-400 font-bold text-lg font-serif">2. Livelihood</span>
                    <p className="text-[11px] text-stone-400 mt-1">Fair wages for rural women artisans</p>
                  </div>
                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center">
                    <span className="text-amber-400 font-bold text-lg font-serif">3. Wisdom</span>
                    <p className="text-[11px] text-stone-400 mt-1">Preserving Vedic recipes & craftsmanship</p>
                  </div>
                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center">
                    <span className="text-emerald-400 font-bold text-lg font-serif">4. Zero Waste</span>
                    <p className="text-[11px] text-stone-400 mt-1">100% Biodegradable eco creations</p>
                  </div>
                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center col-span-2 sm:col-span-1">
                    <span className="text-amber-400 font-bold text-lg font-serif">5. Earth Care</span>
                    <p className="text-[11px] text-stone-400 mt-1">Replenishing Mother Earth naturally</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FROM GIRIDHAN JOURNAL TEASER */}
            <section className="py-16 bg-white border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      📰 Giridhan Journal
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-stone-900 mt-2">
                      Vedic Wisdom & Sustainable Living
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateToPage('journal')}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1"
                  >
                    <span>Read All Articles →</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {JOURNAL_STORIES.map(story => (
                    <div
                      key={story.id}
                      onClick={() => setSelectedJournalStory(story)}
                      className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">{story.category}</span>
                        <h3 className="font-serif font-bold text-base text-stone-900 hover:text-emerald-800 transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-xs text-stone-600 line-clamp-2">{story.excerpt}</p>
                      </div>
                      <div className="pt-4 mt-2 border-t border-stone-200/60 flex items-center justify-between text-xs font-bold text-emerald-800">
                        <span>Read Story →</span>
                        <span className="text-stone-400 font-normal text-[11px]">{story.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FARM VISIT & DIRECT CONNECT TEASER */}
            <section className="py-16 bg-stone-900 text-white relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-stone-800 to-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-700 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 max-w-xl text-center md:text-left">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Goshala Sanctuary Darshan
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Visit Giridhan Goshala in Jalna
                    </h3>
                    <p className="text-stone-400 text-xs sm:text-sm">
                      Dhawda, Bhokardan Taluka, Dist. Jalna (Maharashtra). We warmly welcome families, schools, and conscious organisations for Goseva Darshan.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <a
                      href="https://wa.me/917559228525?text=Hello%20Giridhan,%20I%20would%20like%20to%20schedule%20a%20visit%20to%20your%20Goshala%20Sanctuary."
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Schedule Farm Visit</span>
                    </a>
                    <button
                      onClick={() => navigateToPage('contact')}
                      className="px-6 py-3.5 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Contact Information
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===================================================
            PAGE 2: ABOUT US (#about)
            =================================================== */}
        {currentPage === 'about' && (
          <div className="space-y-16 pb-20">
            <PageHeader
              title="About Giridhan Organics"
              breadcrumb="About Us"
              tag="Heritage & Foundation Since 2021"
              subtitle="An initiative rooted in Goseva, sustainable living and rural empowerment. We transform naturally sourced cow-based materials into thoughtfully crafted products that connect Indian heritage with modern sustainable lifestyles."
              stats={['Established 2021', '75+ Indigenous Gir & Sahiwal Cows', '100% Ahimsa Ethic', 'Bhokardan, Jalna Sanctuary']}
              icon={Heart}
              navigateToPage={navigateToPage}
              actionBtn={
                <button
                  onClick={() => navigateToPage('products')}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 rounded-xl text-xs font-extrabold shadow-lg transition-all"
                >
                  Discover Our Products →
                </button>
              }
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              {/* OUR STORY: From Goseva to Sustainable Living */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-sm">
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center space-x-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                    <Heart className="w-4 h-4 fill-amber-700" />
                    <span>🐄 OUR STORY</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
                    From Goseva to Sustainable Living
                  </h2>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    Giridhan's journey began with a simple belief — <strong>Goseva can create a positive impact on people, animals, farmers and the environment.</strong>
                  </p>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                    Since 2021, Giridhan has been working towards creating meaningful value from indigenous cow resources while supporting a more sustainable rural ecosystem.
                  </p>
                  
                  {/* Pillars list */}
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/70">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">Our Work Brings Together:</h4>
                    <div className="flex flex-wrap gap-2 text-xs font-bold text-emerald-950">
                      <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-emerald-100">Goseva</span>
                      <span>•</span>
                      <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-emerald-100">Sustainability</span>
                      <span>•</span>
                      <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-emerald-100">Traditional Knowledge</span>
                      <span>•</span>
                      <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-emerald-100">Rural Livelihood</span>
                      <span>•</span>
                      <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-emerald-100">Natural Products</span>
                    </div>
                  </div>

                  <p className="text-stone-700 text-sm font-medium">
                    Today, Giridhan offers a diverse range of <strong>40+ Gomay and cow-based products</strong>, created with care, purpose and respect for Indian traditions.
                  </p>
                </div>

                <div className="lg:col-span-5 relative">
                  <img
                    src="hea2.jpeg"
                    alt="Goseva Sanctuary"
                    className="rounded-2xl shadow-xl object-cover w-full h-72 sm:h-96"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-amber-400 text-stone-950 text-xs font-extrabold px-4 py-2 rounded-xl shadow-lg">
                    Sanctuary Since 2021
                  </div>
                </div>
              </div>

              {/* VISION & MISSION SPLIT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vision */}
                <div className="bg-gradient-to-br from-emerald-950 to-stone-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between border border-emerald-900">
                  <div className="space-y-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                      🌱 OUR VISION
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                      Reviving Tradition. Creating Sustainable Futures.
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      We envision a future where traditional Indian knowledge and modern sustainable practices come together to create opportunities for rural communities while encouraging environmentally responsible lifestyles.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <blockquote className="font-serif italic text-amber-200 text-base">
                      "Our vision is to make sustainability a part of everyday living."
                    </blockquote>
                  </div>
                </div>

                {/* Mission */}
                <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-stone-200 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      🌾 OUR MISSION
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      Committed to Gau, Gram and Prakriti
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Promote sustainable and natural alternatives</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Create meaningful value from indigenous cow resources</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Support rural livelihoods and women artisans</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Preserve traditional Indian knowledge and craftsmanship</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>Encourage responsible consumption</span>
                      </li>
                      <li className="flex items-center space-x-2 font-bold text-emerald-900">
                        <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        <span>Build a stronger connection between Gau, Gram and Prakriti</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => navigateToPage('products')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1"
                    >
                      <span>Explore products fulfilling this mission</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* INDIGENOUS COWS: Celebrating India's Indigenous Cow Heritage */}
              <div className="bg-amber-50/80 rounded-3xl p-8 sm:p-12 border border-amber-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-200/70 px-3 py-1 rounded-full">
                      🐄 INDIGENOUS COWS
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      Celebrating India's Indigenous Cow Heritage
                    </h3>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      India is home to a rich diversity of indigenous cattle breeds. Giridhan believes in respecting and preserving this heritage while creating sustainable opportunities around the rural ecosystem.
                    </p>
                    <p className="text-stone-700 text-sm leading-relaxed">
                      Our initiatives are inspired by the sacred relationship between <strong className="text-stone-900">Gomata, agriculture, rural communities and nature</strong>.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <span className="text-xs font-bold text-stone-800 bg-white px-3.5 py-1.5 rounded-full border border-amber-300 shadow-sm">
                        75+ Rescued Desi Cows Cared
                      </span>
                      <span className="text-xs font-bold text-stone-800 bg-white px-3.5 py-1.5 rounded-full border border-amber-300 shadow-sm">
                        100% Ahimsa Ethic
                      </span>
                      <span className="text-xs font-bold text-stone-800 bg-white px-3.5 py-1.5 rounded-full border border-amber-300 shadow-sm">
                        Non-Exploitative Care
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 text-center">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-amber-200">
                      <div className="text-4xl font-extrabold text-amber-600 font-serif mb-1">75+</div>
                      <div className="text-xs font-bold text-stone-800 uppercase tracking-wider">Indigenous Cows</div>
                      <p className="text-[11px] text-stone-500 mt-2">
                        Lush sanctuary at Dhawda, Bhokardan Taluka, Dist. Jalna (Maharashtra)
                      </p>
                      <a
                        href="https://wa.me/917559228525?text=Hello%20Giridhan,%20I%20would%20like%20to%20visit%20your%20Goshala%20in%20Jalna."
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Schedule Goshala Visit
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ===================================================
            PAGE 3: OUR PRODUCTS (#products)
            =================================================== */}
        {currentPage === 'products' && (
          <div className="space-y-10 pb-20">
            <PageHeader
              title="Our Sacred & Organic Collection"
              breadcrumb="Our Products"
              tag="40+ Handcrafted Gomay Range"
              subtitle="Discover our growing range of Giridhan products designed for wellness, spirituality, lifestyle, gifting and sustainable living. Natural, Traditional, and Thoughtfully Crafted."
              stats={['100% Pure Desi Gomay', 'No Chemicals or Charcoal', 'Direct Farm Dispatch', 'Eco-Friendly Jute Packaging']}
              icon={Leaf}
              navigateToPage={navigateToPage}
              actionBtn={
                <button
                  onClick={() => openPartnerModal('corporate')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Corporate Hampers</span>
                </button>
              }
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {/* Product Category Filter Pills Bar */}
              <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-2 gap-2 no-scrollbar">
                {CATEGORIES.map(cat => {
                  const count =
                    cat === 'All'
                      ? ALL_PRODUCTS.length
                      : cat === 'Bestsellers'
                      ? ALL_PRODUCTS.filter(p => p.badge?.includes('Bestseller') || p.rating >= 4.9).length
                      : ALL_PRODUCTS.filter(p => p.category === cat).length;

                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center space-x-2 ${
                        isSelected
                          ? 'bg-emerald-900 text-amber-300 shadow-md transform scale-105'
                          : 'bg-white text-stone-700 hover:bg-stone-200/70 border border-stone-300/80'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-emerald-800 text-amber-200' : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search, Sort, and Catalog Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-medium">
                  Showing <span className="font-bold text-stone-800">{filteredProducts.length}</span> authentic creations
                  {selectedCategory !== 'All' && <span> in <strong className="text-emerald-800">{selectedCategory}</strong></span>}
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <div className="flex items-center space-x-2 text-xs text-stone-600">
                    <Filter className="w-3.5 h-3.5 text-stone-500" />
                    <span className="font-semibold">Sort by:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium text-stone-700"
                  >
                    <option value="featured">Featured & Curated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rating</option>
                    <option value="name">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Product Grid - 2 columns on mobile, 3 on tablet, 4 on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                    onQuickView={() => setQuickViewProduct(product)}
                    isWishlisted={isWishlisted(product.id)}
                    onToggleWishlist={() => toggleWishlist(product)}
                  />
                ))}
              </div>

              {/* Bulk & Temple Orders Banner */}
              <div className="mt-12 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-stone-900 text-lg">Need Custom Bulk Sourcing or Temple Orders?</h4>
                  <p className="text-stone-600 text-xs sm:text-sm">We provide wholesale rates for temples, yoga centers, and eco-retailers.</p>
                </div>
                <button
                  onClick={() => openPartnerModal('partner')}
                  className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Wholesale Enquiry →
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ===================================================
            PAGE 4: SUSTAINABLE GIFTING (#gifting)
            =================================================== */}
        {currentPage === 'gifting' && (
          <div className="space-y-16 pb-20">
            <PageHeader
              title="Sustainable Gifting by Giridhan"
              breadcrumb="Sustainable Gifting"
              tag="Corporate, Festive & Wedding Hampers"
              subtitle="Give a gift that creates an impact. Combining Indian heritage, craftsmanship, zero-plastic packaging, and rural empowerment."
              stats={['100% Biodegradable Packaging', 'Custom Corporate Laser Engraving', 'Pan-India & Global Express Dispatch', 'Artisan Storycards Included']}
              icon={Gift}
              navigateToPage={navigateToPage}
              actionBtn={
                <button
                  onClick={() => openPartnerModal('corporate')}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 text-stone-950 rounded-xl text-xs font-extrabold shadow-lg transition-all"
                >
                  Request Corporate Quote →
                </button>
              }
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-amber-400 text-stone-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-sm">
                    <Gift className="w-3.5 h-3.5" />
                    <span>🎁 SUSTAINABLE GIFTING</span>
                  </div>
                  
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-tight">
                    Give a Gift That Creates an Impact
                  </h2>

                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                    Looking for something meaningful beyond conventional corporate gifts? Giridhan offers eco-conscious gifting solutions that combine <strong>Indian heritage, craftsmanship and sustainability</strong>.
                  </p>

                  {/* Use Cases Tags from user blueprint */}
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-stone-800">Perfect For:</h4>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-stone-700">
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm">Corporate Gifting</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm">Festivals & Celebrations</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm">Wedding & Event Gifting</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm">Employee Gifts</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm">International Delegations</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm">Sustainable Brand Gifting</span>
                      <span className="bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm font-bold text-emerald-800">Custom & Bulk Orders</span>
                    </div>
                  </div>

                  {/* Poetic quote */}
                  <div className="p-4 bg-white/80 rounded-2xl border-l-4 border-amber-500 shadow-sm">
                    <p className="font-serif italic text-stone-800 text-sm sm:text-base">
                      "Your gift can tell a story. A story of India. A story of sustainability. A story of rural empowerment."
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-4">
                    <button
                      onClick={() => openPartnerModal('corporate')}
                      className="px-6 py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-950 text-amber-300 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:from-emerald-900 transition-all flex items-center space-x-2"
                    >
                      <span>Enquire for Corporate Gifting →</span>
                    </button>
                    <a
                      href="https://wa.me/917559228525?text=Hello%20Giridhan,%20I%20am%20interested%20in%20custom%20corporate%20gifting%20samples."
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Request Custom Gift Box Sample</span>
                    </a>
                  </div>
                </div>

                {/* Visual Gifting Showcase Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 space-y-6">
                    <h3 className="font-serif font-bold text-xl text-stone-900 border-b pb-3">
                      Customization & Branding Features
                    </h3>
                    
                    <div className="space-y-4 text-xs text-stone-600">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900">Custom Corporate Laser Engraving / Logo</h4>
                          <p className="mt-0.5">Brand your company emblem or conference insignia on pen stands and card holders.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                          <Gift className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900">Eco-Friendly Jute & Handmade Paper Packaging</h4>
                          <p className="mt-0.5">Zero plastic packaging with artisan storycards highlighting the rural artisan who made it.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900">Pan-India & Global Express Shipping</h4>
                          <p className="mt-0.5">Direct dispatch to individual employee addresses or unified bulk office deliveries.</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center">
                      <span className="text-[11px] text-stone-500 font-medium">Have an upcoming festival or conference?</span>
                      <div className="text-sm font-bold text-emerald-950 mt-1">Talk to our Gifting Lead: +91 75592 28525</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ===================================================
            PAGE 5: OUR IMPACT (#impact)
            =================================================== */}
        {currentPage === 'impact' && (
          <div className="space-y-16 pb-20">
            <PageHeader
              title="Our Sustainable Impact & Goseva Cycle"
              breadcrumb="Our Impact"
              tag="People • Animals • Farmers • Environment"
              subtitle="Every product has a bigger story. We believe that business can be a force for environmental responsibility, social impact and cultural preservation."
              stats={['75+ Rescued Desi Cows Cared', '40+ Rural Families Supported', '100% Circular Waste-Free', 'Zero Toxic Chemicals']}
              icon={Sparkles}
              navigateToPage={navigateToPage}
              actionBtn={
                <button
                  onClick={() => navigateToPage('products')}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  Support Our Artisans →
                </button>
              }
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              {/* The 5-Stage Ecosystem Diagram */}
              <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl">
                <h3 className="text-xs uppercase tracking-widest font-bold text-amber-400 text-center mb-8">
                  The Giridhan Sustainable Cycle
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-sm mb-3">
                      1
                    </div>
                    <h4 className="font-serif font-bold text-sm text-white">Goseva</h4>
                    <p className="text-[11px] text-stone-400 mt-1">Ethical lifetime care of indigenous cows</p>
                  </div>

                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-400 text-stone-950 flex items-center justify-center font-bold text-sm mb-3">
                      2
                    </div>
                    <h4 className="font-serif font-bold text-sm text-white">Rural Livelihood</h4>
                    <p className="text-[11px] text-stone-400 mt-1">Dignified jobs for village farmers & women</p>
                  </div>

                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-sm mb-3">
                      3
                    </div>
                    <h4 className="font-serif font-bold text-sm text-white">Traditional Knowledge</h4>
                    <p className="text-[11px] text-stone-400 mt-1">Reviving Vedic recipes & craft heritage</p>
                  </div>

                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-400 text-stone-950 flex items-center justify-center font-bold text-sm mb-3">
                      4
                    </div>
                    <h4 className="font-serif font-bold text-sm text-white">Sustainable Products</h4>
                    <p className="text-[11px] text-stone-400 mt-1">Zero chemical eco-friendly creations</p>
                  </div>

                  <div className="p-4 bg-stone-800/90 rounded-2xl border border-stone-700 text-center flex flex-col items-center col-span-2 sm:col-span-1">
                    <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-sm mb-3">
                      5
                    </div>
                    <h4 className="font-serif font-bold text-sm text-white">Conscious Consumption</h4>
                    <p className="text-[11px] text-stone-400 mt-1">Healthier homes & pollution-free earth</p>
                  </div>
                </div>
              </div>

              {/* 📖 OUR JOURNEY: 2021 → Today */}
              <div className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-stone-200">
                <div className="text-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-600">📖 OUR JOURNEY</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">2021 → Today</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                    <span className="text-amber-600 font-serif font-black text-xl">2021</span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">Foundation</h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Giridhan begins its Goseva journey with sacred cows in Maharashtra.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                    <span className="text-emerald-700 font-serif font-black text-xl">Growing</span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">R&D & Crafting</h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Development of cow-based and sustainable products.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                    <span className="text-amber-600 font-serif font-black text-xl">40+ Products</span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">Wide Expansion</h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Expanding into wellness, spiritual, agricultural, lifestyle and gifting categories.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                    <span className="text-emerald-700 font-serif font-black text-xl">Women Power</span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">Rural Livelihood</h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Creating opportunities through handmade and value-added products.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                    <span className="text-amber-600 font-serif font-black text-xl">Beyond India</span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">Global Vision</h4>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                      Exploring international markets and sustainability partnerships.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ===================================================
            PAGE 6: INTERNATIONAL (#international)
            =================================================== */}
        {currentPage === 'international' && (
          <div className="space-y-16 pb-20">
            <PageHeader
              title="Giridhan Global Collaborations"
              breadcrumb="International"
              tag="Taking Indian Sustainable Craft Worldwide"
              subtitle="Connecting Indian heritage with global sustainable living. Introducing India's traditional cow-based craftsmanship and sustainable creations to conscious consumers and businesses across the world."
              stats={['Phyto-Sanitary Compliance', 'International Air & Sea Cargo Ready', 'Eco-Friendly Export Packaging', 'Wholesale & Custom Tiers']}
              icon={Globe}
              navigateToPage={navigateToPage}
              actionBtn={
                <button
                  onClick={() => openPartnerModal('international')}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 text-stone-950 rounded-xl text-xs font-extrabold shadow-lg transition-all"
                >
                  Become a Global Partner →
                </button>
              }
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* GIRIDHAN FOR THE WORLD */}
                <div className="bg-stone-50 p-8 sm:p-10 rounded-3xl border border-stone-200 space-y-5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      🌏 GIRIDHAN FOR THE WORLD
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-3">
                      Taking Indian Sustainable Craft Beyond Borders
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mt-3">
                      Giridhan aims to introduce India's traditional cow-based craftsmanship and sustainable products to conscious consumers and businesses across the world.
                    </p>
                    <div className="mt-4 pt-4 border-t border-stone-200">
                      <h4 className="text-xs uppercase font-bold text-stone-800 mb-2">We are open to collaborations with:</h4>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-stone-700">
                        <span className="bg-white px-2.5 py-1 rounded-lg border">Retailers</span>
                        <span className="bg-white px-2.5 py-1 rounded-lg border">Gift Stores</span>
                        <span className="bg-white px-2.5 py-1 rounded-lg border">Indian Communities</span>
                        <span className="bg-white px-2.5 py-1 rounded-lg border">Sustainability Organisations</span>
                        <span className="bg-white px-2.5 py-1 rounded-lg border">Corporates</span>
                        <span className="bg-white px-2.5 py-1 rounded-lg border">Hotels</span>
                        <span className="bg-white px-2.5 py-1 rounded-lg border">Distributors</span>
                        <span className="bg-white px-2.5 py-1 rounded-lg border">International Partners</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => openPartnerModal('international')}
                      className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 rounded-xl text-xs font-bold transition-all flex items-center space-x-2"
                    >
                      <span>Become a Giridhan Partner →</span>
                    </button>
                  </div>
                </div>

                {/* PARTNER WITH GIRIDHAN */}
                <div className="bg-gradient-to-br from-emerald-950 to-stone-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                      🤝 PARTNER WITH GIRIDHAN
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
                      Let's Build Something Meaningful Together
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed mt-3">
                      Are you a retailer, distributor, corporate, gifting company or sustainability-focused organisation? We would love to explore opportunities to bring Giridhan products to new communities and markets.
                    </p>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <h4 className="text-xs uppercase font-bold text-amber-300 mb-2">Partnership Opportunities:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-stone-200">
                        <div className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>Retail & Distribution</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>Corporate Gifting</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>International Collaborations</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>Sustainable Partnerships</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>Custom Products</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>Bulk Orders</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => openPartnerModal('partner')}
                      className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 rounded-xl text-xs font-extrabold transition-all flex items-center space-x-2"
                    >
                      <span>Connect With Us →</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            PAGE 7: GALLERY (#gallery)
            =================================================== */}
        {currentPage === 'gallery' && (
          <div className="space-y-10 pb-20">
            <PageHeader
              title="The Giridhan Experience Gallery"
              breadcrumb="Experience Gallery"
              tag="Visual Journey Through Gau, Gram & Prakriti"
              subtitle="Witness our goshala sanctuary, indigenous cows, handmade crafting processes, rural women artisans, and eco packaging in action."
              stats={['Dhawda Goshala Sanctuary', 'Pure Cow Dung Processing', 'Handmade Moulding', 'Plastic-Free Packaging']}
              icon={Compass}
              navigateToPage={navigateToPage}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Gallery Category Filter Pills */}
              <div className="flex items-center justify-center overflow-x-auto pb-2 gap-2 no-scrollbar">
                {['All', 'Goshala', 'Indigenous Cows', 'Product Making', 'Women Artisans', 'Packaging', 'Corporate Gifting'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedGalleryCategory(tag)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedGalleryCategory === tag
                        ? 'bg-stone-900 text-amber-300 shadow-sm'
                        : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {GALLERY_ITEMS
                  .filter(item => selectedGalleryCategory === 'All' || item.category === selectedGalleryCategory)
                  .map((item, idx) => (
                    <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-stone-200">
                      <div className="pt-[75%] relative overflow-hidden bg-stone-200">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h4 className="font-serif font-bold text-xs sm:text-sm mt-1">{item.title}</h4>
                          <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            PAGE 8: JOURNAL BLOG (#journal)
            =================================================== */}
        {currentPage === 'journal' && (
          <div className="space-y-10 pb-20">
            <PageHeader
              title="The Giridhan Journal & Vedic Wisdom"
              breadcrumb="Giridhan Journal"
              tag="Stories of Sustainability, Tradition & Impact"
              subtitle="Explore ancient wisdom, Vedic science, and modern sustainable practices. Learn how Gomay and Goseva heal the body, mind, and soil."
              stats={['Agnihotra Science', 'Organic Gomay Fertilizers', 'Vastu Shastra & Gomay', 'Rural Entrepreneurship']}
              icon={BookOpen}
              navigateToPage={navigateToPage}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {JOURNAL_STORIES.map(story => (
                  <div
                    key={story.id}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-stone-400">
                        <span className="text-emerald-800 font-bold uppercase tracking-wider">{story.category}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{story.readTime}</span>
                        </span>
                      </div>
                      <h3 
                        className="font-serif font-bold text-lg text-stone-900 hover:text-emerald-800 transition-colors leading-snug cursor-pointer" 
                        onClick={() => setSelectedJournalStory(story)}
                      >
                        {story.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-stone-100">
                      <button
                        onClick={() => setSelectedJournalStory(story)}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center space-x-1"
                      >
                        <span>Read Full Story →</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            PAGE 9: CONTACT US (#contact)
            =================================================== */}
        {currentPage === 'contact' && (
          <div className="space-y-12 pb-20">
            <PageHeader
              title="Connect with Giridhan Organics"
              breadcrumb="Contact Us"
              tag="Goshala | Farm • Bhokardan, Jalna"
              subtitle="Whether you are looking for Giridhan products, sustainable gifting solutions, retail opportunities, or scheduling a Goshala Darshan visit, we would love to hear from you."
              stats={['Open All 7 Days', 'Visitor Goseva Darshan', 'Fast WhatsApp Dispatch', 'Direct Farm Helpline']}
              icon={Phone}
              navigateToPage={navigateToPage}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* 3 Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Goshala Address */}
                <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md">
                  <div className="p-3 bg-amber-100 text-amber-800 rounded-xl w-fit mb-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Giridhan Organics</h3>
                  <p className="text-xs text-amber-700 font-bold mb-2">Goshala | Farm</p>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    Dhawda, Bhokardan Taluka, Dist. Jalna (Maharashtra) - 431114, INDIA
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500 font-medium">
                    Welcoming visitors for Goseva Darshan
                  </div>
                </div>

                {/* Call & WhatsApp */}
                <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md">
                  <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl w-fit mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Call & WhatsApp</h3>
                  <p className="text-stone-500 text-xs mb-2">Direct helpline for orders & inquiries:</p>
                  <a 
                    href="tel:+917559228525" 
                    className="text-2xl font-extrabold text-emerald-900 hover:underline block mb-2"
                  >
                    +91 75592 28525
                  </a>
                  <a
                    href="https://wa.me/917559228525"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Instantly on WhatsApp →</span>
                  </a>
                </div>

                {/* Email Desk */}
                <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md">
                  <div className="p-3 bg-amber-100 text-amber-800 rounded-xl w-fit mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 mb-1">Email Desk</h3>
                  <p className="text-stone-500 text-xs mb-2">Official correspondence & bulk RFQs:</p>
                  <a 
                    href="mailto:giridhanorganics@gmail.com" 
                    className="text-sm font-bold text-amber-700 hover:underline block mb-3"
                  >
                    giridhanorganics@gmail.com
                  </a>
                  <button
                    onClick={() => openPartnerModal('partner')}
                    className="mt-2 inline-block text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                  >
                    Open Partner Questionnaire →
                  </button>
                </div>
              </div>

              {/* DIRECT INTERACTIVE ON-PAGE INQUIRY FORM */}
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200 shadow-lg">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      Send a Message
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      Direct Farm Inquiry Form
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm">
                      Fill out your requirements below and receive an immediate response from our Jalna team.
                    </p>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="e.g. Rajesh Patil"
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-stone-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number (WhatsApp) *</label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-stone-50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-stone-50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Area of Inquiry</label>
                        <select
                          value={contactForm.subject}
                          onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-stone-50 font-medium"
                        >
                          <option value="General Inquiry">General Product Inquiry</option>
                          <option value="Bulk Order">Bulk Order / Wholesale</option>
                          <option value="Corporate Gifting">Corporate Gifting Hampers</option>
                          <option value="Goshala Darshan">Schedule Goshala Sanctuary Visit</option>
                          <option value="International Export">International Export & Collaboration</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">Your Message or Requirements *</label>
                      <textarea
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us what you are looking for or any questions you have..."
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 bg-stone-50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-950 hover:from-emerald-900 text-amber-300 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Transmit Message to Goshala WhatsApp Helpline →</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 13. WEBSITE FOOTER & TAGLINE (Exact User Taglines) */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-14 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Main Footer Highlight */}
          <div className="text-center space-y-3 pb-8 border-b border-stone-800">
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Choose Natural. Choose Sustainable. Choose Giridhan.
            </h4>
            <p className="text-sm text-amber-400 font-serif">
              Giridhan Organics | Goshala • Farm
            </p>
            <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold">
              Goseva • Sustainability • Rural Empowerment • Indian Heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center space-x-2">
                <span className="font-serif font-extrabold text-xl text-white">GIRIDHAN</span>
                <span className="font-serif text-amber-400 text-lg">ORGANICS</span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                Transforming naturally sourced cow-based materials into thoughtfully crafted products that connect Indian heritage with modern sustainable lifestyles.
              </p>
            </div>

            <div>
              <h5 className="font-serif font-bold text-white text-sm mb-3">Our Offerings</h5>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setSelectedCategory('Gomay & Spiritual'); scrollToSection('products'); }} className="hover:text-amber-300">Gomay & Spiritual Products</button></li>
                <li><button onClick={() => { setSelectedCategory('Agriculture & Natural'); scrollToSection('products'); }} className="hover:text-amber-300">Agriculture & Natural Products</button></li>
                <li><button onClick={() => { setSelectedCategory('Lifestyle & Gifting'); scrollToSection('products'); }} className="hover:text-amber-300">Sustainable Lifestyle & Gifting</button></li>
                <li><button onClick={() => { setSelectedCategory('Traditional Wellness'); scrollToSection('products'); }} className="hover:text-amber-300">Traditional Wellness & Ark</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif font-bold text-white text-sm mb-3">Explore Giridhan</h5>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-amber-300">Our Story & 2021 Origin</button></li>
                <li><button onClick={() => scrollToSection('gifting')} className="hover:text-amber-300">Corporate Gifting Solutions</button></li>
                <li><button onClick={() => scrollToSection('impact')} className="hover:text-amber-300">Our Rural Impact</button></li>
                <li><button onClick={() => scrollToSection('international')} className="hover:text-amber-300">International Partnerships</button></li>
                <li><button onClick={() => scrollToSection('journal')} className="hover:text-amber-300">Giridhan Journal Stories</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif font-bold text-white text-sm mb-3">Connect With Us</h5>
              <p className="text-xs text-stone-400 mb-2">Dhawda, Bhokardan Dist. Jalna, Maharashtra</p>
              <p className="text-xs font-bold text-white mb-3">📞 +91 75592 28525</p>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/share/19uw6zRjkM/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-stone-800 hover:bg-emerald-700 text-white"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12.001 2.002c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.477-10-10-10zm2.083 4.288h-1.077c-.89 0-1.066.425-1.066 1.05v1.4h2.148l-.3 2.144h-1.848v5.52h-2.285v-5.52h-1.848v-2.144h1.848v-1.76c0-2.02.836-3.266 3.193-3.266h2.152v2.246z"/></svg>
                </a>
                <a
                  href="https://www.instagram.com/giridhan_go?igsh=Mzk4a2xobW4zMXN4"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-stone-800 hover:bg-pink-700 text-white"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.013 4.85.071 1.17.055 1.805.249 2.227.464.551.272.981.678 1.34 1.092.359.413.668.971.84 1.621.168.649.208 1.363.224 4.19.014 2.723-.002 3.093-.072 4.123-.058 1.085-.224 1.866-.465 2.502-.236.609-.59.997-1.002 1.411-.412.414-.852.76-1.464.996-.632.235-1.393.385-2.618.441-1.036.046-1.405.061-4.049.071-2.624-.009-2.992-.023-4.048-.071-1.226-.056-1.987-.206-2.618-.441-.612-.236-1.052-.582-1.464-.996-.412-.414-.766-.802-1.002-1.411-.236-.636-.391-1.417-.465-2.502-.07-1.03-.086-1.399-.072-4.123.016-2.827.056-3.541.224-4.191.172-.65.481-1.209.84-1.621.359-.414.789-.82 1.34-1.092.422-.215 1.058-.409 2.227-.464 1.266-.058 1.646-.071 4.85-.071zm0 2.885c-3.197 0-3.57.012-4.836.071-1.052.053-1.61.22-1.996.402-.423.2-.743.468-1.012.737-.269.269-.537.59-.737 1.012-.182.386-.349.944-.402 1.996-.059 1.266-.071 1.638-.071 4.836 0 3.197.012 3.57.071 4.836.053 1.052.22 1.61.402 1.996.2.423.468.743.737 1.012.269.269.59.537 1.012.737.386.182.944.349 1.996.402 1.266.059 1.638.071 4.836.071 3.197 0 3.57-.012 4.836-.071 1.052-.053 1.61-.22 1.996-.402.423-.2.743-.468 1.012-.737.269-.269.537-.59.737-1.012.182-.386.349-.944.402-1.996.059-1.266.071-1.638.071-4.836 0-3.197-.012-3.57-.071-4.836-.053-1.052-.22-1.61-.402-1.996-.2-.423-.468-.743-.737-1.012-.269-.269-.59-.537-1.012-.737-.386-.182-.944-.349-1.996-.402-1.266-.058-1.638-.07-4.836-.07zm-2.88 1.954c1.83 0 3.315 1.485 3.315 3.315s-1.485 3.315-3.315 3.315-3.315-1.485-3.315-3.315 1.485-3.315 3.315-3.315zm0 2.215c-0 0-0 0-0 0-0 0-0 0-0 0-1.166 0-2.115.949-2.115 2.115s.949 2.115 2.115 2.115c1.166 0 2.115-.949 2.115-2.115s-.949-2.115-2.115-2.115zm5.727-2.909c0-.44-.36-.8-.8-.8s-.8.36-.8.8.36.8.8.8.8-.36.8-.8z"/></svg>
                </a>
                <a
                  href="https://wa.me/917559228525"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
            <p>&copy; {new Date().getFullYear()} Giridhan Organics. Goshala | Farm. All rights reserved.</p>
            <p className="text-amber-400/80">
              Goseva • Sustainability • Rural Empowerment • Indian Heritage
            </p>
          </div>
        </div>
      </footer>

      {/* 14. SLIDE-OVER CART DRAWER */}
      {isCartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQty={updateCartQty}
          onRemove={removeFromCart}
          onClear={clearCart}
          subtotal={cartSubtotal}
          originalSubtotal={cartOriginalSubtotal}
          shippingFee={shippingFee}
          isFreeShipping={isFreeShipping}
          freeShippingThreshold={freeShippingThreshold}
          total={cartTotal}
          totalSavings={totalSavings}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          appliedCoupon={appliedCoupon}
          couponError={couponError}
          onApplyCoupon={handleApplyCoupon}
          onRemoveCoupon={() => {
            setAppliedCoupon(null);
            setCouponCode('');
          }}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {/* 15. WISHLIST MODAL */}
      {isWishlistOpen && (
        <WishlistDrawer
          wishlist={wishlist}
          onClose={() => setIsWishlistOpen(false)}
          onAddToCart={addToCart}
          onRemove={toggleWishlist}
        />
      )}

      {/* 16. PRODUCT QUICK VIEW MODAL */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={qty => {
            addToCart(quickViewProduct, qty);
          }}
          isWishlisted={isWishlisted(quickViewProduct.id)}
          onToggleWishlist={() => toggleWishlist(quickViewProduct)}
          onDirectWhatsApp={qty => {
            const msg = `Hello Giridhan Organics, I want to order ${qty} unit(s) of ${quickViewProduct.name} (₹${quickViewProduct.price * qty}). Please guide me.`;
            window.open(`https://wa.me/917559228525?text=${encodeURIComponent(msg)}`, '_blank');
          }}
        />
      )}

      {/* 17. CHECKOUT & ADDRESS MODAL */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          subtotal={cartSubtotal}
          shippingFee={shippingFee}
          discount={couponDiscount}
          total={cartTotal}
          form={checkoutForm}
          setForm={setCheckoutForm}
          onClose={() => {
            setIsCheckoutOpen(false);
            setOrderConfirmed(false);
          }}
          onSubmit={handleCompleteOrder}
          orderConfirmed={orderConfirmed}
        />
      )}

      {/* 18. PARTNERSHIP / CORPORATE GIFTING MODAL */}
      {isPartnerModalOpen && (
        <PartnerModal
          type={partnerModalType}
          form={partnerForm}
          setForm={setPartnerForm}
          onClose={() => setIsPartnerModalOpen(false)}
          onSubmit={handlePartnerSubmit}
        />
      )}

      {/* 19. JOURNAL ARTICLE READER MODAL */}
      {selectedJournalStory && (
        <JournalReaderModal
          story={selectedJournalStory}
          onClose={() => setSelectedJournalStory(null)}
        />
      )}

      {/* 20. FLOATING WHATSAPP BUTTON — prominent like gircowcare.org */}
      <a
        href="https://wa.me/917559228525?text=Hello%20Giridhan%20Organics,%20I%20have%20an%20inquiry%20regarding%20your%20products."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 sm:bottom-8 right-5 z-50 flex items-center group"
        aria-label="WhatsApp Giridhan Organics"
      >
        {/* Tooltip label — visible on hover, desktop only */}
        <span className="hidden sm:flex mr-2 items-center bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <span>Chat with us 👋</span>
        </span>
        <div className="relative">
          {/* Ripple rings */}
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
          <span className="absolute inset-1 rounded-full bg-green-500 animate-ping opacity-30 animation-delay-150" />
          <div className="relative p-3.5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center border-2 border-white/30">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
        </div>
      </a>


      {/* 21. MOBILE BOTTOM STICKY NAVIGATION BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-2 px-4 sm:px-6 flex justify-between items-center shadow-lg safe-pb">
        <button
          onClick={() => navigateToPage('home')}
          className={`flex flex-col items-center transition-colors ${currentPage === 'home' ? 'text-emerald-800 font-bold' : 'text-stone-500 hover:text-emerald-800'}`}
        >
          <div className={`p-1 rounded-full ${currentPage === 'home' ? 'bg-emerald-100' : ''}`}>
            <Leaf className={`w-4 h-4 ${currentPage === 'home' ? 'text-emerald-800 stroke-[2.5]' : ''}`} />
          </div>
          <span className="text-[10px] font-medium mt-0.5">Home</span>
        </button>
        <button
          onClick={() => navigateToPage('products')}
          className={`flex flex-col items-center transition-colors ${currentPage === 'products' ? 'text-emerald-800 font-bold' : 'text-stone-500 hover:text-emerald-800'}`}
        >
          <div className={`p-1 rounded-full ${currentPage === 'products' ? 'bg-emerald-100' : ''}`}>
            <Search className={`w-4 h-4 ${currentPage === 'products' ? 'text-emerald-800 stroke-[2.5]' : ''}`} />
          </div>
          <span className="text-[10px] font-medium mt-0.5">Products</span>
        </button>
        <button
          onClick={() => navigateToPage('gifting')}
          className={`flex flex-col items-center transition-colors ${currentPage === 'gifting' ? 'text-amber-700 font-bold' : 'text-stone-500 hover:text-amber-700'}`}
        >
          <div className={`p-1 rounded-full ${currentPage === 'gifting' ? 'bg-amber-100' : ''}`}>
            <Gift className={`w-4 h-4 ${currentPage === 'gifting' ? 'text-amber-700 stroke-[2.5]' : 'text-amber-600'}`} />
          </div>
          <span className="text-[10px] font-medium mt-0.5">Gifting</span>
        </button>
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center text-stone-600 hover:text-red-600 relative"
        >
          <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
          <span className="text-[10px] font-medium mt-0.5">Saved</span>
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center text-stone-600 hover:text-emerald-800 relative"
        >
          <ShoppingBag className="w-5 h-5 text-emerald-800" />
          <span className="text-[10px] font-bold text-emerald-900 mt-0.5">Bag</span>
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-amber-500 text-stone-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* 22. TOAST NOTIFICATION CONTAINER */}
      <div className="fixed top-20 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold transform transition-all duration-300 animate-slideIn ${
              toast.type === 'error'
                ? 'bg-red-600 text-white'
                : toast.type === 'info'
                ? 'bg-stone-800 text-white'
                : 'bg-emerald-900 text-amber-200 border border-amber-400/40'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

// --- SUBCOMPONENT: LUXURY PAGE HEADER WITH SACRED VEDIC MANDALA GRAPHICS ---
function PageHeader({ title, subtitle, tag, breadcrumb, icon: Icon, stats = [], navigateToPage, actionBtn }) {
  return (
    <div className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-stone-800">
      {/* Background Sacred Geometric Mandala Graphics */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 pointer-events-none opacity-15 animate-spinSlow">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-400">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="1" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
            <line key={angle} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.8" transform={`rotate(${angle} 100 100)`} />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <polygon key={angle} points="100,20 106,42 100,52 94,42" fill="currentColor" opacity="0.35" transform={`rotate(${angle} 100 100)`} />
          ))}
        </svg>
      </div>

      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulseGlow" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-4">
        {/* Breadcrumb navigation */}
        <div className="flex items-center space-x-2 text-xs text-stone-400">
          <button onClick={() => navigateToPage('home')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Home</span>
          </button>
          <span>/</span>
          <span className="text-amber-300 font-semibold">{breadcrumb}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            {tag && (
              <div className="inline-flex items-center space-x-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase">
                {Icon && <Icon className="w-3.5 h-3.5 text-amber-400" />}
                <span>{tag}</span>
              </div>
            )}
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {actionBtn && (
            <div className="flex-shrink-0">
              {actionBtn}
            </div>
          )}
        </div>

        {/* Optional Stats / Guarantee Badges Strip */}
        {stats && stats.length > 0 && (
          <div className="pt-4 border-t border-stone-800/80 flex flex-wrap gap-2.5 sm:gap-4">
            {stats.map((s, i) => (
              <div key={i} className="flex items-center space-x-2 bg-stone-800/70 border border-stone-700/80 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUBCOMPONENT: PREMIUM PRODUCT CARD (redesigned inspired by gircowcare.org) ---
function ProductCard({ product, onAddToCart, onQuickView, isWishlisted, onToggleWishlist }) {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card-hover group bg-white rounded-xl sm:rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col relative">
      
      {/* Top Image Container — square aspect ratio */}
      <div className="relative pt-[100%] bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden cursor-pointer" onClick={onQuickView}>
        <img
          src={product.img}
          alt={product.name}
          className="img-zoom absolute inset-0 w-full h-full object-cover"
          onError={e => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=500&auto=format&fit=crop&q=60';
          }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Badges Row */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-20 pointer-events-none">
          {product.badge && (
            <span className="bg-emerald-900 text-amber-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md border border-emerald-700">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-amber-400 text-stone-950 text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md backdrop-blur-sm z-20 transition-all active:scale-90 ${
            isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/90 hover:bg-white text-stone-400 hover:text-red-500'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {/* Quick View + WhatsApp Hover Overlay — bottom of image */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-2">
          <button
            onClick={e => { e.stopPropagation(); onQuickView(); }}
            className="flex-1 text-[10px] font-bold text-white bg-stone-900/90 hover:bg-stone-900 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center justify-center space-x-1.5 shadow-lg"
          >
            <Eye className="w-3 h-3 text-amber-300" />
            <span>Quick View</span>
          </button>
          <a
            href={`https://wa.me/917559228525?text=${encodeURIComponent(`Hi Giridhan! I'm interested in ${product.name} (₹${product.price}). Please share more details.`)}`}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="p-1.5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg transition-colors flex-shrink-0"
            title="Order via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Category + Rating row */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase tracking-wider truncate max-w-[65%]">
              {product.category}
            </span>
            <div className="flex items-center space-x-0.5 flex-shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-bold text-stone-700">{product.rating}</span>
              <span className="text-[9px] text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 
            onClick={onQuickView}
            className="font-serif font-bold text-stone-900 text-xs sm:text-sm hover:text-emerald-800 transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Tag pill */}
          {product.tag && (
            <span className="inline-block text-[9px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
              {product.tag}
            </span>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-lg font-extrabold text-emerald-950 font-serif">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-[10px] text-stone-400 line-through font-medium">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-[9px] text-emerald-700 font-semibold flex items-center space-x-0.5">
              <Truck className="w-2.5 h-2.5" />
              <span>Fast Dispatch</span>
            </span>
          </div>

          <button
            onClick={onAddToCart}
            className="px-3 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center space-x-1.5 text-[10px] sm:text-xs font-bold flex-shrink-0 whitespace-nowrap"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- SUBCOMPONENT: SLIDE-OVER CART DRAWER ---
function CartDrawer({
  cart,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
  subtotal,
  shippingFee,
  isFreeShipping,
  freeShippingThreshold,
  total,
  totalSavings,
  couponCode,
  setCouponCode,
  appliedCoupon,
  couponError,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout
}) {
  const freeShippingNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
        
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif font-bold text-lg text-stone-900">Your Sacred Bag</h3>
            <span className="text-xs bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)} Items
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="p-3.5 bg-amber-50/80 border-b border-amber-200/60 text-xs">
          {isFreeShipping && subtotal > 0 ? (
            <div className="flex items-center space-x-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>🎉 Congratulations! You have unlocked FREE Express Delivery!</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between font-semibold text-stone-700 mb-1.5">
                <span>Add <strong className="text-emerald-800">₹{freeShippingNeeded}</strong> more for <strong>FREE Delivery</strong></span>
                <span>{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-600 rounded-full transition-all duration-500" 
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-bold text-stone-700">Your Bag is Empty</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Explore our pure cow dung dhoop, Ayurvedic remedies, and sacred altar wall arts.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-emerald-900 text-amber-300 rounded-full text-xs font-bold shadow-md hover:bg-emerald-800 transition-all"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="flex space-x-3 p-3 bg-stone-50 rounded-xl border border-stone-200/80 items-center justify-between"
              >
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg bg-white border border-stone-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0 px-1">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{item.product.name}</h4>
                  <div className="text-[11px] text-stone-500">{item.product.category}</div>
                  <div className="text-xs font-bold text-emerald-900 font-serif mt-1">
                    ₹{item.product.price}
                  </div>
                </div>

                <div className="flex items-center space-x-1 bg-white border border-stone-300 rounded-lg p-1">
                  <button
                    onClick={() => onUpdateQty(item.product.id, -1)}
                    className="p-1 text-stone-500 hover:text-stone-800 rounded"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQty(item.product.id, 1)}
                    className="p-1 text-stone-500 hover:text-stone-800 rounded"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => onRemove(item.product.id)}
                  className="p-1.5 text-stone-400 hover:text-red-500 transition-colors ml-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            
            {/* Coupon */}
            <div className="bg-white p-2.5 rounded-xl border border-stone-200">
              {appliedCoupon ? (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-emerald-800 font-bold">
                    <Gift className="w-4 h-4 text-emerald-600" />
                    <span>Coupon: <strong>{appliedCoupon.code}</strong> applied!</span>
                  </div>
                  <button onClick={onRemoveCoupon} className="text-[11px] text-red-600 hover:underline font-semibold">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={onApplyCoupon} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. VEDIC10)"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    className="flex-1 text-xs px-3 py-1.5 border border-stone-300 rounded-lg focus:outline-none uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-bold"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-800">₹{subtotal}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Vedic Discount ({appliedCoupon.discountPercent}%):</span>
                  <span>-₹{Math.round(subtotal * (appliedCoupon.discountPercent / 100))}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-amber-700 font-bold bg-amber-50 px-2 py-1 rounded">
                  <span>Total Savings:</span>
                  <span>₹{totalSavings}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Grand Total:</span>
                <span className="text-base text-emerald-950 font-serif font-extrabold">₹{total}</span>
              </div>
            </div>

            <div className="pt-2 pb-6 sm:pb-2 space-y-2 safe-pb">
              <button
                onClick={onCheckout}
                className="w-full py-3 bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 text-amber-300 font-bold rounded-xl shadow-lg text-sm flex items-center justify-center space-x-2"
              >
                <span>Proceed to Express Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onClear} className="w-full py-1 text-[11px] text-stone-400 hover:text-stone-600 text-center">
                Clear entire bag
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// --- SUBCOMPONENT: WISHLIST DRAWER ---
function WishlistDrawer({ wishlist, onClose, onAddToCart, onRemove }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slideLeft">
        
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
            <h3 className="font-serif font-bold text-lg text-stone-900">Your Saved Favorites</h3>
            <span className="text-xs bg-red-100 text-red-900 px-2 py-0.5 rounded-full font-bold">
              {wishlist.length}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <h4 className="font-serif text-lg font-bold text-stone-700">No Saved Items Yet</h4>
              <p className="text-xs text-stone-500 mt-1">Tap the heart icon on any product to save it for later.</p>
            </div>
          ) : (
            wishlist.map(product => (
              <div
                key={product.id}
                className="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl border border-stone-200 justify-between"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg bg-white border border-stone-200"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{product.name}</h4>
                  <span className="text-xs font-bold text-emerald-900 font-serif">₹{product.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemove(product);
                    }}
                    className="p-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 rounded-lg text-xs font-bold flex items-center space-x-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move</span>
                  </button>
                  <button onClick={() => onRemove(product)} className="p-1.5 text-stone-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

// --- SUBCOMPONENT: PRODUCT QUICK VIEW MODAL ---
function QuickViewModal({ product, onClose, onAddToCart, isWishlisted, onToggleWishlist, onDirectWhatsApp }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-stone-200 animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-stone-100 text-stone-600 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative bg-stone-100 p-4 sm:p-6 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
            <img
              src={product.img}
              alt={product.name}
              className="max-h-[240px] sm:max-h-[320px] w-auto object-contain rounded-2xl shadow-md"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-emerald-900 text-amber-300 text-xs font-black uppercase px-3 py-1 rounded-full shadow">
                {product.badge}
              </span>
            )}
          </div>

          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span className="uppercase font-bold text-emerald-800 tracking-wider text-[11px]">{product.category}</span>
                <div className="flex items-center space-x-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount})</span>
                </div>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">{product.name}</h2>
              
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-serif">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-stone-400 line-through">₹{product.originalPrice}</span>
                )}
              </div>

              <p className="text-xs text-stone-600 mt-2 sm:mt-3 leading-relaxed">
                {product.description}
              </p>

              {product.benefits && (
                <div className="mt-3 space-y-1">
                  <h4 className="text-[11px] font-bold text-stone-800 uppercase tracking-wider">Key Benefits:</h4>
                  {product.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-stone-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">Quantity:</span>
                <div className="flex items-center space-x-3 bg-stone-100 rounded-lg p-1 border border-stone-300">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1 hover:bg-white rounded">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-5 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-1 hover:bg-white rounded">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    onAddToCart(qty);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
                <button
                  onClick={() => onDirectWhatsApp(qty)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Order</span>
                </button>
              </div>

              <button
                onClick={onToggleWishlist}
                className="w-full py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center justify-center space-x-1"
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// --- SUBCOMPONENT: CHECKOUT & ADDRESS MODAL ---
function CheckoutModal({
  cart,
  subtotal,
  shippingFee,
  total,
  form,
  setForm,
  onClose,
  onSubmit,
  orderConfirmed
}) {
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-stone-200 p-5 sm:p-8 animate-scaleUp safe-pb">
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 text-stone-400 hover:text-stone-700">
          <X className="w-5 h-5" />
        </button>

        {orderConfirmed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Order Transmitted to WhatsApp!</h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
              Thank you for ordering with Giridhan Organics! Your itemized order and shipping address have been sent to our official helpline (+91 75592 28525). Our Goshala team will confirm dispatch shortly.
            </p>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
              🐄 Every order directly sustains our 75+ indigenous cows at Dhawda, Jalna.
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-emerald-900 text-white font-bold rounded-xl text-xs hover:bg-emerald-800"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Instant Dispatch</span>
              <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">Delivery Address & Checkout</h2>
              <p className="text-xs text-stone-500">Provide shipping details for instant courier tracking.</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center text-xs">
              <div>
                <span className="text-stone-500">Items ({cart.length}): </span>
                <span className="font-bold text-stone-800">₹{subtotal}</span>
              </div>
              <div>
                <span className="text-stone-500">Shipping: </span>
                <span className="font-bold text-emerald-800">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div>
                <span className="text-stone-500">Total: </span>
                <span className="font-serif font-extrabold text-emerald-950 text-sm">₹{total}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Mobile (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Pune / Jalna"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Delivery Address with Landmark *</label>
                <textarea
                  name="address"
                  required
                  rows="2"
                  placeholder="Flat No, Building, Street, Landmark"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="e.g. 431114"
                  value={form.pincode}
                  onChange={handleChange}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Payment Preference</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`border rounded-xl p-2.5 text-center cursor-pointer text-xs ${form.paymentMethod === 'whatsapp_direct' ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold' : 'border-stone-200'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="whatsapp_direct"
                      checked={form.paymentMethod === 'whatsapp_direct'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>WhatsApp Verification</span>
                  </label>
                  <label className={`border rounded-xl p-2.5 text-center cursor-pointer text-xs ${form.paymentMethod === 'upi' ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold' : 'border-stone-200'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={form.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>UPI Online Pay</span>
                  </label>
                  <label className={`border rounded-xl p-2.5 text-center cursor-pointer text-xs ${form.paymentMethod === 'cod' ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold' : 'border-stone-200'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={form.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span>Pay On Delivery</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-800 to-emerald-950 text-amber-300 font-extrabold rounded-xl shadow-xl transition-all flex items-center justify-center space-x-2 text-sm"
              >
                <span>Confirm Order via WhatsApp (₹{total})</span>
                <MessageCircle className="w-4 h-4 fill-amber-300 text-stone-900" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

// --- SUBCOMPONENT: PARTNERSHIP & CORPORATE ENQUIRY MODAL ---
function PartnerModal({ type, form, setForm, onClose, onSubmit }) {
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-stone-200 p-5 sm:p-8 animate-scaleUp safe-pb">
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 text-stone-400 hover:text-stone-700">
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              {type === 'corporate' ? '🎁 Corporate & Bulk Gifting' : type === 'international' ? '🌏 International Collaboration' : '🤝 Partner With Giridhan'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              Let's Build Something Meaningful
            </h2>
            <p className="text-xs text-stone-500">
              Fill in your details and our partnership team will connect directly with customized samples and catalogs.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ananya Deshmukh"
                value={form.name}
                onChange={handleChange}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Organization / Company Name</label>
              <input
                type="text"
                name="organization"
                placeholder="Company, Store, NGO, or Community"
                value={form.organization}
                onChange={handleChange}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="contact@company.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Interest Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
              >
                <option value="Corporate Gifting">Corporate Gifting (Pen Stands, Mobile Docks, Coasters)</option>
                <option value="Retail & Distribution">Retail & Distribution (Spiritual, Puja, Bio-Cleaners)</option>
                <option value="International Collaborations">International Export & Collaborations</option>
                <option value="Wedding & Event Gifting">Wedding & Festive Event Gifting</option>
                <option value="Custom Products & Bulk Orders">Custom Products & Bulk Manufacturing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Brief Requirement or Quantity *</label>
              <textarea
                name="message"
                required
                rows="3"
                placeholder="Tell us about your estimated quantities, target date, or specific questions..."
                value={form.message}
                onChange={handleChange}
                className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-xs"
            >
              <span>Submit Enquiry via WhatsApp →</span>
            </button>
            <p className="text-[10px] text-center text-stone-400 mt-2">
              Our Goshala team will respond within 24 hours.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}

// --- SUBCOMPONENT: JOURNAL ARTICLE READER MODAL ---
function JournalReaderModal({ story, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-stone-200 p-6 sm:p-10 animate-scaleUp">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-xs text-stone-400">
            <span className="text-emerald-800 font-bold uppercase tracking-wider">{story.category}</span>
            <span>•</span>
            <span>{story.date}</span>
            <span>•</span>
            <span>{story.readTime}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
            {story.title}
          </h2>

          <div className="p-4 bg-amber-50 rounded-2xl border-l-4 border-amber-500 text-stone-700 text-xs sm:text-sm font-medium italic">
            "{story.excerpt}"
          </div>

          <div className="pt-2 space-y-4 text-stone-700 text-sm leading-relaxed whitespace-pre-line">
            {story.fullText}
          </div>

          <div className="pt-6 border-t border-stone-200 flex justify-between items-center">
            <div className="text-xs text-stone-500">Giridhan Journal Series • Dhawda, Jalna</div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold hover:bg-stone-900"
            >
              Close Story
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}