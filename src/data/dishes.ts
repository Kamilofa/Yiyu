import { Dish } from '../types/restaurant';

// Authentic Cameroonian Food Photography Assets
import imgEru from '../assets/images/cameroun_eru_fufu_1792840866482.jpg';
import imgGombo from '../assets/images/cameroun_sauce_gombo_1792840887276.jpg';
import imgNdole from '../assets/images/cameroun_ndole_miondo_1792840941275.jpg';
import imgPoisson from '../assets/images/cameroun_poisson_braise_1792840955611.jpg';
import imgPouletDg from '../assets/images/cameroun_poulet_dg_1792840969734.jpg';
import imgTaroAchu from '../assets/images/cameroun_taro_achu_1792840983525.jpg';
import imgKoki from '../assets/images/cameroun_koki_plantain_1792841001820.jpg';
import imgMbongo from '../assets/images/cameroun_mbongo_tchobi_1792841049227.jpg';
import imgArachide from '../assets/images/cameroun_sauce_arachide_1792841122134.jpg';
import imgOkok from '../assets/images/cameroun_okok_1792841079643.jpg';
import imgSanga from '../assets/images/cameroun_sanga_plat_1792841107964.jpg';
import imgSoya from '../assets/images/cameroun_soya_kankan_1792841017322.jpg';
import imgPepperSoup from '../assets/images/cameroun_pepper_soup_1792841065002.jpg';
import imgMetsPistache from '../assets/images/cameroun_mets_pistache_1792841093561.jpg';
import imgBhb from '../assets/images/cameroun_bhb_beignets_1792841035335.jpg';

/**
 * EXACTEMENT ET UNIQUEMENT LES 15 FICHES DE PLATS CAMEROUNAIS
 * Règle stricte : Aucun ingrédient ajouté, remplacé ou supprimé.
 * Aucun plat inventé.
 * Respect rigoureux des interdits.
 * Tarifs stricts : 1 000 FCFA ou 1 500 FCFA.
 */
