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

// Verified Full-Phone Studio Cutouts & Product Images from Store Stock
export const IPHONE_16_PRO_MAX_IMAGES = {
  heroDuo: "/images/store-stock/iphone-16-pro-max-trio-usa.jpg",
  finishLineup: "/images/store-stock/iphone-16-pro-max-desert-box-angle1.jpg",
  desertCutout: "/images/store-stock/iphone-16-pro-max-desert-emblem.jpg",
  screenCutout: "/images/store-stock/iphone-16-pro-max-desert-box-angle2.jpg",
  iphone17Studio: "/images/store-stock/iphone-17-green-256gb.jpg",
  iphone15Studio: "/images/store-stock/iphone-15-pro-black-titanium.jpg",
};

export const STORE_STOCK_IMG = {
  // iPhone 16 Pro photos — placed in iPhone 16 Pro Max section only as requested
  iphone16ProMaxTrio: "/images/store-stock/iphone-16-pro-max-trio-usa.jpg",
  iphone16ProMaxDesertAngle1: "/images/store-stock/iphone-16-pro-max-desert-box-angle1.jpg",
  iphone16ProMaxDesertAngle2: "/images/store-stock/iphone-16-pro-max-desert-box-angle2.jpg",
  iphone16ProMaxDesertEmblem: "/images/store-stock/iphone-16-pro-max-desert-emblem.jpg",

  // iPhone 18 Series photos
  iphone18ProMaxBurgundyBox: "/images/store-stock/iphone-18-pro-max-burgundy-box.jpg",
  iphone18ProWhite: "/images/store-stock/iphone-18-pro-max-white.jpg",

  // iPhone 17 Series photos
  iphone17Green256gb: "/images/store-stock/iphone-17-green-256gb.jpg",

  // iPhone 16 Series photos
  iphone16WhiteBox: "/images/store-stock/iphone-16-white-box.jpg",
  iphone16WhiteGreenDuo: "/images/store-stock/iphone-16-white-green-duo.jpg",

  // iPhone 15 Series photos
  iphone15ProBlackTitanium: "/images/store-stock/iphone-15-pro-black-titanium.jpg",

  // iPhone 14 Series photos
  iphone14PlusBlue128gb: "/images/store-stock/iphone-14-plus-blue-128gb.jpg",
  iphone14PurpleClean: "/images/store-stock/iphone-14-purple-clean.jpg",
  iphone14Purple128gbBanner: "/images/store-stock/iphone-14-purple-128gb-banner.jpg",

  // Samsung Galaxy Android Exchange photos
  samsungGalaxyS24Ultra: "/images/store-stock/samsung-galaxy-s24-ultra.jpg",
  samsungGalaxyZFold7: "/images/store-stock/samsung-galaxy-z-fold7.jpg",
};

