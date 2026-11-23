import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import type { EditionPhoto, KeyStat, Partner } from "@/lib/types";

export const getPartners = cache(async (): Promise<Partner[]> => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("partners")
      .select("*")
      .eq("actif", true)
      .order("ordre", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
});

export const getKeyStats = cache(async (): Promise<KeyStat[]> => {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("stats")
      .select("*")
      .order("ordre", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
});

export async function getEditionPhotos(editionId?: string): Promise<EditionPhoto[]> {
  try {
    const supabase = createPublicClient();
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
