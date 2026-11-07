import React from 'react';
import { 
  X, 
  BatteryCharging, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  ShoppingBag, 
  Check, 
  Phone, 
  Flame 
} from 'lucide-react';
import { createWhatsAppUrl, storeData } from '../data/storeData';

export default function ProductDetailsModal({ product, onClose, onAddToBag, isInBag }) {
  if (!product) return null;

  const conditionTags = product.conditionTags || [
    product.condition || "Grade A+ Flawless",
    product.batteryHealth || "Battery Health 95%+",
    "Store Verified",
    "Clean IMEI"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0D14]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
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
            <div className="h-64 rounded-xl bg-[#0E121B] border border-[#262F40] flex items-center justify-center p-4 device-glow-backdrop">
              <img
                src={product.image}
                alt={product.name}
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
                <span className="text-[#94A3B8]">Warranty Status</span>
                <span className="font-bold text-[#F8FAFC]">{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Verification (7 cols) */}
          <div className="sm:col-span-7 space-y-4">
            
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#0066FF] text-[#F8FAFC] mb-1.5">
                <Flame className="w-3 h-3 fill-current" />
                <span>{product.badge || 'Certified Flagship'}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#F8FAFC]">{product.name}</h3>
              <p className="text-xs text-[#94A3B8] mt-0.5">Edition: <strong className="text-[#00F0FF]">{product.edition}</strong></p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-[#0E121B] border border-[#262F40] flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Special Showroom Price</span>
                <div className="text-2xl font-extrabold text-[#F8FAFC] font-mono tabular-nums">{product.price}</div>
              </div>
              {product.originalPrice && (
                <div className="text-right text-xs">
                  <span className="line-through text-[#94A3B8] font-mono">{product.originalPrice}</span>
                  <div className="text-[#00F0FF] font-bold font-mono">{product.savings}</div>
                </div>
              )}
            </div>

            {/* Condition Grade Badges */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Condition Badges:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {conditionTags.map((badge, bIdx) => (
                  <span key={bIdx} className="badge-condition px-2.5 py-0.5 text-[10px]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* 60-Point Checklist */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Diagnostics Checklist:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#F8FAFC]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>TrueTone &amp; 120Hz Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>Biometrics &amp; Cameras Tested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>Clean IMEI &amp; Unlocked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>Aerospace Body Grade</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>100% Genuine Battery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                  <span>Store Invoice &amp; Warranty</span>
                </div>
              </div>
            </div>

            {/* Available Storage */}
            <div className="pt-2 border-t border-[#262F40] text-xs">
              <span className="text-[#94A3B8]">Storage Configurations: </span>
              <span className="text-[#F8FAFC] font-bold font-mono">{product.storageOptions.join(' • ')}</span>
            </div>

            {/* Actions: Direct WhatsApp, Direct Call, Bag */}
            <div className="pt-3 grid grid-cols-3 gap-2">
              
              {/* WhatsApp */}
              <a
                href={createWhatsAppUrl(`Hi Sikandar Bhai, I would like to reserve the ${product.name} (${product.price}). Is it ready for pickup at Abids showroom?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-cobalt py-3 px-2 text-xs font-bold gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
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
                onClick={() => onAddToBag(product)}
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
