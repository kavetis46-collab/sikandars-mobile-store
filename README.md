# Sikandar's Mobile Store – Flagship Website

A website built for **“Sikandar’sMobile store - iPHONE SALES AND SERVICE”** (Chirag Ali Lane, Jagdish Market, Abids, Hyderabad).

This project extracts all content, genuine Google reviews, store gallery photos, service lists, business hours, and contact details from the original site ([sikandars-mobile-store.grexa.site](https://sikandars-mobile-store.grexa.site/)) and elevates it into a high-end web application with Apple-grade dark luxury aesthetics, glassmorphism, fluid micro-interactions, and high-converting interactive tools.

---

## 🌟 Key Features & Design Highlights

1. **Apple-Grade Dark Glassmorphic Design**:
   - Obsidian dark surfaces (`#090a0f`), subtle neon emerald accents, and frosted glass panels.
   - Clean SF Pro / Plus Jakarta Sans typography and glowing border gradients.
   - 100% responsive across smartphones, tablets, laptops, and ultra-wide displays.

2. **Interactive Phone Valuation & Trade-In Calculator**:
   - Instant calculation for iPhone 11 to 15/16 Pro Max, Samsung Galaxy, and OnePlus models.
   - Grade selection (Flawless, Good, Fair) with real-time Hyderabad market valuations.
   - Confetti animation and 1-click **WhatsApp Quote Lock-In** button.

3. **Live Certified Pre-Owned Inventory**:
   - Filter by categories: *All*, *iPhone Pro*, *iPhone Standard*, *Android Flagship*, *Foldables*, *Accessories*.
   - Real-time search by phone model, storage, or keywords.
   - Battery health badges (`🔋 100% Battery`, `🔋 96% Original`), Grade A+ condition badges, and savings callouts.
   - **Quick Specs Modal** with 60-point hardware checklist (TrueTone, FaceID, clean IMEI, iCloud status).

4. **Inquiry Bag & Cart Drawer**:
   - Add multiple devices into a consolidated inquiry bag.
   - Add custom notes (e.g., trade-in devices or delivery requests).
   - Single-click dispatch to Sikandar Bhai on WhatsApp with a pre-formatted message.

5. **Apple Care & Precision Repair Hub**:
   - OLED screen replacement (TrueTone restoration), battery health upgrades, chip-level logic board micro-soldering, water damage recovery, and doorstep delivery.
   - Same-day turnaround and clear price estimates.

6. **Authentic Google Reviews (4.9★ Rating)**:
   - Displays real reviews from verified customers (Sharukuddin Shaik, kprc kprc, Narasimhulu, Jude Samuel, Md Jalal Uddin Mondal, etc.) with real Google avatars and direct links to Google Maps.

7. **Real Store Photo Tour**:
   - Masonry photo gallery showcasing the actual shop in Jagdish Market, testing benches, phone showcases, and accessories.
   - Fullscreen lightbox viewer with zoom, swipe, and captions.

8. **Location & Direct Contact**:
   - Embedded interactive Google Map for Jagdish Market, Chirag Ali Lane, Abids.
   - Live store status ("Open Now until 10:00 PM").
   - 1-Click Google Maps turn-by-turn directions, phone calling, and WhatsApp messaging.

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
The optimized static build is generated in the `dist/` directory, ready for deployment to Vercel, Netlify, Cloudflare Pages, or any static hosting service.

### Production Preview
```bash
npm run preview
```

---

## 📁 Project Structure

```
d:\SIKU BHAI PROJECT\
├── dist/                      # Production build output
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Glassmorphism header with status & inquiry bag
│   │   ├── HeroSection.jsx        # Luxury headline, stats, interactive phone showcase
│   │   ├── InventorySection.jsx   # Searchable/filterable certified device stock
│   │   ├── TradeInCalculator.jsx  # Interactive phone valuation calculator
│   │   ├── RepairServicesHub.jsx  # Chip-level repair & Apple service options
│   │   ├── StoreGallery.jsx       # 30+ real store photos with fullscreen lightbox
│   │   ├── CustomerReviews.jsx    # Real 4.9-star Google reviews & ratings
│   │   ├── LatestUpdates.jsx      # Posts & fresh stock announcements
│   │   ├── FaqSection.jsx         # Accordion for testing, warranties, battery health
│   │   ├── LocationAndContact.jsx # Google map, business hours & contact form
│   │   ├── Footer.jsx             # Brand info, quick links & Apple trademark disclaimer
│   │   ├── ProductDetailsModal.jsx# 60-point inspection checklist & specs modal
│   │   ├── InquiryBagDrawer.jsx   # Cart slide-over drawer with WhatsApp consolidation
│   │   └── FloatingActions.jsx    # Sticky mobile bottom bar & floating WhatsApp/Call buttons
│   ├── data/
│   │   └── storeData.js           # Comprehensive store data, products, reviews, gallery
│   ├── App.jsx                    # Root application component
│   ├── index.css                  # Tailwind CSS v4 styles & glassmorphism utilities
│   └── main.jsx                   # React DOM entry point
├── index.html                     # HTML head, SEO meta tags, Google Fonts
├── package.json                   # Dependencies and scripts
└── vite.config.js                 # Vite + React + Tailwind configuration
```

---

## 📞 Store Contact Information

- **Store Name**: Sikandar's Mobile Store – iPHONE SALES AND SERVICE
- **Location**: Chirag Ali Lane, Jagdish Market, Abids, Hyderabad, Telangana, 500001
- **Phone**: [+91 9700317171](tel:+919700317171)
- **WhatsApp**: [+91 9700317171](https://wa.me/919700317171)
- **Hours**: Monday to Saturday, 11:00 AM – 10:00 PM (Closed / Appointment on Sunday)
