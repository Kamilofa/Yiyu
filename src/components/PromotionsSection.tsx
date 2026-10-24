import React, { useState, useEffect } from 'react';
import { Tag, Clock, Sparkles, Check, ArrowRight, Copy, ShieldCheck, Flame, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROMOTIONS } from '../data/promotions';
import { Promotion, Dish } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/dishes';

interface PromotionsSectionProps {
  onOrderPromotion: (dish: Dish) => void;
  onOpenCart: () => void;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ onOrderPromotion, onOpenCart }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaimPromo = (promo: Promotion) => {
    try {
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // no-op
    }

    onOrderPromotion(promo.dishEquivalent);
  };

  return (
    <section id="promotions" className="py-20 bg-gradient-to-b from-[#0f0a06] via-[#150d07] to-[#0d0a07] relative overflow-hidden border-t border-b border-amber-900/30">
      
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 border border-orange-500/40 text-orange-400 text-xs uppercase tracking-widest font-extrabold shadow-md">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>Offres Exclusives & Menus Privilèges</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Nos Promotions & <span className="gold-gradient-text">Offres du Moment</span>
          </h2>

          <p className="text-sm sm:text-base text-amber-200/80 font-light">
            Savourez les plus belles spécialités typiquement camerounaises certifiées à tarif populaire : <strong className="text-amber-400 font-bold">1 000 FCFA et 1 500 FCFA</strong> seulement !
          </p>

          {/* Real-time Expiration Countdown Bar */}
          <div className="pt-2 inline-flex flex-wrap items-center justify-center gap-3 bg-[#1a110a] border border-amber-800/60 rounded-2xl p-3 shadow-xl">
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-400 animate-spin [animation-duration:8s]" />
              Fin des offres dans :
            </span>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
              <div className="bg-black/70 px-2.5 py-1 rounded-lg border border-amber-700/40">
                <span className="text-amber-400 text-sm">{String(timeLeft.days).padStart(2, '0')}</span> j
              </div>
              <span className="text-amber-500">:</span>
              <div className="bg-black/70 px-2.5 py-1 rounded-lg border border-amber-700/40">
                <span className="text-amber-400 text-sm">{String(timeLeft.hours).padStart(2, '0')}</span> h
              </div>
              <span className="text-amber-500">:</span>
              <div className="bg-black/70 px-2.5 py-1 rounded-lg border border-amber-700/40">
                <span className="text-amber-400 text-sm">{String(timeLeft.minutes).padStart(2, '0')}</span> m
              </div>
              <span className="text-amber-500">:</span>
              <div className="bg-black/70 px-2.5 py-1 rounded-lg border border-amber-700/40">
                <span className="text-amber-400 text-sm">{String(timeLeft.seconds).padStart(2, '0')}</span> s
              </div>
            </div>
          </div>
        </div>

        {/* Promotions Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROMOTIONS.map((promo) => (
            <div
              key={promo.id}
              className="group bg-[#140e08] border-2 border-amber-800/40 hover:border-orange-500/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Promo Card Hero Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140e08] via-black/40 to-transparent"></div>

                  {/* Top discount and badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-black text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      -{promo.discountPercentage}% DE REMISE
                    </span>

                    <span className="bg-black/80 backdrop-blur-md text-amber-300 font-bold text-[11px] uppercase tracking-wide px-3 py-1 rounded-full border border-amber-500/30">
                      {promo.badge}
                    </span>
                  </div>

                  {/* Bottom Image title & prices */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] text-amber-400 font-bold uppercase tracking-widest block">
                      {promo.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {promo.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 text-xs text-amber-100/90">
                  
                  {/* Price Banner */}
                  <div className="bg-[#1c130b] border border-amber-800/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-amber-200/60 line-through block">
                        Prix normal : {promo.originalPrice.toLocaleString('fr-FR')} FCFA
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl sm:text-3xl font-black text-amber-400">
                          {promo.promoPrice === 0 ? 'Gratuit / Inclus' : `${promo.promoPrice.toLocaleString('fr-FR')} FCFA`}
                        </span>
                        <span className="text-emerald-400 font-bold text-xs bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                          Économisez {(promo.originalPrice - promo.promoPrice).toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    </div>

                    {promo.codePromo && (
                      <div className="text-right">
                        <span className="text-[10px] text-amber-200/60 uppercase font-bold block mb-1">
                          Code Promo :
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(promo.codePromo!)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 font-mono text-xs font-bold transition-colors cursor-pointer"
                          title="Cliquez pour copier"
                        >
                          {copiedCode === promo.codePromo ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Copié !</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{promo.codePromo}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Enticing description */}
                  <p className="text-xs text-amber-200/80 leading-relaxed font-light">
                    {promo.description}
                  </p>

                  {/* Included items breakdown */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                      Ce que comprend cette formule :
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-amber-200/90">
                      {promo.itemsIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timing & Orange Money notice */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-amber-300/70 pt-2 border-t border-amber-900/30 gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      {promo.validUntil}
                    </span>
                    <span className="flex items-center gap-1 text-orange-300 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                      Payable par Orange Money au <strong>{RESTAURANT_INFO.orangeMoneyNumber}</strong>
                    </span>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleClaimPromo(promo)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-orange-950/40 transition-all cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>Commander cette Promotion ({promo.promoPrice === 0 ? 'Activer' : `${promo.promoPrice.toLocaleString('fr-FR')} FCFA`})</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Orange Money Special Guarantee Footer in Promotions */}
        <div className="mt-12 glass-panel p-6 rounded-3xl border border-orange-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-[#FF7900] font-black text-lg shrink-0">
              OM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-orange-400">
                  Garantie Paiement Orange Money Cameroun
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  100% Vérifié
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                Validez vos promotions directement au 698621438
              </h4>
              <p className="text-xs text-amber-200/70">
                Gagnez du temps : pas besoin de monnaie liquide à la livraison. Votre commande est préparée immédiatement dès confirmation SMS.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCart}
            className="shrink-0 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Vérifier Mon Panier
          </button>
        </div>

      </div>
    </section>
  );
};
