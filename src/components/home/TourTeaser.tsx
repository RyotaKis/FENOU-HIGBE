import Link from "next/link";
import type { Edition } from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";

export function TourTeaser({ editions }: { editions: Edition[] }) {
  const upcoming = editions.slice(0, 4);

  return (
    <div className="mt-14">
      {upcoming.length > 0 ? (
        <div className="grid divide-y divide-neutral-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {upcoming.map((edition, index) => {
            const isCurrent = edition.statut === "en_cours";
            return (
              <Reveal key={edition.id} delay={index * 0.08} className="h-full">
                <div
                  className={`flex h-full flex-col justify-between gap-6 px-6 py-8 first:pl-0 ${
                    isCurrent ? "bg-brand-yellow text-neutral-950" : ""
                  }`}
                >
                  <div>
                    <span
                      className={`text-6xl font-display font-light tabular-nums ${isCurrent ? "text-neutral-950/25" : "text-neutral-200"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p
                      className={`mt-2 text-[10px] font-semibold uppercase tracking-caps ${isCurrent ? "text-neutral-950/70" : "text-neutral-400"}`}
                    >
                      {isCurrent ? "En cours" : "À venir"}
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold">
                      {edition.ville}
                    </p>
                    <p className={`mt-1 text-sm ${isCurrent ? "text-neutral-950/70" : "text-neutral-500"}`}>
                      {new Date(edition.date_debut).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                      })}
                    </p>
                  </div>
                  {isCurrent && (
                    <Link
                      href="/tour-2026"
                      className="text-xs font-semibold uppercase tracking-caps underline underline-offset-4"
                    >
                      Réserver →
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-neutral-400">
          Le calendrier du Tour 2026 sera bientôt annoncé.
        </p>
      )}
      <Link
        href="/tour-2026"
        className="mt-10 inline-block text-xs font-semibold uppercase tracking-caps text-neutral-900 underline underline-offset-4 hover:text-brand-orange"
      >
        Voir toutes les étapes →
      </Link>
    </div>
  );
}
