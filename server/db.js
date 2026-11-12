import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "node:url";
import { storeData, IPHONE_16_PRO_MAX_IMAGES } from "../src/data/storeData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
fs.mkdirSync(dataDir, { recursive: true });

export const uploadsDir = path.join(__dirname, "..", "public", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const dbPath = path.join(dataDir, "sikandar_store.db");
export const db = new DatabaseSync(dbPath);

export function initDatabase() {
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      series TEXT NOT NULL,
      generation INTEGER NOT NULL DEFAULT 16,
      form_factor TEXT NOT NULL DEFAULT 'Pro',
      ram TEXT NOT NULL DEFAULT '8GB RAM',
      badge TEXT DEFAULT 'Certified Pre-Owned',
      image TEXT NOT NULL,
      gallery_images TEXT NOT NULL DEFAULT '[]',
      colors TEXT NOT NULL DEFAULT '[]',
      variants TEXT NOT NULL DEFAULT '[]',
      specs TEXT NOT NULL DEFAULT '{}',
      condition_grade TEXT NOT NULL DEFAULT 'Superb',
      battery_health TEXT NOT NULL DEFAULT '92% – 98% Health',
      warranty TEXT NOT NULL DEFAULT '6 Months Store Warranty + Bill',
      return_policy TEXT NOT NULL DEFAULT '7-Day Functional Verification Guarantee',
      accessories TEXT NOT NULL DEFAULT 'Original Box & Charging Cable',
      stock_count INTEGER NOT NULL DEFAULT 1,
      is_sold INTEGER NOT NULL DEFAULT 0,
      is_featured INTEGER NOT NULL DEFAULT 0,
      is_latest INTEGER NOT NULL DEFAULT 0,
      is_popular INTEGER NOT NULL DEFAULT 0,
      is_best_deal INTEGER NOT NULL DEFAULT 0,
      discount_percent INTEGER NOT NULL DEFAULT 0,
      display_price INTEGER NOT NULL DEFAULT 0,
      cashify_price INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS exchange_enquiries (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      storage TEXT NOT NULL,
      physical_condition TEXT NOT NULL,
      battery_health TEXT DEFAULT '',
      accessories TEXT DEFAULT '',
      photo_urls TEXT NOT NULL DEFAULT '[]',
      notes TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      admin_notes TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS customer_enquiries (
      id TEXT PRIMARY KEY,
      customer_name TEXT DEFAULT '',
      customer_phone TEXT NOT NULL,
      product_id TEXT DEFAULT '',
      product_name TEXT DEFAULT '',
      storage TEXT DEFAULT '',
      colour TEXT DEFAULT '',
      price TEXT DEFAULT '',
      message TEXT DEFAULT '',
      source TEXT DEFAULT 'website',
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS customer_reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      avatar TEXT DEFAULT '',
      badge TEXT DEFAULT 'Verified Buyer',
      device_purchased TEXT DEFAULT '',
      category TEXT DEFAULT 'iPhone Purchase',
      text TEXT NOT NULL,
      likes INTEGER NOT NULL DEFAULT 0,
      verified_source TEXT DEFAULT 'Google Maps Verified',
      is_published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS shop_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      store_name TEXT NOT NULL,
      tagline TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      phone TEXT NOT NULL,
      phone_raw TEXT NOT NULL,
      email TEXT DEFAULT '',
      address TEXT NOT NULL,
      landmark TEXT DEFAULT '',
      maps_url TEXT NOT NULL,
      instagram_url TEXT DEFAULT '',
      hours_json TEXT NOT NULL DEFAULT '[]',
      warranty_policy TEXT NOT NULL,
      return_policy TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  seedInitialData();
}

function seedInitialData() {
  // Seed admin user if none exists
  const adminCount = db.prepare("SELECT COUNT(*) AS count FROM admin_users").get().count;
  if (adminCount === 0) {
    const email = process.env.ADMIN_EMAIL || "admin@sikandarmobilestore.in";
    const password = process.env.ADMIN_PASSWORD || "SikandarAdmin@2026";
    const passwordHash = bcrypt.hashSync(password, 10);
    db.prepare(
      "INSERT INTO admin_users (id, email, password_hash, role) VALUES (?, ?, ?, ?)"
    ).run("admin-1", email, passwordHash, "admin");
  }

  // Seed shop settings if empty
  const settingsCount = db.prepare("SELECT COUNT(*) AS count FROM shop_settings").get().count;
  if (settingsCount === 0) {
    db.prepare(`
      INSERT INTO shop_settings (
        id, store_name, tagline, whatsapp, phone, phone_raw, email,
        address, landmark, maps_url, instagram_url, hours_json,
        warranty_policy, return_policy
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      1,
      "SIKANDAR MOBILE STORE",
      "PREMIUM PHONES. SMARTER PRICES.",
      storeData.storeInfo.whatsapp,
      storeData.storeInfo.phone,
      storeData.storeInfo.phoneRaw,
      "contact@sikandarsmobilestore.in",
      storeData.storeInfo.address,
      "Chirag Ali Lane Junction, Jagdish Market, Abids & Koti",
      storeData.storeInfo.mapsUrl,
      storeData.storeInfo.instagram.url,
      JSON.stringify(storeData.storeInfo.workingHours),
      "6 Months Store Testing & Hardware Verification Warranty with GST / Store Invoice on eligible devices.",
      "7-Day Functional Verification Exchange Policy (same condition, zero physical/liquid damage) at Abids showroom."
    );
  }

  // Seed products from storeData if empty
  const productCount = db.prepare("SELECT COUNT(*) AS count FROM products").get().count;
  if (productCount === 0) {
    const insertProd = db.prepare(`
      INSERT INTO products (
        id, slug, name, series, generation, form_factor, ram, badge, image,
        gallery_images, colors, variants, specs, condition_grade, battery_health,
        warranty, return_policy, accessories, stock_count, is_sold,
        is_featured, is_latest, is_popular, is_best_deal, discount_percent,
        display_price, cashify_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const featuredIds = new Set([
      "iphone-17-pro-max",
      "iphone-16-pro-max",
      "iphone-15-pro-max",
      "iphone-16-pro",
      "iphone-14-pro-max",
      "iphone-13-mini",
    ]);
    const popularIds = new Set([
      "iphone-16-pro-max",
      "iphone-15-pro",
      "iphone-15",
      "iphone-14-pro",
      "iphone-13",
      "iphone-16",
    ]);

    for (const p of storeData.products) {
      const baseVariant = p.variants?.[0] || { storePrice: 25500, cashifyPrice: 25000, originalMrp: 59900 };
      const discountPct =
        baseVariant.originalMrp > 0
          ? Math.max(0, Math.round(((baseVariant.originalMrp - baseVariant.storePrice) / baseVariant.originalMrp) * 100))
          : 0;

      const gallery = [
        p.image,
        IPHONE_16_PRO_MAX_IMAGES.finishLineup,
        IPHONE_16_PRO_MAX_IMAGES.cameraSystem,
        IPHONE_16_PRO_MAX_IMAGES.storeInspectionDesk,
      ].filter(Boolean);

      insertProd.run(
        p.id,
        p.id,
        p.name,
        p.series,
        p.generation || 15,
        p.formFactor || "Standard",
        p.ram || "8GB RAM",
        p.badge || "Certified Pre-Owned",
        p.image,
        JSON.stringify([...new Set(gallery)]),
        JSON.stringify(p.colors || []),
        JSON.stringify(p.variants || []),
        JSON.stringify(p.specs || {}),
        "Good",
        p.batteryHealth || "90% – 96% Health",
        p.warranty || "6 Months Store Warranty + Bill",
        "7-Day Functional Verification Guarantee at Abids Showroom",
        p.specs?.box || "Charging Cable & Authorized Store Invoice",
        1,
        0,
        featuredIds.has(p.id) ? 1 : 0,
        (p.generation || 0) >= 16 ? 1 : 0,
        popularIds.has(p.id) ? 1 : 0,
        discountPct >= 45 ? 1 : 0,
        discountPct,
        baseVariant.storePrice,
        baseVariant.cashifyPrice
      );
    }
  }

  // Seed verified Google Maps reviews if empty
  const reviewsCount = db.prepare("SELECT COUNT(*) AS count FROM customer_reviews").get().count;
  if (reviewsCount === 0) {
    const insertRev = db.prepare(`
      INSERT INTO customer_reviews (
        id, name, date, rating, avatar, badge, device_purchased,
        category, text, likes, verified_source, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const r of storeData.reviews) {
      insertRev.run(
        r.id,
        r.name,
        r.date,
        r.rating || 5,
        r.avatar || "",
        r.badge || "Verified Buyer",
        r.devicePurchased || "Certified iPhone",
        r.category || "iPhone Purchase",
        r.text,
        r.likes || 0,
        r.verifiedSource || "Google Maps Verified",
        1
      );
    }
  }
}

export function mapProductRow(row) {
  if (!row) return null;
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
    galleryImages: safeJson(row.gallery_images, []),
    colors: safeJson(row.colors, []),
    variants: safeJson(row.variants, []),
    specs: safeJson(row.specs, {}),
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

export function safeJson(val, fallback) {
  if (typeof val !== "string") return val ?? fallback;
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}
