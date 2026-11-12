import { isSupabaseConfigured, supabase } from "./supabaseClient";
import { storeData, IPHONE_16_PRO_MAX_IMAGES } from "../data/storeData";

const API_BASE = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "sikandar_admin_jwt";

export function getStoredAdminToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setStoredAdminToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore storage errors
  }
}

async function apiFetch(path, options = {}) {
  const token = getStoredAdminToken();
  const headers = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errMsg = `Request failed (${res.status})`;
    try {
      const payload = await res.json();
      if (payload?.error) errMsg = payload.error;
    } catch {
      // ignore json parse fail
    }
    throw new Error(errMsg);
  }
  return res.json();
}

// Convert snake_case Supabase row to frontend camelCase product
function mapSupabaseProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    series: row.series,
    generation: row.generation,
    formFactor: row.form_factor,
    ram: row.ram,
    badge: row.badge,
    image: row.image,
    galleryImages: row.gallery_images || [],
    colors: row.colors || [],
    variants: row.variants || [],
    specs: row.specs || {},
    conditionGrade: row.condition_grade,
    batteryHealth: row.battery_health,
    warranty: row.warranty,
    returnPolicy: row.return_policy,
    accessories: row.accessories,
    stockCount: row.stock_count,
    isSold: Boolean(row.is_sold),
    isFeatured: Boolean(row.is_featured),
    isLatest: Boolean(row.is_latest),
    isPopular: Boolean(row.is_popular),
    isBestDeal: Boolean(row.is_best_deal),
    discountPercent: row.discount_percent,
    displayPrice: row.display_price,
    cashifyPrice: row.cashify_price,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getFallbackProducts() {
  return storeData.products.map((p, idx) => {
    const v = p.variants?.[0] || { storePrice: 25500, cashifyPrice: 25000, originalMrp: 59900 };
    const discountPct =
      v.originalMrp > 0 ? Math.max(0, Math.round(((v.originalMrp - v.storePrice) / v.originalMrp) * 100)) : 0;
    return {
      ...p,
      slug: p.id,
      galleryImages: [
        p.image,
        IPHONE_16_PRO_MAX_IMAGES.finishLineup,
        IPHONE_16_PRO_MAX_IMAGES.cameraSystem,
        IPHONE_16_PRO_MAX_IMAGES.storeInspectionDesk,
      ].filter(Boolean),
      conditionGrade: "Good",
      returnPolicy: "7-Day Functional Verification Guarantee at Abids Showroom",
      accessories: p.specs?.box || "Charging Cable & Store Invoice",
      stockCount: 1,
      isSold: false,
      isFeatured: idx < 6,
      isLatest: (p.generation || 0) >= 16,
      isPopular: [2, 3, 5, 7, 12, 18].includes(idx),
      isBestDeal: discountPct >= 45,
      discountPercent: discountPct,
      displayPrice: v.storePrice,
      cashifyPrice: v.cashifyPrice,
    };
  });
}

// ======================================================
// PUBLIC & ADMIN DATA API
// ======================================================

export async function fetchProducts() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("generation", { ascending: false });
    if (error) throw error;
    return (data || []).map(mapSupabaseProduct);
  }
  try {
    return await apiFetch("/products");
  } catch {
    return getFallbackProducts();
  }
}

export async function fetchProductBySlug(slugOrId) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
      .maybeSingle();
    if (error) throw error;
    return data ? mapSupabaseProduct(data) : null;
  }
  try {
    return await apiFetch(`/products/${encodeURIComponent(slugOrId)}`);
  } catch {
    return getFallbackProducts().find((p) => p.slug === slugOrId || p.id === slugOrId) || null;
  }
}

