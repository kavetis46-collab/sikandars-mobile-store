import React, { Suspense, lazy } from "react";
import HeroSection from "../components/HeroSection";
import ShowcaseCollections from "../components/ShowcaseCollections";

const InventorySection = lazy(() => import("../components/InventorySection"));
const ComparisonSection = lazy(() => import("../components/ComparisonSection"));
const PhoneExchangeSection = lazy(() => import("../components/PhoneExchangeSection"));
const TrustAndWhySections = lazy(() => import("../components/TrustAndWhySections"));
const CustomerReviewsSection = lazy(() => import("../components/CustomerReviewsSection"));
const FaqSection = lazy(() => import("../components/FaqSection"));
const LocationAndContact = lazy(() => import("../components/LocationAndContact"));

export default function HomePage() {
  return (
    <main>
      {/* 2. Cinematic 3D Hero Animation */}
      <HeroSection />

      {/* 3. Featured Collections, 4. Latest Arrivals, 5. Best Deals, 6. Popular iPhones */}
      <ShowcaseCollections />

      <Suspense
        fallback={
          <div className="py-20 text-center text-xs text-[#858A94]">
            Loading showroom marketplace sections...
          </div>
        }
      >
        {/* 7. Explore by Generation + Advanced Search & Product Catalogue */}
        <InventorySection />

        {/* 8. Side-by-Side Product Comparison */}
        <ComparisonSection />

        {/* 9. Exchange Your Old Phone */}
        <PhoneExchangeSection />

        {/* 10. Why Choose Sikandar Mobile Store & 11. Device Quality & Transparency ("EVERY DETAIL MATTERS.") */}
        <TrustAndWhySections />

        {/* 12. Genuine Customer Reviews */}
        <CustomerReviewsSection />

        {/* 13. Frequently Asked Questions */}
        <FaqSection />

        {/* 14. Contact & Location */}
        <LocationAndContact />
      </Suspense>
    </main>
  );
}
