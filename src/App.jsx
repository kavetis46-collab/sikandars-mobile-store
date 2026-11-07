import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InventorySection from './components/InventorySection';
import InstagramFeedSection from './components/InstagramFeedSection';
import TradeInCalculator from './components/TradeInCalculator';
import RepairServicesHub from './components/RepairServicesHub';
import StoreGallery from './components/StoreGallery';
import CustomerReviewsSection from './components/CustomerReviewsSection';
import LatestUpdates from './components/LatestUpdates';
import FaqSection from './components/FaqSection';
import LocationAndContact from './components/LocationAndContact';
import Footer from './components/Footer';
import ProductDetailsModal from './components/ProductDetailsModal';
import InquiryBagDrawer from './components/InquiryBagDrawer';
import FloatingActions from './components/FloatingActions';
import { storeData } from './data/storeData';

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
    }, 3000);
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
    <div className="min-h-screen bg-[#0A0D14] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#0066FF] selection:text-[#F8FAFC] bg-obsidian-canvas">
      
      {/* High-Visibility Cobalt Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#141923] text-[#00F0FF] px-4 py-2.5 rounded-xl text-xs font-bold shadow-[0_10px_30px_-5px_rgba(0,102,255,0.4)] animate-in slide-in-from-top duration-200 flex items-center gap-2 border border-[#0066FF]/60 backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Luxury Navigation */}
      <Navbar
        inquiryBag={inquiryBag}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenTradeIn={handleOpenTradeIn}
      />

      {/* Hero Section */}
      <main id="website-main" className="flex-1">
        
        {/* Flagship Hero with iPhone 16 Pro Max Finishes */}
        <HeroSection
          onOpenTradeIn={handleOpenTradeIn}
          onSelectProduct={(id) => setSelectedProductId(id)}
        />

        {/* Live iPhone Inventory Vault */}
        <InventorySection
          onSelectProduct={(id) => setSelectedProductId(id)}
          onAddToBag={handleAddToBag}
          inquiryBag={inquiryBag}
        />

        {/* Live Instagram Reels & Store Social Feed */}
        <InstagramFeedSection />

        {/* Trade-In Exchange Valuation Calculator */}
        <TradeInCalculator />

        {/* Apple Certified Repair & Care Hub */}
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
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Details Specs Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProductId(null)}
        onAddToBag={handleAddToBag}
        isInBag={selectedProduct ? inquiryBag.some(i => i.id === selectedProduct.id) : false}
      />

      {/* Inquiry Bag Side Drawer */}
      <InquiryBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={inquiryBag}
        onRemoveItem={handleRemoveFromBag}
        onClearBag={handleClearBag}
      />

      {/* FLOATING ACTION BUTTONS (Direct Dialer & Direct WhatsApp with native redirection) */}
      <FloatingActions
        onOpenBag={() => setIsBagOpen(true)}
        bagCount={inquiryBag.length}
      />

    </div>
  );
}