export const DISHES: Dish[] = [
  // 1. Ndolé (1 500 FCFA)
  {
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
    tags: ['Ndolé', 'Plat National', 'Crevettes', 'Miondo', 'Bobolo']
  },

  // 2. Poulet DG (1 500 FCFA)
  {
    id: 'poulet-dg',
    ficheNumber: 2,
    name: 'Poulet DG',
    category: 'braises_grillades',
    region: 'Hauts-Plateaux & Centre',
    description: 'Poulet frit, plantains mûrs frits, carottes, haricots verts, poivron, céleri, oignon, ail, persil. Tout est sauté ensemble.',
    ingredients: [
      'Poulet frit',
      'Plantains mûrs frits',
      'Carottes',
      'Haricots verts',
      'Poivron',
      'Céleri',
      'Oignon',
      'Ail',
      'Persil'
    ],
    forbidden: 'Interdit : crème, curry, pommes de terre.',
    price: 1500,
    image: imgPouletDg,
    spiceLevel: 'doux',
    prepTime: '25 min',
    popular: true,
    chefSpecial: true,
    availableAccompaniments: ['Plantains mûrs frits (intégrés)', 'Riz blanc parfumé'],
    tags: ['Poulet DG', 'Directeur Général', 'Plantains Frits', 'Sauté']
  },

  // 3. Poisson braisé (1 500 FCFA)
  {
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
    tags: ['Poisson Braisé', 'Charbon de Bois', 'Bar', 'Maquereau', 'Kribi']
  },

  // 4. Taro sauce jaune (achu) (1 500 FCFA)
  {
    id: 'taro-sauce-jaune-achu',
    ficheNumber: 4,
    name: 'Taro sauce jaune (achu)',
    category: 'soupes_piles',
    region: 'Nord-Ouest (Bamenda / Grassfields)',
    description: "Taro cuit et pilé en pâte lisse. Sauce jaune : huile de palme, kanwa (potasse) dissoute dans l'eau, bœuf, poisson fumé, piment, sel.",
    ingredients: [
      'Taro cuit et pilé en pâte lisse',
      'Sauce jaune',
      'Huile de palme',
      "Kanwa (potasse) dissoute dans l'eau",
      'Bœuf',
      'Poisson fumé',
      'Piment',
      'Sel'
    ],
    forbidden: 'Interdit : curcuma, pomme de terre, fufu de manioc.',
    price: 1500,
    image: imgTaroAchu,
    spiceLevel: 'tres_pimente',
    prepTime: '20 min',
    popular: true,
    chefSpecial: true,
    availableAccompaniments: ['Pâte de Taro pilé lisse (inclus)', 'Bœuf & Poisson fumé'],
    tags: ['Achu', 'Taro Sauce Jaune', 'Bamenda', 'Kanwa', 'Grassfield']
  },

  // 5. Eru (1 500 FCFA)
  {
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
    tags: ['Eru', 'Waterleaf', 'Water Fufu', 'Garri', 'Manyu', 'Cameroun Anglophone']
  },

  // 6. Koki (1 000 FCFA)
  {
    id: 'koki',
    ficheNumber: 6,
    name: 'Koki',
    category: 'vapeur_tradition',
    region: 'Ouest & Littoral',
    description: 'Haricots niébé pelés et mixés, huile de palme, oignon, piment, sel. Cuit à la vapeur dans des feuilles de bananier. Servi avec plantain mûr.',
    ingredients: [
      'Haricots niébé pelés et mixés',
      'Huile de palme',
      'Oignon',
      'Piment',
      'Sel',
      'Cuit à la vapeur dans des feuilles de bananier'
    ],
    forbidden: 'Interdit : friture, lait.',
    price: 1000,
    image: imgKoki,
    spiceLevel: 'moyen',
    prepTime: '15 min',
    popular: true,
    vegetarian: true,
    availableAccompaniments: ['Plantain mûr vapeur'],
    tags: ['Koki', 'Haricots Niébé', 'Feuilles de Bananier', 'Plantain Mûr', '1000 FCFA']
  },

  // 7. Mbongo tchobi (1 500 FCFA)
  {
    id: 'mbongo-tchobi',
    ficheNumber: 7,
    name: 'Mbongo tchobi',
    category: 'soupes_piles',
    region: 'Littoral & Sanaga-Maritime (Bassa)',
    description: "Poisson ou viande, épices mbongo grillées jusqu'à devenir noires, oignon, ail, gingembre, huile. Sauce noire. Servi avec bâton de manioc, plantain ou riz.",
    ingredients: [
      'Poisson ou viande',
      "Épices mbongo grillées jusqu'à devenir noires",
      'Oignon',
      'Ail',
      'Gingembre',
      'Huile'
    ],
    forbidden: 'Interdit : tomate, sauce rouge.',
    price: 1500,
    image: imgMbongo,
    spiceLevel: 'moyen',
    prepTime: '25 min',
    chefSpecial: true,
    availableAccompaniments: ['Bâton de manioc (Bobolo)', 'Plantain mûr', 'Riz blanc'],
    tags: ['Mbongo Tchobi', 'Sauce Noire', 'Épices Mbongo', 'Bassa']
  },

  // 8. Sauce gombo (1 000 FCFA)
  {
    id: 'sauce-gombo',
    ficheNumber: 8,
    name: 'Sauce gombo',
    category: 'sauces_feuilles',
    region: 'Grand Nord & Régions Camerounaises',
    description: 'Gombo coupé fin, huile de palme, une pincée de kanwa, viande ou poisson fumé, crevettes séchées, piment. Servi avec couscous de maïs ou bâton de manioc.',
    ingredients: [
      'Gombo coupé fin',
      'Huile de palme',
      'Une pincée de kanwa',
      'Viande ou poisson fumé',
      'Crevettes séchées',
      'Piment'
    ],
    forbidden: 'Interdit : tomate.',
    price: 1000,
    image: imgGombo,
    spiceLevel: 'moyen',
    prepTime: '20 min',
    popular: true,
    availableAccompaniments: ['Couscous de maïs', 'Bâton de manioc (Bobolo)'],
    tags: ['Sauce Gombo', 'Couscous Légumes', 'Couscous de Maïs', 'Kanwa', '1000 FCFA']
  },

  // 9. Sauce d'arachide (1 000 FCFA)
  {
    id: 'sauce-darachide',
    ficheNumber: 9,
    name: "Sauce d'arachide",
    category: 'sauces_feuilles',
    region: 'Centre, Ouest & Nord',
    description: "Pâte d'arachide, poulet ou bœuf, tomate, oignon, ail, huile, piment, sel. Servi avec riz, plantain ou bâton de manioc.",
    ingredients: [
      "Pâte d'arachide",
      'Poulet ou bœuf',
      'Tomate',
      'Oignon',
      'Ail',
      'Huile',
      'Piment',
      'Sel'
    ],
    forbidden: 'Interdit : curry, crème, lait de coco.',
    price: 1000,
    image: imgArachide,
    spiceLevel: 'doux',
    prepTime: '20 min',
    availableAccompaniments: ['Riz blanc', 'Plantain mûr', 'Bâton de manioc'],
    tags: ["Sauce d'Arachide", 'Poulet', 'Bœuf', 'Riz', '1000 FCFA']
  },

  // 10. Okok (1 000 FCFA)
  {
    id: 'okok',
    ficheNumber: 10,
    name: 'Okok',
    category: 'sauces_feuilles',
    region: 'Centre & Sud (Beti)',
    description: "Feuilles d'okok émincées, pâte d'arachide, huile de palme, poisson fumé, viande, oignon, piment, sel. Servi avec bâton de manioc ou bobolo.",
    ingredients: [
      "Feuilles d'okok émincées",
      "Pâte d'arachide",
      'Huile de palme',
      'Poisson fumé',
      'Viande',
      'Oignon',
      'Piment',
      'Sel'
    ],
    forbidden: 'Interdit : épinards, tomate.',
    price: 1000,
    image: imgOkok,
    spiceLevel: 'doux',
    prepTime: '20 min',
    popular: true,
    availableAccompaniments: ['Bâton de manioc', 'Bobolo'],
    tags: ['Okok', 'Beti', 'Feuilles Sauvages', 'Bobolo', '1000 FCFA']
  },

  // 11. Sanga (1 000 FCFA)
  {
    id: 'sanga',
    ficheNumber: 11,
    name: 'Sanga',
    category: 'sauces_feuilles',
    region: 'Centre & Sud (Beti / Yaoundé)',
    description: 'Maïs frais cuit, feuilles de manioc pilées, huile de palme, poisson fumé, sel, piment.',
    ingredients: [
      'Maïs frais cuit',
      'Feuilles de manioc pilées',
      'Huile de palme',
      'Poisson fumé',
      'Sel',
      'Piment'
    ],
    forbidden: 'Interdit : tomate, crème.',
    price: 1000,
    image: imgSanga,
    spiceLevel: 'doux',
    prepTime: '20 min',
    availableAccompaniments: ['Plat complet (maïs et feuilles de manioc intégrés)'],
    tags: ['Sanga', 'Maïs Frais', 'Feuilles de Manioc', 'Beti', '1000 FCFA']
  },

  // 12. Soya (1 000 FCFA)
  {
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
    tags: ['Soya', 'Kankan', 'Brochettes de Bœuf', 'Charbon', '1000 FCFA']
  },

  // 13. Pepper soup (1 500 FCFA)
  {
    id: 'pepper-soup',
    ficheNumber: 13,
    name: 'Pepper soup',
    category: 'soupes_piles',
    region: 'Sud-Ouest & Littoral',
    description: 'Poisson ou chèvre, épices de pepper soup, oignon, ail, gingembre, piment, basilic africain. Servi avec plantain mûr.',
    ingredients: [
      'Poisson ou chèvre',
      'Épices de pepper soup',
      'Oignon',
      'Ail',
      'Gingembre',
      'Piment',
      'Basilic africain'
    ],
    forbidden: 'Interdit : lait, crème.',
    price: 1500,
    image: imgPepperSoup,
    spiceLevel: 'tres_pimente',
    prepTime: '20 min',
    chefSpecial: true,
    availableAccompaniments: ['Plantain mûr'],
    tags: ['Pepper Soup', 'Chèvre', 'Poisson', 'Épices Sauvages', 'Bouillon Chaud']
  },

  // 14. Mets de pistaches (1 500 FCFA)
  {
    id: 'mets-de-pistaches',
    ficheNumber: 14,
    name: 'Mets de pistaches',
    category: 'vapeur_tradition',
    region: 'Littoral & Centre (Ngond’a baa)',
    description: 'Graines de courge pilées (pistaches), huile de palme, poisson fumé, crevettes séchées, oignon, piment, sel. Cuit à la vapeur dans des feuilles de bananier. Servi avec plantain ou macabo.',
    ingredients: [
      'Graines de courge pilées (pistaches)',
      'Huile de palme',
      'Poisson fumé',
      'Crevettes séchées',
      'Oignon',
      'Piment',
      'Sel',
      'Cuit à la vapeur dans des feuilles de bananier'
    ],
    forbidden: 'Interdit : arachide.',
    price: 1500,
    image: imgMetsPistache,
    spiceLevel: 'moyen',
    prepTime: '25 min',
    popular: true,
    chefSpecial: true,
    availableAccompaniments: ['Plantain mûr', 'Macabo'],
    tags: ['Mets de Pistaches', 'Graines de Courge', 'Ngond’a baa', 'Poisson Fumé']
  },

  // 15. Beignets-haricots-bouillie (1 000 FCFA)
  {
    id: 'beignets-haricots-bouillie',
    ficheNumber: 15,
    name: 'Beignets-haricots-bouillie',
    category: 'soupes_piles',
    region: 'Cameroun Entier (Le Culte BHB)',
    description: "Beignets de farine de blé frits, haricots niébé cuits à l'huile de palme avec oignon, bouillie de maïs.",
    ingredients: [
      'Beignets de farine de blé frits',
      "Haricots niébé cuits à l'huile de palme avec oignon",
      'Bouillie de maïs'
    ],
    forbidden: 'Interdit : miel, beurre.',
    price: 1000,
    image: imgBhb,
    spiceLevel: 'doux',
    prepTime: '10 min',
    popular: true,
    vegetarian: true,
    availableAccompaniments: ['Beignets soufflés', 'Haricots niébé', 'Bouillie de maïs'],
    tags: ['BHB', 'Beignets Haricots Bouillie', 'Puff-Puff', '1000 FCFA']
  }
];

