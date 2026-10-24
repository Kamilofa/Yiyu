import React from 'react';
import { Sparkles, Utensils, Calendar, ChevronRight, Flame, ShieldCheck, Award, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/dishes';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onExploreMenu }) => {
  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-african-pattern py-16 lg:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-600/15 via-orange-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Storytelling & Action */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Terroir & Orange Money Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 p-1.5 pr-4 rounded-full bg-amber-950/80 border border-amber-600/30 text-xs text-amber-200">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold uppercase tracking-wider text-[10px]">
                <Sparkles className="w-3 h-3 text-black" />
                Cuisine 100% Camerounaise
              </span>
              <span className="text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 text-[11px]">
                1 000F ou 1 500F
              </span>
              <span className="text-amber-300/90 font-medium hidden sm:inline">
                Épices de Penja IGP & Braises
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Le Sanctuaire des <br />
                <span className="gold-gradient-text">Saveurs d'Afrique</span>
              </h1>
              <p className="text-base sm:text-lg text-amber-200/80 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Du grand <strong className="text-amber-300 font-semibold">Ndolè Royal</strong> de Douala au légendaire <strong className="text-amber-300 font-semibold">Poulet DG</strong>, en passant par le <strong className="text-amber-300 font-semibold">Poisson Braisé</strong> de Kribi et le <strong className="text-amber-300 font-semibold">Taro sauce jaune</strong> de Bamenda. Une expérience gastronomique vibrante et inoubliable.
              </p>
            </div>

            {/* Orange Money Special Callout Box */}
            <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 border border-orange-500/30 shadow-lg shadow-black/50">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0 border border-orange-500/40">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-orange-400">
                    Paiement Sécurisé Simplifié
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[11px] text-emerald-400 font-medium">Validé instantanément</span>
                </div>
                <p className="text-xs text-amber-200/90 mt-0.5">
                  Commandes & réservations payables directement par <strong className="text-white">Orange Money au 693205278</strong>
                </p>
              </div>
              <div className="bg-orange-600/20 border border-orange-500/40 px-3 py-1.5 rounded-lg text-orange-300 text-xs font-mono font-bold tracking-wider">
                693205278
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 transition-all duration-300 cursor-pointer active:scale-95"
              >
                <Utensils className="w-4 h-4 text-black" />
                <span>La Carte</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>

              <a
                href="#promotions"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-gradient-to-r from-red-950/70 via-orange-950/70 to-amber-950/70 hover:bg-orange-900/60 border border-orange-500/50 hover:border-orange-400 text-orange-200 hover:text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>Offres & Promos</span>
                <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-black">-27%</span>
              </a>

              <button
                onClick={onOpenReservation}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#1d1610] hover:bg-[#281e15] border border-amber-600/40 hover:border-amber-400 text-amber-100 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Réserver</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-amber-900/30 text-center">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-300">{RESTAURANT_INFO.stats.satisfiedGuests}</p>
                <p className="text-[11px] text-amber-200/70 uppercase tracking-wider mt-0.5">Clients Comblés</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-serif text-xl sm:text-2xl font-bold text-white">{RESTAURANT_INFO.stats.averageRating}</span>
                </div>
                <p className="text-[11px] text-amber-200/70 uppercase tracking-wider mt-0.5">300+ Avis Vérifiés</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-300">{RESTAURANT_INFO.stats.yearsHeritage}</p>
                <p className="text-[11px] text-amber-200/70 uppercase tracking-wider mt-0.5">D'Excellence</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-900 opacity-70 blur-md"></div>
              
              <div className="relative rounded-3xl overflow-hidden bg-[#16100a] border border-amber-700/40 shadow-2xl">
                {/* Main Image */}
                <div className="relative h-80 sm:h-96 overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
                    alt="Plat traditionnel camerounais Les Saveurs d'Afrique"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16100a] via-black/30 to-transparent"></div>
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-amber-200">
                    <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                    <span>Plat Star du Jour</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-full flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                    <Award className="w-3.5 h-3.5" />
                    <span>Recette Ancestrale</span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                      Plat Signature Sawa
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Ndolè Royal aux Crevettes Fraîches
                    </h3>
                    <p className="text-xs text-amber-200/80 line-clamp-1 mt-0.5">
                      Accompagné de Miondo chaud ou Plantains mûrs tapés
                    </p>
                  </div>
                </div>

                {/* Sub-Card Details */}
                <div className="p-5 space-y-3 bg-[#16100a]">
                  <div className="flex items-center justify-between text-xs text-amber-300/80 pb-3 border-b border-amber-900/40">
                    <span>⏱️ Temps de préparation : <strong>25 min</strong></span>
                    <span className="text-amber-400 font-black text-base">2 000 FCFA</span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-[11px] text-amber-200/70">
                      Livraison express partout à Douala & Yaoundé
                    </div>
                    <button
                      onClick={onExploreMenu}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors cursor-pointer"
                    >
                      Commander
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating review card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 glass-panel p-3.5 rounded-2xl items-center gap-3 border border-amber-500/40 shadow-xl max-w-xs animate-fadeIn">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Client satisfait"
                  className="w-10 h-10 rounded-full object-cover border border-amber-400"
                />
                <div className="text-left text-xs">
                  <div className="flex text-amber-400 text-[10px]">★★★★★</div>
                  <p className="font-semibold text-white">"Le meilleur bar braisé !"</p>
                  <p className="text-[10px] text-amber-200/70">Cédric N. • Douala</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
