import React from "react";
import {
  ShieldCheck,
  BatteryCharging,
  Fingerprint,
  LockOpen,
  FileCheck2,
  ScanEye,
  IndianRupee,
  Award,
  CheckCircle2,
  Store,
  Cpu,
} from "lucide-react";

const WHY_REASONS = [
  {
    icon: Store,
    title: "20+ Years Showroom Heritage",
    desc: "Serving buyers face-to-face at Chirag Ali Lane, Jagdish Market, Hyderabad since 2003 — never an anonymous classifieds listing.",
  },
  {
    icon: Cpu,
    title: "3uTools Live Counter Inspection",
    desc: "Every buyer can watch battery cycles, serials, Face ID, True Tone, and part originality verified live before paying.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Cashify + ₹500 Standard",
    desc: "Clear market-benchmarked pricing without inflated retail markups or surprise checkout add-ons.",
  },
  {
    icon: Award,
    title: "Same-Day Showroom & Support",
    desc: "Compare multiple finishes side by side, transfer WhatsApp & iCloud at our counter, and walk out protected by our store invoice.",
  },
];

const TRANSPARENCY_PILLARS = [
  {
    icon: ScanEye,
    title: "Multi-Point Device Inspection",
    detail: "Speakers, mics, Face ID, True Tone, LiDAR, optical autofocus, charging port, and wireless coils tested hands-on.",
  },
  {
    icon: BatteryCharging,
    title: "Honest Battery Health Reporting",
    detail: "Exact battery percentage and cycle health disclosed per device before checkout — zero software boosting.",
  },
  {
    icon: Fingerprint,
    title: "IMEI & Hardware Verification",
    detail: "IMEI/Serial matched across chassis, box (where supplied), and diagnostics tool prior to listing.",
  },
  {
    icon: LockOpen,
    title: "Clean Activation Lock Status",
    detail: "Every iPhone is verified Find My Off and signed out of prior Apple IDs for clean setup.",
  },
  {
    icon: FileCheck2,
    title: "Ownership & Authenticity Checks",
    detail: "Proper seller verification documentation collected internally and proper store bill provided to buyer.",
  },
  {
    icon: CheckCircle2,
    title: "Accurate Physical Condition Grading",
    detail: "Devices clearly categorized as Fair, Good, or Superb based on frame and display condition.",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    detail: "Upfront selling price by storage variant with zero hidden platform commissions.",
  },
  {
    icon: ShieldCheck,
    title: "Clear Warranty & Return Window",
    detail: "Eligible pre-owned devices carry our documented store testing warranty & 7-day verification guarantee.",
  },
];

export default function TrustAndWhySections() {
  return (
    <>
      {/* SECTION 10: WHY CHOOSE SIKANDAR MOBILE STORE? */}
      <section
        id="why-sikandar"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="pill-titanium mb-3">The Jagdish Market Standard</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Choose Sikandar Mobile Store?
          </h2>
          <p className="text-sm sm:text-base text-[#858A94] mt-3">
            Luxury hardware buying should feel confident, technical, and accountable from first glance to setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_REASONS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="surface-charcoal p-6 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-[#3478F6]/15 border border-[#3478F6]/35 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#3478F6]" />
                </div>
                <h3 className="text-base font-extrabold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#858A94] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 11: DEVICE QUALITY AND TRANSPARENCY — "EVERY DETAIL MATTERS." */}
      <section
        id="every-detail-matters"
        className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="pill-electric mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Device Quality &amp; Transparency</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gradient-titanium">
              EVERY DETAIL MATTERS.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#C5C7CC] max-w-xl">
            No exaggerated promises — just verifiable diagnostics, clean ownership records, and honest grading before your device changes hands.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRANSPARENCY_PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="surface-charcoal p-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#3478F6] shrink-0" />
                  <h3 className="text-sm font-bold text-white">{p.title}</h3>
                </div>
                <p className="text-xs text-[#858A94] leading-relaxed">{p.detail}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
