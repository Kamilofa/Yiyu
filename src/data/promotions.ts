import { Promotion } from '../types/restaurant';
import imgNdole from '../assets/images/cameroun_ndole_miondo_1792840941275.jpg';
import imgPoisson from '../assets/images/cameroun_poisson_braise_1792840955611.jpg';
import imgEru from '../assets/images/cameroun_eru_fufu_1792840866482.jpg';
import imgSoya from '../assets/images/cameroun_soya_kankan_1792841017322.jpg';

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-ndole-miondo',
    title: 'Offre Spéciale Ndolé Royal',
    subtitle: 'Ndolé Traditionnel aux Crevettes & Bœuf + Miondo',
    description: "Feuilles de ndolé bouillies puis pressées, pâte d'arachide crue, crevettes, bœuf ou poisson fumé, oignon, ail, gingembre, huile. Servi avec miondo ou bobolo.",
    image: imgNdole,
    originalPrice: 1500,
    promoPrice: 1500,
    discountPercentage: 0,
    badge: 'Spécialité Phare (1 500 FCFA)',
    badgeColor: 'orange',
    validUntil: 'Disponible tous les jours',
    codePromo: 'NDOLE-1500',
    limitedQuantity: 25,
    itemsIncluded: [
      '1x Plat de Ndolé authentique',
      'Crevettes fraîches et bœuf / poisson fumé',
      'Accompagnement au choix : Miondo, Bobolo ou Plantain mûr'
    ],
    dishEquivalent: {
      id: 'ndole',
      ficheNumber: 1,
      name: 'Ndolé',
      category: 'sauces_feuilles',
      region: 'Littoral (Sawa)',
      description: "Feuilles de ndolé bouillies puis pressées (pour enlever l'amertume), pâte d'arachide crue, crevettes, bœuf ou poisson fumé, oignon, ail, gingembre, huile. Servi avec plantain mûr, miondo ou bobolo.",
      ingredients: [
        "Feuilles de ndolé bouillies puis pressées (pour enlever l'amertume)",
        "Pâte d'arachide crue",
        'Crevettes',
        'Bœuf ou poisson fumé',
        'Oignon',
        'Ail',
        'Gingembre',
        'Huile'
      ],
      forbidden: 'Interdit : épinards, crème, curry, tomate.',
      price: 1500,
      image: imgNdole,
      spiceLevel: 'moyen',
      prepTime: '25 min',
      popular: true,
      chefSpecial: true,
      availableAccompaniments: ['Plantain mûr', 'Miondo', 'Bobolo'],
      tags: ['Ndolé', 'Plat National', '1500 FCFA']
    }
  },
  {
    id: 'promo-poisson-braise',
    title: 'Offre Braise au Feu de Bois',
    subtitle: 'Poisson Braisé au Charbon & Poivre de Penja',
    description: 'Maquereau, bar ou tilapia, marinade ail, gingembre, oignon, piment, persil, sel, poivre. Braisé au charbon. Servi avec sauce tomate-oignon pimentée et bâton de manioc.',
    image: imgPoisson,
    originalPrice: 1500,
    promoPrice: 1500,
    discountPercentage: 0,
    badge: 'Braise Directe (1 500 FCFA)',
    badgeColor: 'amber',
    validUntil: 'Chaque jour dès 11h30',
    codePromo: 'BRAISE-1500',
    limitedQuantity: 20,
    itemsIncluded: [
      '1x Poisson frais braisé au charbon (Bar, Maquereau ou Tilapia)',
      '1x Marinade traditionnelle ail, gingembre, piment, persil',
      'Accompagnement : Bâton de manioc ou Plantain frit'
    ],
    dishEquivalent: {
      id: 'poisson-braise',
      ficheNumber: 3,
      name: 'Poisson braisé',
      category: 'braises_grillades',
      region: 'Côte Littorale (Kribi & Douala)',
      description: 'Maquereau, bar ou tilapia, marinade ail, gingembre, oignon, piment, persil, sel, poivre. Braisé au charbon. Servi avec sauce tomate-oignon pimentée, bâton de manioc ou plantain frit.',
      ingredients: [
        'Maquereau, bar ou tilapia',
        'Marinade ail, gingembre, oignon, piment, persil, sel, poivre',
        'Braisé au charbon',
        'Sauce tomate-oignon pimentée'
      ],
      forbidden: 'Interdit : poisson frit à la poêle.',
      price: 1500,
      image: imgPoisson,
      spiceLevel: 'tres_pimente',
      prepTime: '25 min',
      popular: true,
      chefSpecial: true,
      availableAccompaniments: ['Bâton de manioc (Bobolo)', 'Plantain frit', 'Miondo'],
      tags: ['Poisson Braisé', 'Charbon', '1500 FCFA']
    }
  },
  {
    id: 'promo-eru-fufu',
    title: 'Offre Découverte Terroir Eru',
    subtitle: 'Eru & Waterleaf au Bœuf Fumé & Kanda avec Water Fufu',
    description: "Feuilles d'eru finement émincées, waterleaf, huile de palme, bœuf, peau de bœuf, poisson fumé, écrevisses séchées, piment, sel. Servi avec water fufu ou garri.",
    image: imgEru,
    originalPrice: 1500,
    promoPrice: 1500,
    discountPercentage: 0,
    badge: 'Terroir Sud-Ouest (1 500 FCFA)',
    badgeColor: 'emerald',
    validUntil: 'Disponible midi & soir',
    codePromo: 'ERU-1500',
    limitedQuantity: 30,
    itemsIncluded: [
      "1x Portion généreuse d'Eru & Waterleaf",
      'Bœuf tendre, peau de bœuf kanda & écrevisses séchées',
      'Accompagnement : Water fufu ou Garri jaune'
    ],
    dishEquivalent: {
      id: 'eru',
      ficheNumber: 5,
      name: 'Eru',
      category: 'sauces_feuilles',
      region: 'Sud-Ouest (Manyu / Buea)',
      description: "Feuilles d'eru finement émincées, waterleaf (épinard d'eau), huile de palme, bœuf, peau de bœuf, poisson fumé, écrevisses séchées, piment, sel. Servi avec water fufu ou garri.",
      ingredients: [
        "Feuilles d'eru finement émincées",
        "Waterleaf (épinard d'eau)",
        'Huile de palme',
        'Bœuf',
        'Peau de bœuf (kanda)',
        'Poisson fumé',
        'Écrevisses séchées',
        'Piment',
        'Sel'
      ],
      forbidden: "Interdit : pâte d'arachide, tomate.",
      price: 1500,
      image: imgEru,
      spiceLevel: 'moyen',
      prepTime: '20 min',
      popular: true,
      chefSpecial: true,
      availableAccompaniments: ['Water fufu', 'Garri jaune'],
      tags: ['Eru', 'Water Fufu', 'Garri', '1500 FCFA']
    }
  },
  {
    id: 'promo-soya-street',
    title: 'Offre Populaire Soya au Kankan',
    subtitle: 'Fines Tranches de Bœuf Grillées au Charbon',
    description: "Bœuf en tranches fines, poudre d'arachide pilée, piment, gingembre, sel. Grillé au charbon. Servi avec oignon cru, tomate et pain.",
    image: imgSoya,
    originalPrice: 1000,
    promoPrice: 1000,
    discountPercentage: 0,
    badge: 'Street Food (1 000 FCFA)',
    badgeColor: 'orange',
    validUntil: 'Soirées & Commandes Express',
    codePromo: 'SOYA-1000',
    limitedQuantity: 50,
    itemsIncluded: [
      'Brochettes de fines tranches de bœuf au charbon',
      "Épicées à la véritable poudre d'arachide kankan",
      'Accompagnement : Oignon cru, tomate fraîche et pain'
    ],
    dishEquivalent: {
      id: 'soya',
      ficheNumber: 12,
      name: 'Soya',
      category: 'braises_grillades',
      region: 'Grand Nord & Spécialité Nationale Street Food',
      description: "Bœuf en tranches fines, poudre d'arachide pilée, piment, gingembre, sel. Grillé au charbon. Servi avec oignon cru, tomate et pain.",
      ingredients: [
        'Bœuf en tranches fines',
        "Poudre d'arachide pilée (kankan)",
        'Piment',
        'Gingembre',
        'Sel',
        'Grillé au charbon'
      ],
      forbidden: 'Interdit : sauce barbecue.',
      price: 1000,
      image: imgSoya,
      spiceLevel: 'tres_pimente',
      prepTime: '15 min',
      popular: true,
      availableAccompaniments: ['Oignon cru', 'Tomate', 'Pain croustillant'],
      tags: ['Soya', 'Kankan', 'Street Food', '1000 FCFA']
    }
  }
];
