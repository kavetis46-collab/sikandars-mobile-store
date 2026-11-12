import React from "react";
import { X, Heart, ShoppingCart, Trash2, Sparkles, ArrowRight, Cpu, HardDrive } from "lucide-react";
import { getVariantConditionPricing } from "../data/storeData";

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favoriteProducts = [],
  onRemoveFavorite,
  onClearFavorites,
  onAddToCart,
  onOpenProduct,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0A0D14]/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorites-drawer-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md bg-[#141923] border-l border-[#262F40] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#262F40] flex items-center justify-between bg-[#0A0D14]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#00F0FF] fill-[#00F0FF]/30" />
            </div>
            <div>
              <h2 id="favorites-drawer-title" className="text-lg font-bold text-[#F8FAFC]">
                Saved Favorites ({favoriteProducts.length})
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Your shortlisted Certified Pre-Owned iPhones
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Favorites Drawer"
            className="w-9 h-9 rounded-lg bg-[#141923] hover:bg-[#1e2636] border border-[#262F40] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {favoriteProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#0A0D14] border border-[#262F40] flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-[#94A3B8]" />
              </div>
              <p className="text-[#F8FAFC] font-semibold mb-1">No favorites saved yet</p>
              <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
                Tap the heart icon on any iPhone from iPhone 12 mini to iPhone 18 Pro Max to compare variants &amp; reserve later.
              </p>
            </div>
          ) : (
            favoriteProducts.map((product) => {
              const baseVariant = product.variants?.[0];
              const pricing = getVariantConditionPricing(baseVariant, "good");
              const defaultColor = product.colors?.[0]?.name || "Default";
              const defaultStorage = baseVariant?.storage || "128GB";

              return (
                <div
                  key={product.id}
                  className="p-4 rounded-xl bg-[#0A0D14] border border-[#262F40] hover:border-[#0066FF]/50 transition-all flex gap-4 group"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenProduct?.(product, {
                        storage: defaultStorage,
                        color: defaultColor,
                        condition: "good",
                      });
                    }}
                    className="w-20 h-24 rounded-xl bg-[#141923] border border-[#262F40] flex items-center justify-center p-2 shrink-0 overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenProduct?.(product, {
                            storage: defaultStorage,
                            color: defaultColor,
                            condition: "good",
                          });
                        }}
                        className="text-left"
                      >
                        <h3 className="text-sm font-bold text-[#F8FAFC] hover:text-[#00F0FF] transition-colors truncate">
                          {product.name}
                        </h3>
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFavorite(product.id)}
                        aria-label={`Remove ${product.name} from favorites`}
                        className="text-[#94A3B8] hover:text-rose-400 p-1 shrink-0 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2 py-0.5 rounded">
                        <Cpu className="w-2.5 h-2.5" />
                        {product.ram}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F8FAFC] bg-[#141923] border border-[#262F40] px-2 py-0.5 rounded">
                        <HardDrive className="w-2.5 h-2.5 text-[#94A3B8]" />
                        {defaultStorage}
                      </span>
                      <span className="text-[10px] text-[#94A3B8]">
                        {defaultColor}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-extrabold text-[#F8FAFC] tabular-nums">
                        {pricing.storePriceFormatted}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] line-through tabular-nums">
                        {pricing.originalPriceFormatted}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#00F0FF] font-semibold mt-0.5">
                      Cashify {pricing.cashifyPriceFormatted} + ₹500 • {pricing.condition.label}
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart?.({
                            ...product,
                            selectedStorage: defaultStorage,
                            selectedColor: defaultColor,
                            selectedCondition: "good",
                            cashifyPrice: pricing.cashifyPrice,
                            storePrice: pricing.storePrice,
                            price: pricing.storePriceFormatted,
                            originalPrice: pricing.originalPriceFormatted,
                          });
                        }}
                        className="flex-1 btn-primary-cobalt py-2 px-3 text-[11px] font-bold flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Move to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenProduct?.(product, {
                            storage: defaultStorage,
                            color: defaultColor,
                            condition: "good",
                          });
                        }}
                        className="btn-secondary-titanium py-2 px-2.5 text-[11px] font-bold flex items-center gap-1"
                      >
                        Options
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#262F40] bg-[#0A0D14]/85 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                Saved locally on your device
              </span>
              <button
                type="button"
                onClick={onClearFavorites}
                className="text-rose-400 hover:text-rose-300 font-semibold transition-colors"
              >
                Clear All
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full btn-secondary-titanium py-3 text-xs font-bold"
            >
              Continue Browsing iPhones
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
