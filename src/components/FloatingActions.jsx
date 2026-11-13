import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  MessagesSquare,
  Phone,
  ArrowUp,
  ShoppingCart,
  Heart,
  X,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppEnquiryUrl } from "../lib/api";

const DIALOGUE_TOPICS = [
  { id: "price", label: "🏷️ Best Price & Deal", placeholder: "What is your best counter price for this model today?" },
  { id: "stock", label: "📱 Check Stock & Health", placeholder: "Do you have this in stock with 95%+ battery health?" },
  { id: "exchange", label: "🔄 Exchange Old Phone", placeholder: "I want to exchange my old smartphone. What's the trade-in value?" },
  { id: "visit", label: "📍 Store Visit / Video Call", placeholder: "I'd like to visit your Abids store or see a live video call of the device." },
];

const POPULAR_MODELS = [
  "Apple iPhone 16 Pro Max",
  "Apple iPhone 15 Pro Max",
  "Apple iPhone 15 Pro",
  "Apple iPhone 14 Plus",
  "Apple iPhone 14",
  "Apple iPhone 13",
  "Apple iPhone 18 Pro Max",
  "Apple iPhone 17",
  "Other iPhone Model",
];

export default function FloatingActions() {
  const {
    shopSettings,
    cartItems,
    setIsBagOpen,
    favorites,
    setIsFavoritesOpen,
  } = useStore();

  const [showTop, setShowTop] = useState(false);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  // Dialogue Form State
  const [topic, setTopic] = useState(DIALOGUE_TOPICS[0].label);
  const [model, setModel] = useState(POPULAR_MODELS[0]);
  const [condition, setCondition] = useState("Good");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [queryText, setQueryText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalUnits = cartItems.reduce((sum, i) => sum + (i.qty || 1), 0);
  const waHref = buildWhatsAppEnquiryUrl(shopSettings.whatsapp);

  const buildDialogueWhatsAppUrl = () => {
    const cleanPhone = (shopSettings.whatsapp || "919700317171").replace(/\D/g, "");
    const lines = [
      "Hello Sikandar Bhai! I'm starting an inquiry from your website dialogue desk:",
      `• Topic: ${topic}`,
      `• Device: ${model}`,
      `• Condition Grade: ${condition}`,
      customerName ? `• Customer Name: ${customerName.trim()}` : "",
      customerPhone ? `• Phone / WhatsApp: ${customerPhone.trim()}` : "",
      queryText ? `• Question / Query: ${queryText.trim()}` : "",
      "",
      "Please confirm device availability, physical condition & your best counter price!",
    ].filter(Boolean);

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const handleSendToWhatsApp = (e) => {
    e?.preventDefault();
    const url = buildDialogueWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSubmitStoreInquiry = async (e) => {
    e?.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim() || "Store Website Visitor",
          customerPhone: customerPhone.trim() || "Via Dialogue Modal",
          productName: model,
          storage: condition,
          message: `[${topic}] ${queryText.trim() || "Customer requested price & availability confirmation."}`,
          source: "interactive_dialogue_modal",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback directly to WhatsApp if API is unreachable
        handleSendToWhatsApp();
      }
    } catch {
      handleSendToWhatsApp();
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setQueryText("");
    setIsDialogueOpen(false);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP FLOATING ACTION STACK                           */}
      {/* ======================================================== */}
      <aside
        aria-label="Quick Customer Support and Actions"
        className="fixed bottom-7 right-6 z-40 hidden sm:flex flex-col items-end gap-3 pointer-events-auto"
      >
        {/* Scroll to Top */}
        {showTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="p-3 rounded-full bg-[#111318]/95 border border-[#C5C7CC]/25 text-[#C5C7CC] hover:text-white hover:border-[#3478F6] transition-all cursor-pointer shadow-xl backdrop-blur-md hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Direct Call Button */}
        <a
          href={`tel:${shopSettings.phoneRaw}`}
          aria-label={`Call ${shopSettings.phone}`}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#111318]/90 border border-[#C5C7CC]/20 hover:border-[#3478F6] text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all hover:bg-[#181B22]"
        >
          <div className="w-6 h-6 rounded-full bg-[#3478F6]/20 flex items-center justify-center text-[#3478F6]">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono text-xs">{shopSettings.phone}</span>
        </a>

        {/* FLOATING DIALOGUE BUTTON */}
        <button
          type="button"
          onClick={() => setIsDialogueOpen(true)}
          aria-label="Open Customer Dialogue"
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#181B24] to-[#202533] border border-[#3478F6]/40 text-white font-bold text-xs shadow-[0_8px_24px_rgba(52,120,246,0.3)] hover:shadow-[0_12px_32px_rgba(52,120,246,0.5)] transition-all cursor-pointer hover:border-[#3478F6] hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <MessagesSquare className="w-4 h-4 text-[#93C5FD] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#10B981]" />
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[11px] font-extrabold tracking-wide uppercase text-white">Live Dialogue</span>
            <span className="text-[9px] text-[#93C5FD] font-mono">Fast Response</span>
          </div>
        </button>

        {/* FLOATING WHATSAPP BUTTON (DIRECT REDIRECT) */}
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Redirect"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold text-xs shadow-[0_8px_28px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_36px_rgba(37,211,102,0.65)] transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-5 h-5 fill-current shrink-0" />
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[12px] font-extrabold tracking-wide uppercase">WhatsApp Store</span>
            <span className="text-[9px] text-emerald-100 font-medium">Direct Chat with Sikandar Bhai</span>
          </div>
        </a>
      </aside>

      {/* ======================================================== */}
      {/* MOBILE BOTTOM DOCK (ALWAYS VISIBLE & TOUCH OPTIMIZED)   */}
      {/* ======================================================== */}
      <nav
        aria-label="Mobile Quick Actions"
        style={{ paddingBottom: "max(0.65rem, env(safe-area-inset-bottom, 0.65rem))" }}
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#08090C]/95 border-t border-[#C5C7CC]/15 backdrop-blur-2xl px-2 pt-2 shadow-2xl"
      >
        <div className="grid grid-cols-12 gap-1.5 items-center max-w-md mx-auto">
          {/* Favorites */}
          <button
            type="button"
            onClick={() => setIsFavoritesOpen(true)}
            aria-label="Open Favorites"
            className="col-span-2 relative flex flex-col items-center justify-center py-1.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/15 text-[#C5C7CC] active:scale-95"
          >
            <Heart className={`w-4 h-4 ${favorites.length > 0 ? "fill-rose-400 text-rose-400" : ""}`} />
            <span className="text-[8px] font-semibold mt-0.5">Saved</span>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={() => setIsBagOpen(true)}
            aria-label="Open Cart"
            className="col-span-2 relative flex flex-col items-center justify-center py-1.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/15 text-[#C5C7CC] active:scale-95"
          >
            <ShoppingCart className="w-4 h-4 text-[#3478F6]" />
            <span className="text-[8px] font-semibold mt-0.5">Cart</span>
            {totalUnits > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3478F6] text-white text-[9px] font-bold flex items-center justify-center">
                {totalUnits}
              </span>
            )}
          </button>

          {/* Dialogue Button */}
          <button
            type="button"
            onClick={() => setIsDialogueOpen(true)}
            aria-label="Open Dialogue Desk"
            className="col-span-4 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#181B24] to-[#232938] border border-[#3478F6]/50 text-white text-[11px] font-bold shadow-md active:scale-95"
          >
            <MessagesSquare className="w-3.5 h-3.5 text-[#93C5FD]" />
            <span>Dialogue</span>
          </button>

          {/* WhatsApp Direct Redirect */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp Redirect"
            className="col-span-4 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-[11px] font-extrabold shadow-[0_4px_16px_rgba(37,211,102,0.4)] active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* INTERACTIVE CUSTOMER DIALOGUE MODAL                     */}
      {/* ======================================================== */}
      {isDialogueOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialogue-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
        >
          <div
            className="relative w-full max-w-lg bg-[#0E1015] border border-[#C5C7CC]/25 rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative p-4 sm:p-5 border-b border-[#C5C7CC]/15 bg-gradient-to-r from-[#111318] via-[#161922] to-[#111318] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Official Store Logo Emblem */}
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4AF37]/70 shadow-[0_0_12px_rgba(212,175,55,0.35)] shrink-0 bg-[#08090C] p-0.5">
                  <img
                    src="/images/store-stock/store-logo.jpg"
                    alt="Sikandar's Mobile Store Official Emblem"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#08090C]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 id="dialogue-title" className="text-sm sm:text-base font-extrabold tracking-wide text-white uppercase">
                      Customer Dialogue Desk
                    </h2>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#10B981]/20 border border-[#10B981]/40 text-[#6EE7B7]">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-[11px] text-[#858A94]">
                    Sikandar’s Mobile Store • Chirag Ali Lane, Abids
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetForm}
                aria-label="Close dialogue"
                className="p-2 rounded-xl text-[#858A94] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
              {submitted ? (
                /* Success View */
                <div className="py-6 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Dialogue Submitted Successfully!
                  </h3>
                  <p className="text-xs text-[#858A94] max-w-sm mx-auto leading-relaxed">
                    Thank you! Sikandar Bhai’s team at the Abids showroom has received your inquiry. We will call or WhatsApp you within 15 minutes.
                  </p>
                  <div className="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      type="button"
                      onClick={handleSendToWhatsApp}
                      className="btn-electric py-2.5 px-4 text-xs gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Also Open on WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="btn-titanium py-2.5 px-4 text-xs"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form View */
                <form onSubmit={handleSubmitStoreInquiry} className="space-y-4">
                  {/* Topic Picker */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C5C7CC] mb-1.5">
                      1. Select Inquiry Topic
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {DIALOGUE_TOPICS.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTopic(t.label)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                            topic === t.label
                              ? "bg-[#3478F6]/20 border-[#3478F6] text-white shadow-[0_0_12px_rgba(52,120,246,0.25)]"
                              : "bg-[#111318] border-[#C5C7CC]/15 text-[#C5C7CC] hover:border-[#C5C7CC]/30 hover:text-white"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Model Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C5C7CC] mb-1.5">
                        2. Target iPhone Model
                      </label>
                      <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/20 text-white text-xs focus:border-[#3478F6] focus:outline-none"
                      >
                        {POPULAR_MODELS.map((m) => (
                          <option key={m} value={m} className="bg-[#111318] text-white">
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C5C7CC] mb-1.5">
                        3. Condition Preference
                      </label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/20 text-white text-xs focus:border-[#3478F6] focus:outline-none"
                      >
                        <option value="Fair">Fair Grade (Budget, 85%–89% Health)</option>
                        <option value="Good">Good Grade (Popular, 90%–94% Health)</option>
                        <option value="Superb">Superb Grade A+ (Like New, 95%–100%)</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C5C7CC] mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul / Sameer"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/20 text-white text-xs placeholder:text-[#858A94]/60 focus:border-[#3478F6] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C5C7CC] mb-1.5">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/20 text-white text-xs placeholder:text-[#858A94]/60 focus:border-[#3478F6] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Custom Message / Query */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#C5C7CC] mb-1.5">
                      Your Question or Negotiation Note (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ask for current colors, battery cycles, invoice, or best showroom deal..."
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#111318] border border-[#C5C7CC]/20 text-white text-xs placeholder:text-[#858A94]/60 focus:border-[#3478F6] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Guarantee Banner */}
                  <div className="p-3 rounded-xl bg-[#111318] border border-[#C5C7CC]/15 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#3478F6] shrink-0" />
                    <div className="text-[10px] text-[#858A94] leading-snug">
                      <strong className="text-white">Store Transparency Guarantee:</strong> Cashify App Buy Price + ₹500 Only. 100% genuine Apple hardware with face-to-face 3uTools verification report.
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {/* Primary: Direct WhatsApp Redirect */}
                    <button
                      type="button"
                      onClick={handleSendToWhatsApp}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.6)] cursor-pointer active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                      <span>Start WhatsApp Dialogue</span>
                    </button>

                    {/* Secondary: Submit to Store System */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full btn-electric py-3 px-4 text-xs gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Sending to Store...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Store Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Call Direct Option */}
                  <div className="text-center pt-1">
                    <a
                      href={`tel:${shopSettings.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 text-[11px] text-[#858A94] hover:text-[#93C5FD] transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#3478F6]" />
                      <span>Or call Sikandar Bhai directly at <strong className="text-white font-mono">{shopSettings.phone}</strong></span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
