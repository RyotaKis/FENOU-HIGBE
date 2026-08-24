export type EditionStatus = "a_venir" | "en_cours" | "terminee";

export type Edition = {
  id: string;
  ville: string;
  date_debut: string;
  date_fin: string;
  statut: EditionStatus;
  cover_image_url: string | null;
  description: string | null;
  ordre: number;
};

export type EditionPhoto = {
  id: string;
  edition_id: string;
  url: string;
  alt: string | null;
  ordre: number;
};

export type Partner = {
  id: string;
  nom: string;
  logo_url: string;
  site_url: string | null;
  ordre: number;
  actif: boolean;
};

export type KeyStat = {
  id: string;
  label: string;
  valeur: string;
  ordre: number;
};

export type PageContentSection = {
  id: string;
  page_slug: string;
  section_key: string;
  contenu: Record<string, unknown>;
};
