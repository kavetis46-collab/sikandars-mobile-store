import express from "express";
import cors from "cors";
import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db, initDatabase, mapProductRow, safeJson, uploadsDir } from "./db.js";

initDatabase();

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "sikandar-mobile-store-dev-secret-change-in-prod";

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || ".jpg").toLowerCase() || ".jpg";
    cb(null, `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|webp|avif|gif)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, WebP, AVIF, or GIF images are allowed."));
    }
  },
});

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Admin token required." });
  }
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired admin session." });
  }
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mode: "sqlite-express" });
});

// ========================
// AUTHENTICATION
// ========================
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const user = db.prepare("SELECT * FROM admin_users WHERE LOWER(email) = LOWER(?)").get(email.trim());
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

app.get("/api/auth/me", requireAdmin, (req, res) => {
  res.json({ user: req.admin });
});

// ========================
// MEDIA UPLOADS
// ========================
app.post("/api/upload", upload.array("files", 8), (req, res) => {
  const urls = (req.files || []).map((f) => `/uploads/${f.filename}`);
  res.status(201).json({ urls });
});

// ========================
// PRODUCTS CRUD
// ========================
app.get("/api/products", (_req, res) => {
  const rows = db.prepare("SELECT * FROM products ORDER BY generation DESC, is_featured DESC, name ASC").all();
  res.json(rows.map(mapProductRow));
});

app.get("/api/products/:slugOrId", (req, res) => {
  const { slugOrId } = req.params;
  const row = db
    .prepare("SELECT * FROM products WHERE slug = ? OR id = ?")
    .get(slugOrId, slugOrId);
  if (!row) return res.status(404).json({ error: "Product not found." });
  res.json(mapProductRow(row));
});

app.post("/api/products", requireAdmin, (req, res) => {
  const body = req.body || {};
  if (!body.name) return res.status(400).json({ error: "Product name is required." });

  const id =
    body.id ||
    `${body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${crypto.randomBytes(2).toString("hex")}`;
  const slug = body.slug || id;
  const variants = Array.isArray(body.variants) ? body.variants : [];
  const firstVariant = variants[0] || {};
  const displayPrice = Number(body.displayPrice || firstVariant.storePrice || 0);
  const cashifyPrice = Number(body.cashifyPrice || firstVariant.cashifyPrice || Math.max(0, displayPrice - 500));

  db.prepare(`
    INSERT INTO products (
      id, slug, name, series, generation, form_factor, ram, badge, image,
      gallery_images, colors, variants, specs, condition_grade, battery_health,
      warranty, return_policy, accessories, stock_count, is_sold,
      is_featured, is_latest, is_popular, is_best_deal, discount_percent,
      display_price, cashify_price
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    slug,
    body.name,
    body.series || `iPhone ${body.generation || 16} Series`,
    Number(body.generation || 16),
    body.formFactor || "Pro",
    body.ram || "8GB RAM",
    body.badge || "Verified Inventory",
    body.image || "",
    JSON.stringify(body.galleryImages || (body.image ? [body.image] : [])),
    JSON.stringify(body.colors || []),
    JSON.stringify(variants),
    JSON.stringify(body.specs || {}),
    body.conditionGrade || "Superb",
    body.batteryHealth || "92% Health",
    body.warranty || "6 Months Store Warranty + Bill",
    body.returnPolicy || "7-Day Functional Verification Guarantee",
    body.accessories || "Charging Cable & Store Invoice",
    Number(body.stockCount ?? 1),
    body.isSold ? 1 : 0,
    body.isFeatured ? 1 : 0,
    body.isLatest ? 1 : 0,
    body.isPopular ? 1 : 0,
    body.isBestDeal ? 1 : 0,
    Number(body.discountPercent ?? 0),
    displayPrice,
    cashifyPrice
  );

  const created = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  res.status(201).json(mapProductRow(created));
});

