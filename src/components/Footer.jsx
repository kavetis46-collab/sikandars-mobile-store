import React from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  ExternalLink
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

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
                <p className="text-[11px] text-[#94A3B8] font-mono">FLAGSHIP SALES &amp; SERVICE • ABIDS &amp; KOTI</p>
              </div>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed pr-4 font-normal">
              Sikandar’s Mobile Store is Hyderabad’s premier destination for genuine pre-owned flagship smartphones in pristine condition at honest prices. Specializing in Apple iPhones, Samsung Galaxy S-Series, Google Pixel &amp; OnePlus with verified battery health and 6-month store warranty.
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

          {/* Column 2: Inventory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
              Flagship Vault
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 16 Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">Samsung Galaxy S24 Ultra</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">Google Pixel 9 Pro XL</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">OnePlus 12 5G</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 15 Pro &amp; Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-[#00F0FF] transition-colors">iPhone 14 &amp; 13 Series</a></li>
            </ul>
          </div>

          {/* Column 3: Repair & Trade-In */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">
              Services &amp; Programs
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li><a href="#services" className="hover:text-[#00F0FF] transition-colors">TrueTone Screen Calibration</a></li>
              <li><a href="#services" className="hover:text-[#00F0FF] transition-colors">Genuine Battery Replacement</a></li>
              <li><a href="#trade-in" className="hover:text-[#00F0FF] transition-colors">Spot Device-to-Device Exchange</a></li>
              <li><a href="#trade-in" className="hover:text-[#00F0FF] transition-colors">Instant Cash for Old Flagships</a></li>
              <li><a href="#services" className="hover:text-[#00F0FF] transition-colors">Motherboard IC Micro-soldering</a></li>
              <li><a href="#services" className="hover:text-[#00F0FF] transition-colors">Doorstep Delivery in Hyderabad</a></li>
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
                  href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to enquire about flagship phones or service.")}
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
                  Open Today for Walk-in Handover
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 space-y-4 text-slate-500 text-[11px]">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> Apple, iPhone, Super Retina, TrueTone, FaceID are trademarks of Apple Inc. Samsung, Galaxy are trademarks of Samsung Electronics Co., Ltd. Google, Pixel are trademarks of Google LLC. OnePlus is a trademark of OnePlus Technology (Shenzhen) Co., Ltd. Sikandar’s Mobile Store is an independent certified pre-owned electronics dealer and third-party repair specialist and is not affiliated with or endorsed by these manufacturers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#262F40]">
            <p>
              © 2026 “Sikandar’sMobile store - iPHONE &amp; FLAGSHIP SALES AND SERVICE”. All Rights Reserved.
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
