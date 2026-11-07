import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck,
  Star,
  Sparkles,
  ExternalLink
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
    { name: 'Flagship Vault', href: '#inventory', badge: 'Apple • Galaxy • Pixel' },
    { name: 'Instagram Reels', href: '#instagram-feed', badge: 'Live Feed' },
    { name: 'Trade-In Valuation', href: '#trade-in', badge: 'Spot Cash' },
    { name: 'Care & Repairs', href: '#services' },
    { name: 'Customer Reviews (4.9★)', href: '#customer-reviews', badge: '242+ Audited' },
    { name: 'Abids & Koti Location', href: '#location' },
  ];

  return (
    <>
      {/* Top Technical Status Micro Bar */}
      <div className="bg-[#0A0D14] border-b border-[#262F40] py-1.5 px-3 sm:px-4 text-xs text-[#94A3B8]">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#00F0FF] truncate text-[11px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-ping shrink-0" />
              <span className="truncate">Open • Jagdish Market, Abids &amp; Koti (11 AM – 10 PM)</span>
            </span>
            <span className="hidden lg:inline text-[#262F40]">|</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[#F8FAFC] text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
              100% Original Battery Health &amp; 3uTools Verified Devices
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-xs shrink-0">
            {/* Direct Phone Dialer Link */}
            <a 
              href={`tel:${storeData.storeInfo.phoneRaw}`} 
              className="hover:text-[#00F0FF] transition-colors flex items-center gap-1 sm:gap-1.5 font-bold text-[#F8FAFC] bg-[#141923] px-2 sm:px-2.5 py-1 rounded-lg border border-[#262F40] text-[11px] sm:text-xs"
              title="Click to dial showroom directly"
            >
              <Phone className="w-3 h-3 text-[#0066FF] fill-[#0066FF]" />
              <span className="font-mono tabular-nums">{storeData.storeInfo.phone}</span>
            </a>

            <span className="hidden sm:inline text-[#262F40]">|</span>

            {/* Direct WhatsApp Link */}
            <a 
              href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to check available flagship phones (Apple, Samsung, Pixel, OnePlus) at your Abids store.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex hover:text-[#00F0FF] transition-colors items-center gap-1.5 text-[#00F0FF] font-extrabold text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Store</span>
            </a>
          </div>

        </div>
      </div>

      {/* Main Engineered Obsidian Glass Navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'nav-obsidian-glass py-3 shadow-[0_10px_30px_-10px_rgba(0,102,255,0.25)]' 
          : 'bg-[#0A0D14]/95 backdrop-blur-xl py-3.5 border-b border-[#262F40]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Branding */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 rounded-xl bg-[#141923] border border-[#262F40] p-[1px] shadow-[0_4px_14px_rgba(0,102,255,0.3)] group-hover:border-[#0066FF] group-hover:shadow-[0_4px_20px_rgba(0,240,255,0.4)] transition-all duration-300 flex items-center justify-center">
              <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-[#00F0FF] to-[#0066FF] group-hover:scale-105 transition-transform">
                SM
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                  Sikandar's <span className="text-[#0066FF]">Mobile Store</span>
                </span>
                <span className="hidden sm:inline-block text-[9px] uppercase font-black tracking-widest bg-[rgba(0,240,255,0.08)] text-[#00F0FF] border border-[rgba(0,240,255,0.25)] px-1.5 py-0.5 rounded">
                  EST. 2003
                </span>
              </div>
              <span className="text-[11px] text-[#94A3B8] tracking-wide font-normal">
                Flagship Smartphone Showroom • Abids & Koti, Hyderabad
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-2 text-xs xl:text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] rounded-lg hover:bg-[#141923] hover:border hover:border-[#262F40] transition-all duration-200 group flex items-center gap-1.5"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold bg-[rgba(0,102,255,0.15)] text-[#00F0FF] border border-[rgba(0,102,255,0.3)] px-1.5 py-0.2 rounded">
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
              className="hidden xl:inline-flex btn-secondary-titanium px-3.5 py-2 text-xs font-bold gap-1.5"
              title="Direct call showroom"
            >
              <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono tabular-nums">Call Showroom</span>
            </a>

            {/* Inquiry Bag Cart Trigger */}
            <button
              onClick={onOpenBag}
              aria-label="View Inquiry Bag"
              className="relative p-2.5 rounded-xl bg-[#141923] hover:bg-[#1c2233] border border-[#262F40] hover:border-[#0066FF] text-[#F8FAFC] transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#00F0FF]" />
              <span className="hidden md:inline text-xs font-bold">Inquiry Bag</span>
              {inquiryBag.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0066FF] text-[#F8FAFC] text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-[0_0_10px_#0066FF]">
                  {inquiryBag.length}
                </span>
              )}
            </button>

            {/* Direct WhatsApp High-Visibility Cobalt Action */}
            <a
              href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to reserve a flagship device or check current stock at your Abids showroom.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-primary-cobalt px-4 py-2 text-xs gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-[#141923] border border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0D14]/98 border-b border-[#262F40] backdrop-blur-2xl px-5 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1.5 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-3 rounded-xl text-[#F8FAFC] hover:bg-[#141923] hover:text-[#00F0FF] text-sm font-semibold transition-colors border border-transparent hover:border-[#262F40]"
                >
                  <span className="flex items-center gap-2.5">
                    {link.name}
                  </span>
                  {link.badge ? (
                    <span className="text-[10px] font-bold bg-[rgba(0,102,255,0.15)] text-[#00F0FF] px-2 py-0.5 rounded border border-[rgba(0,102,255,0.25)]">
                      {link.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                  )}
                </a>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-[#262F40] flex flex-col gap-2.5">
              
              {/* Direct Call Button in Mobile Menu */}
              <a
                href={`tel:${storeData.storeInfo.phoneRaw}`}
                className="w-full btn-secondary-titanium py-3 px-4 text-sm font-bold gap-2"
              >
                <Phone className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-mono">Call Showroom: {storeData.storeInfo.phone}</span>
              </a>

              {/* Direct WhatsApp Button in Mobile Menu */}
              <a
                href={createWhatsAppUrl("Hi Sikandar Bhai, I want to inquire about flagship phone stock at your Abids showroom.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary-cobalt py-3 px-4 text-sm font-bold gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Reserve on WhatsApp Directly</span>
              </a>

            </div>
          </div>
        )}
      </header>
    </>
  );
}
