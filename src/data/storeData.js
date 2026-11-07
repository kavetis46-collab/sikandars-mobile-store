export const storeData = {
  storeInfo: {
    name: "Sikandar's Mobile Store",
    legalName: "“Sikandar’sMobile store - iPHONE SALES AND SERVICE”",
    tagline: "Premier Destination for Certified Pre-Owned iPhones & Precision Apple Care",
    badge: "Hyderabad's Most Trusted Independent Apple Specialist",
    rating: 4.9,
    reviewsCount: "242+",
    establishedYear: "2003",
    experienceYears: "20+ Years in Jagdish Market",
    phone: "+91 9700317171",
    phoneRaw: "+919700317171",
    whatsapp: "919700317171",
    address: "Chirag Ali Lane, Jagdish Market, Abids, Hyderabad, Telangana - 500001",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sikandars+Mobile+Store+Jagdish+Market+Hyderabad&query_place_id=ChIJl2rsVn2XyzsR8pnP9WROa7E",
    mapsEmbedUrl: "https://maps.google.com/maps?q=Sikandar's+Mobile+Store+Jagdish+Market+Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed",
    workingHours: [
      { day: "Monday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Tuesday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Wednesday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Thursday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Friday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Saturday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Sunday", time: "Closed / By Appointment", status: "Appointment" },
    ],
    features: [
      {
        icon: "ShieldCheck",
        title: "60-Point Quality Verification",
        description: "Every device passes rigorous hardware diagnostics, TrueTone checks, FaceID tests, and motherboard stress tests."
      },
      {
        icon: "BatteryCharging",
        title: "Verified Battery Health 85%+",
        description: "Zero fake battery cycle resets. Full transparency with 3uTools and genuine diagnostic logs on every purchase."
      },
      {
        icon: "Banknote",
        title: "Instant Cash & Fair Trade-In",
        description: "Get highest market valuation for your old smartphone with immediate UPI/Cash disbursement on the spot."
      },
      {
        icon: "Truck",
        title: "Doorstep Pickup & Delivery",
        description: "Can't visit Jagdish Market? We offer safe doorstep verification, delivery, and trade-in across Greater Hyderabad."
      },
      {
        icon: "Award",
        title: "Store Warranty with Official Bill",
        description: "All pre-owned devices include standard 3 to 6 months store warranty coverage with GST / authorized bill."
      },
      {
        icon: "Wrench",
        title: "On-Spot Precision Repairs",
        description: "Chip-level technicians for screen replacements, IC repair, battery replacement in 30 to 45 minutes."
      }
    ]
  },

  products: [
    {
      id: "iphone-16-pro-max",
      name: "Apple iPhone 16 Pro Max",
      category: "iPhone Pro",
      brand: "Apple",
      price: "₹1,24,999",
      originalPrice: "₹1,44,900",
      savings: "₹19,901 OFF",
      storageOptions: ["256GB", "512GB", "1TB"],
      colors: ["Desert Titanium", "Natural Titanium", "Black Titanium", "White Titanium"],
      condition: "Like New / Pristine 10/10",
      batteryHealth: "100%",
      warranty: "Apple Official Warranty + Store Guarantee",
      inStock: true,
      badge: "Trending Flagship",
      image: "https://lh3.googleusercontent.com/Y6eRQr50pTtuYEs0g55ljofWjM3HLStoYFVJCYCCaGLjwTikL9oqbS4BJ9iI4yhXWsinGnBXhDBCC7AB9w=s0",
      specs: {
        chip: "A18 Pro with 6-core GPU",
        display: "6.9-inch Super Retina XDR OLED (120Hz ProMotion)",
        camera: "48MP Fusion + 48MP Ultra Wide + 5x Telephoto",
        box: "Complete Box with Original Braided USB-C Cable",
        trueToneFaceId: "100% Working & Verified"
      }
    },
    {
      id: "iphone-15-pro-max",
      name: "Apple iPhone 15 Pro Max",
      category: "iPhone Pro",
      brand: "Apple",
      price: "₹84,999",
      originalPrice: "₹1,34,900",
      savings: "₹49,901 OFF",
      storageOptions: ["256GB", "512GB"],
      colors: ["Natural Titanium", "Blue Titanium", "White Titanium"],
      condition: "Flawless Grade A+",
      batteryHealth: "91% - 98%",
      warranty: "6 Months Store Warranty",
      inStock: true,
      badge: "Best Seller",
      image: "https://lh3.googleusercontent.com/tzJoPiFPlLtP8e9v-tfbiVPczbnslw-UU4ysdRcm_mR6QcodMM49DSpfVUo3qN2NorgyQ72tXE7DazZ1uQ=s0",
      specs: {
        chip: "A17 Pro 3nm Industry-First Chip",
        display: "6.7-inch Always-On Dynamic Island (120Hz)",
        camera: "48MP Main + 12MP 5x Optical Periscope Zoom",
        box: "Original Box + Bill + Fast Cable",
        trueToneFaceId: "100% Working Original"
      }
    },
    {
      id: "iphone-15-pro",
      name: "Apple iPhone 15 Pro",
      category: "iPhone Pro",
      brand: "Apple",
      price: "₹72,999",
      originalPrice: "₹1,19,900",
      savings: "₹46,901 OFF",
      storageOptions: ["128GB", "256GB"],
      colors: ["Black Titanium", "Natural Titanium"],
      condition: "Mint Condition (Zero Scratches)",
      batteryHealth: "92% - 97%",
      warranty: "6 Months Store Warranty",
      inStock: true,
      badge: "Compact Beast",
      image: "https://lh3.googleusercontent.com/Ej36echLGGpDrc0y0PtYJmAjLZMwUNOC8gDQRQcMc2KJQZEQISPbke9JNLPJwaUTGrd9GbN12pFlZsaV1w=s0",
      specs: {
        chip: "A17 Pro",
        display: "6.1-inch Super Retina XDR OLED ProMotion",
        camera: "48MP Triple Camera System",
        box: "With Box & Accessories",
        trueToneFaceId: "Verified Original"
      }
    },
    {
      id: "iphone-15",
      name: "Apple iPhone 15",
      category: "iPhone Standard",
      brand: "Apple",
      price: "₹49,999",
      originalPrice: "₹69,900",
      savings: "₹19,901 OFF",
      storageOptions: ["128GB", "256GB"],
      colors: ["Pink", "Black", "Blue", "Green"],
      condition: "Excellent (Grade A)",
      batteryHealth: "90% - 96%",
      warranty: "Store Warranty",
      inStock: true,
      badge: "Popular Value",
      image: "https://lh3.googleusercontent.com/LOQhCbRncxuMeU4lMe8hZCQVyS7vZc_DalfJqTZnrWqDOkKKTkRXfj_TfFCl41-xAyEjAWe30BIOOanyMg=s0",
      specs: {
        chip: "A16 Bionic Chip",
        display: "6.1-inch Dynamic Island Super Retina",
        camera: "48MP Main Camera + 2x Telephoto",
        box: "Original Box & Type-C Cable",
        trueToneFaceId: "All Original"
      }
    },
    {
      id: "iphone-14-pro-max",
      name: "Apple iPhone 14 Pro Max",
      category: "iPhone Pro",
      brand: "Apple",
      price: "₹67,999",
      originalPrice: "₹1,29,900",
      savings: "₹61,901 OFF",
      storageOptions: ["128GB", "256GB", "512GB"],
      colors: ["Deep Purple", "Space Black", "Gold"],
      condition: "Flawless Grade A+",
      batteryHealth: "88% - 94%",
      warranty: "3 Months Store Warranty",
      inStock: true,
      badge: "Fan Favorite",
      image: "https://lh3.googleusercontent.com/S_gadSVQN1zPDmJ4587gmax4pwdJM9YM6CxYaX-tSZI4ecffhnuHoSX0eLUsv4MrKr6co-IKAUxgxC-_ow=s0",
      specs: {
        chip: "A16 Bionic Chip",
        display: "6.7-inch Dynamic Island ProMotion 120Hz",
        camera: "48MP Pro Camera System",
        box: "Box Included",
        trueToneFaceId: "Guaranteed Original Parts"
      }
    },
    {
      id: "iphone-14",
      name: "Apple iPhone 14",
      category: "iPhone Standard",
      brand: "Apple",
      price: "₹38,999",
      originalPrice: "₹59,900",
      savings: "₹20,901 OFF",
      storageOptions: ["128GB", "256GB"],
      colors: ["Midnight", "Starlight", "Purple", "Blue"],
      condition: "Scratchless Certified",
      batteryHealth: "87% - 94%",
      warranty: "Store Warranty + Bill",
      inStock: true,
      badge: "Budget King",
      image: "https://lh3.googleusercontent.com/8m8AokVw7cbo3rU-Ay_Z_COktXLITGJLmOhmJqgZCdpOmhV3e6awgN4ovyh9kBXhtyM2XA-xvYRLEISGhA=s0",
      specs: {
        chip: "A15 Bionic 5-Core GPU",
        display: "6.1-inch Super Retina XDR OLED",
        camera: "Dual 12MP with Action Mode & Photonic Engine",
        box: "Box + Lightning Cable",
        trueToneFaceId: "100% Tested"
      }
    },
    {
      id: "iphone-13",
      name: "Apple iPhone 13",
      category: "iPhone Standard",
      brand: "Apple",
      price: "₹31,499",
      originalPrice: "₹49,900",
      savings: "₹18,401 OFF",
      storageOptions: ["128GB"],
      colors: ["Midnight", "Blue", "Pink", "Green"],
      condition: "Excellent Tested",
      batteryHealth: "86% - 92%",
      warranty: "Store Warranty",
      inStock: true,
      badge: "Entry Flagship",
      image: "https://lh3.googleusercontent.com/-VuECFMulcl6GsV1loRwPLSIItWHnmjubnIBojpF2bVPoLf70ajDbytqqlMZrZx6QXpkHTxK5GZ7vydTTQ=s0",
      specs: {
        chip: "A15 Bionic",
        display: "6.1-inch Super Retina OLED",
        camera: "Dual 12MP Cinematic 4K",
        box: "Includes Cable & Bill",
        trueToneFaceId: "Original Verified"
      }
    },
    {
      id: "samsung-s24-ultra",
      name: "Samsung Galaxy S24 Ultra 5G",
      category: "Android Flagship",
      brand: "Samsung",
      price: "₹82,999",
      originalPrice: "₹1,29,999",
      savings: "₹47,000 OFF",
      storageOptions: ["256GB", "512GB"],
      colors: ["Titanium Gray", "Titanium Black", "Titanium Violet"],
      condition: "Pristine Condition",
      batteryHealth: "100% Battery",
      warranty: "Samsung Official / Store Warranty",
      inStock: true,
      badge: "AI Powerhouse",
      image: "https://lh3.googleusercontent.com/oNRJ1K-ItZXlWxl8ANuTxbqBylJlRIapNEGo8RFz0m5hLP_D29M2Bfp9YY7NuMqSPZuqQkFn0UiFuW8o5g=s0",
      specs: {
        chip: "Snapdragon 8 Gen 3 for Galaxy",
        display: "6.8-inch QHD+ Dynamic AMOLED 2X 120Hz Flat",
        camera: "200MP Quad Telephoto System with AI",
        box: "Original Box + S-Pen Included",
        trueToneFaceId: "Knox 0x0 Untouched"
      }
    },
    {
      id: "oppo-find-n2",
      name: "OPPO Find N2 5G (Foldable)",
      category: "Foldables",
      brand: "OPPO",
      price: "₹48,999",
      originalPrice: "₹99,999",
      savings: "₹51,000 OFF",
      storageOptions: ["256GB", "512GB"],
      colors: ["Matte Black", "White Ceramic", "Pine Green"],
      condition: "Collector Grade Mint",
      batteryHealth: "Tested Optimal",
      warranty: "Store Warranty",
      inStock: true,
      badge: "Rare Find",
      image: "https://lh3.googleusercontent.com/PaU66r3qRrwVWDvaG2eU8DSW33NbOjWfVEbYkgpRxY0JPGIYiM-84GYi1DnGKtpWb4MnYicR9-kQqEw-KA=s0",
      specs: {
        chip: "Snapdragon 8+ Gen 1",
        display: "7.1-inch 120Hz LTPO AMOLED Inner + 5.54-inch Outer",
        camera: "50MP Hasselblad Triple Camera",
        box: "Complete Box Set with 67W Charger",
        trueToneFaceId: "Hinge Zero-Crease Checked"
      }
    },
    {
      id: "oneplus-11-5g",
      name: "OnePlus 11 5G (16GB RAM)",
      category: "Android Flagship",
      brand: "OnePlus",
      price: "₹33,999",
      originalPrice: "₹61,999",
      savings: "₹28,000 OFF",
      storageOptions: ["256GB (16GB RAM)"],
      colors: ["Eternal Green", "Titan Black"],
      condition: "Grade A+ Flawless",
      batteryHealth: "Optimal",
      warranty: "Store Warranty",
      inStock: true,
      badge: "Speed Monster",
      image: "https://lh3.googleusercontent.com/47v-oCeg3fWq-X3cHB1MNWWK5OOKLV6ZeetLUmoMQRaxHb_-Qiw-e4MdJX8WFTMSYjtPDQ484IcnyH-0ow=s0",
      specs: {
        chip: "Snapdragon 8 Gen 2",
        display: "6.7-inch 2K 120Hz Super Fluid AMOLED",
        camera: "50MP 3rd Gen Hasselblad Camera",
        box: "Includes 100W SUPERVOOC Charger",
        trueToneFaceId: "Tested"
      }
    },
    {
      id: "apple-accessories-pack",
      name: "Apple 20W Original Adapter & MagSafe Gear",
      category: "Accessories",
      brand: "Apple",
      price: "₹1,499",
      originalPrice: "₹2,900",
      savings: "50% OFF",
      storageOptions: ["Universal"],
      colors: ["White", "Clear"],
      condition: "100% Original Brand New",
      batteryHealth: "N/A",
      warranty: "1 Year Replacement Warranty",
      inStock: true,
      badge: "Must Have",
      image: "https://lh3.googleusercontent.com/_N7sPqzMuJG8qM2ThYGGeu5HmKm1dtT3KLVzcatG8WVfcpIFyvW6R8jEYYk9TzLQg-lEbDAdxKNEdE_bog=s0",
      specs: {
        chip: "Original Apple Power Management IC",
        display: "Fast Charging 0 to 50% in 28 mins",
        camera: "Certified Protection against surges",
        box: "Original Sealed Packaging",
        trueToneFaceId: "Authentic Apple Accessory"
      }
    }
  ],

  services: [
    {
      id: "apple-screen-replacement",
      title: "Precision Screen & OLED Replacement",
      turnaround: "30 - 45 Mins",
      priceEstimate: "Starts at ₹2,499",
      icon: "Smartphone",
      badge: "Same-Day Service",
      description: "Original Super Retina XDR OLED screen replacement with complete TrueTone restoration and FaceID preservation. Zero display warning messages.",
      points: [
        "TrueTone data programming included",
        "Original refresh rate (60Hz & 120Hz ProMotion)",
        "Oleophobic water-repellent coating",
        "3 to 6 months replacement warranty"
      ]
    },
    {
      id: "apple-battery-service",
      title: "Genuine Battery Health Restoration",
      turnaround: "30 Mins",
      priceEstimate: "Starts at ₹1,999",
      icon: "BatteryCharging",
      badge: "100% Health",
      description: "Restore your iPhone's full day stamina with high-capacity original cell batteries with zero battery warning chip migration.",
      points: [
        "BMS controller board spot-welding",
        "Zero 'Unknown Part' warning notification",
        "Original Apple adhesive pull-tabs",
        "Diagnostic cycle count verification report"
      ]
    },
    {
      id: "trade-in-exchange",
      title: "Mobile to Mobile Exchange Program",
      turnaround: "15 Mins",
      priceEstimate: "Highest Hyderabad Exchange",
      icon: "Repeat",
      badge: "Top Value",
      description: "Upgrade any old phone (Android or iPhone) to a certified pre-owned iPhone with maximum exchange valuation and spot device switch.",
      points: [
        "Complete data transfer & WhatsApp backup assistance",
        "Free tempered glass & back cover with exchange",
        "Pay difference via cash, UPI, or credit card EMI",
        "Zero hidden deductions or inspection fees"
      ]
    },
    {
      id: "instant-cash-buyback",
      title: "Instant Cash for Used iPhones",
      turnaround: "10 Mins Spot Payout",
      priceEstimate: "Immediate Cash / Bank Transfer",
      icon: "Banknote",
      badge: "Spot Cash",
      description: "Sell your used iPhone in any condition. Get quick, hassle-free evaluation with instant cash or bank transfer in Jagdish Market.",
      points: [
        "Transparent valuation right in front of you",
        "Working, cracked screen, or faulty battery accepted",
        "Authorized bill of sale & ID verification safety",
        "No waiting for online buyers or shipping delays"
      ]
    },
    {
      id: "logic-board-ic-repair",
      title: "Chip-Level & Motherboard Diagnostics",
      turnaround: "Same-Day / 24 Hours",
      priceEstimate: "Free Diagnosis",
      icon: "Cpu",
      badge: "Advanced Tech",
      description: "Micro-soldering, short-circuit diagnostics, Audio IC, Baseband network issues, FaceID dot projector fixes, and water damage recovery.",
      points: [
        "Stereoscopic microscope micro-soldering",
        "Board level component replacement",
        "Full data retention prioritized",
        "No-fix, no-fee diagnostic policy"
      ]
    },
    {
      id: "doorstep-service",
      title: "Express Doorstep Pickup & Delivery",
      turnaround: "Within 2 Hours in Hyd",
      priceEstimate: "Free with Select Orders",
      icon: "Truck",
      badge: "Hyderabad & Secunderabad",
      description: "Experience VIP store service at your home or office. We bring devices for inspection or safely pick up your phone for repair.",
      points: [
        "Secure tamper-evident transit",
        "Live tracking & phone test on delivery",
        "On-spot verification before payment",
        "Covering Banjara Hills, Hitec City, Abids, Secunderabad & more"
      ]
    }
  ],

  // Trade-In Calculator Dataset
  tradeInEstimates: [
    { model: "iPhone 15 Pro Max", storage: "256GB", flawless: 72000, good: 66000, fair: 58000 },
    { model: "iPhone 15 Pro", storage: "128GB", flawless: 60000, good: 55000, fair: 48000 },
    { model: "iPhone 15", storage: "128GB", flawless: 42000, good: 38000, fair: 32000 },
    { model: "iPhone 14 Pro Max", storage: "128GB", flawless: 56000, good: 51000, fair: 44000 },
    { model: "iPhone 14 Pro", storage: "128GB", flawless: 48000, good: 43000, fair: 37000 },
    { model: "iPhone 14", storage: "128GB", flawless: 32000, good: 29000, fair: 24000 },
    { model: "iPhone 13 Pro Max", storage: "128GB", flawless: 44000, good: 39000, fair: 33000 },
    { model: "iPhone 13 Pro", storage: "128GB", flawless: 37000, good: 33000, fair: 27000 },
    { model: "iPhone 13", storage: "128GB", flawless: 25000, good: 22000, fair: 18000 },
    { model: "iPhone 12 Pro Max", storage: "128GB", flawless: 32000, good: 28000, fair: 23000 },
    { model: "iPhone 12", storage: "64GB/128GB", flawless: 18000, good: 15500, fair: 12000 },
    { model: "iPhone 11", storage: "64GB/128GB", flawless: 13500, good: 11000, fair: 8500 },
    { model: "Samsung S23 Ultra", storage: "256GB", flawless: 52000, good: 46000, fair: 39000 },
    { model: "Samsung S22 Ultra", storage: "256GB", flawless: 34000, good: 29000, fair: 24000 },
    { model: "OnePlus 11 / 10 Pro", storage: "256GB", flawless: 24000, good: 20000, fair: 16000 },
  ],

  reviews: [
    {
      name: "Sharukuddin Shaik",
      date: "October 13, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVR8WC7xJGFf2BgONdUBaP8iQzRLvnkPvHDpdGMrt-dgzNjTOl6JQ=s120-c-rp-mo-br100",
      badge: "Verified Buyer",
      text: "Had a great experience purchasing the iPhone from this shop! The staff were friendly, professional, and helpful throughout the purchase. They explained everything clearly and made the buying experience smooth and hassle-free. Excellent customer service and a pleasant shopping experience. Highly recommended for anyone planning to buy an iPhone! 📱✨ (SIKANDAR BHAI)"
    },
    {
      name: "kprc kprc",
      date: "October 13, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWdwgwVfggSG8uAye155fhgeOO2hmAN_xOHTQKnkyq5XBdt42avXg=s120-c-rp-mo-ba12-br100",
      badge: "Local Guide",
      text: "Good Customer Service Specialized in iPhones. Got transparent pricing and genuine tested phone with proper battery health testing right in front of me."
    },
    {
      name: "Narasimhulu Narasimhulu",
      date: "October 13, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWrK7GYDkF9ZKPXNI8avjfMiZHIE37G-5m7J1L671AccJ3-SavI=s120-c-rp-mo-br100",
      badge: "Customer Since 2013",
      text: "Very good experience coming since 2013! Superb store in Jagdish market, the most reliable and honest shop for used iPhones in all of Hyderabad."
    },
    {
      name: "Jude Samuel",
      date: "October 8, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocJIgLeXyab61Dsdggx8lzrZCaIVauLkIMQRyPR-dxhqEwrV7g=s120-c-rp-mo-br100",
      badge: "Exchange Customer",
      text: "One of the best places in Hyd for buying, exchange and selling mobiles. Instant valuation and honest guidance on device condition."
    },
    {
      name: "Md Jalal Uddin Mondal",
      date: "September 19, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocKwp7orOom2yJXdCWJoZCDQyV2QDg66ml_B_TzbbbmhFKnwcQ=s120-c-rp-mo-br100",
      badge: "Trusted Regular",
      text: "Best iphone store in Hyderabad, they buy sell exchange iphones, even service also, trusted store since 2003!"
    },
    {
      name: "NIKHIL KUMAR BILLA",
      date: "August 13, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocJzK-Z8LQI0rycdnJSHNgYfP18dQhRHXkNA5_z9TuZShMeV3Q=s120-c-rp-mo-br100",
      badge: "Repeat Customer",
      text: "Easy, rapid, stress free store. Must go to store for selling and buying phones with better price compared to offline and online market!"
    },
    {
      name: "Melky Mercy",
      date: "August 28, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocL-wG0DAwZZJLwca3BQha53J0SgSKF8kaapQyw5eqqaSJCjugE=s120-c-rp-mo-br100",
      badge: "iPhone Repair",
      text: "Best service of iPhone, we are regular customers to them... Quick screen repair with TrueTone restored, very satisfied."
    },
    {
      name: "Arogya Reddy",
      date: "August 12, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjX_yyrdOuEhRuDYuvuw1Tw0SUgOeVq11Bf66E5aDnak8yj2qDjk",
      badge: "Verified Review",
      text: "Super Service and best iPhone service in Hyderabad. Sikandar Bhai is genuinely polite and gives genuine parts at reasonable prices."
    },
    {
      name: "Imran Khan",
      date: "August 1, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVR8WC7xJGFf2BgONdUBaP8iQzRLvnkPvHDpdGMrt-dgzNjTOl6JQ=s120-c-rp-mo-br100",
      badge: "Verified Buyer",
      text: "Exceptionally reliable and dependable. Handled my data migration and device exchange without any delay. Highly recommended!"
    }
  ],

  // Real store photos from Google Business
  gallery: [
    {
      url: "https://lh3.googleusercontent.com/Y6eRQr50pTtuYEs0g55ljofWjM3HLStoYFVJCYCCaGLjwTikL9oqbS4BJ9iI4yhXWsinGnBXhDBCC7AB9w=s0",
      caption: "Flagship iPhone Pro Max Stock Showcase",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/tzJoPiFPlLtP8e9v-tfbiVPczbnslw-UU4ysdRcm_mR6QcodMM49DSpfVUo3qN2NorgyQ72tXE7DazZ1uQ=s0",
      caption: "Certified Pre-Owned iPhone 15 & 14 Series",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/Ej36echLGGpDrc0y0PtYJmAjLZMwUNOC8gDQRQcMc2KJQZEQISPbke9JNLPJwaUTGrd9GbN12pFlZsaV1w=s0",
      caption: "Storefront at Jagdish Market, Abids",
      category: "Store"
    },
    {
      url: "https://lh3.googleusercontent.com/-VuECFMulcl6GsV1loRwPLSIItWHnmjubnIBojpF2bVPoLf70ajDbytqqlMZrZx6QXpkHTxK5GZ7vydTTQ=s0",
      caption: "Precision Diagnostic & Verification Desk",
      category: "Service"
    },
    {
      url: "https://lh3.googleusercontent.com/oNRJ1K-ItZXlWxl8ANuTxbqBylJlRIapNEGo8RFz0m5hLP_D29M2Bfp9YY7NuMqSPZuqQkFn0UiFuW8o5g=s0",
      caption: "Samsung Galaxy & Foldable Series Collection",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/LOQhCbRncxuMeU4lMe8hZCQVyS7vZc_DalfJqTZnrWqDOkKKTkRXfj_TfFCl41-xAyEjAWe30BIOOanyMg=s0",
      caption: "Genuine Box Packs & Original Accessories",
      category: "Accessories"
    },
    {
      url: "https://lh3.googleusercontent.com/S_gadSVQN1zPDmJ4587gmax4pwdJM9YM6CxYaX-tSZI4ecffhnuHoSX0eLUsv4MrKr6co-IKAUxgxC-_ow=s0",
      caption: "iPhone 14 Pro Max Deep Purple In Stock",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/8m8AokVw7cbo3rU-Ay_Z_COktXLITGJLmOhmJqgZCdpOmhV3e6awgN4ovyh9kBXhtyM2XA-xvYRLEISGhA=s0",
      caption: "Every Device 100% Quality Checked",
      category: "Inspection"
    },
    {
      url: "https://lh3.googleusercontent.com/47v-oCeg3fWq-X3cHB1MNWWK5OOKLV6ZeetLUmoMQRaxHb_-Qiw-e4MdJX8WFTMSYjtPDQ484IcnyH-0ow=s0",
      caption: "High Performance Android Flagships",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/PaU66r3qRrwVWDvaG2eU8DSW33NbOjWfVEbYkgpRxY0JPGIYiM-84GYi1DnGKtpWb4MnYicR9-kQqEw-KA=s0",
      caption: "Trade-In & Instant Cash Counter",
      category: "Store"
    },
    {
      url: "https://lh3.googleusercontent.com/_N7sPqzMuJG8qM2ThYGGeu5HmKm1dtT3KLVzcatG8WVfcpIFyvW6R8jEYYk9TzLQg-lEbDAdxKNEdE_bog=s0",
      caption: "Fast Chargers & MagSafe Covers",
      category: "Accessories"
    },
    {
      url: "https://lh3.googleusercontent.com/gdiDPmU1OsflmS_szcyJQXLJPdlBG1tC-JsxiBdEFxyg6gSm53gCJbyVIbeVQdCsV-L2QxTxCZpf5ekNFA=s0",
      caption: "Customer Handover & Satisfaction",
      category: "Store"
    }
  ],

  faqs: [
    {
      q: "Are the used iPhones sold at Sikandar's Mobile Store original?",
      a: "Yes, 100% original. We do not sell refurbished clones or Chinese refurbished parts. Every phone is tested for original OLED displays, working TrueTone, original FaceID, and authentic Apple cameras. You are welcome to inspect with 3uTools right at our counter before buying."
    },
    {
      q: "Do you provide warranty on pre-owned iPhones?",
      a: "Absolutely. All certified pre-owned phones come with store warranty ranging from 3 to 6 months. Many recent models also have remaining Apple official international or Indian warranty. We also provide an authorized invoice with IMEI details."
    },
    {
      q: "What is your battery health policy?",
      a: "We only stock iPhones with 85% to 100% genuine battery health. We do not use fake cycle resetters. If you ever need a battery replacement, we provide original cell replacements with zero alert popups."
    },
    {
      q: "How does the Mobile Exchange / Trade-In program work?",
      a: "Bring your existing phone (iPhone, Samsung, OnePlus, etc.) to our Jagdish Market shop or request doorstep evaluation. We evaluate your phone in 5 minutes, give you the highest market value, and you only pay the difference for your upgraded device."
    },
    {
      q: "Do you offer doorstep delivery in Hyderabad?",
      a: "Yes! We provide safe doorstep delivery, doorstep inspection, and cash/UPI on delivery across Hyderabad and Secunderabad, including Banjara Hills, Jubilee Hills, Hitec City, Gachibowli, Kukatpally, and Charminar."
    },
    {
      q: "How long do iPhone screen and battery repairs take?",
      a: "Most screen replacements and battery replacements are completed within 30 to 45 minutes right in front of you by our expert Apple technicians."
    }
  ],

  posts: [
    {
      id: "post-1",
      title: "Fresh Pre-Owned iPhone Stock Just Arrived!",
      date: "November 6, 2026",
      tag: "Stock Alert",
      image: "https://lh3.googleusercontent.com/tzJoPiFPlLtP8e9v-tfbiVPczbnslw-UU4ysdRcm_mR6QcodMM49DSpfVUo3qN2NorgyQ72tXE7DazZ1uQ=s0",
      summary: "Wide selection of certified pre-owned iPhone 13, 14, 15 Pro, and 16 Pro Max models with battery health above 90% and store warranty. Available for instant pickup at Jagdish Market."
    },
    {
      id: "post-2",
      title: "100% Quality Verification Checklist for Pre-Owned Phones",
      date: "November 4, 2026",
      tag: "Buyer Guide",
      image: "https://lh3.googleusercontent.com/Y6eRQr50pTtuYEs0g55ljofWjM3HLStoYFVJCYCCaGLjwTikL9oqbS4BJ9iI4yhXWsinGnBXhDBCC7AB9w=s0",
      summary: "Fully tested, 100% verified quality, and best deals guaranteed. Visit us at Abids Shopping Center, Jagdish Market, Hyderabad, or call us today to check current stock and pricing."
    },
    {
      id: "post-3",
      title: "Looking for a Trusted Independent iPhone Specialist in Hyderabad?",
      date: "November 3, 2026",
      tag: "Expert Repair",
      image: "https://lh3.googleusercontent.com/LOQhCbRncxuMeU4lMe8hZCQVyS7vZc_DalfJqTZnrWqDOkKKTkRXfj_TfFCl41-xAyEjAWe30BIOOanyMg=s0",
      summary: "Visit Sikandar’s Mobile Store at Abids Shopping Center. We specialize in verified pre-owned iPhones, battery health and display testing, transparent buyback/trade-in valuations, and expert smartphone repairs."
    },
    {
      id: "post-4",
      title: "Instant Cash & Highest Exchange Values for Old Phones",
      date: "November 3, 2026",
      tag: "Trade-In & Sell",
      image: "https://lh3.googleusercontent.com/S_gadSVQN1zPDmJ4587gmax4pwdJM9YM6CxYaX-tSZI4ecffhnuHoSX0eLUsv4MrKr6co-IKAUxgxC-_ow=s0",
      summary: "Looking to upgrade your smartphone or get instant cash for your old iPhone in Hyderabad? We provide spot device valuation, highest exchange values, and quick doorstep pick-up & delivery across Hyderabad."
    }
  ]
};

export const createWhatsAppUrl = (message) => {
  const phone = storeData.storeInfo.whatsapp;
  const encoded = encodeURIComponent(message || `Hi Sikandar Bhai, I saw your website and would like to enquire about phones/services.`);
  return `https://wa.me/${phone}?text=${encoded}`;
};
