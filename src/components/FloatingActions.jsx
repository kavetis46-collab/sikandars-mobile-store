import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Phone, 
  Repeat, 
  MapPin, 
  ArrowUp,
  ShoppingBag
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function FloatingActions({ onOpenTradeIn, onOpenBag, bagCount }) {
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

  return (
    <>
      {/* Floating Desktop Bottom-Right Buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-3">
        
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-white/10 hover:border-emerald-500/40 shadow-xl backdrop-blur-md transition-all hover:scale-105"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Floating Call Button */}
        <a
          href={`tel:${storeData.storeInfo.phoneRaw}`}
          className="p-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-white/10 shadow-xl backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2 group"
          title={`Call ${storeData.storeInfo.phone}`}
        >
          <Phone className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-bold text-white whitespace-nowrap pr-1">
            {storeData.storeInfo.phone}
          </span>
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to enquire about phones or service at your Jagdish Market store.")}
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-2xl shadow-emerald-500/40 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />
          <MessageCircle className="w-6 h-6 fill-current relative z-10" />
        </a>

      </div>

      {/* Sticky Bottom Bar on Mobile Devices (Thumb Friendly) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#0d0f17]/95 border-t border-white/10 backdrop-blur-xl px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
        
        <a
          href="#inventory"
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <span className="text-[10px] font-semibold mt-0.5">Phones</span>
        </a>

        <button
          onClick={onOpenTradeIn}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <Repeat className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-semibold mt-0.5">Trade-In</span>
        </button>

        <button
          onClick={onOpenBag}
          className="relative flex-1 flex flex-col items-center justify-center py-1 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Bag</span>
          {bagCount > 0 && (
            <span className="absolute top-0 right-3 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
              {bagCount}
            </span>
          )}
        </button>

        <a
          href={`tel:${storeData.storeInfo.phoneRaw}`}
          className="flex-1 flex flex-col items-center justify-center py-1 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[10px] font-semibold mt-0.5">Call</span>
        </a>

        <a
          href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to ask about available iPhone stock.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] py-2 px-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>

      </div>
    </>
  );
}
