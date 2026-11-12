// Official Cashify Android App Reference Link
export const CASHIFY_APP_URL = "https://play.google.com/store/apps/details?id=com.reglobe.cashify";
export const STORE_MARKUP_INR = 500;

export const formatINR = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

export const CONDITION_GRADES = [
  {
    id: "fair",
    label: "Fair",
    badge: "Fair Condition",
    delta: -2000,
    batteryRange: "85% – 89% Health",
    summary: "Light micro-marks on bezel, 100% genuine screen & parts"
  },
  {
    id: "good",
    label: "Good",
    badge: "Good Condition",
    delta: 0,
    batteryRange: "90% – 94% Health",
    summary: "Clean body with minimal wear, 100% Apple hardware tested"
  },
  {
    id: "superb",
    label: "Superb",
    badge: "Superb Grade A+",
    delta: 2500,
    batteryRange: "95% – 100% Health",
    summary: "Flawless like-new finish, zero visible marks, peak battery"
  }
];

export const getVariantConditionPricing = (variant, conditionId = "good") => {
  const grade = CONDITION_GRADES.find((g) => g.id === conditionId) || CONDITION_GRADES[1];
  const baseCashify = variant?.cashifyPrice || 25000;
  const originalMrp = variant?.originalMrp || 64900;

  const adjustedCashify = Math.max(15000, baseCashify + grade.delta);
  const storePrice = adjustedCashify + STORE_MARKUP_INR;
  const savings = Math.max(0, originalMrp - storePrice);
  const discountPercent = originalMrp > 0 ? Math.round((savings / originalMrp) * 100) : 0;

  return {
    condition: grade,
    cashifyPrice: adjustedCashify,
    storePrice,
    originalMrp,
    savings,
    discountPercent,
    cashifyPriceFormatted: formatINR(adjustedCashify),
    storePriceFormatted: formatINR(storePrice),
    originalPriceFormatted: formatINR(originalMrp),
    savingsFormatted: `SAVE ${formatINR(savings)}`
  };
};

// Helper to build pricing variants ensuring Store Buy Price = Cashify App Price + ₹500
const makeVariants = (list) =>
  list.map(([storage, cashifyPrice, originalMrp]) => {
    const storePrice = cashifyPrice + STORE_MARKUP_INR;
    const savingsAmount = originalMrp - storePrice;
    return {
      storage,
      cashifyPrice,
      storePrice,
      originalMrp,
      cashifyPriceFormatted: formatINR(cashifyPrice),
      storePriceFormatted: formatINR(storePrice),
      originalPriceFormatted: formatINR(originalMrp),
      savingsFormatted: `SAVE ${formatINR(Math.max(savingsAmount, 0))}`
    };
  });

// Verified Official Apple Newsroom & Wikimedia Images
export const IPHONE_16_PRO_MAX_IMAGES = {
  heroDuo: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg",
  finishLineup: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg",
  cameraSystem: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-camera-system-240909_inline.jpg.large.jpg",
  desertCutout: "https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_16_Pro_Max_Desert_Titanium_Rear.png?width=600",
  screenCutout: "https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_16_Pro_Max_screen.png?width=600",
  storeBoxStock: "https://lh3.googleusercontent.com/Y6eRQr50pTtuYEs0g55ljofWjM3HLStoYFVJCYCCaGLjwTikL9oqbS4BJ9iI4yhXWsinGnBXhDBCC7AB9w=w600-rw",
  storeCounterStock: "https://lh3.googleusercontent.com/tzJoPiFPlLtP8e9v-tfbiVPczbnslw-UU4ysdRcm_mR6QcodMM49DSpfVUo3qN2NorgyQ72tXE7DazZ1uQ=w600-rw",
  storeInspectionDesk: "https://lh3.googleusercontent.com/-VuECFMulcl6GsV1loRwPLSIItWHnmjubnIBojpF2bVPoLf70ajDbytqqlMZrZx6QXpkHTxK5GZ7vydTTQ=w600-rw"
};

const IMG = {
  iphone18Pro: "https://www.apple.com/v/iphone-18-pro/d/images/meta/iphone-18-pro_overview__bl9no3txkonm_og.png",
  iphoneAir: "https://www.apple.com/v/iphone-air/i/images/meta/iphone-air_overview__dwhg6l117yqa_og.png",
  iphone17: "https://www.apple.com/v/iphone-17/i/images/meta/iphone-17_overview__cg0rlzmbhl7m_og.png",
  iphone16ProMax: "https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_16_Pro_Max_Desert_Titanium_Rear.png?width=600",
  iphone16Pro: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-camera-system-240909_inline.jpg.large.jpg",
  iphone16Lineup: "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/Apple-iPhone-16-finish-lineup-240909_big.jpg.large.jpg",
  iphone15ProMax: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
  iphone15Pro: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.og.jpg",
  iphone15Lineup: "https://www.apple.com/newsroom/images/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/article/Apple-iPhone-15-lineup-hero-230912_inline.jpg.large.jpg",
  iphone14Pro: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-deep-purple-220907_inline.jpg.large.jpg",
  iphone14Lineup: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-iPhone-14-Plus-hero-220907_Full-Bleed-Image.jpg.large.jpg",
  iphone13Pro: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.large.jpg",
  iphone13Lineup: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.large.jpg",
  iphone12Pro: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020_big.jpg.large.jpg",
  iphone12Lineup: "https://www.apple.com/newsroom/images/product/iphone/standard/apple_iphone-12_new-design_10132020_big.jpg.large.jpg"
};

