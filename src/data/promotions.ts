import { Promotion } from '../types/restaurant';

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-festin-royal',
    title: 'Le Grand Festin Royal Sawa',
    subtitle: 'Formule Dégustation Prestige pour 2 à 3 personnes',
    description: 'Une somptueuse table réunissant les plats les plus emblématiques du Cameroun : notre légendaire Ndolè Royal garni de crevettes fraîches du Wouri et bœuf fondant, accompagné d\'un demi-Poulet DG doré aux plantains mûrs, de deux bâtons de Bobolo frais, d\'une généreuse portion d\'Alloco caramélisé et de deux carafes de Jus de Foléré glacé à la menthe.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 16500,
    promoPrice: 12500,
    discountPercentage: 24,
    badge: 'Offre Star Weekend',
    badgeColor: 'orange',
    validUntil: 'Offre limitée - Valable jusqu\'à dimanche 23h59',
    codePromo: 'FESTIN-ROYAL',
    limitedQuantity: 15,
    itemsIncluded: [
      '1x Ndolè Royal aux Crevettes Géantes & Viande de Bœuf',
      '1x Demi-Poulet DG façon Yaoundé aux légumes croquants',
      '2x Bâtons de Bobolo fumants ou Miondo au choix',
      '1x Portion de Plantains mûrs frits (Alloco)',
      '2x Carafes de Jus de Foléré bio menthe & gingembre'
    ],
    dishEquivalent: {
      id: 'promo-festin-royal-dish',
      name: 'Pack Promo: Grand Festin Royal Sawa (2-3 pers)',
      category: 'royaux',
      region: 'Douala & Ouest',
      description: 'Pack Dégustation: Ndolè Royal + Demi-Poulet DG + Bobolos + Alloco + 2 Folérés.',
      price: 12500,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      spiceLevel: 'moyen',
      prepTime: '25 min',
      availableAccompaniments: ['Bobolo & Alloco inclus', 'Miondo & Frites de patate'],
      tags: ['Pack Économique', 'Promo Spéciale', '2-3 Personnes']
    }
  },
  {
    id: 'promo-kribi-braise',
    title: 'Duo Braise Océane de Kribi & Cocktails',
    subtitle: 'Soirée Grillade au Feu de Bois & Saveurs du Wouri',
    description: 'Vivez l\'expérience des quais de Kribi à votre table : un Bar entier de 800g fraîchement pêché, mariné 12 heures au poivre blanc de Penja IGP, djansang et ail sauvage, braisé au charbon de bois pur. Servi avec des Miondos tressés de Douala, une assiette de Pastels dorés au poisson fumé et deux cocktails signatures Le Wouri Sunset.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 15000,
    promoPrice: 11900,
    discountPercentage: 21,
    badge: 'Spécial Soirée Braise',
    badgeColor: 'amber',
    validUntil: 'Chaque soir à partir de 18h30 (Stock limité de bars frais)',
    codePromo: 'KRIBI-BRAISE',
    limitedQuantity: 12,
    itemsIncluded: [
      '1x Bar Entier Braisé de Kribi (800g) aux épices de Penja',
      '1x Assiette de 6 Pastels dorés au capitaine fumé & sauce rougail',
      '2x Tresses de Miondo chaud ou Plantains tapés',
      '2x Cocktails signature "Le Wouri Sunset" (avec ou sans alcool)'
    ],
    dishEquivalent: {
      id: 'promo-kribi-braise-dish',
      name: 'Pack Promo: Duo Braise de Kribi & Cocktails',
      category: 'braises',
      region: 'Kribi & Wouri',
      description: 'Bar entier braisé 800g + Pastels poisson fumé + Miondo + 2 Cocktails Wouri.',
      price: 11900,
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80',
      spiceLevel: 'tres_pimente',
      prepTime: '30 min',
      availableAccompaniments: ['Miondo & Plantains tapés', 'Bobolo & Frites de manioc'],
      tags: ['Bar Entier 800g', 'Cocktails Inclus', 'Grillade Minute']
    }
  },
  {
    id: 'promo-dejeuner-express',
    title: 'Menu Déjeuner Terroir & Douceur',
    subtitle: 'Formule Midi Rapide : Plat Royal + Boisson + Douceur Sucrée',
    description: 'La pause déjeuner idéale des travailleurs et gourmets pressés : choisissez entre notre authentique Eru & Waterleaf au bœuf fumé avec son Garri, ou le délicieux Koki de grand-mère à l\'huile rouge pressée au village. Accompagné d\'un grand nectar de Foléré rafraîchissant et terminé par des beignets soufflés tièdes au coulis de caramel de coco.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 9500,
    promoPrice: 6900,
    discountPercentage: 27,
    badge: 'Pause Déjeuner (-27%)',
    badgeColor: 'emerald',
    validUntil: 'Du lundi au vendredi • Service de 11h30 à 14h30',
    codePromo: 'EXPRESS-MIDI',
    limitedQuantity: 25,
    itemsIncluded: [
      '1x Plat au choix : Eru & Waterleaf OU Koki Royal traditionnel',
      '1x Accompagnement : Garri jaune du village ou Plantains vapeur',
      '1x Verre XXL de Foléré bio frais ou Nectar de Baobab',
      '1x Duo de Beignets soufflés au caramel de coco tiède'
    ],
    dishEquivalent: {
      id: 'promo-dejeuner-express-dish',
      name: 'Pack Promo: Menu Déjeuner Terroir & Douceur',
      category: 'royaux',
      region: 'Grand Sud & Ouest',
      description: 'Eru ou Koki au choix + Garri/Plantain + Boisson fraîche + Beignets coco.',
      price: 6900,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
      spiceLevel: 'moyen',
      prepTime: '15 min',
      availableAccompaniments: ['Eru & Garri jaune', 'Koki & Plantains vapeur'],
      tags: ['Service Express', 'Midi Formule', 'Complet']
    }
  },
  {
    id: 'promo-orange-money-privilege',
    title: 'Remise Privilège Orange Money 698621438',
    subtitle: '1 500 FCFA de Réduction Immédiate dès 15 000 FCFA de Commande',
    description: 'Réglez vos commandes à emporter ou en livraison via Orange Money au 698621438 et recevez automatiquement 1 500 FCFA de remise déduite sur votre panier, ainsi qu\'un jus artisanal de Baobab offert en cadeau de fidélité pour remercier nos clients digitaux.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=1200&q=80',
    originalPrice: 15000,
    promoPrice: 13500,
    discountPercentage: 10,
    badge: 'Exclusivité Orange Money',
    badgeColor: 'orange',
    validUntil: 'Offre Permanente pour tout paiement direct au 698621438',
    codePromo: 'OM-SAVEURS',
    itemsIncluded: [
      '1 500 FCFA déduits immédiatement sur votre total de commande',
      '1x Bouteille 50cl de Jus de Baobab crémeux offerte',
      'Priorité de préparation et livraison express en 25 minutes'
    ],
    dishEquivalent: {
      id: 'promo-om-privilege-dish',
      name: 'Offre Privilège Orange Money (698621438)',
      category: 'boissons',
      region: 'Spécial Partenaire OM',
      description: 'Bonus fidélité : Jus de Baobab artisanal offert + remise automatique sur votre commande.',
      price: 0,
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=900&q=80',
      spiceLevel: 'doux',
      prepTime: '5 min',
      availableAccompaniments: ['Offre combinée Orange Money'],
      tags: ['Orange Money 698621438', 'Cadeau Fidélité', 'Instantané']
    }
  }
];
