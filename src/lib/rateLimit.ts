import type { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

/**
 * Rate-limit léger basé sur Supabase (table `rate_limits`), sans dépendance
 * externe (Redis/KV) — suffisant pour le volume d'un site vitrine. Retourne
 * `false` si la clé (ex. "contact:1.2.3.4") a dépassé MAX_REQUESTS sur la
 * fenêtre WINDOW_MS.
 */
export async function checkRateLimit(
  supabase: SupabaseServerClient,
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
