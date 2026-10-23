import { Review } from '../types/restaurant';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Cédric Ngando',
    location: 'Douala (Bonapriso)',
    rating: 5,
    date: '18 Octobre 2026',
    dishTasted: 'Bar Entier Braisé façon Kribi & Bobolo',
    comment: 'Sans doute le meilleur bar braisé de tout Douala ! La marinade au poivre de Penja pénètre la chair jusqu\'à l\'arête centrale. Le bobolo est ultra frais, et le piment rouge a du caractère sans brûler le palais. Paiement Orange Money au 698621438 passé en 10 secondes.',
    verified: true,
    recommended: true,
    likes: 42,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    author: 'Marie-Paule Fotso',
    location: 'Bafoussam / Yaoundé',
    rating: 5,
    date: '12 Octobre 2026',
    dishTasted: 'Ndolè Royal Camerounais',
    comment: 'Je suis très exigeante sur le Ndolè parce que ma grand-mère de Deido en préparait le meilleur. Ici, le dosage de l\'amertume est d\'une justesse chirurgicale ! Les crevettes royales sont énormes et croustillantes. Le service en salle VIP est digne d\'un 5 étoiles.',
    verified: true,
    recommended: true,
    likes: 38,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    author: 'Dr. Ernest Ewane',
    location: 'Yaoundé (Bastos)',
    rating: 5,
    date: '04 Octobre 2026',
    dishTasted: 'Poulet DG & Foléré Glacé',
    comment: 'Nous avons célébré l\'anniversaire de promotion de mon épouse ici. Le Poulet DG servi dans une cocotte en fonte fumante était sublime, bananes mûres dorées à souhait. Mention spéciale pour le personnel prévenant et la propreté irréprochable des lieux.',
    verified: true,
    recommended: true,
    likes: 29,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-4',
    author: 'Aïssatou Bello',
    location: 'Garoua / En visite à Douala',
    rating: 5,
    date: '27 Septembre 2026',
    dishTasted: 'Taro Pilé & Sauce Jaune d\'Achu',
    comment: 'Trouver un vrai Taro Achu bien préparé hors de Bamenda relève souvent du défi. Chez Les Saveurs d\'Afrique, les épices médicinales sont authentiques, le goût de kanwa et la kanga sont parfaits. J\'ai eu l\'impression d\'être au village.',
    verified: true,
    recommended: true,
    likes: 19,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-5',
    author: 'Jean-Marc Bessala',
    location: 'Paris (Diaspora camerounaise)',
    rating: 5,
    date: '15 Septembre 2026',
    dishTasted: 'Koki de grand-mère & Nectar de Baobab',
    comment: 'De retour au pays pour les vacances, c\'était mon premier arrêt culinaire. Tout était parfait. J\'ai commandé pour toute ma famille via le site, réglé instantanément par Orange Money, et la livraison est arrivée chaude avec les emballages biodégradables.',
    verified: true,
    recommended: true,
    likes: 24,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-6',
    author: 'Sandrine Mbarga',
    location: 'Douala (Akwa)',
    rating: 4,
    date: '02 Septembre 2026',
    dishTasted: 'Eru & Waterleaf & Garri',
    comment: 'Très bonne saveur de l\'Eru, la kanda est fondante et bien nettoyée. Seul petit bémol : un peu d\'attente le vendredi soir car le restaurant était plein à craquer. Pensez absolument à réserver votre table à l\'avance sur le site !',
    verified: true,
    recommended: true,
    likes: 15,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];

export const RATING_BREAKDOWN = {
  average: 4.9,
  totalReviews: 312,
  recommendationRate: 98,
  subRatings: [
    { label: 'Saveurs & Authenticité des épices', score: 5.0 },
    { label: 'Qualité du service & Accueil chaleureux', score: 4.8 },
    { label: 'Cadre & Ambiance musicale', score: 4.9 },
    { label: 'Rapidité du paiement Orange Money', score: 4.9 },
    { label: 'Rapport Qualité / Prix', score: 4.8 }
  ]
};
