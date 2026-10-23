import React, { useState } from 'react';
import { UtensilsCrossed, ShoppingBag, Calendar, Phone, Menu, X, Sparkles, ShieldCheck, Receipt } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/dishes';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenReceiptLookup: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenReceiptLookup,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Notre Carte', href: '#menu' },
    { label: 'Promotions', href: '#promotions', isPromo: true },
    { label: 'Réservation', href: '#reservation' },
    { label: 'Galerie Photos', href: '#galerie' },
    { label: 'Avis Clients', href: '#avis' },
    { label: 'Notre Histoire', href: '#histoire' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f0c08]/90 backdrop-blur-md border-b border-amber-900/30">
      {/* Top Banner with Orange Money announcement & Phone */}
      <div className="bg-gradient-to-r from-amber-950 via-[#1c130b] to-orange-950 border-b border-amber-800/20 py-1.5 px-4 text-xs font-medium text-amber-200/90">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-amber-100 font-semibold">Restaurant Ouvert</span>
            <span className="hidden sm:inline text-amber-300/60">•</span>
            <span className="hidden sm:inline text-amber-200/80">Spécialités des 10 régions du Cameroun</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full px-2.5 py-0.5 text-[11px] text-orange-300">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Orange Money : <strong className="text-white tracking-wide">698621438</strong></span>
            </div>
            <a 
              href={`tel:${RESTAURANT_INFO.phone}`} 
              className="flex items-center gap-1 text-amber-300 hover:text-amber-100 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden md:inline">{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#accueil" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-0.5 shadow-lg shadow-amber-950/50 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#120d09] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#120d09]" title="100% Terroir Cameroun"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  Les Saveurs d'Afrique
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Cameroun
                </span>
              </div>
              <p className="text-[11px] text-amber-400/70 tracking-wider uppercase font-medium">
                Haute Gastronomie & Braises
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-amber-200/80 hover:text-amber-400 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 flex items-center gap-1.5"
              >
                <span>{link.label}</span>
                {link.isPromo && (
                  <span className="text-[10px] uppercase font-black bg-gradient-to-r from-red-600 to-orange-500 text-white px-1.5 py-0.2 rounded-full animate-pulse shadow-sm">
                    Promo
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Receipt Lookup Button */}
            <button
              onClick={onOpenReceiptLookup}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-800/50 hover:border-amber-600 transition-colors cursor-pointer"
              title="Consulter mon reçu de commande"
            >
              <Receipt className="w-3.5 h-3.5 text-amber-400" />
              <span>Mon Reçu</span>
            </button>

            {/* Table Reservation Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-amber-100 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-700/50 hover:border-amber-500 transition-all duration-300 shadow-sm cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Réserver</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Voir le panier"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-semibold text-xs transition-all duration-300 shadow-md shadow-orange-950/40 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              <span className="hidden sm:inline font-bold">Panier</span>
              {cartCount > 0 ? (
                <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-black bg-black text-amber-300 rounded-full border border-amber-400 animate-bounce">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[11px] opacity-75 font-normal">0</span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-amber-300 hover:text-white"
              aria-label="Menu mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#140f0a] border-b border-amber-800/30 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-amber-900/40">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-amber-900/50 border border-amber-600/40 text-amber-200 text-xs font-semibold"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Réserver table
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-orange-600 text-black text-xs font-bold"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Mon Panier ({cartCount})
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenReceiptLookup();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-950/60 border border-amber-800/50 text-amber-300 text-xs font-medium"
          >
            <Receipt className="w-3.5 h-3.5 text-amber-400" />
            <span>Retrouver mon Reçu de validation</span>
          </button>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-amber-200/90 hover:bg-amber-900/30 hover:text-amber-400"
              >
                <span>{link.label}</span>
                {link.isPromo && (
                  <span className="text-[10px] uppercase font-black bg-gradient-to-r from-red-600 to-orange-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                    Promo
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-amber-950/30 border border-orange-500/20 text-xs text-amber-300/80 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Orange Money Direct :
            </span>
            <span className="font-bold text-white bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/30">
              698621438
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
