import React, { useState, useMemo } from "react";
import { Star, Search, Award, CheckCircle2, ExternalLink } from "lucide-react";
import { storeData } from "../data/storeData";
import { useStore } from "../context/StoreContext";

export default function CustomerReviewsSection() {
  const { reviews } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const overview = storeData.ratingsOverview;
  const categories = ["All", "iPhone Purchase", "Repeat Buyer"];

  const filteredReviews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return reviews.filter((rev) => {
      const catOk = activeCategory === "All" || rev.category === activeCategory;
      const searchOk =
        !q ||
        rev.name?.toLowerCase().includes(q) ||
        rev.text?.toLowerCase().includes(q) ||
        rev.devicePurchased?.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }, [reviews, activeCategory, searchQuery]);

  return (
    <section
      id="customer-reviews"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="pill-electric mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Genuine Customer Reviews</span>
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Rated {overview.average} ★ Across 242+ Real Reviews
        </h2>
        <p className="text-sm sm:text-base text-[#858A94] mt-3">
          Verified buyer feedback published directly from Google Maps and store records — never fabricated or auto-generated.
        </p>
      </div>

      {/* Overview Bar */}
      <div className="surface-charcoal p-6 sm:p-8 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 lg:border-r border-[#C5C7CC]/10 lg:pr-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <span className="text-5xl font-extrabold text-white font-mono">{overview.average}</span>
            <div>
              <div className="flex gap-1 text-[#3478F6]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#3478F6]" />
                ))}
              </div>
              <p className="text-xs text-[#858A94] mt-1">
                {overview.totalCount} Google Maps Reviews
              </p>
            </div>
          </div>
          <a
            href={storeData.storeInfo.googleReviewWriteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#3478F6] hover:underline"
          >
            <span>Leave a Verified Google Review</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="lg:col-span-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#858A94] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search buyer name or model..."
              aria-label="Search reviews"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#08090C] border border-[#C5C7CC]/15 text-xs text-white placeholder-[#858A94] focus:border-[#3478F6] focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#3478F6] border-[#3478F6] text-white"
                    : "bg-[#08090C] border-[#C5C7CC]/15 text-[#C5C7CC]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReviews.map((rev) => (
          <article key={rev.id} className="surface-charcoal p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {rev.avatar ? (
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover border border-[#C5C7CC]/25"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#3478F6]/20 border border-[#3478F6]/40 flex items-center justify-center text-sm font-bold text-white">
                      {rev.name?.charAt(0) || "B"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-white">{rev.name}</h3>
                    <span className="text-[11px] text-[#858A94]">{rev.date}</span>
                  </div>
                </div>
                <div className="flex text-[#3478F6]">
                  {[...Array(rev.rating || 5)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#3478F6]" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#C5C7CC] leading-relaxed">
                “{rev.text}”
              </p>
            </div>

            <div className="pt-3 border-t border-[#C5C7CC]/10 flex items-center justify-between text-[11px] text-[#858A94]">
              <span className="text-white font-semibold">{rev.devicePurchased}</span>
              <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                {rev.verifiedSource || "Verified"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
