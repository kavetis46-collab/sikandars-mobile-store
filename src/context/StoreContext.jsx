import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchProducts, fetchReviews, fetchShopSettings } from "../lib/api";
import { storeData, formatINR } from "../data/storeData";

const StoreContext = createContext(null);

const CART_KEY = "sikandar_ms_cart_v2";
const FAV_KEY = "sikandar_ms_favs_v2";
const COMPARE_KEY = "sikandar_ms_compare_v2";
const HISTORY_KEY = "sikandar_ms_search_history_v1";

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [shopSettings, setShopSettings] = useState({
    storeName: "SIKANDAR MOBILE STORE",
    tagline: "PREMIUM PHONES. SMARTER PRICES.",
    whatsapp: storeData.storeInfo.whatsapp,
    phone: storeData.storeInfo.phone,
    phoneRaw: storeData.storeInfo.phoneRaw,
    email: "contact@sikandarsmobilestore.in",
    address: storeData.storeInfo.address,
    landmark: "Chirag Ali Lane Junction, Jagdish Market, Abids & Koti",
    mapsUrl: storeData.storeInfo.mapsUrl,
    instagramUrl: storeData.storeInfo.instagram.url,
    workingHours: storeData.storeInfo.workingHours,
    warrantyPolicy: "6 Months Store Testing & Hardware Verification Warranty.",
    returnPolicy: "7-Day Functional Verification Exchange Guarantee.",
  });
  const [loading, setLoading] = useState(true);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [compareIds, setCompareIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const [searchHistory, setSearchHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const refreshStoreData = useCallback(async () => {
    try {
      const [prods, revs, settings] = await Promise.all([
        fetchProducts(),
        fetchReviews(false),
        fetchShopSettings(),
      ]);
      setProducts(Array.isArray(prods) ? prods : []);
      setReviews(Array.isArray(revs) ? revs : []);
      if (settings) setShopSettings(settings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStoreData();
  }, [refreshStoreData]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(compareIds));
    } catch {}
  }, [compareIds]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
    } catch {}
  }, [searchHistory]);

  const toggleFavorite = useCallback((productId) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [productId, ...prev]
    );
  }, []);

  const toggleCompare = useCallback((productId) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) return prev.filter((id) => id !== productId);
      if (prev.length >= 3) return [prev[1], prev[2], productId];
      return [...prev, productId];
    });
  }, []);

  const addSearchHistoryTerm = useCallback((term) => {
    const cleaned = String(term || "").trim();
    if (cleaned.length < 2) return;
    setSearchHistory((prev) => [cleaned, ...prev.filter((t) => t.toLowerCase() !== cleaned.toLowerCase())].slice(0, 6));
  }, []);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  const addToCart = useCallback((item) => {
    const storage = item.selectedStorage || item.variants?.[0]?.storage || "256GB";
    const condition = item.selectedCondition || item.conditionGrade || "Good";
    const color = item.selectedColor || item.colors?.[0]?.name || "Default";
    const cartKey = `${item.id}-${storage}-${condition}-${color}`;
    const storePrice = Number(item.storePrice || item.displayPrice || item.variants?.[0]?.storePrice || 0);
    const cashifyPrice = Number(item.cashifyPrice || item.variants?.[0]?.cashifyPrice || Math.max(0, storePrice - 500));

    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.cartKey === cartKey);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: (next[idx].qty || 1) + 1 };
        return next;
      }
      return [
        ...prev,
        {
          id: item.id,
          slug: item.slug || item.id,
          name: item.name,
          ram: item.ram,
          image: item.image,
          selectedStorage: storage,
          selectedCondition: condition,
          selectedColor: color,
          storePrice,
          cashifyPrice,
          price: item.price || formatINR(storePrice),
          cartKey,
          qty: 1,
        },
      ];
    });
    setIsBagOpen(true);
  }, []);

  const updateCartQty = useCallback((cartKey, qty) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
      return;
    }
    setCartItems((prev) => prev.map((item) => (item.cartKey === cartKey ? { ...item, qty } : item)));
  }, []);

  const removeFromCart = useCallback((cartKey) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const value = {
    products,
    reviews,
    shopSettings,
    loading,
    refreshStoreData,
    cartItems,
    isBagOpen,
    setIsBagOpen,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    favorites,
    toggleFavorite,
    isFavoritesOpen,
    setIsFavoritesOpen,
    compareIds,
    toggleCompare,
    setCompareIds,
    searchHistory,
    addSearchHistoryTerm,
    clearSearchHistory,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
