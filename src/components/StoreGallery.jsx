import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { storeData } from '../data/storeData';

export default function StoreGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const photos = storeData.gallery || [];
  const categories = ['All', 'Pro Max', 'Stock', 'Store', 'Exchange'];

  const filteredPhotos = activeFilter === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeFilter);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null && filteredPhotos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null && filteredPhotos.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 relative bg-[#0A0D14] border-t border-[#262F40] content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141923] border border-[#262F40] text-[#00F0FF] text-xs font-bold mb-3">
              <Camera className="w-3.5 h-3.5 text-[#0066FF]" />
              <span>Real Showroom Photography</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              Inside Sikandar’s Flagship Store
            </h2>
            <p className="mt-2 text-[#94A3B8] text-sm sm:text-base max-w-2xl">
              Authentic glimpses of our shop, verified device counters, testing bench, and accessories at Jagdish Market, Abids &amp; Koti.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeFilter === cat
                    ? 'bg-[#0066FF] text-[#F8FAFC] shadow-[0_4px_14px_rgba(0,102,255,0.4)]'
                    : 'bg-[#141923] hover:bg-[#1a202e] text-[#94A3B8] border border-[#262F40]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Gallery with 1px #262F40 and 16px radius */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.url}
              onClick={() => openLightbox(idx)}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#141923] border border-[#262F40] cursor-pointer hover:border-[#0066FF] transition-all duration-300"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width="400"
                height="300"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <span className="self-end p-1.5 rounded-lg bg-[#141923]/80 text-[#00F0FF] backdrop-blur-md border border-[#262F40]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#00F0FF] tracking-wider font-mono">
                    {photo.category}
                  </span>
                  <p className="text-xs font-bold text-[#F8FAFC] line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Photos Note */}
        <div className="mt-8 text-center">
          <a
            href={storeData.storeInfo.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#94A3B8] hover:text-[#00F0FF] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>View all 350+ customer uploaded photos on Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#0A0D14]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-xl bg-[#141923] hover:bg-[#262F40] text-[#F8FAFC] border border-[#262F40] transition-all z-10"
            aria-label="Close photo view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 p-3 rounded-xl bg-[#141923] hover:bg-[#262F40] text-[#00F0FF] border border-[#262F40] transition-all z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Image */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center surface-card p-2 sm:p-4 overflow-hidden"
          >
            <img
              src={filteredPhotos[selectedPhotoIndex].url}
              alt={filteredPhotos[selectedPhotoIndex].caption}
              className="max-h-[70vh] max-w-full object-contain rounded-xl"
            />
            <div className="mt-3 text-center space-y-1">
              <span className="badge-condition text-[10px] px-2.5 py-0.5">
                {filteredPhotos[selectedPhotoIndex].category}
              </span>
              <p className="text-sm font-bold text-[#F8FAFC]">
                {filteredPhotos[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 p-3 rounded-xl bg-[#141923] hover:bg-[#262F40] text-[#00F0FF] border border-[#262F40] transition-all z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </section>
  );
}
