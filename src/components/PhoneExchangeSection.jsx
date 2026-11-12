import React, { useState } from "react";
import { Repeat, UploadCloud, CheckCircle2, MessageCircle, AlertCircle, Image as ImageIcon } from "lucide-react";
import { uploadImages, submitExchangeEnquiry, buildWhatsAppEnquiryUrl } from "../lib/api";
import { useStore } from "../context/StoreContext";

const BRAND_OPTIONS = ["Apple iPhone", "Samsung Galaxy S / Fold", "Google Pixel", "OnePlus", "Other Flagship"];
const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];
const CONDITION_OPTIONS = [
  "Flawless — No scratches or dents",
  "Good — Light minor bezel marks",
  "Fair — Visible wear / scuffing",
  "Screen or Back Glass Needs Repair",
];

export default function PhoneExchangeSection() {
  const { shopSettings } = useStore();

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    brand: "Apple iPhone",
    model: "",
    storage: "128GB",
    physicalCondition: CONDITION_OPTIONS[0],
    batteryHealth: "",
    accessories: "Original Box & Cable",
    notes: "",
  });

  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.customerName.trim() || !form.customerPhone.trim() || !form.model.trim()) {
      setError("Please fill your name, phone number, and existing phone model.");
      return;
    }

    setSubmitting(true);
    try {
      let photoUrls = [];
      if (files.length > 0) {
        try {
          photoUrls = await uploadImages(files);
        } catch {
          photoUrls = [];
        }
      }

      const res = await submitExchangeEnquiry({
        ...form,
        photoUrls,
      });

      setSubmittedId(res.id || "submitted");
      setFiles([]);
    } catch (err) {
      setError(err.message || "Could not submit exchange request. Please try WhatsApp below.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="exchange-phone"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Informational Column */}
        <div className="lg:col-span-5 space-y-5">
          <span className="pill-electric">
            <Repeat className="w-3.5 h-3.5" />
            <span>Phone Exchange System</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Exchange Your Old Smartphone
          </h2>
          <p className="text-sm sm:text-base text-[#C5C7CC] leading-relaxed">
            Submit your current phone’s exact model, condition, battery health, and photographs directly to Sikandar Mobile Store. Our inspection desk reviews real hardware condition and sends an accurate quote before you upgrade.
          </p>

          <div className="surface-charcoal p-5 space-y-3 text-xs text-[#C5C7CC]">
            <div className="font-bold text-white uppercase tracking-wider">How Exchange Works:</div>
            <p>1. Enter device brand, exact model, storage, battery health &amp; condition.</p>
            <p>2. Optionally attach clear front, back, and side frame photographs.</p>
            <p>3. Receive a genuine human evaluation directly from our Jagdish Market counter — no misleading automated estimates.</p>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 surface-charcoal p-6 sm:p-8">
          {submittedId ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Exchange Enquiry Received</h3>
              <p className="text-sm text-[#C5C7CC] max-w-md mx-auto">
                Reference <span className="font-mono text-[#3478F6]">{submittedId}</span> is now in our admin review queue. Want faster response on WhatsApp?
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <a
                  href={buildWhatsAppEnquiryUrl(shopSettings.whatsapp, {
                    customMessage: `Hello Sikandar Mobile Store! I just submitted Exchange Enquiry (${submittedId}) for my ${form.brand} ${form.model} (${form.storage}, ${form.physicalCondition}). Please share my evaluation.`,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-electric px-5 py-3 text-xs gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Follow Up on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedId("")}
                  className="btn-titanium px-5 py-3 text-xs"
                >
                  Submit Another Phone
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                    Existing Brand *
                  </label>
                  <select
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white focus:border-[#3478F6] focus:outline-none"
                  >
                    {BRAND_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                    Phone Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 14 Pro"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                    Storage Capacity *
                  </label>
                  <select
                    value={form.storage}
                    onChange={(e) => setForm({ ...form, storage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white focus:border-[#3478F6] focus:outline-none"
                  >
                    {STORAGE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                    Battery Health (if applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 88%"
                    value={form.batteryHealth}
                    onChange={(e) => setForm({ ...form, batteryHealth: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                    Physical Condition *
                  </label>
                  <select
                    value={form.physicalCondition}
                    onChange={(e) => setForm({ ...form, physicalCondition: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white focus:border-[#3478F6] focus:outline-none"
                  >
                    {CONDITION_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                    Included Accessories
                  </label>
                  <input
                    type="text"
                    placeholder="Box, Cable, Original Invoice"
                    value={form.accessories}
                    onChange={(e) => setForm({ ...form, accessories: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9XXXXXXXXX"
                    value={form.customerPhone}
                    onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
                  />
                </div>
              </div>

              {/* Photo Upload Input */}
              <div>
                <label className="block text-xs font-semibold text-[#C5C7CC] mb-1.5">
                  Upload Device Photographs (Front, Rear, Frame — Optional)
                </label>
                <label className="flex items-center justify-center gap-2.5 px-4 py-4 rounded-xl bg-[#08090C] border border-dashed border-[#C5C7CC]/25 hover:border-[#3478F6] cursor-pointer transition-colors text-xs text-[#C5C7CC]">
                  <UploadCloud className="w-4 h-4 text-[#3478F6]" />
                  <span>
                    {files.length > 0
                      ? `${files.length} photo(s) selected`
                      : "Click to select up to 5 JPEG / PNG / WebP images"}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setFiles(Array.from(e.target.files || []).slice(0, 5))}
                    className="hidden"
                  />
                </label>
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {files.map((f, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#08090C] border border-[#C5C7CC]/15 text-[11px] text-[#C5C7CC]"
                      >
                        <ImageIcon className="w-3 h-3 text-[#3478F6]" />
                        {f.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-400/30 text-xs text-rose-300">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-electric py-3.5 text-sm disabled:opacity-60"
              >
                {submitting ? "Submitting Exchange Enquiry..." : "Submit Device for Exchange Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
