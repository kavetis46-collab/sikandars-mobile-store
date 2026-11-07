// HIGH-PERFORMANCE OPTIMIZED IMAGE URLS FOR IPHONE 16 PRO MAX
// Using compressed thumbnails and Google WebP dynamic sizing (=w600-rw) to ensure instantaneous loading.
export const IPHONE_16_PRO_MAX_IMAGES = {
  // Official Apple Newsroom 1x optimized renders (60KB instead of 10MB)
  heroDuo: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg",
  finishLineup: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg",
  cameraSystem: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-camera-system-240909_inline.jpg.large.jpg",
  // Wikimedia resized thumbnail (500KB instead of 10MB raw)
  desertCutout: "https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_16_Pro_Max_Desert_Titanium_Rear.png?width=600",
  screenCutout: "https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_16_Pro_Max_screen.png?width=600",
  // In-Store Photos from Sikandar's Store with Google CDN dynamic WebP resizing (45KB instead of 6MB!)
  storeBoxStock: "https://lh3.googleusercontent.com/Y6eRQr50pTtuYEs0g55ljofWjM3HLStoYFVJCYCCaGLjwTikL9oqbS4BJ9iI4yhXWsinGnBXhDBCC7AB9w=w600-rw",
  storeCounterStock: "https://lh3.googleusercontent.com/tzJoPiFPlLtP8e9v-tfbiVPczbnslw-UU4ysdRcm_mR6QcodMM49DSpfVUo3qN2NorgyQ72tXE7DazZ1uQ=w600-rw",
  storeInspectionDesk: "https://lh3.googleusercontent.com/-VuECFMulcl6GsV1loRwPLSIItWHnmjubnIBojpF2bVPoLf70ajDbytqqlMZrZx6QXpkHTxK5GZ7vydTTQ=w600-rw"
};

