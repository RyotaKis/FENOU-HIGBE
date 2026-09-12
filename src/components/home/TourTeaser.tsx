import Link from "next/link";
import type { Edition } from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";

function getUpcomingEditions(editions: Edition[]) {
  const now = Date.now();
  return editions
    .filter((edition) => new Date(edition.date_fin).getTime() >= now)
    .map((edition) => ({
      ...edition,
      isCurrent:
        now >= new Date(edition.date_debut).getTime() &&
        now <= new Date(edition.date_fin).getTime(),
      isFlagship: /grand fenou higb/i.test(edition.description ?? ""),
    }))
    .slice(0, 4);
}

export function TourTeaser({ editions }: { editions: Edition[] }) {
  const upcoming = getUpcomingEditions(editions);

  return (
    <div className="mt-14">
      {upcoming.length > 0 ? (
        <div className="grid divide-y divide-neutral-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {upcoming.map((edition, index) => {
            const isCurrent = edition.isCurrent;
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
                    <p
                      className={`mt-1 text-sm font-semibold ${
                        isCurrent ? "text-neutral-950/70" : "text-brand-yellow"
                      } ${edition.isFlagship && !isCurrent ? "animate-pulse" : ""}`}
                      style={
                        edition.isFlagship && !isCurrent
                          ? {
                              textShadow:
                                "0 0 8px var(--color-brand-yellow), 0 0 20px var(--color-brand-yellow)",
                            }
                          : undefined
                      }
                    >
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
          Fenou TOUR 2027: Surveillez les nuages, le calendrier vient.
        </p>
      )}
      <Link
        href="/tour-2027"
        className="mt-10 inline-block text-xs font-semibold uppercase tracking-caps text-neutral-900 underline underline-offset-4 hover:text-brand-orange"
      >
        Voir toutes les étapes →
      </Link>
    </div>
  );
}
