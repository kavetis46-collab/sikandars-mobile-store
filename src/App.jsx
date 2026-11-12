import React, { useState, useEffect, Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import InventorySection from "./components/InventorySection";
import FloatingActions from "./components/FloatingActions";
import { storeData } from "./data/storeData";

// Code-split below-the-fold sections for ultra-fast initial mobile paint
const InstagramFeedSection = lazy(() => import("./components/InstagramFeedSection"));
const StoreGallery = lazy(() => import("./components/StoreGallery"));
const CustomerReviewsSection = lazy(() => import("./components/CustomerReviewsSection"));
const LocationAndContact = lazy(() => import("./components/LocationAndContact"));
const Footer = lazy(() => import("./components/Footer"));
const ProductDetailsModal = lazy(() => import("./components/ProductDetailsModal"));
const InquiryBagDrawer = lazy(() => import("./components/InquiryBagDrawer"));
const FavoritesDrawer = lazy(() => import("./components/FavoritesDrawer"));

const CART_STORAGE_KEY = "sikandar_istore_cart_v1";
const FAVORITES_STORAGE_KEY = "sikandar_istore_favs_v1";

export default function App() {
  const [selectedModalState, setSelectedModalState] = useState(null);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [favorites]);

  const handleToggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [productId, ...prev]
    );
  };

  const handleAddToCart = (item) => {
    const storage = item.selectedStorage || item.variants?.[0]?.storage || "Default";
    const condition = item.selectedCondition || "good";
    const color = item.selectedColor || item.colors?.[0]?.name || "Default";
    const cartKey = `${item.id}-${storage}-${condition}-${color}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartKey === cartKey);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: (updated[existingIndex].qty || 1) + 1,
        };
        return updated;
      }
      return [
        ...prev,
        {
          ...item,
          selectedStorage: storage,
          selectedCondition: condition,
          selectedColor: color,
          cartKey,
          qty: 1,
        },
      ];
    });
    setIsBagOpen(true);
  };

  const handleUpdateQty = (cartKey, nextQty) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, qty: nextQty } : item))
    );
  };

  const handleRemoveItem = (cartKey) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenModal = (product, initialSelection = {}) => {
    setSelectedModalState({
      product,
      initialStorage: initialSelection.storage || product?.variants?.[0]?.storage,
      initialColor: initialSelection.color || product?.colors?.[0]?.name,
      initialCondition: initialSelection.condition || "good",
    });
  };

  const favoriteProducts = storeData.products.filter((p) => favorites.includes(p.id));
  const totalBagCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F8FAFC] relative selection:bg-[#0066FF] selection:text-[#F8FAFC]">
      {/* Obsidian Luxury Navigation Header */}
      <Navbar
        inquiryBag={cartItems}
        onOpenBag={() => setIsBagOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Content */}
      <main>
        <HeroSection />
        <InventorySection
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenModal={handleOpenModal}
          onAddToBag={handleAddToCart}
        />

        <Suspense fallback={<div className="py-16 text-center text-xs text-[#94A3B8]">Loading showroom feed...</div>}>
          <InstagramFeedSection />
          <StoreGallery />
          <CustomerReviewsSection />
          <LocationAndContact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />

        {/* Product Detail Inspection Modal */}
        <ProductDetailsModal
          product={selectedModalState?.product}
          initialStorage={selectedModalState?.initialStorage}
          initialColor={selectedModalState?.initialColor}
          initialCondition={selectedModalState?.initialCondition}
          isFavorite={
            selectedModalState?.product
              ? favorites.includes(selectedModalState.product.id)
              : false
          }
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedModalState(null)}
          onAddToBag={handleAddToCart}
        />

        {/* Slide-Over Buy Cart Drawer */}
        <InquiryBagDrawer
          isOpen={isBagOpen}
          onClose={() => setIsBagOpen(false)}
          items={cartItems}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearBag={handleClearCart}
        />

        {/* Slide-Over Favorites Wishlist Drawer */}
        <FavoritesDrawer
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favoriteProducts={favoriteProducts}
          onRemoveFavorite={handleToggleFavorite}
          onClearFavorites={() => setFavorites([])}
          onAddToCart={handleAddToCart}
          onOpenProduct={handleOpenModal}
        />
      </Suspense>

      {/* Always-On Floating Call, WhatsApp, Cart & Favorites Dock */}
      <FloatingActions
        onOpenBag={() => setIsBagOpen(true)}
        bagCount={totalBagCount}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        favoritesCount={favorites.length}
      />
    </div>
  );
}
