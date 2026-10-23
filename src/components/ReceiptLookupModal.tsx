import React, { useState } from 'react';
import { Search, X, Receipt, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Order } from '../types/restaurant';

interface ReceiptLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
  onSelectOrder: (order: Order) => void;
}

export const ReceiptLookupModal: React.FC<ReceiptLookupModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
  onSelectOrder
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setErrorMsg('Veuillez saisir votre numéro de reçu, code commande ou numéro de téléphone.');
      return;
    }

    const found = recentOrders.find(
      (ord) =>
        ord.id.toLowerCase().includes(q) ||
        (ord.receiptNumber && ord.receiptNumber.toLowerCase().includes(q)) ||
        ord.customerPhone.toLowerCase().includes(q) ||
        ord.transactionRef.toLowerCase().includes(q)
    );

    if (found) {
      onSelectOrder(found);
      onClose();
    } else {
      setErrorMsg('Aucun reçu correspondant trouvé. Veuillez vérifier votre code ou numéro Orange Money.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#140e08] border-2 border-amber-600/50 rounded-3xl p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-amber-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Retrouver Mon Reçu
              </h3>
              <p className="text-[11px] text-amber-200/60">
                Consultez votre validation de commande à tout moment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/50 text-amber-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSearch} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5">
              Numéro de Reçu, Commande ou Téléphone :
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ex: REC-LSA-2026... ou 698 00 00 00"
                className="w-full bg-[#1b140d] border border-amber-900/60 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-amber-400/30 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-950/50 active:scale-98 transition-all"
          >
            <Search className="w-4 h-4 text-black" />
            <span>Afficher Mon Reçu Officiel</span>
          </button>
        </form>

        {/* Recent orders list if any */}
        {recentOrders.length > 0 && (
          <div className="pt-2 border-t border-amber-900/40 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 block">
              Vos commandes récentes :
            </span>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {recentOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => {
                    onSelectOrder(ord);
                    onClose();
                  }}
                  className="p-2.5 bg-[#1a120b] hover:bg-amber-950/40 border border-amber-900/40 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div>
                    <span className="font-mono font-bold text-amber-300 block">{ord.receiptNumber || ord.id}</span>
                    <span className="text-[10px] text-amber-200/60">{ord.items.length} mets • {ord.totalAmount.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
