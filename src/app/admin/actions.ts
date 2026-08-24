"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/** Chaque action vérifie sa propre session — le rendu conditionnel ne suffit pas (cf. Next.js data-security guide). */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
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

  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createEdition(formData: FormData) {
  const supabase = await requireAdmin();

  const ville = String(formData.get("ville") ?? "").trim();
  const date_debut = String(formData.get("date_debut") ?? "");
  const date_fin = String(formData.get("date_fin") ?? "");
  const statut = String(formData.get("statut") ?? "a_venir");
  const description = String(formData.get("description") ?? "").trim();

  if (!ville || !date_debut || !date_fin) return;

  await supabase.from("editions").insert({
    ville,
    date_debut,
    date_fin,
    statut,
    description: description || null,
    ordre: 0,
  });

  revalidatePath("/admin/editions");
  revalidatePath("/tour-2026");
  revalidatePath("/");
}

export async function deleteEdition(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("editions").delete().eq("id", id);
  revalidatePath("/admin/editions");
  revalidatePath("/tour-2026");
  revalidatePath("/");
}

export async function createPartner(formData: FormData) {
  const supabase = await requireAdmin();

  const nom = String(formData.get("nom") ?? "").trim();
  const logo_url = String(formData.get("logo_url") ?? "").trim();
  const site_url = String(formData.get("site_url") ?? "").trim();

  if (!nom || !logo_url) return;

  await supabase
    .from("partners")
    .insert({ nom, logo_url, site_url: site_url || null, actif: true, ordre: 0 });

  revalidatePath("/admin/partenaires");
  revalidatePath("/partenaires");
}

export async function deletePartner(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("partners").delete().eq("id", id);
  revalidatePath("/admin/partenaires");
  revalidatePath("/partenaires");
}

export async function createStat(formData: FormData) {
  const supabase = await requireAdmin();

  const label = String(formData.get("label") ?? "").trim();
  const valeur = String(formData.get("valeur") ?? "").trim();

  if (!label || !valeur) return;

  await supabase.from("stats").insert({ label, valeur, ordre: 0 });

  revalidatePath("/admin/chiffres");
  revalidatePath("/partenaires");
  revalidatePath("/");
}

export async function deleteStat(id: string) {
  const supabase = await requireAdmin();
  await supabase.from("stats").delete().eq("id", id);
  revalidatePath("/admin/chiffres");
  revalidatePath("/partenaires");
  revalidatePath("/");
}
