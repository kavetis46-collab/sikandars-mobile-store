import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  MessageCircle, 
  BatteryCharging, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Eye, 
  ChevronDown,
  Smartphone
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function InventorySection({ onSelectProduct, onAddToBag, inquiryBag }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'iPhone Pro', 'iPhone Standard', 'Android Flagship', 'Foldables', 'Accessories'];

  // Parse numeric price for sorting
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const clean = priceStr.replace(/[^0-9]/g, '');
    return parseInt(clean, 10) || 0;
  };

  const filteredProducts = useMemo(() => {
    return storeData.products
      .filter((p) => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
        const matchesSearch = 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.storageOptions && p.storageOptions.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return parsePrice(a.price) - parsePrice(b.price);
        }
        if (sortBy === 'price-high') {
          return parsePrice(b.price) - parsePrice(a.price);
        }
        return 0; // featured default
      });
  }, [activeCategory, searchQuery, sortBy]);

  const isInBag = (id) => inquiryBag.some((item) => item.id === id);

  return (
    <section id="inventory" className="py-16 sm:py-24 relative bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Verified Live Inventory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certified Pre-Owned &amp; Flagship Devices
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Every phone includes original screen, verified battery health report, warranty certificate, and transparent IMEI billing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl self-start md:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Real-time stock from Jagdish Market counter</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-8">
          
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search iPhone 15, S24 Ultra, 256GB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#13151f] border border-white/10 focus:border-emerald-500 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#13151f] border border-white/10 text-slate-200 text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#12141c] rounded-2xl border border-white/5 p-8">
            <Smartphone className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No exact model match found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              We frequently receive fresh stock at Jagdish Market that may not be updated online yet.
            </p>
            <a
              href={createWhatsAppUrl(`Hi Sikandar Bhai, do you have ${searchQuery || 'any other'} model in stock right now?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Sikandar Bhai Directly on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const inBag = isInBag(product.id);

              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-[#12141f] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col overflow-hidden group hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  
                  {/* Image Container with Badges */}
                  <div className="relative h-64 w-full bg-gradient-to-b from-[#181b28] to-[#12141f] p-6 flex items-center justify-center overflow-hidden">
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                      {product.badge && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 shadow-md">
                          {product.badge}
                        </span>
                      )}

                      {product.batteryHealth && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-emerald-400 border border-white/10 flex items-center gap-1 ml-auto">
                          <BatteryCharging className="w-3.5 h-3.5" />
                          {product.batteryHealth}
                        </span>
                      )}
                    </div>

                    {/* Product Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Condition Pill Bottom */}
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-slate-300 border border-white/10 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{product.condition}</span>
                    </div>

                    {/* Quick View Button overlay */}
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                      title="Quick View Specs"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Content Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{product.brand}</span>
                        <span className="text-emerald-400 font-medium">{product.warranty}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Storage Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.storageOptions.map((st) => (
                          <span
                            key={st}
                            className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                          >
                            {st}
                          </span>
                        ))}
                      </div>

                      {/* Micro Specs */}
                      {product.specs && (
                        <p className="text-xs text-slate-400 line-clamp-2 pt-1 font-normal">
                          {product.specs.display} • {product.specs.chip}
                        </p>
                      )}
                    </div>

                    {/* Pricing Block */}
                    <div className="pt-2 border-t border-white/5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-xl font-extrabold text-white">
                            {product.price}
                          </div>
                          {product.originalPrice && (
                            <div className="flex items-center gap-1.5 text-xs">
                              <span className="line-through text-slate-500">{product.originalPrice}</span>
                              <span className="text-emerald-400 font-semibold">{product.savings}</span>
                            </div>
                          )}
                        </div>

                        <span className="text-[11px] text-slate-400 bg-white/5 px-2 py-1 rounded">
                          Bill &amp; Testing Report
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onAddToBag(product)}
                        className={`w-full py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                          inBag 
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                        }`}
                      >
                        {inBag ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>In Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>

                      <a
                        href={createWhatsAppUrl(`Hi Sikandar Bhai, I am interested in ${product.name} (${product.price}). Is it available in stock today?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
