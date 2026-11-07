import React, { useState } from 'react';
import { 
  Wrench, 
  Smartphone, 
  BatteryCharging, 
  Repeat, 
  Banknote, 
  Cpu, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function RepairServicesHub({ onBookService }) {
  const [selectedService, setSelectedService] = useState(null);

  const iconMap = {
    Smartphone: Smartphone,
    BatteryCharging: BatteryCharging,
    Repeat: Repeat,
    Banknote: Banknote,
    Cpu: Cpu,
    Truck: Truck
  };

  return (
    <section id="services" className="py-16 sm:py-24 relative bg-[#0c0e15] border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Authorized Quality &amp; Precision Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Specialized Apple Repair &amp; Service Hub
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Don't risk your precious iPhone with untrained street vendors. Our certified technicians carry 20+ years of micro-soldering and Apple hardware diagnostic experience in Jagdish Market.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeData.services.map((service) => {
            const IconComponent = iconMap[service.icon] || Wrench;

            return (
              <div
                key={service.id}
                className="rounded-2xl p-6 bg-[#13151f] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1"
              >
                
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        {service.badge}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 justify-end">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{service.turnaround}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Checkpoints */}
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    {service.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Pricing</span>
                    <div className="text-xs font-bold text-white">{service.priceEstimate}</div>
                  </div>

                  <a
                    href={createWhatsAppUrl(`Hi Sikandar Bhai, I need an inquiry/booking for '${service.title}'. My phone model is: `)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Book Service</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Diagnostic Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#141824] to-slate-900 border border-emerald-500/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" /> Free Walk-in Diagnostics
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Not sure what’s wrong with your phone?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Bring your device to Sikandar Bhai at Jagdish Market for a zero-cost 10-minute diagnostic inspection with full software battery cycle logs and component report.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${storeData.storeInfo.phoneRaw}`}
              className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all text-center"
            >
              Call: {storeData.storeInfo.phone}
            </a>
            <a
              href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to bring my phone for inspection today at Jagdish Market.")}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
