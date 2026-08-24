import { createClient } from "@/lib/supabase/server";
import type { Edition } from "@/lib/types";

/** Prochaine édition (statut a_venir ou en_cours, la plus proche). */
export async function getNextEdition(): Promise<Edition | null> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from("editions")
      .select("*")
      .in("statut", ["a_venir", "en_cours"])
      .order("date_debut", { ascending: true })
      .limit(1)
      .maybeSingle();

    return data;
  } catch {
    // Supabase pas encore configuré (env vars manquantes) — dégrade
    // proprement plutôt que de faire planter le rendu des pages publiques.
    return null;
  }
}

export async function getAllEditions(): Promise<Edition[]> {
  try {
    const supabase = await createClient();

    const { data } = await supabase
      .from("editions")
      .select("*")
      .order("date_debut", { ascending: true });

    return data ?? [];
  } catch {
    return [];
  }
}
