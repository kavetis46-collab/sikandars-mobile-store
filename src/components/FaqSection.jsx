import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
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
    <section className="py-16 sm:py-24 relative bg-[#0A0D14] border-t border-[#262F40] content-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-[#94A3B8] text-sm sm:text-base">
            Everything you need to know about purchasing pre-owned iPhones, Samsung Galaxy, Pixel, warranties, and repairs at Sikandar’s Mobile Store.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl bg-[#141923] border border-[#262F40] overflow-hidden transition-colors hover:border-[#0066FF]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-[#F8FAFC]">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-[#0E121B] text-[#00F0FF] transition-transform duration-200 shrink-0 border border-[#262F40] ${isOpen ? 'rotate-180 bg-[#0066FF] text-[#F8FAFC]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#262F40] pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner with 1px #262F40 and 16px radius */}
        <div className="mt-10 text-center p-6 rounded-2xl bg-[#141923] border border-[#262F40] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-[#F8FAFC]">Still have a question not answered here?</h4>
            <p className="text-xs text-[#94A3B8] mt-0.5">Sikandar Bhai is always available to answer your technical questions directly.</p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${storeData.storeInfo.phoneRaw}`}
              className="btn-secondary-titanium px-4 py-2.5 text-xs font-semibold gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono">Call Showroom</span>
            </a>

            <a
              href={createWhatsAppUrl("Hi Sikandar Bhai, I have a specific question about a device purchase/repair.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-cobalt px-5 py-2.5 text-xs font-bold gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
