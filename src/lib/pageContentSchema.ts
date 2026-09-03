export type FieldType = "text" | "textarea" | "image";

export type FieldDef = { key: string; label: string; type: FieldType };

export type SingleSectionDef = {
  key: string;
  label: string;
  kind: "single";
  fields: FieldDef[];
};

export type ListSectionDef = {
  key: string;
  label: string;
  kind: "list";
  itemLabel: string;
  itemFields: FieldDef[];
};

export type SectionDef = SingleSectionDef | ListSectionDef;

export type PageDef = { slug: string; label: string; sections: SectionDef[] };

const heroFields: FieldDef[] = [
  { key: "eyebrow", label: "Sur-titre", type: "text" },
  { key: "title", label: "Titre", type: "text" },
  { key: "intro", label: "Intro", type: "textarea" },
];

function single(key: string, label: string, fields: FieldDef[]): SingleSectionDef {
  return { key, label, kind: "single", fields };
}

function list(
  key: string,
  label: string,
  itemLabel: string,
  itemFields: FieldDef[],
): ListSectionDef {
  return { key, label, kind: "list", itemLabel, itemFields };
}

export const PAGE_CONTENT_SCHEMA: PageDef[] = [
  {
    slug: "home",
    label: "Accueil",
    sections: [
      single("hero", "Hero", [
        { key: "eyebrow", label: "Sur-titre", type: "text" },
        { key: "subtitle", label: "Sous-titre", type: "textarea" },
        { key: "image", label: "Image de fond", type: "image" },
      ]),
      single("manifeste", "Manifeste (citation plein écran)", [
        { key: "quote", label: "Citation", type: "textarea" },
      ]),
      single("pourquoi_projet", "Pourquoi ce projet", [
        { key: "eyebrow", label: "Sur-titre", type: "text" },
        { key: "title", label: "Titre", type: "text" },
        { key: "intro", label: "Intro", type: "textarea" },
        { key: "body", label: "Texte", type: "textarea" },
        { key: "image", label: "Image", type: "image" },
      ]),
      single("choix_fort", "Un choix fort", [
        { key: "eyebrow", label: "Sur-titre", type: "text" },
        { key: "title", label: "Titre", type: "text" },
        { key: "intro", label: "Intro", type: "textarea" },
        { key: "body", label: "Texte", type: "textarea" },
        { key: "image", label: "Image", type: "image" },
      ]),
      list("concept_items", "Le concept — points listés (01 à 06...)", "Point", [
        { key: "title", label: "Titre", type: "text" },
        { key: "text", label: "Texte", type: "textarea" },
      ]),
      single("impact_quote", "Citation (bandeau or)", [
        { key: "quote", label: "Citation", type: "textarea" },
      ]),
      single("impact", "Ce que ça change", [
        { key: "eyebrow", label: "Sur-titre", type: "text" },
        { key: "title", label: "Titre", type: "text" },
        { key: "intro", label: "Intro", type: "textarea" },
        { key: "testimonial_quote", label: "Témoignage", type: "textarea" },
        { key: "testimonial_author", label: "Auteur du témoignage", type: "text" },
      ]),
      list("impact_items", "Ce que ça change — liste à puces", "Élément", [
        { key: "text", label: "Texte", type: "textarea" },
      ]),
      single("programme", "Programme du Grand Fenou Higbé", [
        { key: "eyebrow", label: "Sur-titre (dates / lieu)", type: "text" },
        { key: "title", label: "Titre", type: "text" },
        { key: "intro", label: "Intro", type: "textarea" },
      ]),
      list("programme_items", "Programme — activités", "Activité", [
        { key: "title", label: "Titre", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "caption", label: "Légende (date / lieu)", type: "text" },
      ]),
      single("fondatrice", "Teaser fondatrice", [
        { key: "quote", label: "Citation", type: "textarea" },
        { key: "bio", label: "Texte court", type: "textarea" },
        { key: "image", label: "Portrait", type: "image" },
      ]),
      single("tour_teaser", "Teaser Tour 2026", [
        { key: "eyebrow", label: "Sur-titre", type: "text" },
        { key: "title", label: "Titre", type: "text" },
        { key: "intro", label: "Intro", type: "textarea" },
      ]),
      single("cta_finale", "CTA finale", [
        { key: "eyebrow", label: "Sur-titre", type: "text" },
        { key: "title", label: "Titre", type: "text" },
      ]),
    ],
  },
  {
    slug: "initiatives",
    label: "Initiatives & Filiales",
    sections: [
      single("hero", "Introduction", heroFields),
      list("ventures", "Filiales / initiatives", "Filiale", [
        { key: "name", label: "Nom", type: "text" },
        { key: "year", label: "Année", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
      ]),
      single("bio", "Biographie de la fondatrice", [
        { key: "eyebrow", label: "Sur-titre", type: "text" },
        { key: "title", label: "Titre", type: "text" },
        { key: "intro", label: "Intro", type: "textarea" },
        { key: "footer_text", label: "Texte de fin", type: "textarea" },
        { key: "image", label: "Portrait", type: "image" },
      ]),
      list("milestones", "Biographie — jalons", "Jalon", [
        { key: "year", label: "Année", type: "text" },
        { key: "text", label: "Texte", type: "textarea" },
      ]),
    ],
  },
  {
    slug: "exposants",
    label: "Devenir exposant",
    sections: [
      single("hero", "Introduction", heroFields),
      list("benefits", "Bénéfices exposants", "Bénéfice", [
        { key: "title", label: "Titre", type: "text" },
        { key: "text", label: "Texte", type: "textarea" },
      ]),
      single("candidature", "Bloc candidature", [
        { key: "note", label: "Note (conditions)", type: "textarea" },
      ]),
    ],
  },
  {
    slug: "partenaires",
    label: "Partenaires",
    sections: [
      single("hero", "Introduction", heroFields),
      list("support_needs", "Ce que nous recherchons", "Besoin", [
        { key: "text", label: "Texte", type: "textarea" },
      ]),
      single("dossier", "Bloc dossier de partenariat", [
        { key: "title", label: "Titre", type: "text" },
        { key: "note", label: "Note", type: "textarea" },
      ]),
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    sections: [
      single("hero", "Introduction", heroFields),
      single("coordonnees", "Coordonnées", [
        { key: "telephone", label: "Téléphone", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "reseaux", label: "Réseaux sociaux", type: "text" },
      ]),
    ],
  },
  {
    slug: "galerie",
    label: "Galerie",
    sections: [single("hero", "Introduction", heroFields)],
  },
  {
    slug: "tour-2026",
    label: "Tour 2026",
    sections: [single("hero", "Introduction", heroFields)],
  },
  {
    slug: "site",
    label: "Réglages globaux (logo)",
    sections: [
      single("logos", "Logo de la marque", [
        {
          key: "logo_header",
          label: "Logo sur fond clair (header, admin, connexion)",
          type: "image",
        },
        {
          key: "logo_footer",
          label: "Logo sur fond sombre (pied de page, page 404)",
          type: "image",
        },
      ]),
    ],
  },
];

export function getPageDef(slug: string): PageDef | undefined {
  return PAGE_CONTENT_SCHEMA.find((p) => p.slug === slug);
}