export async function fetchReviews(includeUnpublished = false) {
  if (isSupabaseConfigured) {
    let query = supabase.from("customer_reviews").select("*").order("created_at", { ascending: false });
    if (!includeUnpublished) query = query.eq("is_published", true);
    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map((r) => ({
      id: r.id,
      name: r.name,
      date: r.date,
      rating: r.rating,
      avatar: r.avatar,
      badge: r.badge,
      devicePurchased: r.device_purchased,
      category: r.category,
      text: r.text,
      likes: r.likes,
      verifiedSource: r.verified_source,
      isPublished: r.is_published,
    }));
  }
  try {
    return await apiFetch(includeUnpublished ? "/admin/reviews" : "/reviews");
  } catch {
    return storeData.reviews.map((r) => ({ ...r, isPublished: true }));
  }
}

export async function fetchShopSettings() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from("shop_settings").select("*").eq("id", 1).maybeSingle();
    if (!error && data) {
      return {
        storeName: data.store_name,
        tagline: data.tagline,
        whatsapp: data.whatsapp,
        phone: data.phone,
        phoneRaw: data.phone_raw,
        email: data.email,
        address: data.address,
        landmark: data.landmark,
        mapsUrl: data.maps_url,
        instagramUrl: data.instagram_url,
        workingHours: data.hours_json || storeData.storeInfo.workingHours,
        warrantyPolicy: data.warranty_policy,
        returnPolicy: data.return_policy,
      };
    }
  }
  try {
    return await apiFetch("/settings");
  } catch {
    return {
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
    };
  }
}

export async function uploadImages(fileList) {
  const files = Array.from(fileList || []);
  if (files.length === 0) return [];

  if (isSupabaseConfigured) {
    const urls = [];
    for (const file of files) {
      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("store-media").upload(filePath, file);
      if (error) throw error;
      const { data: pub } = supabase.storage.from("store-media").getPublicUrl(filePath);
      if (pub?.publicUrl) urls.push(pub.publicUrl);
    }
    return urls;
  }

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const res = await apiFetch("/upload", { method: "POST", body: formData });
  return res.urls || [];
}

export async function submitExchangeEnquiry(payload) {
  if (isSupabaseConfigured) {
    const id = `ex-${Date.now()}`;
    const { error } = await supabase.from("exchange_enquiries").insert({
      id,
      customer_name: payload.customerName,
      customer_phone: payload.customerPhone,
      brand: payload.brand,
      model: payload.model,
      storage: payload.storage,
      physical_condition: payload.physicalCondition,
      battery_health: payload.batteryHealth,
      accessories: payload.accessories,
      photo_urls: payload.photoUrls || [],
      notes: payload.notes || "",
    });
    if (error) throw error;
    return { id, status: "pending" };
  }
  return apiFetch("/exchanges", { method: "POST", body: JSON.stringify(payload) });
}

export async function submitCustomerEnquiry(payload) {
  if (isSupabaseConfigured) {
    const id = `enq-${Date.now()}`;
    const { error } = await supabase.from("customer_enquiries").insert({
      id,
      customer_name: payload.customerName || "",
      customer_phone: payload.customerPhone || "WhatsApp Visitor",
      product_id: payload.productId || "",
      product_name: payload.productName || "",
      storage: payload.storage || "",
      colour: payload.colour || "",
      price: payload.price || "",
      message: payload.message || "",
      source: payload.source || "website",
    });
    if (error) throw error;
    return { id, status: "new" };
  }
  return apiFetch("/enquiries", { method: "POST", body: JSON.stringify(payload) });
}

// ======================================================
// ADMIN AUTHENTICATION & MANAGEMENT
// ======================================================

export async function adminLogin(email, password) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return { user: data.user, token: data.session?.access_token };
  }
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setStoredAdminToken(res.token);
  return res;
}

export async function adminLogout() {
  if (isSupabaseConfigured) {
    await supabase.auth.signOut();
  }
  setStoredAdminToken("");
}

