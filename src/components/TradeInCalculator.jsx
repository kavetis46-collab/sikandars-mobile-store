import React, { useState } from 'react';
import { 
  Repeat, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Smartphone, 
  ShieldCheck, 
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
        colors: ['#0066FF', '#00F0FF', '#F8FAFC']
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

Please confirm today's spot offer and let me know when I can visit your Abids showroom.`;
  };

  return (
    <section id="trade-in" className="py-16 sm:py-24 relative overflow-hidden bg-[#0A0D14] border-t border-[#262F40] content-auto">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-3">
            <Repeat className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Instant Hyderabad Spot Trade-In Valuation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Trade In Your Old Smartphone for <br />
            <span className="text-gradient-cobalt">iPhone 16 Pro Max or Galaxy S24 Ultra</span>
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Get Hyderabad’s highest spot valuation. No lowball estimates, no shipping delays. Instant cash payout or direct trade-in upgrade right at our Abids &amp; Koti counter.
          </p>
        </div>

        {/* Main Calculator Box: 1px #262F40 with 16px radius */}
        <div className="max-w-4xl mx-auto surface-card p-6 sm:p-10 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Select Model */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                  1. Select Your Current Smartphone
                </label>
                <div className="relative">
                  <select
                    value={selectedModelIndex}
                    onChange={(e) => {
                      setSelectedModelIndex(Number(e.target.value));
                      handleCalculate();
                    }}
                    className="w-full bg-[#0E121B] border border-[#262F40] focus:border-[#0066FF] rounded-xl px-4 py-3.5 text-[#F8FAFC] font-bold text-sm appearance-none focus:outline-none transition-colors"
                  >
                    {models.map((item, idx) => (
                      <option key={item.model} value={idx} className="bg-[#141923] text-white">
                        {item.model} ({item.storage})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#00F0FF]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Step 2: Select Condition */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                    2. Device Physical Condition
                  </label>
                  <span className="text-[11px] text-[#00F0FF] font-medium font-mono">Transparent grading = exact payout</span>
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
                        ? 'bg-[#0066FF]/20 border-[#0066FF] text-[#00F0FF] shadow-[0_4px_14px_rgba(0,102,255,0.3)]'
                        : 'bg-[#0E121B] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#00F0FF]'
                    }`}
                  >
                    <div className="text-xs font-bold">Flawless</div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">Scratchless 10/10</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCondition('good');
                      handleCalculate();
                    }}
                    className={`py-3 px-2 rounded-xl text-center border transition-all ${
                      condition === 'good'
                        ? 'bg-[#0066FF]/20 border-[#0066FF] text-[#00F0FF] shadow-[0_4px_14px_rgba(0,102,255,0.3)]'
                        : 'bg-[#0E121B] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#00F0FF]'
                    }`}
                  >
                    <div className="text-xs font-bold">Good</div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">Minor wear</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCondition('fair');
                      handleCalculate();
                    }}
                    className={`py-3 px-2 rounded-xl text-center border transition-all ${
                      condition === 'fair'
                        ? 'bg-[#0066FF]/20 border-[#0066FF] text-[#00F0FF] shadow-[0_4px_14px_rgba(0,102,255,0.3)]'
                        : 'bg-[#0E121B] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#00F0FF]'
                    }`}
                  >
                    <div className="text-xs font-bold">Fair</div>
                    <div className="text-[10px] text-[#94A3B8] mt-0.5">Scratches / signs of use</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Upgrade Target */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                  3. Upgrading To
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'iPhone 16 Pro Max (Desert)', 
                    'Galaxy S24 Ultra 5G', 
                    'Google Pixel 9 Pro XL', 
                    'Instant Cash Payout'
                  ].map((target) => (
                    <button
                      key={target}
                      type="button"
                      onClick={() => setTargetUpgrade(target)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border text-left truncate transition-colors ${
                        targetUpgrade === target 
                          ? 'bg-[#0066FF]/20 border-[#0066FF] text-[#00F0FF]' 
                          : 'bg-[#0E121B] border-[#262F40] text-[#94A3B8] hover:text-[#F8FAFC]'
                      }`}
                    >
                      {target}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-[#0E121B] rounded-xl p-6 border border-[#262F40] text-center space-y-5 shadow-2xl relative">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(0,102,255,0.15)] border border-[rgba(0,102,255,0.3)] text-[#00F0FF] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Estimated Spot Valuation</span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-[#F8FAFC] font-mono tabular-nums tracking-tight">
                  ₹{estimatedValue.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-[#00F0FF] font-bold">
                  Guaranteed Spot Market Valuation
                </p>
              </div>

              {/* Breakdown */}
              <div className="bg-[#141923] rounded-xl p-3.5 text-xs text-left space-y-2 border border-[#262F40]">
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Selected Device:</span>
                  <span className="font-bold text-[#F8FAFC]">{currentItem.model}</span>
                </div>
                <div className="flex justify-between text-[#94A3B8]">
                  <span>Condition Grade:</span>
                  <span className="font-bold text-[#00F0FF] capitalize">{condition}</span>
                </div>
                <div className="flex justify-between text-[#94A3B8] pt-1 border-t border-[#262F40]">
                  <span>Upgrade Target:</span>
                  <span className="font-bold text-[#F8FAFC]">{targetUpgrade}</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Direct Dialer */}
              <div className="space-y-2.5">
                <a
                  href={createWhatsAppUrl(getWhatsAppExchangeText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary-cobalt py-3.5 px-4 text-xs font-bold gap-2 group active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Lock In Quote on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={`tel:${storeData.storeInfo.phoneRaw}`}
                  className="w-full btn-secondary-titanium py-2.5 px-4 text-xs font-semibold gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="font-mono">Call to Verify: {storeData.storeInfo.phone}</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
