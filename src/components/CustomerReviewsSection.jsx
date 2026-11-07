import React, { useState, useMemo } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  Award, 
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
    <section id="customer-reviews" className="py-20 sm:py-28 relative bg-[#0A0D14] border-t border-[#262F40] overflow-hidden">
      
      {/* Ambient Cobalt & Cyan Glow Flares */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#0066FF]/10 via-[#00F0FF]/05 to-transparent blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-[#0066FF]/08 via-[#262F40]/15 to-transparent blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill & Main Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_4px_14px_rgba(0,102,255,0.2)]">
            <Award className="w-4 h-4 text-[#0066FF]" />
            <span>Audited Customer Ratings &amp; Reviews Hall of Trust</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
            Trusted by 10,000+ Device Owners. <br />
            <span className="text-gradient-cobalt">Rated 4.9 ★ on Google Maps.</span>
          </h2>
          
          <p className="mt-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Read transparent, uncensored experiences from genuine customers who purchased certified flagships, traded in old devices, or received micro-repair services at Sikandar Bhai's Jagdish Market showroom.
          </p>
        </div>

        {/* Rating Summary Dashboard Card with 1px #262F40 and 16px radius */}
        <div className="rounded-2xl bg-[#141923] p-6 sm:p-10 border border-[#262F40] mb-12 shadow-[0_10px_30px_-10px_rgba(0,102,255,0.25)] relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Score Big Display (4 cols) */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-3 lg:border-r border-[#262F40] lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-6xl sm:text-7xl font-extrabold text-[#F8FAFC] tracking-tighter font-mono">
                  4.9
                </span>
                <div>
                  <div className="flex text-[#00F0FF] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#00F0FF] text-[#00F0FF]" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-[#00F0FF] mt-1 font-mono">
                    {ratingsOverview.recommendRate} Recommendation Rate
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8]">
                Aggregated from <strong className="text-[#F8FAFC]">{storeInfo.reviewsCount} Google Reviews</strong> for <em>{storeInfo.name}</em> at Jagdish Market, Abids &amp; Koti, Hyderabad.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center lg:justify-start">
                <a
                  href={storeInfo.googleReviewWriteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-cobalt px-4 py-2.5 text-xs font-bold gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Write a Google Review</span>
                </a>

                <a
                  href={storeInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary-titanium px-4 py-2.5 text-xs font-semibold gap-2"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#00F0FF]" />
                </a>
              </div>
            </div>

            {/* Star Distribution Bars (5 cols) */}
            <div className="lg:col-span-5 space-y-2 px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block mb-2">
                Star Rating Breakdown
              </span>

              {ratingsOverview.starsBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-bold text-[#F8FAFC] flex items-center gap-1 font-mono">
                    <span>{row.stars}</span>
                    <Star className="w-3 h-3 fill-[#00F0FF] text-[#00F0FF]" />
                  </span>

                  <div className="flex-1 h-2 bg-[#0A0D14] rounded-full overflow-hidden border border-[#262F40]">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0066FF] to-[#00F0FF] rounded-full transition-all duration-500"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>

                  <span className="w-12 text-right font-medium text-[#94A3B8] font-mono">
                    {row.percentage}%
                  </span>
                </div>
              ))}
            </div>

            {/* Trust Highlights Checklist (3 cols) */}
            <div className="lg:col-span-3 space-y-3 bg-[#0E121B] rounded-xl p-4 border border-[#262F40] text-xs">
              <span className="font-bold text-[#00F0FF] block text-[11px] uppercase tracking-wider">
                Audited Verification
              </span>
              
              {ratingsOverview.trustPillars.map((pill, i) => (
                <div key={i} className="flex items-center justify-between text-[#F8FAFC] border-b border-[#262F40] pb-1.5 last:border-0 last:pb-0">
                  <span className="text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#0066FF] shrink-0" />
                    <span>{pill.label}</span>
                  </span>
                  <span className="font-bold text-[#00F0FF] text-xs font-mono">{pill.score}★</span>
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
                    ? 'bg-[#0066FF] text-[#F8FAFC] shadow-[0_4px_14px_rgba(0,102,255,0.4)]'
                    : 'bg-[#141923] hover:bg-[#1c2333] text-[#94A3B8] hover:text-[#F8FAFC] border border-[#262F40]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Reviews Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews (e.g. Sikandar, iPhone)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141923] border border-[#262F40] focus:border-[#0066FF] rounded-xl pl-9 pr-3 py-2 text-xs text-[#F8FAFC] placeholder-[#94A3B8] focus:outline-none transition-colors"
            />
          </div>

        </div>

        {/* Full Grid of All Authentic Customer Reviews */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 rounded-xl bg-[#141923] border border-[#262F40] p-6 text-[#94A3B8]">
            <MessageSquare className="w-10 h-10 mx-auto text-[#262F40] mb-2" />
            <p className="text-sm font-bold text-[#F8FAFC]">No reviews found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-xs text-[#00F0FF] underline font-semibold"
            >
              Reset search filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="surface-card p-6 flex flex-col justify-between group hover:-translate-y-1 relative"
              >
                <div className="space-y-4">
                  
                  {/* Reviewer Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#0066FF]/50 shadow-md shrink-0"
                        loading="lazy"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                          {rev.name}
                        </h4>
                        <div className="text-[11px] text-[#94A3B8] flex items-center gap-1.5 mt-0.5">
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <span className="badge-condition text-[10px] px-2 py-0.5 whitespace-nowrap">
                      {rev.badge}
                    </span>
                  </div>

                  {/* Stars & Device Callout */}
                  <div className="flex items-center justify-between border-y border-[#262F40] py-2">
                    <div className="flex text-[#00F0FF] gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#00F0FF]" />
                      ))}
                    </div>

                    <span className="text-[10px] font-semibold text-[#00F0FF] bg-[rgba(0,240,255,0.08)] px-2 py-0.5 rounded border border-[rgba(0,240,255,0.25)]">
                      {rev.devicePurchased}
                    </span>
                  </div>

                  {/* Review Quote Body */}
                  <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed font-normal italic">
                    "{rev.text}"
                  </p>

                </div>

                {/* Footer with Google Maps Stamp */}
                <div className="mt-5 pt-3 border-t border-[#262F40] flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span className="flex items-center gap-1 font-semibold text-[#00F0FF]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{rev.verifiedSource}</span>
                  </span>

                  <span className="text-[10px] text-[#94A3B8] font-mono">
                    Jagdish Market, Abids
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner to Encourage New Reviews */}
        <div className="mt-12 rounded-2xl bg-[#141923] border border-[#262F40] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_-10px_rgba(0,102,255,0.2)]">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#F8FAFC] flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              <span>Visited Sikandar’s Mobile Store Recently?</span>
            </h3>
            <p className="text-xs text-[#94A3B8] max-w-xl">
              Help fellow Hyderabadi phone buyers by sharing your experience with Sikandar Bhai on Google Maps!
            </p>
          </div>

          <a
            href={storeInfo.googleReviewWriteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-cobalt px-6 py-3 text-xs font-bold shrink-0"
          >
            Leave Your 5-Star Google Review →
          </a>
        </div>

      </div>
    </section>
  );
}
