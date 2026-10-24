import React, { useState } from 'react';
import { X, Flame, Clock, Sparkles, Check, Plus, Minus, MapPin } from 'lucide-react';
import { Dish, SpiceLevel } from '../types/restaurant';

interface DishModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, accompaniment?: string, spice?: SpiceLevel, notes?: string) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose, onAddToCart }) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedAccompaniment, setSelectedAccompaniment] = useState<string>(
    dish.availableAccompaniments?.[0] || 'Plantains mûrs tapés'
  );
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(dish.spiceLevel);
  const [specialNotes, setSpecialNotes] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(dish, quantity, selectedAccompaniment, selectedSpice, specialNotes);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 600);
  };

  const spiceLabels: Record<SpiceLevel, { title: string; desc: string }> = {
    doux: { title: 'Doux', desc: 'Arômes parfumés sans piquant fort' },
    moyen: { title: 'Moyen / Relevé', desc: 'Piquant agréable et chaleureux' },
    tres_pimente: { title: 'Piment Camerounais', desc: 'Piment rouge écrasé traditionnel' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#140f0a] border border-amber-700/50 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-amber-200 hover:text-white flex items-center justify-center border border-amber-600/40 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140f0a] via-[#140f0a]/30 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-600/40">
                <MapPin className="w-3 h-3 text-amber-400" />
                {dish.region}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-amber-200/90 bg-black/60 px-2 py-0.5 rounded-full border border-amber-900/50">
                <Clock className="w-3 h-3 text-amber-400" />
                {dish.prepTime}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {dish.name}
            </h2>
          </div>
        </div>

        {/* Modal Body / Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-amber-100/90">
          
          {/* Fiche & Description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500 text-black text-[11px] font-extrabold uppercase">
                Fiche N° {dish.ficheNumber}
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Fiche Officielle & Recette
              </h4>
            </div>
            <p className="text-amber-200/90 leading-relaxed text-sm bg-[#1b140d] p-3.5 rounded-xl border border-amber-900/40">
              {dish.description}
            </p>
          </div>

          {/* Strict Ingrédients list */}
          {dish.ingredients && dish.ingredients.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Ingrédients Authentiques Certifiés :
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs bg-amber-950/60 border border-amber-700/50 text-amber-200 px-2.5 py-1 rounded-lg"
                  >
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strict Forbidden clause */}
          {dish.forbidden && (
            <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-xs text-red-200 flex items-start gap-2">
              <span className="font-extrabold text-red-400 uppercase tracking-wider shrink-0">
                Règle stricte :
              </span>
              <span className="font-semibold italic text-red-200">{dish.forbidden}</span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {dish.tags.map((tag) => (
              <span key={tag} className="text-xs bg-black/60 border border-amber-800/40 text-amber-300 px-2.5 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          {/* Accompaniment Choice */}
          {dish.availableAccompaniments && dish.availableAccompaniments.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                Choisissez votre accompagnement inclus :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dish.availableAccompaniments.map((acc) => (
                  <button
                    key={acc}
                    type="button"
                    onClick={() => setSelectedAccompaniment(acc)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                      selectedAccompaniment === acc
                        ? 'bg-amber-600/20 border-amber-400 text-white font-semibold shadow-sm'
                        : 'bg-[#1b140d] border-amber-900/40 text-amber-200/70 hover:border-amber-700'
                    }`}
                  >
                    <span>{acc}</span>
                    {selectedAccompaniment === acc && (
                      <Check className="w-4 h-4 text-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Preference */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
              Degré de piment souhaité :
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['doux', 'moyen', 'tres_pimente'] as SpiceLevel[]).map((spice) => (
                <button
                  key={spice}
                  type="button"
                  onClick={() => setSelectedSpice(spice)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedSpice === spice
                      ? 'bg-orange-600/20 border-orange-400 text-white font-bold'
                      : 'bg-[#1b140d] border-amber-900/40 text-amber-200/70 hover:border-amber-700'
                  }`}
                >
                  <div className="flex justify-center items-center gap-1 mb-1 text-orange-400">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    {spice === 'moyen' && <Flame className="w-3.5 h-3.5 fill-current" />}
                    {spice === 'tres_pimente' && (
                      <>
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        <Flame className="w-3.5 h-3.5 fill-current" />
                      </>
                    )}
                  </div>
                  <span className="text-[11px] block">{spiceLabels[spice].title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes for kitchen */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
              Instructions spéciales pour le Chef (optionnel) :
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Ex: Piment dans un ravier à part, viande bien cuite..."
              className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-[#0e0a07] border-t border-amber-900/40 flex flex-wrap items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3 bg-[#1b140d] border border-amber-800/40 rounded-xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-amber-950/60 hover:bg-amber-900 text-amber-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-white text-sm w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-amber-950/60 hover:bg-amber-900 text-amber-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`flex-1 min-w-[200px] py-3.5 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-orange-950/50 active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Ajouté au panier !</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-black" />
                <span>Ajouter • {(dish.price * quantity).toLocaleString('fr-FR')} FCFA</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
