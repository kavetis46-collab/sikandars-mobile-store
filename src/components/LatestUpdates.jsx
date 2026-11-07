import React from 'react';
import { 
  Bell, 
  Calendar, 
  ArrowRight, 
  MessageCircle, 
  Sparkles
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function LatestUpdates() {
  const posts = storeData.posts || [];

  return (
    <section id="posts" className="py-16 sm:py-24 relative bg-[#060810] border-t border-amber-500/20 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
              <Bell className="w-3.5 h-3.5" />
              <span>Direct From Sikandar Bhai</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              iPhone 16 Pro Max Stock Arrivals &amp; News
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Stay ahead with newly arrived titanium inventory, trade-in bonus alerts, and technical tips.
            </p>
          </div>

          <a
            href={createWhatsAppUrl("Hi Sikandar Bhai, please add me to your WhatsApp broadcast group for daily iPhone stock updates.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all self-start md:self-auto"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Join VIP WhatsApp Stock Broadcast</span>
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl glass-luxury border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="200"
                  />
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                    {post.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <a
                  href={createWhatsAppUrl(`Hi Sikandar Bhai, I read your update about "${post.title}". Is this stock or offer still active?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold border border-white/10 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Inquire on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
