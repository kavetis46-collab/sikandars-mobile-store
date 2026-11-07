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
  Wrench,
  Smartphone
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function HeroSection({ onOpenTradeIn, onSelectProduct }) {
  const featuredDevices = [
    {
      id: "iphone-16-pro-max",
      name: "iPhone 16 Pro Max",
      edition: "Desert Titanium • 256GB",
      price: "₹1,24,999",
      condition: "Flawless / Grade A+",
      battery: "100% Battery Health",
      image: "https://lh3.googleusercontent.com/Y6eRQr50pTtuYEs0g55ljofWjM3HLStoYFVJCYCCaGLjwTikL9oqbS4BJ9iI4yhXWsinGnBXhDBCC7AB9w=s0",
      tag: "Flagship Arrival"
    },
    {
      id: "iphone-15-pro-max",
      name: "iPhone 15 Pro Max",
      edition: "Natural Titanium • 256GB",
      price: "₹84,999",
      condition: "Like-New Condition",
      battery: "96% Battery Health",
      image: "https://lh3.googleusercontent.com/tzJoPiFPlLtP8e9v-tfbiVPczbnslw-UU4ysdRcm_mR6QcodMM49DSpfVUo3qN2NorgyQ72tXE7DazZ1uQ=s0",
      tag: "Customer Favorite"
    },
    {
      id: "iphone-14-128gb",
      name: "iPhone 14 Standard",
      edition: "Midnight Black • 128GB",
      price: "₹38,999",
      condition: "Scratchless Certified",
      battery: "91% Battery Health",
      image: "https://lh3.googleusercontent.com/LOQhCbRncxuMeU4lMe8hZCQVyS7vZc_DalfJqTZnrWqDOkKKTkRXfj_TfFCl41-xAyEjAWe30BIOOanyMg=s0",
      tag: "Best Value Buy"
    },
    {
      id: "samsung-s24-ultra",
      name: "Galaxy S24 Ultra 5G",
      edition: "Titanium Gray • 256GB",
      price: "₹82,999",
      condition: "Pristine with S-Pen",
      battery: "Optimal 100%",
      image: "https://lh3.googleusercontent.com/Ej36echLGGpDrc0y0PtYJmAjLZMwUNOC8gDQRQcMc2KJQZEQISPbke9JNLPJwaUTGrd9GbN12pFlZsaV1w=s0",
      tag: "Top Android Flagship"
    }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const activeDevice = featuredDevices[activeTab];

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute -top-32 right-0 w-[350px] h-[350px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Trusted in Jagdish Market Since 2003</span>
          </div>

          <a 
            href="#reviews"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/30 text-slate-300 text-xs font-medium backdrop-blur-sm transition-all"
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white">4.9 / 5</span>
            <span className="text-slate-400">({storeData.storeInfo.reviewsCount} Google Reviews)</span>
          </a>
        </div>

        {/* Main Grid: Headline & Interactive Device Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Hyderabad’s Premier <br />
                <span className="text-gradient-emerald">Certified Pre-Owned</span> <br />
                <span className="text-gradient-apple">iPhone Destination.</span>
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Genuine pre-owned iPhones rigorously tested across <strong className="text-white font-semibold">60+ hardware checkpoints</strong>. Verified original battery health, pristine cosmetics, store warranty, and instant spot exchange under one roof at Jagdish Market.
              </p>
            </div>

            {/* Checkmark Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Original Apple Parts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>85% - 100% Battery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Store Warranty + Bill</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>TrueTone &amp; FaceID</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Spot Cash Buyback</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Door Delivery in Hyd</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <a
                href="#inventory"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 group"
              >
                <Smartphone className="w-4 h-4" />
                <span>Explore Live Stock</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenTradeIn}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/10 hover:border-emerald-500/40 transition-all flex items-center justify-center gap-2"
              >
                <Repeat className="w-4 h-4 text-emerald-400" />
                <span>Instant Trade-In Calculator</span>
              </button>

              <a
                href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to check prices and models available today.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-medium border border-white/10 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Store</span>
              </a>
            </div>

            {/* Micro Address & Direction Link */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Chirag Ali Lane, Jagdish Market, Abids, Hyderabad
              </span>
              <a 
                href={storeData.storeInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-semibold"
              >
                Open in Maps →
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Flagship Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Device Selector Tabs */}
              <div className="flex p-1 mb-4 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                {featuredDevices.map((d, index) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex-1 py-2 px-1 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === index 
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d.name.replace('iPhone ', '').replace('Standard', '')}
                  </button>
                ))}
              </div>

              {/* Showcase Card */}
              <div className="relative rounded-2xl p-6 glass-panel-elevated border border-white/15 overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
                
                {/* Glow ring in card */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    {activeDevice.tag}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                    {activeDevice.battery}
                  </span>
                </div>

                {/* Photo with Frame */}
                <div className="relative h-64 sm:h-72 w-full rounded-xl bg-gradient-to-b from-slate-800/40 to-slate-900/80 border border-white/5 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={activeDevice.image}
                    alt={activeDevice.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] text-slate-300 border border-white/10">
                    {activeDevice.condition}
                  </div>
                </div>

                {/* Details Footer */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeDevice.name}</h3>
                      <p className="text-xs text-slate-400">{activeDevice.edition}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-emerald-400">{activeDevice.price}</div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Store Price</span>
                    </div>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProduct(activeDevice.id)}
                      className="w-full py-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors"
                    >
                      View Specs &amp; Checklist
                    </button>

                    <a
                      href={createWhatsAppUrl(`Hi Sikandar Bhai, I want to inquire about ${activeDevice.name} (${activeDevice.edition}) shown on the website.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Now</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom Key Stats Row */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">20+ <span className="text-emerald-400">Years</span></div>
            <p className="text-xs text-slate-400 font-medium">Serving Hyderabad Since 2003</p>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4.9 ★</div>
            <p className="text-xs text-slate-400 font-medium">242+ Genuine Google Reviews</p>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">60-Point</div>
            <p className="text-xs text-slate-400 font-medium">Quality Diagnostic Inspection</p>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">10 Mins</div>
            <p className="text-xs text-slate-400 font-medium">Spot Cash Payout for Used Phones</p>
          </div>
        </div>

      </div>
    </section>
  );
}
