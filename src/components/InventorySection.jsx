import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingBag, 
  MessageCircle, 
  BatteryCharging, 
  ShieldCheck, 
  Check, 
  Eye, 
  Phone,
  Award,
  Sparkles
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function InventorySection({ onSelectProduct, onAddToBag, inquiryBag }) {
  const [activeSeries, setActiveSeries] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const seriesTabs = ['All', 'Apple iPhones', 'Samsung Galaxy', 'Google Pixel', 'OnePlus'];

  const filteredProducts = useMemo(() => {
    return (storeData.products || []).filter((p) => {
      let matchesSeries = true;
      if (activeSeries === 'Apple iPhones') {
        matchesSeries = p.series.includes('iPhone');
      } else if (activeSeries !== 'All') {
        matchesSeries = p.series === activeSeries || p.brand === activeSeries;
      }

      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.edition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.storageOptions.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSeries && matchesSearch;
    });
  }, [activeSeries, searchQuery]);

  const isInBag = (id) => inquiryBag.some((item) => item.id === id);

  return (
    <section id="inventory" className="py-20 sm:py-28 relative bg-[#0A0D14] border-t border-[#262F40] content-auto">
      
      {/* Background Glows (Electric Cobalt & Cyber Cyan) */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#0066FF]/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#00F0FF]/08 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Certified Flagship Showroom Vault</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
              Pre-Owned Flagship Inventory <br />
              <span className="text-gradient-cobalt">Apple • Samsung • Pixel • OnePlus</span>
            </h2>
            
            <p className="mt-2 text-[#94A3B8] text-sm sm:text-base max-w-2xl">
              Engineered with 3uTools transparency, verified battery health, clean IMEI, and 6-month store warranty. Ready for immediate handover at our Abids &amp; Koti showroom.
            </p>
          </div>

          {/* Live Store Status Pill */}
          <div className="flex items-center gap-2.5 text-xs text-[#00F0FF] bg-[#141923] border border-[#262F40] px-4 py-2.5 rounded-xl self-start md:self-auto backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="font-bold">In-Stock at Jagdish Market, Abids Counter</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-10">
          
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search iPhone 16 Pro, S24 Ultra, Pixel, 256GB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141923] border border-[#262F40] focus:border-[#0066FF] text-[#F8FAFC] placeholder-[#94A3B8] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#F8FAFC]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Contact Helpline */}
            <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <span>Need custom storage or model? Call:</span>
              <a 
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="text-[#00F0FF] font-extrabold hover:underline font-mono"
              >
                {storeData.storeInfo.phone}
              </a>
            </div>

          </div>

          {/* Series Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {seriesTabs.map((series) => (
              <button
                key={series}
                onClick={() => setActiveSeries(series)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeSeries === series
                    ? 'bg-[#0066FF] text-[#F8FAFC] shadow-[0_4px_14px_rgba(0,102,255,0.4)]'
                    : 'bg-[#141923] hover:bg-[#1a202e] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#262F40]'
                }`}
              >
                {series}
              </button>
            ))}
          </div>

        </div>

        {/* Products Grid (All Flagship Devices) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => {
            const inBag = isInBag(product.id);
            const conditionTags = product.conditionTags || [
              product.condition || "Grade A+ Flawless",
              product.batteryHealth || "Battery Health 95%+",
              "Store Verified",
              "Clean IMEI"
            ];

            return (
              <div
                key={product.id}
                className="surface-card flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
              >
                
                {/* Image Section with Subtle Radial Lighting Gradient */}
                <div className="relative h-64 sm:h-72 w-full bg-[#0E121B] p-6 flex items-center justify-center overflow-hidden device-glow-backdrop border-b border-[#262F40]">
                  
                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
                    {product.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0066FF] text-[#F8FAFC] shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    <span className="badge-condition text-[10px] px-2.5 py-0.5 flex items-center gap-1 ml-auto">
                      <BatteryCharging className="w-3 h-3" />
                      {product.batteryHealth}
                    </span>
                  </div>

                  {/* Clean Device Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />

                  {/* Condition Tag */}
                  <div className="absolute bottom-3 left-3 bg-[#141923]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] text-[#00F0FF] border border-[#262F40] flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{product.condition}</span>
                  </div>

                  {/* Quick Specs Eye */}
                  <button
                    onClick={() => onSelectProduct(product.id)}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#141923] hover:bg-[#0066FF] text-[#F8FAFC] border border-[#262F40] transition-all opacity-0 group-hover:opacity-100"
                    title="View Inspection Report"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                </div>

                {/* Details Section */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                      <span className="font-bold text-[#00F0FF] uppercase tracking-wider text-[11px]">{product.series}</span>
                      <span className="text-[#94A3B8] font-medium">{product.warranty}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Condition Grade Pill Tags Directly on Card */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {conditionTags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="badge-condition px-2 py-0.5 text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Storage Options */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.storageOptions.map((st) => (
                        <span
                          key={st}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1c2333] text-[#F8FAFC] border border-[#262F40] font-mono"
                        >
                          {st}
                        </span>
                      ))}
                    </div>

                    {/* Specs snippets */}
                    {product.specs && (
                      <p className="text-xs text-[#94A3B8] line-clamp-2 pt-1 font-normal">
                        {product.specs.display} • {product.specs.chip}
                      </p>
                    )}
                  </div>

                  {/* Pricing Box with Tabular Numbers */}
                  <div className="pt-3 border-t border-[#262F40]">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-2xl font-extrabold text-[#F8FAFC] font-mono tabular-nums">
                          {product.price}
                        </div>
                        {product.originalPrice && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="line-through text-[#94A3B8] font-mono">{product.originalPrice}</span>
                            <span className="text-[#00F0FF] font-bold">{product.savings}</span>
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-[#00F0FF] bg-[rgba(0,240,255,0.08)] border border-[rgba(0,240,255,0.25)] px-2 py-0.5 rounded font-bold uppercase">
                        Spot Handover
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: WhatsApp, Call, Bag */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    
                    {/* Direct WhatsApp Primary Cobalt */}
                    <a
                      href={createWhatsAppUrl(`Hi Sikandar Bhai, I saw your showroom website and want to reserve ${product.name} (${product.price}). Is it ready at Abids?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-cobalt py-2.5 px-2 text-xs font-bold gap-1"
                      title="Direct WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Direct Call Secondary Titanium */}
                    <a
                      href={`tel:${storeData.storeInfo.phoneRaw}`}
                      className="btn-secondary-titanium py-2.5 px-2 text-xs font-bold gap-1"
                      title="Direct Showroom Dialer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span className="font-mono">Call</span>
                    </a>

                    {/* Add to Bag */}
                    <button
                      onClick={() => onAddToBag(product)}
                      className={`py-2.5 px-2 rounded-[10px] text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                        inBag 
                          ? 'bg-[#0066FF]/20 border-[#0066FF] text-[#00F0FF]' 
                          : 'btn-secondary-titanium'
                      }`}
                      title={inBag ? "In Bag" : "Add to Inquiry Bag"}
                    >
                      {inBag ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00F0FF]" />
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
