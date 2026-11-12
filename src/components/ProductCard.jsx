import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  MessageCircle,
  ArrowLeftRight,
  BatteryCharging,
  Cpu,
  HardDrive,
  ExternalLink,
} from "lucide-react";
import { formatINR } from "../data/storeData";
import { buildWhatsAppEnquiryUrl, submitCustomerEnquiry } from "../lib/api";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const {
    shopSettings,
    favorites,
    toggleFavorite,
    compareIds,
    toggleCompare,
    addToCart,
  } = useStore();

  const variants = Array.isArray(product.variants) && product.variants.length > 0
    ? product.variants
    : [{ storage: "128GB", storePrice: product.displayPrice || 25500, cashifyPrice: product.cashifyPrice || 25000, originalMrp: 59900 }];

  const colors = Array.isArray(product.colors) && product.colors.length > 0
    ? product.colors
    : [{ name: "Titanium", hex: "#858A94" }];

  const [selectedStorage, setSelectedStorage] = useState(variants[0].storage);
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const activeVariant =
    variants.find((v) => v.storage === selectedStorage) || variants[0];

  const sellingPriceNumber = Number(activeVariant.storePrice || product.displayPrice || 0);
  const sellingPriceFormatted = formatINR(sellingPriceNumber);
  const mrpFormatted = activeVariant.originalMrp ? formatINR(activeVariant.originalMrp) : null;

  const isFav = favorites.includes(product.id);
  const isCompared = compareIds.includes(product.id);
  const inStock = !product.isSold && (product.stockCount ?? 1) > 0;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 6, ry: x * 6 });
  };

  const handleWhatsApp = async (e) => {
    e.stopPropagation();
    const url = buildWhatsAppEnquiryUrl(shopSettings.whatsapp, {
      name: product.name,
      storage: selectedStorage,
      colour: selectedColor,
      price: sellingPriceFormatted,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    // Log enquiry silently for Admin Dashboard tracking
    submitCustomerEnquiry({
      productId: product.id,
      productName: product.name,
      storage: selectedStorage,
      colour: selectedColor,
      price: sellingPriceFormatted,
      message: `Product card WhatsApp click for ${product.name}`,
      source: "product-card-whatsapp",
    }).catch(() => {});
  };

  const handleAddCart = () => {
    addToCart({
      ...product,
      selectedStorage,
      selectedColor,
      selectedCondition: product.conditionGrade || "Good",
      storePrice: sellingPriceNumber,
      cashifyPrice: Number(activeVariant.cashifyPrice || product.cashifyPrice || Math.max(0, sellingPriceNumber - 500)),
      price: sellingPriceFormatted,
    });
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{ transformStyle: "preserve-3d" }}
      className="surface-charcoal p-5 flex flex-col justify-between relative group overflow-hidden"
    >
      {/* Top Status Bar: Stock Status + Condition + Favorite & Compare */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              inStock
                ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
                : "bg-rose-500/10 border-rose-400/30 text-rose-300"
            }`}
          >
            {inStock ? `In Stock (${product.stockCount ?? 1})` : "Sold Out"}
          </span>
          <span className="pill-titanium">{product.conditionGrade || "Superb"}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => toggleCompare(product.id)}
            aria-label={isCompared ? "Remove from comparison" : "Add to compare"}
            title="Compare device"
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              isCompared
                ? "bg-[#3478F6]/20 border-[#3478F6] text-[#93C5FD]"
                : "bg-[#08090C] border-[#C5C7CC]/15 text-[#858A94] hover:text-white"
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => toggleFavorite(product.id)}
            aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
              isFav
                ? "bg-rose-500/15 border-rose-400/40 text-rose-400"
                : "bg-[#08090C] border-[#C5C7CC]/15 text-[#858A94] hover:text-rose-400"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-rose-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* Product Image Box */}
      <Link
        to={`/iphone/${product.slug || product.id}`}
        className="relative h-44 rounded-2xl bg-[#08090C]/80 border border-[#C5C7CC]/10 flex items-center justify-center overflow-hidden mb-4"
      >
        <div className="device-glow-backdrop" />
        <img
          src={product.image}
          alt={`${product.name} ${selectedStorage} ${selectedColor}`}
          loading="lazy"
          className="relative z-10 max-h-38 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_14px_26px_rgba(0,0,0,0.75)]"
        />
        <span className="absolute bottom-2.5 right-2.5 z-20 px-2.5 py-1 rounded-full bg-[#111318]/90 border border-[#C5C7CC]/20 text-[10px] font-semibold text-[#C5C7CC] opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
          Details <ExternalLink className="w-2.5 h-2.5 text-[#3478F6]" />
        </span>
      </Link>

      {/* Product Info */}
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#858A94] font-semibold mb-0.5">
            <span>{product.series}</span>
            <span className="inline-flex items-center gap-1 text-[#C5C7CC]">
              <Cpu className="w-3 h-3 text-[#3478F6]" />
              {product.ram}
            </span>
          </div>

          <Link to={`/iphone/${product.slug || product.id}`}>
            <h3 className="text-lg font-extrabold text-white group-hover:text-[#93C5FD] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Battery Health Row */}
          <div className="flex items-center gap-1.5 text-xs text-[#C5C7CC] mt-1.5">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Battery: {product.batteryHealth || "92% – 98% Health"}</span>
          </div>

          {/* Storage Selector */}
          <div className="mt-3">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#858A94] mb-1.5">
              <HardDrive className="w-3 h-3 text-[#3478F6]" />
              <span>Storage: <span className="text-white">{selectedStorage}</span></span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {variants.map((v) => {
                const active = v.storage === selectedStorage;
                return (
                  <button
                    key={v.storage}
                    type="button"
                    onClick={() => setSelectedStorage(v.storage)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                      active
                        ? "bg-[#3478F6] border-[#3478F6] text-white"
                        : "bg-[#08090C] border-[#C5C7CC]/15 text-[#858A94] hover:text-white"
                    }`}
                  >
                    {v.storage}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colour Swatches */}
          <div className="mt-2.5">
            <div className="text-[11px] text-[#858A94] mb-1 truncate">
              Colour: <span className="text-white font-medium">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {colors.map((c) => {
                const active = c.name === selectedColor;
                return (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    aria-label={`Select colour ${c.name}`}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-4.5 h-4.5 rounded-full border transition-all cursor-pointer ${
                      active
                        ? "ring-2 ring-[#3478F6] ring-offset-2 ring-offset-[#111318] border-white scale-110"
                        : "border-white/25 hover:scale-110"
                    }`}
                    style={{ backgroundColor: c.hex || "#858A94" }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Selling Price & Actions */}
        <div className="pt-3 border-t border-[#C5C7CC]/10 space-y-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-xl font-extrabold text-white tabular-nums">
                {sellingPriceFormatted}
              </span>
              {mrpFormatted && activeVariant.originalMrp > sellingPriceNumber && (
                <span className="ml-2 text-xs text-[#858A94] line-through tabular-nums">
                  {mrpFormatted}
                </span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3478F6]/15 border border-[#3478F6]/35 text-[#93C5FD]">
                {product.discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="grid grid-cols-12 gap-2">
            <Link
              to={`/iphone/${product.slug || product.id}`}
              className="col-span-5 btn-titanium py-2.5 px-2 text-xs font-bold"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={handleAddCart}
              disabled={!inStock}
              aria-label={`Add ${product.name} to cart`}
              className="col-span-2 btn-titanium py-2.5 px-1 disabled:opacity-40"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#C5C7CC]" />
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              disabled={!inStock}
              className="col-span-5 btn-electric py-2.5 px-2 text-xs font-bold gap-1 disabled:opacity-40"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Enquire</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
