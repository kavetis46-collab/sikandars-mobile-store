import React, { useState } from 'react';
import { 
  Play, 
  Heart, 
  Eye, 
  ExternalLink, 
  Music, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  MessageCircle, 
  Film, 
  Flame, 
  Award 
} from 'lucide-react';
import { storeData } from '../data/storeData';

// Custom SVG icon matching Lucide aesthetics for Instagram
const Instagram = ({ className = "w-4 h-4", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InstagramFeedSection() {
  const { instagram, instagramReels } = storeData.storeInfo;
  const reels = storeData.instagramReels || [];

  const [activeReelIndex, setActiveReelIndex] = useState(null);

  const highlights = [
    { label: "🔥 Fresh Stock", count: "Daily Drops" },
    { label: "📱 iPhone 16", count: "Desert & Natural" },
    { label: "⚡ Spot Cash", count: "10-Min Exchange" },
    { label: "🛠️ Apple Care", count: "TrueTone Fix" },
    { label: "📦 Handover", count: "Happy Buyers" }
  ];

  return (
    <section id="instagram-feed" className="py-20 sm:py-28 relative bg-[#06070e] border-t border-pink-500/20 content-auto overflow-hidden">
      
      {/* Instagram Gradient Ambient Glow Flares */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-amber-500/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Instagram Profile Header Card */}
        <div className="rounded-3xl p-6 sm:p-10 glass-luxury border border-pink-500/30 mb-12 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left: Avatar & Profile Info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              
              {/* Profile Avatar with Instagram Gradient Ring */}
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 shadow-xl shadow-pink-500/25 shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/Y6eRQr50pTtuYEs0g55ljofWjM3HLStoYFVJCYCCaGLjwTikL9oqbS4BJ9iI4yhXWsinGnBXhDBCC7AB9w=w600-rw"
                  alt="Sikandar's Mobile Store Instagram"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-black"
                  loading="lazy"
                  width="96"
                  height="96"
                />
                <div className="absolute bottom-1 right-1 p-1.5 rounded-full bg-pink-500 text-white shadow-md">
                  <Instagram className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              {/* Bio & Handle */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {storeData.storeInfo.instagram.handle}
                  </h3>
                  <span className="p-0.5 rounded-full bg-blue-500 text-white" title="Verified Store">
                    <CheckCircle2 className="w-4 h-4 fill-blue-500 text-white" />
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  {storeData.storeInfo.instagram.bio}
                </p>

                {/* Micro Stats */}
                <div className="flex items-center justify-center sm:justify-start gap-5 pt-1 text-xs">
                  <div>
                    <span className="font-black text-white">{storeData.storeInfo.instagram.postsCount}</span>
                    <span className="text-slate-400 ml-1">posts</span>
                  </div>
                  <div>
                    <span className="font-black text-white">{storeData.storeInfo.instagram.followersCount}</span>
                    <span className="text-slate-400 ml-1">followers</span>
                  </div>
                  <div>
                    <span className="font-black text-white">4.9 ★</span>
                    <span className="text-slate-400 ml-1">rating</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Follow CTA Button */}
            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={storeData.storeInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs shadow-xl shadow-pink-500/25 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={storeData.storeInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/15 transition-all"
              >
                Direct Message (DM)
              </a>
            </div>

          </div>

          {/* Highlights Circles Row */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center sm:justify-start gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
            {highlights.map((hl, idx) => (
              <a
                key={idx}
                href={storeData.storeInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-500 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-[#101424] flex items-center justify-center p-2 text-center">
                    <span className="text-base sm:text-lg">{hl.label.split(' ')[0]}</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-300 group-hover:text-pink-400 transition-colors">
                  {hl.label.split(' ').slice(1).join(' ')}
                </span>
                <span className="text-[9px] text-slate-500 -mt-1">{hl.count}</span>
              </a>
            ))}
          </div>

        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Latest Reels &amp; Stock Video Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Watch Sikandar Bhai Live in Action
          </h2>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Live unboxings, customer deliveries, battery health checks, and instant exchange deals straight from our Jagdish Market counter.
          </p>
        </div>

        {/* Reels Grid (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel, idx) => (
            <div
              key={reel.id}
              className="rounded-3xl glass-luxury border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pink-500/10"
            >
              <div>
                {/* Reel Thumbnail with Play Overlay */}
                <div 
                  onClick={() => window.open(reel.instagramUrl, '_blank')}
                  className="relative h-64 sm:h-72 w-full bg-slate-900 cursor-pointer overflow-hidden"
                >
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30 group-hover:via-black/10 transition-colors" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/80 backdrop-blur-md text-white">
                      {reel.tag}
                    </span>
                    <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="flex items-center gap-1 font-bold">
                      <Eye className="w-3.5 h-3.5 text-pink-400" />
                      {reel.views}
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                      {reel.likes}
                    </span>
                  </div>
                </div>

                {/* Reel Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-pink-400 font-bold truncate">
                    <Music className="w-3 h-3 shrink-0" />
                    <span className="truncate">{reel.audio}</span>
                  </div>

                  <h3 className="text-sm font-black text-white group-hover:text-pink-400 transition-colors line-clamp-2">
                    {reel.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {reel.caption}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500 hover:to-purple-600 text-white text-xs font-bold border border-pink-500/30 transition-all flex items-center justify-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Watch Reel on Instagram</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
