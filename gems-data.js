/**
 * Ceylon Gems SL - Comprehensive Gemstone & Fine Jewelry Catalog
 * Provenance: Ratnapura, Elahera, Balangoda, Pelmadulla, Sri Lanka
 */

const GEMS_DATA = [
  {
    id: "CG-RBS-01",
    name: "The Royal Serendib Blue Sapphire",
    species: "Natural Corundum (Sapphire)",
    variety: "Royal Blue Sapphire",
    category: "sapphire",
    subCategory: "royal-blue",
    carat: 5.42,
    dimensions: "11.20 x 8.95 x 6.15 mm",
    cut: "Cushion",
    color: "Vivid Royal Blue (Vivid Saturation)",
    clarity: "Eye Clean (VVS1)",
    treatment: "Natural / Unheated (No Indication of Thermal Treatment)",
    origin: "Ratnapura, Sri Lanka (Ceylon)",
    certAgency: "GIA / GRS",
    certNumber: "CG-GIA-8821",
    certDate: "2025-11-14",
    priceUSD: 48500,
    isFeatured: true,
    isRare: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An extraordinary unheated Ceylon Royal Blue sapphire displaying the quintessential velvety royal hue revered by international collectors. Exceptional transparency, mirror-like facet luster, and flawless crystal structure mined from the alluvial gravels of Ratnapura.",
    specifications: {
      refractiveIndex: "1.762 - 1.770",
      specificGravity: "4.00",
      hardness: "9.0 Mohs Scale",
      fluorescence: "Inert under Longwave UV",
      pleochroism: "Strong Dichroic (Deep Blue / Violetish Blue)"
    }
  },
  {
    id: "CG-PAD-02",
    name: "Sunrise Lotus Padparadscha Sapphire",
    species: "Natural Corundum (Sapphire)",
    variety: "Padparadscha Sapphire",
    category: "sapphire",
    subCategory: "padparadscha",
    carat: 3.88,
    dimensions: "9.80 x 7.65 x 5.40 mm",
    cut: "Oval Brilliant / Step Cut",
    color: "Delicate Pinkish-Orange (Lotus Blossom)",
    clarity: "Flawless / Loupe Clean",
    treatment: "Natural / Unheated",
    origin: "Balangoda, Sri Lanka (Ceylon)",
    certAgency: "Gübelin / GIA",
    certNumber: "CG-GUB-3392",
    certDate: "2025-09-20",
    priceUSD: 62000,
    isFeatured: true,
    isRare: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The holy grail of colored gemstones. Named after the Sinhalese word 'Padma Raga' (the color of a tropical lotus flower at sunset), this unheated Ceylon Padparadscha balances equal proportions of tender pink and warm sunset orange with mesmerizing brilliance.",
    specifications: {
      refractiveIndex: "1.762 - 1.770",
      specificGravity: "4.01",
      hardness: "9.0 Mohs Scale",
      fluorescence: "Moderate Orange under Longwave UV",
      pleochroism: "Distinct (Pink / Orange-Yellow)"
    }
  },
  {
    id: "CG-CFS-03",
    name: "Ethereal Cornflower Blue Sapphire",
    species: "Natural Corundum (Sapphire)",
    variety: "Cornflower Blue Sapphire",
    category: "sapphire",
    subCategory: "cornflower-blue",
    carat: 4.15,
    dimensions: "10.15 x 8.05 x 5.80 mm",
    cut: "Oval Mixed Cut",
    color: "Vibrant Cornflower Blue",
    clarity: "VS1 (Very Slightly Included)",
    treatment: "Traditional Gentle Heat",
    origin: "Elahera, Sri Lanka (Ceylon)",
    certAgency: "GRS",
    certNumber: "CG-GRS-4019",
    certDate: "2025-10-05",
    priceUSD: 24500,
    isFeatured: false,
    isRare: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Possessing the legendary open crystalline glow of classic Ceylon Cornflower sapphires. Its vivid pastel-to-medium blue remains brightly illuminated even under dim candlelight and evening ambiance.",
    specifications: {
      refractiveIndex: "1.760 - 1.768",
      specificGravity: "3.99",
      hardness: "9.0 Mohs Scale",
      fluorescence: "Inert",
      pleochroism: "Medium Blue / Green-Blue"
    }
  },
  {
    id: "CG-ALX-04",
    name: "Imperial Chameleon Ceylon Alexandrite",
    species: "Natural Chrysoberyl",
    variety: "Alexandrite",
    category: "alexandrite",
    subCategory: "color-change",
    carat: 2.65,
    dimensions: "8.45 x 6.90 x 4.85 mm",
    cut: "Emerald",
    color: "Color Change: Vivid Forest Green (Daylight) to Purplish Red (Incandescent)",
    clarity: "VVS2",
    treatment: "Natural / 100% Unheated & Untreated",
    origin: "Ratnapura, Sri Lanka (Ceylon)",
    certAgency: "SSEF / GIA",
    certNumber: "CG-SSEF-1102",
    certDate: "2025-12-01",
    priceUSD: 54000,
    isFeatured: true,
    isRare: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "'Emerald by day, Ruby by night'. This museum-grade Ceylon Alexandrite exhibits an astonishing 90% color-change shift between bright sunlit teal green and dramatic wine-red incandescent hue. A true connoisseur's investment asset.",
    specifications: {
      refractiveIndex: "1.745 - 1.754",
      specificGravity: "3.72",
      hardness: "8.5 Mohs Scale",
      fluorescence: "Faint Red under LW-UV",
      pleochroism: "Trichroic (Green / Orange-Yellow / Purple-Red)"
    }
  },
  {
    id: "CG-RUB-05",
    name: "The Crimson Flame Ceylon Ruby",
    species: "Natural Corundum (Ruby)",
    variety: "Pigeon Blood Ceylon Ruby",
    category: "ruby",
    subCategory: "pigeon-blood",
    carat: 3.12,
    dimensions: "9.10 x 7.30 x 4.90 mm",
    cut: "Pear",
    color: "Vivid Pigeon Blood Red with Fluorescent Glow",
    clarity: "VS2 (Silky Ceylon Lustre)",
    treatment: "Natural / Unheated",
    origin: "Pelmadulla, Sri Lanka",
    certAgency: "GRS / NGJA",
    certNumber: "CG-GRS-7741",
    certDate: "2025-08-11",
    priceUSD: 39000,
    isFeatured: false,
    isRare: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Ceylon rubies are renowned globally for their bright, internal fire and high chromium fluorescence that glows under natural sunlight. Mined from the historic Pelmadulla gravel beds.",
    specifications: {
      refractiveIndex: "1.762 - 1.770",
      specificGravity: "4.00",
      hardness: "9.0 Mohs Scale",
      fluorescence: "Strong Red under UV",
      pleochroism: "Strong Dichroic (Carmine Red / Orange Red)"
    }
  },
  {
    id: "CG-YEL-06",
    name: "Sovereign Golden Yellow Sapphire",
    species: "Natural Corundum (Sapphire)",
    variety: "Golden Yellow (Pushparaga)",
    category: "sapphire",
    subCategory: "yellow-sapphire",
    carat: 7.85,
    dimensions: "12.40 x 10.10 x 7.20 mm",
    cut: "Cushion",
    color: "Intense Canary / Imperial Gold",
    clarity: "VVS1",
    treatment: "Natural / Unheated",
    origin: "Ratnapura, Sri Lanka (Ceylon)",
    certAgency: "GIA",
    certNumber: "CG-GIA-9902",
    certDate: "2025-10-29",
    priceUSD: 28000,
    isFeatured: false,
    isRare: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "In fine jewelry and Vedic lore, Sri Lankan yellow sapphires ('Pushparaga') symbolize prosperity, wisdom, and royalty. This 7.85ct master-cut gemstone radiates with warm golden sunlight brilliance.",
    specifications: {
      refractiveIndex: "1.762 - 1.770",
      specificGravity: "4.00",
      hardness: "9.0 Mohs Scale",
      fluorescence: "Moderate Apricot Orange under LW-UV",
      pleochroism: "Yellow / Pale Yellow"
    }
  },
  {
    id: "CG-STR-07",
    name: "Midnight Asteria 6-Ray Star Sapphire",
    species: "Natural Corundum (Star Sapphire)",
    variety: "Blue Asterism Star Sapphire",
    category: "rare-oddities",
    subCategory: "star-sapphire",
    carat: 12.40,
    dimensions: "14.50 x 12.20 x 8.60 mm",
    cut: "Cabochon",
    color: "Deep Steel Blue with Sharp Silver Star",
    clarity: "Translucent with Natural Rutile Silk",
    treatment: "Natural / 100% Untreated",
    origin: "Eheliyagoda, Sri Lanka",
    certAgency: "NGJA / GIA",
    certNumber: "CG-NGJA-5120",
    certDate: "2025-07-18",
    priceUSD: 31500,
    isFeatured: true,
    isRare: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An awe-inspiring 12.4ct asteriated sapphire displaying an impeccably centered, needle-sharp six-ray star gliding across its smooth dome under single point illumination. Sri Lanka is the historic birthplace of the world's most famous star corundums.",
    specifications: {
      refractiveIndex: "1.760 (Spot Reading)",
      specificGravity: "4.00",
      hardness: "9.0 Mohs Scale",
      phenomenon: "Asterism (6-Ray Star caused by oriented rutile needles)",
      fluorescence: "Inert"
    }
  },
  {
    id: "CG-SPN-08",
    name: "Cobalt Flame Ceylon Spinel",
    species: "Natural Spinel",
    variety: "Vivid Cobalt / Indigo Spinel",
    category: "spinel",
    subCategory: "cobalt-spinel",
    carat: 4.60,
    dimensions: "10.40 x 8.30 x 6.10 mm",
    cut: "Cushion",
    color: "Neon Cobalt Blue with Violet Undertones",
    clarity: "Loupe Clean",
    treatment: "Natural / Untreated",
    origin: "Kiriella, Sri Lanka",
    certAgency: "GRS",
    certNumber: "CG-GRS-8290",
    certDate: "2025-11-02",
    priceUSD: 22000,
    isFeatured: false,
    isRare: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Natural Ceylon spinels possess singly refractive crystal structures, bestowing them with remarkable diamond-like brilliance and zero color extinguishing. Highly sought-after by high-end jewelry connoisseurs.",
    specifications: {
      refractiveIndex: "1.718 (Singly Refractive)",
      specificGravity: "3.60",
      hardness: "8.0 Mohs Scale",
      fluorescence: "Inert",
      pleochroism: "None (Isotropic)"
    }
  },
  {
    id: "CG-TSV-09",
    name: "Ceylon Merelani Tsavorite Garnet",
    species: "Natural Grossular Garnet",
    variety: "Vivid Tsavorite",
    category: "rare-oddities",
    subCategory: "tsavorite",
    carat: 3.45,
    dimensions: "9.20 x 7.80 x 5.20 mm",
    cut: "Emerald",
    color: "Electric Emerald Green",
    clarity: "Eye Clean (VS)",
    treatment: "Natural / Completely Untreated",
    origin: "Ratnapura, Sri Lanka",
    certAgency: "GIA",
    certNumber: "CG-GIA-6601",
    certDate: "2025-09-12",
    priceUSD: 16800,
    isFeatured: false,
    isRare: false,
    isNew: false,
    image: "https://images.unsplash.com/photo-1611591475161-12501cf50672?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611591475161-12501cf50672?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An electrifying emerald-hued green grossular garnet with higher refractive index and dispersion than standard beryl emeralds, offering superior scintillation with zero oiling or resin enhancement.",
    specifications: {
      refractiveIndex: "1.740",
      specificGravity: "3.61",
      hardness: "7.5 Mohs Scale",
      fluorescence: "Inert",
      pleochroism: "None (Isotropic)"
    }
  },
  {
    id: "CG-JWL-10",
    name: "The 'Queen of Serendib' High Jewelry Ring",
    species: "Haute Joaillerie Masterpiece",
    variety: "High Jewelry Ring",
    category: "jewelry",
    subCategory: "haute-rings",
    carat: 6.20,
    dimensions: "Ring Size: US 6.5 (Complimentary Resizing)",
    cut: "Oval",
    color: "Royal Blue with D/VVS Diamond Halo",
    clarity: "Flawless Setting (Platinum 950)",
    treatment: "Unheated Center Gemstone",
    origin: "Handcrafted in Ceylon Gems SL Colombo Atelier",
    certAgency: "GIA Master Report",
    certNumber: "CG-GIA-9988",
    certDate: "2025-12-15",
    priceUSD: 78000,
    isFeatured: true,
    isRare: true,
    isNew: true,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A pinnacle bespoke creation centered around a magnificent 6.20ct unheated Ceylon Royal Blue sapphire flanked by two matched half-moon cut diamonds (0.95ctw, DEF/VVS) handcrafted in Solid Platinum 950 with an engraved secret sapphire gallery.",
    specifications: {
      metal: "Platinum 950 & 18K Yellow Gold prongs",
      sideStones: "2 Half-Moon Diamonds (0.95ctw, D-E/VVS1) + 38 Micro-Pavé Diamonds (0.42ctw)",
      totalWeight: "11.4 grams",
      craftsmanship: "Over 85 hours of master goldsmithing"
    }
  },
  {
    id: "CG-JWL-11",
    name: "Ceylon Padparadscha Halo Pendant Necklace",
    species: "Haute Joaillerie Masterpiece",
    variety: "Fine Jewelry Pendant",
    category: "jewelry",
    subCategory: "necklaces",
    carat: 3.25,
    dimensions: "Pendant: 22 x 14 mm | Chain: 18-inch 18K Gold",
    cut: "Pear",
    color: "Sunset Pink-Orange with Diamond Frame",
    clarity: "Loupe Clean Center Gem",
    treatment: "Natural Unheated Center Stone",
    origin: "Ceylon Gems SL Atelier",
    certAgency: "GRS Certified",
    certNumber: "CG-GRS-6677",
    certDate: "2025-10-18",
    priceUSD: 42500,
    isFeatured: false,
    isRare: true,
    isNew: false,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A captivating pear-shaped unheated Padparadscha sapphire embraced by an undulating halo of round brilliant and marquise-cut natural diamonds in 18K Rose and White Gold.",
    specifications: {
      metal: "18K Rose Gold & 18K White Gold Double Setting",
      sideStones: "Marquise & Round Diamonds (0.78ctw, F/VS1)",
      chain: "18K Solid Gold adjustable wheat chain"
    }
  },
  {
    id: "CG-WHT-12",
    name: "Pristine Ceylon White Sapphire (Diamond Alternative)",
    species: "Natural Corundum (White Sapphire)",
    variety: "Leuco-Sapphire",
    category: "sapphire",
    subCategory: "white-sapphire",
    carat: 5.10,
    dimensions: "10.80 x 8.60 x 5.90 mm",
    cut: "Emerald",
    color: "Pure Colorless (Grade D equivalent)",
    clarity: "IF (Internally Flawless)",
    treatment: "Natural / Unheated",
    origin: "Ratnapura, Sri Lanka",
    certAgency: "NGJA / GIA",
    certNumber: "CG-NGJA-4412",
    certDate: "2025-11-19",
    priceUSD: 12500,
    isFeatured: false,
    isRare: false,
    isNew: true,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Pure corundum without trace element impurities yields breathtaking, crystal-clear white sapphires with 9.0 Mohs hardness, providing an ethical, unheated, high-durability alternative for bespoke bridal rings.",
    specifications: {
      refractiveIndex: "1.762 - 1.770",
      specificGravity: "4.00",
      hardness: "9.0 Mohs Scale",
      fluorescence: "Inert",
      dispersion: "0.018"
    }
  }
];

