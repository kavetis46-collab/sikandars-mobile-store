import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How do I know every iPhone is genuine inside with zero fake screen or boosted battery?",
    a: "At our Jagdish Market, Abids showroom, we connect the iPhone to 3uTools and run hardware diagnostics directly in front of you before checkout — verifying true battery health, original display/Face ID serials, camera focus, and zero unauthorized part warnings.",
  },
  {
    q: "How does your pricing work compared to the Cashify App?",
    a: "Our transparent store pricing follows the Cashify App benchmark price plus just ₹500 showroom service margin across eligible iPhones — with zero waiting for couriers, in-person physical inspection, instant data transfer, and an authorized bill.",
  },
  {
    q: "Are devices iCloud unlocked and safe from Activation Lock?",
    a: "Yes. Every device is checked for Find My iPhone OFF, clean IMEI/serial matching, and proper previous ownership verification before being added to inventory.",
  },
  {
    q: "How does the Phone Exchange enquiry work?",
    a: "Submit your existing brand, model, storage, battery health, condition, and photos through our Exchange form. Our team manually reviews your hardware and contacts you with a genuine evaluation instead of a misleading automated guess.",
  },
  {
    q: "Do you offer warranty or a testing window?",
    a: "Yes. Eligible devices include our documented 6-month store testing warranty and a 7-day functional verification guarantee at our Abids showroom.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#C5C7CC]/10"
    >
      <div className="text-center mb-10">
        <span className="pill-titanium mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#3478F6]" />
          <span>Buyer Clarity</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.q} className="surface-charcoal overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                aria-expanded={isOpen}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-white">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#3478F6] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-[#C5C7CC] leading-relaxed border-t border-[#C5C7CC]/10 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
