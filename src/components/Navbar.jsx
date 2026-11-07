import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Smartphone, 
  Wrench, 
  Repeat, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function Navbar({ inquiryBag, onOpenBag, onOpenTradeIn }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Stock & Phones', href: '#inventory' },
    { name: 'Repairs & Care', href: '#services' },
    { name: 'Trade-In Calculator', href: '#trade-in', badge: 'Fast Valuation' },
    { name: 'Store Gallery', href: '#gallery' },
    { name: 'Reviews (4.9★)', href: '#reviews' },
    { name: 'Store Location', href: '#location' },
  ];

  return (
    <>
      {/* Top micro bar for store status and phone */}
      <div className="bg-[#0e1017] border-b border-white/5 py-1.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Store Open Now • Jagdish Market, Hyderabad (11 AM – 10 PM)
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 60-Point Certified Pre-Owned iPhones
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto">
            <a 
              href={`tel:${storeData.storeInfo.phoneRaw}`} 
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{storeData.storeInfo.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to check available iPhone models and prices.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-400 font-semibold"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Sikandar Bhai</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-3.5 shadow-2xl shadow-black/80' 
          : 'bg-[#090a0f]/90 backdrop-blur-md py-4 border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="font-bold text-lg tracking-wider text-white group-hover:scale-110 transition-transform">
                  S<span className="text-emerald-400">M</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  Sikandar's <span className="text-emerald-400">Mobile Store</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  Since 2003
                </span>
              </div>
              <span className="text-[11px] text-slate-400 tracking-wide font-normal">
                iPhone Sales &amp; Service • Jagdish Market
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 group flex items-center gap-1.5"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Trade In Shortcut */}
            <button
              onClick={onOpenTradeIn}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
            >
              <Repeat className="w-3.5 h-3.5 text-emerald-400" />
              <span>Trade-In Valuation</span>
            </button>

            {/* Inquiry Bag Cart Trigger */}
            <button
              onClick={onOpenBag}
              aria-label="View Inquiry Bag"
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span className="hidden md:inline text-xs font-medium">Inquiry Bag</span>
              {inquiryBag.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-slate-950 text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {inquiryBag.length}
                </span>
              )}
            </button>

            {/* WhatsApp Quick CTA */}
            <a
              href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to enquire about iPhone stock.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat with Us</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0f17]/95 border-b border-white/10 backdrop-blur-2xl px-5 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1.5 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-200 hover:bg-white/5 hover:text-emerald-400 text-sm font-medium transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    {link.name}
                  </span>
                  {link.badge ? (
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                </a>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTradeIn();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-sm font-semibold transition-all"
              >
                <Repeat className="w-4 h-4 text-emerald-400" />
                <span>Calculate Old Phone Trade-In</span>
              </button>

              <a
                href={createWhatsAppUrl("Hi Sikandar Bhai, I want to know about your current iPhone inventory and pricing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Sikandar Bhai Directly</span>
              </a>

              <a
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Store: {storeData.storeInfo.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