app.put("/api/products/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!existing) return res.status(404).json({ error: "Product not found." });

  const body = req.body || {};
  const current = mapProductRow(existing);
  const variants = body.variants !== undefined ? body.variants : current.variants;
  const firstVariant = variants?.[0] || {};
  const displayPrice = Number(body.displayPrice ?? firstVariant.storePrice ?? current.displayPrice);
  const cashifyPrice = Number(body.cashifyPrice ?? firstVariant.cashifyPrice ?? current.cashifyPrice);

  db.prepare(`
    UPDATE products SET
      slug = ?, name = ?, series = ?, generation = ?, form_factor = ?, ram = ?,
      badge = ?, image = ?, gallery_images = ?, colors = ?, variants = ?, specs = ?,
      condition_grade = ?, battery_health = ?, warranty = ?, return_policy = ?,
      accessories = ?, stock_count = ?, is_sold = ?, is_featured = ?, is_latest = ?,
      is_popular = ?, is_best_deal = ?, discount_percent = ?, display_price = ?,
      cashify_price = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(
    body.slug ?? current.slug,
    body.name ?? current.name,
    body.series ?? current.series,
    Number(body.generation ?? current.generation),
    body.formFactor ?? current.formFactor,
    body.ram ?? current.ram,
    body.badge ?? current.badge,
    body.image ?? current.image,
    JSON.stringify(body.galleryImages ?? current.galleryImages),
    JSON.stringify(body.colors ?? current.colors),
    JSON.stringify(variants),
    JSON.stringify(body.specs ?? current.specs),
    body.conditionGrade ?? current.conditionGrade,
    body.batteryHealth ?? current.batteryHealth,
    body.warranty ?? current.warranty,
    body.returnPolicy ?? current.returnPolicy,
    body.accessories ?? current.accessories,
    Number(body.stockCount ?? current.stockCount),
    (body.isSold ?? current.isSold) ? 1 : 0,
    (body.isFeatured ?? current.isFeatured) ? 1 : 0,
    (body.isLatest ?? current.isLatest) ? 1 : 0,
    (body.isPopular ?? current.isPopular) ? 1 : 0,
    (body.isBestDeal ?? current.isBestDeal) ? 1 : 0,
    Number(body.discountPercent ?? current.discountPercent),
    displayPrice,
    cashifyPrice,
    id
  );

  const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  res.json(mapProductRow(updated));
});

app.delete("/api/products/:id", requireAdmin, (req, res) => {
  const result = db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Product not found." });
  res.json({ deleted: true, id: req.params.id });
});

// ========================
// EXCHANGE ENQUIRIES
// ========================
app.get("/api/exchanges", requireAdmin, (_req, res) => {
  const rows = db.prepare("SELECT * FROM exchange_enquiries ORDER BY created_at DESC").all();
  res.json(
    rows.map((r) => ({
      id: r.id,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      brand: r.brand,
      model: r.model,
      storage: r.storage,
      physicalCondition: r.physical_condition,
      batteryHealth: r.battery_health,
      accessories: r.accessories,
      photoUrls: safeJson(r.photo_urls, []),
      notes: r.notes,
      status: r.status,
      adminNotes: r.admin_notes,
      createdAt: r.created_at,
    }))
  );
});

app.post("/api/exchanges", (req, res) => {
  const b = req.body || {};
  if (!b.customerName || !b.customerPhone || !b.brand || !b.model || !b.storage || !b.physicalCondition) {
    return res.status(400).json({ error: "Please complete all required phone & contact details." });
  }
  const id = `ex-${Date.now()}-${crypto.randomBytes(2).toString("hex")}`;
  db.prepare(`
    INSERT INTO exchange_enquiries (
      id, customer_name, customer_phone, brand, model, storage,
      physical_condition, battery_health, accessories, photo_urls, notes, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `).run(
    id,
    b.customerName.trim(),
    b.customerPhone.trim(),
    b.brand.trim(),
    b.model.trim(),
    b.storage.trim(),
    b.physicalCondition.trim(),
    (b.batteryHealth || "").trim(),
    (b.accessories || "").trim(),
    JSON.stringify(Array.isArray(b.photoUrls) ? b.photoUrls : []),
    (b.notes || "").trim()
  );
  res.status(201).json({ id, status: "pending" });
});

app.patch("/api/exchanges/:id", requireAdmin, (req, res) => {
  const { status, adminNotes } = req.body || {};
  db.prepare("UPDATE exchange_enquiries SET status = COALESCE(?, status), admin_notes = COALESCE(?, admin_notes) WHERE id = ?")
    .run(status ?? null, adminNotes ?? null, req.params.id);
  res.json({ updated: true });
});

// ========================
// CUSTOMER ENQUIRIES
// ========================
app.get("/api/enquiries", requireAdmin, (_req, res) => {
  const rows = db.prepare("SELECT * FROM customer_enquiries ORDER BY created_at DESC").all();
  res.json(
    rows.map((r) => ({
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
    }))
  );
});

app.post("/api/enquiries", (req, res) => {
  const b = req.body || {};
  if (!b.customerPhone && !b.message) {
    return res.status(400).json({ error: "Contact phone or message is required." });
  }
  const id = `enq-${Date.now()}-${crypto.randomBytes(2).toString("hex")}`;
  db.prepare(`
    INSERT INTO customer_enquiries (
      id, customer_name, customer_phone, product_id, product_name,
      storage, colour, price, message, source, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
  `).run(
    id,
    b.customerName || "",
    b.customerPhone || "WhatsApp Visitor",
    b.productId || "",
    b.productName || "",
    b.storage || "",
    b.colour || "",
    b.price || "",
    b.message || "",
    b.source || "website"
  );
  res.status(201).json({ id, status: "new" });
});

app.patch("/api/enquiries/:id", requireAdmin, (req, res) => {
  const { status } = req.body || {};
  db.prepare("UPDATE customer_enquiries SET status = COALESCE(?, status) WHERE id = ?")
    .run(status ?? null, req.params.id);
  res.json({ updated: true });
});

// ========================
// CUSTOMER REVIEWS
// ========================
app.get("/api/reviews", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM customer_reviews WHERE is_published = 1 ORDER BY created_at DESC")
    .all();
  res.json(rows.map(mapReviewRow));
});

app.get("/api/admin/reviews", requireAdmin, (_req, res) => {
  const rows = db.prepare("SELECT * FROM customer_reviews ORDER BY created_at DESC").all();
  res.json(rows.map(mapReviewRow));
});

app.post("/api/reviews", requireAdmin, (req, res) => {
  const b = req.body || {};
  if (!b.name || !b.text) return res.status(400).json({ error: "Reviewer name and text required." });
  const id = `rev-${Date.now()}-${crypto.randomBytes(2).toString("hex")}`;
  db.prepare(`
    INSERT INTO customer_reviews (
      id, name, date, rating, avatar, badge, device_purchased,
      category, text, likes, verified_source, is_published
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    b.name.trim(),
    b.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    Math.min(5, Math.max(1, Number(b.rating || 5))),
    b.avatar || "",
    b.badge || "Verified Buyer",
    b.devicePurchased || "Pre-Owned iPhone",
    b.category || "iPhone Purchase",
    b.text.trim(),
    Number(b.likes || 0),
    b.verifiedSource || "Store Verified Buyer",
    b.isPublished === false ? 0 : 1
  );
  const created = db.prepare("SELECT * FROM customer_reviews WHERE id = ?").get(id);
  res.status(201).json(mapReviewRow(created));
});

app.patch("/api/reviews/:id", requireAdmin, (req, res) => {
  const { isPublished, rating, text } = req.body || {};
  db.prepare(`
    UPDATE customer_reviews
    SET is_published = COALESCE(?, is_published),
        rating = COALESCE(?, rating),
        text = COALESCE(?, text)
    WHERE id = ?
  `).run(
    isPublished === undefined ? null : isPublished ? 1 : 0,
    rating ?? null,
    text ?? null,
    req.params.id
  );
  res.json({ updated: true });
});

app.delete("/api/reviews/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM customer_reviews WHERE id = ?").run(req.params.id);
  res.json({ deleted: true });
});

