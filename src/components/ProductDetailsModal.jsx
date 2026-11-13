import React, { useState, useEffect } from "react";
import {
  X,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  Battery,
  HardDrive,
  Cpu,
  Smartphone,
  Camera,
  PackageCheck,
  ExternalLink,
  Heart,
  ShoppingCart,
} from "lucide-react";
import {
  createWhatsAppUrl,
  CASHIFY_APP_URL,
  CONDITION_GRADES,
  getVariantConditionPricing,
} from "../data/storeData";

export default function ProductDetailsModal({
  product,
  initialStorage,
  initialColor,
  initialCondition = "good",
  isFavorite = false,
  onToggleFavorite,
  onClose,
  onAddToBag,
}) {
  const [selectedStorage, setSelectedStorage] = useState(
    initialStorage || product?.variants?.[0]?.storage || "256GB"
  );
  const [selectedColor, setSelectedColor] = useState(
    initialColor || product?.colors?.[0]?.name || "Default"
  );
  const [selectedCondition, setSelectedCondition] = useState(initialCondition || "good");

  useEffect(() => {
    if (product) {
      setSelectedStorage(initialStorage || product.variants?.[0]?.storage || "256GB");
      setSelectedColor(initialColor || product.colors?.[0]?.name || "Default");
      setSelectedCondition(initialCondition || "good");
    }
  }, [product, initialStorage, initialColor, initialCondition]);

  if (!product) return null;

  const activeVariant =
    product.variants?.find((v) => v.storage === selectedStorage) || product.variants?.[0];

  const pricing = getVariantConditionPricing(activeVariant, selectedCondition);

  const handleReserve = () => {
    const msg = `Hi Sikandar Bhai! I want to buy the certified ${product.name} [${product.ram} | ${selectedStorage} | ${pricing.condition.label} Condition | ${selectedColor}].\n\nCashify App Ref: ${pricing.cashifyPriceFormatted} → Store Price: ${pricing.storePriceFormatted} (+₹500).\nPlease share 3uTools verification & availability at Abids showroom.`;
    window.open(createWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const handleAddToCart = () => {
    onAddToBag({
      ...product,
      selectedStorage,
      selectedColor,
      selectedCondition,
      cashifyPrice: pricing.cashifyPrice,
      storePrice: pricing.storePrice,
      price: pricing.storePriceFormatted,
      originalPrice: pricing.originalPriceFormatted,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0D14]/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-4xl bg-[#141923] border border-[#262F40] rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] grid grid-cols-1 md:grid-cols-12 max-h-[92vh] overflow-y-auto">
        {/* Top Right Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleFavorite?.(product.id)}
            aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
              isFavorite
                ? "bg-rose-500/15 border-rose-500/40 text-rose-400"
                : "bg-[#0A0D14]/90 border-[#262F40] text-[#94A3B8] hover:text-rose-400 hover:border-rose-500/40"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-400" : ""}`} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Product Inspection"
            className="w-10 h-10 rounded-xl bg-[#0A0D14]/90 hover:bg-[#1e2636] border border-[#262F40] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Left Side: Device Showcase & Transparent Pricing Box */}
        <div className="md:col-span-5 bg-[#0A0D14] p-7 sm:p-8 flex flex-col items-center justify-between relative border-b md:border-b-0 md:border-r border-[#262F40]">
          <div className="ambient-phone-glow" aria-hidden="true" />

          <div className="relative z-10 w-full flex flex-wrap items-center gap-2">
            <span className="pill-grade-cyan">{product.badge}</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0066FF]/15 border border-[#0066FF]/35 text-[#F8FAFC]">
              <Cpu className="w-3 h-3 text-[#00F0FF]" />
              {product.ram}
            </span>
          </div>

          <div className="relative z-10 my-5 w-52 h-60 flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={`${product.name} - ${selectedColor}`}
                className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,102,255,0.28)] rounded-xl"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 rounded-xl border border-dashed border-[#262F40] bg-[#111318]/60">
                <div className="w-10 h-10 rounded-full bg-[#0A0D14] border border-[#262F40] flex items-center justify-center mb-2 text-[#94A3B8]">
                  <Camera className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-white">Photo Awaiting Upload</p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">Sikandar Bhai is uploading store photo separately</p>
              </div>
            )}
          </div>

          {/* Transparent Cashify App + ₹500 Card */}
          <div className="relative z-10 w-full rounded-xl bg-[#141923] border border-[#262F40] p-3.5 space-y-2 mb-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">
                Cashify App ({pricing.condition.label} • {selectedStorage})
              </span>
              <span className="font-mono font-bold text-[#F8FAFC] tabular-nums">
                {pricing.cashifyPriceFormatted}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#00F0FF]">Abids Store Verification &amp; Warranty</span>
              <span className="font-mono font-bold text-[#00F0FF] tabular-nums">+ ₹500</span>
            </div>
            <div className="pt-2 border-t border-[#262F40] flex items-center justify-between text-sm">
              <span className="font-bold text-[#F8FAFC]">Direct Buy Price</span>
              <span className="font-extrabold text-[#F8FAFC] tabular-nums">
                {pricing.storePriceFormatted}
              </span>
            </div>
          </div>

          <a
            href={CASHIFY_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#00F0FF] hover:underline"
          >
            <span>Verify Cashify Android App Base Price</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Right Side: Interactive Variants (Condition + Storage + Color) & Specs */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#00F0FF] mb-1">
              {product.series} • {product.formFactor} • {product.ram}
            </div>
            <h2
              id="modal-product-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight pr-16"
            >
              {product.name}
            </h2>

            {/* Live Pricing */}
            <div className="flex flex-wrap items-baseline gap-3 mt-3 pb-4 border-b border-[#262F40]">
              <span className="text-3xl font-extrabold text-[#F8FAFC] tabular-nums">
                {pricing.storePriceFormatted}
              </span>
              <span className="text-base text-[#94A3B8] line-through tabular-nums">
                {pricing.originalPriceFormatted}
              </span>
              <span className="text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2.5 py-0.5 rounded-md">
                {pricing.savingsFormatted} ({pricing.discountPercent}% OFF)
              </span>
            </div>

            {/* 1. Condition Selector (Fair / Good / Superb) */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                  Condition Grade:{" "}
                  <span className="text-[#00F0FF]">{pricing.condition.badge}</span>
                </span>
                <span className="text-[11px] text-[#94A3B8]">{pricing.condition.batteryRange}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {CONDITION_GRADES.map((grade) => {
                  const isActive = grade.id === selectedCondition;
                  return (
                    <button
                      type="button"
                      key={grade.id}
                      onClick={() => setSelectedCondition(grade.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isActive
                          ? "bg-[#0066FF]/15 border-[#0066FF] text-[#F8FAFC] shadow-[0_0_16px_rgba(0,102,255,0.3)]"
                          : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:border-[#0066FF]/50 hover:text-[#F8FAFC]"
                      }`}
                    >
                      <div className="text-xs font-bold">{grade.label}</div>
                      <div className="text-[10px] text-[#00F0FF] mt-0.5">{grade.batteryRange}</div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-1.5">{pricing.condition.summary}</p>
            </div>

            {/* 2. Storage Variant Picker */}
            <div className="mt-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                Select Storage Capacity ({product.ram}):{" "}
                <span className="text-[#F8FAFC]">{selectedStorage}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.variants?.map((variant) => {
                  const isActive = variant.storage === selectedStorage;
                  return (
                    <button
                      type="button"
                      key={variant.storage}
                      onClick={() => setSelectedStorage(variant.storage)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isActive
                          ? "bg-[#0066FF] border-[#0066FF] text-[#F8FAFC] shadow-[0_4px_14px_rgba(0,102,255,0.4)]"
                          : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:border-[#0066FF]/50 hover:text-[#F8FAFC]"
                      }`}
                    >
                      {variant.storage}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Color Variant Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                  Select Color Finish:{" "}
                  <span className="text-[#00F0FF]">{selectedColor}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((col) => {
                    const isActive = col.name === selectedColor;
                    return (
                      <button
                        type="button"
                        key={col.name}
                        onClick={() => setSelectedColor(col.name)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          isActive
                            ? "bg-[#1e2636] border-[#00F0FF] text-[#F8FAFC] shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                            : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC]"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/25 shrink-0"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Hardware Spec Grid */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#0A0D14] border border-[#262F40] flex items-start gap-2.5">
                <Cpu className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#94A3B8] block">Processor &amp; RAM</span>
                  <span className="font-semibold text-[#F8FAFC]">{product.specs.chip}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0D14] border border-[#262F40] flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#94A3B8] block">Display Panel</span>
                  <span className="font-semibold text-[#F8FAFC]">{product.specs.display}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0D14] border border-[#262F40] flex items-start gap-2.5">
                <Camera className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#94A3B8] block">Camera System</span>
                  <span className="font-semibold text-[#F8FAFC]">{product.specs.camera}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0D14] border border-[#262F40] flex items-start gap-2.5">
                <PackageCheck className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#94A3B8] block">Included Kit</span>
                  <span className="font-semibold text-[#F8FAFC]">{product.specs.box}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#262F40] flex flex-wrap gap-4 text-xs text-[#94A3B8]">
              <span className="flex items-center gap-1.5 text-[#F8FAFC]">
                <Battery className="w-4 h-4 text-[#00F0FF]" />
                {pricing.condition.batteryRange}
              </span>
              <span className="flex items-center gap-1.5 text-[#F8FAFC]">
                <HardDrive className="w-4 h-4 text-[#00F0FF]" />
                {selectedStorage} ({product.ram})
              </span>
              <span className="flex items-center gap-1.5 text-[#F8FAFC]">
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                {product.warranty}
              </span>
            </div>
          </div>

          {/* Modal CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 btn-secondary-titanium py-3.5 px-5 text-sm font-bold flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 text-[#00F0FF]" />
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleReserve}
              className="flex-1 btn-primary-cobalt py-3.5 px-5 text-sm font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Buy via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
