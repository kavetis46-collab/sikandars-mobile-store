import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Lock, ExternalLink } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useStore } from "../context/StoreContext";
import { buildWhatsAppEnquiryUrl } from "../lib/api";

export default function Footer() {
  const { shopSettings, products } = useStore();
  const availableTop = products.slice(0, 6);

  return (
    <footer className="bg-[#050608] border-t border-[#C5C7CC]/10 pt-14 pb-24 sm:pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#C5C7CC]/10">
          {/* Brand Column */}
          <div className="space-y-4">
            <BrandLogo showTagline={true} />
            <p className="text-xs text-[#858A94] leading-relaxed">
              Independent certified pre-owned iPhone specialist at Jagdish Market, Abids, Hyderabad. Not affiliated with or an authorized store of Apple Inc. All trademarks belong to their respective owners.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={`tel:${shopSettings.phoneRaw}`}
                className="btn-titanium px-3.5 py-2 text-xs gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#3478F6]" />
                <span>Call</span>
              </a>
              <a
                href={buildWhatsAppEnquiryUrl(shopSettings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-electric px-3.5 py-2 text-xs gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Explore Sections */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Marketplace
            </h3>
            <ul className="space-y-2.5 text-xs text-[#858A94]">
              <li><a href="/#featured-collections" className="hover:text-white transition-colors">Featured Collections</a></li>
              <li><a href="/#latest-arrivals" className="hover:text-white transition-colors">Latest Arrivals</a></li>
              <li><a href="/#best-deals" className="hover:text-white transition-colors">Best Deals</a></li>
              <li><a href="/#explore-catalogue" className="hover:text-white transition-colors">Full iPhone Catalogue</a></li>
              <li><a href="/#compare-iphones" className="hover:text-white transition-colors">Compare Models</a></li>
              <li><a href="/#exchange-phone" className="hover:text-white transition-colors">Exchange Old Phone</a></li>
            </ul>
          </div>

          {/* Direct Model Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Popular iPhone Pages
            </h3>
            <ul className="space-y-2.5 text-xs text-[#858A94]">
              {availableTop.map((p) => (
                <li key={p.id}>
                  <Link to={`/iphone/${p.slug || p.id}`} className="hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom & Admin */}
          <div className="space-y-3 text-xs text-[#858A94]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Showroom &amp; Governance
            </h3>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#3478F6] shrink-0 mt-0.5" />
              <span>{shopSettings.address}</span>
            </p>
            <p className="text-[#C5C7CC]">{shopSettings.warrantyPolicy}</p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={shopSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#C5C7CC] hover:text-white"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1 text-[#3478F6] hover:underline font-semibold"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#858A94]">
          <span>© {new Date().getFullYear()} SIKANDAR MOBILE STORE • Hyderabad</span>
          <span>PREMIUM PHONES. SMARTER PRICES.</span>
        </div>
      </div>
    </footer>
  );
}