export const CATEGORIES = [
  { id: 'tous', label: 'Tous les 15 Plats (1 000F & 1 500F)' },
  { id: 'sauces_feuilles', label: 'Feuilles & Sauces' },
  { id: 'braises_grillades', label: 'Braises & Grillades' },
  { id: 'soupes_piles', label: 'Soupes, Pilés & Spécialités' },
  { id: 'vapeur_tradition', label: 'Vapeur en Feuilles' },
  { id: 'prix_1000', label: 'Plats à 1 000 FCFA' },
  { id: 'prix_1500', label: 'Plats à 1 500 FCFA' }
] as const;

export const RESTAURANT_INFO = {
  name: "Les Saveurs d'Afrique",
  tagline: "Le Sanctuaire de la Haute Gastronomie Camerounaise",
  subtitle: "Cuisine 100% camerounaise authentique, fidèle aux recettes ancestrales : tous nos 15 plats certifiés à 1 000 FCFA ou 1 500 FCFA.",
  phone: "+237 693 20 52 78",
  orangeMoneyNumber: "693205278",
  orangeMoneyHolder: "Les Saveurs d'Afrique Sarl",
  email: "contact@saveursdafrique-resto.com",
  address: "Quartier Bonapriso (face Clinique Soppo), Douala - Cameroun",
  secondaryAddress: "Espace VIP Bastos, Yaoundé",
  priceStandard: "1 000 FCFA - 1 500 FCFA",
  openingHours: [
    { days: "Lundi - Jeudi", hours: "11h00 - 23h00" },
    { days: "Vendredi - Samedi", hours: "11h00 - 01h00" },
    { days: "Dimanche", hours: "11h30 - 22h30" }
  ],
  stats: {
    satisfiedGuests: "15 000+",
    recipesMastered: "15 Fiches Authentiques",
    yearsHeritage: "18 ans",
    averageRating: "4.9/5"
  }
};
