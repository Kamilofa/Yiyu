import React from 'react';
import { CheckCircle2, ShieldCheck, Printer, MessageSquare, X, Clock, MapPin, Truck } from 'lucide-react';
import { Order } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/dishes';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppLink = () => {
    const itemsList = order.items
      .map(i => `- ${i.quantity}x ${i.dish.name} (${i.selectedAccompaniment || 'Standard'}) : ${(i.dish.price * i.quantity).toLocaleString('fr-FR')} FCFA`)
      .join('\n');

    const msg = `Bonjour Les Saveurs d'Afrique !
Voici ma nouvelle commande payée par Orange Money :
Numéro de Commande : ${order.id}
Client : ${order.customerName} (${order.customerPhone})
Mode : ${order.deliveryType.toUpperCase()}
${order.deliveryAddress ? `Adresse : ${order.deliveryAddress}\n` : ''}Total réglé : ${order.totalAmount.toLocaleString('fr-FR')} FCFA
Réf Transaction OM : ${order.transactionRef}
Payé au : 698621438

Détail des plats :
${itemsList}

Merci de lancer la préparation !`;

    return `https://wa.me/237698621438?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#140e08] border-2 border-emerald-500/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-6 text-white text-center relative border-b border-emerald-600/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-2 text-emerald-300">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest bg-emerald-900/60 px-3 py-0.5 rounded-full text-emerald-200 border border-emerald-500/30">
            Paiement Orange Money Validé
          </span>

          <h3 className="font-serif text-2xl font-black text-white mt-2">
            Commande #{order.id}
          </h3>
          <p className="text-xs text-emerald-100/80">
            Enregistrée à {order.createdAt} • En cours de préparation par la brigade
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-amber-100/90 text-xs">
          
          {/* Orange Money Payment Receipt Badge */}
          <div className="bg-[#1b130a] border border-orange-500/40 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold border border-orange-500/40">
                OM
              </div>
              <div>
                <span className="text-[10px] text-amber-200/60 uppercase font-bold block">
                  Transaction Orange Money Réussie
                </span>
                <span className="font-mono text-orange-300 font-bold text-xs">
                  Réf: {order.transactionRef}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-amber-200/60 block uppercase">Destinataire</span>
              <span className="font-mono font-bold text-white text-xs">698621438</span>
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="grid grid-cols-2 gap-3 bg-[#181109] p-3.5 rounded-2xl border border-amber-900/40 text-xs">
            <div>
              <span className="text-amber-200/50 block text-[10px] uppercase font-bold">Client</span>
              <span className="font-bold text-white block">{order.customerName}</span>
              <span className="text-amber-200/70 text-[11px]">{order.customerPhone}</span>
            </div>
            <div>
              <span className="text-amber-200/50 block text-[10px] uppercase font-bold">Mode de récupération</span>
              <span className="font-bold text-amber-400 capitalize block flex items-center gap-1">
                {order.deliveryType === 'livraison' ? <Truck className="w-3.5 h-3.5" /> : null}
                {order.deliveryType}
              </span>
              {order.deliveryAddress && (
                <span className="text-amber-200/70 text-[11px] block truncate">{order.deliveryAddress}</span>
              )}
            </div>
          </div>

          {/* Dish list */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
              Détail des plats commandés :
            </span>
            <div className="space-y-1.5 divide-y divide-amber-900/30">
              {order.items.map((item, idx) => (
                <div key={idx} className="pt-2 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-white">{item.quantity}x {item.dish.name}</span>
                    {item.selectedAccompaniment && (
                      <span className="text-[10px] text-amber-400/80 block">Garniture: {item.selectedAccompaniment}</span>
                    )}
                  </div>
                  <span className="font-bold text-amber-300 font-mono">
                    {(item.dish.price * item.quantity).toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t-2 border-amber-800/40 flex justify-between items-center">
            <span className="font-serif text-base font-bold text-white">Montant Total Réglé :</span>
            <span className="font-serif text-xl font-black text-amber-400">
              {order.totalAmount.toLocaleString('fr-FR')} FCFA
            </span>
          </div>

          {/* Preparation Status */}
          <div className="bg-[#1a140d] border border-amber-900/50 p-3 rounded-xl flex items-center gap-3 text-xs text-amber-200/80">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Délai estimé : 25 à 40 minutes</span>
              <span className="text-[11px]">Un livreur vous contactera par téléphone dès le départ de la cuisine.</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#0f0a06] border-t border-amber-900/40 flex flex-col sm:flex-row gap-3">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Envoyer récapitulatif WhatsApp</span>
          </a>

          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-700/50 text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer le reçu</span>
          </button>
        </div>

      </div>
    </div>
  );
};
