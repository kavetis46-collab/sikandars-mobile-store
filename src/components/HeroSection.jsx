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
  // EXCLUSIVELY authentic iPhone 16 Pro Max titanium finishes
  const iphone16ProMaxFinishes = [
    {
      id: "iphone-16-pro-max-desert",
      colorName: "Desert Titanium",
      colorCode: "#c4a387",
      edition: "Desert Titanium • 256GB / 512GB / 1TB",
      headline: "The Signature Luxury Finish",
      price: "₹1,24,999",
      mrp: "₹1,44,900",
      savings: "Save ₹19,901",
      battery: "100% Apple Health",
      condition: "Pristine / Grade A+ Flawless",
      image: IPHONE_16_PRO_MAX_IMAGES.desertCutout,
      tag: "Flagship Launch Color",
      gradient: "from-[#d4b094]/30 via-transparent to-transparent"
    },
    {
      id: "iphone-16-pro-max-natural",
      colorName: "Natural Titanium",
      colorCode: "#9e9a93",
      edition: "Natural Titanium • 256GB / 512GB",
      headline: "Aerospace Grade 5 Titanium",
      price: "₹1,24,999",
      mrp: "₹1,44,900",
      savings: "Save ₹19,901",
      battery: "100% Battery",
      condition: "Like-New Sealed / Flawless",
      image: IPHONE_16_PRO_MAX_IMAGES.heroDuo,
      tag: "Customer Favorite",
      gradient: "from-[#9e9a93]/30 via-transparent to-transparent"
    },
    {
      id: "iphone-16-pro-max-black",
      colorName: "Black Titanium",
      colorCode: "#2e2f33",
      edition: "Black Titanium • 512GB Studio Edition",
      headline: "Stealth Deep Obsidian",
      price: "₹1,24,999",
      mrp: "₹1,44,900",
      savings: "Save ₹19,901",
      battery: "100% Genuine Health",
      condition: "Mint Condition (Box + Cord)",
      image: IPHONE_16_PRO_MAX_IMAGES.cameraSystem,
      tag: "Stealth Luxury",
      gradient: "from-slate-700/30 via-transparent to-transparent"
    },
    {
      id: "iphone-16-pro-max-white",
      colorName: "White Titanium",
      colorCode: "#e3e4e6",
      edition: "White Titanium • 256GB / 512GB",
      headline: "Pure Ceramic Frosted Glass",
      price: "₹1,24,999",
      mrp: "₹1,44,900",
      savings: "Save ₹19,901",
      battery: "100% Genuine Health",
      condition: "Collector Grade Mint",
      image: IPHONE_16_PRO_MAX_IMAGES.finishLineup,
      tag: "Pure Elegance",
      gradient: "from-slate-200/20 via-transparent to-transparent"
    },
    {
      id: "iphone-16-pro-max-store-stock",
      colorName: "Store Counter Stock",
      colorCode: "#f59e0b",
      edition: "Original Box Unit • Ready at Counter",
      headline: "Inspected at Jagdish Market",
      price: "₹1,22,999",
      mrp: "₹1,44,900",
      savings: "Save ₹21,901",
      battery: "100% 3uTools Verified",
      condition: "10/10 In-Store Inspection",
      image: IPHONE_16_PRO_MAX_IMAGES.storeBoxStock,
      tag: "Real Store Stock Photo",
      gradient: "from-amber-500/30 via-transparent to-transparent"
    }
  ];

  const [activeFinishIndex, setActiveFinishIndex] = useState(0);
  const currentFinish = iphone16ProMaxFinishes[activeFinishIndex];

  return (
    <section className="relative pt-6 sm:pt-12 pb-20 lg:pb-32 overflow-hidden bg-luxury-mesh">
      
      {/* High-Ticket Gradient Ambient Light Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1100px] h-[550px] bg-gradient-to-tr from-amber-500/15 via-emerald-500/10 to-indigo-600/15 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-amber-500/15 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-[450px] h-[450px] bg-emerald-500/15 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Luxury Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-wide backdrop-blur-md shadow-lg shadow-amber-500/15">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>HYDERABAD'S PREMIER DESTINATION FOR iPHONE 16 PRO MAX</span>
          </div>

          <a 
            href="#customer-reviews"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 text-slate-200 text-xs font-semibold backdrop-blur-md transition-all shadow-md group"
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-white">4.9 / 5</span>
            <span className="text-slate-400">({storeData.storeInfo.reviewsCount} Google Reviews)</span>
            <span className="text-amber-400 text-[10px] group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Premium Pitch & Direct Action Buttons (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Certified Pre-Owned <br />
                <span className="text-gradient-gold">iPhone 16 Pro Max</span> <br />
                <span className="text-gradient-emerald">In Jagdish Market.</span>
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Elevate to Apple’s ultimate flagship at Hyderabad’s most trusted store. Every unit is <strong className="text-white font-semibold">100% genuine Grade 5 Titanium</strong>, verified with <strong className="text-amber-300 font-semibold">100% original battery health</strong>, TrueTone 120Hz display, clean IMEI, and full store warranty.
              </p>
            </div>

            {/* Premium Guarantee Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Original Apple Parts</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Camera Control Tested</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>A18 Pro Silicon</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Store Bill &amp; Warranty</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Spot Trade-In Exchange</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Doorstep Delivery in Hyd</span>
              </div>
            </div>

            {/* Direct High-Ticket Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              
              {/* Direct WhatsApp Callout */}
              <a
                href={createWhatsAppUrl(`Hi Sikandar Bhai, I want to reserve/buy the iPhone 16 Pro Max (${currentFinish.colorName}) shown on your website.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-2xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2.5 active:scale-95 group border border-emerald-300/40"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950 text-slate-950" />
                <span>Inquire on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Direct Call Dialer */}
              <a
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm tracking-wide shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2.5 active:scale-95 border border-amber-300/40"
              >
                <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Call: {storeData.storeInfo.phone}</span>
              </a>

              {/* Trade In Button */}
              <button
                onClick={onOpenTradeIn}
                className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/15 hover:border-amber-400/40 transition-all flex items-center justify-center gap-2"
              >
                <Repeat className="w-4 h-4 text-amber-400" />
                <span>Trade-In Old Phone</span>
              </button>

            </div>

            {/* Store Location Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400" />
                Chirag Ali Lane, Jagdish Market, Abids, Hyderabad
              </span>
              <span className="text-slate-600">•</span>
              <a 
                href={storeData.storeInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline font-bold"
              >
                Get Directions on Google Maps →
              </a>
            </div>

          </div>

          {/* Right Column: Perfect iPhone 16 Pro Max Showcase Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Color Finish Switcher Tabs */}
            <div className="mb-4">
              <div className="text-center sm:text-left mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Select iPhone 16 Pro Max Finish:</span>
                </span>
                <span className="text-[11px] text-slate-400">{currentFinish.colorName}</span>
              </div>

              <div className="flex p-1.5 rounded-2xl bg-[#111422]/90 border border-amber-500/30 backdrop-blur-xl gap-1.5 overflow-x-auto scrollbar-none">
                {iphone16ProMaxFinishes.map((finish, idx) => (
                  <button
                    key={finish.id}
                    onClick={() => setActiveFinishIndex(idx)}
                    className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all ${
                      activeFinishIndex === idx
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-[1.02]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/40 shrink-0" 
                      style={{ backgroundColor: finish.colorCode }}
                    />
                    <span>{finish.colorName.replace(' Titanium', '').replace('Store Counter ', '')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* The Master Luxury Showcase Card */}
            <div className="relative rounded-3xl p-6 sm:p-7 glass-luxury-gold border-2 border-amber-500/40 overflow-hidden group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
              
              {/* Card Radial Glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-amber-500/25 via-emerald-500/15 to-transparent blur-3xl rounded-full pointer-events-none" />

              {/* Top Card Badges */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-slate-950" />
                  {currentFinish.tag}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  {currentFinish.battery}
                </span>
              </div>

              {/* Image Frame featuring PERFECT iPhone 16 Pro Max picture */}
              <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-gradient-to-b from-[#181c2e] to-[#0c0e18] border border-white/10 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={currentFinish.image}
                  alt={`Apple iPhone 16 Pro Max in ${currentFinish.colorName}`}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-amber-300 border border-amber-500/30">
                  {currentFinish.condition}
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="mt-5 space-y-4">
                
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">
                      iPhone 16 Pro Max
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {currentFinish.edition}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-gradient-gold">
                      {currentFinish.price}
                    </div>
                    <div className="flex items-center gap-1.5 justify-end text-xs">
                      <span className="line-through text-slate-500">{currentFinish.mrp}</span>
                      <span className="text-emerald-400 font-bold">{currentFinish.savings}</span>
                    </div>
                  </div>
                </div>

                {/* Instant Dual CTA: WhatsApp & Direct Dialer */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  
                  {/* WhatsApp */}
                  <a
                    href={createWhatsAppUrl(`Hi Sikandar Bhai, I want to inquire about the iPhone 16 Pro Max (${currentFinish.colorName}) priced at ${currentFinish.price}. Is it available today?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Dialer */}
                  <a
                    href={`tel:${storeData.storeInfo.phoneRaw}`}
                    className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    <Phone className="w-4 h-4 fill-slate-950" />
                    <span>Call Store</span>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-16 pt-8 border-t border-amber-500/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-gradient-gold">20+ Years</div>
            <p className="text-xs text-slate-300 font-medium">In Jagdish Market, Hyderabad</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-gradient-emerald">4.9 ★</div>
            <p className="text-xs text-slate-300 font-medium">242+ Google Reviews</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white">60-Point</div>
            <p className="text-xs text-slate-300 font-medium">Apple Diagnostic Check</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-gradient-gold">10 Mins</div>
            <p className="text-xs text-slate-300 font-medium">Spot Cash Payout for Old Phones</p>
          </div>
        </div>

      </div>
    </section>
  );
}