// Curated settings for the Bespoke Customizer
const BESPOKE_SETTINGS = [
  {
    id: "solitaire-classic",
    name: "The Royal Crown Solitaire",
    style: "Solitaire",
    description: "Timeless 6-prong or 4-prong minimalist basket showcasing maximum gem light exposure.",
    basePrice: 1450,
    renderPath: "solitaire"
  },
  {
    id: "halo-vintage",
    name: "Empress Pavé Micro-Halo",
    style: "Halo",
    description: "A delicate halo of round brilliant pavé diamonds framing the center Ceylon gemstone.",
    basePrice: 2200,
    renderPath: "halo"
  },
  {
    id: "three-stone-trilogy",
    name: "Serendib Trilogy (Past, Present & Future)",
    style: "Three-Stone",
    description: "Flanked by two precision-cut trapezoid or half-moon accent diamonds.",
    basePrice: 3100,
    renderPath: "three-stone"
  },
  {
    id: "art-deco-tiara",
    name: "Heritage Art Deco Crown Setting",
    style: "Vintage Art Deco",
    description: "Hand-milgrained filigree gallery with baguette diamonds and hand engraving.",
    basePrice: 3800,
    renderPath: "art-deco"
  }
];

// Metal Alloys for Bespoke Customizer
const BESPOKE_METALS = [
  {
    id: "pt950",
    name: "Platinum 950",
    colorHex: "#E5E4E2",
    accentGlow: "rgba(229, 228, 226, 0.4)",
    purity: "95% Pure Platinum",
    multiplier: 1.35
  },
  {
    id: "yg18k",
    name: "18K Royal Yellow Gold",
    colorHex: "#E6CA65",
    accentGlow: "rgba(230, 202, 101, 0.45)",
    purity: "75% Pure Gold / Copper / Silver Alloy",
    multiplier: 1.15
  },
  {
    id: "rg18k",
    name: "18K Sunset Rose Gold",
    colorHex: "#E8A398",
    accentGlow: "rgba(232, 163, 152, 0.45)",
    purity: "75% Pure Gold & Copper Rich Blend",
    multiplier: 1.18
  },
  {
    id: "wg18k",
    name: "18K Lustrous White Gold",
    colorHex: "#ECECEC",
    accentGlow: "rgba(236, 236, 236, 0.4)",
    purity: "75% Pure Gold & Palladium (Rhodium Plated)",
    multiplier: 1.15
  }
];