const rawProducts = [
  // =========================================================
  // iPHONE 18 SERIES (PRESENT FLAGSHIP PRO LINEUP)
  // =========================================================
  {
    id: "iphone-18-pro-max",
    name: "Apple iPhone 18 Pro Max",
    series: "iPhone 18 Series",
    generation: 18,
    formFactor: "Pro Max",
    ram: "12GB RAM",
    badge: "Latest 2026 Pro Max",
    image: IMG.iphone18Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "95% – 100% Health",
    warranty: "Apple Official Warranty + Store Bill",
    colors: [
      { name: "Burgundy", hex: "#5c202c" },
      { name: "Glacier", hex: "#c5d8e5" },
      { name: "Black", hex: "#1c1d20" },
      { name: "Silver", hex: "#e6e7e9" }
    ],
    variants: makeVariants([
      ["256GB", 149500, 179900],
      ["512GB", 169500, 204900],
      ["1TB", 209500, 254900],
      ["2TB", 269500, 329900]
    ]),
    specs: {
      chip: "A20 Pro 2nm • 12GB LPDDR5X RAM",
      display: "6.9\" ProMotion XDR OLED 120Hz",
      camera: "Triple 48MP Variable Aperture Pro Camera System",
      box: "Original Box, Braided USB-C Cable & Store Invoice"
    }
  },
  {
    id: "iphone-18-pro",
    name: "Apple iPhone 18 Pro",
    series: "iPhone 18 Series",
    generation: 18,
    formFactor: "Pro",
    ram: "12GB RAM",
    badge: "Latest 2026 Pro",
    image: IMG.iphone18Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "95% – 100% Health",
    warranty: "Apple Official Warranty + Store Bill",
    colors: [
      { name: "Glacier", hex: "#c5d8e5" },
      { name: "Burgundy", hex: "#5c202c" },
      { name: "Black", hex: "#1c1d20" },
      { name: "Silver", hex: "#e6e7e9" }
    ],
    variants: makeVariants([
      ["256GB", 134500, 164900],
      ["512GB", 154500, 189900],
      ["1TB", 194500, 239900],
      ["2TB", 254500, 314900]
    ]),
    specs: {
      chip: "A20 Pro 2nm • 12GB LPDDR5X RAM",
      display: "6.3\" ProMotion XDR OLED 120Hz",
      camera: "Triple 48MP Variable Aperture + 5x Telephoto",
      box: "Original Box, Cable & Authorized Store Bill"
    }
  },

  // =========================================================
  // iPHONE 17 SERIES (17e, 17, 17 Air, 17 Pro, 17 Pro Max)
  // =========================================================
  {
    id: "iphone-17-pro-max",
    name: "Apple iPhone 17 Pro Max",
    series: "iPhone 17 Series",
    generation: 17,
    formFactor: "Pro Max",
    ram: "12GB RAM",
    badge: "Flagship Buy",
    image: IMG.iphone18Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "94% – 100% Health",
    warranty: "6 Months Store Warranty + Bill",
    colors: [
      { name: "Desert Titanium", hex: "#c4a387" },
      { name: "Natural Titanium", hex: "#9e9a93" },
      { name: "Space Black", hex: "#27282b" },
      { name: "Silver", hex: "#e3e4e0" }
    ],
    variants: makeVariants([
      ["256GB", 104500, 149900],
      ["512GB", 114500, 169900],
      ["1TB", 126000, 189900],
      ["2TB", 142000, 229900]
    ]),
    specs: {
      chip: "A19 Pro • 12GB RAM",
      display: "6.9\" Super Retina XDR 120Hz",
      camera: "Triple 48MP Pro Fusion Camera System",
      box: "Complete Box, Cable & 3uTools Verification Report"
    }
  },
  {
    id: "iphone-17-pro",
    name: "Apple iPhone 17 Pro",
    series: "iPhone 17 Series",
    generation: 17,
    formFactor: "Pro",
    ram: "12GB RAM",
    badge: "Pro Grade",
    image: IMG.iphone16Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "94% – 100% Health",
    warranty: "6 Months Store Warranty + Bill",
    colors: [
      { name: "Natural Titanium", hex: "#9e9a93" },
      { name: "Desert Titanium", hex: "#c4a387" },
      { name: "Space Black", hex: "#27282b" },
      { name: "Silver", hex: "#e3e4e0" }
    ],
    variants: makeVariants([
      ["256GB", 94500, 134900],
      ["512GB", 103500, 154900],
      ["1TB", 114000, 174900]
    ]),
    specs: {
      chip: "A19 Pro • 12GB RAM",
      display: "6.3\" Super Retina XDR 120Hz",
      camera: "48MP Pro Triple Camera with 5x Optical Zoom",
      box: "Original Box & Store Invoice"
    }
  },
  {
    id: "iphone-17-air",
    name: "Apple iPhone 17 Air",
    series: "iPhone 17 Series",
    generation: 17,
    formFactor: "Air",
    ram: "12GB RAM",
    badge: "Ultra-Slim Design",
    image: IMG.iphoneAir,
    condition: "Fair / Good / Superb",
    batteryHealth: "95% – 100% Health",
    warranty: "6 Months Store Warranty + Bill",
    colors: [
      { name: "Sky Blue", hex: "#b8d0e8" },
      { name: "Light Gold", hex: "#e9dec7" },
      { name: "Cloud White", hex: "#f4f5f7" },
      { name: "Space Black", hex: "#27282b" }
    ],
    variants: makeVariants([
      ["256GB", 78000, 99900],
      ["512GB", 86500, 119900],
      ["1TB", 96000, 139900]
    ]),
    specs: {
      chip: "A19 Pro • 12GB RAM Ultra-Thin",
      display: "6.6\" ProMotion Ultra-Thin OLED",
      camera: "48MP Fusion Main Sensor with 2x Telephoto",
      box: "Original Box & Charging Cable"
    }
  },
  {
    id: "iphone-17",
    name: "Apple iPhone 17",
    series: "iPhone 17 Series",
    generation: 17,
    formFactor: "Standard",
    ram: "8GB RAM",
    badge: "Best Seller",
    image: IMG.iphone17,
    condition: "Fair / Good / Superb",
    batteryHealth: "95% – 100% Health",
    warranty: "6 Months Store Warranty + Bill",
    colors: [
      { name: "Sage", hex: "#96ab97" },
      { name: "Lavender", hex: "#c7bddb" },
      { name: "Mist Blue", hex: "#b7c9d9" },
      { name: "White", hex: "#f5f5f7" },
      { name: "Black", hex: "#1f2022" }
    ],
    variants: makeVariants([
      ["256GB", 69500, 99900],
      ["512GB", 78500, 124900]
    ]),
    specs: {
      chip: "A19 • 8GB RAM with Apple Intelligence",
      display: "6.3\" ProMotion OLED 120Hz",
      camera: "48MP Dual Fusion Camera System",
      box: "Complete Box & 3uTools Verified Bill"
    }
  },
  {
    id: "iphone-17e",
    name: "Apple iPhone 17e",
    series: "iPhone 17 Series",
    generation: 17,
    formFactor: "e-Series",
    ram: "8GB RAM",
    badge: "Smart Value",
    image: IMG.iphone17,
    condition: "Fair / Good / Superb",
    batteryHealth: "95% – 100% Health",
    warranty: "6 Months Store Warranty",
    colors: [
      { name: "Black", hex: "#1f2022" },
      { name: "White", hex: "#f5f5f7" },
      { name: "Soft Pink", hex: "#f4cfd9" }
    ],
    variants: makeVariants([
      ["256GB", 56000, 79900],
      ["512GB", 64000, 104900]
    ]),
    specs: {
      chip: "A19 • 8GB RAM",
      display: "6.1\" Super Retina XDR OLED",
      camera: "48MP Fusion Camera",
      box: "Original Packaging & Store Invoice"
    }
  },

  // =========================================================
  // iPHONE 16 SERIES (16e, 16, 16 Plus, 16 Pro, 16 Pro Max)
  // =========================================================
  {
    id: "iphone-16-pro-max",
    name: "Apple iPhone 16 Pro Max",
    series: "iPhone 16 Series",
    generation: 16,
    formFactor: "Pro Max",
    ram: "8GB RAM",
    badge: "Most Popular Pro Max",
    image: IMG.iphone16ProMax,
    condition: "Fair / Good / Superb",
    batteryHealth: "92% – 100% Health",
    warranty: "6 Months Store Warranty + Bill",
    colors: [
      { name: "Desert Titanium", hex: "#c4a387" },
      { name: "Natural Titanium", hex: "#9e9a93" },
      { name: "White Titanium", hex: "#f2f1ed" },
      { name: "Black Titanium", hex: "#2e2f33" }
    ],
    variants: makeVariants([
      ["256GB", 89500, 144900],
      ["512GB", 97000, 164900],
      ["1TB", 105000, 184900]
    ]),
    specs: {
      chip: "A18 Pro • 8GB RAM",
      display: "6.9\" Super Retina XDR ProMotion 120Hz",
      camera: "48MP Fusion + 48MP Ultra Wide + 5x Telephoto",
      box: "Complete Box, Cable, Bill & Testing Report"
    }
  },
  {
    id: "iphone-16-pro",
    name: "Apple iPhone 16 Pro",
    series: "iPhone 16 Series",
    generation: 16,
    formFactor: "Pro",
    ram: "8GB RAM",
    badge: "Compact Titanium",
    image: IMG.iphone16Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "92% – 100% Health",
    warranty: "6 Months Store Warranty + Bill",
    colors: [
      { name: "Natural Titanium", hex: "#9e9a93" },
      { name: "Desert Titanium", hex: "#c4a387" },
      { name: "White Titanium", hex: "#f2f1ed" },
      { name: "Black Titanium", hex: "#2e2f33" }
    ],
    variants: makeVariants([
      ["128GB", 76500, 119900],
      ["256GB", 82000, 129900],
      ["512GB", 89500, 149900],
      ["1TB", 97000, 169900]
    ]),
    specs: {
      chip: "A18 Pro • 8GB RAM",
      display: "6.3\" Super Retina XDR ProMotion 120Hz",
      camera: "48MP Camera Control + 5x Optical Zoom",
      box: "Box Pack with Original Accessories"
    }
  },
  {
    id: "iphone-16-plus",
    name: "Apple iPhone 16 Plus",
    series: "iPhone 16 Series",
    generation: 16,
    formFactor: "Plus",
    ram: "8GB RAM",
    badge: "Big Screen Battery King",
    image: IMG.iphone16Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "92% – 100% Health",
    warranty: "6 Months Store Warranty",
    colors: [
      { name: "Ultramarine", hex: "#96a9f0" },
      { name: "Teal", hex: "#a8cfc6" },
      { name: "Pink", hex: "#f3b1d5" },
      { name: "White", hex: "#f7f7f7" },
      { name: "Black", hex: "#242527" }
    ],
    variants: makeVariants([
      ["128GB", 61000, 89900],
      ["256GB", 66000, 99900],
      ["512GB", 73000, 119900]
    ]),
    specs: {
      chip: "A18 • 8GB RAM",
      display: "6.7\" Super Retina XDR OLED",
      camera: "48MP Fusion + Spatial Video Capture",
      box: "Original Packaging & Cable"
    }
  },
  {
    id: "iphone-16",
    name: "Apple iPhone 16",
    series: "iPhone 16 Series",
    generation: 16,
    formFactor: "Standard",
    ram: "8GB RAM",
    badge: "Apple Intelligence",
    image: IMG.iphone16Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "92% – 100% Health",
    warranty: "6 Months Store Warranty",
    colors: [
      { name: "Teal", hex: "#a8cfc6" },
      { name: "Ultramarine", hex: "#96a9f0" },
      { name: "Pink", hex: "#f3b1d5" },
      { name: "White", hex: "#f7f7f7" },
      { name: "Black", hex: "#242527" }
    ],
    variants: makeVariants([
      ["128GB", 55000, 79900],
      ["256GB", 60000, 89900],
      ["512GB", 67000, 109900]
    ]),
    specs: {
      chip: "A18 • 8GB RAM",
      display: "6.1\" Super Retina XDR OLED",
      camera: "48MP Fusion 2x Telephoto",
      box: "Original Packaging Included"
    }
  },
  {
    id: "iphone-16e",
    name: "Apple iPhone 16e",
    series: "iPhone 16 Series",
    generation: 16,
    formFactor: "e-Series",
    ram: "8GB RAM",
    badge: "Value Flagship",
    image: IMG.iphone16Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "94% – 100% Health",
    warranty: "6 Months Store Warranty",
    colors: [
      { name: "Black", hex: "#1f2022" },
      { name: "White", hex: "#f4f4f6" }
    ],
    variants: makeVariants([
      ["128GB", 42000, 59900],
      ["256GB", 46000, 69900],
      ["512GB", 52000, 89900]
    ]),
    specs: {
      chip: "A18 • 8GB RAM with C1 Modem",
      display: "6.1\" Super Retina XDR OLED",
      camera: "48MP 2-in-1 Fusion Camera",
      box: "Store Verified Box & Cable"
    }
  },

  // =========================================================
  // iPHONE 15 SERIES (15, 15 Plus, 15 Pro, 15 Pro Max)
  // =========================================================
  {
    id: "iphone-15-pro-max",
    name: "Apple iPhone 15 Pro Max",
    series: "iPhone 15 Series",
    generation: 15,
    formFactor: "Pro Max",
    ram: "8GB RAM",
    badge: "Top Selling Titanium",
    image: IMG.iphone15ProMax,
    condition: "Fair / Good / Superb",
    batteryHealth: "89% – 97% Original",
    warranty: "6 Months Store Warranty",
    colors: [
      { name: "Natural Titanium", hex: "#aba69e" },
      { name: "Blue Titanium", hex: "#2f3742" },
      { name: "White Titanium", hex: "#f2f1ed" },
      { name: "Black Titanium", hex: "#3c3c3e" }
    ],
    variants: makeVariants([
      ["256GB", 75500, 159900],
      ["512GB", 82000, 179900],
      ["1TB", 89000, 199900]
    ]),
    specs: {
      chip: "A17 Pro 3nm • 8GB RAM",
      display: "6.7\" Dynamic Island 120Hz Always-On",
      camera: "48MP Main + 5x Optical Periscope Zoom",
      box: "With Box & Fast USB-C Cable"
    }
  },
  {
    id: "iphone-15-pro",
    name: "Apple iPhone 15 Pro",
    series: "iPhone 15 Series",
    generation: 15,
    formFactor: "Pro",
    ram: "8GB RAM",
    badge: "Pro Value Pick",
    image: IMG.iphone15Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "89% – 96% Original",
    warranty: "6 Months Store Warranty",
    colors: [
      { name: "Black Titanium", hex: "#3c3c3e" },
      { name: "Natural Titanium", hex: "#aba69e" },
      { name: "Blue Titanium", hex: "#2f3742" },
      { name: "White Titanium", hex: "#f2f1ed" }
    ],
    variants: makeVariants([
      ["128GB", 64500, 134900],
      ["256GB", 69000, 144900],
      ["512GB", 75000, 164900],
      ["1TB", 81000, 184900]
    ]),
    specs: {
      chip: "A17 Pro • 8GB RAM",
      display: "6.1\" Super Retina XDR ProMotion",
      camera: "48MP Triple Lens with Action Button",
      box: "Original Box with IMEI Bill"
    }
  },
  {
    id: "iphone-15-plus",
    name: "Apple iPhone 15 Plus",
    series: "iPhone 15 Series",
    generation: 15,
    formFactor: "Plus",
    ram: "6GB RAM",
    badge: "6.7\" Dynamic Island",
    image: IMG.iphone15Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "89% – 96%",
    warranty: "6 Months Store Warranty",
    colors: [
      { name: "Blue", hex: "#d5dde0" },
      { name: "Pink", hex: "#ebd0d2" },
      { name: "Green", hex: "#d0d9ca" },
      { name: "Yellow", hex: "#ece6c2" },
      { name: "Black", hex: "#35393b" }
    ],
    variants: makeVariants([
      ["128GB", 47500, 79900],
      ["256GB", 51500, 89900],
      ["512GB", 57000, 109900]
    ]),
    specs: {
      chip: "A16 Bionic • 6GB RAM",
      display: "6.7\" Dynamic Island Super Retina XDR",
      camera: "48MP Main + 2x Telephoto",
      box: "Box Pack with USB-C Cable"
    }
  },
  {
    id: "iphone-15",
    name: "Apple iPhone 15",
    series: "iPhone 15 Series",
    generation: 15,
    formFactor: "Standard",
    ram: "6GB RAM",
    badge: "USB-C Best Buy",
    image: IMG.iphone15Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "89% – 96%",
    warranty: "6 Months Store Warranty",
    colors: [
      { name: "Black", hex: "#35393b" },
      { name: "Pink", hex: "#ebd0d2" },
      { name: "Blue", hex: "#d5dde0" },
      { name: "Green", hex: "#d0d9ca" },
      { name: "Yellow", hex: "#ece6c2" }
    ],
    variants: makeVariants([
      ["128GB", 43500, 69900],
      ["256GB", 47500, 79900],
      ["512GB", 53000, 99900]
    ]),
    specs: {
      chip: "A16 Bionic • 6GB RAM",
      display: "6.1\" Dynamic Island Super Retina",
      camera: "48MP 2x Telephoto Sensor",
      box: "Box Pack with Cable"
    }
  },

  // =========================================================
  // iPHONE 14 SERIES (14, 14 Plus, 14 Pro, 14 Pro Max)
  // =========================================================
  {
    id: "iphone-14-pro-max",
    name: "Apple iPhone 14 Pro Max",
    series: "iPhone 14 Series",
    generation: 14,
    formFactor: "Pro Max",
    ram: "6GB RAM",
    badge: "Deep Purple Classic",
    image: IMG.iphone14Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "87% – 95%",
    warranty: "Store Warranty + Invoice",
    colors: [
      { name: "Deep Purple", hex: "#594f63" },
      { name: "Space Black", hex: "#403e3d" },
      { name: "Gold", hex: "#f4e8ce" },
      { name: "Silver", hex: "#f0f2f2" }
    ],
    variants: makeVariants([
      ["128GB", 58000, 139900],
      ["256GB", 62500, 149900],
      ["512GB", 68000, 169900],
      ["1TB", 73500, 189900]
    ]),
    specs: {
      chip: "A16 Bionic • 6GB RAM",
      display: "6.7\" Dynamic Island 120Hz ProMotion",
      camera: "48MP Pro Triple Camera System",
      box: "With Box and Store Warranty"
    }
  },
  {
    id: "iphone-14-pro",
    name: "Apple iPhone 14 Pro",
    series: "iPhone 14 Series",
    generation: 14,
    formFactor: "Pro",
    ram: "6GB RAM",
    badge: "Pro Dynamic Island",
    image: IMG.iphone14Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "87% – 95%",
    warranty: "Store Warranty + Invoice",
    colors: [
      { name: "Deep Purple", hex: "#594f63" },
      { name: "Space Black", hex: "#403e3d" },
      { name: "Gold", hex: "#f4e8ce" },
      { name: "Silver", hex: "#f0f2f2" }
    ],
    variants: makeVariants([
      ["128GB", 51500, 129900],
      ["256GB", 55500, 139900],
      ["512GB", 60500, 159900],
      ["1TB", 66000, 179900]
    ]),
    specs: {
      chip: "A16 Bionic • 6GB RAM",
      display: "6.1\" Dynamic Island 120Hz Always-On",
      camera: "48MP Main + 3x Optical Telephoto",
      box: "Store Bill & Lightning Cable"
    }
  },
  {
    id: "iphone-14-plus",
    name: "Apple iPhone 14 Plus",
    series: "iPhone 14 Series",
    generation: 14,
    formFactor: "Plus",
    ram: "6GB RAM",
    badge: "Max Battery Value",
    image: IMG.iphone14Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "87% – 94%",
    warranty: "Store Warranty + Bill",
    colors: [
      { name: "Blue", hex: "#a0b4c7" },
      { name: "Purple", hex: "#e6ddeb" },
      { name: "Midnight", hex: "#1c2329" },
      { name: "Starlight", hex: "#faf6f2" },
      { name: "Yellow", hex: "#fff078" },
      { name: "Product RED", hex: "#fc0324" }
    ],
    variants: makeVariants([
      ["128GB", 36500, 79900],
      ["256GB", 40000, 89900],
      ["512GB", 44500, 109900]
    ]),
    specs: {
      chip: "A15 Bionic 5-Core GPU • 6GB RAM",
      display: "6.7\" Super Retina XDR OLED",
      camera: "Dual 12MP Photonic Engine + Action Mode",
      box: "Box Pack + Charging Cable"
    }
  },
  {
    id: "iphone-14",
    name: "Apple iPhone 14",
    series: "iPhone 14 Series",
    generation: 14,
    formFactor: "Standard",
    ram: "6GB RAM",
    badge: "Everyday Budget King",
    image: IMG.iphone14Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "87% – 94%",
    warranty: "Store Warranty + Bill",
    colors: [
      { name: "Midnight", hex: "#1c2329" },
      { name: "Starlight", hex: "#faf6f2" },
      { name: "Blue", hex: "#a0b4c7" },
      { name: "Purple", hex: "#e6ddeb" },
      { name: "Yellow", hex: "#fff078" },
      { name: "Product RED", hex: "#fc0324" }
    ],
    variants: makeVariants([
      ["128GB", 32500, 69900],
      ["256GB", 36000, 79900],
      ["512GB", 40500, 99900]
    ]),
    specs: {
      chip: "A15 Bionic 5-Core GPU • 6GB RAM",
      display: "6.1\" Super Retina XDR OLED",
      camera: "Dual 12MP with Photonic Engine",
      box: "Box Pack + Charging Cable"
    }
  },

  // =========================================================
  // iPHONE 13 SERIES (13 mini, 13, 13 Pro, 13 Pro Max)
  // =========================================================
  {
    id: "iphone-13-pro-max",
    name: "Apple iPhone 13 Pro Max",
    series: "iPhone 13 Series",
    generation: 13,
    formFactor: "Pro Max",
    ram: "6GB RAM",
    badge: "All-Time Best Seller",
    image: IMG.iphone13Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "86% – 93%",
    warranty: "Store Warranty Included",
    colors: [
      { name: "Sierra Blue", hex: "#9bb5ce" },
      { name: "Alpine Green", hex: "#576856" },
      { name: "Graphite", hex: "#5c5b57" },
      { name: "Gold", hex: "#fae7cf" },
      { name: "Silver", hex: "#f1f2ed" }
    ],
    variants: makeVariants([
      ["128GB", 49000, 129900],
      ["256GB", 53000, 139900],
      ["512GB", 57500, 159900],
      ["1TB", 62000, 179900]
    ]),
    specs: {
      chip: "A15 Bionic 5-Core GPU • 6GB RAM",
      display: "6.7\" ProMotion 120Hz OLED",
      camera: "12MP Pro Triple Lens with Macro Photography",
      box: "Original Bill + Cable"
    }
  },
  {
    id: "iphone-13-pro",
    name: "Apple iPhone 13 Pro",
    series: "iPhone 13 Series",
    generation: 13,
    formFactor: "Pro",
    ram: "6GB RAM",
    badge: "Sierra Blue Edition",
    image: IMG.iphone13Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "86% – 93%",
    warranty: "Store Warranty Included",
    colors: [
      { name: "Sierra Blue", hex: "#9bb5ce" },
      { name: "Alpine Green", hex: "#576856" },
      { name: "Graphite", hex: "#5c5b57" },
      { name: "Gold", hex: "#fae7cf" },
      { name: "Silver", hex: "#f1f2ed" }
    ],
    variants: makeVariants([
      ["128GB", 44000, 119900],
      ["256GB", 47500, 129900],
      ["512GB", 51500, 149900],
      ["1TB", 56000, 169900]
    ]),
    specs: {
      chip: "A15 Bionic Pro • 6GB RAM",
      display: "6.1\" ProMotion 120Hz OLED",
      camera: "12MP Triple Pro Camera + ProRes Video",
      box: "Original Bill + Fast Cable"
    }
  },
  {
    id: "iphone-13",
    name: "Apple iPhone 13",
    series: "iPhone 13 Series",
    generation: 13,
    formFactor: "Standard",
    ram: "4GB RAM",
    badge: "Most Demanded Buy",
    image: IMG.iphone13Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "86% – 92%",
    warranty: "Store Warranty Included",
    colors: [
      { name: "Midnight", hex: "#1d242b" },
      { name: "Starlight", hex: "#f0ece1" },
      { name: "Blue", hex: "#276787" },
      { name: "Pink", hex: "#faddd7" },
      { name: "Green", hex: "#394c38" },
      { name: "Product RED", hex: "#bf0013" }
    ],
    variants: makeVariants([
      ["128GB", 27500, 69900],
      ["256GB", 30500, 79900],
      ["512GB", 34000, 99900]
    ]),
    specs: {
      chip: "A15 Bionic • 4GB RAM",
      display: "6.1\" Super Retina OLED Display",
      camera: "Dual 12MP Cinematic 4K Recording",
      box: "Original Bill + Cable"
    }
  },
  {
    id: "iphone-13-mini",
    name: "Apple iPhone 13 mini",
    series: "iPhone 13 Series",
    generation: 13,
    formFactor: "mini",
    ram: "4GB RAM",
    badge: "Compact 5.4\" Flagship",
    image: IMG.iphone13Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "86% – 92%",
    warranty: "Store Warranty Included",
    colors: [
      { name: "Pink", hex: "#faddd7" },
      { name: "Midnight", hex: "#1d242b" },
      { name: "Starlight", hex: "#f0ece1" },
      { name: "Blue", hex: "#276787" },
      { name: "Green", hex: "#394c38" },
      { name: "Product RED", hex: "#bf0013" }
    ],
    variants: makeVariants([
      ["128GB", 25000, 64900],
      ["256GB", 28000, 74900],
      ["512GB", 31500, 94900]
    ]),
    specs: {
      chip: "A15 Bionic • 4GB RAM",
      display: "5.4\" Super Retina XDR Compact Display",
      camera: "Dual 12MP Sensor-Shift OIS",
      box: "Original Bill + Cable"
    }
  },

  // =========================================================
  // iPHONE 12 SERIES (12 mini, 12, 12 Pro, 12 Pro Max)
  // =========================================================
  {
    id: "iphone-12-pro-max",
    name: "Apple iPhone 12 Pro Max",
    series: "iPhone 12 Series",
    generation: 12,
    formFactor: "Pro Max",
    ram: "6GB RAM",
    badge: "Pacific Blue Icon",
    image: IMG.iphone12Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "85% – 91%",
    warranty: "Store Warranty Included",
    colors: [
      { name: "Pacific Blue", hex: "#2d4a5a" },
      { name: "Gold", hex: "#f3e3c9" },
      { name: "Graphite", hex: "#41403e" },
      { name: "Silver", hex: "#e3e4e0" }
    ],
    variants: makeVariants([
      ["128GB", 34000, 129900],
      ["256GB", 37500, 139900],
      ["512GB", 41000, 159900]
    ]),
    specs: {
      chip: "A14 Bionic 5G • 6GB RAM",
      display: "6.7\" Super Retina XDR OLED",
      camera: "Triple 12MP + LiDAR Scanner",
      box: "With Bill & Cable"
    }
  },
  {
    id: "iphone-12-pro",
    name: "Apple iPhone 12 Pro",
    series: "iPhone 12 Series",
    generation: 12,
    formFactor: "Pro",
    ram: "6GB RAM",
    badge: "Stainless Steel Pro",
    image: IMG.iphone12Pro,
    condition: "Fair / Good / Superb",
    batteryHealth: "85% – 91%",
    warranty: "Store Warranty Included",
    colors: [
      { name: "Pacific Blue", hex: "#2d4a5a" },
      { name: "Graphite", hex: "#41403e" },
      { name: "Gold", hex: "#f3e3c9" },
      { name: "Silver", hex: "#e3e4e0" }
    ],
    variants: makeVariants([
      ["128GB", 29000, 119900],
      ["256GB", 32000, 129900],
      ["512GB", 35500, 149900]
    ]),
    specs: {
      chip: "A14 Bionic 5G • 6GB RAM",
      display: "6.1\" Super Retina XDR OLED",
      camera: "Triple 12MP ProRAW + LiDAR",
      box: "With Bill & Cable"
    }
  },
  {
    id: "iphone-12",
    name: "Apple iPhone 12",
    series: "iPhone 12 Series",
    generation: 12,
    formFactor: "Standard",
    ram: "4GB RAM",
    badge: "Affordable 5G Entry",
    image: IMG.iphone12Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "85% – 90%",
    warranty: "Store Warranty Included",
    colors: [
      { name: "Black", hex: "#1c1c1e" },
      { name: "White", hex: "#f5f5f7" },
      { name: "Blue", hex: "#1e4b85" },
      { name: "Green", hex: "#d8efd3" },
      { name: "Purple", hex: "#b8afe6" },
      { name: "Product RED", hex: "#bf0013" }
    ],
    variants: makeVariants([
      ["64GB", 20000, 65900],
      ["128GB", 22500, 70900],
      ["256GB", 25000, 80900]
    ]),
    specs: {
      chip: "A14 Bionic 5G • 4GB RAM",
      display: "6.1\" Super Retina XDR OLED",
      camera: "Dual 12MP Night Mode on all cameras",
      box: "With Bill & Cable"
    }
  },
  {
    id: "iphone-12-mini",
    name: "Apple iPhone 12 mini",
    series: "iPhone 12 Series",
    generation: 12,
    formFactor: "mini",
    ram: "4GB RAM",
    badge: "Pocket 5G Classic",
    image: IMG.iphone12Lineup,
    condition: "Fair / Good / Superb",
    batteryHealth: "85% – 90%",
    warranty: "Store Warranty Included",
    colors: [
      { name: "Blue", hex: "#1e4b85" },
      { name: "Purple", hex: "#b8afe6" },
      { name: "Black", hex: "#1c1c1e" },
      { name: "White", hex: "#f5f5f7" },
      { name: "Green", hex: "#d8efd3" },
      { name: "Product RED", hex: "#bf0013" }
    ],
    variants: makeVariants([
      ["64GB", 18000, 59900],
      ["128GB", 20500, 64900],
      ["256GB", 23500, 74900]
    ]),
    specs: {
      chip: "A14 Bionic 5G • 4GB RAM",
      display: "5.4\" Super Retina XDR OLED",
      camera: "Dual 12MP Ultra Wide + Night Mode",
      box: "With Bill & Cable"
    }
  }
];

