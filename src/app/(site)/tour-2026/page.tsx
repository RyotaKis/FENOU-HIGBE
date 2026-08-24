import type { Metadata } from "next";
import { getAllEditions } from "@/lib/editions";
import type { EditionStatus } from "@/lib/types";

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

export default async function Tour2026Page() {
  const editions = await getAllEditions();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
        Itinérant
      </p>
      <h1 className="mt-2 text-4xl font-black">Tour 2026</h1>
      <p className="mt-4 max-w-2xl text-neutral-600">
        Le Fenou Higbé voyage à travers le Bénin. Chaque étape a sa ville, ses
        dates, son ambiance.
      </p>

      {/*
        TODO: carte interactive du Bénin (clic/survol par ville, cf. cahier
        des charges §5.2). En attendant l'illustration SVG des régions, la
        liste ci-dessous couvre la même donnée en version accessible.
      */}

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {editions.map((edition) => (
          <article
            key={edition.id}
            className="rounded-2xl border border-neutral-200 p-6"
          >
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[edition.statut]}`}
            >
              {STATUS_LABEL[edition.statut]}
            </span>
            <h2 className="mt-3 text-xl font-bold">{edition.ville}</h2>
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
              <p className="mt-3 text-neutral-600">{edition.description}</p>
            )}
          </article>
        ))}
        {editions.length === 0 && (
          <p className="text-neutral-400">
            Le calendrier des villes sera annoncé prochainement.
          </p>
        )}
      </div>
    </div>
  );
}
