import React, { useState } from 'react';
import { 
  Repeat, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  HelpCircle, 
  Smartphone, 
  ShieldCheck, 
  Banknote,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function TradeInCalculator() {
  const models = storeData.tradeInEstimates;

  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const [condition, setCondition] = useState('flawless'); // flawless, good, fair
  const [targetUpgrade, setTargetUpgrade] = useState('iPhone 16 Pro Max');
  const [hasCalculated, setHasCalculated] = useState(false);

  const currentItem = models[selectedModelIndex] || models[0];

  const getEstimatedValue = () => {
    if (condition === 'flawless') return currentItem.flawless;
    if (condition === 'good') return currentItem.good;
    return currentItem.fair;
  };

  const estimatedValue = getEstimatedValue();

  const handleCalculate = () => {
    setHasCalculated(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#34d399', '#38bdf8', '#f59e0b']
      });
    } catch (e) {
      // ignore
    }
  };

  const getWhatsAppExchangeText = () => {
    return `Hi Sikandar Bhai! I checked my device trade-in quote on your website:
• Model: ${currentItem.model} (${currentItem.storage})
• Condition: ${condition.toUpperCase()}
• Estimated Trade-In Value: ₹${estimatedValue.toLocaleString('en-IN')}
• Looking to upgrade to: ${targetUpgrade}

Please confirm today's spot offer and let me know when I can visit your Jagdish Market store.`;
  };

  return (
    <section id="trade-in" className="py-16 sm:py-24 relative overflow-hidden bg-[#0c0e15] border-y border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Repeat className="w-3.5 h-3.5" />
            <span>Instant Hyderabad Valuation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How Much Is Your Old Phone Worth Today?
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Get Hyderabad’s highest spot valuation. No lowball estimates, no shipping delays. Instant cash payout or direct trade-in upgrade right at our counter.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="max-w-4xl mx-auto glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white/10 relative">
          
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
                    className="w-full bg-[#161924] border border-white/15 focus:border-emerald-500 rounded-xl px-4 py-3.5 text-white font-medium text-sm appearance-none focus:outline-none transition-colors"
                  >
                    {models.map((item, idx) => (
                      <option key={item.model} value={idx} className="bg-slate-900 text-white">
                        {item.model} ({item.storage})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Step 2: Select Condition */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. Device Physical Condition
                  </label>
                  <span className="text-[11px] text-slate-400">Honest grading = exact payout</span>
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
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
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
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
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
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
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
                  3. Looking to Upgrade To (Optional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['iPhone 16 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'Galaxy S24 Ultra', 'Instant Cash', 'Other Model'].map((target) => (
                    <button
                      key={target}
                      type="button"
                      onClick={() => setTargetUpgrade(target)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-left truncate transition-colors ${
                        targetUpgrade === target 
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-white' 
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
            <div className="lg:col-span-5 bg-gradient-to-b from-[#181d2b] to-[#11131c] rounded-2xl p-6 border border-emerald-500/30 text-center space-y-5 shadow-2xl relative">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estimated Exchange Value</span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  ₹{estimatedValue.toLocaleString('en-IN')}
                </div>
                <p className="text-xs text-emerald-400 font-medium">
                  Guaranteed Spot Market Valuation
                </p>
              </div>

              {/* Breakdown */}
              <div className="bg-black/30 rounded-xl p-3.5 text-xs text-left space-y-2 border border-white/5">
                <div className="flex justify-between text-slate-300">
                  <span>Selected:</span>
                  <span className="font-semibold text-white">{currentItem.model}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Storage:</span>
                  <span className="font-semibold text-white">{currentItem.storage}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Condition Grade:</span>
                  <span className="font-semibold text-emerald-400 capitalize">{condition}</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-1 border-t border-white/10">
                  <span>Payout Type:</span>
                  <span className="font-semibold text-white">Instant UPI / Cash / Trade-In</span>
                </div>
              </div>

              {/* WhatsApp Lock In CTA */}
              <div className="space-y-2.5">
                <a
                  href={createWhatsAppUrl(getWhatsAppExchangeText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2 group active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Lock In This Quote on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <p className="text-[11px] text-slate-400">
                  Visit our counter at Jagdish Market for spot inspection &amp; instant payment.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