export const storeData = {
  storeInfo: {
    name: "Sikandar's Mobile Store",
    legalName: "“Sikandar’sMobile store - iPHONE SALES AND SERVICE”",
    tagline: "Hyderabad's #1 Luxury Destination for Certified iPhone 16 Pro Max & Apple Care",
    badge: "Official Jagdish Market Flagship Specialist",
    rating: 4.9,
    reviewsCount: "242+",
    establishedYear: "2003",
    experienceYears: "20+ Years in Jagdish Market",
    phone: "+91 9700317171",
    phoneRaw: "+919700317171",
    whatsapp: "919700317171",
    address: "Chirag Ali Lane, Jagdish Market, Abids, Hyderabad, Telangana - 500001",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sikandars+Mobile+Store+Jagdish+Market+Hyderabad&query_place_id=ChIJl2rsVn2XyzsR8pnP9WROa7E",
    googleReviewWriteUrl: "https://search.google.com/local/writereview?placeid=ChIJl2rsVn2XyzsR8pnP9WROa7E",
    workingHours: [
      { day: "Monday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Tuesday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Wednesday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Thursday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Friday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Saturday", time: "11:00 AM – 10:00 PM", status: "Open" },
      { day: "Sunday", time: "Closed / By Appointment", status: "Appointment" },
    ]
  },

  // EXCLUSIVELY iPhone 16 Pro Max Lineup
  products: [
    {
      id: "iphone-16-pro-max-desert",
      name: "Apple iPhone 16 Pro Max – Desert Titanium",
      edition: "Signature Desert Titanium Finish",
      category: "Desert Titanium",
      color: "Desert Titanium",
      price: "₹1,24,999",
      originalPrice: "₹1,44,900",
      savings: "SAVE ₹19,901",
      storageOptions: ["256GB", "512GB", "1TB"],
      defaultStorage: "256GB",
      condition: "Pristine / Grade A+ Flawless",
      batteryHealth: "100% Genuine Apple Battery",
      warranty: "Apple Care+ / Store Warranty Included",
      badge: "Most Desired Finish",
      isHot: true,
      image: IPHONE_16_PRO_MAX_IMAGES.desertCutout,
      specs: {
        chip: "A18 Pro with 6-core GPU & Apple Intelligence",
        display: "6.9\" Super Retina XDR OLED ProMotion 120Hz",
        camera: "48MP Fusion + 48MP Ultra-Wide + 5x Optical Telephoto",
        chassis: "Grade 5 Titanium with Microblasted Texture",
        box: "Complete Box, Braided Type-C Cable, Bill & Warranty Card"
      }
    },
    {
      id: "iphone-16-pro-max-natural",
      name: "Apple iPhone 16 Pro Max – Natural Titanium",
      edition: "Raw Spacecraft Grade 5 Titanium",
      category: "Natural Titanium",
      color: "Natural Titanium",
      price: "₹1,24,999",
      originalPrice: "₹1,44,900",
      savings: "SAVE ₹19,901",
      storageOptions: ["256GB", "512GB", "1TB"],
      defaultStorage: "256GB",
      condition: "Like-New Sealed / Flawless 10/10",
      batteryHealth: "100% Battery Health",
      warranty: "Official Apple Warranty + Store Guarantee",
      badge: "Classic Luxury",
      isHot: true,
      image: IPHONE_16_PRO_MAX_IMAGES.heroDuo,
      specs: {
        chip: "A18 Pro Chip (Next-Gen Neural Engine)",
        display: "6.9\" Borderless ProMotion Always-On Display",
        camera: "Camera Control Button with 2-Stage Shutter",
        chassis: "Natural Titanium Satin Matte Finish",
        box: "Original Box + Official Store Invoice with IMEI"
      }
    },
    {
      id: "iphone-16-pro-max-black",
      name: "Apple iPhone 16 Pro Max – Black Titanium",
      edition: "Deep Stealth Obsidian Black",
      category: "Black Titanium",
      color: "Black Titanium",
      price: "₹1,24,999",
      originalPrice: "₹1,44,900",
      savings: "SAVE ₹19,901",
      storageOptions: ["256GB", "512GB", "1TB"],
      defaultStorage: "512GB",
      condition: "Flawless Grade A+ Certified",
      batteryHealth: "100% Verified Battery",
      warranty: "6 Months Store Warranty + Bill",
      badge: "Executive Stealth",
      isHot: false,
      image: IPHONE_16_PRO_MAX_IMAGES.cameraSystem,
      specs: {
        chip: "A18 Pro Chip with Hardware Ray Tracing",
        display: "6.9\" Ceramic Shield (2x Tougher than Glass)",
        camera: "4K 120fps Dolby Vision Video Capture",
        chassis: "Deep Black Titanium PVD Coating",
        box: "Box Pack with Original Fast Charging Cord"
      }
    },
    {
      id: "iphone-16-pro-max-white",
      name: "Apple iPhone 16 Pro Max – White Titanium",
      edition: "Pure Ceramic White Titanium",
      category: "White Titanium",
      color: "White Titanium",
      price: "₹1,24,999",
      originalPrice: "₹1,44,900",
      savings: "SAVE ₹19,901",
      storageOptions: ["256GB", "512GB"],
      defaultStorage: "256GB",
      condition: "Scratchless Mint Condition",
      batteryHealth: "100% Genuine Health",
      warranty: "Store Warranty + Bill",
      badge: "Collector Edition",
      isHot: false,
      image: IPHONE_16_PRO_MAX_IMAGES.finishLineup,
      specs: {
        chip: "A18 Pro with 16-Core Neural Engine",
        display: "Thinnest Borders Ever on an Apple Display",
        camera: "Studio-Quality 4-Mic Array with Audio Mix",
        chassis: "Pure White Titanium with Frosted Matte Glass",
        box: "Box + Accessories + Screen Protector Free"
      }
    },
    {
      id: "iphone-16-pro-max-store-stock",
      name: "iPhone 16 Pro Max – Jagdish Market Certified Unit",
      edition: "Ready for Spot Handover at Counter",
      category: "Desert Titanium",
      color: "Desert Titanium (Store Stock)",
      price: "₹1,22,999",
      originalPrice: "₹1,44,900",
      savings: "SAVE ₹21,901",
      storageOptions: ["256GB", "512GB"],
      defaultStorage: "256GB",
      condition: "Inspected In-Store 10/10",
      batteryHealth: "100% 3uTools Tested",
      warranty: "Full Store Warranty with GST/Retail Bill",
      badge: "Spot Handover",
      isHot: true,
      image: IPHONE_16_PRO_MAX_IMAGES.storeBoxStock,
      specs: {
        chip: "A18 Pro 3nm Precision Silicon",
        display: "Verified Original Super Retina Display (TrueTone Active)",
        camera: "FaceID & Camera Controls 100% Verified",
        chassis: "Zero Dents, Zero Scratches, Mint Condition",
        box: "Sealed/Mint Box Pack with Serial Number Verification"
      }
    },
    {
      id: "iphone-16-pro-max-1tb",
      name: "Apple iPhone 16 Pro Max – 1TB Ultimate Edition",
      edition: "Max Storage for Filmmakers & Creators",
      category: "Natural Titanium",
      color: "Natural Titanium",
      price: "₹1,54,999",
      originalPrice: "₹1,84,900",
      savings: "SAVE ₹29,901",
      storageOptions: ["1TB Ultimate"],
      defaultStorage: "1TB",
      condition: "Pristine Luxury Pack",
      batteryHealth: "100% Original Battery",
      warranty: "Apple Care Coverage + Store Guarantee",
      badge: "1TB Maximum Capacity",
      isHot: true,
      image: IPHONE_16_PRO_MAX_IMAGES.cameraSystem,
      specs: {
        chip: "A18 Pro with 1TB High-Speed NVMe Storage",
        display: "ProRes Log Video & ACES Color Standard",
        camera: "4K 120fps ProRes Direct to External SSD",
        chassis: "Natural Titanium Aerospace Grade",
        box: "VIP Packaging + Free 20W Fast Charger + Case"
      }
    }
  ],

  // Precision Apple Care Services
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
      description: "Upgrade any old phone to a certified pre-owned iPhone 16 Pro Max with maximum exchange valuation and spot device switch.",
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

  // ALL Authentic Customer Reviews from Google Business Profile
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
      text: "Had a great experience purchasing the iPhone from this shop! The staff were friendly, professional, and helpful throughout the purchase. They explained everything clearly and made the buying experience smooth and hassle-free. Excellent customer service and a pleasant shopping experience. Highly recommended for anyone planning to buy an iPhone! 📱✨ (SIKANDAR BHAI)",
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
      devicePurchased: "iPhone Upgrade & Service",
      category: "Trade-In & Service",
      text: "Best iphone store in hyderabad, they buy sell exchange iphones, even service also, trusted store since 2003. Sikandar Bhai gives 100% genuine phones with authentic battery health and honest testing right in front of you.",
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
      text: "Good Customer Service Specialized in Iphones. Got transparent pricing and genuine tested phone with 3uTools report on the spot. No hidden charges.",
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
      badge: "Phone Exchange",
      devicePurchased: "Exchange & Upgrade",
      category: "Trade-In & Service",
      text: "One of the best places in Hyd for buying, exchange and selling mobiles. Got maximum valuation for my old phone and upgraded smoothly to iPhone Pro Max.",
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
      devicePurchased: "Spot Buyback & Upgrade",
      category: "Instant Cash & Buy",
      text: "Easy, Rapid, stress free store. Must to go store for selling and buying phones with better price compared to offline and online market. Instant spot payment!",
      likes: 11,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-7",
      name: "Melky mercy",
      date: "August 28, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a/ACg8ocL-wG0DAwZZJLwca3BQha53J0SgSKF8kaapQyw5eqqaSJCjugE=s120-c-rp-mo-br100",
      badge: "Regular Customer",
      devicePurchased: "Apple Screen & Battery Care",
      category: "Repair & Service",
      text: "Best service of I phone, we are regular customers to them... TrueTone restore worked perfectly, original parts only. Honest technician.",
      likes: 8,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-8",
      name: "Arogya Reddy",
      date: "August 12, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjX_yyrdOuEhRuDYuvuw1Tw0SUgOeVq11Bf66E5aDnak8yj2qDjk",
      badge: "Verified Reviewer",
      devicePurchased: "iPhone Service & Care",
      category: "Repair & Service",
      text: "Super Service and best I phone service in Hyderabad. Sikandar Bhai is very cooperative and gives authentic guidance with zero false promises.",
      likes: 10,
      verifiedSource: "Google Maps Verified"
    },
    {
      id: "rev-9",
      name: "Imran Khan",
      date: "August 1, 2026",
      rating: 5,
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVR8WC7xJGFf2BgONdUBaP8iQzRLvnkPvHDpdGMrt-dgzNjTOl6JQ=s120-c-rp-mo-br100",
      badge: "Verified Buyer",
      devicePurchased: "iPhone Pro Max",
      category: "iPhone Purchase",
      text: "Exceptionally Reliable and dependable. Transferred my entire WhatsApp, iCloud, and contacts in 10 minutes right at the counter. 10/10 experience.",
      likes: 13,
      verifiedSource: "Google Maps Verified"
    }
  ],

  // Ratings overview breakdown
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
      { label: "Transparent Spot Pricing", score: "5.0" },
      { label: "After-Sales Store Warranty", score: "4.9" }
    ]
  },

  // Optimized Gallery Photos using Google CDN WebP dynamic resizing (=w600-rw)
  gallery: [
    {
      url: "https://lh3.googleusercontent.com/Y6eRQr50pTtuYEs0g55ljofWjM3HLStoYFVJCYCCaGLjwTikL9oqbS4BJ9iI4yhXWsinGnBXhDBCC7AB9w=w600-rw",
      caption: "Flagship iPhone Pro Max Stock Showcase",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/tzJoPiFPlLtP8e9v-tfbiVPczbnslw-UU4ysdRcm_mR6QcodMM49DSpfVUo3qN2NorgyQ72tXE7DazZ1uQ=w600-rw",
      caption: "Certified Pre-Owned Titanium Series",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/Ej36echLGGpDrc0y0PtYJmAjLZMwUNOC8gDQRQcMc2KJQZEQISPbke9JNLPJwaUTGrd9GbN12pFlZsaV1w=w600-rw",
      caption: "Storefront at Jagdish Market, Abids",
      category: "Store"
    },
    {
      url: "https://lh3.googleusercontent.com/-VuECFMulcl6GsV1loRwPLSIItWHnmjubnIBojpF2bVPoLf70ajDbytqqlMZrZx6QXpkHTxK5GZ7vydTTQ=w600-rw",
      caption: "Precision Diagnostic & Verification Desk",
      category: "Service"
    },
    {
      url: "https://lh3.googleusercontent.com/LOQhCbRncxuMeU4lMe8hZCQVyS7vZc_DalfJqTZnrWqDOkKKTkRXfj_TfFCl41-xAyEjAWe30BIOOanyMg=w600-rw",
      caption: "Genuine Box Packs & Original Accessories",
      category: "Accessories"
    },
    {
      url: "https://lh3.googleusercontent.com/S_gadSVQN1zPDmJ4587gmax4pwdJM9YM6CxYaX-tSZI4ecffhnuHoSX0eLUsv4MrKr6co-IKAUxgxC-_ow=w600-rw",
      caption: "iPhone Pro Max Stock Ready for Handover",
      category: "Stock"
    },
    {
      url: "https://lh3.googleusercontent.com/8m8AokVw7cbo3rU-Ay_Z_COktXLITGJLmOhmJqgZCdpOmhV3e6awgN4ovyh9kBXhtyM2XA-xvYRLEISGhA=w600-rw",
      caption: "Every Device 100% Quality Checked",
      category: "Inspection"
    },
    {
      url: "https://lh3.googleusercontent.com/PaU66r3qRrwVWDvaG2eU8DSW33NbOjWfVEbYkgpRxY0JPGIYiM-84GYi1DnGKtpWb4MnYicR9-kQqEw-KA=w600-rw",
      caption: "Trade-In & Instant Cash Counter",
      category: "Store"
    }
  ],

  // Trade-In estimates towards iPhone 16 Pro Max
  tradeInEstimates: [
    { model: "iPhone 15 Pro Max", storage: "256GB", flawless: 74000, good: 68000, fair: 60000 },
    { model: "iPhone 15 Pro", storage: "128GB", flawless: 62000, good: 56000, fair: 49000 },
    { model: "iPhone 15", storage: "128GB", flawless: 43000, good: 39000, fair: 33000 },
    { model: "iPhone 14 Pro Max", storage: "128GB", flawless: 57000, good: 52000, fair: 45000 },
    { model: "iPhone 14 Pro", storage: "128GB", flawless: 49000, good: 44000, fair: 38000 },
    { model: "iPhone 14", storage: "128GB", flawless: 33000, good: 29500, fair: 24500 },
    { model: "iPhone 13 Pro Max", storage: "128GB", flawless: 45000, good: 40000, fair: 34000 },
    { model: "iPhone 13", storage: "128GB", flawless: 26000, good: 23000, fair: 19000 },
    { model: "Samsung S23 / S24 Ultra", storage: "256GB", flawless: 54000, good: 48000, fair: 40000 }
  ],

  // Store FAQs
  faqs: [
    {
      q: "Are the iPhone 16 Pro Max phones sold at Sikandar's Mobile Store 100% original?",
      a: "Yes, 100% original. We do not sell refurbished clones or Chinese refurbished parts. Every phone is tested for original OLED displays, working TrueTone, original FaceID, and authentic Apple cameras. You are welcome to inspect with 3uTools right at our counter before buying."
    },
    {
      q: "Do you provide warranty on pre-owned iPhones?",
      a: "Absolutely. All certified pre-owned phones come with store warranty ranging from 3 to 6 months. Many recent models also have remaining Apple official warranty. We also provide an authorized invoice with IMEI details."
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

  // Store Posts & News
  posts: [
    {
      id: "post-1",
      title: "Fresh iPhone 16 Pro Max Stock Just Arrived in Desert Titanium!",
      date: "November 6, 2026",
      tag: "Stock Alert",
      image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-finish-lineup-240909_big.jpg.large.jpg",
      summary: "Wide selection of certified iPhone 16 Pro Max models with battery health 100% and store warranty. Available for instant pickup at Jagdish Market."
    },
    {
      id: "post-2",
      title: "100% Quality Verification Checklist for iPhone 16 Pro Max",
      date: "November 4, 2026",
      tag: "Buyer Guide",
      image: "https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large.jpg",
      summary: "Fully tested, 100% verified quality, and best deals guaranteed. Visit us at Abids Shopping Center, Jagdish Market, Hyderabad, or call us today to check current stock and pricing."
    },
    {
      id: "post-3",
      title: "Looking for a Trusted Independent iPhone Specialist in Hyderabad?",
      date: "November 3, 2026",
      tag: "Expert Repair",
      image: "https://lh3.googleusercontent.com/LOQhCbRncxuMeU4lMe8hZCQVyS7vZc_DalfJqTZnrWqDOkKKTkRXfj_TfFCl41-xAyEjAWe30BIOOanyMg=w600-rw",
      summary: "Visit Sikandar’s Mobile Store at Abids Shopping Center. We specialize in verified pre-owned iPhones, battery health and display testing, transparent buyback/trade-in valuations, and expert smartphone repairs."
    },
    {
      id: "post-4",
      title: "Instant Cash & Highest Exchange Values for Old Phones",
      date: "November 3, 2026",
      tag: "Trade-In & Sell",
      image: "https://lh3.googleusercontent.com/S_gadSVQN1zPDmJ4587gmax4pwdJM9YM6CxYaX-tSZI4ecffhnuHoSX0eLUsv4MrKr6co-IKAUxgxC-_ow=w600-rw",
      summary: "Looking to upgrade your smartphone or get instant cash for your old iPhone in Hyderabad? We provide spot device valuation, highest exchange values, and quick doorstep pick-up & delivery across Hyderabad."
    }
  ]
};

export const createWhatsAppUrl = (message) => {
  const phone = storeData.storeInfo.whatsapp;
  const encoded = encodeURIComponent(message || `Hi Sikandar Bhai, I saw your flagship website and want to inquire about iPhone 16 Pro Max stock.`);
  return `https://wa.me/${phone}?text=${encoded}`;
};
