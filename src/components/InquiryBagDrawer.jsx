import React from "react";
import { X, ShoppingCart, Trash2, MessageCircle, Sparkles, Plus, Minus, Cpu, HardDrive, ShieldCheck } from "lucide-react";
import { createWhatsAppUrl, formatINR, CONDITION_GRADES } from "../data/storeData";

export default function InquiryBagDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}) {
  if (!isOpen) return null;

  const totalUnits = items.reduce((sum, item) => sum + (item.qty || 1), 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + (Number(item.storePrice) || 0) * (item.qty || 1),
    0
  );
  const totalCashifyAmount = items.reduce(
    (sum, item) => sum + (Number(item.cashifyPrice) || 0) * (item.qty || 1),
    0
  );

  const handleBulkWhatsApp = () => {
    const listText = items
      .map((item, idx) => {
        const condObj = CONDITION_GRADES.find((g) => g.id === item.selectedCondition) || CONDITION_GRADES[1];
        const qty = item.qty || 1;
        return `${idx + 1}. ${item.name} × ${qty} [${item.ram || ""} | ${
          item.selectedStorage || ""
        } | ${condObj.label} Condition | ${item.selectedColor || "Default"}] (${item.price} each, Cashify ${formatINR(
          item.cashifyPrice || 0
        )} + ₹500)`;
      })
      .join("\n");

    const message = `Hi Sikandar Bhai! I want to buy these certified iPhones from your cart (Total ${formatINR(
      totalAmount
    )}):\n${listText}\n\nPlease confirm availability & 3uTools report at Jagdish Market, Abids!`;
    window.open(createWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0A0D14]/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md bg-[#141923] border-l border-[#262F40] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#262F40] flex items-center justify-between bg-[#0A0D14]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/35 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <div>
              <h2 id="cart-drawer-title" className="text-lg font-bold text-[#F8FAFC]">
                Buy Cart ({totalUnits})
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Every item priced at Cashify App + ₹500
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Cart Drawer"
            className="w-9 h-9 rounded-lg bg-[#141923] hover:bg-[#1e2636] border border-[#262F40] flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-[#0A0D14] border border-[#262F40] flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-[#94A3B8]" />
              </div>
              <p className="text-[#F8FAFC] font-semibold mb-1">Your buy cart is empty</p>
              <p className="text-xs text-[#94A3B8] max-w-xs leading-relaxed">
                Select any iPhone (12 mini to 18 Pro Max), pick Condition (Fair / Good / Superb), Storage, and Color, then tap Add to Cart.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const condObj = CONDITION_GRADES.find((g) => g.id === item.selectedCondition) || CONDITION_GRADES[1];
              const qty = item.qty || 1;
              const lineTotal = (Number(item.storePrice) || 0) * qty;

              return (
                <div
                  key={item.cartKey}
                  className="p-4 rounded-xl bg-[#0A0D14] border border-[#262F40] flex gap-3.5 group"
                >
                  <div className="w-16 h-20 rounded-xl bg-[#141923] border border-[#262F40] flex items-center justify-center p-1.5 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#F8FAFC] truncate">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartKey)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#94A3B8] hover:text-rose-400 p-1 shrink-0 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Variant Meta Tags: RAM, Storage, Condition, Color */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      {item.ram && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-1.5 py-0.5 rounded">
                          <Cpu className="w-2.5 h-2.5" />
                          {item.ram}
                        </span>
                      )}
                      {item.selectedStorage && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#F8FAFC] bg-[#141923] border border-[#262F40] px-1.5 py-0.5 rounded">
                          <HardDrive className="w-2.5 h-2.5 text-[#94A3B8]" />
                          {item.selectedStorage}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#00F0FF] bg-[#0066FF]/15 border border-[#0066FF]/35 px-1.5 py-0.5 rounded">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        {condObj.label}
                      </span>
                    </div>

                    {item.selectedColor && (
                      <div className="text-[11px] text-[#94A3B8] mt-1">
                        Color: <span className="text-[#F8FAFC] font-medium">{item.selectedColor}</span>
                      </div>
                    )}

                    {/* Price & Quantity Stepper */}
                    <div className="flex items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[#262F40]/70">
                      <div>
                        <div className="text-sm font-extrabold text-[#F8FAFC] tabular-nums">
                          {formatINR(lineTotal)}
                        </div>
                        {item.cashifyPrice && (
                          <div className="text-[10px] text-[#00F0FF] font-semibold tabular-nums">
                            {formatINR(item.cashifyPrice)} + ₹500 / unit
                          </div>
                        )}
                      </div>

                      <div className="inline-flex items-center rounded-lg bg-[#141923] border border-[#262F40]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.cartKey, qty - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1e2636] rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#F8FAFC] tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.cartKey, qty + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1e2636] rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Totals & Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#262F40] bg-[#0A0D14]/90 space-y-3">
            <div className="rounded-xl bg-[#141923] border border-[#262F40] p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span>Cashify App Base ({totalUnits} {totalUnits === 1 ? "unit" : "units"})</span>
                <span className="font-mono tabular-nums text-[#F8FAFC]">{formatINR(totalCashifyAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#00F0FF]">
                <span>Store Inspection &amp; Warranty Fee (₹500/unit)</span>
                <span className="font-mono tabular-nums">+{formatINR(totalUnits * 500)}</span>
              </div>
              <div className="pt-2 border-t border-[#262F40] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">Total Payable</span>
                <span className="text-xl font-extrabold text-[#F8FAFC] tabular-nums">{formatINR(totalAmount)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
                Abids Showroom Pickup • Cash/UPI
              </span>
              <button
                type="button"
                onClick={onClearBag}
                className="text-rose-400 hover:text-rose-300 font-semibold transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <button
              type="button"
              onClick={handleBulkWhatsApp}
              className="w-full btn-primary-cobalt py-3.5 text-sm font-bold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Checkout &amp; Reserve via WhatsApp ({formatINR(totalAmount)})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
