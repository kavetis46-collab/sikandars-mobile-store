import React from 'react';
import { 
  Bell, 
  Calendar, 
  ArrowRight, 
  MessageCircle 
} from 'lucide-react';
import { storeData, createWhatsAppUrl } from '../data/storeData';

export default function LatestUpdates() {
  const posts = storeData.posts || [];

  return (
    <section id="posts" className="py-16 sm:py-24 relative bg-[#0A0D14] border-t border-[#262F40] content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold mb-3">
              <Bell className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Direct From Sikandar Bhai</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              Flagship Stock Arrivals &amp; News
            </h2>
            <p className="mt-2 text-[#94A3B8] text-sm sm:text-base max-w-2xl">
              Stay ahead with newly arrived titanium iPhones, Galaxy S24 Ultra drops, Pixel AI models, and trade-in bonus alerts.
            </p>
          </div>

          <a
            href={createWhatsAppUrl("Hi Sikandar Bhai, please add me to your WhatsApp broadcast group for daily flagship smartphone updates.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-cobalt px-4 py-2.5 text-xs font-bold gap-2 self-start md:self-auto"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Join VIP WhatsApp Stock Broadcast</span>
          </a>
        </div>

        {/* Posts Grid with 1px #262F40 and 16px radius */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="surface-card flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-[#0E121B] overflow-hidden border-b border-[#262F40]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="200"
                  />
                  <span className="badge-condition absolute top-3 left-3 text-[10px] px-2.5 py-0.5">
                    {post.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#0066FF]" />
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
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
                  className="w-full btn-secondary-titanium py-2.5 px-3 text-xs font-bold gap-1.5"
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
