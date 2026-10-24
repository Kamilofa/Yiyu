import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, Sparkles, CheckCircle2, ShieldCheck, Heart, Download, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/dishes';
import { Reservation } from '../types/restaurant';

interface ReservationSectionProps {
  onReservationConfirmed?: (res: Reservation) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onReservationConfirmed }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('20:00');
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'salle' | 'terrasse' | 'vip'>('terrasse');
  const [occasion, setOccasion] = useState('Dîner en amoureux / Tête-à-tête');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const seatingOptions = [
    {
      id: 'terrasse',
      name: 'Terrasse Végétale Mont Fébé',
      badge: 'En plein air',
      desc: 'Brise tropicale, lampions tamisés, ambiance musicale douce sous les étoiles.',
      icon: '🌿'
    },
    {
      id: 'salle',
      name: 'Salle Climatisée Reine Pokou',
      badge: 'Intimiste & Fraîche',
      desc: 'Confort optimal, boiseries nobles, art camerounais et éclairage soigné.',
      icon: '🏛️'
    },
    {
      id: 'vip',
      name: 'Salon Privé VIP Bamoun',
      badge: 'Exclusif',
      desc: 'Espace discret pour repas d\'affaires, anniversaires et réceptions privées.',
      icon: '👑'
    }
  ];

  const occasions = [
    'Dîner en tête-à-tête',
    'Anniversaire',
    'Repas de famille',
    'Dîner d\'affaires / Professionnel',
    'Retrouvailles entre amis',
    'Célébration spéciale'
  ];

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // no-op
      }

      const newRes: Reservation = {
        id: `LSA-RES-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName,
        phone,
        email,
        date,
        time,
        guestsCount,
        seatingArea,
        occasion,
        specialRequests,
        createdAt: new Date().toLocaleDateString('fr-FR'),
        status: 'confirmee'
      };

      setConfirmedReservation(newRes);
      onReservationConfirmed?.(newRes);
    }, 800);
  };

  const getWhatsAppMessage = (res: Reservation) => {
    const text = `Bonjour Les Saveurs d'Afrique ! Je confirme ma réservation de table :
Code : ${res.id}
Nom : ${res.fullName}
Personnes : ${res.guestsCount}
Date : ${res.date} à ${res.time}
Espace : ${res.seatingArea.toUpperCase()}
Occasion : ${res.occasion}
Orange Money du resto : 693205278`;
    return `https://wa.me/237693205278?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="reservation" className="py-20 bg-[#100b07] relative overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-400 text-xs uppercase tracking-widest font-semibold">
            <CalendarIcon className="w-3.5 h-3.5" />
            Hospitalité & Confort
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Réservez Votre <span className="gold-gradient-text">Table Royale</span>
          </h2>
          <p className="text-sm sm:text-base text-amber-200/70 font-light">
            Pour un déjeuner d'affaires, une fête de famille ou une soirée romantique. Confirmation instantanée et accueil personnalisé.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Ticket Card */
          <div className="max-w-2xl mx-auto bg-[#17100a] border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-fadeIn text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Réservation Confirmée avec Succès !
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
                Nous vous attendons, {confirmedReservation.fullName}
              </h3>
              <p className="text-xs text-amber-200/70">
                Un SMS et un message WhatsApp de rappel vous ont été réservés.
              </p>
            </div>

            {/* Ticket Details */}
            <div className="bg-[#100a06] border border-amber-800/40 rounded-2xl p-5 text-left grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-amber-200/50 block text-[10px] uppercase font-bold">N° Réservation</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{confirmedReservation.id}</span>
              </div>
              <div>
                <span className="text-amber-200/50 block text-[10px] uppercase font-bold">Date & Heure</span>
                <span className="font-bold text-white text-sm">{confirmedReservation.date} à {confirmedReservation.time}</span>
              </div>
              <div>
                <span className="text-amber-200/50 block text-[10px] uppercase font-bold">Couverts</span>
                <span className="font-bold text-white text-sm">{confirmedReservation.guestsCount} personne{confirmedReservation.guestsCount > 1 ? 's' : ''}</span>
              </div>
              <div>
                <span className="text-amber-200/50 block text-[10px] uppercase font-bold">Espace</span>
                <span className="font-bold text-amber-400 text-sm capitalize">{confirmedReservation.seatingArea}</span>
              </div>
            </div>

            {/* Orange Money Notice for table drink deposits */}
            <div className="bg-orange-950/40 border border-orange-500/30 rounded-xl p-3 text-xs text-orange-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Pour prépayer des boissons ou un gâteau : <strong>Orange Money 693205278</strong></span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={getWhatsAppMessage(confirmedReservation)}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Envoyer confirmation WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="px-5 py-3 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-700/40 text-amber-200 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Faire une autre réservation
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <div className="max-w-4xl mx-auto bg-[#140f0a] border border-amber-800/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Area choice */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                  1. Choisissez l'ambiance de votre table :
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {seatingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSeatingArea(opt.id as 'salle' | 'terrasse' | 'vip')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        seatingArea === opt.id
                          ? 'bg-amber-600/20 border-amber-400 shadow-md shadow-amber-950/50'
                          : 'bg-[#1b140d] border-amber-900/40 hover:border-amber-700 text-amber-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{opt.icon}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          seatingArea === opt.id ? 'bg-amber-400 text-black' : 'bg-black/50 text-amber-300'
                        }`}>
                          {opt.badge}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white">{opt.name}</h4>
                        <p className="text-[11px] text-amber-200/60 mt-1 leading-snug">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date, Time, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Date de la visite :
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Time slot */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Heure du service :
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests counter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Nombre de personnes :
                  </label>
                  <div className="flex items-center gap-1.5 bg-[#1b140d] border border-amber-900/50 rounded-xl p-1">
                    {[1, 2, 4, 6, 8, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestsCount(num)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          guestsCount === num
                            ? 'bg-amber-500 text-black'
                            : 'text-amber-200/70 hover:text-white'
                        }`}
                      >
                        {num === 12 ? '12+' : num}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Step 3: Occasion & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Occasion spéciale :
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    {occasions.map((occ) => (
                      <option key={occ} value={occ}>{occ}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Votre Nom & Prénom :
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex: Samuel Eto'o / Sandrine Ngo..."
                    required
                    className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Numéro de Téléphone (WhatsApp) :
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: 698 00 00 00"
                    required
                    className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                    Email pour confirmation :
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: contact@exemple.com"
                    className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                  />
                </div>

              </div>

              {/* Special instructions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Demandes particulières (allergies, chaise enfant, gâteau avec bougie) :
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Dites-nous comment rendre votre moment exceptionnel..."
                  className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Réservation en cours...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Confirmer Ma Réservation Gratuitement</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-amber-200/50 mt-2">
                  Aucun paiement immédiat requis pour réserver • Modification possible à tout moment
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
