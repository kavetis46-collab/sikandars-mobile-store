import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  RotateCcw,
  Clock,
  Sparkles,
  Check,
} from "lucide-react";
import ProductCard from "./ProductCard";
import { useStore } from "../context/StoreContext";

const STORAGE_FILTERS = ["All", "64GB", "128GB", "256GB", "512GB", "1TB", "2TB"];
const CONDITION_FILTERS = ["All", "Fair", "Good", "Superb"];
const BATTERY_FILTERS = [
  { id: "all", label: "Any Battery Health" },
  { id: "90plus", label: "90% – 100% Peak" },
  { id: "85plus", label: "85%+ Healthy" },
];
const AVAILABILITY_FILTERS = [
  { id: "available", label: "In Stock Only" },
  { id: "all", label: "Include Sold Archive" },
];
const PRICE_CAPS = [
  { id: "all", label: "All Prices" },
  { id: "under-35k", label: "Under ₹35,000" },
  { id: "35k-65k", label: "₹35,000 – ₹65,000" },
  { id: "65k-100k", label: "₹65,000 – ₹1,00,000" },
  { id: "100k-plus", label: "₹1,00,000+" },
];

export default function InventorySection() {
  const {
    products,
    searchHistory,
    addSearchHistoryTerm,
    clearSearchHistory,
  } = useStore();

  const [generation, setGeneration] = useState("All");
  const [modelType, setModelType] = useState("All");
  const [storage, setStorage] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [batteryFilter, setBatteryFilter] = useState("all");
  const [colour, setColour] = useState("All");
  const [condition, setCondition] = useState("All");
  const [availability, setAvailability] = useState("available");
  const [sortBy, setSortBy] = useState("latest");
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const generations = useMemo(() => {
    const gens = [...new Set(products.map((p) => p.generation).filter(Boolean))].sort((a, b) => b - a);
    return ["All", ...gens];
  }, [products]);

  const modelTypes = useMemo(() => {
    const types = [...new Set(products.map((p) => p.formFactor).filter(Boolean))];
    return ["All", ...types];
  }, [products]);

  const allColours = useMemo(() => {
    const names = new Set();
    products.forEach((p) => {
      (p.colors || []).forEach((c) => c.name && names.add(c.name));
    });
    return ["All", ...Array.from(names).sort()];
  }, [products]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return ["iPhone 16 Pro Max", "iPhone 15 Pro", "iPhone 14", "iPhone 13 mini", "Natural Titanium", "256GB"];
    }
    return products
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 6)
      .map((p) => p.name);
  }, [query, products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const inStock = !p.isSold && (p.stockCount ?? 1) > 0;
      if (availability === "available" && !inStock) return false;
      if (generation !== "All" && Number(p.generation) !== Number(generation)) return false;
      if (modelType !== "All" && p.formFactor !== modelType) return false;
      if (condition !== "All" && !(p.conditionGrade || "").toLowerCase().includes(condition.toLowerCase())) {
        // Store items often support Fair / Good / Superb or a specific grade
        if (!["fair", "good", "superb"].some((g) => (p.conditionGrade || "").toLowerCase() === g && condition.toLowerCase() === g)) {
          return false;
        }
      }
      if (storage !== "All" && !(p.variants || []).some((v) => v.storage === storage)) return false;
      if (colour !== "All" && !(p.colors || []).some((c) => c.name === colour)) return false;

      if (batteryFilter === "90plus") {
        const match = String(p.batteryHealth || "").match(/\d+/);
        const minBat = match ? Number(match[0]) : 90;
        if (minBat < 90) return false;
      }

      const price = Number(
        (storage !== "All"
          ? (p.variants || []).find((v) => v.storage === storage)?.storePrice
          : p.variants?.[0]?.storePrice) || p.displayPrice || 0
      );
      if (priceRange === "under-35k" && price >= 35000) return false;
      if (priceRange === "35k-65k" && (price < 35000 || price > 65000)) return false;
      if (priceRange === "65k-100k" && (price <= 65000 || price > 100000)) return false;
      if (priceRange === "100k-plus" && price <= 100000) return false;

      if (q) {
        const hay = [
          p.name,
          p.series,
          p.ram,
          p.formFactor,
          p.batteryHealth,
          ...(p.variants || []).map((v) => v.storage),
          ...(p.colors || []).map((c) => c.name),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const getPrice = (p) => Number(p.variants?.[0]?.storePrice || p.displayPrice || 0);
    const sorted = [...list];
    if (sortBy === "price-asc") sorted.sort((a, b) => getPrice(a) - getPrice(b));
    else if (sortBy === "price-desc") sorted.sort((a, b) => getPrice(b) - getPrice(a));
    else if (sortBy === "popularity") sorted.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    else sorted.sort((a, b) => (b.generation || 0) - (a.generation || 0));

    return sorted;
  }, [
    products,
    generation,
    modelType,
    storage,
    priceRange,
    batteryFilter,
    colour,
    condition,
    availability,
    sortBy,
    query,
  ]);

  const activeFilterCount = [
    generation !== "All",
    modelType !== "All",
    storage !== "All",
    priceRange !== "all",
    batteryFilter !== "all",
    colour !== "All",
    condition !== "All",
    availability !== "available",
    query.trim() !== "",
  ].filter(Boolean).length;

  const resetFilters = () => {
    setGeneration("All");
    setModelType("All");
    setStorage("All");
    setPriceRange("all");
    setBatteryFilter("all");
    setColour("All");
    setCondition("All");
    setAvailability("available");
    setSortBy("latest");
    setQuery("");
  };

  const handleApplySearchTerm = (term) => {
    setQuery(term);
    addSearchHistoryTerm(term);
    setSearchFocused(false);
  };

  const renderFilterControls = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858A94] mb-1.5">
          Model Variant
        </label>
        <select
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-xs font-semibold text-white focus:border-[#3478F6] focus:outline-none"
        >
          {modelTypes.map((m) => (
            <option key={m} value={m}>
              {m === "All" ? "All Model Types (mini to Pro Max)" : m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858A94] mb-1.5">
          Storage Capacity
        </label>
        <select
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-xs font-semibold text-white focus:border-[#3478F6] focus:outline-none"
        >
          {STORAGE_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Storage Options" : s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858A94] mb-1.5">
          Price Budget
        </label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-xs font-semibold text-white focus:border-[#3478F6] focus:outline-none"
        >
          {PRICE_CAPS.map((pr) => (
            <option key={pr.id} value={pr.id}>
              {pr.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858A94] mb-1.5">
          Battery Health
        </label>
        <select
          value={batteryFilter}
          onChange={(e) => setBatteryFilter(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-xs font-semibold text-white focus:border-[#3478F6] focus:outline-none"
        >
          {BATTERY_FILTERS.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858A94] mb-1.5">
          Finish / Colour
        </label>
        <select
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-xs font-semibold text-white focus:border-[#3478F6] focus:outline-none"
        >
          {allColours.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Apple Finishes" : c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858A94] mb-1.5">
          Physical Condition
        </label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-xs font-semibold text-white focus:border-[#3478F6] focus:outline-none"
        >
          {CONDITION_FILTERS.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Conditions" : `${c} Condition`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#858A94] mb-1.5">
          Availability
        </label>
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-xs font-semibold text-white focus:border-[#3478F6] focus:outline-none"
        >
          {AVAILABILITY_FILTERS.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end">
        <button
          type="button"
          onClick={resetFilters}
          className="w-full btn-titanium py-2.5 px-4 text-xs gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#3478F6]" />
          <span>Clear Filters ({activeFilterCount})</span>
        </button>
      </div>
    </div>
  );

  return (
    <section
      id="explore-catalogue"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
    >
      {/* SECTION 7: EXPLORE BY GENERATION */}
      <div className="mb-10">
        <span className="pill-electric mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explore by Generation</span>
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Complete Certified iPhone Marketplace
        </h2>
        <p className="text-sm sm:text-base text-[#858A94] mt-2 max-w-2xl">
          Live shop inventory from iPhone 12 series through latest generations. Search by model, filter by storage, battery health, colour, or condition.
        </p>

        {/* Generation Pill Explorer */}
        <div className="flex flex-wrap gap-2 mt-6">
          {generations.map((gen) => {
            const active = String(generation) === String(gen);
            return (
              <button
                key={String(gen)}
                type="button"
                onClick={() => setGeneration(gen)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  active
                    ? "bg-[#3478F6] border-[#3478F6] text-white shadow-[0_4px_16px_rgba(52,120,246,0.4)]"
                    : "bg-[#111318] border-[#C5C7CC]/15 text-[#C5C7CC] hover:border-[#3478F6]/50"
                }`}
              >
                {gen === "All" ? "All Series" : `iPhone ${gen} Series`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Search + Suggestions + History + Sort Bar */}
      <div className="surface-charcoal p-4 sm:p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input with Live Suggestions Dropdown */}
          <div className="lg:col-span-6 relative">
            <Search className="w-4 h-4 text-[#858A94] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  addSearchHistoryTerm(query);
                  setSearchFocused(false);
                }
              }}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search iPhone model, storage (256GB), or colour (Desert Titanium)..."
              aria-label="Search inventory"
              className="w-full pl-10 pr-9 py-3 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 focus:border-[#3478F6] focus:outline-none text-sm text-white placeholder-[#858A94]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#858A94] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Suggestions & Search History Popover */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 z-30 rounded-2xl bg-[#111318] border border-[#C5C7CC]/20 p-3 shadow-2xl space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#858A94] block mb-1.5">
                    Suggestions
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={() => handleApplySearchTerm(item)}
                        className="px-2.5 py-1 rounded-lg bg-[#08090C] border border-[#C5C7CC]/15 hover:border-[#3478F6] text-xs text-[#C5C7CC] hover:text-white cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {searchHistory.length > 0 && (
                  <div className="pt-2 border-t border-[#C5C7CC]/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#858A94]">
                        <Clock className="w-3 h-3" />
                        Recent Searches
                      </span>
                      <button
                        type="button"
                        onMouseDown={clearSearchHistory}
                        className="text-[10px] text-[#3478F6] hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {searchHistory.map((h) => (
                        <button
                          key={h}
                          type="button"
                          onMouseDown={() => handleApplySearchTerm(h)}
                          className="px-2.5 py-1 rounded-lg bg-[#3478F6]/10 border border-[#3478F6]/25 text-xs text-[#93C5FD] cursor-pointer"
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="lg:col-span-4 relative">
            <ArrowUpDown className="w-4 h-4 text-[#3478F6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 focus:border-[#3478F6] focus:outline-none text-xs sm:text-sm font-semibold text-white cursor-pointer"
            >
              <option value="latest">Sort: Latest Arrivals</option>
              <option value="price-asc">Sort: Lowest Price First</option>
              <option value="price-desc">Sort: Highest Price First</option>
              <option value="popularity">Sort: Popularity</option>
            </select>
          </div>

          {/* Mobile Filter Drawer Trigger */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="w-full lg:hidden btn-electric py-3 px-4 text-xs gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}</span>
            </button>
            <div className="hidden lg:flex items-center justify-end text-xs text-[#C5C7CC]">
              <span>
                <strong className="text-white">{filteredProducts.length}</strong> Results
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Filter Matrix */}
        <div className="hidden lg:block pt-3 border-t border-[#C5C7CC]/10">
          {renderFilterControls()}
        </div>
      </div>

      {/* Mobile Slide-Over Filter Drawer */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Product Filters"
        >
          <div className="absolute inset-0" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative z-10 w-full max-w-sm bg-[#111318] border-l border-[#C5C7CC]/20 h-full flex flex-col">
            <div className="p-5 border-b border-[#C5C7CC]/15 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white">Filter iPhones</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 rounded-lg bg-[#08090C] border border-[#C5C7CC]/15 text-[#C5C7CC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto flex-1">{renderFilterControls()}</div>
            <div className="p-5 border-t border-[#C5C7CC]/15">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full btn-electric py-3 text-xs gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Show {filteredProducts.length} Matching iPhones</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="surface-charcoal p-12 text-center space-y-3">
          <p className="text-lg font-bold text-white">No matching inventory found</p>
          <p className="text-sm text-[#858A94]">
            Try clearing some filters or switching Availability to view sold items too.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="btn-electric px-5 py-2.5 text-xs gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
