/** Adresse publique du site (aperçus de partage, sitemap). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fenou-higbe.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Fenou Higbé";

export const SITE_DESCRIPTION =
  "Le marché itinérant qui met en lumière les jeunes entrepreneurs africains, chaque mois, dans différentes villes du Bénin.";
