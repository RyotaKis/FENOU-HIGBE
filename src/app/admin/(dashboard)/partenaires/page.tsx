import { getPartners } from "@/lib/content";
import { createPartner, deletePartner } from "@/app/admin/actions";

export default async function AdminPartenairesPage() {
  const partners = await getPartners();

  return (
    <div>
      <h1 className="text-2xl font-bold">Partenaires</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Logos affichés en bande sur la page publique — jamais de tarifs ici.
      </p>

      <form
        action={createPartner}
        className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <div>
          <label className="text-sm font-medium">Nom</label>
          <input
            name="nom"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">URL du logo</label>
          <input
            name="logo_url"
            type="url"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Site web (optionnel)</label>
          <input
            name="site_url"
            type="url"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="sm:col-span-2 w-fit rounded-full bg-brand-green px-6 py-2 font-semibold text-white"
        >
          Ajouter le partenaire
        </button>
      </form>

      <div className="mt-8 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="flex items-center justify-between px-6 py-4"
          >
            <p className="font-semibold">{partner.nom}</p>
            <form action={deletePartner.bind(null, partner.id)}>
              <button type="submit" className="text-sm text-red-600">
                Supprimer
              </button>
            </form>
          </div>
        ))}
        {partners.length === 0 && (
          <p className="px-6 py-4 text-sm text-neutral-400">
            Aucun partenaire pour l&apos;instant.
          </p>
        )}
      </div>
    </div>
  );
}
