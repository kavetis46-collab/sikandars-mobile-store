import React from "react";
import { ArrowLeftRight, CheckCircle2, X, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { formatINR } from "../data/storeData";
import { buildWhatsAppEnquiryUrl } from "../lib/api";

export default function ComparisonSection() {
  const { products, compareIds, toggleCompare, setCompareIds, shopSettings } = useStore();

  // Default to first 3 flagship models if user hasn't picked custom comparison items yet
  const activeIds =
    compareIds.length >= 2
      ? compareIds
      : products.slice(0, 3).map((p) => p.id);

  const comparedProducts = activeIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 3);

  const handleReplaceSlot = (slotIdx, newId) => {
    const next = [...activeIds];
    next[slotIdx] = newId;
    setCompareIds([...new Set(next)]);
  };

  if (products.length === 0) return null;

  const specRows = [
    {
      label: "Selling Price",
      render: (p) => (
        <span className="text-base font-extrabold text-white tabular-nums">
          {formatINR(p.variants?.[0]?.storePrice || p.displayPrice || 0)}
        </span>
      ),
    },
    {
      label: "Storage Options",
      render: (p) => (p.variants || []).map((v) => v.storage).join(" / "),
    },
    {
      label: "Display",
      render: (p) => p.specs?.display || "Super Retina XDR OLED",
    },
    {
      label: "Camera System",
      render: (p) => p.specs?.camera || "Apple Pro Camera System",
    },
    {
      label: "Processor & RAM",
      render: (p) => `${p.specs?.chip || "Apple Silicon"} (${p.ram})`,
    },
    {
      label: "Battery Health",
      render: (p) => p.batteryHealth || "90% – 96% Health",
    },
    {
      label: "Physical Condition",
      render: (p) => p.conditionGrade || "Superb",
    },
    {
      label: "Stock Status",
      render: (p) =>
        !p.isSold && (p.stockCount ?? 1) > 0 ? (
          <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Available ({p.stockCount ?? 1})
          </span>
        ) : (
          <span className="text-rose-400 font-semibold">Sold Out</span>
        ),
    },
  ];

  return (
    <section
      id="compare-iphones"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="pill-electric mb-3">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Side-by-Side Comparison</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Compare iPhones Side by Side
          </h2>
          <p className="text-sm sm:text-base text-[#858A94] mt-2 max-w-2xl">
            Pick any two or three models from our inventory to compare cameras, processors, storage, battery health, and price side by side.
          </p>
        </div>

        {compareIds.length > 0 && (
          <button
            type="button"
            onClick={() => setCompareIds([])}
            className="btn-titanium px-4 py-2 text-xs self-start md:self-auto gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Comparison</span>
          </button>
        )}
      </div>

      <div className="surface-charcoal overflow-x-auto">
        <table className="w-full min-w-[720px] text-left border-collapse">
          <thead>
            <tr className="border-b border-[#C5C7CC]/15 bg-[#08090C]/70">
              <th className="p-5 w-48 text-xs font-bold uppercase tracking-wider text-[#858A94] align-bottom">
                Specification
              </th>
              {comparedProducts.map((prod, idx) => (
                <th key={`head-${prod.id}-${idx}`} className="p-5 align-top border-l border-[#C5C7CC]/10">
                  <div className="space-y-3">
                    <select
                      aria-label={`Select comparison slot ${idx + 1}`}
                      value={prod.id}
                      onChange={(e) => handleReplaceSlot(idx, e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#111318] border border-[#C5C7CC]/20 text-xs font-bold text-white focus:border-[#3478F6] focus:outline-none"
                    >
                      {products.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-14 h-16 object-contain rounded-lg bg-[#08090C] p-1 border border-[#C5C7CC]/10 shrink-0"
                      />
                      <div>
                        <Link
                          to={`/iphone/${prod.slug || prod.id}`}
                          className="text-sm font-extrabold text-white hover:text-[#3478F6] transition-colors block"
                        >
                          {prod.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={buildWhatsAppEnquiryUrl(shopSettings.whatsapp, {
                              name: prod.name,
                              storage: prod.variants?.[0]?.storage,
                              colour: prod.colors?.[0]?.name,
                              price: formatINR(prod.variants?.[0]?.storePrice || prod.displayPrice || 0),
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3478F6] hover:underline"
                          >
                            <MessageCircle className="w-3 h-3" /> Enquire
                          </a>
                          {compareIds.includes(prod.id) && (
                            <button
                              type="button"
                              onClick={() => toggleCompare(prod.id)}
                              className="text-[11px] text-[#858A94] hover:text-rose-400"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specRows.map((row) => (
              <tr key={row.label} className="border-b border-[#C5C7CC]/10 hover:bg-white/[0.02]">
                <td className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#858A94]">
                  {row.label}
                </td>
                {comparedProducts.map((prod, idx) => (
                  <td
                    key={`${row.label}-${prod.id}-${idx}`}
                    className="p-4 sm:p-5 text-xs sm:text-sm text-[#C5C7CC] border-l border-[#C5C7CC]/10 leading-relaxed"
                  >
                    {row.render(prod)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