function mapReviewRow(r) {
  return {
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
    isPublished: Boolean(r.is_published),
  };
}

// ========================
// SHOP SETTINGS
// ========================
app.get("/api/settings", (_req, res) => {
  const row = db.prepare("SELECT * FROM shop_settings WHERE id = 1").get();
  if (!row) return res.status(404).json({ error: "Settings not found." });
  res.json({
    storeName: row.store_name,
    tagline: row.tagline,
    whatsapp: row.whatsapp,
    phone: row.phone,
    phoneRaw: row.phone_raw,
    email: row.email,
    address: row.address,
    landmark: row.landmark,
    mapsUrl: row.maps_url,
    instagramUrl: row.instagram_url,
    workingHours: safeJson(row.hours_json, []),
    warrantyPolicy: row.warranty_policy,
    returnPolicy: row.return_policy,
  });
});

app.put("/api/settings", requireAdmin, (req, res) => {
  const b = req.body || {};
  const cur = db.prepare("SELECT * FROM shop_settings WHERE id = 1").get();
  db.prepare(`
    UPDATE shop_settings SET
      store_name = ?, tagline = ?, whatsapp = ?, phone = ?, phone_raw = ?,
      email = ?, address = ?, landmark = ?, maps_url = ?, instagram_url = ?,
      hours_json = ?, warranty_policy = ?, return_policy = ?, updated_at = datetime('now')
    WHERE id = 1
  `).run(
    b.storeName ?? cur.store_name,
    b.tagline ?? cur.tagline,
    b.whatsapp ?? cur.whatsapp,
    b.phone ?? cur.phone,
    b.phoneRaw ?? cur.phone_raw,
    b.email ?? cur.email,
    b.address ?? cur.address,
    b.landmark ?? cur.landmark,
    b.mapsUrl ?? cur.maps_url,
    b.instagramUrl ?? cur.instagram_url,
    JSON.stringify(b.workingHours ?? safeJson(cur.hours_json, [])),
    b.warrantyPolicy ?? cur.warranty_policy,
    b.returnPolicy ?? cur.return_policy
  );
  res.json({ updated: true });
});

app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || "Request error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sikandar Mobile Store API server listening on http://localhost:${PORT}`);
});
