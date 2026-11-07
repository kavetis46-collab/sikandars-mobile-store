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
  Cpu, 
  Smartphone, 
  Box, 
  Eye
} from 'lucide-react';
import { createWhatsAppUrl } from '../data/storeData';

export default function ProductDetailsModal({ product, onClose, onAddToBag, isInBag }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#12141f] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Image (5 cols) */}
          <div className="sm:col-span-5 space-y-4">
            <div className="h-64 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900 border border-white/10 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
              />
            </div>

            {/* Badges under photo */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Battery Status</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <BatteryCharging className="w-3.5 h-3.5" />
                  {product.batteryHealth}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Warranty</span>
                <span className="font-bold text-white">{product.warranty}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Verification (7 cols) */}
          <div className="sm:col-span-7 space-y-4">
            
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>{product.badge || 'Certified Unit'}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">{product.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Condition: <strong className="text-white">{product.condition}</strong></p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Store Special Price</span>
                <div className="text-2xl font-extrabold text-emerald-400">{product.price}</div>
              </div>
              {product.originalPrice && (
                <div className="text-right text-xs">
                  <span className="line-through text-slate-500">{product.originalPrice}</span>
                  <div className="text-emerald-400 font-bold">{product.savings}</div>
                </div>
              )}
            </div>

            {/* 60-Point Checklist Highlights */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Inspection &amp; Diagnostics Verified:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>TrueTone Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>FaceID 100% Tested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Clean IMEI &amp; Unlocked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Zero Liquid Damage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Original Cameras</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Store Bill Provided</span>
                </div>
              </div>
            </div>

            {/* Available Storage & Colors */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <div className="text-xs">
                <span className="text-slate-400">Storage Capacities: </span>
                <span className="text-white font-medium">{product.storageOptions.join(' • ')}</span>
              </div>
              {product.colors && (
                <div className="text-xs">
                  <span className="text-slate-400">Colors: </span>
                  <span className="text-white font-medium">{product.colors.join(' • ')}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 grid grid-cols-2 gap-3">
              <button
                onClick={() => onAddToBag(product)}
                className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  isInBag 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' 
                    : 'bg-white/10 hover:bg-white/15 border-white/15 text-white'
                }`}
              >
                {isInBag ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>In Inquiry Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <a
                href={createWhatsAppUrl(`Hi Sikandar Bhai, I would like to reserve/buy ${product.name} (${product.price}). Is it currently in stock at Jagdish Market?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/25 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Buy</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
