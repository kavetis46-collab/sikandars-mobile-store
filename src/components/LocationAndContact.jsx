import React, { useState } from "react";
import { MapPin, Phone, MessageCircle, Clock, Navigation, Send, CheckCircle2 } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppEnquiryUrl, submitCustomerEnquiry } from "../lib/api";

export default function LocationAndContact() {
  const { shopSettings } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    try {
      await submitCustomerEnquiry({
        customerName: name,
        customerPhone: phone,
        message: message || "General showroom enquiry",
        source: "contact-form",
      });
    } catch {
      // Proceed cleanly to WhatsApp even if offline
    }

    setSubmitted(true);
    const waUrl = buildWhatsAppEnquiryUrl(shopSettings.whatsapp, {
      customMessage: `Hello Sikandar Mobile Store! Name: ${name || "Customer"}, Phone: ${phone}. Enquiry: ${
        message || "Looking to buy a certified pre-owned iPhone."
      }`,
    });
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="location"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="pill-electric mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>Showroom Location &amp; Contact</span>
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Visit {shopSettings.storeName}
        </h2>
        <p className="text-sm sm:text-base text-[#858A94] mt-3">
          Walk in to test your device hands-on at Jagdish Market, Abids &amp; Koti, or send a direct enquiry below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Address & Hours */}
        <div className="lg:col-span-7 surface-charcoal p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#C5C7CC]/10">
            <div>
              <h3 className="text-xl font-extrabold text-white">{shopSettings.storeName}</h3>
              <p className="text-xs font-semibold text-[#3478F6] mt-1">{shopSettings.landmark}</p>
            </div>
            <a
              href={shopSettings.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-electric px-4 py-2.5 text-xs gap-1.5 shrink-0"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps Directions</span>
            </a>
          </div>

          <div className="space-y-4 text-sm text-[#C5C7CC]">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#3478F6] shrink-0 mt-1" />
              <span>{shopSettings.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#3478F6] shrink-0" />
              <a href={`tel:${shopSettings.phoneRaw}`} className="font-mono font-bold text-white hover:text-[#3478F6]">
                {shopSettings.phone}
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="pt-4 border-t border-[#C5C7CC]/10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#858A94] mb-3">
              <Clock className="w-3.5 h-3.5 text-[#3478F6]" />
              <span>Business Hours</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(shopSettings.workingHours || []).map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#08090C] border border-[#C5C7CC]/10"
                >
                  <span className="font-semibold text-[#C5C7CC]">{h.day}</span>
                  <span className="text-white font-mono">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Direct Enquiry Form */}
        <div className="lg:col-span-5 surface-charcoal p-6 sm:p-8">
          <h3 className="text-lg font-extrabold text-white mb-2">Direct Showroom Enquiry</h3>
          <p className="text-xs text-[#858A94] mb-5">
            Enquiries are logged in our admin queue and routed straight to WhatsApp for immediate response.
          </p>

          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">Enquiry Sent Successfully</p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-titanium px-4 py-2 text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#C5C7CC] mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#C5C7CC] mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#C5C7CC] mb-1">Which iPhone are you looking for?</label>
                <textarea
                  rows={3}
                  placeholder="Model, storage, preferred colour or budget..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-sm text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
                />
              </div>
              <button type="submit" className="w-full btn-electric py-3.5 text-sm gap-2">
                <Send className="w-4 h-4" />
                <span>Send Enquiry &amp; Open WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
