import React, { useState } from 'react';
import { X, Copy, Check, Database, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SupabaseSqlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SUPABASE_SQL_CODE = `-- ==============================================================================
-- RESTAURANT "LES SAVEURS D'AFRIQUE" - CONFIGURATION SUPABASE
-- Script SQL pour la création de la table "commandes" avec Row Level Security (RLS)
-- ==============================================================================

-- 1. Création de la table des commandes
CREATE TABLE IF NOT EXISTS public.commandes (
    id TEXT PRIMARY KEY,                                      -- Code commande (ex: LSA-OM-4821)
    receipt_number TEXT NOT NULL,                             -- Numéro de reçu officiel (ex: REC-LSA-2026-4821)
    client_nom TEXT NOT NULL,                                 -- Nom complet du client
    client_telephone TEXT NOT NULL,                           -- Numéro de téléphone / WhatsApp
    adresse_livraison TEXT,                                   -- Adresse de livraison
    mode_livraison TEXT NOT NULL DEFAULT 'livraison',         -- 'livraison', 'emporter', 'sur_place'
    plats JSONB NOT NULL,                                     -- Liste détaillée des plats
    total_montant NUMERIC(12, 2) NOT NULL,                    -- Montant total réglé en FCFA
    mode_paiement TEXT NOT NULL DEFAULT 'orange_money',       -- Moyen de paiement
    orange_money_phone TEXT NOT NULL DEFAULT '693205278',     -- Numéro OM (693205278)
    transaction_ref TEXT,                                     -- Référence SMS Orange Money
    statut TEXT NOT NULL DEFAULT 'paye',                      -- 'paye', 'en_preparation', 'livre'
    notes TEXT,                                               -- Instructions spéciales
    date_commande TIMESTAMPTZ NOT NULL DEFAULT NOW(),         -- Date de commande
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()             -- Timestamp
);

-- 2. Index pour accélérer la recherche
CREATE INDEX IF NOT EXISTS idx_commandes_telephone ON public.commandes(client_telephone);
CREATE INDEX IF NOT EXISTS idx_commandes_receipt ON public.commandes(receipt_number);
CREATE INDEX IF NOT EXISTS idx_commandes_created_at ON public.commandes(created_at DESC);

-- 3. Activation de la Sécurité Row Level Security (RLS)
ALTER TABLE public.commandes ENABLE ROW LEVEL SECURITY;

-- 4. Politique d'Insertion publique (pour les commandes du site)
DROP POLICY IF EXISTS "Permettre l'insertion publique des commandes" ON public.commandes;
CREATE POLICY "Permettre l'insertion publique des commandes"
ON public.commandes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. Politique de Consultation publique (reçus de validation)
DROP POLICY IF EXISTS "Permettre la lecture publique des commandes" ON public.commandes;
CREATE POLICY "Permettre la lecture publique des commandes"
ON public.commandes
FOR SELECT
TO anon, authenticated
USING (true);

-- 6. Politique de Modification réservée au personnel
DROP POLICY IF EXISTS "Permettre la mise à jour pour le personnel authentifie" ON public.commandes;
CREATE POLICY "Permettre la mise à jour pour le personnel authentifie"
ON public.commandes
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);`;

export const SupabaseSqlModal: React.FC<SupabaseSqlModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'success' | 'table_missing' | 'error'; message?: string }>({ status: 'idle' });

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult({ status: 'idle' });

    try {
      // Query 1 row from commandes table
      const { error } = await supabase.from('commandes').select('id').limit(1);

      if (error) {
        if (error.code === '42P01' || error.message.includes('relation "public.commandes" does not exist')) {
          setTestResult({
            status: 'table_missing',
            message: 'Connexion à Supabase réussie, mais la table "commandes" n\'est pas encore créée dans votre base. Exécutez le script SQL ci-dessous dans votre SQL Editor Supabase.'
          });
        } else {
          setTestResult({
            status: 'error',
            message: `Erreur Supabase: ${error.message}`
          });
        }
      } else {
        setTestResult({
          status: 'success',
          message: 'Parfait ! La table "commandes" existe déjà dans Supabase avec RLS activé et est prête à enregistrer les commandes en temps réel !'
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setTestResult({
        status: 'error',
        message: `Impossible de contacter Supabase: ${msg}`
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#140e08] border-2 border-emerald-500/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#131b14] to-[#120d08] p-5 border-b border-emerald-600/40 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  Supabase PostgreSQL Connecté
                </span>
                <span className="text-xs text-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  RLS Activé
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                Script SQL Table "commandes"
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black text-amber-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-amber-100/90 text-xs">
          
          {/* Connection summary */}
          <div className="bg-[#18110a] border border-amber-900/60 rounded-2xl p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Projet Supabase Actif :
              </span>
              <a
                href="https://supabase.com/dashboard/project/ggftumqocnfejwdfexei/sql"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 underline"
              >
                <span>Ouvrir le SQL Editor Supabase</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-amber-200/80">
              <div className="bg-black/50 p-2 rounded-lg border border-amber-900/40 truncate">
                <span className="text-amber-400 block text-[9px] uppercase font-bold">URL Supabase :</span>
                https://ggftumqocnfejwdfexei.supabase.co
              </div>
              <div className="bg-black/50 p-2 rounded-lg border border-amber-900/40 truncate">
                <span className="text-amber-400 block text-[9px] uppercase font-bold">Clé Publique :</span>
                sb_publishable_Zm34NEdtcGhshh55E7UtmA...
              </div>
            </div>

            {/* Test connection action */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                <span>Tester l'état de la table "commandes"</span>
              </button>

              <span className="text-[11px] text-amber-200/60">
                Table: <strong>public.commandes</strong>
              </span>
            </div>

            {/* Test result feedback */}
            {testResult.status === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{testResult.message}</span>
              </div>
            )}
            {testResult.status === 'table_missing' && (
              <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-500/50 text-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{testResult.message}</span>
              </div>
            )}
            {testResult.status === 'error' && (
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* SQL Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Code SQL complet à exécuter dans Supabase :
              </label>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Code SQL copié !' : 'Copier le code SQL'}</span>
              </button>
            </div>

            <pre className="bg-[#0a0704] border border-amber-900/60 rounded-2xl p-4 text-[11px] font-mono text-emerald-300/90 overflow-x-auto max-h-72 leading-relaxed selection:bg-emerald-700 selection:text-white">
              {SUPABASE_SQL_CODE}
            </pre>
          </div>

          {/* Quick instructions */}
          <div className="space-y-1.5 text-xs text-amber-200/80">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Instructions en 3 étapes :
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-amber-200/70 leading-relaxed pl-1">
              <li>Cliquez sur <strong>« Copier le code SQL »</strong> ci-dessus.</li>
              <li>Ouvrez votre projet Supabase dans le <strong>SQL Editor</strong>.</li>
              <li>Collez le code, cliquez sur <strong>Run</strong> : la table et les politiques RLS sont immédiatement créées.</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0f0a06] border-t border-amber-900/50 flex items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-amber-200/60">
            Toute nouvelle commande passée sur le site s'enregistrera automatiquement.
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
