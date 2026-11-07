import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle, 
  ExternalLink, 
  Quote, 
  ThumbsUp, 
  MessageSquare,
  Award
} from 'lucide-react';
import { storeData } from '../data/storeData';

export default function CustomerReviews() {
  const [filter, setFilter] = useState('all');

  const reviews = storeData.reviews;

  return (
    <section id="reviews" className="py-16 sm:py-24 relative bg-[#0c0e15] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating Header Box */}
        <div className="rounded-3xl glass-panel-elevated p-6 sm:p-10 border border-white/10 mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Score & Stars */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="text-5xl sm:text-6xl font-black text-white">4.9</span>
                <div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Based on {storeData.storeInfo.reviewsCount} Google Reviews</div>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Highest Rated iPhone Store in Jagdish Market</span>
              </div>
            </div>

            {/* Testimonial Highlights text */}
            <div className="lg:col-span-5 space-y-2 text-center lg:text-left">
              <h3 className="text-xl font-bold text-white">
                Trusted by 10,000+ Hyderabadi Tech Enthusiasts
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                “One of the best places in Hyd for buying, exchange and selling mobiles. Trusted store since 2003 with honest pricing and genuine Apple diagnostics.”
              </p>
            </div>

            {/* Google Maps Button */}
            <div className="lg:col-span-3 text-center lg:text-right">
              <a
                href={storeData.storeInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all shadow-lg hover:border-emerald-500/30"
              >
                <span>Read All on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>

          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 bg-[#13151f] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="space-y-4">
                {/* Header with Avatar & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {rev.name}
                      </h4>
                      <div className="text-[11px] text-slate-400">{rev.date}</div>
                    </div>
                  </div>

                  {rev.badge && (
                    <span className="text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {rev.badge}
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  "{rev.text}"
                </p>
              </div>

              {/* Verified Google Badge */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-slate-400">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  Verified Google Review
                </span>
                <span className="font-medium text-slate-400">Jagdish Market Store</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
