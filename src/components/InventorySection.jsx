import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingBag, 
  MessageCircle, 
  BatteryCharging, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Eye, 
  Phone,
  Flame,
  Award
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function InventorySection({ onSelectProduct, onAddToBag, inquiryBag }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Desert Titanium', 'Natural Titanium', 'Black Titanium', 'White Titanium'];

  const filteredProducts = useMemo(() => {
    return storeData.products.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.edition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.storageOptions.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const isInBag = (id) => inquiryBag.some((item) => item.id === id);

  return (
    <section id="inventory" className="py-20 sm:py-28 relative bg-[#080a14] border-t border-amber-500/20">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-500/15 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Certified iPhone 16 Pro Max Vault</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Genuine iPhone 16 Pro Max <br />
              <span className="text-gradient-gold">Available for Immediate Pickup.</span>
            </h2>
            
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
              Every unit includes authentic Grade 5 titanium, 100% verified battery health report, TrueTone active display, and store invoice.
            </p>
          </div>

          {/* Live Store Pill */}
          <div className="flex items-center gap-2.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 rounded-2xl self-start md:self-auto backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold">Live Inventory at Jagdish Market Counter</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-10">
          
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Desert Titanium, 1TB, 512GB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111422] border border-amber-500/20 focus:border-amber-400 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
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

            {/* Quick Contact Helpline */}
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span>Need custom storage? Call:</span>
              <a 
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="text-amber-400 font-extrabold hover:underline"
              >
                {storeData.storeInfo.phone}
              </a>
            </div>

          </div>

          {/* Category Titanium Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/25'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => {
            const inBag = isInBag(product.id);

            return (
              <div
                key={product.id}
                className="rounded-3xl glass-luxury border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/15"
              >
                
                {/* Image Section */}
                <div className="relative h-72 w-full bg-gradient-to-b from-[#14182b] to-[#0c0e1a] p-6 flex items-center justify-center overflow-hidden">
                  
                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                    {product.badge && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md">
                        {product.badge}
                      </span>
                    )}

                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 ml-auto">
                      <BatteryCharging className="w-3.5 h-3.5" />
                      {product.batteryHealth}
                    </span>
                  </div>

                  {/* PERFECT iPhone 16 Pro Max Picture */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Condition Tag */}
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] text-amber-300 border border-amber-500/30 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>{product.condition}</span>
                  </div>

                  {/* Quick Specs Eye */}
                  <button
                    onClick={() => onSelectProduct(product.id)}
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                    title="View Inspection Report"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                  </button>

                </div>

                {/* Details Section */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">{product.color}</span>
                      <span className="text-slate-300 font-medium">{product.warranty}</span>
                    </div>

                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Storage Options */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.storageOptions.map((st) => (
                        <span
                          key={st}
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-lg bg-white/5 text-slate-200 border border-white/10"
                        >
                          {st}
                        </span>
                      ))}
                    </div>

                    {/* Specs snippets */}
                    {product.specs && (
                      <p className="text-xs text-slate-300 line-clamp-2 pt-1">
                        {product.specs.display} • {product.specs.chip}
                      </p>
                    )}
                  </div>

                  {/* Pricing Box */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-2xl font-black text-gradient-gold">
                          {product.price}
                        </div>
                        {product.originalPrice && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="line-through text-slate-500">{product.originalPrice}</span>
                            <span className="text-emerald-400 font-bold">{product.savings}</span>
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-md font-bold uppercase">
                        Spot Handover
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: WhatsApp, Call, Bag */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    
                    {/* Direct WhatsApp */}
                    <a
                      href={createWhatsAppUrl(`Hi Sikandar Bhai, I want to inquire about ${product.name} (${product.price}). Is it available in stock today at Jagdish Market?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20 active:scale-95"
                      title="Direct WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Direct Call */}
                    <a
                      href={`tel:${storeData.storeInfo.phoneRaw}`}
                      className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1 shadow-md shadow-amber-500/20 active:scale-95"
                      title="Direct Dialer"
                    >
                      <Phone className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Call</span>
                    </a>

                    {/* Add to Bag */}
                    <button
                      onClick={() => onAddToBag(product)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                        inBag 
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                      }`}
                      title={inBag ? "In Bag" : "Add to Bag"}
                    >
                      {inBag ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                          <span>In Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
