import React from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Star, 
  ExternalLink
} from 'lucide-react';
import { storeData, createWhatsAppUrl, CASHIFY_APP_URL } from '../data/storeData';

export default function Footer() {
  return (
    <footer className="bg-[#070910] border-t border-[#262F40] pt-16 pb-24 sm:pb-12 text-[#94A3B8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#262F40]">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#141923] border border-[#262F40] flex items-center justify-center font-extrabold text-[#00F0FF] text-base shadow-[0_4px_14px_rgba(0,102,255,0.3)]">
                SM
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#F8FAFC]">
                  Sikandar's <span className="text-[#0066FF]">Mobile Store</span>
                </h3>
                <p className="text-[11px] text-[#94A3B8] font-mono">CERTIFIED PRE-OWNED iPHONES • ABIDS &amp; KOTI</p>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed pr-4 font-normal">
              Hyderabad’s dedicated showroom for buying certified pre-owned Apple iPhones from iPhone 12 mini up to iPhone 18 Pro Max in every color and storage variant. Transparently priced at Cashify App Rate + ₹500 only with 3uTools live inspection and 6-month store warranty.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[#F8FAFC]">
              <div className="flex text-[#00F0FF]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#00F0FF]" />
                ))}
              </div>
              <span className="font-extrabold text-[#F8FAFC] font-mono">4.9 / 5</span>
              <span className="text-[#94A3B8]">• Over 242+ Verified Google Reviews</span>
            </div>
          </div>

          {/* Column 2: iPhone Buy Catalog */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
              Buy iPhones (12 – 18 Pro)
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 18 Pro &amp; 18 Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 17, 17 Air &amp; 17 Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 16, 16 Plus &amp; 16 Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 15, 15 Plus &amp; 15 Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 14, 14 Plus &amp; 14 Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 12 &amp; 13 (mini, Pro, Pro Max)</a></li>
            </ul>
          </div>

          {/* Column 3: Buy Transparency & App Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
              Buy Guarantees
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <a href={CASHIFY_APP_URL} target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] hover:underline font-semibold flex items-center gap-1">
                  <span>Cashify App Reference (+₹500)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">All Colors &amp; Storage (64GB–2TB)</a></li>
              <li><a href="#gallery" className="hover:text-[#00F0FF] transition-colors">3uTools Live Inspection Desk</a></li>
              <li><a href="#faq" className="hover:text-[#00F0FF] transition-colors">6-Month Store Warranty Policy</a></li>
              <li><a href="#customer-reviews" className="hover:text-[#00F0FF] transition-colors">Verified Buyer Reviews</a></li>
              <li><a href="#location" className="hover:text-[#00F0FF] transition-colors">Same-Day Delivery in Hyderabad</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
              Showroom Contact
            </h4>
            <div className="space-y-2.5 text-[#94A3B8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  Chirag Ali Lane, Jagdish Market (Abids &amp; Koti), Hyderabad, Telangana - 500001
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0066FF] shrink-0" />
                <a href={`tel:${storeData.storeInfo.phoneRaw}`} className="hover:text-[#00F0FF] font-semibold text-[#F8FAFC] font-mono">
                  {storeData.storeInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#00F0FF] shrink-0" />
                <a 
                  href={createWhatsAppUrl("Hi Sikandar Bhai, I want to buy a certified pre-owned iPhone from your Abids store.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00F0FF] font-semibold text-[#00F0FF] font-mono"
                >
                  WhatsApp: +91 9700317171
                </a>
              </div>

              <div className="pt-1">
                <span className="text-[11px] text-[#94A3B8] block font-medium font-mono">
                  Mon – Sat: 11:00 AM – 10:00 PM
                </span>
                <span className="text-[10px] text-[#00F0FF] font-semibold">
                  Open Today for Walk-in Pickup
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 space-y-4 text-slate-500 text-[11px]">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> Apple, iPhone, Super Retina, TrueTone, FaceID are trademarks of Apple Inc. Cashify is referenced purely as an industry price benchmark via the official Play Store app. Sikandar’s Mobile Store is an independent certified pre-owned iPhone retailer in Abids &amp; Koti, Hyderabad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#262F40]">
            <p>
              © 2026 Sikandar’s Mobile Store — Certified Pre-Owned iPhones. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 text-[#94A3B8]">
              <a href="#location" className="hover:text-[#F8FAFC]">Showroom Location</a>
              <span>•</span>
              <a href="#customer-reviews" className="hover:text-[#F8FAFC]">Google Reviews (4.9★)</a>
              <span>•</span>
              <a href={storeData.storeInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F8FAFC] flex items-center gap-1">
                Google Maps <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
