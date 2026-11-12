import React, { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  UploadCloud,
  CheckCircle2,
  Package,
  Repeat,
  MessageSquare,
  Star,
  Settings,
  Save,
  X,
  RefreshCw,
} from "lucide-react";
import {
  adminLogin,
  adminLogout,
  getAdminSession,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImages,
  fetchExchangeEnquiries,
  updateExchangeEnquiry,
  fetchCustomerEnquiries,
  updateCustomerEnquiry,
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
  updateShopSettings,
} from "../lib/api";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { useStore } from "../context/StoreContext";
import { formatINR } from "../data/storeData";

const EMPTY_PRODUCT = {
  name: "",
  series: "iPhone 16 Series",
  generation: 16,
  formFactor: "Pro Max",
  ram: "8GB RAM",
  badge: "Certified Pre-Owned",
  image: "",
  galleryImages: [],
  conditionGrade: "Superb",
  batteryHealth: "94% Health",
  warranty: "6 Months Store Warranty + Bill",
  returnPolicy: "7-Day Functional Verification Guarantee",
  accessories: "Original Box & Charging Cable",
  stockCount: 1,
  discountPercent: 0,
  isSold: false,
  isFeatured: false,
  isLatest: true,
  isPopular: false,
  isBestDeal: false,
  colorsText: "Desert Titanium:#c4a387, Black Titanium:#27282b",
  variantsText: "256GB:94500:144900, 512GB:109500:164900",
};

