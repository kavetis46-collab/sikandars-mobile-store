import React from 'react';
import { 
  Bell, 
  Calendar, 
  ArrowRight, 
  MessageCircle, 
  Sparkles,
  Tag
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function LatestUpdates() {
  const posts = storeData.posts;

  return (
    <section id="posts" className="py-16 sm:py-24 relative bg-[#090a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Bell className="w-3.5 h-3.5" />
              <span>Direct From Sikandar Bhai</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Latest Stock Arrivals &amp; Store News
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Stay ahead with newly arrived pre-owned inventory, trade-in bonus alerts, and technical tips.
            </p>
          </div>

          <a
            href={createWhatsAppUrl("Hi Sikandar Bhai, please add me to your WhatsApp broadcast group for daily iPhone stock updates.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-bold transition-all self-start md:self-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join VIP WhatsApp Stock Broadcast</span>
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl bg-[#12141f] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-emerald-400 border border-white/10">
                    {post.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
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
                  className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 text-xs font-semibold border border-white/10 transition-all flex items-center justify-center gap-1.5"
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