const products = rawProducts.map((p) => {
  const firstVariant = p.variants[0];
  return {
    ...p,
    edition: p.colors.map((c) => c.name).join(" / "),
    storageOptions: p.variants.map((v) => v.storage),
    cashifyBasePrice: firstVariant.cashifyPrice,
    storeBasePrice: firstVariant.storePrice,
    price: firstVariant.storePriceFormatted,
    cashifyPrice: firstVariant.cashifyPriceFormatted,
    originalPrice: firstVariant.originalPriceFormatted,
    savings: firstVariant.savingsFormatted
  };
});

export const storeData = {
  storeInfo: {
    name: "Sikandar's Mobile Store",
    legalName: "“Sikandar’s Mobile Store - Certified Pre-Owned iPhones”",
    tagline: "Hyderabad's Premier Obsidian Showroom for Certified Pre-Owned iPhones (iPhone 12 to iPhone 18 Pro Max)",
    badge: "Official Abids & Koti iPhone Showroom",
    rating: 4.9,
    reviewsCount: "242+",
    establishedYear: "2003",
    experienceYears: "20+ Years in Jagdish Market",
    phone: "+91 9700317171",
    phoneRaw: "+919700317171",
    whatsapp: "919700317171",
    cashifyAppUrl: CASHIFY_APP_URL,
    markupAmount: STORE_MARKUP_INR,
    address: "Chirag Ali Lane, Jagdish Market (Abids & Koti Junction), Hyderabad, Telangana - 500001",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sikandars+Mobile+Store+Jagdish+Market+Hyderabad&query_place_id=ChIJl2rsVn2XyzsR8pnP9WROa7E",
    googleReviewWriteUrl: "https://search.google.com/local/writereview?placeid=ChIJl2rsVn2XyzsR8pnP9WROa7E",
    instagram: {
      handle: "@sikandarsmobilestore",
      username: "sikandarsmobilestore",
      url: "https://www.instagram.com/sikandarsmobilestore?mdxt=MXI3czN0eHl1NTNvbw==",
      bio: "📍 Chirag Ali Lane, Jagdish Market, Abids & Koti, Hyderabad | Buy Certified Pre-Owned iPhones (12 to 18 Pro Max) • All Colors & Variants • Cashify App + ₹500 Transparent Store Pricing | 📞 +91 9700317171",
      followersCount: "15.4K+",
      postsCount: "350+",
      verifiedBadge: true
    },
    workingHours: [
      { day: "Monday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Tuesday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Wednesday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Thursday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Friday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Saturday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Sunday", time: "Closed / By Appointment", status: "Appointment" }
    ]
  },

  instagramReels: [
    {
      id: "reel-1",
      title: "iPhone 18 Pro & 16 Pro Max Titanium Stock Ready!",
      caption: "Fresh certified units just landed at Jagdish Market! Every iPhone from 12 mini to 18 Pro Max in all colors, RAM & storage variants. Transparent Cashify App + ₹500 showroom pricing! 📱✨",
      thumbnail: IMG.iphone18Pro,
      views: "52.4K",
      likes: "3.8K",
      audio: "Original Audio – Sikandar Bhai",
      duration: "0:45",
      tag: "Fresh Buy Stock",
      instagramUrl: "https://www.instagram.com/sikandarsmobilestore?mdxt=MXI3czN0eHl1NTNvbw=="
    },
    {
      id: "reel-2",
      title: "Unbeatable Buy Pricing: Cashify App + ₹500 Only!",
      caption: "See the price on Cashify App, pay just ₹500 more at our Abids counter for instant physical inspection, 3uTools report, and 6-month store warranty. Zero waiting! 🤝💵",
      thumbnail: IPHONE_16_PRO_MAX_IMAGES.storeBoxStock,
      views: "64.8K",
      likes: "5.1K",
      audio: "Trending Audio – Hyderabad Tech Beats",
      duration: "0:58",
      tag: "Price Transparency",
      instagramUrl: "https://www.instagram.com/sikandarsmobilestore?mdxt=MXI3czN0eHl1NTNvbw=="
    },
    {
      id: "reel-3",
      title: "Live 3uTools Verification Before You Buy",
      caption: "Check original battery cycles, TrueTone, FaceID, RAM, and serial numbers on the big monitor before paying a single rupee. 100% genuine Apple parts guaranteed. 🛠️",
      thumbnail: IPHONE_16_PRO_MAX_IMAGES.storeInspectionDesk,
      views: "38.1K",
      likes: "2.9K",
      audio: "Tech Voiceover – Sikandar Bhai",
      duration: "1:10",
      tag: "3uTools Verified",
      instagramUrl: "https://www.instagram.com/sikandarsmobilestore?mdxt=MXI3czN0eHl1NTNvbw=="
    },
    {
      id: "reel-4",
      title: "iPhone 12, 13, 14 & 15 Full Color & Storage Showcase",
      caption: "Every mini, Standard, Plus, Pro, and Pro Max in Fair, Good & Superb grades ready for same-day pickup in Abids or 2-hour delivery across Hyderabad! 🔥 #BuyiPhoneHyderabad",
      thumbnail: IPHONE_16_PRO_MAX_IMAGES.storeCounterStock,
      views: "59.0K",
      likes: "4.4K",
      audio: "Original Sound – Sikandar Store Vlogs",
      duration: "0:52",
      tag: "All Variants In-Stock",
      instagramUrl: "https://www.instagram.com/sikandarsmobilestore?mdxt=MXI3czN0eHl1NTNvbw=="
    }
  ],

  products,

  reviews: [
    {
      id: "rev-1",
      name: "Sharukuddin Shaik",
      date: "October 13, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVR8WC7xJGFf2BgONdUBaP8iQzRLvnkPvHDpdGMrt-dgzNjTOl6JQ=s120-c-rp-mo-br100",
      badge: "Verified iPhone Buyer",
      devicePurchased: "iPhone 16 Pro Max",
      category: "iPhone Purchase",
      text: "Had a great experience purchasing the iPhone from this shop! The staff were friendly, professional, and helpful throughout the purchase. They explained everything clearly and made the buying experience smooth and hassle-free. Highly recommended for anyone planning to buy an iPhone! 📱✨ (SIKANDAR BHAI)",
      likes: 18,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-2",
      name: "Md Jalal Uddin Mondal",
      date: "September 19, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocKwp7orOom2yJXdCWJoZCDQyV2QDg66ml_B_TzbbbmhFKnwcQ=s120-c-rp-mo-br100",
      badge: "Regular Customer Since 2003",
      devicePurchased: "iPhone 15 Pro Max",
      category: "iPhone Purchase",
      text: "Best iphone store in hyderabad, trusted store since 2003. Sikandar Bhai gives 100% genuine phones with authentic battery health and honest 3uTools testing right in front of you.",
      likes: 15,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-3",
      name: "kprc kprc",
      date: "October 13, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWdwgwVfggSG8uAye155fhgeOO2hmAN_xOHTQKnkyq5XBdt42avXg=s120-c-rp-mo-ba12-br100",
      badge: "Local Guide",
      devicePurchased: "iPhone Pro Series",
      category: "iPhone Purchase",
      text: "Good Customer Service Specialized in Iphones. Got transparent pricing (matched online app rate with nominal store margin) and genuine tested phone with 3uTools report on the spot. No hidden charges.",
      likes: 12,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-4",
      name: "Narasimhulu Narasimhulu",
      date: "October 13, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWrK7GYDkF9ZKPXNI8avjfMiZHIE37G-5m7J1L671AccJ3-SavI=s120-c-rp-mo-br100",
      badge: "Customer Since 2013",
      devicePurchased: "Multiple iPhone Purchases",
      category: "Repeat Buyer",
      text: "Very good experience coming since 2013. Superb shop in Jagdish Market, Sikandar Bhai is the only trusted person I buy Apple products from.",
      likes: 14,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-5",
      name: "Jude Samuel",
      date: "October 8, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocJIgLeXyab61Dsdggx8lzrZCaIVauLkIMQRyPR-dxhqEwrV7g=s120-c-rp-mo-br100",
      badge: "Verified Buyer",
      devicePurchased: "iPhone 14 Pro Max",
      category: "iPhone Purchase",
      text: "One of the best places in Hyd for buying certified iPhones. Every color and storage option was ready right on the counter to inspect before buying.",
      likes: 9,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-6",
      name: "NIKHIL KUMAR BILLA",
      date: "August 13, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocJzK-Z8LQI0rycdnJSHNgYfP18dQhRHXkNA5_z9TuZShMeV3Q=s120-c-rp-mo-br100",
      badge: "Verified Buyer",
      devicePurchased: "iPhone 13 Pro",
      category: "Repeat Buyer",
      text: "Easy, Rapid, stress free store. Must to go store for buying phones with completely transparent pricing and 6 month warranty bill.",
      likes: 11,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-7",
      name: "Imran Khan",
      date: "August 1, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVR8WC7xJGFf2BgONdUBaP8iQzRLvnkPvHDpdGMrt-dgzNjTOl6JQ=s120-c-rp-mo-br100",
      badge: "Verified Buyer",
      devicePurchased: "iPhone Pro Max",
      category: "iPhone Purchase",
      text: "Exceptionally Reliable and dependable. Transferred my entire WhatsApp, iCloud, and contacts in 10 minutes right at the counter. 10/10 buying experience.",
      likes: 13,
      verifiedSource: "Google Maps Verified"
    }
  ],

  ratingsOverview: {
    average: 4.9,
    totalCount: 242,
    recommendRate: "99.4%",
    starsBreakdown: [
      { stars: 5, percentage: 94, count: 228 },
      { stars: 4, percentage: 5, count: 12 },
      { stars: 3, percentage: 1, count: 2 },
      { stars: 2, percentage: 0, count: 0 },
      { stars: 1, percentage: 0, count: 0 }
    ],
    trustPillars: [
      { label: "100% Original Apple Parts", score: "5.0" },
      { label: "True Battery Health Accuracy", score: "4.9" },
      { label: "Transparent Cashify + ₹500 Pricing", score: "5.0" },
      { label: "6-Month Store Warranty", score: "4.9" }
    ]
  },

  gallery: [
    {
      url: IPHONE_16_PRO_MAX_IMAGES.storeBoxStock,
      caption: "Sealed & Grade A+ iPhone Pro Max Stock Showcase",
      category: "Stock"
    },
    {
      url: IPHONE_16_PRO_MAX_IMAGES.storeCounterStock,
      caption: "Certified Pre-Owned iPhone 12 to 18 Series Counter",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/Ej36echLGGpDrc0y0PtYJmAjLZMwUNOC8gDQRQcMc2KJQZEQISPbke9JNLPJwaUTGrd9GbN12pFlZsaV1w=w600-rw",
      caption: "Storefront at Jagdish Market, Abids & Koti",
      category: "Store"
    },
    {
      url: IPHONE_16_PRO_MAX_IMAGES.storeInspectionDesk,
      caption: "3uTools Live Verification & Buyer Testing Desk",
      category: "Inspection"
    },
    {
      url: "https://lh3.googleusercontent.com/LOQhCbRncxuMeU4lMe8hZCQVyS7vZc_DalfJqTZnrWqDOkKKTkRXfj_TfFCl41-xAyEjAWe30BIOOanyMg=w600-rw",
      caption: "Original Box Packs & Charging Accessories",
      category: "Accessories"
    },
    {
      url: "https://lh3.googleusercontent.com/S_gadSVQN1zPDmJ4587gmax4pwdJM9YM6CxYaX-tSZI4ecffhnuHoSX0eLUsv4MrKr6co-IKAUxgxC-_ow=w600-rw",
      caption: "iPhone Pro Max Lineup Ready for Buyer Pickup",
      category: "Stock"
    }
  ],

  faqs: [
    {
      q: "What do Fair, Good, and Superb conditions mean on each iPhone?",
      a: "Every iPhone is 100% original inside with zero replaced non-genuine screens or batteries. 'Fair' has light visible micro-scratches on the frame (85%–89% battery health) at our lowest price. 'Good' is clean with minimal signs of use (90%–94% battery health). 'Superb' is flawless Grade A+ like-new condition (95%–100% battery health)."
    },
    {
      q: "How is your store pricing calculated against the Cashify App?",
      a: "Our buy pricing strictly follows the live Cashify Buy App benchmark price plus just ₹500 store service margin across every condition and storage variant (for example, if a phone is ₹25,000 in the app, our store price is ₹25,500). In return, you get face-to-face 3uTools verification, immediate handover at Abids, and 6 months store warranty."
    },
    {
      q: "Which iPhone models, RAM, colors, and storage variants are listed?",
      a: "We list all 28 Apple iPhones from iPhone 12 mini (4GB RAM) through iPhone 18 Pro Max (12GB RAM) — covering every mini, Standard, Plus, e, Air, Pro, and Pro Max across all colors and 64GB, 128GB, 256GB, 512GB, 1TB, and 2TB capacities."
    },
    {
      q: "Can I save Favorites and add multiple variants to my Cart?",
      a: "Yes! Tap the heart icon on any iPhone card to save it to your Favorites list, or select your exact Condition (Fair/Good/Superb), Color, and Storage variant and click 'Add to Cart' to review your total or reserve directly on WhatsApp."
    }
  ],

  posts: [
    {
      id: "post-1",
      title: "Full Store App Experience: Search, Sort, Filters, Cart & Favorites Live!",
      date: "November 12, 2026",
      tag: "App Update",
      image: IMG.iphone18Pro,
      summary: "Filter all 28 iPhones by RAM (4GB–12GB), Storage (64GB–2TB), Condition (Fair/Good/Superb), Price & Color swatches."
    },
    {
      id: "post-2",
      title: "Cashify App Price + ₹500 Transparent Store Guarantee",
      date: "November 10, 2026",
      tag: "Price Guarantee",
      image: IPHONE_16_PRO_MAX_IMAGES.heroDuo,
      summary: "Pick your exact iPhone model at Jagdish Market for just ₹500 above Cashify App pricing with instant live testing."
    },
    {
      id: "post-3",
      title: "100% 3uTools Verified Battery Health & Original Parts Check",
      date: "November 6, 2026",
      tag: "Buyer Assurance",
      image: IPHONE_16_PRO_MAX_IMAGES.storeInspectionDesk,
      summary: "Every iPhone passes our rigorous physical & diagnostic inspection at Abids Shopping Center before handover."
    }
  ]
};

export const createWhatsAppUrl = (message) => {
  const phone = storeData.storeInfo.whatsapp;
  const encoded = encodeURIComponent(
    message ||
      `Hi Sikandar Bhai, I want to buy a certified pre-owned iPhone from your Abids store.`
  );
  return `https://wa.me/${phone}?text=${encoded}`;
};
