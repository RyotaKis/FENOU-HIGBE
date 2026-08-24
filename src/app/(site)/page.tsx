import Link from "next/link";
import { getNextEdition, getAllEditions } from "@/lib/editions";
import { getKeyStats } from "@/lib/content";

export default async function AccueilPage() {
  const [nextEdition, editions, stats] = await Promise.all([
    getNextEdition(),
    getAllEditions(),
    getKeyStats(),
  ]);

  return (
    <>
      <section className="relative flex min-h-[85vh] flex-col items-start justify-end overflow-hidden bg-gradient-to-br from-brand-green via-brand-green to-neutral-900 px-6 pb-16 pt-32 text-white sm:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-yellow">
            Le marché des jeunes entrepreneurs béninois
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
            FENOU <span className="text-brand-orange">HIGBÉ</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90">
            Chaque dernier week-end du mois, des dizaines de jeunes exposants
            africains installent leur savoir-faire — artisanat, agroalimentaire,
            cosmétique, textile, tech — dans une ambiance festive et
            populaire, fière du Made in Bénin.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/tour-2026"
              className="rounded-full bg-brand-yellow px-6 py-3 font-semibold text-neutral-950 transition hover:brightness-95"
            >
              Voir le Tour 2026
            </Link>
            <Link
              href="/exposants"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Devenir exposant
            </Link>
          </div>
          {nextEdition && (
            <p className="mt-8 text-sm text-white/70">
              Prochaine édition : {nextEdition.ville} —{" "}
              {new Date(nextEdition.date_debut).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
              })}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="text-2xl font-bold">Un marché devenu un mouvement</h2>
        <p className="mt-4 max-w-3xl text-neutral-600">
          Créé en 2022 par Sonita Tossou, le Fenou Higbé est aujourd&apos;hui un
          Tour multi-villes, un Grand Fenou Higbé annuel, un Startup
          Challenge, un concours culinaire et une communauté en ligne de
          plusieurs centaines de milliers d&apos;abonnés.
        </p>
        <Link
          href="/le-concept"
          className="mt-4 inline-block font-semibold text-brand-orange hover:underline"
        >
          Découvrir le concept →
        </Link>
      </section>

      {stats.length > 0 && (
        <section className="bg-neutral-50 px-6 py-16 sm:px-10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id}>
                <p className="text-3xl font-black text-brand-green">
                  {stat.valeur}
                </p>
                <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <h2 className="text-2xl font-bold">Le Tour 2026</h2>
        <p className="mt-4 max-w-3xl text-neutral-600">
          Itinérant sur plusieurs villes du Bénin — chaque édition a sa date,
          sa ville, son ambiance.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {editions.slice(0, 3).map((edition) => (
            <div
              key={edition.id}
              className="rounded-xl border border-neutral-200 p-5"
            >
              <p className="font-semibold">{edition.ville}</p>
              <p className="text-sm text-neutral-500">
                {new Date(edition.date_debut).toLocaleDateString("fr-FR")}
              </p>
            </div>
          ))}
          {editions.length === 0 && (
            <p className="text-sm text-neutral-400">
              Le calendrier du Tour 2026 sera bientôt annoncé.
            </p>
          )}
        </div>
        <Link
          href="/tour-2026"
          className="mt-6 inline-block font-semibold text-brand-orange hover:underline"
        >
          Voir toutes les éditions →
        </Link>
      </section>
    </>
  );
}
