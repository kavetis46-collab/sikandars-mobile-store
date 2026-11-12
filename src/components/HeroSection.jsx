import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BatteryCharging, 
  Sparkles, 
  MessageCircle, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Phone,
  Award,
  Flame,
  ArrowRight,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { storeData, createWhatsAppUrl, IPHONE_16_PRO_MAX_IMAGES, CASHIFY_APP_URL } from '../data/storeData';

export default function HeroSection({ onSelectProduct }) {
  // Flagship iPhone Hero Switcher (iPhone 18 Pro Max down to iPhone 13 mini)
  const flagshipShowcase = [
    {
      id: "iphone-18-pro-max",
      modelName: "iPhone 18 Pro Max",
      colorName: "Burgundy / Glacier",
      colorCode: "#5c202c",
      edition: "256GB / 512GB / 1TB / 2TB • A20 Pro",
      headline: "Present 2026 Titanium Pro Flagship",
      cashifyAppPrice: "₹1,49,500",
      price: "₹1,50,000",
      mrp: "₹1,79,900",
      savings: "Save ₹29,900",
      battery: "100% Apple Health",
      condition: "Grade A+ Flawless • Open Box",
      image: "https://www.apple.com/v/iphone-18-pro/d/images/meta/iphone-18-pro_overview__bl9no3txkonm_og.png",
      tag: "Present 2026 Flagship",
      badgeTags: ["Grade A+ Flawless", "Battery Health 100%", "Cashify App + ₹500", "Clean IMEI"]
    },
    {
      id: "iphone-17-pro-max",
      modelName: "iPhone 17 Pro Max",
      colorName: "Desert Titanium",
      colorCode: "#c4a387",
      edition: "256GB / 512GB / 1TB / 2TB • A19 Pro",
      headline: "6.9\" ProMotion XDR Flagship",
      cashifyAppPrice: "₹1,04,500",
      price: "₹1,05,000",
      mrp: "₹1,49,900",
      savings: "Save ₹44,900",
      battery: "98% – 100% Tested",
      condition: "Grade A+ Flawless",
      image: IPHONE_16_PRO_MAX_IMAGES.heroDuo,
      tag: "Top Pro Max Buy",
      badgeTags: ["Grade A+ Flawless", "Battery Health 98%+", "Cashify App + ₹500", "Clean IMEI"]
    },
    {
      id: "iphone-16-pro-max",
      modelName: "iPhone 16 Pro Max",
      colorName: "Desert Titanium",
      colorCode: "#9e9a93",
      edition: "256GB / 512GB / 1TB • A18 Pro",
      headline: "Grade 5 Titanium Pro Camera",
      cashifyAppPrice: "₹89,500",
      price: "₹90,000",
      mrp: "₹1,44,900",
      savings: "Save ₹54,900",
      battery: "96% – 100% Battery",
      condition: "Grade A+ Flawless",
      image: IPHONE_16_PRO_MAX_IMAGES.desertCutout,
      tag: "Customer Favorite",
      badgeTags: ["Grade A+ Flawless", "Battery Health 96%+", "Cashify App + ₹500", "Clean IMEI"]
    },
    {
      id: "iphone-15-pro-max",
      modelName: "iPhone 15 Pro Max",
      colorName: "Natural Titanium",
      colorCode: "#aba69e",
      edition: "256GB / 512GB / 1TB • USB-C",
      headline: "A17 Pro & 5x Periscope Zoom",
      cashifyAppPrice: "₹75,500",
      price: "₹76,000",
      mrp: "₹1,59,900",
      savings: "Save ₹83,900",
      battery: "91% – 97% Original",
      condition: "Grade A+ Flawless",
      image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
      tag: "Best Seller",
      badgeTags: ["Grade A+ Flawless", "Battery Health 95%+", "Cashify App + ₹500", "Clean IMEI"]
    },
    {
      id: "iphone-13-mini",
      modelName: "iPhone 13 mini",
      colorName: "Pink / Midnight / Starlight",
      colorCode: "#faddd7",
      edition: "128GB / 256GB / 512GB • A15 Bionic",
      headline: "Compact 5.4\" Super Retina XDR",
      cashifyAppPrice: "₹25,000",
      price: "₹25,500",
      mrp: "₹64,900",
      savings: "Save ₹39,400",
      battery: "86% – 92% Health",
      condition: "Certified Grade A",
      image: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.large.jpg",
      tag: "App ₹25K → ₹25.5K",
      badgeTags: ["Grade A Certified", "Cashify App ₹25,000", "Store Buy ₹25,500", "Clean IMEI"]
    }
  ];

  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0);
  const currentDevice = flagshipShowcase[activeShowcaseIndex];

  return (
    <section className="relative pt-6 sm:pt-12 pb-20 lg:pb-28 overflow-hidden bg-obsidian-canvas border-b border-[#262F40]">
      
      {/* Obsidian Titanium Ambient Glow Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1200px] h-[550px] bg-gradient-to-tr from-[#0066FF]/12 via-[#00F0FF]/08 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold tracking-wide backdrop-blur-md shadow-[0_4px_14px_rgba(0,102,255,0.2)]">
            <Award className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>CERTIFIED PRE-OWNED iPHONES ONLY • ABIDS &amp; KOTI</span>
          </div>

          <a 
            href={CASHIFY_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] hover:border-[#00F0FF] text-[#F8FAFC] text-xs font-semibold backdrop-blur-md transition-all shadow-md group"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Price Synced with <strong className="text-[#00F0FF]">Cashify App</strong> + ₹500</span>
            <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover:text-[#00F0FF]" />
          </a>

          <a 
            href="#customer-reviews"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] hover:border-[#00F0FF] text-[#F8FAFC] text-xs font-semibold backdrop-blur-md transition-all shadow-md group"
          >
            <div className="flex text-[#00F0FF]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#00F0FF]" />
              ))}
            </div>
            <span className="font-extrabold text-[#F8FAFC]">4.9 / 5</span>
            <span className="text-[#94A3B8]">({storeData.storeInfo.reviewsCount} Google Reviews)</span>
          </a>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Engineered Pitch & Buy Actions (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08]">
                Buy Certified Pre-Owned <br />
                <span className="text-gradient-cobalt">iPhone 12 to 18 Pro Max</span> <br />
                <span className="text-gradient-titanium">In Abids &amp; Koti, Hyderabad.</span>
              </h1>
              
              <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Every Apple iPhone from <strong className="text-[#F8FAFC] font-semibold">iPhone 12 mini up to iPhone 18 Pro Max</strong> — including every mini, Standard, Plus, Air, Pro &amp; Pro Max in all original colors and storage variants. Transparently priced at <strong className="text-[#00F0FF]">Cashify App Price + ₹500</strong> only.
              </p>
            </div>

            {/* Condition Grade Badges directly on Hero */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="badge-condition px-3 py-1 text-xs">✓ All Models 12 – 18 Pro Max</span>
              <span className="badge-condition px-3 py-1 text-xs">🎨 All Colors &amp; Variants</span>
              <span className="badge-condition px-3 py-1 text-xs">⚡ Cashify App + ₹500</span>
              <span className="badge-condition px-3 py-1 text-xs">🛡️ 6-Month Store Warranty</span>
            </div>

            {/* Premium Guarantee Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-[#F8FAFC]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>All 28 iPhone Models</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>3uTools Live Check</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>App ₹25K → Store ₹25.5K</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>GST Bill &amp; Warranty</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>64GB up to 2TB Variants</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>Doorstep Delivery Hyd</span>
              </div>
            </div>

            {/* Direct High-Ticket Buy Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              
              {/* Primary Action: Browse Buy Inventory */}
              <a
                href="#inventory"
                className="w-full sm:w-auto btn-primary-cobalt px-7 py-4 text-sm font-bold gap-2.5 active:scale-95 group"
              >
                <Smartphone className="w-5 h-5 text-[#F8FAFC]" />
                <span>Buy All iPhones (12 – 18 Pro)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary Action: Cashify Play Store App */}
              <a
                href={CASHIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-secondary-titanium px-5 py-4 text-sm font-bold gap-2"
              >
                <ExternalLink className="w-4 h-4 text-[#00F0FF]" />
                <span>Check Cashify App</span>
              </a>

              {/* Direct Call Button */}
              <a
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="w-full sm:w-auto btn-secondary-titanium px-5 py-4 text-sm font-bold gap-2"
              >
                <Phone className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-mono tabular-nums">{storeData.storeInfo.phone}</span>
              </a>

            </div>

            {/* Store Location Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5 font-medium text-[#F8FAFC]">
                <MapPin className="w-4 h-4 text-[#00F0FF]" />
                Chirag Ali Lane, Jagdish Market (Abids &amp; Koti), Hyderabad
              </span>
              <span className="text-[#262F40]">•</span>
              <a 
                href={storeData.storeInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00F0FF] hover:underline font-bold"
              >
                Get Directions on Google Maps →
              </a>
            </div>

          </div>

          {/* Right Column: Engineered Flagship Showcase Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* iPhone Model Switcher Tabs */}
            <div className="mb-4">
              <div className="text-center sm:text-left mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00F0FF] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Featured Buy Models:</span>
                </span>
                <span className="text-[11px] text-[#94A3B8] font-mono">{currentDevice.colorName}</span>
              </div>

              <div className="flex p-1.5 rounded-xl bg-[#141923] border border-[#262F40] backdrop-blur-xl gap-1.5 overflow-x-auto scrollbar-none">
                {flagshipShowcase.map((device, idx) => (
                  <button
                    key={device.id}
                    onClick={() => setActiveShowcaseIndex(idx)}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all ${
                      activeShowcaseIndex === idx
                        ? 'bg-[#0066FF] text-[#F8FAFC] shadow-[0_4px_14px_rgba(0,102,255,0.4)] scale-[1.02]'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#262F40]/40'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/50 shrink-0" 
                      style={{ backgroundColor: device.colorCode }}
                    />
                    <span>{device.modelName.replace('Pro Max', 'PM')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Showcase Card */}
            <div className="relative surface-card p-6 sm:p-7 overflow-hidden group">
              
              {/* Top Card Badges */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0066FF] text-[#F8FAFC] shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-[#F8FAFC]" />
                  {currentDevice.tag}
                </span>

                <span className="badge-condition px-3 py-1 text-xs flex items-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  {currentDevice.battery}
                </span>
              </div>

              {/* Image Frame featuring Radial Gradient */}
              <div className="relative h-64 sm:h-76 w-full rounded-xl bg-[#0A0D14] border border-[#262F40] flex items-center justify-center p-5 overflow-hidden device-glow-hero">
                <img
                  src={currentDevice.image}
                  alt={`${currentDevice.modelName} in ${currentDevice.colorName}`}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                  width="400"
                  height="400"
                />

                <div className="absolute bottom-3 left-3 bg-[#141923]/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-[#00F0FF] border border-[#262F40]">
                  {currentDevice.condition}
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="mt-5 space-y-4">
                
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#F8FAFC] tracking-tight">
                      {currentDevice.modelName}
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-medium">
                      {currentDevice.edition}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-2xl font-extrabold text-[#F8FAFC] font-mono tabular-nums">
                      {currentDevice.price}
                    </div>
                    <div className="text-[11px] text-[#00F0FF] font-mono">
                      Cashify App: {currentDevice.cashifyAppPrice} + ₹500
                    </div>
                    <div className="flex items-center gap-1.5 justify-end text-xs">
                      <span className="line-through text-[#94A3B8] font-mono">{currentDevice.mrp}</span>
                      <span className="text-[#00F0FF] font-bold">{currentDevice.savings}</span>
                    </div>
                  </div>
                </div>

                {/* Condition Grade Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentDevice.badgeTags.map((badge, bIdx) => (
                    <span key={bIdx} className="badge-condition px-2.5 py-0.5 text-[10px]">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Instant Dual CTA: WhatsApp & Inspect All Variants */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  
                  <a
                    href={createWhatsAppUrl(`Hi Sikandar Bhai, I want to BUY ${currentDevice.modelName} (${currentDevice.colorName}) listed at ${currentDevice.price} (Cashify App ${currentDevice.cashifyAppPrice} + ₹500).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-cobalt py-3 px-3 text-xs font-bold gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Buy on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onSelectProduct(currentDevice.id)}
                    className="btn-secondary-titanium py-3 px-3 text-xs font-bold gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00F0FF]" />
                    <span>All Colors &amp; Storage</span>
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
