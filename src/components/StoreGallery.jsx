import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  MapPin, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { storeData } from '../data/storeData';

export default function StoreGallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const photos = storeData.gallery || [];
  const categories = ['All', 'Stock', 'Store', 'Service', 'Inspection', 'Accessories'];

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
    <section id="gallery" className="py-16 sm:py-24 relative bg-[#060810] border-t border-amber-500/20 content-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Real In-Store Photography</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Inside Sikandar’s Mobile Store
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Authentic glimpses of our shop, verified device counters, testing bench, and genuine Apple accessories at Jagdish Market, Abids.
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
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.url}
              onClick={() => openLightbox(idx)}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 cursor-pointer hover:border-amber-500/50 transition-all duration-300"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                <span className="self-end p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                </span>

                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {photo.category}
                  </span>
                  <p className="text-xs font-bold text-white line-clamp-2">
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
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>View all 350+ customer uploaded photos on Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
            aria-label="Close photo view"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Image and caption */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={filteredPhotos[selectedPhotoIndex].url}
              alt={filteredPhotos[selectedPhotoIndex].caption}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {filteredPhotos[selectedPhotoIndex].category}
              </span>
              <p className="text-sm font-bold text-white mt-1">
                {filteredPhotos[selectedPhotoIndex].caption}
              </p>
              <span className="text-xs text-slate-500 mt-1 block">
                Photo {selectedPhotoIndex + 1} of {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
