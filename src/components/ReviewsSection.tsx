import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, ShieldCheck, Plus, Check, Filter, Heart, Sparkles, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_REVIEWS, RATING_BREAKDOWN } from '../data/reviews';
import { DISHES } from '../data/dishes';
import { Review } from '../types/restaurant';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterDish, setFilterDish] = useState<string>('all');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Review submission modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('Douala');
  const [rating, setRating] = useState(5);
  const [dishTasted, setDishTasted] = useState(DISHES[0].name);
  const [comment, setComment] = useState('');
  const [recommended, setRecommended] = useState(true);
  const [successToast, setSuccessToast] = useState(false);

  const handleLike = (id: string) => {
    if (likedReviews[id]) {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes - 1 } : r));
      setLikedReviews(prev => ({ ...prev, [id]: false }));
    } else {
      setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
      setLikedReviews(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // no-op
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim(),
      rating,
      date: "Aujourd'hui",
      dishTasted,
      comment: comment.trim(),
      verified: true,
      recommended,
      likes: 1,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
    setAuthor('');
    setComment('');
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
  };

  // Filtered reviews
  const filteredReviews = reviews.filter(rev => {
    if (filterRating !== 'all' && rev.rating !== filterRating) return false;
    if (filterDish !== 'all' && !rev.dishTasted.toLowerCase().includes(filterDish.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="avis" className="py-20 bg-[#100a06] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-600/30 text-amber-400 text-xs uppercase tracking-widest font-semibold">
            <MessageCircle className="w-3.5 h-3.5" />
            Expérience Client & Confiance
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Les Témoignages de <span className="gold-gradient-text">Nos Convives</span>
          </h2>
          <p className="text-sm sm:text-base text-amber-200/70 font-light">
            Découvrez les retours authentiques de nos clients sur nos spécialités camerounaises, notre service en salle et la rapidité du règlement Orange Money.
          </p>
        </div>

        {/* Global Rating Dashboard */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-800/40 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Score Box */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-3 border-b lg:border-b-0 lg:border-r border-amber-900/40 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="font-serif text-5xl sm:text-6xl font-black text-amber-400">
                  {RATING_BREAKDOWN.average}
                </span>
                <div>
                  <div className="flex text-amber-400 text-lg">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-amber-200/60 block mt-0.5">
                    Sur 5 étoiles ({RATING_BREAKDOWN.totalReviews} avis)
                  </span>
                </div>
              </div>

              <p className="text-xs text-amber-200/80 leading-relaxed">
                <strong className="text-emerald-400 font-bold">{RATING_BREAKDOWN.recommendationRate}%</strong> des clients recommandent le restaurant pour son authenticité culinaire et sa réactivité.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-950/40 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4 text-black" />
                <span>Partager Mon Expérience</span>
              </button>
            </div>

            {/* Right Sub-Ratings breakdown */}
            <div className="lg:col-span-8 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {RATING_BREAKDOWN.subRatings.map((sub) => (
                  <div key={sub.label} className="bg-[#18110a] p-3 rounded-xl border border-amber-900/30 space-y-1.5">
                    <div className="flex justify-between items-center text-amber-200/90 font-medium">
                      <span>{sub.label}</span>
                      <span className="font-bold text-amber-400">{sub.score} / 5</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-black/60 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{ width: `${(sub.score / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-amber-900/40 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filtrer par plat :
            </span>
            <select
              value={filterDish}
              onChange={(e) => setFilterDish(e.target.value)}
              className="bg-[#18110a] border border-amber-900/50 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">Tous les plats</option>
              <option value="ndole">Ndolè Royal</option>
              <option value="braisé">Bar & Braises</option>
              <option value="poulet dg">Poulet DG</option>
              <option value="taro">Taro sauce jaune</option>
              <option value="koki">Koki</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filterRating === 'all'
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-[#18110a] text-amber-200/70 border border-amber-900/40'
              }`}
            >
              Tous ({reviews.length})
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                filterRating === 5
                  ? 'bg-amber-500 text-black font-bold'
                  : 'bg-[#18110a] text-amber-200/70 border border-amber-900/40'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>5 Étoiles</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 text-xs flex items-center gap-3 animate-fadeIn">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Merci pour votre avis précieux ! Il a été publié avec succès.</span>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#140e09] border border-amber-900/40 hover:border-amber-600/50 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all duration-300 space-y-4 hover:-translate-y-1"
            >
              <div className="space-y-3">
                
                {/* Author row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-amber-600/40"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-white leading-tight">
                        {rev.author}
                      </h4>
                      <p className="text-[11px] text-amber-200/60">{rev.location}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex text-amber-400 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-amber-200/40 mt-0.5 block">{rev.date}</span>
                  </div>
                </div>

                {/* Dish badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1d150e] border border-amber-800/30 text-[11px] text-amber-300 font-medium">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  <span>Plat dégusté : <strong>{rev.dishTasted}</strong></span>
                </div>

                {/* Comment */}
                <p className="text-xs text-amber-100/90 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-amber-900/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Visite vérifiée</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer text-[11px] ${
                    likedReviews[rev.id]
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-[#18110a] border-amber-900/40 text-amber-200/60 hover:text-white'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Utile ({rev.likes})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-lg bg-[#140f0a] border border-amber-600/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/40">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Votre Avis sur Les Saveurs d'Afrique
                </h3>
                <p className="text-xs text-amber-200/60">
                  Votre retour aide notre brigade à préserver l'excellence du terroir.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/50 text-amber-200 hover:text-white flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              
              {/* Rating stars selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                  Votre note globale :
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-125"
                    >
                      <Star className={`w-6 h-6 ${rating >= star ? 'text-amber-400 fill-amber-400' : 'text-amber-900'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-300 ml-2">
                    {rating === 5 ? 'Exceptionnel ! ⭐' : `${rating} étoiles`}
                  </span>
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Votre Nom :
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ex: Samuel N."
                    className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3 py-2 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Ville ou Pays :
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ex: Douala, Yaoundé, Paris..."
                    className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3 py-2 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Dish tested */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Plat dégusté :
                </label>
                <select
                  value={dishTasted}
                  onChange={(e) => setDishTasted(e.target.value)}
                  className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {DISHES.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                  <option value="Assiette Mixte Braises">Assiette Mixte Braises & Grillades</option>
                  <option value="Expérience Globale">Expérience Globale / Accueil</option>
                </select>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Votre commentaire détaillé :
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Décrivez les saveurs, la texture, les épices, la cuisson et votre satisfaction..."
                  className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3 py-2 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Recommendation toggle */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rec"
                  checked={recommended}
                  onChange={(e) => setRecommended(e.target.checked)}
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="rec" className="text-xs text-amber-200/90 cursor-pointer">
                  Je recommande Les Saveurs d'Afrique à mes proches
                </label>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-950/60"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Publier Mon Témoignage</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};
