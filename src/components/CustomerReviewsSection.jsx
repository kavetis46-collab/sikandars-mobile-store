import React, { useState, useMemo } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Award, 
  ThumbsUp, 
  MessageSquare,
  Sparkles,
  Edit3
} from 'lucide-react';
import { storeData } from '../data/storeData';

export default function CustomerReviewsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { reviews, ratingsOverview, storeInfo } = storeData;

  const categories = [
    'All',
    'iPhone Purchase',
    'Trade-In & Service',
    'Repair & Service',
    'Instant Cash & Buy',
    'Repeat Buyer'
  ];

  const filteredReviews = useMemo(() => {
    return reviews.filter(rev => {
      const matchesCat = activeCategory === 'All' || rev.category === activeCategory;
      const matchesSearch = 
        rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.devicePurchased.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, reviews]);

  return (
    <section id="customer-reviews" className="py-20 sm:py-28 relative bg-[#060810] border-t border-amber-500/20 overflow-hidden">
      
      {/* Ambient Gradient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill & Main Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-amber-500/10">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Customer Ratings &amp; Reviews Hall of Trust</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Loved by 10,000+ Customers. <br />
            <span className="text-gradient-gold">Rated 4.9 ★ on Google.</span>
          </h2>
          
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Read transparent, uncensored experiences from genuine customers who purchased certified iPhones, traded in old devices, or received micro-repair services at Sikandar Bhai's Jagdish Market store.
          </p>
        </div>

        {/* Big Rating Summary Dashboard */}
        <div className="rounded-3xl glass-luxury-gold p-6 sm:p-10 border border-amber-500/30 mb-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Score Big Display (4 cols) */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-3 lg:border-r border-white/10 lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-6xl sm:text-7xl font-black text-white tracking-tighter">
                  4.9
                </span>
                <div>
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-emerald-400 mt-1">
                    {ratingsOverview.recommendRate} Recommendation Rate
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Aggregated from <strong className="text-white">{storeInfo.reviewsCount} Google Reviews</strong> for <em>{storeInfo.name}</em> at Jagdish Market, Hyderabad.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start">
                <a
                  href={storeInfo.googleReviewWriteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Write a Google Review</span>
                </a>

                <a
                  href={storeInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/15 transition-all"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>

            {/* Star Distribution Bars (5 cols) */}
            <div className="lg:col-span-5 space-y-2 px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Star Rating Breakdown
              </span>

              {ratingsOverview.starsBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-bold text-slate-300 flex items-center gap-1">
                    <span>{row.stars}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>

                  <div className="flex-1 h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>

                  <span className="w-12 text-right font-medium text-slate-400">
                    {row.percentage}%
                  </span>
                </div>
              ))}
            </div>

            {/* Trust Highlights Checklist (3 cols) */}
            <div className="lg:col-span-3 space-y-3 bg-black/30 rounded-2xl p-4 border border-white/5 text-xs">
              <span className="font-bold text-amber-300 block text-[11px] uppercase tracking-wider">
                Audited Verification
              </span>
              
              {ratingsOverview.trustPillars.map((pill, i) => (
                <div key={i} className="flex items-center justify-between text-slate-300 border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                  <span className="text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{pill.label}</span>
                  </span>
                  <span className="font-bold text-amber-400 text-xs">{pill.score}★</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Filter and Search Bar for Reviews */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/25'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Reviews Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews (e.g. Sikandar, iPhone)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121626] border border-white/15 focus:border-amber-400 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>

        </div>

        {/* Full Grid of All Authentic Customer Reviews */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white/5 border border-white/10 p-6 text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-bold text-white">No reviews found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-xs text-amber-400 underline font-semibold"
            >
              Reset search filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl p-6 glass-luxury hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 relative"
              >
                <div className="space-y-4">
                  
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/40 shadow-md shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-white group-hover:text-amber-400 transition-colors">
                          {rev.name}
                        </h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 whitespace-nowrap">
                      {rev.badge}
                    </span>
                  </div>

                  {/* Stars & Device Callout */}
                  <div className="flex items-center justify-between border-y border-white/5 py-2">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {rev.devicePurchased}
                    </span>
                  </div>

                  {/* Review Quote Body */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal italic">
                    "{rev.text}"
                  </p>

                </div>

                {/* Footer with Google Maps Stamp */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{rev.verifiedSource}</span>
                  </span>

                  <span className="text-[10px] text-slate-500">
                    Jagdish Market, Hyd
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner to Encourage New Reviews */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#14192b] to-emerald-500/15 border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Visited Sikandar’s Mobile Store Recently?</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Help fellow Hyderabadi phone buyers by sharing your experience with Sikandar Bhai on Google Maps!
            </p>
          </div>

          <a
            href={storeInfo.googleReviewWriteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 hover:scale-105 transition-all shrink-0"
          >
            Leave Your 5-Star Google Review →
          </a>
        </div>

      </div>
    </section>
  );
}
