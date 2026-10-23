import React from 'react';
import { Award, Flame, Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/dishes';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: "Épices d'Exception & Poivre de Penja",
      desc: "Nous sélectionnons directement nos aromates auprès des coopératives locales : poivre de Penja IGP, djansang doré, rondelles de brousse et pèbè sauvage."
    },
    {
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      title: "Braises Ancestrales au Charbon Pur",
      desc: "Pas de gril électrique : nos poissons et viandes sont grillés à braise ardente de bois noble pour capturer ce parfum fumé authentique des nuits de Youpwè."
    },
    {
      icon: <Award className="w-5 h-5 text-emerald-400" />,
      title: "Transparence & Produits Frais",
      desc: "Crevettes géantes du Wouri, bars de Kribi, plantains mûris au soleil. Chaque matin, notre chef valide personnellement les arrivages du jour."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-orange-400" />,
      title: "Orange Money Direct : 698621438",
      desc: "Réglez vos commandes à distance ou sur place en toute sérénité. Encaissement instantané sans complications."
    }
  ];

  return (
    <section id="histoire" className="py-20 bg-[#0c0805] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="rounded-3xl overflow-hidden border border-amber-800/40 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                  alt="Chef en cuisine préparant les spécialités camerounaises"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      Maître Restaurateur & Chef Exécutif
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Chef Christian Mbiada
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-1 italic">
                    "La cuisine camerounaise n'est pas une simple recette, c'est l'âme de nos terroirs, la générosité de nos mères et la fierté de nos traditions."
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-amber-500 text-black p-4 rounded-2xl shadow-xl font-serif text-center hidden sm:block border-2 border-white/20">
                <span className="block text-2xl font-black">18 Ans</span>
                <span className="text-[10px] font-sans uppercase font-bold tracking-wider">de Passion Culinaire</span>
              </div>

            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-400 text-xs uppercase tracking-widest font-semibold">
                <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                Notre Héritage
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                L'Authenticité Camerounaise au <span className="gold-gradient-text">Sommet de son Art</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed font-light">
              Né de la passion de rassembler les saveurs les plus emblématiques du Cameroun, <strong className="text-white font-semibold">Les Saveurs d'Afrique</strong> rend hommage aux trésors culinaires de nos 10 régions. Des feuilles fraîches de Ndolè pilées du Littoral aux marinades relevées au poivre blanc de Penja, chaque plat est préparé dans le respect scrupuleux des temps de mijotage traditionnels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="bg-[#150f09] border border-amber-900/40 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    {pillar.icon}
                    <h4 className="font-serif text-xs font-bold text-white">{pillar.title}</h4>
                  </div>
                  <p className="text-[11px] text-amber-200/70 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Practical information box */}
            <div className="bg-[#18110a] border border-amber-800/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">{RESTAURANT_INFO.address}</span>
                  <span className="text-[11px] text-amber-200/60">Parking sécurisé avec voiturier disponible</span>
                </div>
              </div>
              <div className="shrink-0 bg-orange-500/15 border border-orange-500/30 px-3 py-1.5 rounded-xl text-orange-300 font-mono font-bold text-xs">
                OM: 698621438
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
