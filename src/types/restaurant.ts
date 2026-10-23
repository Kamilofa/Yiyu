export type SpiceLevel = 'doux' | 'moyen' | 'tres_pimente';

export type DishCategory = 
  | 'tous'
  | 'menus_terroir'
  | 'royaux'
  | 'braises'
  | 'entrees'
  | 'accompagnements'
  | 'boissons'
  | 'desserts';

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  region: string;
  description: string;
  price: number; // in FCFA (XAF)
  image: string;
  spiceLevel: SpiceLevel;
  prepTime: string;
  popular?: boolean;
  chefSpecial?: boolean;
  vegetarian?: boolean;
  availableAccompaniments?: string[];
  tags: string[];
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  selectedAccompaniment?: string;
  spicePreference?: SpiceLevel;
  specialInstructions?: string;
}

export interface Reservation {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestsCount: number;
  seatingArea: 'salle' | 'terrasse' | 'vip';
  occasion: string;
  specialRequests?: string;
  createdAt: string;
  status: 'confirmee' | 'en_attente';
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  dishTasted: string;
  comment: string;
  verified: boolean;
  recommended: boolean;
  avatar?: string;
  likes: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'plats' | 'ambiance' | 'braises' | 'evenements';
  image: string;
  description: string;
  tag: string;
}

export interface Order {
  id: string;
  receiptNumber: string; // Ex: REC-LSA-2026-8942
  orderDate: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  deliveryType: 'livraison' | 'emporter' | 'sur_place';
  deliveryAddress?: string;
  notes?: string;
  paymentMethod: 'orange_money';
  orangeMoneyPhone: string;
  transactionRef: string;
  createdAt: string;
  status: 'paye' | 'en_preparation' | 'livre';
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  originalPrice: number;
  promoPrice: number;
  discountPercentage: number;
  badge: string;
  badgeColor?: 'orange' | 'amber' | 'emerald' | 'rose';
  validUntil: string;
  codePromo?: string;
  itemsIncluded: string[];
  dishEquivalent: Dish;
  limitedQuantity?: number;
}

