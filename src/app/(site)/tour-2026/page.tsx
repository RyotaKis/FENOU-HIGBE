import type { Metadata } from "next";
import { getAllEditions } from "@/lib/editions";
import type { Edition, EditionStatus } from "@/lib/types";
import { SectionHeading } from "@/components/SectionHeading";
import { PageBackdrop } from "@/components/PageBackdrop";
import { TimelineProgress } from "@/components/TimelineProgress";
import { Reveal } from "@/components/motion/Reveal";
import { getPageContent, pick } from "@/lib/pageContent";

export const metadata: Metadata = { title: "Tour 2026" };

/** Page mise en cache par Vercel et régénérée au plus toutes les 5 minutes. */
export const revalidate = 300;

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

function isFlagshipEdition(edition: Edition) {
  return /grand fenou higb|marché de noël/i.test(edition.description ?? "");
}

export default async function Tour2026Page() {
  const [editions, content] = await Promise.all([
    getAllEditions(),
    getPageContent("tour-2026"),
  ]);
  const hero = content.hero;

  return (
    <PageBackdrop tone="yellow">
    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <SectionHeading
        as="h1"
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
          const isFlagship = isFlagshipEdition(edition);
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
