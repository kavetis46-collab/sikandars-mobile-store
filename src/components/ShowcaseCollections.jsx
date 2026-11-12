import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, Tag, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useStore } from "../context/StoreContext";
import { formatINR } from "../data/storeData";

function SectionHeader({ badge, icon: Icon, title, subtitle, actionHref, actionLabel }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <span className="pill-electric mb-3">
          <Icon className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-[#858A94] mt-2 max-w-2xl">{subtitle}</p>
      </div>
      {actionHref && (
        <a
          href={actionHref}
          onClick={(e) => {
            if (actionHref.startsWith("#")) {
              e.preventDefault();
              document.querySelector(actionHref)?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5C7CC] hover:text-[#3478F6] transition-colors shrink-0"
        >
          <span>{actionLabel || "View Full Catalogue"}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

export default function ShowcaseCollections() {
  const { products } = useStore();

  const available = products.filter((p) => !p.isSold && (p.stockCount ?? 1) > 0);
  const featured = available.filter((p) => p.isFeatured).slice(0, 3);
  const latest = available.filter((p) => p.isLatest).slice(0, 3);
  const bestDeals = [...available]
    .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
    .slice(0, 3);
  const popular = available.filter((p) => p.isPopular).slice(0, 3);

  const collectionCategories = [
    {
      title: "Pro Max Titanium Series",
      tag: "Flagship Cameras",
      desc: "Large 6.7\" & 6.9\" ProMotion displays with 5x optical zoom & multi-day endurance.",
      filterSeries: "iPhone 16 Series",
      accent: "from-[#3478F6]/20 to-transparent",
    },
    {
      title: "Compact & Pocket Power",
      tag: "12 mini & 13 mini",
      desc: "5.4-inch OLED pocket icons tested for 100% genuine screen & Face ID.",
      filterSeries: "iPhone 13 Series",
      accent: "from-[#C5C7CC]/15 to-transparent",
    },
    {
      title: "Smart Value Creators",
      tag: "USB-C & A16 / A17 Pro",
      desc: "Certified iPhone 15 & 16 lineups offering peak photography at smart prices.",
      filterSeries: "iPhone 15 Series",
      accent: "from-[#3478F6]/15 to-transparent",
    },
  ];

  const scrollToCatalogue = () => {
    document.getElementById("explore-catalogue")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* SECTION 3: FEATURED IPHONE COLLECTIONS */}
      <section
        id="featured-collections"
        className="py-16 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
      >
        <SectionHeader
          badge="Curated Collections"
          icon={Sparkles}
          title="Featured iPhone Collections"
          subtitle="Handpicked flagship generations inspected through our hardware, display, battery, and activation lock protocol."
          actionHref="#explore-catalogue"
          actionLabel="Explore All Models"
        />

        {/* 3 Visual Collection Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {collectionCategories.map((col, idx) => (
            <motion.button
              type="button"
              key={col.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.08 }}
              onClick={scrollToCatalogue}
              className={`text-left p-6 rounded-2xl bg-gradient-to-br ${col.accent} bg-[#111318] border border-[#C5C7CC]/15 hover:border-[#3478F6] transition-all cursor-pointer group`}
            >
              <span className="pill-titanium mb-3">{col.tag}</span>
              <h3 className="text-lg font-extrabold text-white group-hover:text-[#93C5FD] transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-[#858A94] mt-2 leading-relaxed">{col.desc}</p>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(featured.length > 0 ? featured : available.slice(0, 3)).map((product) => (
            <ProductCard key={`feat-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 4: LATEST ARRIVALS */}
      <section
        id="latest-arrivals"
        className="py-16 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
      >
        <SectionHeader
          badge="Just In Showroom"
          icon={Flame}
          title="Latest Arrivals"
          subtitle="Newest iPhone 16, 17, and 18 Series additions inspected and ready for in-store pickup or delivery."
          actionHref="#explore-catalogue"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(latest.length > 0 ? latest : available.slice(0, 3)).map((product) => (
            <ProductCard key={`latest-${product.id}`} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 5: BEST DEALS */}
      <section
        id="best-deals"
        className="py-16 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
      >
        <SectionHeader
          badge="Smart Pricing Benchmark"
          icon={Tag}
          title="Best Deals"
          subtitle="Maximum verified savings compared against original launch MRPs while keeping genuine Apple internals."
          actionHref="#explore-catalogue"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestDeals.map((product) => (
            <div key={`deal-${product.id}`} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: POPULAR IPHONES */}
      <section
        id="popular-iphones"
        className="py-16 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#C5C7CC]/10"
      >
        <SectionHeader
          badge="Buyer Favorites"
          icon={TrendingUp}
          title="Popular iPhones"
          subtitle="Most requested pre-owned models by Hyderabad photographers, students, and executives."
          actionHref="#explore-catalogue"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(popular.length > 0 ? popular : available.slice(0, 3)).map((product) => (
            <ProductCard key={`pop-${product.id}`} product={product} />
          ))}
        </div>

        {/* Compact quick-jump bar */}
        <div className="mt-10 p-5 rounded-2xl bg-[#111318] border border-[#C5C7CC]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#C5C7CC]">
            Showing highlights from <strong className="text-white">{available.length} available models</strong> starting from{" "}
            <strong className="text-[#3478F6]">
              {available.length > 0
                ? formatINR(Math.min(...available.map((p) => Number(p.displayPrice || 999999))))
                : "₹18,500"}
            </strong>
          </div>
          <Link
            to="/admin"
            className="text-xs font-semibold text-[#858A94] hover:text-white transition-colors"
          >
            Store Staff? Manage Live Stock in Admin →
          </Link>
        </div>
      </section>
    </>
  );
}
