import type { Metadata } from "next";
import { ExposantForm } from "@/components/forms/ExposantForm";

export const metadata: Metadata = { title: "Devenir exposant" };

const BENEFITS = [
  { title: "Visibilité", text: "Ton stand devant des centaines de visiteurs à chaque édition." },
  { title: "Formation", text: "Accompagnement et mise en réseau avec d'autres jeunes entrepreneurs." },
  { title: "Communauté", text: "Un réseau de plusieurs centaines de milliers de personnes en ligne." },
];

export default function ExposantsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
        Candidats exposants
      </p>
      <h1 className="mt-2 text-4xl font-black">Devenir exposant</h1>
      <p className="mt-4 max-w-2xl text-neutral-600">
        Le Fenou Higbé recherche des jeunes entrepreneurs africains —
        artisanat, agroalimentaire, cosmétique, textile, tech — prêts à
        présenter leur savoir-faire.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {BENEFITS.map((b) => (
          <div key={b.title} className="rounded-xl border border-neutral-200 p-5">
            <p className="font-semibold">{b.title}</p>
            <p className="mt-1 text-sm text-neutral-600">{b.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-bold">Candidature</h2>
        <p className="mt-2 text-sm text-neutral-500">
          Les conditions et modalités (hors tarifs) te seront communiquées
          après étude de ta candidature.
        </p>
        <div className="mt-6">
          <ExposantForm />
        </div>
      </div>
    </div>
  );
}
