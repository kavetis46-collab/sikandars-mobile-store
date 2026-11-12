import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import InquiryBagDrawer from "./components/InquiryBagDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import HomePage from "./pages/HomePage";

const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <div className="min-h-screen bg-[#08090C] text-[#FFFFFF] flex flex-col selection:bg-[#3478F6] selection:text-white">
          <Navbar />

          <div className="flex-1">
            <Suspense
              fallback={
                <div className="min-h-[60vh] flex items-center justify-center text-xs text-[#858A94]">
                  Loading Sikandar Mobile Store...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/iphone/:slug" element={<ProductDetailPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/login" element={<AdminDashboardPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>

          <Footer />
          <InquiryBagDrawer />
          <FavoritesDrawer />
          <FloatingActions />
        </div>
      </StoreProvider>
    </BrowserRouter>
  );
}
