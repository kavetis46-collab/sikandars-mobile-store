import React, { useState } from 'react';
import { 
  Repeat, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Smartphone, 
  ShieldCheck, 
  Banknote,
  ArrowRight,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function TradeInCalculator() {
  const models = storeData.tradeInEstimates || [];

  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [condition, setCondition] = useState('flawless');
  const [targetUpgrade, setTargetUpgrade] = useState('iPhone 16 Pro Max');

  const currentItem = models[selectedModelIndex] || models[0] || { model: "iPhone 15 Pro Max", storage: "256GB", flawless: 74000, good: 68000, fair: 60000 };

  const getEstimatedValue = () => {
    if (condition === 'flawless') return currentItem.flawless;
    if (condition === 'good') return currentItem.good;
    return currentItem.fair;
  };

  const estimatedValue = getEstimatedValue();

  const handleCalculate = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#10b981', '#38bdf8']
      });
    } catch (e) {
      // ignore
    }
  };

  const getWhatsAppExchangeText = () => {
    return `Hi Sikandar Bhai! I checked my device trade-in quote on your website:
• Model: ${currentItem.model} (${currentItem.storage})
• Condition: ${condition.toUpperCase()}
• Estimated Value: ₹${estimatedValue.toLocaleString('en-IN')}
• Upgrading to: ${targetUpgrade}

Please confirm today's spot offer and let me know when I can visit your Jagdish Market store.`;
  };

  return (
    <section id="trade-in" className="py-16 sm:py-24 relative overflow-hidden bg-[#070912] border-t border-amber-500/20 content-auto">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Repeat className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Hyderabad Trade-In Valuation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Trade In Your Old Phone for <br />
            <span className="text-gradient-gold">iPhone 16 Pro Max</span>
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Get Hyderabad’s highest spot valuation. No lowball estimates, no shipping delays. Instant cash payout or direct trade-in upgrade right at our counter.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="max-w-4xl mx-auto glass-luxury-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Select Model */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  1. Select Your Current Smartphone
                </label>
                <div className="relative">
                  <select
                    value={selectedModelIndex}
                    onChange={(e) => {
                      setSelectedModelIndex(Number(e.target.value));
                      handleCalculate();
                    }}
                    className="w-full bg-[#121524] border border-white/15 focus:border-amber-400 rounded-xl px-4 py-3.5 text-white font-bold text-sm appearance-none focus:outline-none transition-colors"
                  >
                    {models.map((item, idx) => (
                      <option key={item.model} value={idx} className="bg-slate-900 text-white">
                        {item.model} ({item.storage})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-amber-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Step 2: Select Condition */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. Device Physical Condition
                  </label>
                  <span className="text-[11px] text-amber-400 font-medium">Honest grading = exact payout</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setCondition('flawless');
                      handleCalculate();
                    }}
                    className={`py-3 px-2 rounded-xl text-center border transition-all ${
                      condition === 'flawless'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">Flawless</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Scratchless 10/10</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCondition('good');
                      handleCalculate();
                    }}
                    className={`py-3 px-2 rounded-xl text-center border transition-all ${
                      condition === 'good'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">Good</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Minor pocket wear</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCondition('fair');
                      handleCalculate();
                    }}
                    className={`py-3 px-2 rounded-xl text-center border transition-all ${
                      condition === 'fair'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold">Fair</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Scratches / Heavy use</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Upgrade Target */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. Upgrading To
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['iPhone 16 Pro Max (Desert)', 'iPhone 16 Pro Max (Natural)', 'iPhone 16 Pro Max (Black)', 'Instant Cash Payout'].map((target) => (
                    <button
                      key={target}
                      type="button"
                      onClick={() => setTargetUpgrade(target)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border text-left truncate transition-colors ${
                        targetUpgrade === target 
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {target}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#191e30] to-[#0f121d] rounded-2xl p-6 border border-amber-500/40 text-center space-y-5 shadow-2xl relative">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Estimated Spot Valuation</span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-gradient-gold tracking-tight">
                  ₹{estimatedValue.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-emerald-400 font-bold">
                  Guaranteed Spot Market Valuation
                </p>
              </div>

              {/* Breakdown */}
              <div className="bg-black/40 rounded-xl p-3.5 text-xs text-left space-y-2 border border-white/5">
                <div className="flex justify-between text-slate-300">
                  <span>Selected Phone:</span>
                  <span className="font-bold text-white">{currentItem.model}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Condition Grade:</span>
                  <span className="font-bold text-amber-400 capitalize">{condition}</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-1 border-t border-white/10">
                  <span>Upgrade Target:</span>
                  <span className="font-bold text-emerald-400">{targetUpgrade}</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Direct Dialer */}
              <div className="space-y-2.5">
                <a
                  href={createWhatsAppUrl(getWhatsAppExchangeText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>Lock In Quote on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={`tel:${storeData.storeInfo.phoneRaw}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call to Verify: {storeData.storeInfo.phone}</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
