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
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { storeData, createWhatsAppUrl, CASHIFY_APP_URL } from '../data/storeData';

function ProductCard({ product, onSelectProduct, onAddToBag, isInBag }) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const variants = product.variants || [];
  const colors = product.colors || [];

  const activeVariant = variants[selectedVariantIdx] || variants[0];
  const activeColor = colors[selectedColorIdx] || colors[0] || { name: 'Standard', hex: '#94A3B8' };

  const storePriceDisplay = activeVariant ? activeVariant.storePriceFormatted : product.price;
  const cashifyPriceDisplay = activeVariant ? activeVariant.cashifyPriceFormatted : product.cashifyPrice;
  const originalPriceDisplay = activeVariant ? activeVariant.originalPriceFormatted : product.originalPrice;
  const storageDisplay = activeVariant ? activeVariant.storage : (product.storageOptions?.[0] || '128GB');

  const conditionTags = [
    "Grade A+ Flawless",
    "Cashify App + ₹500",
    "Store Verified",
    "Clean IMEI"
  ];

  const handleBagAction = () => {
    onAddToBag({
      ...product,
      selectedStorage: storageDisplay,
      selectedColor: activeColor.name,
      price: storePriceDisplay,
      cashifyPrice: cashifyPriceDisplay,
      originalPrice: originalPriceDisplay,
      bagItemKey: `${product.id}-${storageDisplay}-${activeColor.name}`
    });
  };

  return (
    <div className="surface-card flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      
      {/* Image Section with Subtle Radial Lighting Gradient */}
      <div className="relative h-60 sm:h-64 w-full bg-[#0E121B] p-5 flex items-center justify-center overflow-hidden device-glow-backdrop border-b border-[#262F40]">
        
        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none gap-2">
          {product.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0066FF] text-[#F8FAFC] shadow-sm truncate">
              {product.badge}
            </span>
          )}

          <span className="badge-condition text-[10px] px-2.5 py-0.5 flex items-center gap-1 ml-auto shrink-0">
            <BatteryCharging className="w-3 h-3" />
            {product.batteryHealth}
          </span>
        </div>

        {/* Device Image */}
        <img
          src={product.image}
          alt={`${product.name} - ${activeColor.name}`}
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
          onClick={() => onSelectProduct(product.id, selectedVariantIdx, selectedColorIdx)}
          className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#141923] hover:bg-[#0066FF] text-[#F8FAFC] border border-[#262F40] transition-all sm:opacity-0 sm:group-hover:opacity-100"
          title="View Full Variant & 3uTools Specs"
          aria-label={`Inspect ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>

      </div>

      {/* Details Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="font-bold text-[#00F0FF] uppercase tracking-wider text-[11px]">{product.series}</span>
            <span className="text-[#94A3B8] font-medium text-[11px] truncate ml-2">{product.warranty}</span>
          </div>

          <h3 className="text-lg font-extrabold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Interactive Color Swatch Picker */}
          {colors.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#94A3B8] font-medium">Color: <strong className="text-[#F8FAFC]">{activeColor.name}</strong></span>
                <span className="text-[#94A3B8] text-[10px]">{colors.length} Colors</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {colors.map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColorIdx(idx)}
                    title={c.name}
                    aria-label={`Select color ${c.name}`}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColorIdx === idx
                        ? 'border-[#00F0FF] scale-110 shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                        : 'border-[#262F40] hover:border-[#94A3B8]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Interactive Storage Variant Selector */}
          {variants.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] text-[#94A3B8] font-medium block">Storage Variant:</span>
              <div className="flex flex-wrap gap-1.5">
                {variants.map((v, idx) => (
                  <button
                    key={v.storage}
                    type="button"
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all font-mono ${
                      selectedVariantIdx === idx
                        ? 'bg-[#0066FF] text-[#F8FAFC] border-[#0066FF] shadow-[0_2px_10px_rgba(0,102,255,0.4)]'
                        : 'bg-[#0A0D14] text-[#94A3B8] border-[#262F40] hover:border-[#0066FF] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {v.storage}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Condition Grade Pill Tags */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {conditionTags.slice(0, 3).map((tag, tIdx) => (
              <span key={tIdx} className="badge-condition px-2 py-0.5 text-[10px]">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-xs text-[#94A3B8] line-clamp-1">
            {product.specs.chip} • {product.specs.display}
          </p>
        </div>

        {/* Pricing Block (Cashify App Price + ₹500 Transparent Store Buy Price) */}
        <div className="pt-3 border-t border-[#262F40] space-y-3">
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] text-[#00F0FF] font-semibold flex items-center gap-1">
                <span>Cashify App:</span>
                <span className="font-mono">{cashifyPriceDisplay}</span>
                <span className="text-[#94A3B8]">+ ₹500</span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-[#F8FAFC] font-mono tabular-nums tracking-tight">
                  {storePriceDisplay}
                </span>
                <span className="text-xs text-[#94A3B8] line-through font-mono">
                  {originalPriceDisplay}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectProduct(product.id, selectedVariantIdx, selectedColorIdx)}
              className="text-xs text-[#00F0FF] font-bold hover:underline"
            >
              Inspect →
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-12 gap-2">
            
            {/* WhatsApp Buy Reservation (Primary Action) */}
            <a
              href={createWhatsAppUrl(
                `Hi Sikandar Bhai! I want to BUY the *${product.name}* (${storageDisplay} • ${activeColor.name}) listed on your website for *${storePriceDisplay}* (Cashify App ${cashifyPriceDisplay} + ₹500). Please confirm availability at Abids.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-9 btn-primary-cobalt py-2.5 px-3 text-xs gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Buy / Reserve WhatsApp</span>
            </a>

            {/* Add to Inquiry Bag Toggle */}
            <button
              onClick={handleBagAction}
              aria-label={`Add ${product.name} to Inquiry Bag`}
              className={`col-span-3 py-2.5 rounded-[10px] border transition-all flex items-center justify-center ${
                isInBag(product.id)
                  ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]'
                  : 'bg-[#0A0D14] text-[#94A3B8] border-[#262F40] hover:border-[#0066FF] hover:text-[#F8FAFC]'
              }`}
              title={isInBag(product.id) ? "In Inquiry Bag" : "Add to Inquiry Bag"}
            >
              {isInBag(product.id) ? (
                <Check className="w-4 h-4 text-[#00F0FF]" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function InventorySection({ onSelectProduct, onAddToBag, inquiryBag }) {
  const [activeSeries, setActiveSeries] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const seriesTabs = [
    'All',
    'iPhone 18 Series',
    'iPhone 17 Series',
    'iPhone 16 Series',
    'iPhone 15 Series',
    'iPhone 14 Series',
    'iPhone 13 Series',
    'iPhone 12 Series'
  ];

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return (storeData.products || []).filter((p) => {
      const matchesSeries = activeSeries === 'All' || p.series === activeSeries;
      if (!q) return matchesSeries;

      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q) ||
        p.edition.toLowerCase().includes(q) ||
        p.storageOptions.some((s) => s.toLowerCase().includes(q));
      return matchesSeries && matchesSearch;
    });
  }, [activeSeries, searchQuery]);

  const isInBag = (id) => inquiryBag.some((item) => item.id === id);

  return (
    <section id="inventory" className="py-16 sm:py-24 relative bg-[#0A0D14] border-t border-[#262F40]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Certified Pre-Owned iPhone Buy Catalog (28 Models)</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
              Buy Every iPhone (12 to 18 Pro Max) <br />
              <span className="text-gradient-cobalt">All Colors &amp; Storage Variants</span>
            </h2>
            
            <p className="mt-2 text-[#94A3B8] text-sm sm:text-base max-w-2xl">
              Every Apple iPhone from <strong className="text-[#F8FAFC]">iPhone 12 mini up to iPhone 18 Pro Max</strong> (mini, Standard, Plus, e, Air, Pro &amp; Pro Max). Tap any color dot or storage capacity below for instant transparent pricing.
            </p>
          </div>

          {/* Live Store Status Pill */}
          <div className="flex items-center gap-2.5 text-xs text-[#00F0FF] bg-[#141923] border border-[#262F40] px-4 py-2.5 rounded-xl self-start md:self-auto backdrop-blur-md shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="font-bold">In-Stock • Jagdish Market, Abids Counter</span>
          </div>
        </div>

        {/* Cashify App Pricing Transparency Banner */}
        <div className="rounded-2xl bg-[#141923] border border-[#0066FF]/40 p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_8px_25px_-10px_rgba(0,102,255,0.3)]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center shrink-0 text-[#00F0FF]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#F8FAFC]">
                Transparent Buy Pricing: <span className="text-[#00F0FF]">Cashify App Rate + ₹500 Only</span>
              </h3>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                For example: if a model is <strong className="text-[#F8FAFC] font-mono">₹25,000</strong> in the Cashify App, our showroom buy price is <strong className="text-[#00F0FF] font-mono">₹25,500</strong> — includes instant live 3uTools testing &amp; 6-month store warranty.
              </p>
            </div>
          </div>

          <a
            href={CASHIFY_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-titanium px-4 py-2.5 text-xs font-bold gap-2 shrink-0 w-full sm:w-auto"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Open Cashify Play Store App</span>
          </a>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-10">
          
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 13 mini, 16 Pro Max, 256GB, Pink, Titanium..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141923] border border-[#262F40] focus:border-[#0066FF] text-[#F8FAFC] placeholder-[#94A3B8] rounded-xl pl-10 pr-16 py-3 text-sm focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#00F0FF] font-bold hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Contact Helpline */}
            <div className="text-xs text-[#94A3B8] flex items-center gap-2">
              <span>Showing <strong className="text-[#F8FAFC] font-mono">{filteredProducts.length}</strong> iPhone models</span>
              <span className="text-[#262F40]">|</span>
              <a href={`tel:${storeData.storeInfo.phoneRaw}`} className="text-[#00F0FF] font-bold flex items-center gap-1 hover:underline font-mono">
                <Phone className="w-3 h-3" /> {storeData.storeInfo.phone}
              </a>
            </div>

          </div>

          {/* Series Filter Tabs (iPhone 12 to iPhone 18) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {seriesTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSeries(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeSeries === tab
                    ? 'bg-[#0066FF] text-[#F8FAFC] border-[#0066FF] shadow-[0_4px_14px_rgba(0,102,255,0.4)]'
                    : 'bg-[#141923] text-[#94A3B8] border-[#262F40] hover:border-[#0066FF] hover:text-[#F8FAFC]'
                }`}
              >
                {tab === 'All' ? `All iPhones (${storeData.products.length})` : tab}
              </button>
            ))}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 rounded-2xl bg-[#141923] border border-[#262F40] p-8">
            <p className="text-[#F8FAFC] font-bold text-lg">No iPhone matched "{searchQuery}"</p>
            <p className="text-[#94A3B8] text-xs mt-1">Try searching by model number (e.g. 12 mini, 15 Pro, 18 Pro Max), storage (256GB), or color.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveSeries('All'); }}
              className="mt-4 btn-primary-cobalt px-5 py-2.5 text-xs"
            >
              Show All 28 iPhones
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToBag={onAddToBag}
                isInBag={isInBag}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
