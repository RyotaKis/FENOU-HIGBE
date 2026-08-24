import type { Metadata } from "next";

export const metadata: Metadata = { title: "Le concept" };

export default function LeConceptPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
        Depuis 2022
      </p>
      <h1 className="mt-2 text-4xl font-black">Le concept</h1>

      <div className="mt-8 space-y-6 text-lg leading-relaxed text-neutral-700">
        <p>
          Le Fenou Higbé est né d&apos;une conviction simple : les jeunes
          entrepreneurs africains méritent une vitrine à la hauteur de leur
          talent. Chaque dernier week-end du mois, dans différentes villes du
          Bénin, un marché festif et itinérant réunit artisanat,
          agroalimentaire, cosmétique, textile et tech.
        </p>
        <p>
          Ce n&apos;est plus une simple page événementielle : c&apos;est un
          Tour multi-villes, un Grand Fenou Higbé annuel de grande ampleur, et
          des activités structurées — Startup Challenge, concours culinaire,
          prestations artistiques — qui font vivre une communauté de
          plusieurs centaines de milliers de personnes.
        </p>
      </div>

      <div className="mt-12 rounded-2xl bg-neutral-50 p-8">
        <h2 className="text-xl font-bold">Sonita Tossou</h2>
        <p className="mt-2 text-neutral-600">
          Fondatrice du Fenou Higbé et de Fenou Foods &amp; Packaging, Sonita
          Tossou porte le projet depuis sa création en 2022, avec l&apos;ambition
          de donner au Made in Bénin l&apos;image qu&apos;il mérite.
        </p>
      </div>
    </div>
  );
}
