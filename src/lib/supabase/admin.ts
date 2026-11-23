import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Le compte connecté est-il administrateur (table `admins`) ?
 * Tant que la migration supabase/migrations/2026-11-23_securite.sql n'a pas
 * été exécutée, la fonction SQL `is_admin` n'existe pas : on garde alors
 * l'ancien comportement (tout compte connecté est admin) pour ne pas
 * bloquer l'accès au panel.
 */
export async function isAdmin(supabase: SupabaseClient): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_admin");
  if (error) return error.code === "PGRST202" || error.code === "42883";
  return data === true;
}
