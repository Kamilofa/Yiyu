import React, { useState, useMemo } from 'react';
import { Search, Flame, Clock, Sparkles, Filter, ChevronRight, Award, Leaf, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { DISHES, CATEGORIES } from '../data/dishes';
import { Dish, DishCategory } from '../types/restaurant';

interface MenuSectionProps {
  onSelectDish: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
}

// Accent & punctuation stripper for robust searching
const normalize = (text: string): string => {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectDish, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>('tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  // Quick suggestions for easy 1-click search
  const quickSearchSuggestions = [
    'Ndolé',
    'Eru',
    'Couscous légumes',
    'Poisson braisé',
    'Taro achu',
    'Poulet DG',
    'Koki',
    'Soya',
    '1000 FCFA',
    '1500 FCFA'
  ];

  // Filtered dishes with normalized multi-token search
  const filteredDishes = useMemo(() => {
    const rawTokens = searchQuery.trim().split(/\s+/).filter(Boolean);
    const tokens = rawTokens.map(normalize);

    return DISHES.filter((dish) => {
      // 1. Search Query (matches across all key fields)
      if (tokens.length > 0) {
        const dishFields = [
          dish.name,
          dish.description,
          dish.region,
          dish.forbidden,
          dish.price.toString(),
          `${dish.price}f`,
          `${dish.price}fcfa`,
          ...dish.ingredients,
          ...dish.availableAccompaniments,
          ...dish.tags
        ].map(normalize).join(' ');

        // Every token in query must be present in the dish text
        const matchesAllTokens = tokens.every((tok) => dishFields.includes(tok));
        if (!matchesAllTokens) {
          return false;
        }
      }

      // 2. Category check (when searching, we allow cross-category results if selectedCategory is 'tous', or filter within category if user specifically picked one)
      if (selectedCategory !== 'tous' && tokens.length === 0) {
        if (selectedCategory === 'prix_1000' && dish.price !== 1000) return false;
        if (selectedCategory === 'prix_1500' && dish.price !== 1500) return false;
        if (selectedCategory !== 'prix_1000' && selectedCategory !== 'prix_1500' && dish.category !== selectedCategory) {
          return false;
        }
      } else if (selectedCategory !== 'tous' && tokens.length > 0) {
        // If a specific category tab is active AND a search query is typed, verify match or let user know
        if (selectedCategory === 'prix_1000' && dish.price !== 1000) return false;
        if (selectedCategory === 'prix_1500' && dish.price !== 1500) return false;
        if (selectedCategory !== 'prix_1000' && selectedCategory !== 'prix_1500' && dish.category !== selectedCategory) {
          return false;
        }
      }

      // 3. Vegetarian toggle
      if (vegetarianOnly && !dish.vegetarian) {
        return false;
      }

      // 4. Popular toggle
      if (popularOnly && !dish.popular && !dish.chefSpecial) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, vegetarianOnly, popularOnly]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('tous');
    setVegetarianOnly(false);
    setPopularOnly(false);
  };

  return (
    <section id="menu" className="py-20 bg-[#0d0a07] relative overflow-hidden">
      {/* Decorative background flair */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-400 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Gastronomie Camerounaise Certifiée
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Les 15 Fiches de Plats <span className="gold-gradient-text">Typiques du Cameroun</span>
          </h2>
          <p className="text-sm sm:text-base text-amber-200/80 font-light">
            Recettes ancestrales authentiques, préparées sans compromis sur les ingrédients du terroir. Tarifs populaires uniques de <strong className="text-amber-400 font-bold">1 000 FCFA ou 1 500 FCFA</strong> !
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Search Input & Badges Toggles */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input with quick clear */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher : eru, couscous légumes, ndolé, koki..."
                className="w-full bg-[#18120c] border border-amber-900/60 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-amber-400/40 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Effacer la recherche"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/70 hover:text-white transition-colors cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
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
                <span>Les Incontournables</span>
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
                <span>Options Végétales (Koki, BHB)</span>
              </button>
            </div>
          </div>

          {/* Quick Search Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="text-amber-400/60 shrink-0 text-[11px] font-semibold uppercase tracking-wider">
              Suggestions :
            </span>
            {quickSearchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setSearchQuery(suggestion)}
                className={`px-2.5 py-1 rounded-lg text-[11px] shrink-0 border transition-all cursor-pointer ${
                  searchQuery.toLowerCase() === suggestion.toLowerCase()
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 font-bold'
                    : 'bg-[#16100a] text-amber-200/70 border-amber-900/40 hover:border-amber-600 hover:text-white'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
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

          {/* Active search filter feedback notice */}
          {searchQuery && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-950/40 border border-amber-700/40 text-xs text-amber-300">
              <span>
                Résultats pour la recherche : <strong className="text-white">"{searchQuery}"</strong> ({filteredDishes.length} plat{filteredDishes.length > 1 ? 's' : ''} trouvé{filteredDishes.length > 1 ? 's' : ''})
              </span>
              <button
                type="button"
                onClick={handleResetFilters}
                className="underline hover:text-white font-semibold cursor-pointer"
              >
                Tout réinitialiser
              </button>
            </div>
          )}

        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-3xl border border-amber-900/40 max-w-lg mx-auto">
            <Filter className="w-8 h-8 text-amber-500/60 mx-auto mb-3" />
            <h3 className="font-serif text-lg text-white font-bold">Aucun plat ne correspond à votre recherche</h3>
            <p className="text-xs text-amber-200/60 mt-1 mb-4">
              Vérifiez le terme recherché ou cliquez ci-dessous pour afficher les 15 plats camerounais authentiques.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold rounded-xl cursor-pointer"
            >
              Afficher les 15 plats certifiés
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="group relative bg-[#140f0a] rounded-2xl overflow-hidden border border-amber-900/40 hover:border-amber-500/60 transition-all duration-300 flex flex-col shadow-lg shadow-black/40 hover:-translate-y-1"
              >
                {/* Dish Image */}
                <div 
                  className="relative h-56 overflow-hidden cursor-pointer"
                  onClick={() => onSelectDish(dish)}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140f0a] via-black/20 to-transparent"></div>

                  {/* Fiche number & Region */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded-md bg-amber-500 text-black shadow-md">
                      Fiche N° {dish.ficheNumber}
                    </span>
                    <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-amber-300 border border-amber-500/30">
                      {dish.region}
                    </span>
                  </div>

                  {/* Prep time badge */}
                  <div className="absolute top-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-amber-200/90 flex items-center gap-1 border border-white/10">
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
                    <div className="flex items-start justify-between gap-2">
                      <h3 
                        onClick={() => onSelectDish(dish)}
                        className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        {dish.name}
                      </h3>
                      <span className="shrink-0 text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {dish.price === 1000 ? '1 000 FCFA' : '1 500 FCFA'}
                      </span>
                    </div>

                    <p className="text-xs text-amber-200/80 mt-1.5 leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Forbidden clause preview */}
                  <div className="text-[11px] text-red-300/90 bg-red-950/40 border border-red-800/40 rounded-lg p-2 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span className="font-medium italic">{dish.forbidden}</span>
                  </div>

                  {/* Accompaniments teaser */}
                  {dish.availableAccompaniments && dish.availableAccompaniments.length > 0 && (
                    <div className="text-[11px] text-amber-400/80">
                      <span className="text-amber-200/50">Servi avec : </span>
                      {dish.availableAccompaniments.join(' • ')}
                    </div>
                  )}

                  {/* Price & Action Buttons */}
                  <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-amber-200/60 uppercase tracking-wider block">Tarif unique</span>
                      <span className="font-serif text-lg font-black text-amber-400">
                        {dish.price.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onSelectDish(dish)}
                        className="px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-700/40 text-amber-200 text-xs font-semibold transition-colors cursor-pointer"
                        title="Voir la fiche détaillée et les ingrédients"
                      >
                        Fiche
                      </button>
                      <button
                        type="button"
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
