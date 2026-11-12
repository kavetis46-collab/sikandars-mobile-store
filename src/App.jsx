import React, { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InventorySection from './components/InventorySection';
import FloatingActions from './components/FloatingActions';
import { storeData } from './data/storeData';

// Below-the-fold Buy-Focused components lazy-loaded for instant performance on mobile & PC
const InstagramFeedSection = lazy(() => import('./components/InstagramFeedSection'));
const StoreGallery = lazy(() => import('./components/StoreGallery'));
const CustomerReviewsSection = lazy(() => import('./components/CustomerReviewsSection'));
const LatestUpdates = lazy(() => import('./components/LatestUpdates'));
const FaqSection = lazy(() => import('./components/FaqSection'));
const LocationAndContact = lazy(() => import('./components/LocationAndContact'));
const Footer = lazy(() => import('./components/Footer'));
const ProductDetailsModal = lazy(() => import('./components/ProductDetailsModal'));
const InquiryBagDrawer = lazy(() => import('./components/InquiryBagDrawer'));

// Lightweight placeholder during lazy fetch
const SectionLoader = () => (
  <div className="py-12 flex items-center justify-center">
    <div className="w-6 h-6 rounded-full border-2 border-[#0066FF] border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  const [inquiryBag, setInquiryBag] = useState([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [selectedModalState, setSelectedModalState] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedProduct = selectedModalState
    ? storeData.products.find((p) => p.id === selectedModalState.id)
    : null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleOpenProduct = (id, variantIdx = 0, colorIdx = 0) => {
    setSelectedModalState({ id, variantIdx, colorIdx });
  };

  const handleAddToBag = (productItem) => {
    const existsIndex = inquiryBag.findIndex((item) => item.id === productItem.id);
    if (existsIndex >= 0) {
      const existing = inquiryBag[existsIndex];
      const sameVariant =
        existing.selectedStorage === productItem.selectedStorage &&
        existing.selectedColor === productItem.selectedColor;
      if (sameVariant) {
        setInquiryBag(inquiryBag.filter((item) => item.id !== productItem.id));
        showToast(`Removed ${productItem.name} from buy bag`);
      } else {
        const updated = [...inquiryBag];
        updated[existsIndex] = productItem;
        setInquiryBag(updated);
        showToast(`Updated ${productItem.name} (${productItem.selectedStorage || ''}) in bag`);
      }
    } else {
      setInquiryBag([...inquiryBag, productItem]);
      showToast(`Added ${productItem.name} to buy bag`);
    }
  };

  const handleRemoveFromBag = (id) => {
    setInquiryBag(inquiryBag.filter((item) => item.id !== id));
  };

  const handleClearBag = () => {
    setInquiryBag([]);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0A0D14] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#0066FF] selection:text-[#F8FAFC] bg-obsidian-canvas">
      
      {/* High-Visibility Cobalt Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-3 sm:right-6 z-50 bg-[#141923] text-[#00F0FF] px-4 py-2.5 rounded-xl text-xs font-bold shadow-[0_10px_30px_-5px_rgba(0,102,255,0.4)] animate-in slide-in-from-top duration-200 flex items-center gap-2 border border-[#0066FF]/60 backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Luxury Buy-Only Navigation (Immediate Paint) */}
      <Navbar
        inquiryBag={inquiryBag}
        onOpenBag={() => setIsBagOpen(true)}
      />

      {/* Main Content Area */}
      <main id="website-main" className="flex-1 pb-24 sm:pb-0">
        
        {/* Flagship iPhone Hero (Immediate Paint - 0ms Delay) */}
        <HeroSection
          onSelectProduct={(id) => handleOpenProduct(id, 0, 0)}
        />

        {/* Complete Certified iPhone Buy Vault: iPhone 12 mini to iPhone 18 Pro Max */}
        <InventorySection
          onSelectProduct={handleOpenProduct}
          onAddToBag={handleAddToBag}
          inquiryBag={inquiryBag}
        />

        {/* Below-the-fold sections wrapped in Suspense for instant page responsiveness */}
        <Suspense fallback={<SectionLoader />}>
          
          {/* Live Instagram Reels & Store Stock Feed */}
          <InstagramFeedSection />

          {/* Real Store Photo Gallery Lightbox */}
          <StoreGallery />

          {/* Latest Buy Stock Alerts */}
          <LatestUpdates />

          {/* FAQ Accordion */}
          <FaqSection />

          {/* Dedicated Customer Rating & Reviews Section */}
          <CustomerReviewsSection />

          {/* Store Location, Google Map & Buy Inquiry Form */}
          <LocationAndContact />

          {/* Footer */}
          <Footer />

        </Suspense>
      </main>

      {/* Product Details Specs & Variant Modal (Lazy) */}
      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductDetailsModal
            product={selectedProduct}
            initialVariantIdx={selectedModalState.variantIdx}
            initialColorIdx={selectedModalState.colorIdx}
            onClose={() => setSelectedModalState(null)}
            onAddToBag={handleAddToBag}
            isInBag={inquiryBag.some((i) => i.id === selectedProduct.id)}
          />
        </Suspense>
      )}

      {/* Inquiry Bag Side Drawer (Lazy) */}
      {isBagOpen && (
        <Suspense fallback={null}>
          <InquiryBagDrawer
            isOpen={isBagOpen}
            onClose={() => setIsBagOpen(false)}
            items={inquiryBag}
            onRemoveItem={handleRemoveFromBag}
            onClearBag={handleClearBag}
          />
        </Suspense>
      )}

      {/* FLOATING ACTION BUTTONS (Direct Dialer & Direct WhatsApp) */}
      <FloatingActions
        onOpenBag={() => setIsBagOpen(true)}
        bagCount={inquiryBag.length}
      />

    </div>
  );
}
