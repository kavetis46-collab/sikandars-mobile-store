import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Phone, 
  ArrowUp, 
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
      createWhatsAppUrl("Hi Sikandar Bhai! I am looking for certified flagship devices (iPhone, Galaxy, Pixel, OnePlus). Please share available models and prices at your Abids showroom."),
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
        className="fixed bottom-8 right-6 z-50 hidden sm:flex flex-col items-end gap-3 pointer-events-auto"
      >
        
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-[#141923] text-[#94A3B8] hover:text-[#00F0FF] border border-[#262F40] hover:border-[#0066FF] shadow-xl backdrop-blur-md transition-all hover:scale-105 group"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}

        {/* 1. FLOATING DIRECT DIALER BUTTON */}
        <button
          onClick={handleDialerClick}
          aria-label={`Call Sikandar Bhai directly at ${storeData.storeInfo.phone}`}
          className="relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-xl bg-[#141923] border border-[#262F40] hover:border-[#00F0FF] text-[#F8FAFC] font-bold text-xs shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_30px_-5px_rgba(0,240,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          {/* Subtle Cyber Cyan Glow Indicator */}
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping shrink-0" />

          <div className="w-7 h-7 rounded-lg bg-[#262F40] flex items-center justify-center shrink-0 text-[#00F0FF]">
            <Phone className="w-3.5 h-3.5" />
          </div>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#94A3B8]">Showroom Call</span>
            <span className="text-xs font-mono font-bold tracking-tight text-[#F8FAFC]">{storeData.storeInfo.phone}</span>
          </div>
        </button>

        {/* 2. FLOATING DIRECT WHATSAPP BUTTON (Electric Cobalt with Cyan Glow) */}
        <button
          onClick={handleWhatsAppClick}
          aria-label="Chat directly on WhatsApp with Sikandar Bhai"
          className="relative flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-xl btn-primary-cobalt text-xs font-bold shadow-[0_4px_20px_rgba(0,102,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 group"
        >
          {/* Pulsing Aura */}
          <span className="absolute -inset-1 rounded-xl bg-[#00F0FF] opacity-20 animate-pulse pointer-events-none" />

          <div className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center shrink-0 text-white">
            <MessageCircle className="w-4 h-4 fill-current" />
          </div>

          <div className="flex flex-col text-left leading-tight">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">Instant Reserve</span>
            <span className="text-xs font-extrabold tracking-tight text-[#F8FAFC]">Chat WhatsApp</span>
          </div>
        </button>

      </aside>

      {/* ========================================================
          MOBILE FLOATING DIRECT BAR (THUMB FRIENDLY STICKY DOCK)
          ======================================================== */}
      <nav 
        aria-label="Mobile Direct Quick Actions" 
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0.75rem))' }}
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#0A0D14]/95 border-t border-[#262F40] backdrop-blur-2xl px-4 pt-3 shadow-[0_-10px_35px_rgba(0,0,0,0.9)]"
      >
        <div className="max-w-md mx-auto grid grid-cols-12 gap-2.5 items-center">
          
          {/* Quick Inquiry Bag icon (2 cols) */}
          <button
            onClick={onOpenBag}
            aria-label="Open Inquiry Bag"
            className="col-span-2 relative flex flex-col items-center justify-center py-2 rounded-xl bg-[#141923] border border-[#262F40] text-[#94A3B8] active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-[9px] font-bold mt-0.5">Bag</span>
            {bagCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0066FF] text-[#F8FAFC] text-[10px] font-extrabold flex items-center justify-center shadow-[0_0_8px_#0066FF]">
                {bagCount}
              </span>
            )}
          </button>

          {/* 1. DIRECT DIALER BUTTON (5 cols) */}
          <a
            href={`tel:${storeData.storeInfo.phoneRaw}`}
            aria-label="Direct Phone Call"
            className="col-span-5 btn-secondary-titanium py-2.5 px-2 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
          >
            <Phone className="w-4 h-4 text-[#00F0FF] shrink-0" />
            <span className="truncate font-mono">Call Showroom</span>
          </a>

          {/* 2. DIRECT WHATSAPP BUTTON (5 cols) */}
          <a
            href={createWhatsAppUrl("Hi Sikandar Bhai! I want to inquire about certified flagship smartphone stock at Abids.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp Message"
            className="col-span-5 btn-primary-cobalt py-2.5 px-2 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current shrink-0" />
            <span className="truncate">Reserve WhatsApp</span>
          </a>

        </div>
      </nav>
    </>
  );
}
