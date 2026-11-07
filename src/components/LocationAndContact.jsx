import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Navigation, 
  Send, 
  CheckCircle,
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
Looking for: ${formMessage || 'Flagship smartphone purchase / inquiry'}

Please get back to me.`;

    window.open(createWhatsAppUrl(fullMsg), '_blank');
    setFormSubmitted(true);
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = daysOfWeek[new Date().getDay()];

  return (
    <section id="location" className="py-16 sm:py-24 relative bg-[#0A0D14] border-t border-[#262F40] content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Showroom Location &amp; Visit Details</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Visit Our Showroom at Jagdish Market
          </h2>
          <p className="mt-2 text-[#94A3B8] text-sm sm:text-base">
            Conveniently located at the Abids and Koti junction in the heart of Hyderabad's mobile district. Walk in for instant device testing, spot trade-ins, or repairs.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Map & Store Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Store Information Card with 1px #262F40 and 16px radius */}
            <div className="surface-card p-6 sm:p-7 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#262F40]">
                <div>
                  <h3 className="text-lg font-extrabold text-[#F8FAFC]">{storeData.storeInfo.name}</h3>
                  <p className="text-xs text-[#00F0FF] font-bold mt-0.5">
                    {storeData.storeInfo.experienceYears} • Certified Flagship Specialists
                  </p>
                </div>

                <a
                  href={storeData.storeInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-cobalt px-4 py-2.5 text-xs font-bold gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 fill-current" />
                  <span>Start Navigation</span>
                </a>
              </div>

              {/* Address details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[#94A3B8] font-bold uppercase tracking-wider text-[10px]">Showroom Address</span>
                  <p className="text-[#F8FAFC] leading-relaxed font-medium">
                    {storeData.storeInfo.address}
                  </p>
                  <span className="text-[#00F0FF] block pt-1 font-semibold">
                    Near Abids Shopping Center / Chirag Ali Lane
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#94A3B8] font-bold uppercase tracking-wider text-[10px]">Direct Helpline</span>
                  <p className="text-[#F8FAFC] text-sm font-extrabold">
                    <a href={`tel:${storeData.storeInfo.phoneRaw}`} className="hover:text-[#00F0FF] flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5 text-[#0066FF] fill-[#0066FF]" />
                      <span>{storeData.storeInfo.phone}</span>
                    </a>
                  </p>
                  <p className="text-[#94A3B8] pt-1">
                    WhatsApp: <span className="text-[#00F0FF] font-bold font-mono">+91 9700317171</span>
                  </p>
                </div>
              </div>

              {/* Hours Schedule Grid */}
              <div className="pt-4 border-t border-[#262F40]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F8FAFC] mb-3">
                  <Clock className="w-4 h-4 text-[#00F0FF]" />
                  <span>Showroom Working Hours</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {storeData.storeInfo.workingHours.map((wh) => {
                    const isToday = wh.day.toLowerCase() === todayName.toLowerCase();

                    return (
                      <div
                        key={wh.day}
                        className={`p-2.5 rounded-xl border text-xs transition-colors ${
                          isToday 
                            ? 'bg-[#0066FF]/20 border-[#0066FF] text-[#00F0FF]' 
                            : 'bg-[#0E121B] border-[#262F40] text-[#94A3B8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#F8FAFC]">{wh.day}</span>
                          {isToday && (
                            <span className="text-[9px] uppercase font-extrabold bg-[#0066FF] text-[#F8FAFC] px-1.5 py-0.2 rounded">
                              Today
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#94A3B8] mt-0.5 font-mono">{wh.time}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-[#262F40] h-64 sm:h-80 bg-[#141923] relative">
              <iframe
                title="Sikandar's Mobile Store Location Map"
                src="https://maps.google.com/maps?q=17.387140,78.473550&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-125 grayscale-[40%]"
              />
              <div className="absolute bottom-3 left-3 bg-[#0A0D14]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#262F40] text-xs text-[#F8FAFC] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                <span>Jagdish Market, Chirag Ali Lane, Abids &amp; Koti</span>
              </div>
            </div>

          </div>

          {/* Right Column: Instant Message / Inquiry Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="surface-card p-6 sm:p-8 space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#F8FAFC]">Send Direct Inquiry</h3>
                <p className="text-xs text-[#94A3B8]">
                  Have a specific model in mind or need a valuation quote? Send a message directly to Sikandar Bhai.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/40 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-[#00F0FF] mx-auto" />
                  <h4 className="text-base font-bold text-[#F8FAFC]">Message Dispatched!</h4>
                  <p className="text-xs text-[#94A3B8]">
                    Your query was forwarded to Sikandar Bhai via WhatsApp. He will reply shortly!
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-[#00F0FF] underline font-bold mt-2"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider text-[11px]">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#0E121B] border border-[#262F40] focus:border-[#0066FF] rounded-xl px-4 py-3 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider text-[11px]">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-[#0E121B] border border-[#262F40] focus:border-[#0066FF] rounded-xl px-4 py-3 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#94A3B8] mb-1.5 uppercase tracking-wider text-[11px]">
                      Device Model / Inquiry Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Inquiring about iPhone 16 Pro Max 256GB or trade-in value for S23 Ultra..."
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      className="w-full bg-[#0E121B] border border-[#262F40] focus:border-[#0066FF] rounded-xl p-4 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary-cobalt py-3.5 px-4 text-xs font-bold gap-2 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Query to Sikandar Bhai</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