export default function AdminDashboardPage() {
  const { products, shopSettings, refreshStoreData } = useStore();

  const [sessionUser, setSessionUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [email, setEmail] = useState("admin@sikandarmobilestore.in");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState("products");
  const [statusBanner, setStatusBanner] = useState("");

  // Product editor state
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);
  const [showProductForm, setShowProductForm] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  // Admin lists
  const [exchanges, setExchanges] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [adminReviews, setAdminReviews] = useState([]);

  // Review creation state
  const [revForm, setRevForm] = useState({
    name: "",
    rating: 5,
    devicePurchased: "",
    text: "",
    verifiedSource: "Google Maps Verified",
  });

  // Editable shop settings state
  const [settingsForm, setSettingsForm] = useState(shopSettings);

  useEffect(() => {
    setSettingsForm(shopSettings);
  }, [shopSettings]);

  const loadAdminQueues = async () => {
    try {
      const [ex, enq, rev] = await Promise.all([
        fetchExchangeEnquiries().catch(() => []),
        fetchCustomerEnquiries().catch(() => []),
        fetchReviews(true).catch(() => []),
      ]);
      setExchanges(ex);
      setEnquiries(enq);
      setAdminReviews(rev);
    } catch {
      // handled per endpoint
    }
  };

  useEffect(() => {
    getAdminSession()
      .then((user) => {
        setSessionUser(user);
        if (user) loadAdminQueues();
      })
      .finally(() => setAuthChecking(false));
  }, []);

  const flashBanner = (msg) => {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(""), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoggingIn(true);
    try {
      const res = await adminLogin(email, password);
      setSessionUser(res.user);
      await loadAdminQueues();
    } catch (err) {
      setAuthError(err.message || "Authentication failed.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setSessionUser(null);
  };

  const openCreateForm = () => {
    setEditingId(null);
    setProductForm(EMPTY_PRODUCT);
    setShowProductForm(true);
  };

  const openEditForm = (p) => {
    setEditingId(p.id);
    setProductForm({
      name: p.name,
      series: p.series,
      generation: p.generation || 16,
      formFactor: p.formFactor || "Pro",
      ram: p.ram || "8GB RAM",
      badge: p.badge || "Certified",
      image: p.image || "",
      galleryImages: p.galleryImages || [],
      conditionGrade: p.conditionGrade || "Superb",
      batteryHealth: p.batteryHealth || "92% Health",
      warranty: p.warranty || "6 Months Store Warranty + Bill",
      returnPolicy: p.returnPolicy || "7-Day Functional Verification Guarantee",
      accessories: p.accessories || "Charging Cable & Bill",
      stockCount: p.stockCount ?? 1,
      discountPercent: p.discountPercent ?? 0,
      isSold: Boolean(p.isSold),
      isFeatured: Boolean(p.isFeatured),
      isLatest: Boolean(p.isLatest),
      isPopular: Boolean(p.isPopular),
      isBestDeal: Boolean(p.isBestDeal),
      colorsText: (p.colors || []).map((c) => `${c.name}:${c.hex}`).join(", "),
      variantsText: (p.variants || [])
        .map((v) => `${v.storage}:${v.storePrice}:${v.originalMrp || v.storePrice}`)
        .join(", "),
    });
    setShowProductForm(true);
  };

  const handleProductImagesUpload = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    setUploadingMedia(true);
    try {
      const urls = await uploadImages(fileList);
      if (urls.length > 0) {
        setProductForm((prev) => ({
          ...prev,
          image: prev.image || urls[0],
          galleryImages: [...new Set([...(prev.galleryImages || []), ...urls])],
        }));
        flashBanner(`Uploaded ${urls.length} image(s) successfully.`);
      }
    } catch (err) {
      flashBanner(`Upload error: ${err.message}`);
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const colors = productForm.colorsText
      .split(",")
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((entry) => {
        const [name, hex] = entry.split(":");
        return { name: (name || "Titanium").trim(), hex: (hex || "#858A94").trim() };
      });

    const variants = productForm.variantsText
      .split(",")
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((entry) => {
        const [storage, storePriceRaw, mrpRaw] = entry.split(":");
        const storePrice = Number(storePriceRaw) || 25500;
        const cashifyPrice = Math.max(0, storePrice - 500);
        const originalMrp = Number(mrpRaw) || storePrice;
        return {
          storage: (storage || "128GB").trim(),
          storePrice,
          cashifyPrice,
          originalMrp,
          storePriceFormatted: formatINR(storePrice),
          cashifyPriceFormatted: formatINR(cashifyPrice),
          originalPriceFormatted: formatINR(originalMrp),
          savingsFormatted: `SAVE ${formatINR(Math.max(0, originalMrp - storePrice))}`,
        };
      });

    const payload = {
      name: productForm.name,
      series: productForm.series,
      generation: Number(productForm.generation),
      formFactor: productForm.formFactor,
      ram: productForm.ram,
      badge: productForm.badge,
      image: productForm.image || productForm.galleryImages?.[0] || "",
      galleryImages: productForm.galleryImages,
      conditionGrade: productForm.conditionGrade,
      batteryHealth: productForm.batteryHealth,
      warranty: productForm.warranty,
      returnPolicy: productForm.returnPolicy,
      accessories: productForm.accessories,
      stockCount: Number(productForm.stockCount),
      discountPercent: Number(productForm.discountPercent),
      isSold: Boolean(productForm.isSold),
      isFeatured: Boolean(productForm.isFeatured),
      isLatest: Boolean(productForm.isLatest),
      isPopular: Boolean(productForm.isPopular),
      isBestDeal: Boolean(productForm.isBestDeal),
      colors,
      variants,
      displayPrice: variants[0]?.storePrice || 0,
      cashifyPrice: variants[0]?.cashifyPrice || 0,
      specs: {
        chip: `${productForm.ram} • Certified Apple Silicon`,
        display: "Super Retina XDR OLED",
        camera: "Verified Apple Camera System",
        box: productForm.accessories,
      },
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
        flashBanner(`Updated ${payload.name} cleanly.`);
      } else {
        await createProduct(payload);
        flashBanner(`Added ${payload.name} to live store inventory.`);
      }
      setShowProductForm(false);
      await refreshStoreData();
    } catch (err) {
      flashBanner(`Save failed: ${err.message}`);
    }
  };

  const handleToggleSold = async (p) => {
    try {
      await updateProduct(p.id, {
        isSold: !p.isSold,
        stockCount: !p.isSold ? 0 : Math.max(1, p.stockCount || 1),
      });
      await refreshStoreData();
      flashBanner(`${p.name} marked ${!p.isSold ? "Sold Out" : "Available"}.`);
    } catch (err) {
      flashBanner(`Error: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (p) => {
    if (!window.confirm(`Delete ${p.name} permanently from inventory?`)) return;
    try {
      await deleteProduct(p.id);
      await refreshStoreData();
      flashBanner(`Removed ${p.name}.`);
    } catch (err) {
      flashBanner(`Error: ${err.message}`);
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({ ...revForm, isPublished: true });
      setRevForm({ name: "", rating: 5, devicePurchased: "", text: "", verifiedSource: "Google Maps Verified" });
      await loadAdminQueues();
      await refreshStoreData();
      flashBanner("Customer review published.");
    } catch (err) {
      flashBanner(`Error: ${err.message}`);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await updateShopSettings(settingsForm);
      await refreshStoreData();
      flashBanner("Shop settings & WhatsApp number updated globally.");
    } catch (err) {
      flashBanner(`Settings error: ${err.message}`);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-[65vh] flex items-center justify-center text-sm text-[#858A94]">
        Verifying administrator session...
      </div>
    );
  }

  // LOGIN SCREEN
  if (!sessionUser) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="surface-charcoal w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#3478F6]/15 border border-[#3478F6]/40 flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#3478F6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-white">Sikandar Store Admin</h1>
            <p className="text-xs text-[#858A94]">
              {isSupabaseConfigured ? "Supabase Cloud Auth Active" : "Local SQLite + JWT Secure Session"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#C5C7CC] mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white focus:border-[#3478F6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#C5C7CC] mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Enter administrator password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white focus:border-[#3478F6] focus:outline-none"
              />
            </div>

            {!isSupabaseConfigured && (
              <div className="p-3 rounded-xl bg-[#08090C] border border-[#C5C7CC]/10 text-[11px] text-[#858A94] space-y-0.5">
                <div>Default local API dev login:</div>
                <div className="text-[#C5C7CC] font-mono">admin@sikandarmobilestore.in / SikandarAdmin@2026</div>
              </div>
            )}

            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/30 text-xs text-rose-300">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full btn-electric py-3.5 text-sm disabled:opacity-60"
            >
              {loggingIn ? "Signing In..." : "Sign In to Admin Dashboard"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="surface-charcoal p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="pill-electric mb-1.5">Authenticated Admin Console</span>
          <h1 className="text-2xl font-extrabold text-white">Store &amp; Inventory Management</h1>
          <p className="text-xs text-[#858A94] mt-0.5">Signed in as {sessionUser.email}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              refreshStoreData();
              loadAdminQueues();
            }}
            className="btn-titanium px-3.5 py-2 text-xs gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#3478F6]" />
            <span>Sync</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="btn-titanium px-3.5 py-2 text-xs gap-1.5 text-rose-300 border-rose-400/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {statusBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusBanner}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "products", label: `Inventory (${products.length})`, icon: Package },
          { id: "exchanges", label: `Exchanges (${exchanges.length})`, icon: Repeat },
          { id: "enquiries", label: `Customer Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: "reviews", label: `Reviews (${adminReviews.length})`, icon: Star },
          { id: "settings", label: "Shop Settings & WhatsApp", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                active
                  ? "bg-[#3478F6] border-[#3478F6] text-white"
                  : "bg-[#111318] border-[#C5C7CC]/15 text-[#C5C7CC] hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PRODUCTS INVENTORY */}
      {activeTab === "products" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white">Live Inventory Catalogue</h2>
            <button type="button" onClick={openCreateForm} className="btn-electric px-4 py-2.5 text-xs gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Add New iPhone</span>
            </button>
          </div>

          {showProductForm && (
            <form onSubmit={handleSaveProduct} className="surface-charcoal p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#C5C7CC]/10 pb-3">
                <h3 className="text-base font-bold text-white">
                  {editingId ? "Edit Product" : "Add Product to Database"}
                </h3>
                <button type="button" onClick={() => setShowProductForm(false)} className="text-[#858A94] hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[#C5C7CC] mb-1">Model Name *</label>
                  <input
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="Apple iPhone 16 Pro Max"
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C5C7CC] mb-1">Series</label>
                  <input
                    value={productForm.series}
                    onChange={(e) => setProductForm({ ...productForm, series: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C5C7CC] mb-1">Generation (Number)</label>
                  <input
                    type="number"
                    value={productForm.generation}
                    onChange={(e) => setProductForm({ ...productForm, generation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C5C7CC] mb-1">Condition Grade</label>
                  <select
                    value={productForm.conditionGrade}
                    onChange={(e) => setProductForm({ ...productForm, conditionGrade: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
                  >
                    <option value="Superb">Superb</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#C5C7CC] mb-1">Battery Health</label>
                  <input
                    value={productForm.batteryHealth}
                    onChange={(e) => setProductForm({ ...productForm, batteryHealth: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C5C7CC] mb-1">Stock Count / Discount %</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="0"
                      value={productForm.stockCount}
                      onChange={(e) => setProductForm({ ...productForm, stockCount: e.target.value })}
                      placeholder="Stock"
                      className="px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
                    />
                    <input
                      type="number"
                      min="0"
                      max="90"
                      value={productForm.discountPercent}
                      onChange={(e) => setProductForm({ ...productForm, discountPercent: e.target.value })}
                      placeholder="Disc %"
                      className="px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#C5C7CC] mb-1">
                    Storage Variants (`Storage:StorePrice:MRP` comma separated)
                  </label>
                  <input
                    value={productForm.variantsText}
                    onChange={(e) => setProductForm({ ...productForm, variantsText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#C5C7CC] mb-1">
                    Colours (`Name:#hex` comma separated)
                  </label>
                  <input
                    value={productForm.colorsText}
                    onChange={(e) => setProductForm({ ...productForm, colorsText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white font-mono"
                  />
                </div>
              </div>

              {/* Image URL & Multi-Image File Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#C5C7CC] mb-1">Main Image URL</label>
                  <input
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="https://... or /uploads/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#C5C7CC] mb-1">Upload Multiple Device Images</label>
                  <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#08090C] border border-dashed border-[#3478F6]/50 text-[#93C5FD] cursor-pointer">
                    <UploadCloud className="w-4 h-4" />
                    <span>{uploadingMedia ? "Uploading..." : "Select Images to Upload"}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleProductImagesUpload(e.target.files)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Flags */}
              <div className="flex flex-wrap gap-4 text-xs text-[#C5C7CC] pt-1">
                {[
                  ["isSold", "Mark as Sold Out"],
                  ["isFeatured", "Featured Collection"],
                  ["isLatest", "Latest Arrival"],
                  ["isPopular", "Popular Model"],
                  ["isBestDeal", "Best Deal"],
                ].map(([key, label]) => (
                  <label key={key} className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(productForm[key])}
                      onChange={(e) => setProductForm({ ...productForm, [key]: e.target.checked })}
                      className="accent-[#3478F6]"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowProductForm(false)} className="btn-titanium px-4 py-2 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-electric px-5 py-2 text-xs gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingId ? "Update Product" : "Save New Product"}</span>
                </button>
              </div>
            </form>
          )}

          {/* Inventory Table */}
          <div className="surface-charcoal overflow-x-auto">
            <table className="w-full min-w-[740px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#C5C7CC]/15 text-[#858A94] uppercase">
                  <th className="p-4">Model</th>
                  <th className="p-4">Base Price</th>
                  <th className="p-4">Battery / Cond</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-[#C5C7CC]/10 hover:bg-white/[0.02]">
                    <td className="p-4 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-10 h-12 object-contain rounded bg-[#08090C] p-1" />
                      <div>
                        <div className="font-bold text-white">{p.name}</div>
                        <div className="text-[#858A94]">{p.series} • {p.ram}</div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-white tabular-nums">
                      {formatINR(p.variants?.[0]?.storePrice || p.displayPrice || 0)}
                    </td>
                    <td className="p-4 text-[#C5C7CC]">
                      <div>{p.batteryHealth}</div>
                      <div className="text-[#858A94]">{p.conditionGrade}</div>
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => handleToggleSold(p)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer ${
                          p.isSold || (p.stockCount ?? 1) <= 0
                            ? "bg-rose-500/15 border-rose-400/30 text-rose-300"
                            : "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
                        }`}
                      >
                        {p.isSold ? "Sold Out" : `In Stock (${p.stockCount ?? 1})`}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditForm(p)}
                        className="btn-titanium px-2.5 py-1.5 text-[11px] gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(p)}
                        className="btn-titanium px-2.5 py-1.5 text-[11px] text-rose-400 border-rose-400/25 gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: EXCHANGE ENQUIRIES */}
      {activeTab === "exchanges" && (
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-white">Customer Phone Exchange Requests</h2>
          {exchanges.length === 0 ? (
            <div className="surface-charcoal p-8 text-center text-xs text-[#858A94]">
              No exchange enquiries submitted yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exchanges.map((ex) => (
                <div key={ex.id} className="surface-charcoal p-5 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {ex.brand} {ex.model} ({ex.storage})
                      </h3>
                      <p className="text-[#858A94]">
                        {ex.customerName} • <span className="font-mono text-white">{ex.customerPhone}</span>
                      </p>
                    </div>
                    <select
                      value={ex.status}
                      onChange={async (e) => {
                        await updateExchangeEnquiry(ex.id, { status: e.target.value });
                        loadAdminQueues();
                        flashBanner("Exchange status updated.");
                      }}
                      className="px-2.5 py-1 rounded-lg bg-[#08090C] border border-[#C5C7CC]/20 text-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="quoted">Quoted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="text-[#C5C7CC]">
                    Condition: {ex.physicalCondition} {ex.batteryHealth ? `• Battery: ${ex.batteryHealth}` : ""}
                  </div>
                  {ex.photoUrls?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {ex.photoUrls.map((url, idx) => (
                        <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
                          <img src={url} alt="Exchange device" className="w-16 h-16 object-cover rounded-lg border border-[#C5C7CC]/20" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CUSTOMER ENQUIRIES */}
      {activeTab === "enquiries" && (
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-white">Product &amp; Contact Enquiries</h2>
          {enquiries.length === 0 ? (
            <div className="surface-charcoal p-8 text-center text-xs text-[#858A94]">
              No enquiries logged yet.
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div key={enq.id} className="surface-charcoal p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-white">
                      {enq.productName || "General Enquiry"} {enq.storage ? `(${enq.storage} • ${enq.colour})` : ""}
                    </div>
                    <div className="text-[#C5C7CC]">
                      {enq.customerName || "Visitor"} • <span className="font-mono">{enq.customerPhone}</span>
                    </div>
                    <p className="text-[#858A94] mt-1">{enq.message}</p>
                  </div>
                  <select
                    value={enq.status}
                    onChange={async (e) => {
                      await updateCustomerEnquiry(enq.id, { status: e.target.value });
                      loadAdminQueues();
                      flashBanner("Enquiry status updated.");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#08090C] border border-[#C5C7CC]/20 text-white self-start sm:self-center"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: REVIEWS MANAGER */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <form onSubmit={handleCreateReview} className="surface-charcoal p-5 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white">Add Verified Customer Review</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                required
                placeholder="Buyer Name"
                value={revForm.name}
                onChange={(e) => setRevForm({ ...revForm, name: e.target.value })}
                className="px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
              />
              <input
                placeholder="Purchased Device (e.g. iPhone 15 Pro)"
                value={revForm.devicePurchased}
                onChange={(e) => setRevForm({ ...revForm, devicePurchased: e.target.value })}
                className="px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
              />
              <select
                value={revForm.rating}
                onChange={(e) => setRevForm({ ...revForm, rating: Number(e.target.value) })}
                className="px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
              </select>
            </div>
            <textarea
              required
              rows={2}
              placeholder="Genuine review text..."
              value={revForm.text}
              onChange={(e) => setRevForm({ ...revForm, text: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
            />
            <button type="submit" className="btn-electric px-4 py-2 text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Publish Review
            </button>
          </form>

          <div className="space-y-3">
            {adminReviews.map((r) => (
              <div key={r.id} className="surface-charcoal p-4 flex items-start justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-white">{r.name} • {r.rating}★ ({r.devicePurchased})</div>
                  <p className="text-[#C5C7CC] mt-1">{r.text}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={async () => {
                      await updateReview(r.id, { isPublished: !r.isPublished });
                      await loadAdminQueues();
                      await refreshStoreData();
                    }}
                    className="btn-titanium px-2.5 py-1.5 text-[11px]"
                  >
                    {r.isPublished ? "Hide" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteReview(r.id);
                      await loadAdminQueues();
                      await refreshStoreData();
                    }}
                    className="btn-titanium px-2.5 py-1.5 text-[11px] text-rose-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SHOP SETTINGS */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="surface-charcoal p-6 space-y-4 text-xs">
          <h2 className="text-lg font-extrabold text-white">Shop Details, Location &amp; WhatsApp Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#C5C7CC] mb-1">Store Name</label>
              <input
                value={settingsForm.storeName || ""}
                onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
              />
            </div>
            <div>
              <label className="block text-[#C5C7CC] mb-1">Tagline</label>
              <input
                value={settingsForm.tagline || ""}
                onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
              />
            </div>
            <div>
              <label className="block text-[#C5C7CC] mb-1">Editable WhatsApp Number (Country code + digits, e.g. 919700317171)</label>
              <input
                value={settingsForm.whatsapp || ""}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[#C5C7CC] mb-1">Display Phone Number</label>
              <input
                value={settingsForm.phone || ""}
                onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value, phoneRaw: e.target.value.replace(/\s+/g, "") })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white font-mono"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#C5C7CC] mb-1">Business Address</label>
              <input
                value={settingsForm.address || ""}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[#C5C7CC] mb-1">Warranty Policy</label>
              <input
                value={settingsForm.warrantyPolicy || ""}
                onChange={(e) => setSettingsForm({ ...settingsForm, warrantyPolicy: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-white"
              />
            </div>
          </div>

          <button type="submit" className="btn-electric px-6 py-3 text-xs gap-2">
            <Save className="w-4 h-4" />
            <span>Save Live Shop Settings</span>
          </button>
        </form>
      )}
    </main>
  );
}
