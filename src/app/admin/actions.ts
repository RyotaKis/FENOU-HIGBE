"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/supabase/admin";
import { deriveStatus } from "@/lib/editions";
import type { FieldDef } from "@/lib/pageContentSchema";
import { DEFAULT_CHAPTER_ORDER, type ChapterKey } from "@/lib/homeLayout";

/** Chaque action vérifie sa propre session — le rendu conditionnel ne suffit pas (cf. Next.js data-security guide). */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !(await isAdmin(supabase))) throw new Error("Accès réservé aux administrateurs.");
  return supabase;
}

/** Transforme une erreur Supabase silencieuse en message visible dans l'admin. */
function assertOk(result: { error: { message: string } | null }, action: string) {
  if (result.error) {
    throw new Error(`${action} : échec de l'enregistrement (${result.error.message}).`);
  }
}

/** Pages publiques qui affichent les éditions du Tour. */
function revalidateEditions() {
  revalidatePath("/admin/editions");
  revalidatePath("/tour-2026");
  revalidatePath("/galerie");
  revalidatePath("/");
}

function readEditionForm(formData: FormData) {
  const ville = String(formData.get("ville") ?? "").trim();
  const date_debut = String(formData.get("date_debut") ?? "");
  const date_fin = String(formData.get("date_fin") ?? "");
  const description = String(formData.get("description") ?? "").trim();
  if (!ville || !date_debut || !date_fin) {
    throw new Error("Ville, date de début et date de fin sont obligatoires.");
  }
  if (date_fin < date_debut) {
    throw new Error("La date de fin doit être après la date de début.");
  }
  return {
    ville,
    date_debut,
    date_fin,
    // Le statut affiché sur le site est recalculé d'après les dates ;
    // on le stocke quand même pour garder la colonne cohérente.
    statut: deriveStatus(date_debut, date_fin),
    description: description || null,
  };
}

