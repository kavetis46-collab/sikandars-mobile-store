import React from 'react';
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
  MessageCircle, 
  Phone,
  Sparkles
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function RepairServicesHub({ onBookService }) {
  const iconMap = {
    Smartphone: Smartphone,
    BatteryCharging: BatteryCharging,
    Repeat: Repeat,
    Banknote: Banknote,
    Cpu: Cpu,
    Truck: Truck
  };

  const services = storeData.services || [];

  return (
    <section id="services" className="py-16 sm:py-24 relative bg-[#0A0D14] border-t border-[#262F40] content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Certified Diagnostic &amp; Precision Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] tracking-tight">
            Specialized Apple &amp; Android Hardware Care
          </h2>
          <p className="mt-3 text-[#94A3B8] text-sm sm:text-base">
            Don't risk your flagship with untrained vendors. Our certified technicians carry 20+ years of micro-soldering, TrueTone calibration, and chip-level diagnostic experience in Abids &amp; Koti.
          </p>
        </div>

        {/* Services Cards Grid with 1px #262F40 and 16px radius */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Wrench;

            return (
              <div
                key={service.id}
                className="surface-card p-6 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  
                  {/* Top Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0E121B] border border-[#262F40] flex items-center justify-center text-[#00F0FF] group-hover:bg-[#0066FF] group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="text-right">
                      <span className="badge-condition text-[10px] px-2.5 py-0.5">
                        {service.badge}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-[#94A3B8] mt-1 justify-end font-mono">
                        <Clock className="w-3 h-3 text-[#0066FF]" />
                        <span>{service.turnaround}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Checkpoints */}
                  <div className="pt-2 border-t border-[#262F40] space-y-2">
                    {service.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#F8FAFC]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-[#262F40] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-wider">Estimate</span>
                    <div className="text-xs font-bold text-[#00F0FF] font-mono">{service.priceEstimate}</div>
                  </div>

                  <a
                    href={createWhatsAppUrl(`Hi Sikandar Bhai, I need an inquiry/booking for '${service.title}'. My phone model is: `)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-cobalt py-2 px-3 text-xs font-bold gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Book Service</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Free Diagnostics Banner with 1px #262F40 border & 16px radius */}
        <div className="mt-12 rounded-2xl bg-[#141923] border border-[#262F40] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_-10px_rgba(0,102,255,0.25)]">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00F0FF]">
              <Sparkles className="w-4 h-4 text-[#0066FF]" /> Free Walk-in Diagnostics
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#F8FAFC]">
              Not sure what’s wrong with your phone?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
              Bring your device to Sikandar Bhai at Jagdish Market for a zero-cost 10-minute diagnostic inspection with full component reports.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${storeData.storeInfo.phoneRaw}`}
              className="btn-secondary-titanium py-3 px-5 text-xs font-bold gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="font-mono">Call: {storeData.storeInfo.phone}</span>
            </a>

            <a
              href={createWhatsAppUrl("Hi Sikandar Bhai, I would like to bring my phone for inspection today at your Abids showroom.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-cobalt py-3 px-5 text-xs font-bold gap-2"
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
