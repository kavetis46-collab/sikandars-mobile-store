import React, { useState, useMemo, useEffect } from "react";
import {
  CheckCircle2,
  Eye,
  MessageCircle,
  Search,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  ArrowUpDown,
  Cpu,
  HardDrive,
  ExternalLink,
  X,
  RotateCcw,
} from "lucide-react";
import {
  storeData,
  createWhatsAppUrl,
  CASHIFY_APP_URL,
  CONDITION_GRADES,
  getVariantConditionPricing,
} from "../data/storeData";

function ProductCard({
  product,
  globalCondition = "good",
  isFavorite = false,
  onToggleFavorite,
  onOpenModal,
  onAddToBag,
}) {
  const defaultStorage = product.variants?.[0]?.storage || "256GB";
  const defaultColor = product.colors?.[0]?.name || "Default";

  const [selectedStorage, setSelectedStorage] = useState(defaultStorage);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedCondition, setSelectedCondition] = useState(globalCondition);

  useEffect(() => {
    setSelectedCondition(globalCondition);
  }, [globalCondition]);

  const activeVariant =
    product.variants?.find((v) => v.storage === selectedStorage) || product.variants?.[0];

  const pricing = getVariantConditionPricing(activeVariant, selectedCondition);

  const handleCardWhatsApp = (e) => {
    e.stopPropagation();
    const message = `Hi Sikandar Bhai! I want to buy the certified ${product.name} [${product.ram} | ${selectedStorage} | ${pricing.condition.label} Condition | ${selectedColor}] at ${pricing.storePriceFormatted} (Cashify App ${pricing.cashifyPriceFormatted} + ₹500). Please confirm availability at Abids showroom.`;
    window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  const handleQuickAddToCart = (e) => {
    e.stopPropagation();
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
    <article className="card-obsidian p-5 flex flex-col justify-between group relative overflow-hidden">
      {/* Top Badge + Favorite Heart */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-col gap-1.5">
          <span className="pill-grade-cyan self-start">{product.badge}</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00F0FF] uppercase tracking-wider">
            <Cpu className="w-3 h-3" />
            {product.ram} • {selectedStorage}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(product.id);
          }}
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`}
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
            isFavorite
              ? "bg-rose-500/15 border-rose-500/40 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.25)]"
              : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:text-rose-400 hover:border-rose-500/40"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-400" : ""}`} />
        </button>
      </div>

      {/* Device Visual Showcase */}
      <div
        onClick={() =>
          onOpenModal(product, {
            storage: selectedStorage,
            color: selectedColor,
            condition: selectedCondition,
          })
        }
        className="relative h-44 w-full flex items-center justify-center my-1 cursor-pointer rounded-2xl bg-[#0A0D14]/65 border border-[#262F40]/60 overflow-hidden"
      >
        <div className="ambient-phone-glow" aria-hidden="true" />
        <img
          src={product.image}
          alt={`${product.name} ${selectedStorage} ${selectedColor}`}
          loading="lazy"
          className="relative z-10 max-h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_14px_24px_rgba(0,0,0,0.7)]"
        />

        <div className="absolute bottom-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#141923]/95 border border-[#0066FF] text-[10px] font-bold text-[#F8FAFC] shadow-lg">
            <Eye className="w-3 h-3 text-[#00F0FF]" />
            Inspect Specs
          </span>
        </div>
      </div>

      {/* Product Info & Interactive Variant Controls */}
      <div className="mt-3 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-0.5">
            {product.series} • {product.formFactor}
          </div>

          <h3
            onClick={() =>
              onOpenModal(product, {
                storage: selectedStorage,
                color: selectedColor,
                condition: selectedCondition,
              })
            }
            className="text-lg font-bold text-[#F8FAFC] leading-snug cursor-pointer group-hover:text-[#00F0FF] transition-colors"
          >
            {product.name}
          </h3>

          {/* Condition Selector: Fair / Good / Superb */}
          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
              <span>Condition: <span className="text-[#00F0FF]">{pricing.condition.label}</span></span>
              <span>{pricing.condition.batteryRange}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {CONDITION_GRADES.map((grade) => {
                const isActive = grade.id === selectedCondition;
                return (
                  <button
                    key={grade.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCondition(grade.id);
                    }}
                    className={`py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      isActive
                        ? "bg-[#0066FF]/20 border-[#00F0FF] text-[#F8FAFC]"
                        : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC]"
                    }`}
                  >
                    {grade.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Storage Selector */}
          <div className="mt-2.5">
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
              <HardDrive className="w-3 h-3 text-[#00F0FF]" />
              <span>Storage ({product.ram}): <span className="text-[#F8FAFC]">{selectedStorage}</span></span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.variants?.map((variant) => {
                const isActive = variant.storage === selectedStorage;
                return (
                  <button
                    key={variant.storage}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStorage(variant.storage);
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                      isActive
                        ? "bg-[#0066FF] border-[#0066FF] text-[#F8FAFC] shadow-[0_2px_10px_rgba(0,102,255,0.4)]"
                        : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#0066FF]/50"
                    }`}
                  >
                    {variant.storage}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Official Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-2.5">
              <div className="text-[11px] text-[#94A3B8] mb-1 truncate">
                Color: <span className="text-[#F8FAFC] font-medium">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {product.colors.map((col) => {
                  const isActive = col.name === selectedColor;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      title={col.name}
                      aria-label={`Select ${col.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor(col.name);
                      }}
                      className={`w-5 h-5 rounded-full border transition-all ${
                        isActive
                          ? "ring-2 ring-[#00F0FF] ring-offset-2 ring-offset-[#141923] border-white scale-110"
                          : "border-white/25 hover:scale-110"
                      }`}
                      style={{ backgroundColor: col.hex }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Block (Cashify App + ₹500) */}
          <div className="mt-3 pt-2.5 border-t border-[#262F40]/80">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-extrabold text-[#F8FAFC] tabular-nums">
                {pricing.storePriceFormatted}
              </span>
              <span className="text-xs text-[#94A3B8] line-through tabular-nums">
                {pricing.originalPriceFormatted}
              </span>
              <span className="ml-auto text-[10px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-1.5 py-0.5 rounded">
                -{pricing.discountPercent}%
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[11px] text-[#94A3B8] bg-[#0A0D14] border border-[#262F40] rounded-lg px-2.5 py-1.5">
              <span>Cashify App ({pricing.condition.label}):</span>
              <span className="font-mono font-bold text-[#00F0FF] tabular-nums">
                {pricing.cashifyPriceFormatted} + ₹500
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] mt-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
            <span className="truncate">{product.warranty}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-12 gap-2 pt-2 border-t border-[#262F40]/80">
          <button
            type="button"
            onClick={handleQuickAddToCart}
            className="col-span-6 btn-secondary-titanium py-2.5 px-2 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#00F0FF]" />
            Add to Cart
          </button>

          <button
            type="button"
            onClick={handleCardWhatsApp}
            className="col-span-6 btn-primary-cobalt py-2.5 px-2 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}

const RAM_OPTIONS = ["All", "4GB RAM", "6GB RAM", "8GB RAM", "12GB RAM"];
const STORAGE_OPTIONS = ["All", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB"];
const FORM_FACTORS = ["All", "Pro Max", "Pro", "Air", "Plus", "Standard", "mini", "e-Series"];
const PRICE_RANGES = [
  { id: "all", label: "All Budgets" },
  { id: "under-30k", label: "Under ₹30,000" },
  { id: "30k-60k", label: "₹30,000 – ₹60,000" },
  { id: "60k-100k", label: "₹60,000 – ₹1,00,000" },
  { id: "over-100k", label: "₹1,00,000+" },
];

export default function InventorySection({
  favorites = [],
  onToggleFavorite,
  onOpenModal,
  onAddToBag,
}) {
  const [selectedSeries, setSelectedSeries] = useState("All");
  const [selectedRam, setSelectedRam] = useState("All");
  const [selectedStorageFilter, setSelectedStorageFilter] = useState("All");
  const [selectedFormFactor, setSelectedFormFactor] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [globalCondition, setGlobalCondition] = useState("good");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFiltersPanel, setShowFiltersPanel] = useState(true);

  const seriesTabs = [
    "All",
    "iPhone 18 Series",
    "iPhone 17 Series",
    "iPhone 16 Series",
    "iPhone 15 Series",
    "iPhone 14 Series",
    "iPhone 13 Series",
    "iPhone 12 Series",
  ];

  const activeFilterCount = [
    selectedSeries !== "All",
    selectedRam !== "All",
    selectedStorageFilter !== "All",
    selectedFormFactor !== "All",
    selectedPriceRange !== "all",
    favoritesOnly,
    searchQuery.trim() !== "",
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSelectedSeries("All");
    setSelectedRam("All");
    setSelectedStorageFilter("All");
    setSelectedFormFactor("All");
    setSelectedPriceRange("all");
    setGlobalCondition("good");
    setFavoritesOnly(false);
    setSortBy("featured");
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = storeData.products.filter((product) => {
      if (selectedSeries !== "All" && product.series !== selectedSeries) return false;
      if (selectedRam !== "All" && product.ram !== selectedRam) return false;
      if (selectedFormFactor !== "All" && product.formFactor !== selectedFormFactor) return false;
      if (favoritesOnly && !favorites.includes(product.id)) return false;

      if (selectedStorageFilter !== "All") {
        const hasStorage = product.variants?.some((v) => v.storage === selectedStorageFilter);
        if (!hasStorage) return false;
      }

      const targetVariant =
        (selectedStorageFilter !== "All"
          ? product.variants?.find((v) => v.storage === selectedStorageFilter)
          : product.variants?.[0]) || product.variants?.[0];

      const pricing = getVariantConditionPricing(targetVariant, globalCondition);
      const p = pricing.storePrice;

      if (selectedPriceRange === "under-30k" && p >= 30000) return false;
      if (selectedPriceRange === "30k-60k" && (p < 30000 || p > 60000)) return false;
      if (selectedPriceRange === "60k-100k" && (p <= 60000 || p > 100000)) return false;
      if (selectedPriceRange === "over-100k" && p <= 100000) return false;

      if (q) {
        const haystack = [
          product.name,
          product.series,
          product.ram,
          product.formFactor,
          product.badge,
          product.specs?.chip || "",
          ...(product.variants?.map((v) => v.storage) || []),
          ...(product.colors?.map((c) => c.name) || []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    const getProductSortPricing = (prod) => {
      const v =
        (selectedStorageFilter !== "All"
          ? prod.variants?.find((x) => x.storage === selectedStorageFilter)
          : prod.variants?.[0]) || prod.variants?.[0];
      return getVariantConditionPricing(v, globalCondition);
    };

    const sorted = [...filtered];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => getProductSortPricing(a).storePrice - getProductSortPricing(b).storePrice);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => getProductSortPricing(b).storePrice - getProductSortPricing(a).storePrice);
    } else if (sortBy === "newest") {
      sorted.sort((a, b) => (b.generation || 0) - (a.generation || 0));
    } else if (sortBy === "discount-desc") {
      sorted.sort(
        (a, b) => getProductSortPricing(b).discountPercent - getProductSortPricing(a).discountPercent
      );
    }

    return sorted;
  }, [
    selectedSeries,
    selectedRam,
    selectedStorageFilter,
    selectedFormFactor,
    selectedPriceRange,
    globalCondition,
    favoritesOnly,
    favorites,
    sortBy,
    searchQuery,
  ]);

  return (
    <section
      id="inventory"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#262F40]"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <span className="pill-grade-cyan mb-3 inline-flex">
            Buy-Only Complete iPhone Lineup (12 mini to 18 Pro Max)
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Search, Filter &amp; Buy <span className="text-[#0066FF]">Certified iPhones</span>
          </h2>
          <p className="text-[#94A3B8] text-sm sm:text-base mt-3 max-w-2xl">
            Pick your exact{" "}
            <strong className="text-[#F8FAFC]">Condition (Fair / Good / Superb)</strong>,{" "}
            <strong className="text-[#F8FAFC]">RAM</strong>,{" "}
            <strong className="text-[#F8FAFC]">Storage (64GB–2TB)</strong>, and{" "}
            <strong className="text-[#F8FAFC]">Official Color</strong>. Every device is priced transparently at{" "}
            <strong className="text-[#00F0FF]">Cashify App Price + ₹500</strong>.
          </p>
        </div>

        <a
          href={CASHIFY_APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start lg:self-end px-4 py-2.5 rounded-xl bg-[#141923] border border-[#262F40] hover:border-[#00F0FF] text-xs font-bold text-[#F8FAFC] transition-all shrink-0"
        >
          <span>Cashify App Base Reference</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF]" />
        </a>
      </div>

      {/* Top Search, Sort & Filter Toolbar */}
      <div className="card-obsidian p-4 sm:p-5 mb-6 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Smart Search Input */}
          <div className="lg:col-span-6 relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model, RAM (8GB/12GB), storage (256GB), or color (Desert Titanium)..."
              aria-label="Search certified iPhones"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#0A0D14] border border-[#262F40] focus:border-[#0066FF] focus:outline-none text-sm text-[#F8FAFC] placeholder-[#94A3B8] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="lg:col-span-3 relative">
            <ArrowUpDown className="w-4 h-4 text-[#00F0FF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort iPhones"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0A0D14] border border-[#262F40] focus:border-[#0066FF] focus:outline-none text-xs sm:text-sm font-semibold text-[#F8FAFC] cursor-pointer"
            >
              <option value="featured">Sort: Featured Lineup</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Generation: Newest First</option>
              <option value="discount-desc">Discount: Highest % OFF</option>
            </select>
          </div>

          {/* Favorites Filter + Filters Toggle */}
          <div className="lg:col-span-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFavoritesOnly((prev) => !prev)}
              className={`flex-1 py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                favoritesOnly
                  ? "bg-rose-500/15 border-rose-500 text-rose-300"
                  : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC]"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? "fill-rose-400 text-rose-400" : ""}`} />
              <span>Saved ({favorites.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setShowFiltersPanel((prev) => !prev)}
              className={`py-3 px-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                showFiltersPanel
                  ? "bg-[#0066FF] border-[#0066FF] text-[#F8FAFC]"
                  : "bg-[#0A0D14] border-[#262F40] text-[#F8FAFC]"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#0A0D14]/70 text-[#00F0FF] text-[10px]">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Multi-Faceted Filters Panel */}
        {showFiltersPanel && (
          <div className="pt-4 border-t border-[#262F40] space-y-4">
            {/* Series Filter Row */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                iPhone Generation Series
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seriesTabs.map((tab) => {
                  const isActive = selectedSeries === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setSelectedSeries(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        isActive
                          ? "bg-[#0066FF] border-[#0066FF] text-[#F8FAFC] shadow-[0_3px_12px_rgba(0,102,255,0.35)]"
                          : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#0066FF]/40"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Condition + RAM + Storage + Form Factor + Price Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Condition Grade Filter */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                  Condition Grade Pricing
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {CONDITION_GRADES.map((grade) => {
                    const active = globalCondition === grade.id;
                    return (
                      <button
                        key={grade.id}
                        type="button"
                        onClick={() => setGlobalCondition(grade.id)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                          active
                            ? "bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF]"
                            : "bg-[#0A0D14] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC]"
                        }`}
                      >
                        {grade.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* RAM Variant Filter */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                  RAM Memory Capacity
                </span>
                <select
                  value={selectedRam}
                  onChange={(e) => setSelectedRam(e.target.value)}
                  aria-label="Filter by RAM"
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#262F40] text-xs font-semibold text-[#F8FAFC] focus:border-[#0066FF] focus:outline-none"
                >
                  {RAM_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r === "All" ? "All RAM Variants (4GB – 12GB)" : r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Storage Filter */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                  Storage Variant (ROM)
                </span>
                <select
                  value={selectedStorageFilter}
                  onChange={(e) => setSelectedStorageFilter(e.target.value)}
                  aria-label="Filter by Storage"
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0D14] border border-[#262F40] text-xs font-semibold text-[#F8FAFC] focus:border-[#0066FF] focus:outline-none"
                >
                  {STORAGE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s === "All" ? "All Storage (64GB – 2TB)" : `${s} Storage`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range + Form Factor Filter */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Model Type
                  </span>
                  <select
                    value={selectedFormFactor}
                    onChange={(e) => setSelectedFormFactor(e.target.value)}
                    aria-label="Filter by model type"
                    className="w-full px-2.5 py-2 rounded-lg bg-[#0A0D14] border border-[#262F40] text-xs font-semibold text-[#F8FAFC] focus:border-[#0066FF] focus:outline-none"
                  >
                    {FORM_FACTORS.map((f) => (
                      <option key={f} value={f}>
                        {f === "All" ? "All Sizes" : f}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
                    Price Budget
                  </span>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    aria-label="Filter by price range"
                    className="w-full px-2.5 py-2 rounded-lg bg-[#0A0D14] border border-[#262F40] text-xs font-semibold text-[#F8FAFC] focus:border-[#0066FF] focus:outline-none"
                  >
                    {PRICE_RANGES.map((pr) => (
                      <option key={pr.id} value={pr.id}>
                        {pr.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Active Result Count & Reset Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#94A3B8]">
              <span>
                Showing{" "}
                <strong className="text-[#F8FAFC]">{filteredProducts.length}</strong> of{" "}
                <strong className="text-[#F8FAFC]">{storeData.products.length}</strong> iPhone models •
                Condition preview:{" "}
                <strong className="text-[#00F0FF] capitalize">{globalCondition}</strong>
              </span>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1.5 text-[#00F0FF] hover:text-[#F8FAFC] font-bold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="card-obsidian p-12 text-center space-y-3">
          <p className="text-lg font-bold text-[#F8FAFC]">
            No iPhones match your selected filters
          </p>
          <p className="text-sm text-[#94A3B8]">
            Try adjusting RAM, storage, budget, or clearing your search query.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="btn-primary-cobalt px-5 py-2.5 text-xs font-bold inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Show All 28 iPhone Models
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              globalCondition={globalCondition}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenModal={onOpenModal}
              onAddToBag={onAddToBag}
            />
          ))}
        </div>
      )}
    </section>
  );
}
