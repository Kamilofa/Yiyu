import React, { useState, useMemo } from 'react';
import { Search, Flame, Clock, Sparkles, Filter, ChevronRight, Award, Leaf } from 'lucide-react';
import { DISHES, CATEGORIES } from '../data/dishes';
import { Dish, DishCategory } from '../types/restaurant';

interface MenuSectionProps {
  onSelectDish: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDish, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // Category check
      if (selectedCategory !== 'tous' && dish.category !== selectedCategory) {
        return false;
      }
      // Vegetarian toggle
      if (vegetarianOnly && !dish.vegetarian) {
        return false;
      }
      // Popular toggle
      if (popularOnly && !dish.popular && !dish.chefSpecial) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q);
        const matchDesc = dish.description.toLowerCase().includes(q);
        const matchRegion = dish.region.toLowerCase().includes(q);
        const matchTags = dish.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchRegion && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, vegetarianOnly, popularOnly]);

  return (
    <section id="menu" className="py-20 bg-[#0d0a07] relative overflow-hidden">
      {/* Decorative background flair */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-400 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Gastronomie Camerounaise
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Notre Carte <span className="gold-gradient-text">Gourmande</span>
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 font-light">
            Découvrez nos spécialités typiquement camerounaises cuisinées aux épices nobles du pays. Des portions copieuses et savoureuses à tarif populaire : <strong className="text-amber-400 font-bold">1 500 FCFA ou 2 000 FCFA</strong> seulement !
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Search & Quick Toggles */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un plat (ex: Ndolè, Bar, Koki...)"
                className="w-full bg-[#18120c] border border-amber-900/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Badges Toggles */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setPopularOnly(!popularOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  popularOnly
                    ? 'bg-amber-500 text-black border-amber-400 font-bold'
                    : 'bg-[#18120c] text-amber-200/80 border-amber-900/40 hover:border-amber-700'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Les Préférés</span>
              </button>

              <button
                type="button"
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  vegetarianOnly
                    ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                    : 'bg-[#18120c] text-amber-200/80 border-amber-900/40 hover:border-amber-700'
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Options Végétariennes</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as DishCategory)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md shadow-amber-950/40 font-bold'
                    : 'bg-[#16100a] text-amber-200/70 border border-amber-900/30 hover:border-amber-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl border border-amber-900/40 max-w-lg mx-auto">
            <Filter className="w-8 h-8 text-amber-500/60 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-white font-bold">Aucun plat ne correspond à vos critères</h3>
            <p className="text-xs text-amber-200/60 mt-1 mb-4">
              Essayez une autre recherche ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('tous');
                setVegetarianOnly(false);
                setPopularOnly(false);
              }}
              className="px-4 py-2 bg-amber-500 text-black text-xs font-bold rounded-xl"
            >
              Afficher toute la carte
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group relative bg-[#140f0a] rounded-2xl overflow-hidden border border-amber-900/30 hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-lg shadow-black/40 hover:-translate-y-1"
              >
                {/* Dish Image */}
                <div 
                  className="relative h-52 overflow-hidden cursor-pointer"
                  onClick={() => onSelectDish(dish)}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140f0a] via-black/20 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {dish.region}
                    </span>
                    {dish.category === 'menus_terroir' && (
                      <span className="text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-sm">
                        🇨🇲 Menu Complet
                      </span>
                    )}
                    {dish.chefSpecial && (
                      <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-orange-600/90 text-white">
                        Chef
                      </span>
                    )}
                  </div>

                  {/* Prep time badge */}
                  <div className="absolute top-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-200/90 flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{dish.prepTime}</span>
                  </div>

                  {/* Spice indicator */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-900/50">
                    <span className="text-[10px] text-amber-200/80 mr-0.5">Piment :</span>
                    <Flame className={`w-3 h-3 ${dish.spiceLevel === 'tres_pimente' ? 'text-red-500 fill-red-500' : 'text-amber-400 fill-amber-400'}`} />
                    {dish.spiceLevel !== 'doux' && (
                      <Flame className={`w-3 h-3 ${dish.spiceLevel === 'tres_pimente' ? 'text-red-500 fill-red-500' : 'text-amber-400 fill-amber-400'}`} />
                    )}
                    {dish.spiceLevel === 'tres_pimente' && (
                      <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                    )}
                  </div>
                </div>

                {/* Dish Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 
                      onClick={() => onSelectDish(dish)}
                      className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                    >
                      {dish.name}
                    </h3>
                    <p className="text-xs text-amber-200/70 mt-1 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Accompaniments teaser */}
                  {dish.availableAccompaniments && dish.availableAccompaniments.length > 0 && (
                    <div className="text-[11px] text-amber-400/80 line-clamp-1">
                      <span className="text-amber-200/50">Garniture : </span>
                      {dish.availableAccompaniments.slice(0, 2).join(' • ')}
                      {dish.availableAccompaniments.length > 2 && '...'}
                    </div>
                  )}

                  {/* Price & Action Buttons */}
                  <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-amber-200/60 uppercase tracking-wider block">Prix unitaire</span>
                      <span className="font-serif text-lg font-black text-amber-400">
                        {dish.price.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectDish(dish)}
                        className="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-700/40 text-amber-200 text-xs font-semibold transition-colors cursor-pointer"
                        title="Personnaliser les garnitures & piment"
                      >
                        Option
                      </button>
                      <button
                        onClick={() => onQuickAdd(dish)}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-bold transition-all shadow-md shadow-orange-950/30 cursor-pointer active:scale-95 flex items-center gap-1"
                      >
                        <span>Commander</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
