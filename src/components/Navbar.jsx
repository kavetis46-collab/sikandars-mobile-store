import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Repeat, 
  ShieldCheck,
  Star,
  Award
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
    { name: 'iPhone Inventory', href: '#inventory', badge: '11+ Models' },
    { name: 'Instagram Reels', href: '#instagram-feed', badge: 'Reels' },
    { name: 'Trade-In', href: '#trade-in', badge: 'Spot Cash' },
    { name: 'Apple Repairs', href: '#services' },
    { name: 'Store Gallery', href: '#gallery' },
    { name: 'Reviews (4.9★)', href: '#customer-reviews', badge: '242+' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <>
      {/* Top micro bar for store status and quick direct contact */}
      <div className="bg-[#05060a] border-b border-amber-500/20 py-2 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Store Open Now • Jagdish Market, Hyderabad (11 AM – 10 PM)
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Certified Genuine iPhone 16 Pro Max
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto">
            {/* Direct Phone Dialer Link */}
            <a 
              href={`tel:${storeData.storeInfo.phoneRaw}`} 
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-bold text-white bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10"
              title="Click to dial directly"
            >
              <Phone className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{storeData.storeInfo.phone}</span>
            </a>

            <span className="text-slate-600">|</span>

            {/* Direct WhatsApp Link */}
            <a 
              href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to check available iPhone 16 Pro Max models and prices.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-emerald-400 font-extrabold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Store</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Glass Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav-luxury py-3.5 shadow-2xl shadow-black/90' 
          : 'bg-[#06070c]/90 backdrop-blur-xl py-4 border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-700 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0a0d18] rounded-[14px] flex items-center justify-center overflow-hidden">
                <span className="font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 group-hover:scale-110 transition-transform">
                  SM
                </span>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Sikandar's <span className="text-gradient-gold">Mobile Store</span>
                </span>
                <span className="hidden sm:inline-block text-[9px] uppercase font-black tracking-widest bg-amber-500/15 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded">
                  EST. 2003
                </span>
              </div>
              <span className="text-[11px] text-slate-400 tracking-wide font-normal">
                iPhone 16 Pro Max Specialist • Jagdish Market
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-2 text-xs xl:text-sm font-bold text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200 group flex items-center gap-1.5"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Direct Phone Call Button */}
            <a
              href={`tel:${storeData.storeInfo.phoneRaw}`}
              className="hidden xl:flex items-center gap-1.5 text-xs font-black px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
              title="Direct call"
            >
              <Phone className="w-3.5 h-3.5 fill-slate-950" />
              <span>Call Now</span>
            </a>

            {/* Inquiry Bag Cart Trigger */}
            <button
              onClick={onOpenBag}
              aria-label="View Inquiry Bag"
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span className="hidden md:inline text-xs font-bold">Inquiry Bag</span>
              {inquiryBag.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-slate-950 text-xs font-black rounded-full flex items-center justify-center animate-bounce">
                  {inquiryBag.length}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Quick CTA */}
            <a
              href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to enquire about iPhone 16 Pro Max stock.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-black text-xs tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 active:scale-95 border border-emerald-300/40"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat WhatsApp</span>
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
          <div className="lg:hidden bg-[#0a0d18]/98 border-b border-amber-500/30 backdrop-blur-2xl px-5 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1.5 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-slate-200 hover:bg-white/5 hover:text-amber-400 text-sm font-bold transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    {link.name}
                  </span>
                  {link.badge ? (
                    <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  )}
                </a>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex flex-col gap-2.5">
              
              {/* Direct Call Button in Mobile Menu */}
              <a
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-sm font-black shadow-lg shadow-amber-500/20"
              >
                <Phone className="w-4 h-4 fill-slate-950" />
                <span>Call Directly: {storeData.storeInfo.phone}</span>
              </a>

              {/* Direct WhatsApp Button in Mobile Menu */}
              <a
                href={createWhatsAppUrl("Hi Sikandar Bhai, I want to know about your current iPhone 16 Pro Max stock and pricing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-sm font-black shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Sikandar Bhai Directly</span>
              </a>

            </div>
          </div>
        )}
      </header>
    </>
  );
}
