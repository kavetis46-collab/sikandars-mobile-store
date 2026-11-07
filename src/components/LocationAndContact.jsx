import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Navigation, 
  Calendar, 
  Send, 
  CheckCircle,
  Share2,
  ExternalLink
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function LocationAndContact() {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formPhone) return;

    const fullMsg = `Hi Sikandar Bhai!
My Name: ${formName || 'Customer'}
Phone: ${formPhone}
Query: ${formMessage || 'Interested in iPhone purchase / repair'}

Please get back to me.`;

    // Open WhatsApp
    window.open(createWhatsAppUrl(fullMsg), '_blank');
    setFormSubmitted(true);
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];

  return (
    <section id="location" className="py-16 sm:py-24 relative bg-[#090a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us in Hyderabad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Visit Our Store at Jagdish Market
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Conveniently located in the heart of Hyderabad's mobile hub. Walk in for instant device testing, trade-ins, or repairs.
          </p>
        </div>

        {/* 2-Column Grid: Map & Hours vs Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Map & Store Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Store Information Card */}
            <div className="rounded-2xl bg-[#12141f] border border-white/10 p-6 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
                <div>
                  <h3 className="text-lg font-bold text-white">{storeData.storeInfo.name}</h3>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">
                    {storeData.storeInfo.experienceYears} • Independent Apple Specialists
                  </p>
                </div>

                <a
                  href={storeData.storeInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Start Navigation</span>
                </a>
              </div>

              {/* Address details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Store Address</span>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {storeData.storeInfo.address}
                  </p>
                  <span className="text-emerald-400 block pt-1">
                    Near Abids Shopping Center / Chirag Ali Lane
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Direct Helpline</span>
                  <p className="text-white text-sm font-bold">
                    <a href={`tel:${storeData.storeInfo.phoneRaw}`} className="hover:text-emerald-400">
                      {storeData.storeInfo.phone}
                    </a>
                  </p>
                  <p className="text-slate-400 pt-1">
                    WhatsApp: <span className="text-emerald-400 font-semibold">+91 9700317171</span>
                  </p>
                </div>
              </div>

              {/* Hours Schedule Grid */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-3">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Business Working Hours</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {storeData.storeInfo.workingHours.map((wh) => {
                    const isToday = wh.day.toLowerCase() === todayName.toLowerCase();

                    return (
                      <div
                        key={wh.day}
                        className={`p-2.5 rounded-xl border text-xs transition-colors ${
                          isToday 
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                            : 'bg-white/5 border-white/5 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{wh.day}</span>
                          {isToday && (
                            <span className="text-[9px] uppercase font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded">
                              Today
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{wh.time}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-64 sm:h-80 bg-slate-900 relative">
              <iframe
                title="Sikandar's Mobile Store Location Map"
                src="https://maps.google.com/maps?q=17.387140,78.473550&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-125 grayscale-[30%]"
              />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Jagdish Market, Chirag Ali Lane, Abids</span>
              </div>
            </div>

          </div>

          {/* Right Column: Instant Message / Inquiry Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl glass-panel-elevated border border-white/10 p-6 sm:p-8 space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                <p className="text-xs text-slate-400">
                  Have a specific model in mind or need a repair quote? Send a message directly to Sikandar Bhai.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Message Dispatched!</h4>
                  <p className="text-xs text-slate-300">
                    Your query was forwarded to Sikandar Bhai via WhatsApp. He will reply shortly!
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-emerald-400 underline font-semibold mt-2"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#161924] border border-white/10 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-[#161924] border border-white/10 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Query or Device Looking For
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Looking for pre-owned iPhone 15 Pro Max 256GB in pristine condition, or need screen repair for iPhone 13."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-[#161924] border border-white/10 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Query via WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    We respond within minutes during business hours (11:00 AM – 10:00 PM).
                  </p>
                </form>
              )}

              {/* Direct call banner */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Prefer a quick phone call?</span>
                <a
                  href={`tel:${storeData.storeInfo.phoneRaw}`}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {storeData.storeInfo.phone}</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
