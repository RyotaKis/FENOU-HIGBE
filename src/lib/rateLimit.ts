import type { SupabaseClient } from "@supabase/supabase-js";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

/** Lit le corps JSON d'une requête sans planter (null si invalide). */
export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** Code renvoyé par PostgREST quand une fonction SQL n'existe pas (encore). */
export function isMissingFunction(error: { code?: string } | null) {
  return error?.code === "PGRST202" || error?.code === "42883";
}

/**
 * Ancien anti-spam, utilisé seulement tant que la migration
 * supabase/migrations/2026-11-23_securite.sql n'a pas été exécutée.
 * Après la migration, la limite est appliquée dans la base elle-même
 * (fonctions submit_contact / subscribe_newsletter).
 */
export async function legacyCheckRateLimit(
  supabase: SupabaseClient,
  key: string,
): Promise<boolean> {
  const since = new Date(Date.now() - WINDOW_MS).toISOString();
  const { count } = await supabase
    .from("rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("key", key)
    .gte("created_at", since);

  if ((count ?? 0) >= MAX_REQUESTS) return false;

  await supabase.from("rate_limits").insert({ key });
  return true;
}
