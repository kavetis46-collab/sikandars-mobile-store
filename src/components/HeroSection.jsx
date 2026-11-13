import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  PhoneCall,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Camera,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useStore } from "../context/StoreContext";
import { formatINR } from "../data/storeData";
import { buildWhatsAppEnquiryUrl } from "../lib/api";

const HERO_IDS = [
  "iphone-16-pro-max",
  "iphone-18-pro-max",
  "iphone-17",
  "iphone-15-pro-max",
  "iphone-14-plus",
  "iphone-13",
];

export default function HeroSection() {
  const { products, shopSettings } = useStore();
  const [selectedHeroIdx, setSelectedHeroIdx] = useState(0);
  const [selectedStorageIdx, setSelectedStorageIdx] = useState(0);

  const heroModels = HERO_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const displayList = heroModels.length > 0 ? heroModels : products.slice(0, 5);
  const activeProduct = displayList[selectedHeroIdx % Math.max(1, displayList.length)];

  const variants = activeProduct?.variants || [];
  const activeVariant =
    variants[selectedStorageIdx % Math.max(1, variants.length)] || {
      storage: "256GB",
      storePrice: activeProduct?.displayPrice || 90000,
      cashifyPrice: activeProduct?.cashifyPrice || 89500,
      originalMrp: 144900,
    };

  const storePrice = Number(activeVariant.storePrice || activeProduct?.displayPrice || 0);
  const cashifyPrice = Number(activeVariant.cashifyPrice || Math.max(0, storePrice - 500));
  const originalMrp = Number(activeVariant.originalMrp || storePrice);
  const savings = Math.max(0, originalMrp - storePrice);

  return (
    <section
      id="hero"
      className="relative bg-midnight-studio overflow-hidden border-b border-[#C5C7CC]/10"
    >
      {/* Subtle Studio Spotlight Glow */}
      <div
        className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#3478F6]/12 blur-[140px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 relative z-10">
        {/* Top Row: Clean Metallic Brand Identity + Transparent Pricing Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <BrandLogo showTagline={true} />
          <div className="pill-electric">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cashify App Price + ₹500 Transparent Store Standard</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clean Commercial Headline + Price Card + CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] text-gradient-titanium">
              YOUR NEXT IPHONE STARTS HERE.
            </h1>

            <p className="text-base sm:text-lg text-[#C5C7CC] max-w-xl leading-relaxed">
              Discover premium pre-owned iPhones with complete full-phone inspection, honest battery health reporting, and clearly stated prices.
            </p>

            {/* Transparent Selected Model Price Breakdown Box */}
            {activeProduct && (
              <div className="surface-charcoal p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#3478F6]">
                      {activeProduct.series} • {activeProduct.ram}
                    </div>
                    <h2 className="text-xl font-extrabold text-white mt-0.5">
                      {activeProduct.name}
                    </h2>
                  </div>

                  <span className="pill-titanium">{activeProduct.batteryHealth || "92% – 100% Health"}</span>
                </div>

                {/* Storage Switcher */}
                <div className="flex flex-wrap gap-1.5">
                  {variants.map((v, idx) => (
                    <button
                      key={v.storage}
                      type="button"
                      onClick={() => setSelectedStorageIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        idx === selectedStorageIdx % variants.length
                          ? "bg-[#3478F6] border-[#3478F6] text-white"
                          : "bg-[#08090C] border-[#C5C7CC]/15 text-[#C5C7CC] hover:text-white"
                      }`}
                    >
                      {v.storage}
                    </button>
                  ))}
                </div>

                {/* Exact Clear Pricing Display */}
                <div className="pt-3 border-t border-[#C5C7CC]/10 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-[#858A94] uppercase font-semibold">
                      Store Selling Price ({activeVariant.storage})
                    </div>
                    <div className="flex items-baseline gap-2.5 mt-0.5">
                      <span className="text-3xl font-extrabold text-white tabular-nums">
                        {formatINR(storePrice)}
                      </span>
                      {originalMrp > storePrice && (
                        <span className="text-sm text-[#858A94] line-through tabular-nums">
                          {formatINR(originalMrp)}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#93C5FD] font-semibold mt-1 tabular-nums">
                      Cashify App Ref: {formatINR(cashifyPrice)} + ₹500
                      {savings > 0 ? ` • Save ${formatINR(savings)}` : ""}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/iphone/${activeProduct.slug || activeProduct.id}`}
                      className="btn-titanium px-4 py-2.5 text-xs"
                    >
                      Full Specs
                    </Link>
                    <a
                      href={buildWhatsAppEnquiryUrl(shopSettings.whatsapp, {
                        name: activeProduct.name,
                        storage: activeVariant.storage,
                        colour: activeProduct.colors?.[0]?.name,
                        price: formatINR(storePrice),
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-electric px-4 py-2.5 text-xs gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Primary Navigation CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="#explore-catalogue"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("explore-catalogue")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-electric px-7 py-3.5 text-sm gap-2"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#location"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("location")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-titanium px-7 py-3.5 text-sm gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#3478F6]" />
                <span>CONTACT US</span>
              </a>
            </div>
          </div>

          {/* Right Column: Full Mobile Phone Studio Frame (Un-cropped Full Device Visual) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="surface-charcoal p-6 sm:p-8 h-[420px] sm:h-[490px] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="device-glow-backdrop" />

              {activeProduct && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="relative z-10 w-full h-[320px] sm:h-[380px] flex items-center justify-center"
                  >
                    {activeProduct.image ? (
                      <img
                        src={activeProduct.image}
                        alt={`${activeProduct.name} full phone`}
                        className="w-full h-full object-contain drop-shadow-[0_24px_45px_rgba(0,0,0,0.8)]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-dashed border-[#C5C7CC]/20 bg-[#08090C]/60">
                        <div className="w-14 h-14 rounded-full bg-[#111318] border border-[#C5C7CC]/25 flex items-center justify-center mb-3 text-[#C5C7CC]">
                          <Camera className="w-7 h-7 stroke-[1.5]" />
                        </div>
                        <p className="text-sm font-bold text-white tracking-wide">Photo Awaiting Upload</p>
                        <p className="text-xs text-[#858A94] mt-1 max-w-[200px]">
                          Sikandar Bhai is uploading store photo separately
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

              <div className="relative z-10 mt-3 flex items-center gap-4 text-[11px] text-[#C5C7CC]">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  100% Genuine Hardware
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3478F6]" />
                  3uTools Verified
                </span>
              </div>
            </div>

            {/* Flagship Full-Phone Switcher Tabs */}
            {displayList.length > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {displayList.map((prod, idx) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setSelectedHeroIdx(idx);
                      setSelectedStorageIdx(0);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      idx === selectedHeroIdx % displayList.length
                        ? "bg-[#3478F6] border-[#3478F6] text-white"
                        : "bg-[#111318] border-[#C5C7CC]/15 text-[#C5C7CC] hover:text-white"
                    }`}
                  >
                    {prod.name.replace("Apple ", "")}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
