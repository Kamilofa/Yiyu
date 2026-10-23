import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Order } from '../types/restaurant';

// Default Supabase project credentials provided by the user
const DEFAULT_SUPABASE_URL = 'https://ggftumqocnfejwdfexei.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_Zm34NEdtcGhshh55E7UtmA_JVJjtDjC';

function getValidSupabaseUrl(): string {
  const candidates = [
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.NEXT_PUBLIC_SUPABASE_URL,
    DEFAULT_SUPABASE_URL
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim();
      if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
        try {
          const parsed = new URL(trimmed);
          if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
            return trimmed;
          }
        } catch {
          // ignore invalid candidate
        }
      }
    }
  }

  return DEFAULT_SUPABASE_URL;
}

function getValidSupabaseKey(): string {
  const candidates = [
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    DEFAULT_SUPABASE_ANON_KEY
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string') {
      const trimmed = candidate.trim();
      // Valid Supabase anon/publishable keys are long tokens (JWT or sb_publishable_)
      if (trimmed.length > 20 && trimmed !== '69' && !trimmed.includes('your-anon')) {
        return trimmed;
      }
    }
  }

  return DEFAULT_SUPABASE_ANON_KEY;
}

export const SUPABASE_URL = getValidSupabaseUrl();
export const SUPABASE_ANON_KEY = getValidSupabaseKey();

let client: SupabaseClient;

try {
  client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
} catch (initErr) {
  console.warn('Erreur lors de l\'initialisation de Supabase, utilisation du fallback:', initErr);
  client = createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY);
}

export const supabase = client;

export interface SupabaseOrderRow {
  id: string;
  receipt_number: string;
  client_nom: string;
  client_telephone: string;
  adresse_livraison?: string | null;
  mode_livraison: string;
  plats: unknown;
  total_montant: number;
  mode_paiement: string;
  orange_money_phone: string;
  transaction_ref: string;
  statut: string;
  notes?: string | null;
  date_commande: string;
  created_at?: string;
}

/**
 * Saves a completed order directly to the Supabase 'commandes' table.
 */
export async function saveOrderToSupabase(order: Order): Promise<{ success: boolean; error?: string }> {
  try {
    const simplifiedItems = order.items.map(item => ({
      dish_id: item.dish.id,
      dish_name: item.dish.name,
      quantity: item.quantity,
      unit_price: item.dish.price,
      total_price: item.dish.price * item.quantity,
      accompaniment: item.selectedAccompaniment || 'Standard',
      spice_level: item.spicePreference || item.dish.spiceLevel,
      notes: item.specialInstructions || ''
    }));

    const orderRow: SupabaseOrderRow = {
      id: order.id,
      receipt_number: order.receiptNumber,
      client_nom: order.customerName,
      client_telephone: order.customerPhone,
      adresse_livraison: order.deliveryAddress || null,
      mode_livraison: order.deliveryType,
      plats: simplifiedItems,
      total_montant: order.totalAmount,
      mode_paiement: order.paymentMethod,
      orange_money_phone: order.orangeMoneyPhone,
      transaction_ref: order.transactionRef,
      statut: order.status || 'paye',
      notes: order.notes || null,
      date_commande: new Date().toISOString()
    };

    const { error } = await supabase
      .from('commandes')
      .insert([orderRow]);

    if (error) {
      console.warn('Erreur lors de l\'enregistrement dans Supabase:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    console.warn('Exception Supabase:', message);
    return { success: false, error: message };
  }
}

/**
 * Looks up orders in Supabase by receipt number, order ID, or client phone.
 */
export async function searchOrdersInSupabase(query: string): Promise<Order[]> {
  try {
    const cleanQ = query.trim();
    if (!cleanQ) return [];

    const { data, error } = await supabase
      .from('commandes')
      .select('*')
      .or(`receipt_number.ilike.%${cleanQ}%,id.ilike.%${cleanQ}%,client_telephone.ilike.%${cleanQ}%,transaction_ref.ilike.%${cleanQ}%`)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error || !data) {
      return [];
    }

    return data.map((row: any) => ({
      id: row.id,
      receiptNumber: row.receipt_number,
      orderDate: new Date(row.date_commande || row.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      items: (row.plats || []).map((p: any) => ({
        dish: {
          id: p.dish_id,
          name: p.dish_name,
          category: 'royaux',
          region: 'Cameroun',
          description: '',
          price: p.unit_price,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
          spiceLevel: p.spice_level || 'moyen',
          prepTime: '25 min',
          tags: []
        },
        quantity: p.quantity,
        selectedAccompaniment: p.accompaniment,
        spicePreference: p.spice_level,
        specialInstructions: p.notes
      })),
      totalAmount: Number(row.total_montant),
      customerName: row.client_nom,
      customerPhone: row.client_telephone,
      deliveryType: row.mode_livraison,
      deliveryAddress: row.adresse_livraison || undefined,
      notes: row.notes || undefined,
      paymentMethod: row.mode_paiement || 'orange_money',
      orangeMoneyPhone: row.orange_money_phone || '698621438',
      transactionRef: row.transaction_ref,
      createdAt: new Date(row.date_commande || row.created_at).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: row.statut
    }));
  } catch (err) {
    console.warn('Erreur searchOrdersInSupabase:', err);
    return [];
  }
}
