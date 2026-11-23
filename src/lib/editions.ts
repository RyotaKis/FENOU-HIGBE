import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import type { Edition, EditionStatus } from "@/lib/types";

/** Fin de journée à Cotonou (UTC+1) pour une date « AAAA-MM-JJ ». */
function endOfDay(date: string) {
  return new Date(`${date}T23:59:59+01:00`).getTime();
}

function startOfDay(date: string) {
  return new Date(`${date}T00:00:00+01:00`).getTime();
}

/**
 * Statut calculé à partir des dates (et non saisi à la main) : une édition
 * passe toute seule de « À venir » à « En cours » puis « Terminée ».
 */
export function deriveStatus(dateDebut: string, dateFin: string, now = Date.now()): EditionStatus {
  if (now < startOfDay(dateDebut)) return "a_venir";
  if (now > endOfDay(dateFin)) return "terminee";
  return "en_cours";
}

export function isEditionOver(edition: Edition, now = Date.now()) {
  return now > endOfDay(edition.date_fin);
}

export function isEditionRunning(edition: Edition, now = Date.now()) {
  return now >= startOfDay(edition.date_debut) && now <= endOfDay(edition.date_fin);
}

/**
 * Calendrier 2026 affiché tant que la table `editions` est vide dans
 * Supabase. Dès qu'une édition est saisie dans l'admin (ou via
 * supabase/seed-editions-2026.sql), c'est la base qui fait foi.
 */
export const FALLBACK_EDITIONS: Edition[] = [
  { id: "fallback-cotonou-fev", ville: "Cotonou", date_debut: "2026-02-05", date_fin: "2026-02-08", description: "Festival de la Jeunesse et de la Musique (FEJEM 4)." },
  { id: "fallback-porto-novo", ville: "Porto-Novo", date_debut: "2026-04-02", date_fin: "2026-04-06", description: null },
  { id: "fallback-abomey", ville: "Abomey", date_debut: "2026-05-07", date_fin: "2026-05-10", description: null },
  { id: "fallback-ouidah", ville: "Ouidah", date_debut: "2026-06-25", date_fin: "2026-06-28", description: null },
  { id: "fallback-parakou", ville: "Parakou", date_debut: "2026-07-16", date_fin: "2026-07-19", description: null },
  { id: "fallback-bohicon", ville: "Bohicon", date_debut: "2026-08-13", date_fin: "2026-08-16", description: null },
  { id: "fallback-grand-fenou-higbe", ville: "Cotonou — Place de l'Amazone", date_debut: "2026-10-27", date_fin: "2026-11-01", description: "Grand Fenou Higbé, 4ème édition — le rendez-vous phare de l'année." },
  { id: "fallback-marche-noel", ville: "Cotonou — Palais des Congrès", date_debut: "2026-12-22", date_fin: "2026-12-25", description: "Le Marché de Noël, 3ème édition." },
].map((edition, index) => ({
  ...edition,
  statut: "a_venir" as EditionStatus,
  cover_image_url: null,
  ordre: index + 1,
}));

/** Éditions réellement enregistrées dans Supabase (pour l'admin). */
export async function getStoredEditions(): Promise<Edition[]> {
  try {
    const { data } = await createPublicClient()
      .from("editions")
      .select("*")
      .order("date_debut", { ascending: true });
    return (data ?? []).map((edition: Edition) => ({
      ...edition,
      statut: deriveStatus(edition.date_debut, edition.date_fin),
    }));
  } catch {
    return [];
  }
}

/** Éditions triées par date, avec un statut toujours recalculé d'après les dates. */
export const getAllEditions = cache(async (): Promise<Edition[]> => {
  const editions = await getStoredEditions();
  const source = editions.length > 0 ? editions : FALLBACK_EDITIONS;
  return source.map((edition) => ({
    ...edition,
    statut: deriveStatus(edition.date_debut, edition.date_fin),
  }));
});

/** Prochaine édition (en cours ou à venir, la plus proche). */
export async function getNextEdition(): Promise<Edition | null> {
  const editions = await getAllEditions();
  return editions.find((edition) => !isEditionOver(edition)) ?? null;
}

export async function getEdition(id: string): Promise<Edition | null> {
  try {
    const { data } = await createPublicClient()
      .from("editions")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}
