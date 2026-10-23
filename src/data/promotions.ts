import { Promotion } from '../types/restaurant';

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-festin-royal',
    title: 'Le Duo Royal Sawa en Promotion',
    subtitle: 'Formule Dégustation : Ndolè Royal + Miondo + Boisson Foléré',
    description: 'Savourez notre célèbre Ndolè Royal aux crevettes et bœuf tendre, accompagné de ses tresses de Miondo chaud ou Bobolo et d\'une carafe de Jus de Foléré bio fait maison.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 2500,
    promoPrice: 2000,
    discountPercentage: 20,
    badge: 'Offre Star (2 000 FCFA)',
    badgeColor: 'orange',
    validUntil: 'Offre spéciale du weekend',
    codePromo: 'FESTIN-2000',
    limitedQuantity: 20,
    itemsIncluded: [
      '1x Plat de Ndolè Royal aux Crevettes & Bœuf',
      '1x Portion de Miondo chaud ou Bobolo',
      '1x Carafe de Jus de Foléré bio menthe'
    ],
    dishEquivalent: {
      id: 'promo-festin-royal-dish',
      name: 'Formule Promo Duo Ndolè Royal (2 000 FCFA)',
      category: 'royaux',
      region: 'Douala (Littoral)',
      description: 'Ndolè Royal + Miondo + Foléré frais.',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      spiceLevel: 'moyen',
      prepTime: '20 min',
      availableAccompaniments: ['Miondo & Bobolo', 'Plantains tapés'],
      tags: ['Promo 2000 FCFA', 'Ndolè Royal', 'Foléré Inclus']
    }
  },
  {
    id: 'promo-kribi-braise',
    title: 'Formule Braise de Kribi & Bobolo',
    subtitle: 'Grillade au Feu de Bois & Épices de Penja',
    description: 'Bar braisé crépitant mariné au poivre blanc de Penja IGP, servi avec son bâton de Bobolo fumant et notre sauce pimentée artisanale.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 2500,
    promoPrice: 2000,
    discountPercentage: 20,
    badge: 'Spécial Braise (2 000 FCFA)',
    badgeColor: 'amber',
    validUntil: 'Chaque soir dès 18h30',
    codePromo: 'KRIBI-2000',
    limitedQuantity: 15,
    itemsIncluded: [
      '1x Bar Braisé aux épices de Penja',
      '1x Bâton de Bobolo chaud ou Miondo',
      '1x Sauce pimentée de Youpwè maison'
    ],
    dishEquivalent: {
      id: 'promo-kribi-braise-dish',
      name: 'Formule Promo Bar Braisé Kribi (2 000 FCFA)',
      category: 'braises',
      region: 'Kribi & Wouri',
      description: 'Bar braisé de Kribi + Bobolo + Piment.',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
      spiceLevel: 'tres_pimente',
      prepTime: '25 min',
      availableAccompaniments: ['Bobolo chaud', 'Miondo fumant', 'Plantains tapés'],
      tags: ['Promo 2000 FCFA', 'Bar Braisé', 'Poivre de Penja']
    }
  },
  {
    id: 'promo-dejeuner-express',
    title: 'Formule Déjeuner Terroir : Eru ou Koki',
    subtitle: 'Plat Traditionnel au Choix + Boisson Naturelle',
    description: 'Choisissez entre notre authentique Eru & Waterleaf au bœuf fumé avec son Garri, ou le délicieux Koki en feuilles de bananier avec plantains mûrs, plus un verre de Foléré.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 2000,
    promoPrice: 1500,
    discountPercentage: 25,
    badge: 'Midi Express (1 500 FCFA)',
    badgeColor: 'emerald',
    validUntil: 'Lundi au vendredi midi',
    codePromo: 'MIDI-1500',
    limitedQuantity: 30,
    itemsIncluded: [
      '1x Plat au choix : Eru & Waterleaf OU Koki Royal en feuilles',
      '1x Accompagnement : Garri jaune ou Plantains vapeur',
      '1x Verre de Foléré bio frais'
    ],
    dishEquivalent: {
      id: 'promo-dejeuner-express-dish',
      name: 'Formule Déjeuner Terroir Eru/Koki (1 500 FCFA)',
      category: 'royaux',
      region: 'Terroirs du Cameroun',
      description: 'Eru ou Koki au choix + Garri/Plantain + Foléré.',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
      spiceLevel: 'moyen',
      prepTime: '15 min',
      availableAccompaniments: ['Garri jaune du village', 'Plantains vapeur'],
      tags: ['Promo 1500 FCFA', 'Service Rapide', 'Traditionnel']
    }
  },
  {
    id: 'promo-gouter-bhb',
    title: 'Combo Culte BHB (Beignets-Haricot-Bouillie)',
    subtitle: 'Le Goûter Populaire Camerounais Complet',
    description: 'Une assiette généreuse de beignets dorés croustillants, mijoté de haricots rouges fondants et bol de bouillie de maïs fumante, arrosé d\'un verre de jus de baobab.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 2000,
    promoPrice: 1500,
    discountPercentage: 25,
    badge: 'Street Food (1 500 FCFA)',
    badgeColor: 'orange',
    validUntil: 'Matin & Soirée',
    codePromo: 'BHB-1500',
    limitedQuantity: 40,
    itemsIncluded: [
      '1x Assiette de Beignets soufflés dorés',
      '1x Portion de Haricots rouges mijotés',
      '1x Bol de Bouillie de maïs chaude',
      '1x Verre de Nectar de Baobab'
    ],
    dishEquivalent: {
      id: 'promo-gouter-bhb-dish',
      name: 'Combo Culte BHB & Baobab (1 500 FCFA)',
      category: 'entrees',
      region: 'Street Food Nationale',
      description: 'Beignets + Haricot + Bouillie + Nectar de Baobab.',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=900&q=80',
      spiceLevel: 'doux',
      prepTime: '10 min',
      availableAccompaniments: ['Accompagnements inclus'],
      tags: ['Promo 1500 FCFA', 'BHB', 'Street Food']
    }
  }
];
