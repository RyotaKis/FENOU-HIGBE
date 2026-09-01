export type FieldType = "text" | "textarea" | "image";

export type FieldDef = { key: string; label: string; type: FieldType };

export type SectionDef = { key: string; label: string; fields: FieldDef[] };

export type PageDef = { slug: string; label: string; sections: SectionDef[] };

const heroFields: FieldDef[] = [
  { key: "eyebrow", label: "Sur-titre", type: "text" },
  { key: "title", label: "Titre", type: "text" },
  { key: "intro", label: "Intro", type: "textarea" },
];

export const PAGE_CONTENT_SCHEMA: PageDef[] = [
  {
    slug: "home",
    label: "Accueil",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Sur-titre", type: "text" },
          { key: "subtitle", label: "Sous-titre", type: "textarea" },
          { key: "image", label: "Image de fond", type: "image" },
        ],
      },
      {
        key: "manifeste",
        label: "Manifeste (citation plein écran)",
        fields: [{ key: "quote", label: "Citation", type: "textarea" }],
      },
      {
        key: "pourquoi_projet",
        label: "Pourquoi ce projet",
        fields: [
          { key: "eyebrow", label: "Sur-titre", type: "text" },
          { key: "title", label: "Titre", type: "text" },
          { key: "intro", label: "Intro", type: "textarea" },
          { key: "body", label: "Texte", type: "textarea" },
          { key: "image", label: "Image", type: "image" },
        ],
      },
      {
        key: "choix_fort",
        label: "Un choix fort",
        fields: [
          { key: "eyebrow", label: "Sur-titre", type: "text" },
          { key: "title", label: "Titre", type: "text" },
          { key: "intro", label: "Intro", type: "textarea" },
          { key: "body", label: "Texte", type: "textarea" },
          { key: "image", label: "Image", type: "image" },
        ],
      },
      {
        key: "impact_quote",
        label: "Citation (bandeau or)",
        fields: [{ key: "quote", label: "Citation", type: "textarea" }],
      },
      {
        key: "impact",
        label: "Ce que ça change",
        fields: [
          { key: "eyebrow", label: "Sur-titre", type: "text" },
          { key: "title", label: "Titre", type: "text" },
          { key: "intro", label: "Intro", type: "textarea" },
          { key: "testimonial_quote", label: "Témoignage", type: "textarea" },
          { key: "testimonial_author", label: "Auteur du témoignage", type: "text" },
        ],
      },
      {
        key: "programme",
        label: "Programme du Grand Fenou Higbé",
        fields: [
          { key: "eyebrow", label: "Sur-titre (dates / lieu)", type: "text" },
          { key: "title", label: "Titre", type: "text" },
          { key: "intro", label: "Intro", type: "textarea" },
        ],
      },
      {
        key: "fondatrice",
        label: "Teaser fondatrice",
        fields: [
          { key: "quote", label: "Citation", type: "textarea" },
          { key: "bio", label: "Texte court", type: "textarea" },
          { key: "image", label: "Portrait", type: "image" },
        ],
      },
      {
        key: "tour_teaser",
        label: "Teaser Tour 2026",
        fields: [
          { key: "eyebrow", label: "Sur-titre", type: "text" },
          { key: "title", label: "Titre", type: "text" },
          { key: "intro", label: "Intro", type: "textarea" },
        ],
      },
      {
        key: "cta_finale",
        label: "CTA finale",
        fields: [
          { key: "eyebrow", label: "Sur-titre", type: "text" },
          { key: "title", label: "Titre", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "initiatives",
    label: "Initiatives & Filiales",
    sections: [
      { key: "hero", label: "Introduction", fields: heroFields },
      {
        key: "bio",
        label: "Biographie de la fondatrice",
        fields: [
          { key: "eyebrow", label: "Sur-titre", type: "text" },
          { key: "title", label: "Titre", type: "text" },
          { key: "intro", label: "Intro", type: "textarea" },
          { key: "footer_text", label: "Texte de fin", type: "textarea" },
          { key: "image", label: "Portrait", type: "image" },
        ],
      },
    ],
  },
  {
    slug: "exposants",
    label: "Devenir exposant",
    sections: [
      { key: "hero", label: "Introduction", fields: heroFields },
      {
        key: "candidature",
        label: "Bloc candidature",
        fields: [{ key: "note", label: "Note (conditions)", type: "textarea" }],
      },
    ],
  },
  {
    slug: "partenaires",
    label: "Partenaires",
    sections: [
      { key: "hero", label: "Introduction", fields: heroFields },
      {
        key: "dossier",
        label: "Bloc dossier de partenariat",
        fields: [
          { key: "title", label: "Titre", type: "text" },
          { key: "note", label: "Note", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    sections: [
      { key: "hero", label: "Introduction", fields: heroFields },
      {
        key: "coordonnees",
        label: "Coordonnées",
        fields: [
          { key: "telephone", label: "Téléphone", type: "text" },
          { key: "email", label: "Email", type: "text" },
          { key: "reseaux", label: "Réseaux sociaux", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "galerie",
    label: "Galerie",
    sections: [{ key: "hero", label: "Introduction", fields: heroFields }],
  },
  {
    slug: "tour-2026",
    label: "Tour 2026",
    sections: [{ key: "hero", label: "Introduction", fields: heroFields }],
  },
];

export function getPageDef(slug: string): PageDef | undefined {
  return PAGE_CONTENT_SCHEMA.find((p) => p.slug === slug);
}
