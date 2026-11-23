import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Client Supabase « anonyme » sans cookies, réservé à la LECTURE du contenu
 * public (éditions, chiffres, textes, photos…). Contrairement au client
 * serveur (`./server`), il ne lit pas les cookies de la requête : les pages
 * publiques peuvent donc être pré-rendues et mises en cache par Vercel
 * (ISR) au lieu d'être recalculées — et d'interroger Supabase — à chaque
 * visite. Les écritures de l'admin déclenchent `revalidatePath`, ce qui
 * rafraîchit le cache immédiatement.
 */
export function createPublicClient(): SupabaseClient {
  if (!client) {
    client = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return client;
}
