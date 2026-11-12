import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowUp, ShoppingCart, Heart } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppEnquiryUrl } from "../lib/api";

export default function FloatingActions() {
  const {
    shopSettings,
    cartItems,
    setIsBagOpen,
    favorites,
    setIsFavoritesOpen,
  } = useStore();

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalUnits = cartItems.reduce((sum, i) => sum + (i.qty || 1), 0);
  const waHref = buildWhatsAppEnquiryUrl(shopSettings.whatsapp);

  return (
    <>
      {/* Desktop Floating Action Stack */}
      <aside
        aria-label="Quick Contact Actions"
        className="fixed bottom-7 right-6 z-40 hidden sm:flex flex-col items-end gap-2.5"
      >
        {showTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="p-3 rounded-xl bg-[#111318] border border-[#C5C7CC]/20 text-[#C5C7CC] hover:text-white hover:border-[#3478F6] transition-all cursor-pointer shadow-xl"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={`tel:${shopSettings.phoneRaw}`}
          aria-label={`Call ${shopSettings.phone}`}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111318]/95 border border-[#C5C7CC]/20 hover:border-[#3478F6] text-xs font-bold text-white shadow-xl backdrop-blur-md transition-all"
        >
          <Phone className="w-4 h-4 text-[#3478F6]" />
          <span className="font-mono">{shopSettings.phone}</span>
        </a>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Enquiry"
          className="btn-electric px-4 py-3 text-xs gap-2 shadow-[0_8px_28px_rgba(52,120,246,0.45)]"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp Store</span>
        </a>
      </aside>

      {/* Mobile Bottom Dock */}
      <nav
        aria-label="Mobile Quick Bar"
        style={{ paddingBottom: "max(0.65rem, env(safe-area-inset-bottom, 0.65rem))" }}
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#08090C]/95 border-t border-[#C5C7CC]/15 backdrop-blur-2xl px-3 pt-2"
      >
        <div className="grid grid-cols-12 gap-2 items-center max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setIsFavoritesOpen(true)}
            aria-label="Open Favorites"
            className="col-span-2 relative flex flex-col items-center justify-center py-1.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/15 text-[#C5C7CC]"
          >
            <Heart className={`w-4 h-4 ${favorites.length > 0 ? "fill-rose-400 text-rose-400" : ""}`} />
            <span className="text-[9px] font-semibold mt-0.5">Saved</span>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsBagOpen(true)}
            aria-label="Open Cart"
            className="col-span-2 relative flex flex-col items-center justify-center py-1.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/15 text-[#C5C7CC]"
          >
            <ShoppingCart className="w-4 h-4 text-[#3478F6]" />
            <span className="text-[9px] font-semibold mt-0.5">Cart</span>
            {totalUnits > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3478F6] text-white text-[9px] font-bold flex items-center justify-center">
                {totalUnits}
              </span>
            )}
          </button>

          <a
            href={`tel:${shopSettings.phoneRaw}`}
            className="col-span-4 btn-titanium py-2.5 text-[11px] gap-1"
          >
            <Phone className="w-3.5 h-3.5 text-[#3478F6]" />
            <span>Call</span>
          </a>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-4 btn-electric py-2.5 text-[11px] gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>
    </>
  );
}
