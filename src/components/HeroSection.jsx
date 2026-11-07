import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BatteryCharging, 
  Sparkles, 
  ChevronRight, 
  MessageCircle, 
  Repeat, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Phone,
  Award,
  Flame,
  ArrowRight
} from 'lucide-react';
import { storeData, createWhatsAppUrl, IPHONE_16_PRO_MAX_IMAGES } from '../data/storeData';

export default function HeroSection({ onOpenTradeIn, onSelectProduct }) {
  // Flagship Hero Switcher (iPhone 16 Pro Max finishes & Android flagships)
  const flagshipShowcase = [
    {
      id: "iphone-16-pro-max-desert",
      modelName: "iPhone 16 Pro Max",
      brand: "Apple",
      colorName: "Desert Titanium",
      colorCode: "#c4a387",
      edition: "256GB / 512GB / 1TB • Grade 5 Titanium",
      headline: "The Signature Titanium Flagship",
      price: "₹1,24,999",
      mrp: "₹1,44,900",
      savings: "Save ₹19,901",
      battery: "100% Apple Health",
      condition: "Pristine / Grade A+ Flawless",
      image: IPHONE_16_PRO_MAX_IMAGES.desertCutout,
      tag: "Flagship Edition",
      badgeTags: ["Grade A+ Flawless", "Battery Health 100%", "Store Verified", "Clean IMEI"]
    },
    {
      id: "samsung-s24-ultra-titanium",
      modelName: "Galaxy S24 Ultra 5G",
      brand: "Samsung",
      colorName: "Titanium Gray",
      colorCode: "#7d828a",
      edition: "12GB RAM • 256GB / 512GB • S-Pen",
      headline: "Snapdragon 8 Gen 3 with Galaxy AI",
      price: "₹89,999",
      mrp: "₹1,29,999",
      savings: "Save ₹40,000",
      battery: "5000mAh 100% Tested",
      condition: "Like-New Sealed / Flawless",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Samsung_Galaxy_S24_(webtekno)_008.png",
      tag: "200MP Zoom King",
      badgeTags: ["Grade A+ Flawless", "Battery Health 98%+", "Store Verified", "Clean IMEI"]
    },
    {
      id: "iphone-16-pro-max-natural",
      modelName: "iPhone 16 Pro Max",
      brand: "Apple",
      colorName: "Natural Titanium",
      colorCode: "#9e9a93",
      edition: "256GB / 512GB • Aerospace Grade",
      headline: "A18 Pro Silicon with Camera Control",
      price: "₹1,24,999",
      mrp: "₹1,44,900",
      savings: "Save ₹19,901",
      battery: "100% Battery",
      condition: "Grade A+ Flawless",
      image: IPHONE_16_PRO_MAX_IMAGES.heroDuo,
      tag: "Customer Favorite",
      badgeTags: ["Grade A+ Flawless", "Battery Health 100%", "Store Verified", "Clean IMEI"]
    },
    {
      id: "google-pixel-9-pro-xl",
      modelName: "Google Pixel 9 Pro XL",
      brand: "Google",
      colorName: "Obsidian Black",
      colorCode: "#1c1f24",
      edition: "16GB RAM • 256GB • Tensor G4",
      headline: "Pro Triple Camera & Gemini Nano",
      price: "₹82,999",
      mrp: "₹1,24,999",
      savings: "Save ₹42,000",
      battery: "100% Battery Health",
      condition: "Pristine Box Pack",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Google_Pixel_9_(Obsidian)_front.svg",
      tag: "Pure Google AI",
      badgeTags: ["Grade A+ Flawless", "Battery Health 100%", "Store Verified", "Clean IMEI"]
    },
    {
      id: "iphone-16-pro-max-black",
      modelName: "iPhone 16 Pro Max",
      brand: "Apple",
      colorName: "Black Titanium",
      colorCode: "#2e2f33",
      edition: "512GB Studio Edition",
      headline: "Stealth Deep Obsidian Finish",
      price: "₹1,24,999",
      mrp: "₹1,44,900",
      savings: "Save ₹19,901",
      battery: "100% Genuine Health",
      condition: "Collector Grade Mint",
      image: IPHONE_16_PRO_MAX_IMAGES.cameraSystem,
      tag: "Stealth Luxury",
      badgeTags: ["Grade A+ Flawless", "Battery Health 100%", "Store Verified", "Clean IMEI"]
    }
  ];

  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0);
  const currentDevice = flagshipShowcase[activeShowcaseIndex];

  return (
    <section className="relative pt-6 sm:pt-12 pb-20 lg:pb-28 overflow-hidden bg-obsidian-canvas border-b border-[#262F40]">
      
      {/* Obsidian Titanium Ambient Glow Flares (Electric Cobalt & Cyber Cyan) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] sm:w-[1200px] h-[550px] bg-gradient-to-tr from-[#0066FF]/12 via-[#00F0FF]/08 to-transparent blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-[#0066FF]/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-[#00F0FF]/08 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold tracking-wide backdrop-blur-md shadow-[0_4px_14px_rgba(0,102,255,0.2)]">
            <Award className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>HYDERABAD'S PREMIER CERTIFIED FLAGSHIP SHOWROOM • ABIDS &amp; KOTI</span>
          </div>

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
            <span className="text-[#00F0FF] text-[10px] group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Engineered Pitch & High-Visibility Actions (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08]">
                Certified Pre-Owned <br />
                <span className="text-gradient-cobalt">Flagship Smartphones</span> <br />
                <span className="text-gradient-titanium">In Abids &amp; Koti, Hyderabad.</span>
              </h1>
              
              <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Step into Hyderabad’s official Apple &amp; Android flagship vault. Specializing in verified <strong className="text-[#F8FAFC] font-semibold">iPhones, Samsung Galaxy S-Series, Google Pixel &amp; OnePlus</strong>. Inspected with 3uTools, genuine battery health, TrueTone displays, and store warranty.
              </p>
            </div>

            {/* Condition Grade Badges directly on Hero */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="badge-condition px-3 py-1 text-xs">✓ Grade A+ Flawless</span>
              <span className="badge-condition px-3 py-1 text-xs">⚡ Battery Health 95%+</span>
              <span className="badge-condition px-3 py-1 text-xs">🛡️ Store Verified Warranty</span>
              <span className="badge-condition px-3 py-1 text-xs">📄 Clean IMEI &amp; Tax Invoice</span>
            </div>

            {/* Premium Guarantee Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-[#F8FAFC]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>100% Genuine Silicon</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>60-Point Diagnostic</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>TrueTone &amp; 120Hz LTPO</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>Store Bill &amp; Warranty</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>Spot Trade-In Cash</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141923] border border-[#262F40]">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <span>Doorstep Delivery Hyd</span>
              </div>
            </div>

            {/* Direct High-Ticket Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              
              {/* Primary Action: Solid #0066FF with 0 4px 14px rgba(0, 102, 255, 0.4) */}
              <a
                href={createWhatsAppUrl(`Hi Sikandar Bhai, I want to reserve/buy the ${currentDevice.modelName} (${currentDevice.colorName}) shown on your website.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-primary-cobalt px-7 py-4 text-sm font-bold gap-2.5 active:scale-95 group"
              >
                <MessageCircle className="w-5 h-5 fill-[#F8FAFC] text-[#F8FAFC]" />
                <span>Reserve on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary Action: Sleek Titanium Outline #262F40 */}
              <a
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="w-full sm:w-auto btn-secondary-titanium px-6 py-4 text-sm font-bold gap-2.5"
              >
                <Phone className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-mono tabular-nums">Call: {storeData.storeInfo.phone}</span>
              </a>

              {/* Trade-In Action */}
              <button
                onClick={onOpenTradeIn}
                className="w-full sm:w-auto btn-secondary-titanium px-5 py-4 text-sm font-bold gap-2"
              >
                <Repeat className="w-4 h-4 text-[#0066FF]" />
                <span>Trade-In Calculator</span>
              </button>

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
            
            {/* Color Finish Switcher Tabs */}
            <div className="mb-4">
              <div className="text-center sm:text-left mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00F0FF] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>Select Flagship Showcase:</span>
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
                    <span>{device.modelName.replace('Pro Max', 'PM').replace('Ultra 5G', 'Ultra')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* The Master Luxury Showcase Card with 1px #262F40 and 16px border-radius */}
            <div className="relative surface-card p-6 sm:p-7 overflow-hidden group">
              
              {/* Card Radial Ambient Lighting */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-[#0066FF]/20 via-[#00F0FF]/10 to-transparent blur-3xl rounded-full pointer-events-none" />

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

              {/* Image Frame featuring SUBTLE RADIAL LIGHTING GRADIENT so phone edges and camera lenses pop */}
              <div className="relative h-72 sm:h-80 w-full rounded-xl bg-[#0A0D14] border border-[#262F40] flex items-center justify-center p-5 overflow-hidden device-glow-hero">
                <img
                  src={currentDevice.image}
                  alt={`${currentDevice.modelName} in ${currentDevice.colorName}`}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                <div className="absolute bottom-3 left-3 bg-[#141923]/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-[#00F0FF] border border-[#262F40]">
                  {currentDevice.condition}
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="mt-5 space-y-4">
                
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#F8FAFC] tracking-tight">
                      {currentDevice.modelName}
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-medium">
                      {currentDevice.edition}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-[#F8FAFC] font-mono tabular-nums">
                      {currentDevice.price}
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

                {/* Instant Dual CTA: WhatsApp & Direct Dialer */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  
                  {/* WhatsApp */}
                  <a
                    href={createWhatsAppUrl(`Hi Sikandar Bhai, I want to reserve the ${currentDevice.modelName} (${currentDevice.colorName}) priced at ${currentDevice.price}. Is it available today?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-cobalt py-3 px-3 text-xs gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Reserve WhatsApp</span>
                  </a>

                  {/* Dialer */}
                  <a
                    href={`tel:${storeData.storeInfo.phoneRaw}`}
                    className="btn-secondary-titanium py-3 px-3 text-xs gap-1.5"
                  >
                    <Phone className="w-4 h-4 text-[#00F0FF]" />
                    <span className="font-mono">Call Showroom</span>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-16 pt-8 border-t border-[#262F40] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] font-mono">20+ Years</div>
            <p className="text-xs text-[#94A3B8] font-medium">In Jagdish Market, Abids &amp; Koti</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#00F0FF] font-mono">4.9 ★</div>
            <p className="text-xs text-[#94A3B8] font-medium">242+ Audited Google Reviews</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] font-mono">60-Point</div>
            <p className="text-xs text-[#94A3B8] font-medium">Apple &amp; Android Diagnostic</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0066FF] font-mono">10 Mins</div>
            <p className="text-xs text-[#94A3B8] font-medium">Spot Cash Payout for Old Devices</p>
          </div>
        </div>

      </div>
    </section>
  );
}
