import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Phone, 
  ArrowUp,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function FloatingActions({ onOpenBag, bagCount }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDialerClick = () => {
    window.location.href = `tel:${storeData.storeInfo.phoneRaw}`;
  };

  const handleWhatsAppClick = () => {
    window.open(
      createWhatsAppUrl("Hi Sikandar Bhai! I am looking for the iPhone 16 Pro Max. Please let me know available colors, storage options, and prices at your Jagdish Market store."),
      '_blank'
    );
  };

  return (
    <>
      {/* ========================================================
          DESKTOP & TABLET FLOATING DOCK (RIGHT SIDE)
          ======================================================== */}
      <aside 
        aria-label="Direct Quick Contact Actions" 
        className="fixed bottom-8 right-6 z-50 hidden sm:flex flex-col items-end gap-3.5 pointer-events-auto"
      >
        
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#0e1220]/90 text-slate-300 hover:text-white border border-white/10 hover:border-amber-400/50 shadow-xl backdrop-blur-md transition-all hover:scale-105 group"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

        {/* 1. FLOATING DIRECT DIALER BUTTON */}
        <button
          onClick={handleDialerClick}
          aria-label={`Call Sikandar Bhai directly at ${storeData.storeInfo.phone}`}
          className="relative flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-slate-950 font-extrabold text-xs shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all duration-300 hover:scale-105 active:scale-95 group border border-amber-300/40"
        >
          {/* Pulsing Aura */}
          <span className="absolute -inset-1 rounded-full bg-amber-400 opacity-30 animate-ping pointer-events-none" />

          <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 fill-slate-950 text-slate-950 animate-bounce" />
          </div>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-900 opacity-90">Instant Call</span>
            <span className="text-xs font-black tracking-tight">{storeData.storeInfo.phone}</span>
          </div>
        </button>

        {/* 2. FLOATING DIRECT WHATSAPP BUTTON */}
        <button
          onClick={handleWhatsAppClick}
          aria-label="Chat directly on WhatsApp with Sikandar Bhai"
          className="relative flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-extrabold text-xs shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 hover:scale-105 active:scale-95 group border border-emerald-300/40"
        >
          {/* Pulsing Aura */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 animate-pulse pointer-events-none" />

          <div className="w-8 h-8 rounded-full bg-slate-950/20 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 fill-slate-950 text-slate-950" />
          </div>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-900 opacity-90">WhatsApp Store</span>
            <span className="text-xs font-black tracking-tight">Sikandar Bhai (Live)</span>
          </div>
        </button>

      </aside>

      {/* ========================================================
          MOBILE FLOATING DIRECT BAR (THUMB FRIENDLY STICKY DOCK)
          ======================================================== */}
      <nav 
        aria-label="Mobile Direct Quick Actions" 
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#070912]/95 border-t border-amber-500/30 backdrop-blur-2xl px-4 py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.8)]"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-2.5 items-center">
          
          {/* Quick Inquiry Bag icon (2 cols) */}
          <button
            onClick={onOpenBag}
            aria-label="Open Inquiry Bag"
            className="col-span-2 relative flex flex-col items-center justify-center py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-[9px] font-bold mt-0.5">Bag</span>
            {bagCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {bagCount}
              </span>
            )}
          </button>

          {/* 1. DIRECT DIALER BUTTON (5 cols) */}
          <a
            href={`tel:${storeData.storeInfo.phoneRaw}`}
            aria-label="Direct Phone Call"
            className="col-span-5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 active:scale-95 border border-amber-300/40"
          >
            <Phone className="w-4 h-4 fill-slate-950 shrink-0" />
            <span className="truncate">Call Direct</span>
          </a>

          {/* 2. DIRECT WHATSAPP BUTTON (5 cols) */}
          <a
            href={createWhatsAppUrl("Hi Sikandar Bhai! I want to inquire about iPhone 16 Pro Max stock.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp Message"
            className="col-span-5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/25 active:scale-95 border border-emerald-300/40"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>

        </div>
      </nav>
    </>
  );
}