const IMG = {
  iphone18Pro: "/images/store-stock/iphone-18-pro-max-white.jpg",
  iphoneAir: "",
  iphone17: "/images/store-stock/iphone-17-green-256gb.jpg",
  iphone16ProMax: "/images/store-stock/iphone-16-pro-max-trio-usa.jpg",
  iphone16Pro: "",
  iphone16Lineup: "/images/store-stock/iphone-16-white-box.jpg",
  iphone15ProMax: "/images/store-stock/iphone-15-pro-black-titanium.jpg",
  iphone15Pro: "/images/store-stock/iphone-15-pro-black-titanium.jpg",
  iphone15Lineup: "/images/store-stock/iphone-15-pro-black-titanium.jpg",
  iphone14Pro: "",
  iphone14Lineup: "/images/store-stock/iphone-14-purple-clean.jpg",
  iphone13Pro: "",
  iphone13Lineup: "/images/store-stock/iphone-13-green-128gb.jpg",
  iphone12Pro: "",
  iphone12Lineup: ""
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
    image: STORE_STOCK_IMG.iphone18ProMaxBurgundyBox,
    galleryImages: [
      STORE_STOCK_IMG.iphone18ProMaxBurgundyBox,
      STORE_STOCK_IMG.iphone18ProWhite,
    ],
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
    image: STORE_STOCK_IMG.iphone18ProWhite,
    galleryImages: [
      STORE_STOCK_IMG.iphone18ProWhite,
      STORE_STOCK_IMG.iphone18ProMaxBurgundyBox,
    ],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: STORE_STOCK_IMG.iphone17Green256gb,
    galleryImages: [
      STORE_STOCK_IMG.iphone17Green256gb,
    ],
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
    image: "",
    galleryImages: [],
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
    image: STORE_STOCK_IMG.iphone16ProMaxTrio,
    galleryImages: [
      STORE_STOCK_IMG.iphone16ProMaxTrio,
      STORE_STOCK_IMG.iphone16ProMaxDesertAngle1,
      STORE_STOCK_IMG.iphone16ProMaxDesertAngle2,
      STORE_STOCK_IMG.iphone16ProMaxDesertEmblem,
    ],
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
    image: "",
    galleryImages: [],
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
    image: STORE_STOCK_IMG.iphone16WhiteGreenDuo,
    galleryImages: [
      STORE_STOCK_IMG.iphone16WhiteGreenDuo,
      STORE_STOCK_IMG.iphone16WhiteBox,
    ],
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
    image: STORE_STOCK_IMG.iphone16WhiteBox,
    galleryImages: [
      STORE_STOCK_IMG.iphone16WhiteBox,
      STORE_STOCK_IMG.iphone16WhiteGreenDuo,
    ],
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
    image: "",
    galleryImages: [],
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
    image: STORE_STOCK_IMG.iphone15ProBlackTitanium,
    galleryImages: [
      STORE_STOCK_IMG.iphone15ProBlackTitanium,
      "/images/store-stock/iphone-15-pro-blue-titanium.jpg",
    ],
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
    image: STORE_STOCK_IMG.iphone15ProBlackTitanium,
    galleryImages: [
      STORE_STOCK_IMG.iphone15ProBlackTitanium,
      "/images/store-stock/iphone-15-pro-blue-titanium.jpg",
    ],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: STORE_STOCK_IMG.iphone14PlusBlue128gb,
    galleryImages: [
      STORE_STOCK_IMG.iphone14PlusBlue128gb,
    ],
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
    image: STORE_STOCK_IMG.iphone14PurpleClean,
    galleryImages: [
      STORE_STOCK_IMG.iphone14PurpleClean,
      STORE_STOCK_IMG.iphone14Purple128gbBanner,
    ],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: "/images/store-stock/iphone-13-green-128gb.jpg",
    galleryImages: [
      "/images/store-stock/iphone-13-green-128gb.jpg",
    ],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
    image: "",
    galleryImages: [],
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
      caption: "Fresh certified units just landed at Jagdish Market! Every iPhone from 12 mini to 18 Pro Max in all colors, RAM & storage variants. Transparent Cashify App + ₹500 showroom pricing!",
      thumbnail: STORE_STOCK_IMG.iphone18ProMaxBurgundyBox,
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
      caption: "See the price on Cashify App, pay just ₹500 more at our Abids counter for instant physical inspection, 3uTools report, and 6-month store warranty.",
      thumbnail: STORE_STOCK_IMG.iphone16ProMaxTrio,
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
      caption: "Check original battery cycles, TrueTone, FaceID, RAM, and serial numbers on the big monitor before paying a single rupee. 100% genuine Apple parts guaranteed.",
      thumbnail: STORE_STOCK_IMG.iphone15ProBlackTitanium,
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
      caption: "Every mini, Standard, Plus, Pro, and Pro Max in Fair, Good & Superb grades ready for pickup in Abids!",
      thumbnail: STORE_STOCK_IMG.iphone16WhiteBox,
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
      avatar: "",
      badge: "Verified iPhone Buyer",
      devicePurchased: "iPhone 16 Pro Max",
      category: "iPhone Purchase",
      text: "Had a great experience purchasing the iPhone from this shop! The staff were friendly, professional, and helpful throughout the purchase. They explained everything clearly and made the buying experience smooth and hassle-free. Highly recommended for anyone planning to buy an iPhone! (SIKANDAR BHAI)",
      likes: 18,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-2",
      name: "Md Jalal Uddin Mondal",
      date: "September 19, 2026",
      rating: 5,
      avatar: "",
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
      avatar: "",
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
      avatar: "",
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
      avatar: "",
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
      avatar: "",
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
      avatar: "",
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
      url: STORE_STOCK_IMG.iphone16ProMaxTrio,
      caption: "iPhone 16 Pro Max — 128GB USA Trio In Hand at Sikandar Emblem",
      category: "Pro Max",
    },
    {
      url: STORE_STOCK_IMG.iphone16ProMaxDesertAngle1,
      caption: "iPhone 16 Pro Max Desert Titanium — Retail Box Pack at Jagdish Market",
      category: "Pro Max",
    },
    {
      url: STORE_STOCK_IMG.iphone16ProMaxDesertAngle2,
      caption: "iPhone 16 Pro Max Desert Titanium — Physical Verification & Testing",
      category: "Pro Max",
    },
    {
      url: STORE_STOCK_IMG.iphone16ProMaxDesertEmblem,
      caption: "iPhone 16 Pro Max Desert Titanium — Store Emblem Showcase",
      category: "Pro Max",
    },
    {
      url: STORE_STOCK_IMG.iphone18ProMaxBurgundyBox,
      caption: "iPhone 18 Pro Max — Burgundy Box Edition In-Stock",
      category: "Stock",
    },
    {
      url: STORE_STOCK_IMG.iphone18ProWhite,
      caption: "iPhone 18 Pro — Glacier White Titanium at Emblem",
      category: "Stock",
    },
    {
      url: STORE_STOCK_IMG.iphone17Green256gb,
      caption: "iPhone 17 Sage Green 256GB — 92% Battery Health Verified",
      category: "Stock",
    },
    {
      url: STORE_STOCK_IMG.iphone16WhiteBox,
      caption: "iPhone 16 White — Box Pack at Store Counter",
      category: "Stock",
    },
    {
      url: STORE_STOCK_IMG.iphone16WhiteGreenDuo,
      caption: "iPhone 16 White & Sage Green — Pair Ready for Handover",
      category: "Stock",
    },
    {
      url: STORE_STOCK_IMG.iphone15ProBlackTitanium,
      caption: "iPhone 15 Pro — Black Titanium In Front of Store Emblem",
      category: "Stock",
    },
    {
      url: "/images/store-stock/iphone-15-pro-blue-titanium.jpg",
      caption: "iPhone 15 Pro — Blue Titanium with Retail Box at Showroom",
      category: "Stock",
    },
    {
      url: STORE_STOCK_IMG.iphone14PlusBlue128gb,
      caption: "iPhone 14 Plus Blue 128GB — 85% Battery Health Box Pack",
      category: "Stock",
    },
    {
      url: STORE_STOCK_IMG.iphone14PurpleClean,
      caption: "iPhone 14 Purple — Verified Showroom Handheld",
      category: "Stock",
    },
    {
      url: STORE_STOCK_IMG.iphone14Purple128gbBanner,
      caption: "iPhone 14 Purple 128GB — Box Pack at Jagdish Market",
      category: "Stock",
    },
    {
      url: "/images/store-stock/iphone-13-green-128gb.jpg",
      caption: "iPhone 13 Alpine Green 128GB — 90% Battery Health at Emblem",
      category: "Stock",
    },
    {
      url: "/images/store-stock/store-trophy-expert.jpg",
      caption: "Sikandar's Mobile Store — Certified iPhone Expert Award Stand",
      category: "Store",
    },
    {
      url: STORE_STOCK_IMG.samsungGalaxyS24Ultra,
      caption: "Samsung Galaxy S24 Ultra Titanium — Verified Exchange Stock",
      category: "Exchange",
    },
    {
      url: STORE_STOCK_IMG.samsungGalaxyZFold7,
      caption: "Samsung Galaxy Z Fold7 Navy — Traded for iPhone 16 Pro Max",
      category: "Exchange",
    },
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
      image: STORE_STOCK_IMG.iphone18ProWhite,
      summary: "Filter all 28 iPhones by RAM (4GB–12GB), Storage (64GB–2TB), Condition (Fair/Good/Superb), Price & Color swatches."
    },
    {
      id: "post-2",
      title: "Cashify App Price + ₹500 Transparent Store Guarantee",
      date: "November 10, 2026",
      tag: "Price Guarantee",
      image: STORE_STOCK_IMG.iphone16ProMaxTrio,
      summary: "Pick your exact iPhone model at Jagdish Market for just ₹500 above Cashify App pricing with instant live testing."
    },
    {
      id: "post-3",
      title: "100% 3uTools Verified Battery Health & Original Parts Check",
      date: "November 6, 2026",
      tag: "Buyer Assurance",
      image: STORE_STOCK_IMG.iphone15ProBlackTitanium,
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
