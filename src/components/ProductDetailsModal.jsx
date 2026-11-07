import React from 'react';
import { 
  X, 
  BatteryCharging, 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Phone,
  Cpu, 
  Smartphone, 
  Box, 
  Flame,
  Award
} from 'lucide-react';
import { createWhatsAppUrl, storeData } from '../data/storeData';

export default function ProductDetailsModal({ product, onClose, onAddToBag, isInBag }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0c0f1a] border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden text-slate-100"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Image (5 cols) */}
          <div className="sm:col-span-5 space-y-4">
            <div className="h-64 rounded-2xl bg-gradient-to-b from-[#181c2e] to-[#0d0f18] border border-white/10 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
              />
            </div>

            {/* Badges under photo */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Battery Status</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  {product.batteryHealth}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Warranty Status</span>
                <span className="font-bold text-amber-400">{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Verification (7 cols) */}
          <div className="sm:col-span-7 space-y-4">
            
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 mb-1.5">
                <Flame className="w-3 h-3 fill-amber-400" />
                <span>{product.badge || 'Certified Unit'}</span>
              </div>
              <h3 className="text-2xl font-black text-white">{product.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Finish: <strong className="text-amber-400">{product.color}</strong> • {product.condition}</p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Store Special Price</span>
                <div className="text-2xl font-black text-gradient-gold">{product.price}</div>
              </div>
              {product.originalPrice && (
                <div className="text-right text-xs">
                  <span className="line-through text-slate-500">{product.originalPrice}</span>
                  <div className="text-emerald-400 font-bold">{product.savings}</div>
                </div>
              )}
            </div>

            {/* 60-Point Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Audited Diagnostics Report:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>TrueTone 120Hz Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>FaceID &amp; Camera Control</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Clean IMEI &amp; Unlocked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Grade 5 Titanium Body</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Genuine Battery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Store Bill Included</span>
                </div>
              </div>
            </div>

            {/* Available Storage */}
            <div className="pt-2 border-t border-white/10 space-y-2 text-xs">
              <div>
                <span className="text-slate-400">Available Storage: </span>
                <span className="text-white font-bold">{product.storageOptions.join(' • ')}</span>
              </div>
            </div>

            {/* Actions: Direct WhatsApp, Direct Call, Bag */}
            <div className="pt-3 grid grid-cols-3 gap-2">
              
              {/* WhatsApp */}
              <a
                href={createWhatsAppUrl(`Hi Sikandar Bhai, I would like to reserve/buy the ${product.name} (${product.price}). Is it ready for pickup at Jagdish Market?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1 shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                <span>WhatsApp</span>
              </a>

              {/* Call */}
              <a
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="py-3 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 fill-slate-950" />
                <span>Call Store</span>
              </a>

              {/* Add to Bag */}
              <button
                onClick={() => onAddToBag(product)}
                className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                  isInBag 
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                    : 'bg-white/10 hover:bg-white/15 border-white/15 text-white'
                }`}
              >
                {isInBag ? (
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

      </div>

    </div>
  );
}
