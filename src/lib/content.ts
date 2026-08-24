import { createClient } from "@/lib/supabase/server";
import type { EditionPhoto, KeyStat, Partner } from "@/lib/types";

export async function getPartners(): Promise<Partner[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("partners")
      .select("*")
      .eq("actif", true)
      .order("ordre", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getKeyStats(): Promise<KeyStat[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("stats")
      .select("*")
      .order("ordre", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getEditionPhotos(editionId?: string): Promise<EditionPhoto[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("edition_photos")
      .select("*")
      .order("ordre", { ascending: true });
    if (editionId) query = query.eq("edition_id", editionId);
    const { data } = await query;
    return data ?? [];
  } catch {
    return [];
  }
}