export async function login(_prevState: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Identifiants invalides." };
  }

  if (!(await isAdmin(supabase))) {
    await supabase.auth.signOut();
    return { error: "Ce compte n'a pas accès à l'administration." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createEdition(formData: FormData) {
  const supabase = await requireAdmin();
  const edition = readEditionForm(formData);
  assertOk(await supabase.from("editions").insert({ ...edition, ordre: 0 }), "Ajout de l'édition");
  revalidateEditions();
}

export async function updateEdition(id: string, formData: FormData) {
  const supabase = await requireAdmin();
  const edition = readEditionForm(formData);
  assertOk(await supabase.from("editions").update(edition).eq("id", id), "Modification de l'édition");
  revalidateEditions();
}

export async function deleteEdition(id: string) {
  const supabase = await requireAdmin();
  assertOk(await supabase.from("editions").delete().eq("id", id), "Suppression de l'édition");
  revalidateEditions();
}

export async function createPartner(formData: FormData) {
  const supabase = await requireAdmin();

  const nom = String(formData.get("nom") ?? "").trim();
  const logo_url = String(formData.get("logo_url") ?? "").trim();
  const site_url = String(formData.get("site_url") ?? "").trim();

  if (!nom || !logo_url) throw new Error("Le nom et l'URL du logo sont obligatoires.");

  assertOk(
    await supabase
      .from("partners")
      .insert({ nom, logo_url, site_url: site_url || null, actif: true, ordre: 0 }),
    "Ajout du partenaire",
  );

  revalidatePath("/admin/partenaires");
  revalidatePath("/");
}

export async function deletePartner(id: string) {
  const supabase = await requireAdmin();
  assertOk(await supabase.from("partners").delete().eq("id", id), "Suppression du partenaire");
  revalidatePath("/admin/partenaires");
  revalidatePath("/");
}

export async function createStat(formData: FormData) {
  const supabase = await requireAdmin();

  const label = String(formData.get("label") ?? "").trim();
  const valeur = String(formData.get("valeur") ?? "").trim();

  if (!label || !valeur) throw new Error("Le libellé et la valeur sont obligatoires.");

  assertOk(await supabase.from("stats").insert({ label, valeur, ordre: 0 }), "Ajout du chiffre");

  revalidatePath("/admin/chiffres");
  revalidatePath("/");
}

export async function deleteStat(id: string) {
  const supabase = await requireAdmin();
  assertOk(await supabase.from("stats").delete().eq("id", id), "Suppression du chiffre");
  revalidatePath("/admin/chiffres");
  revalidatePath("/");
}

/**
 * Enregistre une section de contenu éditable (texte + éventuelle image
 * uploadée) pour une page. Les champs image sans nouveau fichier gardent
 * leur URL actuelle, transmise via un champ caché `${key}_current`.
 */
export async function saveSectionContent(
  pageSlug: string,
  sectionKey: string,
  fields: FieldDef[],
  formData: FormData,
) {
  const supabase = await requireAdmin();
  const contenu: Record<string, string> = {};

  // Les champs image sont déjà uploadés côté navigateur (voir ImageField) —
  // ce formulaire ne reçoit que leur URL publique, jamais le fichier lui-même,
  // pour rester largement sous la limite de payload des Server Actions.
  for (const field of fields) {
    contenu[field.key] = String(formData.get(field.key) ?? "").trim();
  }

  const result = await supabase.from("page_content").upsert(
    {
      page_slug: pageSlug,
      section_key: sectionKey,
      contenu,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "page_slug,section_key" },
  );
  assertOk(result, "Enregistrement du contenu");

  revalidatePath(`/admin/contenu/${pageSlug}`);
  // Les réglages globaux (logo) apparaissent sur toutes les pages.
  if (pageSlug === "site") revalidatePath("/", "layout");
  else revalidatePath(pageSlug === "home" ? "/" : `/${pageSlug}`);
}

async function getListItems(
  supabase: Awaited<ReturnType<typeof createClient>>,
  pageSlug: string,
  sectionKey: string,
): Promise<Record<string, string>[]> {
  const { data } = await supabase
    .from("page_content")
    .select("contenu")
    .eq("page_slug", pageSlug)
    .eq("section_key", sectionKey)
    .maybeSingle();

  const items = (data?.contenu as { items?: Record<string, string>[] } | null)?.items;
  return items ?? [];
}

async function saveListItems(
  supabase: Awaited<ReturnType<typeof createClient>>,
  pageSlug: string,
  sectionKey: string,
  items: Record<string, string>[],
) {
  const result = await supabase.from("page_content").upsert(
    {
      page_slug: pageSlug,
      section_key: sectionKey,
      contenu: { items },
      updated_at: new Date().toISOString(),
    },
    { onConflict: "page_slug,section_key" },
  );
  assertOk(result, "Enregistrement du contenu");

  revalidatePath(`/admin/contenu/${pageSlug}`);
  revalidatePath(pageSlug === "home" ? "/" : `/${pageSlug}`);
}

/** Ajoute un élément à une section de type "list" (cf. pageContentSchema.ts). */
export async function addListItem(
  pageSlug: string,
  sectionKey: string,
  itemFields: FieldDef[],
  formData: FormData,
) {
  const supabase = await requireAdmin();
  const item: Record<string, string> = {};
  for (const field of itemFields) {
    item[field.key] = String(formData.get(field.key) ?? "").trim();
  }
  if (Object.values(item).every((v) => !v)) return;

  const items = await getListItems(supabase, pageSlug, sectionKey);
  items.push(item);
  await saveListItems(supabase, pageSlug, sectionKey, items);
}

export async function deleteEditionPhoto(id: string) {
  const supabase = await requireAdmin();
  assertOk(await supabase.from("edition_photos").delete().eq("id", id), "Suppression de la photo");
  revalidatePath("/admin/galerie");
  revalidatePath("/galerie");
  revalidatePath("/galerie/[id]", "page");
}

/** Supprime l'élément à l'index donné d'une section de type "list". */
export async function deleteListItem(
  pageSlug: string,
  sectionKey: string,
  index: number,
) {
  const supabase = await requireAdmin();
  const items = await getListItems(supabase, pageSlug, sectionKey);
  items.splice(index, 1);
  await saveListItems(supabase, pageSlug, sectionKey, items);
}

type HomeLayoutData = { order: ChapterKey[]; hidden: ChapterKey[] };

async function getLayout(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<HomeLayoutData> {
  const { data } = await supabase
    .from("page_content")
    .select("contenu")
    .eq("page_slug", "home")
    .eq("section_key", "_layout")
    .maybeSingle();

  const raw = data?.contenu as Partial<HomeLayoutData> | null;
  return {
    order: raw?.order?.length ? raw.order : [...DEFAULT_CHAPTER_ORDER],
    hidden: raw?.hidden ?? [],
  };
}

async function saveLayout(
  supabase: Awaited<ReturnType<typeof createClient>>,
  layout: HomeLayoutData,
) {
  const result = await supabase.from("page_content").upsert(
    {
      page_slug: "home",
      section_key: "_layout",
      contenu: layout,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "page_slug,section_key" },
  );
  assertOk(result, "Enregistrement du contenu");
  revalidatePath("/admin/mise-en-page");
  revalidatePath("/");
}

/** Déplace un chapitre de la home d'un cran vers le haut ou le bas. */
export async function moveChapter(key: ChapterKey, direction: "up" | "down") {
  const supabase = await requireAdmin();
  const layout = await getLayout(supabase);
  const index = layout.order.indexOf(key);
  if (index === -1) return;

  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= layout.order.length) return;

  const order = [...layout.order];
  [order[index], order[swapWith]] = [order[swapWith], order[index]];
  await saveLayout(supabase, { ...layout, order });
}

/** Bascule la visibilité d'un chapitre de la home (masqué/affiché). */
export async function toggleChapterHidden(key: ChapterKey) {
  const supabase = await requireAdmin();
  const layout = await getLayout(supabase);
  const hidden = new Set(layout.hidden);
  if (hidden.has(key)) {
    hidden.delete(key);
  } else {
    hidden.add(key);
  }
  await saveLayout(supabase, { ...layout, hidden: [...hidden] });
}

/** Rafraîchit la galerie publique après un envoi de photos depuis l'admin. */
export async function revalidateGallery() {
  await requireAdmin();
  revalidatePath("/admin/galerie");
  revalidatePath("/galerie");
  revalidatePath("/galerie/[id]", "page");
}
