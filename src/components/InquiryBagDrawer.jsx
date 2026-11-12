import React from "react";
import { X, ShoppingCart, Trash2, MessageCircle, Plus, Minus, Cpu, HardDrive, ShieldCheck } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatINR } from "../data/storeData";
import { buildWhatsAppEnquiryUrl } from "../lib/api";

export default function InquiryBagDrawer() {
  const {
    isBagOpen,
    setIsBagOpen,
    cartItems,
    updateCartQty,
    removeFromCart,
    clearCart,
    shopSettings,
  } = useStore();

  if (!isBagOpen) return null;

  const totalUnits = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (Number(item.storePrice) || 0) * (item.qty || 1),
    0
  );

  const handleWhatsAppCheckout = () => {
    const lines = cartItems
      .map(
        (item, i) =>
          `${i + 1}. ${item.name} x${item.qty || 1} — ${item.selectedStorage}, ${item.selectedColor} (${item.selectedCondition}) @ ${formatINR(item.storePrice)}`
      )
      .join("\n");
    const msg = `Hello Sikandar Mobile Store! I am interested in purchasing:\n${lines}\nTotal: ${formatINR(totalAmount)}.\nAre these devices available?`;
    window.open(
      buildWhatsAppEnquiryUrl(shopSettings.whatsapp, { customMessage: msg }),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#08090C]/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-cart-title"
    >
      <div className="absolute inset-0" onClick={() => setIsBagOpen(false)} />

      <div className="relative z-10 w-full max-w-md bg-[#111318] border-l border-[#C5C7CC]/15 h-full flex flex-col shadow-2xl">
        <div className="p-5 sm:p-6 border-b border-[#C5C7CC]/15 flex items-center justify-between bg-[#08090C]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3478F6]/15 border border-[#3478F6]/35 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-[#3478F6]" />
            </div>
            <div>
              <h2 id="drawer-cart-title" className="text-lg font-extrabold text-white">
                Buy Cart ({totalUnits})
              </h2>
              <p className="text-xs text-[#858A94]">Ready for Showroom Reservation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsBagOpen(false)}
            aria-label="Close Cart"
            className="w-9 h-9 rounded-lg bg-[#08090C] border border-[#C5C7CC]/15 flex items-center justify-center text-[#858A94] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingCart className="w-10 h-10 text-[#858A94] mb-3" />
              <p className="text-sm font-bold text-white">Your cart is empty</p>
              <p className="text-xs text-[#858A94] mt-1 max-w-xs">
                Pick storage and finish on any iPhone card to add it to your enquiry cart.
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              const qty = item.qty || 1;
              return (
                <div
                  key={item.cartKey}
                  className="p-4 rounded-2xl bg-[#08090C] border border-[#C5C7CC]/15 flex gap-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-contain rounded-xl bg-[#111318] p-1 border border-[#C5C7CC]/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartKey)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#858A94] hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1.5 text-[10px]">
                      {item.ram && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#111318] border border-[#C5C7CC]/15 text-[#C5C7CC]">
                          <Cpu className="w-2.5 h-2.5 text-[#3478F6]" />
                          {item.ram}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#111318] border border-[#C5C7CC]/15 text-white font-semibold">
                        <HardDrive className="w-2.5 h-2.5 text-[#858A94]" />
                        {item.selectedStorage}
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#3478F6]/15 border border-[#3478F6]/30 text-[#93C5FD]">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        {item.selectedCondition}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#858A94] mt-1">
                      Colour: <span className="text-white">{item.selectedColor}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#C5C7CC]/10">
                      <span className="text-sm font-extrabold text-white tabular-nums">
                        {formatINR((item.storePrice || 0) * qty)}
                      </span>
                      <div className="inline-flex items-center rounded-lg bg-[#111318] border border-[#C5C7CC]/15">
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.cartKey, qty - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#C5C7CC] hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-white tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.cartKey, qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#C5C7CC] hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#C5C7CC]/15 bg-[#08090C]/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#858A94]">
                Total ({totalUnits} items)
              </span>
              <span className="text-xl font-extrabold text-white tabular-nums">
                {formatINR(totalAmount)}
              </span>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-rose-400 hover:underline cursor-pointer"
            >
              Clear All Cart Items
            </button>

            <button
              type="button"
              onClick={handleWhatsAppCheckout}
              className="w-full btn-electric py-3.5 text-sm gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Reserve Order on WhatsApp ({formatINR(totalAmount)})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
