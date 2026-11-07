import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Sparkles,
  Phone
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = storeData.faqs || [];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 relative bg-[#070912] border-t border-amber-500/20 content-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            Everything you need to know about purchasing pre-owned iPhones, warranties, and repairs at Sikandar’s Mobile Store.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl glass-luxury border border-amber-500/20 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white/5 text-amber-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-amber-500/20' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner */}
        <div className="mt-10 text-center p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-white">Still have a question not answered here?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Sikandar Bhai is always available to answer your technical questions.</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${storeData.storeInfo.phoneRaw}`}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Store</span>
            </a>

            <a
              href={createWhatsAppUrl("Hi Sikandar Bhai, I have a specific question about an iPhone purchase/repair.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs transition-all shadow-md shadow-emerald-500/20"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
