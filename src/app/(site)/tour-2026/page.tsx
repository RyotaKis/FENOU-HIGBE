import type { Metadata } from "next";
import { getAllEditions } from "@/lib/editions";
import type { Edition, EditionStatus } from "@/lib/types";
import { SectionHeading } from "@/components/SectionHeading";
import { PageBackdrop } from "@/components/PageBackdrop";
import { TimelineProgress } from "@/components/TimelineProgress";
import { Reveal } from "@/components/motion/Reveal";
import { getPageContent, pick } from "@/lib/pageContent";

export const metadata: Metadata = { title: "Tour 2026" };

const STATUS_LABEL: Record<EditionStatus, string> = {
  a_venir: "À venir",
  en_cours: "En cours",
  terminee: "Terminée",
};

const STATUS_STYLE: Record<EditionStatus, string> = {
  a_venir: "bg-brand-yellow text-neutral-950",
  en_cours: "bg-brand-orange text-white",
  terminee: "bg-neutral-200 text-neutral-600",
};

function deriveStatus(dateDebut: string, dateFin: string): EditionStatus {
  const now = Date.now();
  const start = new Date(dateDebut).getTime();
  const end = new Date(dateFin).getTime();
  if (now < start) return "a_venir";
  if (now > end) return "terminee";
  return "en_cours";
}

// TODO(content): remove once editions are seeded in Supabase admin.
// Dev-only fallback so the page reflects the real 2026 tour before content entry.
const FALLBACK_EDITIONS: Edition[] = [
  {
    id: "fallback-cotonou-fev",
    ville: "Cotonou",
    date_debut: "2026-02-05",
    date_fin: "2026-02-08",
    statut: deriveStatus("2026-02-05", "2026-02-08"),
    cover_image_url: null,
    description: "Festival de la Jeunesse et de la Musique (FEJEM 4).",
    ordre: 1,
  },
  {
    id: "fallback-porto-novo",
    ville: "Porto-Novo",
    date_debut: "2026-04-02",
    date_fin: "2026-04-06",
    statut: deriveStatus("2026-04-02", "2026-04-06"),
    cover_image_url: null,
    description: null,
    ordre: 2,
  },
  {
    id: "fallback-abomey",
    ville: "Abomey",
    date_debut: "2026-05-07",
    date_fin: "2026-05-10",
    statut: deriveStatus("2026-05-07", "2026-05-10"),
    cover_image_url: null,
    description: null,
    ordre: 3,
  },
  {
    id: "fallback-ouidah",
    ville: "Ouidah",
    date_debut: "2026-06-25",
    date_fin: "2026-06-28",
    statut: deriveStatus("2026-06-25", "2026-06-28"),
    cover_image_url: null,
    description: null,
    ordre: 4,
  },
  {
    id: "fallback-parakou",
    ville: "Parakou",
    date_debut: "2026-07-16",
    date_fin: "2026-07-19",
    statut: deriveStatus("2026-07-16", "2026-07-19"),
    cover_image_url: null,
    description: null,
    ordre: 5,
  },
  {
    id: "fallback-bohicon",
    ville: "Bohicon",
    date_debut: "2026-08-13",
    date_fin: "2026-08-16",
    statut: deriveStatus("2026-08-13", "2026-08-16"),
    cover_image_url: null,
    description: null,
    ordre: 6,
  },
  {
    id: "fallback-grand-fenou-higbe",
    ville: "Cotonou — Place de l'Amazone",
    date_debut: "2026-10-27",
    date_fin: "2026-11-01",
    statut: deriveStatus("2026-10-27", "2026-11-01"),
    cover_image_url: null,
    description:
      "Grand Fenou Higbé, 4ème édition — le rendez-vous phare de l'année.",
    ordre: 7,
  },
  {
    id: "fallback-marche-noel",
    ville: "Cotonou — Palais des Congrès",
    date_debut: "2026-12-22",
    date_fin: "2026-12-25",
    statut: deriveStatus("2026-12-22", "2026-12-25"),
    cover_image_url: null,
    description: "Le Marché de Noël, 3ème édition.",
    ordre: 8,
  },
];

const FLAGSHIP_IDS = new Set([
  "fallback-grand-fenou-higbe",
  "fallback-marche-noel",
]);

export default async function Tour2026Page() {
  const [fetched, content] = await Promise.all([
    getAllEditions(),
    getPageContent("tour-2026"),
  ]);
  const editions = fetched.length > 0 ? fetched : FALLBACK_EDITIONS;
  const hero = content.hero;

  return (
    <PageBackdrop tone="yellow">
    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow={pick(hero, "eyebrow", "Fenou Higbé")}
        title={pick(hero, "title", "Tour 2026")}
        intro={pick(
          hero,
          "intro",
          "Le Fenou Higbé voyage à travers le Bénin. Chaque mois, une nouvelle ville, une nouvelle édition — jusqu'au Grand Fenou Higbé et au Marché de Noël.",
        )}
      />

      <TimelineProgress>
      <ol className="relative mt-16 space-y-10 pl-8">
        {editions.map((edition, index) => {
          const isFlagship = FLAGSHIP_IDS.has(edition.id);
          return (
            <Reveal key={edition.id} delay={index * 0.05}>
              <li className="relative">
                <span
                  className={`absolute left-[-2.15rem] top-1.5 h-3 w-3 rounded-full ${
                    isFlagship ? "bg-brand-orange" : "bg-brand-green"
                  }`}
                />
                <article
                  className={`border p-6 ${
                    isFlagship
                      ? "border-brand-orange/30 bg-brand-cream"
                      : "border-neutral-200"
                  }`}
                >
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[edition.statut]}`}
                  >
                    {STATUS_LABEL[edition.statut]}
                  </span>
                  <h2
                    className={`mt-3 font-bold ${isFlagship ? "text-2xl" : "text-xl"}`}
                  >
                    {edition.ville}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    {new Date(edition.date_debut).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                    })}
                    {" – "}
                    {new Date(edition.date_fin).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  {edition.description && (
                    <p className="mt-3 text-neutral-600">
                      {edition.description}
                    </p>
                  )}
                </article>
              </li>
            </Reveal>
          );
        })}
      </ol>
      </TimelineProgress>
    </div>
    </PageBackdrop>
  );
}