// Live Exchange Rates (Base USD)
const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1.0, code: "USD", name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, code: "EUR", name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, code: "GBP", name: "British Pound" },
  LKR: { symbol: "Rs ", rate: 305.0, code: "LKR", name: "Sri Lankan Rupee" },
  AED: { symbol: "AED ", rate: 3.67, code: "AED", name: "UAE Dirham" },
  JPY: { symbol: "¥", rate: 154.0, code: "JPY", name: "Japanese Yen" }
};

// Mining Regions in Sri Lanka
const CEYLON_REGIONS = [
  {
    id: "ratnapura",
    name: "Ratnapura (City of Gems)",
    tagline: "The Ancient Epicenter of Royal Sapphires",
    description: "Nestled in the lush river basins beneath Adam's Peak, Ratnapura has yielded the world's most iconic corundums for over 2,500 years, including the Star of India and Queen Elizabeth II's sapphire brooch.",
    notableGems: ["Royal Blue Sapphire", "Padparadscha", "Alexandrite", "Star Corundum"],
    image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=800&q=80",
    badge: "Historic Gem Capital"
  },
  {
    id: "elahera",
    name: "Elahera Valley",
    tagline: "Famed for Crystalline Transparency & Cornflower Tones",
    description: "Discovered in the Mahaweli River system, Elahera produces gem crystals of extraordinary optical clarity with high facet luster and open sky-blue nuances.",
    notableGems: ["Cornflower Sapphire", "Chrysoberyl Cat's Eye", "Spinel"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    badge: "Alluvial Treasure"
  },
  {
    id: "balangoda",
    name: "Balangoda & Pelmadulla",
    tagline: "The Cradle of Fiery Padparadscha & Rubies",
    description: "Deep subterranean alluvial pits surrounded by mist-shrouded mountain ranges yield the exceptionally rare lotus-hued Padparadschas and glowing red Ceylon rubies.",
    notableGems: ["Padparadscha Sapphire", "Pigeon Blood Ruby", "Yellow Pushparaga"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    badge: "Rarest Color Zones"
  }
];

// Testimonials & Collector Quotes
const TESTIMONIALS = [
  {
    clientName: "Lord Arthur Henderson",
    location: "Mayfair, London",
    role: "Private Gem Collector",
    comment: "Ceylon Gems SL sourced a breathtaking 5.4ct unheated Royal Blue sapphire with GIA certification. Their provenance transparency and insured Ferrari logistics to London were exemplary. A true connoisseur house.",
    rating: 5,
    verifiedGem: "Royal Blue Sapphire (CG-RBS-01)"
  },
  {
    clientName: "Elena Rostova",
    location: "Geneva, Switzerland",
    role: "Haute Joaillerie Designer",
    comment: "The Padparadscha sapphire we commissioned for an engagement ring was simply sublime. The pink-orange equilibrium under natural daylight is beyond words. Sri Lankan gems have no rival.",
    rating: 5,
    verifiedGem: "Sunrise Padparadscha (CG-PAD-02)"
  },
  {
    clientName: "His Highness Sheikh Mansoor",
    location: "Dubai, United Arab Emirates",
    role: "Bespoke Jewelry Patron",
    comment: "Exceptional ethical mining lineage and unmatched cutting precision. The Ceylon Star Sapphire arrived in bespoke velvet packaging with complete Gübelin gemological papers.",
    rating: 5,
    verifiedGem: "Midnight Asteria 6-Ray Star Sapphire"
  }
];
