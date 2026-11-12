import React, { useState, useEffect } from 'react';
import { 
  X, 
  BatteryCharging, 
  CheckCircle2, 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  Phone, 
  Flame,
  ExternalLink
} from 'lucide-react';
import { createWhatsAppUrl, storeData, CASHIFY_APP_URL } from '../data/storeData';

export default function ProductDetailsModal({
  product,
  initialVariantIdx = 0,
  initialColorIdx = 0,
  onClose,
  onAddToBag,
  isInBag
}) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(initialVariantIdx);
  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIdx);

  useEffect(() => {
    setSelectedVariantIdx(initialVariantIdx);
    setSelectedColorIdx(initialColorIdx);
  }, [product?.id, initialVariantIdx, initialColorIdx]);

  if (!product) return null;

  const variants = product.variants || [];
  const colors = product.colors || [];

  const activeVariant = variants[selectedVariantIdx] || variants[0];
  const activeColor = colors[selectedColorIdx] || colors[0] || { name: 'Standard', hex: '#94A3B8' };

  const storePriceDisplay = activeVariant ? activeVariant.storePriceFormatted : product.price;
  const cashifyPriceDisplay = activeVariant ? activeVariant.cashifyPriceFormatted : product.cashifyPrice;
  const originalPriceDisplay = activeVariant ? activeVariant.originalPriceFormatted : product.originalPrice;
  const savingsDisplay = activeVariant ? activeVariant.savingsFormatted : product.savings;
  const storageDisplay = activeVariant ? activeVariant.storage : (product.storageOptions?.[0] || '128GB');

  const conditionTags = [
    product.condition || "Grade A+ Flawless",
    "Cashify App + ₹500",
    "Store Verified",
    "Clean IMEI"
  ];

  const handleBagToggle = () => {
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
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0A0D14]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl surface-card p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,102,255,0.25)] my-8 overflow-hidden text-[#F8FAFC]"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#0E121B] hover:bg-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#262F40] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Image with Radial Lighting Gradient (5 cols) */}
          <div className="sm:col-span-5 space-y-4">
            <div className="h-60 sm:h-64 rounded-xl bg-[#0E121B] border border-[#262F40] flex items-center justify-center p-4 device-glow-backdrop">
              <img
                src={product.image}
                alt={`${product.name} - ${activeColor.name}`}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Badges under photo */}
            <div className="space-y-2 font-mono">
              <div className="p-3 rounded-xl bg-[#0E121B] border border-[#262F40] flex items-center justify-between text-xs">
                <span className="text-[#94A3B8]">Battery Health</span>
                <span className="font-bold text-[#00F0FF] flex items-center gap-1">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  {product.batteryHealth}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#0E121B] border border-[#262F40] flex items-center justify-between text-xs">
                <span className="text-[#94A3B8]">Warranty</span>
                <span className="font-bold text-[#F8FAFC] text-right">{product.warranty}</span>
              </div>

              <a
                href={CASHIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#0E121B] border border-[#262F40] hover:border-[#0066FF] flex items-center justify-between text-xs transition-colors"
              >
                <span className="text-[#94A3B8]">Cashify App Benchmark</span>
                <span className="font-bold text-[#00F0FF] flex items-center gap-1">
                  <span>Verify App</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Specs & Verification (7 cols) */}
          <div className="sm:col-span-7 space-y-4">
            
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#0066FF] text-[#F8FAFC] mb-1.5">
                <Flame className="w-3 h-3 fill-current" />
                <span>{product.badge || 'Certified iPhone'}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#F8FAFC]">{product.name}</h3>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Selected: <strong className="text-[#00F0FF]">{storageDisplay} • {activeColor.name}</strong>
              </p>
            </div>

            {/* Interactive Color Picker */}
            {colors.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Choose Color Finish: <strong className="text-[#F8FAFC]">{activeColor.name}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                        selectedColorIdx === idx
                          ? 'bg-[#0066FF]/20 border-[#00F0FF] text-[#F8FAFC] font-bold'
                          : 'bg-[#0E121B] border-[#262F40] text-[#94A3B8] hover:border-[#94A3B8]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Storage Picker */}
            {variants.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Choose Storage Variant:
                </span>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, idx) => (
                    <button
                      key={v.storage}
                      type="button"
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-all ${
                        selectedVariantIdx === idx
                          ? 'bg-[#0066FF] border-[#0066FF] text-[#F8FAFC] shadow-[0_4px_12px_rgba(0,102,255,0.4)]'
                          : 'bg-[#0E121B] border-[#262F40] text-[#94A3B8] hover:border-[#0066FF] hover:text-[#F8FAFC]'
                      }`}
                    >
                      {v.storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Box (App Price + ₹500 Transparent Formula) */}
            <div className="p-4 rounded-xl bg-[#0E121B] border border-[#262F40] flex items-baseline justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#00F0FF] block">
                  Cashify App {cashifyPriceDisplay} + ₹500 Store Price
                </span>
                <div className="text-2xl font-extrabold text-[#F8FAFC] font-mono tabular-nums mt-0.5">
                  {storePriceDisplay}
                </div>
              </div>
              {originalPriceDisplay && (
                <div className="text-right text-xs shrink-0">
                  <span className="line-through text-[#94A3B8] font-mono">{originalPriceDisplay}</span>
                  <div className="text-[#00F0FF] font-bold font-mono">{savingsDisplay}</div>
                </div>
              )}
            </div>

            {/* Condition Grade Badges */}
            <div className="flex flex-wrap gap-1.5">
              {conditionTags.map((badge, bIdx) => (
                <span key={bIdx} className="badge-condition px-2.5 py-0.5 text-[10px]">
                  {badge}
                </span>
              ))}
            </div>

            {/* 60-Point Checklist */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Diagnostics Checklist:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#F8FAFC]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>TrueTone &amp; Display Original</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>FaceID &amp; Cameras Tested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>Clean IMEI &amp; Factory Unlocked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>3uTools Live Inspection Report</span>
                </div>
              </div>
            </div>

            {/* Actions: Direct WhatsApp, Direct Call, Bag */}
            <div className="pt-3 grid grid-cols-3 gap-2">
              
              {/* WhatsApp */}
              <a
                href={createWhatsAppUrl(`Hi Sikandar Bhai, I want to BUY the *${product.name}* (${storageDisplay} • ${activeColor.name}) at *${storePriceDisplay}* (Cashify App ${cashifyPriceDisplay} + ₹500). Is it available for pickup?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-cobalt py-3 px-2 text-xs font-bold gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Buy WhatsApp</span>
              </a>

              {/* Call */}
              <a
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="btn-secondary-titanium py-3 px-2 text-xs font-bold gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="font-mono">Call</span>
              </a>

              {/* Add to Bag */}
              <button
                onClick={handleBagToggle}
                className={`py-3 px-2 text-xs font-bold rounded-[10px] border transition-all flex items-center justify-center gap-1 ${
                  isInBag 
                    ? 'bg-[#0066FF]/20 border-[#0066FF] text-[#00F0FF]' 
                    : 'btn-secondary-titanium'
                }`}
              >
                {isInBag ? (
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

      </div>

    </div>
  );
}
