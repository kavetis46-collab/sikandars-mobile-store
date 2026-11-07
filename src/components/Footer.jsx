import React from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Star, 
  Heart,
  ExternalLink
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function Footer() {
  return (
    <footer className="bg-[#07080c] border-t border-white/10 pt-16 pb-24 sm:pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center font-bold text-white text-base">
                SM
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Sikandar's <span className="text-emerald-400">Mobile Store</span>
                </h3>
                <p className="text-[11px] text-slate-400">iPHONE SALES AND SERVICE</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pr-4">
              Sikandar’s Mobile Store is Hyderabad’s trusted destination for genuine pre-owned iPhones in pristine condition at honest prices. Specializing in verified battery health, 60-point quality checks, spot phone exchange, and chip-level Apple care.
            </p>

            <div className="flex items-center gap-2 pt-1 text-slate-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5</span>
              <span>• Over 242+ Verified Google Reviews</span>
            </div>
          </div>

          {/* Column 2: Inventory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Popular Stock
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#inventory" className="hover:text-emerald-400 transition-colors">iPhone 16 Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-emerald-400 transition-colors">iPhone 15 Pro &amp; Pro Max</a></li>
              <li><a href="#inventory" className="hover:text-emerald-400 transition-colors">iPhone 14 &amp; 14 Pro</a></li>
              <li><a href="#inventory" className="hover:text-emerald-400 transition-colors">iPhone 13 &amp; 12 Series</a></li>
              <li><a href="#inventory" className="hover:text-emerald-400 transition-colors">Samsung S24 Ultra &amp; Folds</a></li>
              <li><a href="#inventory" className="hover:text-emerald-400 transition-colors">Original MagSafe Accessories</a></li>
            </ul>
          </div>

          {/* Column 3: Repair & Trade-In */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Services &amp; Programs
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">TrueTone Screen Replacement</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Battery Health Upgrade</a></li>
              <li><a href="#trade-in" className="hover:text-emerald-400 transition-colors">Mobile-to-Mobile Exchange</a></li>
              <li><a href="#trade-in" className="hover:text-emerald-400 transition-colors">Instant Cash for Old Phones</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Motherboard IC Micro-soldering</a></li>
              <li><a href="#services" className="hover:text-emerald-400 transition-colors">Doorstep Delivery in Hyd</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Store Contact
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  Chirag Ali Lane, Jagdish Market, Abids, Hyderabad, Telangana - 500001
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${storeData.storeInfo.phoneRaw}`} className="hover:text-emerald-400 font-semibold text-white">
                  {storeData.storeInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to enquire about phones or service.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-semibold text-emerald-400"
                >
                  WhatsApp: +91 9700317171
                </a>
              </div>

              <div className="pt-1">
                <span className="text-[11px] text-slate-400 block font-medium">
                  Mon – Sat: 11:00 AM – 10:00 PM
                </span>
                <span className="text-[10px] text-emerald-400">
                  Open Today for Walk-ins
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 space-y-4 text-slate-500 text-[11px]">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> Apple, iPhone, Super Retina, TrueTone, FaceID, iPad, and MagSafe are trademarks of Apple Inc., registered in the U.S. and other countries. Sikandar’s Mobile Store is an independent pre-owned electronics dealer and third-party repair specialist and is not affiliated with, sponsored by, or endorsed by Apple Inc.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
            <p>
              © 2026 “Sikandar’sMobile store - iPHONE SALES AND SERVICE”. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#location" className="hover:text-white">Store Location</a>
              <span>•</span>
              <a href="#reviews" className="hover:text-white">Google Reviews (4.9★)</a>
              <span>•</span>
              <a href={storeData.storeInfo.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                Google Maps <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