export async function getAdminSession() {
  if (isSupabaseConfigured) {
    const { data } = await supabase.auth.getSession();
    return data?.session?.user || null;
  }
  const token = getStoredAdminToken();
  if (!token) return null;
  try {
    const res = await apiFetch("/auth/me");
    return res.user;
  } catch {
    setStoredAdminToken("");
    return null;
  }
}

export async function createProduct(product) {
  if (isSupabaseConfigured) {
    const id = product.id || `${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    const { data, error } = await supabase
      .from("products")
      .insert({
        id,
        slug: product.slug || id,
        name: product.name,
        series: product.series,
        generation: product.generation,
        form_factor: product.formFactor,
        ram: product.ram,
        badge: product.badge,
        image: product.image,
        gallery_images: product.galleryImages || [],
        colors: product.colors || [],
        variants: product.variants || [],
        specs: product.specs || {},
        condition_grade: product.conditionGrade,
        battery_health: product.batteryHealth,
        warranty: product.warranty,
        return_policy: product.returnPolicy,
        accessories: product.accessories,
        stock_count: product.stockCount,
        is_sold: product.isSold,
        is_featured: product.isFeatured,
        is_latest: product.isLatest,
        is_popular: product.isPopular,
        is_best_deal: product.isBestDeal,
        discount_percent: product.discountPercent,
        display_price: product.displayPrice,
        cashify_price: product.cashifyPrice,
      })
      .select()
      .single();
    if (error) throw error;
    return mapSupabaseProduct(data);
  }
  return apiFetch("/products", { method: "POST", body: JSON.stringify(product) });
}

export async function updateProduct(id, updates) {
  if (isSupabaseConfigured) {
    const dbUpdates = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.series !== undefined) dbUpdates.series = updates.series;
    if (updates.generation !== undefined) dbUpdates.generation = updates.generation;
    if (updates.formFactor !== undefined) dbUpdates.form_factor = updates.formFactor;
    if (updates.ram !== undefined) dbUpdates.ram = updates.ram;
    if (updates.badge !== undefined) dbUpdates.badge = updates.badge;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.galleryImages !== undefined) dbUpdates.gallery_images = updates.galleryImages;
    if (updates.colors !== undefined) dbUpdates.colors = updates.colors;
    if (updates.variants !== undefined) dbUpdates.variants = updates.variants;
    if (updates.specs !== undefined) dbUpdates.specs = updates.specs;
    if (updates.conditionGrade !== undefined) dbUpdates.condition_grade = updates.conditionGrade;
    if (updates.batteryHealth !== undefined) dbUpdates.battery_health = updates.batteryHealth;
    if (updates.warranty !== undefined) dbUpdates.warranty = updates.warranty;
    if (updates.returnPolicy !== undefined) dbUpdates.return_policy = updates.returnPolicy;
    if (updates.accessories !== undefined) dbUpdates.accessories = updates.accessories;
    if (updates.stockCount !== undefined) dbUpdates.stock_count = updates.stockCount;
    if (updates.isSold !== undefined) dbUpdates.is_sold = updates.isSold;
    if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;
    if (updates.isLatest !== undefined) dbUpdates.is_latest = updates.isLatest;
    if (updates.isPopular !== undefined) dbUpdates.is_popular = updates.isPopular;
    if (updates.isBestDeal !== undefined) dbUpdates.is_best_deal = updates.isBestDeal;
    if (updates.discountPercent !== undefined) dbUpdates.discount_percent = updates.discountPercent;
    if (updates.displayPrice !== undefined) dbUpdates.display_price = updates.displayPrice;
    if (updates.cashifyPrice !== undefined) dbUpdates.cashify_price = updates.cashifyPrice;

    const { data, error } = await supabase.from("products").update(dbUpdates).eq("id", id).select().single();
    if (error) throw error;
    return mapSupabaseProduct(data);
  }
  return apiFetch(`/products/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(updates) });
}

