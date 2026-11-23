import type { Partner } from "@/lib/types";

/**
 * Logos des partenaires actifs (gérés dans /admin/partenaires). La bande
 * n'apparaît pas tant qu'aucun partenaire n'est enregistré.
 */
export function PartnersStrip({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;

  return (
    <div className="mt-20 border-t border-neutral-900/10 pt-10">
      <p className="text-center text-xs font-semibold uppercase tracking-caps text-neutral-500">
        Ils nous accompagnent
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
        {partners.map((partner) => {
          const logo = (
            // <img> volontaire : l'URL du logo est saisie librement dans
            // l'admin et peut venir de n'importe quel site, ce que
            // next/image refuserait (domaines à déclarer un par un).
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo_url}
              alt={partner.nom}
              loading="lazy"
              decoding="async"
              height={48}
              className="h-12 w-auto max-w-[160px] object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          );
          return (
            <li key={partner.id}>
              {partner.site_url ? (
                <a href={partner.site_url} target="_blank" rel="noopener noreferrer">
                  {logo}
                </a>
              ) : (
                logo
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
