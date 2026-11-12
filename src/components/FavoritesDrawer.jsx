import React from "react";
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { formatINR } from "../data/storeData";

export default function FavoritesDrawer() {
  const {
    products,
    favorites,
    toggleFavorite,
    isFavoritesOpen,
    setIsFavoritesOpen,
    addToCart,
  } = useStore();

  if (!isFavoritesOpen) return null;

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#08090C]/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-favs-title"
    >
      <div className="absolute inset-0" onClick={() => setIsFavoritesOpen(false)} />

      <div className="relative z-10 w-full max-w-md bg-[#111318] border-l border-[#C5C7CC]/15 h-full flex flex-col shadow-2xl">
        <div className="p-5 sm:p-6 border-b border-[#C5C7CC]/15 flex items-center justify-between bg-[#08090C]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-400/35 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            </div>
            <div>
              <h2 id="drawer-favs-title" className="text-lg font-extrabold text-white">
                Saved Favorites ({favoriteProducts.length})
              </h2>
              <p className="text-xs text-[#858A94]">Shortlisted devices across generations</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsFavoritesOpen(false)}
            aria-label="Close Favorites"
            className="w-9 h-9 rounded-lg bg-[#08090C] border border-[#C5C7CC]/15 flex items-center justify-center text-[#858A94] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {favoriteProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <Heart className="w-10 h-10 text-[#858A94] mb-3" />
              <p className="text-sm font-bold text-white">No saved favorites yet</p>
              <p className="text-xs text-[#858A94] mt-1 max-w-xs">
                Tap the heart icon on any iPhone card to save and compare later.
              </p>
            </div>
          ) : (
            favoriteProducts.map((p) => {
              const v = p.variants?.[0] || { storage: "128GB", storePrice: p.displayPrice || 0 };
              const c = p.colors?.[0]?.name || "Titanium";
              return (
                <div
                  key={p.id}
                  className="p-4 rounded-2xl bg-[#08090C] border border-[#C5C7CC]/15 flex gap-3.5"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-20 object-contain rounded-xl bg-[#111318] p-1 border border-[#C5C7CC]/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/iphone/${p.slug || p.id}`}
                        onClick={() => setIsFavoritesOpen(false)}
                        className="text-sm font-bold text-white hover:text-[#3478F6] truncate"
                      >
                        {p.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(p.id)}
                        aria-label={`Remove ${p.name}`}
                        className="text-[#858A94] hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-[#858A94] mt-0.5">
                      {p.ram} • {v.storage} • {c}
                    </div>
                    <div className="text-base font-extrabold text-white mt-1.5 tabular-nums">
                      {formatINR(v.storePrice || p.displayPrice || 0)}
                    </div>
                    <div className="flex items-center gap-2 mt-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setIsFavoritesOpen(false);
                          addToCart({
                            ...p,
                            selectedStorage: v.storage,
                            selectedColor: c,
                            selectedCondition: p.conditionGrade || "Good",
                            storePrice: v.storePrice || p.displayPrice,
                          });
                        }}
                        className="flex-1 btn-electric py-2 text-[11px] gap-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                      <Link
                        to={`/iphone/${p.slug || p.id}`}
                        onClick={() => setIsFavoritesOpen(false)}
                        className="btn-titanium py-2 px-3 text-[11px] gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
