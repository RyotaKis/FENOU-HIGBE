import { createClient } from "@/lib/supabase/server";

export type SectionContent = Record<string, string>;
export type PageContentMap = Record<string, SectionContent>;

/**
 * Contenu éditable (texte/images) saisi depuis l'admin pour une page,
 * indexé par section_key. Retourne {} en l'absence de Supabase ou de
 * lignes — les pages appelantes gardent alors leur contenu par défaut.
 */
export async function getPageContent(pageSlug: string): Promise<PageContentMap> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("page_content")
      .select("section_key, contenu")
      .eq("page_slug", pageSlug);

    const map: PageContentMap = {};
    for (const row of data ?? []) {
      map[row.section_key as string] = (row.contenu ?? {}) as SectionContent;
    }
    return map;
  } catch {
    return {};
  }
}

/** Retourne section[key] si non vide, sinon la valeur de repli fournie. */
export function pick(
  section: SectionContent | undefined,
  key: string,
  fallback: string,
): string {
  const value = section?.[key];
  return value && value.trim().length > 0 ? value : fallback;
}
