import { createClient } from "@/lib/supabase/server";

export type SectionContent = Record<string, string>;
export type ListItem = Record<string, string>;
export type PageContentMap = Record<string, SectionContent>;

/**
 * Contenu éditable (texte/images) saisi depuis l'admin pour une page,
 * indexé par section_key. Retourne {} en l'absence de Supabase ou de
 * lignes — les pages appelantes gardent alors leur contenu par défaut.
 * Les sections "list" stockent leurs éléments sous `contenu.items`.
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

/**
 * Éléments d'une section de type "list" (contenu.items). Retourne
 * `fallback` tant que rien n'a été ajouté depuis l'admin.
 */
export function pickList<T extends ListItem>(
  content: PageContentMap,
  sectionKey: string,
  fallback: T[],
): T[] {
  const raw = content[sectionKey] as unknown as { items?: T[] } | undefined;
  return raw?.items && raw.items.length > 0 ? raw.items : fallback;
}

const DEFAULT_LOGO_HEADER = "/logo/fenou-higbe-dark.png";
const DEFAULT_LOGO_FOOTER = "/logo/fenou-higbe-white.png";

/**
 * Logo de la marque (réglages globaux, page_slug "site"), avec repli sur
 * les fichiers statiques d'origine tant que rien n'a été uploadé depuis
 * l'admin (Contenu des pages → Réglages globaux → Logo).
 */
export async function getSiteLogo(): Promise<{ header: string; footer: string }> {
  const content = await getPageContent("site");
  const logos = content.logos;
  return {
    header: pick(logos, "logo_header", DEFAULT_LOGO_HEADER),
    footer: pick(logos, "logo_footer", DEFAULT_LOGO_FOOTER),
  };
}
