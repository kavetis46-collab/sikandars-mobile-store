import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  ArrowRight 
} from 'lucide-react';
import { createWhatsAppUrl } from '../data/storeData';

export default function InquiryBagDrawer({ isOpen, onClose, items, onRemoveItem, onClearBag }) {
  const [customerNote, setCustomerNote] = useState('');

  if (!isOpen) return null;

  const getConsolidatedWhatsAppMessage = () => {
    let msg = `Hi Sikandar Bhai! I selected the following certified iPhone(s) to BUY from your showroom website:\n\n`;

    items.forEach((item, index) => {
      const variantLabel = item.selectedStorage ? `${item.selectedStorage}` : '';
      const colorLabel = item.selectedColor ? ` • ${item.selectedColor}` : '';
      const variantDetails = variantLabel || colorLabel ? ` (${variantLabel}${colorLabel})` : '';
      msg += `${index + 1}. ${item.name}${variantDetails} — Buy Price: ${item.price}\n   Condition: ${item.condition} | Battery: ${item.batteryHealth}\n`;
    });

    if (customerNote) {
      msg += `\nCustomer Note: ${customerNote}\n`;
    }

    msg += `\nPlease confirm availability for pickup at your Abids showroom or Hyderabad doorstep delivery!`;
    return msg;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0A0D14]/80 backdrop-blur-md transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141923] border-l border-[#262F40] p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,102,255,0.25)] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#262F40]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#0066FF]/15 text-[#00F0FF]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#F8FAFC]">Your Inquiry Bag</h3>
                  <p className="text-xs text-[#94A3B8] font-mono">{items.length} flagship device(s) selected</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-[#0E121B] hover:bg-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#262F40] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-5 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {items.length === 0 ? (
                <div className="text-center py-12 text-[#94A3B8] space-y-2">
                  <ShoppingBag className="w-12 h-12 text-[#262F40] mx-auto" />
                  <p className="text-sm font-semibold text-[#F8FAFC]">Your bag is currently empty</p>
                  <p className="text-xs text-[#94A3B8]">
                    Browse our flagship inventory and click "Add" to prepare a consolidated WhatsApp reservation.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-[#0E121B] border border-[#262F40] flex items-center gap-3.5 justify-between group hover:border-[#0066FF] transition-colors"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-contain rounded-lg bg-[#141923] p-1 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#F8FAFC] truncate">{item.name}</h4>
                      {(item.selectedStorage || item.selectedColor) && (
                        <div className="text-[11px] text-[#94A3B8] truncate">
                          {item.selectedStorage} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                        </div>
                      )}
                      <div className="text-[11px] text-[#00F0FF] font-extrabold font-mono tabular-nums">{item.price}</div>
                      <div className="flex items-center gap-2 text-[10px] text-[#94A3B8] mt-1 font-mono">
                        <span>{item.batteryHealth}</span>
                        <span>•</span>
                        <span>{item.condition}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 rounded-lg text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Note field */}
            {items.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#262F40]">
                <label className="block text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-1.5">
                  Optional Note (Pickup Time or Delivery Address):
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Want to pick up at 6 PM today in Abids, or deliver to Banjara Hills."
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="w-full bg-[#0E121B] border border-[#262F40] rounded-xl p-2.5 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none focus:border-[#0066FF] resize-none"
                />
              </div>
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-[#262F40] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span>Total Devices:</span>
                <span className="font-bold text-[#F8FAFC] font-mono">{items.length} Item(s)</span>
              </div>

              <a
                href={createWhatsAppUrl(getConsolidatedWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-primary-cobalt py-3.5 px-4 text-xs font-bold gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Reservation to Sikandar Bhai</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onClearBag}
                className="w-full text-center text-xs text-[#94A3B8] hover:text-red-400 transition-colors py-1"
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
