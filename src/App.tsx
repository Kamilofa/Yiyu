/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromotionsSection } from './components/PromotionsSection';
import { MenuSection } from './components/MenuSection';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { OfficialReceiptModal } from './components/OfficialReceiptModal';
import { ReceiptLookupModal } from './components/ReceiptLookupModal';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { Dish, CartItem, Order, SpiceLevel } from './types/restaurant';
import { DISHES } from './data/dishes';
import { Check, ShoppingBag, ShieldCheck, Receipt } from 'lucide-react';

export default function App() {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lsa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isReceiptLookupOpen, setIsReceiptLookupOpen] = useState(false);
  const [quickToast, setQuickToast] = useState<string | null>(null);

  // Past orders for receipt retrieval
  const [pastOrders, setPastOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('lsa_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save past orders
  useEffect(() => {
    try {
      localStorage.setItem('lsa_orders', JSON.stringify(pastOrders));
    } catch {
      // ignore
    }
  }, [pastOrders]);

  const handleOrderCreated = (order: Order) => {
    setPastOrders((prev) => [order, ...prev]);
    setConfirmedOrder(order);
    showNotification(`Commande ${order.id} validée ! Reçu officiel généré.`);
  };

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('lsa_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showNotification = (msg: string) => {
    setQuickToast(msg);
    setTimeout(() => {
      setQuickToast(null);
    }, 3000);
  };

  // Add customized dish to cart
  const handleAddToCart = (
    dish: Dish,
    quantity: number,
    accompaniment?: string,
    spice?: SpiceLevel,
    notes?: string
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.dish.id === dish.id &&
          item.selectedAccompaniment === accompaniment &&
          item.spicePreference === spice
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            dish,
            quantity,
            selectedAccompaniment: accompaniment,
            spicePreference: spice,
            specialInstructions: notes,
          },
        ];
      }
    });

    showNotification(`${quantity}x ${dish.name} ajouté au panier !`);
  };

  // Quick add without customization modal
  const handleQuickAdd = (dish: Dish) => {
    const defaultAcc = dish.availableAccompaniments?.[0] || 'Plantains mûrs tapés';
    handleAddToCart(dish, 1, defaultAcc, dish.spiceLevel);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showNotification('Plat retiré du panier');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0a07] text-[#f7ede2] font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Sticky Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('reservation')}
        onOpenReceiptLookup={() => setIsReceiptLookupOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Showcase */}
        <Hero
          onOpenReservation={() => scrollToSection('reservation')}
          onExploreMenu={() => scrollToSection('menu')}
        />

        {/* Promotions & Limited-Time Offers */}
        <PromotionsSection
          onOrderPromotion={(promoDish) => {
            handleQuickAdd(promoDish);
            setIsCartOpen(true);
          }}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Online Menu */}
        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Table Reservation Engine */}
        <ReservationSection />

        {/* Photo Gallery */}
        <GallerySection
          onOrderShortcut={() => scrollToSection('menu')}
        />

        {/* Dedicated Customer Reviews */}
        <ReviewsSection />

        {/* Heritage & Terroir Story */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Ambient Lounge Sound Toggle */}
      <AudioPlayer />

      {/* Floating Quick Cart CTA (if items in cart and drawer closed) */}
      {totalCartCount > 0 && !isCartOpen && (
        <aside
          aria-label="Panier en cours"
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black px-4 py-3 rounded-2xl shadow-2xl shadow-orange-950/80 flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 active:scale-95 border border-white/20"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-black" />
            <span className="absolute -top-2 -right-2 bg-black text-amber-300 text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-amber-400">
              {totalCartCount}
            </span>
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[10px] uppercase font-bold tracking-wider text-black/75">
              Voir mon panier
            </div>
            <div className="text-xs font-black">
              Payer via Orange Money
            </div>
          </div>
        </aside>
      )}

      {/* Quick Action Toast */}
      {quickToast && (
        <div className="fixed top-24 right-5 z-50 bg-[#17100a] border border-amber-500/60 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-fadeIn">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">{quickToast}</span>
        </div>
      )}

      {/* Dish Customization Modal */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={handleOrderCreated}
      />

      {/* Official Order Validation Receipt Modal */}
      <OfficialReceiptModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Receipt Lookup Modal */}
      <ReceiptLookupModal
        isOpen={isReceiptLookupOpen}
        onClose={() => setIsReceiptLookupOpen(false)}
        recentOrders={pastOrders}
        onSelectOrder={(ord) => setConfirmedOrder(ord)}
      />

    </div>
  );
}
