import type { Metadata } from "next";

export const metadata: Metadata = { title: "Actualités" };

export default function ActualitesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
        Presse &amp; annonces
      </p>
      <h1 className="mt-2 text-4xl font-black">Actualités</h1>
      <p className="mt-4 text-neutral-600">
        Annonces d&apos;éditions, retombées presse et, à terme, un kit média
        téléchargeable. Contenu géré depuis le panel d&apos;administration.
      </p>
      <p className="mt-10 text-neutral-400">
        Aucune actualité publiée pour le moment.
      </p>
    </div>
  );
}
