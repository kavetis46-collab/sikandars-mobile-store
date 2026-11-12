import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ArrowLeftRight,
  Lock,
  Sparkles,
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppEnquiryUrl } from "../lib/api";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    shopSettings,
    cartItems,
    setIsBagOpen,
    favorites,
    setIsFavoritesOpen,
    compareIds,
  } = useStore();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Collections", id: "featured-collections" },
    { label: "Catalogue", id: "explore-catalogue" },
    { label: "Compare", id: "compare-iphones", count: compareIds.length },
    { label: "Exchange", id: "exchange-phone" },
    { label: "Reviews", id: "customer-reviews" },
    { label: "Location", id: "location" },
  ];

  const totalUnits = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <>
      {/* Top Studio Announcement Strip */}
      <div className="bg-[#08090C] border-b border-[#C5C7CC]/10 text-[#C5C7CC] text-[11px] py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-[#FFFFFF] font-semibold tracking-wide">
              <Sparkles className="w-3 h-3 text-[#3478F6]" />
              {shopSettings.tagline || "PREMIUM PHONES. SMARTER PRICES."}
            </span>
            <span className="text-[#858A94] hidden lg:inline">
              • {shopSettings.address}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${shopSettings.phoneRaw}`}
              className="hover:text-[#FFFFFF] transition-colors font-mono"
            >
              {shopSettings.phone}
            </a>
            <span className="text-[#858A94]">|</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-[#C5C7CC] hover:text-[#3478F6] transition-colors font-semibold"
            >
              <Lock className="w-3 h-3" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Midnight Glass Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "nav-midnight-glass shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
            : "bg-[#08090C]/90 border-b border-[#C5C7CC]/10 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
          <Link to="/" aria-label="Sikandar Mobile Store Home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <BrandLogo showTagline={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#C5C7CC] hover:text-[#FFFFFF] hover:bg-white/[0.04] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#3478F6] text-[10px] font-extrabold text-white">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {compareIds.length > 0 && (
              <button
                type="button"
                onClick={() => scrollToSection("compare-iphones")}
                aria-label="Jump to iPhone comparison"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111318] border border-[#3478F6]/50 text-xs font-bold text-[#93C5FD] hover:bg-[#3478F6]/10 transition-all cursor-pointer"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Compare ({compareIds.length})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsFavoritesOpen(true)}
              aria-label="Open Saved Favorites"
              className="relative p-2.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/15 hover:border-[#C5C7CC]/40 text-[#C5C7CC] hover:text-white transition-all cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? "fill-rose-400 text-rose-400" : ""}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsBagOpen(true)}
              aria-label="Open Cart"
              className="relative p-2.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/15 hover:border-[#3478F6] text-[#C5C7CC] hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-[#3478F6]" />
              <span className="hidden md:inline text-xs font-bold text-white">Cart</span>
              {totalUnits > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#3478F6] text-white text-[10px] font-extrabold flex items-center justify-center shadow-[0_0_12px_rgba(52,120,246,0.7)]">
                  {totalUnits}
                </span>
              )}
            </button>

            <a
              href={buildWhatsAppEnquiryUrl(shopSettings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex btn-electric px-4 py-2 text-xs gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/15 text-[#C5C7CC] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#08090C]/98 border-b border-[#C5C7CC]/15 px-5 py-4 space-y-2 backdrop-blur-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#C5C7CC] hover:text-white hover:bg-[#111318]"
              >
                <span>{item.label}</span>
                {item.count > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#3478F6] text-[10px] font-bold text-white">
                    {item.count}
                  </span>
                )}
              </button>
            ))}

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#93C5FD] bg-[#3478F6]/10 border border-[#3478F6]/25"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Link>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <a
                href={`tel:${shopSettings.phoneRaw}`}
                className="btn-titanium py-2.5 text-xs gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#3478F6]" />
                <span>Call Store</span>
              </a>
              <a
                href={buildWhatsAppEnquiryUrl(shopSettings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric py-2.5 text-xs gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
