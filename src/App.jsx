import React, { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InventorySection from './components/InventorySection';
import FloatingActions from './components/FloatingActions';
import { storeData } from './data/storeData';

// Below-the-fold components lazy-loaded for maximum performance on mobile and PC
const InstagramFeedSection = lazy(() => import('./components/InstagramFeedSection'));
const TradeInCalculator = lazy(() => import('./components/TradeInCalculator'));
const RepairServicesHub = lazy(() => import('./components/RepairServicesHub'));
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
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedProduct = storeData.products.find(p => p.id === selectedProductId);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToBag = (product) => {
    if (inquiryBag.some(item => item.id === product.id)) {
      setInquiryBag(inquiryBag.filter(item => item.id !== product.id));
      showToast(`Removed ${product.name} from inquiry bag`);
    } else {
      setInquiryBag([...inquiryBag, product]);
      showToast(`Added ${product.name} to inquiry bag`);
    }
  };

  const handleRemoveFromBag = (id) => {
    setInquiryBag(inquiryBag.filter(item => item.id !== id));
  };

  const handleClearBag = () => {
    setInquiryBag([]);
  };

  const handleOpenTradeIn = () => {
    const el = document.getElementById('trade-in');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Main Luxury Navigation (Immediate Paint) */}
      <Navbar
        inquiryBag={inquiryBag}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenTradeIn={handleOpenTradeIn}
      />

      {/* Main Content Area */}
      <main id="website-main" className="flex-1 pb-24 sm:pb-0">
        
        {/* Flagship Hero (Immediate Paint - 0ms Delay) */}
        <HeroSection
          onOpenTradeIn={handleOpenTradeIn}
          onSelectProduct={(id) => setSelectedProductId(id)}
        />

        {/* Live Flagship Inventory Vault (Immediate Paint) */}
        <InventorySection
          onSelectProduct={(id) => setSelectedProductId(id)}
          onAddToBag={handleAddToBag}
          inquiryBag={inquiryBag}
        />

        {/* Below-the-fold sections wrapped in Suspense for instant page responsiveness */}
        <Suspense fallback={<SectionLoader />}>
          
          {/* Live Instagram Reels & Store Social Feed */}
          <InstagramFeedSection />

          {/* Trade-In Exchange Valuation Calculator */}
          <TradeInCalculator />

          {/* Apple & Android Certified Repair & Care Hub */}
          <RepairServicesHub
            onBookService={(service) => {}}
          />

          {/* Real Store Photo Gallery Lightbox */}
          <StoreGallery />

          {/* Latest Stock Alerts & Posts */}
          <LatestUpdates />

          {/* FAQ Accordion */}
          <FaqSection />

          {/* DEDICATED CUSTOMER RATING & REVIEWS SECTION AT THE BOTTOM */}
          <CustomerReviewsSection />

          {/* Store Location, Google Map & Inquiry Form */}
          <LocationAndContact />

          {/* Footer */}
          <Footer />

        </Suspense>
      </main>

      {/* Product Details Specs Modal (Lazy) */}
      {selectedProductId && (
        <Suspense fallback={null}>
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => setSelectedProductId(null)}
            onAddToBag={handleAddToBag}
            isInBag={selectedProduct ? inquiryBag.some(i => i.id === selectedProduct.id) : false}
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

      {/* FLOATING ACTION BUTTONS (Direct Dialer & Direct WhatsApp with native redirection) */}
      <FloatingActions
        onOpenBag={() => setIsBagOpen(true)}
        bagCount={inquiryBag.length}
      />

    </div>
  );
}
