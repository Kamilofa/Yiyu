import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Printer, MessageSquare, X, Clock, MapPin, Truck, Copy, Check, Download, Utensils, QrCode, Database } from 'lucide-react';
import { Order } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/dishes';

interface OfficialReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OfficialReceiptModal: React.FC<OfficialReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const receiptCode = order.receiptNumber || `REC-LSA-2026-${order.id.slice(-4)}`;
  const orderDate = order.orderDate || new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getFullReceiptText = () => {
    const itemsText = order.items
      .map(
        (it) =>
          `• ${it.quantity}x ${it.dish.name}\n  Garniture: ${it.selectedAccompaniment || 'Standard'}\n  Piment: ${it.spicePreference || it.dish.spiceLevel}\n  Prix: ${(it.dish.price * it.quantity).toLocaleString('fr-FR')} FCFA`
      )
      .join('\n');

    return `========================================
LES SAVEURS D'AFRIQUE - RESTAURANT CAMEROUNAIS
REÇU OFFICIEL DE VALIDATION DE COMMANDE
========================================
N° de Reçu    : ${receiptCode}
N° Commande   : ${order.id}
Date & Heure  : ${orderDate} à ${order.createdAt}
Statut        : COMMANDE VALIDÉE & CONFIRMÉE
----------------------------------------
CLIENT :
Nom           : ${order.customerName}
Téléphone     : ${order.customerPhone}
Mode          : ${order.deliveryType.toUpperCase()}
${order.deliveryAddress ? `Adresse       : ${order.deliveryAddress}\n` : ''}----------------------------------------
PAIEMENT CERTIFIÉ :
Mode          : ORANGE MONEY CAMEROUN
Numéro OM     : 693205278
Titulaire     : ${RESTAURANT_INFO.orangeMoneyHolder}
Réf Transac   : ${order.transactionRef}
----------------------------------------
PLATS COMMANDÉS :
${itemsText}
----------------------------------------
TOTAL RÉGLÉ   : ${order.totalAmount.toLocaleString('fr-FR')} FCFA
========================================
Restaurant Bonapriso, Douala & Bastos, Yaoundé
Tél / WhatsApp : +237 693 20 52 78
Merci de votre confiance en la gastronomie camerounaise !
========================================`;
  };

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(getFullReceiptText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const generateWhatsAppLink = () => {
    const msg = `Bonjour Les Saveurs d'Afrique !
Voici mon REÇU OFFICIEL DE VALIDATION DE COMMANDE :
----------------------------------------
📜 Reçu N° : ${receiptCode}
📦 Commande N° : ${order.id}
👤 Client : ${order.customerName} (${order.customerPhone})
📍 Mode : ${order.deliveryType.toUpperCase()} ${order.deliveryAddress ? `(${order.deliveryAddress})` : ''}
💰 Total Payé : ${order.totalAmount.toLocaleString('fr-FR')} FCFA
📱 Réf Orange Money : ${order.transactionRef}
💳 Réglé au numéro OM : 693205278

Détail des menus typiques :
${order.items.map(i => `- ${i.quantity}x ${i.dish.name} [${i.selectedAccompaniment || 'Standard'}]`).join('\n')}

Veuillez confirmer la réception et le départ en livraison. Merci !`;

    return `https://wa.me/237693205278?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#140e08] border-2 border-amber-500/70 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Printable Receipt Top Bar */}
        <div className="bg-gradient-to-r from-amber-950 via-[#22160d] to-orange-950 p-4 border-b border-amber-700/40 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300">
              Reçu Officiel Certifié
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-black/50 hover:bg-black text-amber-200 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
              title="Imprimer / Enregistrer en PDF"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Imprimer</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black text-amber-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-amber-100/90 text-xs bg-[#100a06]">
          
          {/* Header of Receipt / Cameroon Restaurant Identity */}
          <div className="text-center pb-5 border-b-2 border-dashed border-amber-900/60 space-y-1.5 relative">
            
            {/* Stamp / Tampon Officiel */}
            <div className="absolute right-0 top-0 hidden sm:flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-dashed border-emerald-500/70 p-2 text-center text-emerald-400 rotate-[-12deg] bg-emerald-950/20 pointer-events-none">
              <span className="text-[8px] font-black tracking-widest uppercase">★ CERTIFIÉ ★</span>
              <span className="text-[10px] font-extrabold leading-tight">COMMANDE VALIDÉE</span>
              <span className="text-[7px] text-emerald-300 font-mono mt-0.5">ORANGE MONEY 693205278</span>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/70 px-3 py-0.5 rounded-full border border-emerald-500/40">
                ✓ Reçu de Validation Confirmé
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-tight">
              LES SAVEURS D'AFRIQUE
            </h2>
            <p className="text-xs text-amber-300/80 uppercase font-semibold tracking-wider">
              Haute Gastronomie & Braises Typiquement Camerounaises
            </p>
            <p className="text-[11px] text-amber-200/60 max-w-md mx-auto">
              Quartier Bonapriso (Douala) • Espace VIP Bastos (Yaoundé) • Tél: +237 693 20 52 78
            </p>
          </div>

          {/* Receipt Identification Metadata */}
          <div className="bg-[#18110a] border border-amber-800/40 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-amber-200/50 uppercase font-bold block">N° de Reçu</span>
              <span className="font-mono font-black text-amber-400 text-sm">{receiptCode}</span>
            </div>
            <div>
              <span className="text-[10px] text-amber-200/50 uppercase font-bold block">N° Commande</span>
              <span className="font-mono font-bold text-white text-sm">{order.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-amber-200/50 uppercase font-bold block">Date & Heure</span>
              <span className="font-semibold text-white text-xs">{orderDate} • {order.createdAt}</span>
            </div>
            <div>
              <span className="text-[10px] text-amber-200/50 uppercase font-bold block">Statut Validation</span>
              <span className="font-bold text-emerald-400 text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Payé & En cuisine
              </span>
            </div>
          </div>

          {/* Client & Delivery Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#160f09] p-4 rounded-2xl border border-amber-900/40">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">
                Destinataire / Client :
              </span>
              <p className="font-bold text-white text-sm">{order.customerName}</p>
              <p className="text-amber-200/70 text-xs flex items-center gap-1">
                <span>Téléphone :</span> <strong className="text-white">{order.customerPhone}</strong>
              </p>
            </div>

            <div className="space-y-1 sm:border-l sm:border-amber-900/30 sm:pl-4">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">
                Mode de Réception :
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white capitalize">
                {order.deliveryType === 'livraison' ? <Truck className="w-4 h-4 text-amber-400" /> : <Utensils className="w-4 h-4 text-amber-400" />}
                <span>
                  {order.deliveryType === 'livraison' ? 'Livraison Express à Domicile' : order.deliveryType === 'emporter' ? 'À emporter (Click & Collect)' : 'Service sur Place'}
                </span>
              </div>
              {order.deliveryAddress && (
                <p className="text-amber-200/80 text-[11px] leading-snug">
                  Adresse : {order.deliveryAddress}
                </p>
              )}
            </div>
          </div>

          {/* Payment Certificate Badge */}
          <div className="bg-gradient-to-r from-orange-950/60 via-[#1e130a] to-orange-950/60 border border-orange-500/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-black text-orange-400 text-sm shrink-0">
                OM
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange-300 block">
                  Paiement Mobile Encaissé
                </span>
                <p className="font-bold text-white text-xs">
                  Orange Money : <strong className="font-mono text-orange-400">693205278</strong>
                </p>
                <p className="font-mono text-[11px] text-orange-200/70">
                  Réf SMS : {order.transactionRef}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <div className="bg-black/50 px-3 py-1.5 rounded-xl border border-orange-500/30 text-right">
                <span className="text-[10px] text-amber-200/50 uppercase block">Règlement</span>
                <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Vérifié avec succès
                </span>
              </div>
              <span className="text-[10px] text-emerald-300/90 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-400" />
                Synchronisé Supabase Cloud
              </span>
            </div>
          </div>

          {/* Detailed Itemized Table */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
              Détail des Spécialités Typiquement Camerounaises :
            </span>

            <div className="border border-amber-900/50 rounded-2xl overflow-hidden bg-[#160f09]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1f150d] text-amber-300 border-b border-amber-900/50 text-[10px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Plat / Spécialité</th>
                    <th className="py-2.5 px-2 text-center">Qté</th>
                    <th className="py-2.5 px-3 text-right">Prix Unitaire</th>
                    <th className="py-2.5 px-3 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/30">
                  {order.items.map((item, index) => (
                    <tr key={index} className="hover:bg-amber-950/20">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{item.dish.name}</div>
                        <div className="text-[10px] text-amber-400 flex flex-wrap gap-2 mt-0.5">
                          {item.selectedAccompaniment && (
                            <span>Garniture : <strong>{item.selectedAccompaniment}</strong></span>
                          )}
                          {item.spicePreference && (
                            <span>Piment : <strong>{item.spicePreference}</strong></span>
                          )}
                        </div>
                        {item.specialInstructions && (
                          <div className="text-[10px] text-amber-200/50 italic mt-0.5">
                            Note : {item.specialInstructions}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-white">
                        {item.quantity}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-200/80">
                        {item.dish.price.toLocaleString('fr-FR')} FCFA
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-400">
                        {(item.dish.price * item.quantity).toLocaleString('fr-FR')} FCFA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Calculation breakdown */}
              <div className="bg-[#1b120a] p-4 border-t border-amber-900/50 space-y-1.5 text-xs">
                <div className="flex justify-between text-amber-200/70">
                  <span>Sous-total des mets :</span>
                  <span className="font-mono">
                    {order.items.reduce((s, it) => s + it.dish.price * it.quantity, 0).toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                {order.deliveryType === 'livraison' && (
                  <div className="flex justify-between text-amber-200/70">
                    <span>Frais de livraison express :</span>
                    <span className="font-mono">1 000 FCFA</span>
                  </div>
                )}
                <div className="pt-2 border-t border-amber-900/40 flex justify-between items-center text-sm">
                  <span className="font-serif font-black text-white text-base">TOTAL RÉGLÉ (TTC) :</span>
                  <span className="font-serif font-black text-amber-400 text-xl font-mono">
                    {order.totalAmount.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Barcode / Security Seal Note */}
          <div className="bg-[#140e08] border border-amber-900/60 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">
                Authentification de Commande
              </span>
              <p className="text-[11px] text-amber-200/70 leading-snug">
                Ce reçu électronique officiel atteste de l'encaissement et de la validation de votre commande auprès de notre brigade.
              </p>
            </div>
            <div className="w-14 h-14 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-black" />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#0f0a06] border-t border-amber-900/50 flex flex-wrap gap-2.5 shrink-0">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="flex-1 min-w-[200px] py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-950/40"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Envoyer le Reçu sur WhatsApp</span>
          </a>

          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer / PDF</span>
          </button>

          <button
            onClick={handleCopyReceipt}
            className="py-3 px-3.5 rounded-xl bg-amber-950/60 hover:bg-amber-900 border border-amber-700/50 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            title="Copier le texte du reçu"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copied ? 'Copié !' : 'Copier'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
