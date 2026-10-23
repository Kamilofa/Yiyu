import React from 'react';
import { UtensilsCrossed, Phone, Mail, MapPin, Clock, ShieldCheck, Heart, ArrowUp, Database } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/dishes';

interface FooterProps {
  onOpenSupabaseSql?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSupabaseSql }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0a0704] border-t border-amber-900/40 text-amber-100 relative">
      
      {/* Decorative Cameroon Flag Ribbon */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#007A3D]" title="Vert - Forêts et Terres Fertiles"></div>
        <div className="flex-1 bg-[#CE1126] flex items-center justify-center relative" title="Rouge - Unité & Étoile d'Or">
          <span className="w-1.5 h-1.5 bg-[#FCD116] rounded-full"></span>
        </div>
        <div className="flex-1 bg-[#FCD116]" title="Jaune - Savane & Soleil Radieux"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Orange Money Notice */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#120d09] rounded-[10px] flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Les Saveurs d'Afrique
                </h3>
                <p className="text-[11px] text-amber-400/80 uppercase font-bold tracking-wider">
                  Haute Gastronomie Camerounaise
                </p>
              </div>
            </div>

            <p className="text-xs text-amber-200/70 leading-relaxed">
              Le sanctuaire des spécialités des 10 régions du Cameroun. Plats d'exception cuisinés aux épices traditionnelles et aux feux de braises authentiques.
            </p>

            {/* Official Orange Money Badge */}
            <div className="bg-[#160f09] border border-orange-500/40 p-3.5 rounded-2xl space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-orange-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  Moyen de Paiement Officiel :
                </span>
                <span className="text-[10px] bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded border border-orange-500/30">
                  Orange Money
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white">Numéro Marchand :</span>
                <strong className="text-sm font-mono text-white bg-black/60 px-2.5 py-0.5 rounded border border-orange-500/40 tracking-wider">
                  698621438
                </strong>
              </div>
              <p className="text-[10px] text-amber-200/50">
                Titulaire : {RESTAURANT_INFO.orangeMoneyHolder}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-400">
              Accès Rapide
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/70">
              <li><a href="#accueil" className="hover:text-amber-400 transition-colors">Accueil</a></li>
              <li><a href="#promotions" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold text-orange-400"><span>Promotions du Moment</span><span className="text-[9px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-black animate-pulse">-27%</span></a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Notre Carte & Plats</a></li>
              <li><a href="#reservation" className="hover:text-amber-400 transition-colors">Réserver une Table</a></li>
              <li><a href="#galerie" className="hover:text-amber-400 transition-colors">Galerie Photos</a></li>
              <li><a href="#avis" className="hover:text-amber-400 transition-colors">Avis Clients</a></li>
              <li><a href="#histoire" className="hover:text-amber-400 transition-colors">Notre Histoire</a></li>
              {onOpenSupabaseSql && (
                <li>
                  <button
                    onClick={onOpenSupabaseSql}
                    className="hover:text-emerald-300 text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Base Supabase (Table commandes SQL)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Horaires de Service
            </h4>
            <div className="space-y-2 text-xs text-amber-200/70">
              {RESTAURANT_INFO.openingHours.map((item) => (
                <div key={item.days} className="pb-1.5 border-b border-amber-900/30">
                  <span className="block font-semibold text-white">{item.days}</span>
                  <span className="text-[11px] text-amber-300/80">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Contacts & Addresses */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-400">
              Nous Trouver
            </h4>
            <div className="space-y-2.5 text-xs text-amber-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/237698621438?text=${encodeURIComponent("Bonjour Les Saveurs d'Afrique ! J'aimerais avoir des renseignements sur le menu et les réservations.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>WhatsApp Direct (+237 698 62 14 38)</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/50">
          <p>© {new Date().getFullYear()} Les Saveurs d'Afrique. Tous droits réservés. L'Art Culinaire du Cameroun.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-amber-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Retour en haut</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
