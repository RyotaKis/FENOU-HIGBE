export type ChapterKey =
  | "manifeste"
  | "chiffres"
  | "pourquoi_projet"
  | "concept"
  | "choix_fort"
  | "impact"
  | "programme"
  | "fondatrice"
  | "tour_teaser"
  | "cta_finale";

export const CHAPTER_LABELS: Record<ChapterKey, string> = {
  manifeste: "Manifeste (citation plein écran)",
  chiffres: "Chiffres clés",
  pourquoi_projet: "Pourquoi ce projet",
  concept: "Le concept (qu'est-ce que le Fenou Higbé)",
  choix_fort: "Un choix fort",
  impact: "Ce que ça change (citation + impact)",
  programme: "Programme du Grand Fenou Higbé",
  fondatrice: "Teaser fondatrice",
  tour_teaser: "Teaser Tour 2026",
  cta_finale: "CTA finale",
};

export const DEFAULT_CHAPTER_ORDER: ChapterKey[] = [
  "manifeste",
  "chiffres",
  "pourquoi_projet",
  "concept",
  "choix_fort",
  "impact",
  "programme",
  "fondatrice",
  "tour_teaser",
  "cta_finale",
];
