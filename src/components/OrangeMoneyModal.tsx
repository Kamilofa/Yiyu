import React, { useState } from 'react';
import { X, CheckCircle2, Copy, Check, Phone, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RESTAURANT_INFO } from '../data/dishes';
import { CartItem, Order } from '../types/restaurant';

interface OrangeMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  deliveryType: 'livraison' | 'emporter' | 'sur_place';
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes?: string;
  onOrderSuccess: (order: Order) => void;
}

export const OrangeMoneyModal: React.FC<OrangeMoneyModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
  deliveryType,
  customerName,
  customerPhone,
  deliveryAddress,
  notes,
  onOrderSuccess
}) => {
  if (!isOpen) return null;

  const [transactionRef, setTransactionRef] = useState('');
  const [payerPhone, setPayerPhone] = useState(customerPhone || '');
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // OM USSD code standard Cameroon: *150*1*1*698621438*AMOUNT#
  const ussdCode = `*150*1*1*${RESTAURANT_INFO.orangeMoneyNumber}*${totalAmount}#`;

  const handleCopyUSSD = () => {
    navigator.clipboard.writeText(ussdCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGenerateSampleRef = () => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    setTransactionRef(`OM.CI.${new Date().toISOString().slice(2, 10).replace(/-/g, '')}.${randomSuffix}`);
  };

  const handleValidatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!payerPhone || payerPhone.trim().length < 8) {
      setErrorMsg('Veuillez saisir le numéro de téléphone utilisé pour le paiement Orange Money.');
      return;
    }

    if (!transactionRef || transactionRef.trim().length < 5) {
      setErrorMsg('Veuillez saisir la référence de transaction SMS reçue d\'Orange Money.');
      return;
    }

    setIsVerifying(true);

    // Simulate verified transaction
    setTimeout(() => {
      setIsVerifying(false);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }

      const orderCodeNum = Math.floor(1000 + Math.random() * 9000);
      const newOrder: Order = {
        id: `LSA-OM-${orderCodeNum}`,
        receiptNumber: `REC-LSA-2026-${orderCodeNum}`,
        orderDate: new Date().toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        items: [...cartItems],
        totalAmount,
        customerName: customerName || 'Client Orange Money',
        customerPhone: payerPhone,
        deliveryType,
        deliveryAddress: deliveryType === 'livraison' ? deliveryAddress : undefined,
        notes,
        paymentMethod: 'orange_money',
        orangeMoneyPhone: RESTAURANT_INFO.orangeMoneyNumber,
        transactionRef,
        createdAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        status: 'paye'
      };

      onOrderSuccess(newOrder);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#140f0a] border-2 border-orange-500/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Official Orange Money Brand Accent */}
        <div className="bg-gradient-to-r from-[#FF7900] via-[#e06500] to-[#b84e00] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-lg shrink-0 flex items-center justify-center">
              {/* Stylized Orange Money Logo badge */}
              <div className="w-full h-full bg-[#FF7900] rounded-xl flex items-center justify-center font-black text-black text-xs tracking-tighter">
                OM
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded-full text-white">
                  Paiement Mobile Officiel
                </span>
                <span className="text-xs font-semibold text-orange-100 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Sécurisé
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif text-white mt-0.5">
                Paiement Orange Money
              </h3>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
            <span>Destinataire : <strong>{RESTAURANT_INFO.orangeMoneyHolder}</strong></span>
            <span className="font-mono bg-black/40 px-2 py-0.5 rounded font-bold text-orange-200">
              {RESTAURANT_INFO.orangeMoneyNumber}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-amber-100/90 text-xs">
          
          {/* Amount to pay */}
          <div className="bg-[#1b140d] border border-orange-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-amber-200/60 uppercase tracking-wider block">
                Total à régler
              </span>
              <span className="font-serif text-2xl font-black text-amber-400">
                {totalAmount.toLocaleString('fr-FR')} FCFA
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-1 rounded-md border border-amber-800/40">
                {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* USSD Syntax Box */}
          <div className="bg-[#18110b] border border-amber-900/60 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-amber-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                Syntaxe USSD directe (Cameroun) :
              </span>
              <span className="text-[10px] text-emerald-400 font-normal">Sans frais cachés</span>
            </div>

            <div className="flex items-center justify-between gap-2 bg-black/60 p-2.5 rounded-xl border border-amber-800/40 font-mono text-sm text-orange-300 font-bold overflow-x-auto">
              <span>{ussdCode}</span>
              <button
                type="button"
                onClick={handleCopyUSSD}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600 hover:bg-orange-500 text-black text-[11px] font-sans font-bold cursor-pointer transition-colors"
              >
                {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href={`tel:${encodeURIComponent(ussdCode)}`}
                className="flex-1 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-700/50 text-amber-200 text-center text-[11px] font-bold transition-colors"
              >
                📞 Composer sur mon mobile
              </a>
            </div>
          </div>

          {/* Simple 3 steps guidance */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-amber-400 text-[11px]">
              Instructions en 3 étapes :
            </h4>
            <ol className="space-y-1.5 text-amber-200/80 list-decimal list-inside pl-1 text-[11px] leading-relaxed">
              <li>Composez le code ci-dessus ou ouvrez votre app <strong>Orange Money</strong>.</li>
              <li>Validez le montant de <strong>{totalAmount.toLocaleString('fr-FR')} FCFA</strong> vers le numéro <strong>{RESTAURANT_INFO.orangeMoneyNumber}</strong>.</li>
              <li>Renseignez ci-dessous le numéro expéditeur et la référence SMS reçue.</li>
            </ol>
          </div>

          {/* Form to submit transaction ID */}
          <form onSubmit={handleValidatePayment} className="space-y-3 pt-1 border-t border-amber-900/40">
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1">
                Numéro Orange Money utilisé :
              </label>
              <input
                type="tel"
                value={payerPhone}
                onChange={(e) => setPayerPhone(e.target.value)}
                placeholder="Ex: 698 12 34 56"
                required
                className="w-full bg-[#1b140d] border border-amber-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Référence de transaction SMS :
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSampleRef}
                  className="text-[10px] text-orange-400 hover:text-orange-300 underline cursor-pointer"
                >
                  Générer code test
                </button>
              </div>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="Ex: OM.CI.261023.784920"
                required
                className="w-full bg-[#1b140d] border border-amber-900/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-orange-600 hover:from-orange-500 hover:to-orange-600 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-orange-950/60 active:scale-98 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Vérification du paiement en cours...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Confirmer mon Paiement Orange Money</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
