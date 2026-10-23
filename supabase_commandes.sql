-- ==============================================================================
-- RESTAURANT "LES SAVEURS D'AFRIQUE" - CONFIGURATION SUPABASE
-- Script SQL pour la création de la table "commandes" avec Row Level Security (RLS)
-- ==============================================================================

-- 1. Création de la table des commandes
CREATE TABLE IF NOT EXISTS public.commandes (
    id TEXT PRIMARY KEY,                                      -- Code de commande (ex: LSA-OM-4821)
    receipt_number TEXT NOT NULL,                             -- Numéro de reçu officiel (ex: REC-LSA-2026-4821)
    client_nom TEXT NOT NULL,                                 -- Nom complet du client
    client_telephone TEXT NOT NULL,                           -- Numéro de téléphone / WhatsApp du client
    adresse_livraison TEXT,                                   -- Adresse complète de livraison
    mode_livraison TEXT NOT NULL DEFAULT 'livraison',         -- 'livraison', 'emporter', 'sur_place'
    plats JSONB NOT NULL,                                     -- Liste détaillée des plats (nom, qte, prix, garniture, piment)
    total_montant NUMERIC(12, 2) NOT NULL,                    -- Montant total réglé en FCFA
    mode_paiement TEXT NOT NULL DEFAULT 'orange_money',       -- Moyen de paiement ('orange_money')
    orange_money_phone TEXT NOT NULL DEFAULT '698621438',     -- Numéro Orange Money du restaurant (698621438)
    transaction_ref TEXT,                                     -- Référence SMS de transaction Orange Money
    statut TEXT NOT NULL DEFAULT 'paye',                      -- 'paye', 'en_preparation', 'livre', 'annule'
    notes TEXT,                                               -- Instructions spéciales pour la cuisine / livreur
    date_commande TIMESTAMPTZ NOT NULL DEFAULT NOW(),         -- Date & heure de la commande
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()             -- Timestamp de création
);

-- 2. Création d'index pour optimiser la recherche de reçus et le suivi par téléphone
CREATE INDEX IF NOT EXISTS idx_commandes_telephone ON public.commandes(client_telephone);
CREATE INDEX IF NOT EXISTS idx_commandes_receipt ON public.commandes(receipt_number);
CREATE INDEX IF NOT EXISTS idx_commandes_created_at ON public.commandes(created_at DESC);

-- 3. Activation de la Sécurité au niveau des lignes (Row Level Security - RLS)
ALTER TABLE public.commandes ENABLE ROW LEVEL SECURITY;

-- 4. Politique d'Insertion : Permet à tous les clients (anonymes et authentifiés)
-- d'enregistrer une nouvelle commande passée sur le site
DROP POLICY IF EXISTS "Permettre l'insertion publique des commandes" ON public.commandes;
CREATE POLICY "Permettre l'insertion publique des commandes"
ON public.commandes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. Politique de Lecture : Permet la consultation des commandes
-- (pour afficher le reçu officiel de validation du client ou pour les livreurs)
DROP POLICY IF EXISTS "Permettre la lecture publique des commandes" ON public.commandes;
CREATE POLICY "Permettre la lecture publique des commandes"
ON public.commandes
FOR SELECT
TO anon, authenticated
USING (true);

-- 6. Politique de Modification : Réservée aux administrateurs authentifiés
-- (pour changer le statut de 'paye' à 'en_preparation' ou 'livre')
DROP POLICY IF EXISTS "Permettre la mise à jour pour le personnel authentifie" ON public.commandes;
CREATE POLICY "Permettre la mise à jour pour le personnel authentifie"
ON public.commandes
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- ==============================================================================
-- Comment exécuter ce script :
-- 1. Rendez-vous sur votre tableau de bord Supabase : https://supabase.com/dashboard/project/ggftumqocnfejwdfexei
-- 2. Allez dans le menu "SQL Editor" dans la barre latérale gauche.
-- 3. Cliquez sur "New query", collez l'intégralité de ce code et cliquez sur "Run".
-- 4. Votre table "commandes" est prête à recevoir les commandes passées par Orange Money !
-- ==============================================================================
