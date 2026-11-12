import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  BatteryCharging,
  CheckCircle2,
  Cpu,
  HardDrive,
  Heart,
  MessageCircle,
  Package,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  ArrowLeftRight,
} from "lucide-react";
import { fetchProductBySlug, buildWhatsAppEnquiryUrl, submitCustomerEnquiry } from "../lib/api";
import { formatINR } from "../data/storeData";
import { useStore } from "../context/StoreContext";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const {
    products,
    shopSettings,
    addToCart,
    favorites,
    toggleFavorite,
    compareIds,
    toggleCompare,
  } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    let active = true;
    const fromContext = products.find((p) => p.slug === slug || p.id === slug);
    if (fromContext) {
      setProduct(fromContext);
      setSelectedStorage(fromContext.variants?.[0]?.storage || "128GB");
      setSelectedColor(fromContext.colors?.[0]?.name || "Titanium");
      setLoading(false);
    }

    fetchProductBySlug(slug)
      .then((res) => {
        if (!active || !res) return;
        setProduct(res);
        setSelectedStorage((prev) => prev || res.variants?.[0]?.storage || "128GB");
        setSelectedColor((prev) => prev || res.colors?.[0]?.name || "Titanium");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug, products]);

  // Dynamic SEO page title per product
  useEffect(() => {
    if (product) {
      document.title = `${product.name} (${selectedStorage}) | ${shopSettings.storeName}`;
    }
    return () => {
      document.title = "Sikandar's Mobile Store | Certified Pre-Owned iPhones";
    };
  }, [product, selectedStorage, shopSettings.storeName]);

  if (loading && !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-[#858A94]">
        Loading certified device details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-white">Device Not Found</h1>
        <p className="text-sm text-[#858A94]">
          This model may have been removed or sold out from active inventory.
        </p>
        <Link to="/" className="btn-electric px-6 py-3 text-xs gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Showroom</span>
        </Link>
      </div>
    );
  }

  const gallery =
    Array.isArray(product.galleryImages) && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image].filter(Boolean);

  const variants = product.variants || [{ storage: "128GB", storePrice: product.displayPrice || 25500 }];
  const activeVariant = variants.find((v) => v.storage === selectedStorage) || variants[0];
  const priceNumber = Number(activeVariant.storePrice || product.displayPrice || 0);
  const priceFormatted = formatINR(priceNumber);
  const inStock = !product.isSold && (product.stockCount ?? 1) > 0;
  const isFav = favorites.includes(product.id);
  const isCompared = compareIds.includes(product.id);

  const handleWhatsAppEnquiry = () => {
    const waUrl = buildWhatsAppEnquiryUrl(shopSettings.whatsapp, {
      name: product.name,
      storage: selectedStorage,
      colour: selectedColor,
      price: priceFormatted,
    });
    window.open(waUrl, "_blank", "noopener,noreferrer");
    submitCustomerEnquiry({
      productId: product.id,
      productName: product.name,
      storage: selectedStorage,
      colour: selectedColor,
      price: priceFormatted,
      message: `Detail page enquiry for ${product.name}`,
      source: "product-detail-page",
    }).catch(() => {});
  };

  return (
    <main className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link
        to="/#explore-catalogue"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#C5C7CC] hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#3478F6]" />
        <span>Back to Full Catalogue</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Gallery Showcase (Front / Rear / Angles) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="surface-charcoal p-6 h-[380px] sm:h-[480px] flex items-center justify-center relative overflow-hidden">
            <div className="device-glow-backdrop" />
            <img
              src={gallery[activePhotoIndex] || product.image}
              alt={`${product.name} angle ${activePhotoIndex + 1}`}
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_25px_55px_rgba(0,0,0,0.85)]"
            />
          </div>

          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={`${imgUrl}-${idx}`}
                  type="button"
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`h-20 rounded-xl bg-[#111318] border p-2 flex items-center justify-center transition-all cursor-pointer ${
                    activePhotoIndex === idx
                      ? "border-[#3478F6] shadow-[0_0_16px_rgba(52,120,246,0.35)]"
                      : "border-[#C5C7CC]/15 hover:border-[#C5C7CC]/40"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="max-h-full w-auto object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Full Specs & Enquiry Configurator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill-electric">{product.series}</span>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase border ${
                  inStock
                    ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
                    : "bg-rose-500/10 border-rose-400/30 text-rose-300"
                }`}
              >
                {inStock ? `Available in Stock (${product.stockCount ?? 1})` : "Sold Out"}
              </span>
              <span className="pill-titanium">{product.conditionGrade || "Superb"} Condition</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                {priceFormatted}
              </span>
              {activeVariant.originalMrp > priceNumber && (
                <span className="text-base text-[#858A94] line-through tabular-nums">
                  {formatINR(activeVariant.originalMrp)}
                </span>
              )}
              {activeVariant.originalMrp > priceNumber && (
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300 tabular-nums">
                  Save {formatINR(activeVariant.originalMrp - priceNumber)}
                </span>
              )}
            </div>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-[#08090C]/80 px-3 py-1.5 text-xs text-[#C5C7CC] tabular-nums">
              <span className="text-[#858A94]">Cashify App Ref:</span>
              <span className="font-semibold text-white">
                {formatINR(
                  Number(
                    activeVariant.cashifyPrice ||
                      product.cashifyPrice ||
                      Math.max(0, priceNumber - 500)
                  )
                )}
              </span>
              <span className="text-[#3478F6] font-bold">+ ₹500 Store Margin</span>
            </div>
          </div>

          {/* Storage Picker */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#858A94] block mb-2">
              Storage Variant: <strong className="text-white">{selectedStorage}</strong>
            </span>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v.storage}
                  type="button"
                  onClick={() => setSelectedStorage(v.storage)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    v.storage === selectedStorage
                      ? "bg-[#3478F6] border-[#3478F6] text-white"
                      : "bg-[#111318] border-[#C5C7CC]/15 text-[#C5C7CC]"
                  }`}
                >
                  {v.storage} — {formatINR(v.storePrice || priceNumber)}
                </button>
              ))}
            </div>
          </div>

          {/* Colour Picker */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#858A94] block mb-2">
                Colour Finish: <strong className="text-white">{selectedColor}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      c.name === selectedColor
                        ? "bg-[#111318] border-[#3478F6] text-white"
                        : "bg-[#08090C] border-[#C5C7CC]/15 text-[#858A94]"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30"
                      style={{ backgroundColor: c.hex || "#858A94" }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppEnquiry}
              disabled={!inStock}
              className="flex-1 btn-electric py-4 px-6 text-sm gap-2 disabled:opacity-40"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Enquire on WhatsApp</span>
            </button>

            <button
              type="button"
              disabled={!inStock}
              onClick={() =>
                addToCart({
                  ...product,
                  selectedStorage,
                  selectedColor,
                  selectedCondition: product.conditionGrade || "Good",
                  storePrice: priceNumber,
                  price: priceFormatted,
                })
              }
              className="btn-titanium py-4 px-5 text-sm gap-2 disabled:opacity-40"
            >
              <ShoppingCart className="w-4 h-4 text-[#3478F6]" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label="Toggle favorite"
              className="btn-titanium py-4 px-4"
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-rose-400 text-rose-400" : ""}`} />
            </button>

            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              aria-label="Toggle compare"
              className={`btn-titanium py-4 px-4 ${isCompared ? "border-[#3478F6] text-[#3478F6]" : ""}`}
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Complete Technical, Inspection, Warranty & Return Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#C5C7CC]/10 text-xs">
            <div className="surface-charcoal p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[#858A94] font-semibold">
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
                <span>Battery Health</span>
              </div>
              <div className="text-white font-bold">{product.batteryHealth || "92% – 98% Health"}</div>
            </div>

            <div className="surface-charcoal p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[#858A94] font-semibold">
                <Cpu className="w-4 h-4 text-[#3478F6]" />
                <span>Chipset &amp; Memory</span>
              </div>
              <div className="text-white font-bold">{product.specs?.chip || product.ram}</div>
            </div>

            <div className="surface-charcoal p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[#858A94] font-semibold">
                <HardDrive className="w-4 h-4 text-[#3478F6]" />
                <span>Display &amp; Camera</span>
              </div>
              <div className="text-white font-bold">
                {product.specs?.display || "Super Retina XDR"} • {product.specs?.camera || "Pro Camera"}
              </div>
            </div>

            <div className="surface-charcoal p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[#858A94] font-semibold">
                <Package className="w-4 h-4 text-[#3478F6]" />
                <span>Included Accessories</span>
              </div>
              <div className="text-white font-bold">{product.accessories || product.specs?.box || "Charging Cable & Bill"}</div>
            </div>

            <div className="surface-charcoal p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[#858A94] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#3478F6]" />
                <span>Warranty &amp; Inspection</span>
              </div>
              <div className="text-white font-bold">
                {product.warranty || shopSettings.warrantyPolicy} (3uTools Verified)
              </div>
            </div>

            <div className="surface-charcoal p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[#858A94] font-semibold">
                <RefreshCcw className="w-4 h-4 text-[#3478F6]" />
                <span>Return / Verification Window</span>
              </div>
              <div className="text-white font-bold">
                {product.returnPolicy || shopSettings.returnPolicy}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 flex items-start gap-3 text-xs text-[#C5C7CC]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              IMEI, Activation Lock (Find My Off), Face ID, True Tone &amp; camera optical test can be verified live on our showroom counter monitor prior to billing.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
