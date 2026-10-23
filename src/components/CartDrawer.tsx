import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Truck, Store, Utensils } from 'lucide-react';
import { CartItem, Order } from '../types/restaurant';
import { OrangeMoneyModal } from './OrangeMoneyModal';
import { RESTAURANT_INFO } from '../data/dishes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState<'livraison' | 'emporter' | 'sur_place'>('livraison');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [showOrangeMoneyModal, setShowOrangeMoneyModal] = useState(false);

  // Subtotal calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'livraison' ? 1000 : 0;
  const totalAmount = subtotal + deliveryFee;

  const handleProceedToOrangeMoney = () => {
    setShowOrangeMoneyModal(true);
  };

  const handleOrderFinished = (order: Order) => {
    setShowOrangeMoneyModal(false);
    onClearCart();
    onClose();
    onOrderSuccess(order);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
        <div className="absolute inset-0" onClick={onClose} />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-[#130d08] border-l border-amber-900/50 shadow-2xl flex flex-col text-amber-100">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-amber-900/40 bg-[#16100a] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Votre Commande</h3>
                  <p className="text-[11px] text-amber-200/60">
                    {cartItems.length} référence{cartItems.length > 1 ? 's' : ''} sélectionnée{cartItems.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black text-amber-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-950/40 border border-amber-800/30 flex items-center justify-center mx-auto text-amber-500/60">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg text-white font-bold">Votre panier est vide</h4>
                  <p className="text-xs text-amber-200/60 max-w-xs mx-auto">
                    Explorez notre carte et ajoutez les merveilles de la gastronomie camerounaise !
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-amber-500 text-black text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Voir la carte
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.dish.id}-${index}`}
                        className="bg-[#1a130c] border border-amber-900/40 rounded-2xl p-3 flex gap-3 relative group"
                      >
                        <img
                          src={item.dish.image}
                          alt={item.dish.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-amber-900/60"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{item.dish.name}</h4>
                          {item.selectedAccompaniment && (
                            <p className="text-[10px] text-amber-400 font-medium truncate mt-0.5">
                              Garniture : {item.selectedAccompaniment}
                            </p>
                          )}
                          <p className="text-xs font-extrabold text-amber-300 mt-1">
                            {(item.dish.price * item.quantity).toLocaleString('fr-FR')} FCFA
                          </p>

                          {/* Quantity control */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center bg-black/60 border border-amber-900/50 rounded-lg p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-amber-300 hover:text-white"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold px-2 text-white">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-amber-300 hover:text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-amber-500/40 hover:text-red-400 p-1 self-start transition-colors cursor-pointer"
                          title="Supprimer du panier"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Mode Choice */}
                  <div className="space-y-2 pt-2 border-t border-amber-900/40">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                      Mode de récupération :
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('livraison')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          deliveryType === 'livraison'
                            ? 'bg-amber-600/30 border-amber-400 text-white font-bold'
                            : 'bg-[#18110a] border-amber-900/40 text-amber-200/60'
                        }`}
                      >
                        <Truck className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                        <span className="text-[10px] block leading-tight">Livraison (+1000 F)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryType('emporter')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          deliveryType === 'emporter'
                            ? 'bg-amber-600/30 border-amber-400 text-white font-bold'
                            : 'bg-[#18110a] border-amber-900/40 text-amber-200/60'
                        }`}
                      >
                        <Store className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                        <span className="text-[10px] block leading-tight">À emporter</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryType('sur_place')}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          deliveryType === 'sur_place'
                            ? 'bg-amber-600/30 border-amber-400 text-white font-bold'
                            : 'bg-[#18110a] border-amber-900/40 text-amber-200/60'
                        }`}
                      >
                        <Utensils className="w-4 h-4 mx-auto mb-1 text-amber-400" />
                        <span className="text-[10px] block leading-tight">Sur place</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer details fields */}
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Votre nom complet"
                      className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3 py-2 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                    />

                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Votre téléphone WhatsApp / Appel"
                      className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3 py-2 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                    />

                    {deliveryType === 'livraison' && (
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Adresse de livraison (Quartier, Repère exact à Douala/Ydé)"
                        className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3 py-2 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                      />
                    )}

                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="Remarques pour la commande (optionnel)"
                      className="w-full bg-[#1b140d] border border-amber-900/50 rounded-xl px-3 py-2 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer with Orange Money Payment Trigger */}
            {cartItems.length > 0 && (
              <div className="p-5 bg-[#16100a] border-t border-amber-900/50 space-y-3">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-amber-200/70">
                    <span>Sous-total plats</span>
                    <span>{subtotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  {deliveryType === 'livraison' && (
                    <div className="flex justify-between text-amber-200/70">
                      <span>Frais de livraison express</span>
                      <span>1 000 FCFA</span>
                    </div>
                  )}
                  <div className="flex justify-between font-serif text-lg font-black text-amber-300 pt-2 border-t border-amber-900/40">
                    <span>Total à régler</span>
                    <span>{totalAmount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                </div>

                {/* Orange Money Pay Button */}
                <button
                  type="button"
                  onClick={handleProceedToOrangeMoney}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7900] to-orange-600 hover:from-orange-500 hover:to-orange-500 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/60 transition-all cursor-pointer active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>Payer avec Orange Money (698621438)</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <p className="text-[10px] text-center text-amber-200/50 flex items-center justify-center gap-1">
                  <span>Numéro officiel :</span>
                  <strong className="text-orange-400 font-mono">698621438</strong>
                  <span>• Validation immédiate</span>
                </p>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Orange Money Modal */}
      <OrangeMoneyModal
        isOpen={showOrangeMoneyModal}
        onClose={() => setShowOrangeMoneyModal(false)}
        cartItems={cartItems}
        totalAmount={totalAmount}
        deliveryType={deliveryType}
        customerName={customerName}
        customerPhone={customerPhone}
        deliveryAddress={deliveryAddress}
        notes={specialNotes}
        onOrderSuccess={handleOrderFinished}
      />
    </>
  );
};
