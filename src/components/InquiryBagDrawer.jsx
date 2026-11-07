import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight, 
  BatteryCharging, 
  ShieldCheck
} from 'lucide-react';
import { createWhatsAppUrl } from '../data/storeData';

export default function InquiryBagDrawer({ isOpen, onClose, items, onRemoveItem, onClearBag }) {
  const [customerNote, setCustomerNote] = useState('');

  if (!isOpen) return null;

  const getConsolidatedWhatsAppMessage = () => {
    let msg = `Hi Sikandar Bhai! I selected the following phone(s) from your website and want to check availability & reserve for pickup:\n\n`;

    items.forEach((item, index) => {
      msg += `${index + 1}. ${item.name} (${item.price})\n   Condition: ${item.condition} | Battery: ${item.batteryHealth}\n`;
    });

    if (customerNote) {
      msg += `\nCustomer Note: ${customerNote}\n`;
    }

    msg += `\nPlease let me know if these are ready for pickup at your Jagdish Market store or if doorstep delivery is available!`;
    return msg;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#11131c] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Your Inquiry Bag</h3>
                  <p className="text-xs text-slate-400">{items.length} item(s) selected</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-5 space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
              {items.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">Your bag is currently empty</p>
                  <p className="text-xs text-slate-500">
                    Browse our stock and click "Add to Bag" on any device to prepare a unified quote.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#171a26] border border-white/5 flex items-center gap-3.5 justify-between group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-contain rounded-lg bg-black/40 p-1 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <div className="text-[11px] text-emerald-400 font-semibold">{item.price}</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>{item.batteryHealth}</span>
                        <span>•</span>
                        <span>{item.condition}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Note field */}
            {items.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Optional Note (Trade-in details or inquiry):
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Also have an iPhone 12 to exchange, or prefer evening pickup."
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="w-full bg-[#181b28] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Items:</span>
                <span className="font-bold text-white">{items.length} Device(s)</span>
              </div>

              <a
                href={createWhatsAppUrl(getConsolidatedWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wide shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Full Inquiry to Sikandar Bhai</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClearBag}
                className="w-full text-center text-xs text-slate-500 hover:text-red-400 transition-colors py-1"
              >
                Clear all items from bag
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