export async function deleteProduct(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return { deleted: true };
  }
  return apiFetch(`/products/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function fetchExchangeEnquiries() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("exchange_enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => ({
      id: r.id,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      brand: r.brand,
      model: r.model,
      storage: r.storage,
      physicalCondition: r.physical_condition,
      batteryHealth: r.battery_health,
      accessories: r.accessories,
      photoUrls: r.photo_urls || [],
      notes: r.notes,
      status: r.status,
      adminNotes: r.admin_notes,
      createdAt: r.created_at,
    }));
  }
  return apiFetch("/exchanges");
}

export async function updateExchangeEnquiry(id, payload) {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from("exchange_enquiries")
      .update({ status: payload.status, admin_notes: payload.adminNotes })
      .eq("id", id);
    if (error) throw error;
    return { updated: true };
  }
  return apiFetch(`/exchanges/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function fetchCustomerEnquiries() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("customer_enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map((r) => ({
      id: r.id,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      productId: r.product_id,
      productName: r.product_name,
      storage: r.storage,
      colour: r.colour,
      price: r.price,
      message: r.message,
      source: r.source,
      status: r.status,
      createdAt: r.created_at,
    }));
  }
  return apiFetch("/enquiries");
}

export async function updateCustomerEnquiry(id, payload) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from("customer_enquiries").update({ status: payload.status }).eq("id", id);
    if (error) throw error;
    return { updated: true };
  }
  return apiFetch(`/enquiries/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function createReview(review) {
  if (isSupabaseConfigured) {
    const id = `rev-${Date.now()}`;
    const { data, error } = await supabase
      .from("customer_reviews")
      .insert({
        id,
        name: review.name,
        date: review.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        rating: review.rating || 5,
        avatar: review.avatar || "",
        badge: review.badge || "Verified Buyer",
        device_purchased: review.devicePurchased || "",
        category: review.category || "iPhone Purchase",
        text: review.text,
        verified_source: review.verifiedSource || "Store Verified Buyer",
        is_published: review.isPublished ?? true,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
  return apiFetch("/reviews", { method: "POST", body: JSON.stringify(review) });
}

export async function updateReview(id, payload) {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from("customer_reviews")
      .update({
        ...(payload.isPublished !== undefined ? { is_published: payload.isPublished } : {}),
        ...(payload.rating !== undefined ? { rating: payload.rating } : {}),
        ...(payload.text !== undefined ? { text: payload.text } : {}),
      })
      .eq("id", id);
    if (error) throw error;
    return { updated: true };
  }
  return apiFetch(`/reviews/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteReview(id) {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from("customer_reviews").delete().eq("id", id);
    if (error) throw error;
    return { deleted: true };
  }
  return apiFetch(`/reviews/${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function updateShopSettings(settings) {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from("shop_settings")
      .update({
        store_name: settings.storeName,
        tagline: settings.tagline,
        whatsapp: settings.whatsapp,
        phone: settings.phone,
        phone_raw: settings.phoneRaw,
        email: settings.email,
        address: settings.address,
        landmark: settings.landmark,
        maps_url: settings.mapsUrl,
        instagram_url: settings.instagramUrl,
        hours_json: settings.workingHours,
        warranty_policy: settings.warrantyPolicy,
        return_policy: settings.returnPolicy,
      })
      .eq("id", 1);
    if (error) throw error;
    return { updated: true };
  }
  return apiFetch("/settings", { method: "PUT", body: JSON.stringify(settings) });
}

export function buildWhatsAppEnquiryUrl(whatsappNumber, { name, storage, colour, price, customMessage } = {}) {
  const digits = String(whatsappNumber || "919700317171").replace(/\D/g, "");
  const message =
    customMessage ||
    (name
      ? `Hello Sikandar Mobile Store! I am interested in ${name}, ${storage || "Available Storage"}, ${colour || "Available Colour"}, priced at ${price || "Listed Price"}. Is this device available?`
      : "Hello Sikandar Mobile Store! I would like to enquire about certified pre-owned iPhones.");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
