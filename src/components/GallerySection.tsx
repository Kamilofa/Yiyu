import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles, Utensils, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types/restaurant';

interface GallerySectionProps {
  onOrderShortcut: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOrderShortcut }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('tous');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'tous', label: 'Toutes les Photos' },
    { id: 'plats', label: 'Plats Gastronomiques' },
    { id: 'braises', label: 'Braises en Plein Air' },
    { id: 'ambiance', label: 'Cadre & Salles' },
    { id: 'evenements', label: 'Soirées & Cocktails' }
  ];

  const filteredItems = selectedCategory === 'tous'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  };

  return (
    <section id="galerie" className="py-20 bg-[#0d0a07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-400 text-xs uppercase tracking-widest font-semibold">
            <Camera className="w-3.5 h-3.5" />
            Galerie Visuelle
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Immersion dans <span className="gold-gradient-text">Nos Saveurs</span>
          </h2>
          <p className="text-sm sm:text-base text-amber-200/70 font-light">
            Une symphonie visuelle entre la tradition des braises fumantes, l'élégance de nos salles feutrées et la générosité de nos dressages royaux.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-950/50 font-bold'
                    : 'bg-[#18110b] text-amber-200/70 border border-amber-900/40 hover:border-amber-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-[#16100a] border border-amber-900/40 cursor-pointer shadow-lg hover:border-amber-500/60 transition-all duration-500 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Top Tag */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500/90 text-black px-2.5 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* View Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-amber-300" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-amber-200/70 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative max-w-4xl w-full bg-[#140f0a] border border-amber-700/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-amber-200 hover:text-white flex items-center justify-center border border-amber-600/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-amber-200 hover:text-white flex items-center justify-center border border-amber-600/40 transition-colors cursor-pointer"
              title="Précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-amber-200 hover:text-white flex items-center justify-center border border-amber-600/40 transition-colors cursor-pointer"
              title="Suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image display */}
            <div className="relative h-96 sm:h-[460px] w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain sm:object-cover"
              />
            </div>

            {/* Info footer */}
            <div className="p-6 bg-[#110c07] border-t border-amber-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40">
                  {activeItem.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-amber-200/80">
                  {activeItem.description}
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveItem(null);
                  onOrderShortcut();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Utensils className="w-4 h-4 text-black" />
                <span>Goûter nos spécialités</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
