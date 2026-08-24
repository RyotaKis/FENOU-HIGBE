import { getAllEditions } from "@/lib/editions";
import { createEdition, deleteEdition } from "@/app/admin/actions";

export default async function AdminEditionsPage() {
  const editions = await getAllEditions();

  return (
    <div>
      <h1 className="text-2xl font-bold">Éditions du Tour</h1>

      <form
        action={createEdition}
        className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <div>
          <label className="text-sm font-medium">Ville</label>
          <input
            name="ville"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Statut</label>
          <select
            name="statut"
            defaultValue="a_venir"
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          >
            <option value="a_venir">À venir</option>
            <option value="en_cours">En cours</option>
            <option value="terminee">Terminée</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Date de début</label>
          <input
            type="date"
            name="date_debut"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Date de fin</label>
          <input
            type="date"
            name="date_fin"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows={2}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="sm:col-span-2 w-fit rounded-full bg-brand-green px-6 py-2 font-semibold text-white"
        >
          Ajouter l&apos;édition
        </button>
      </form>

      <div className="mt-8 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
        {editions.map((edition) => (
          <div
            key={edition.id}
            className="flex items-center justify-between px-6 py-4"
          >
            <div>
              <p className="font-semibold">{edition.ville}</p>
              <p className="text-sm text-neutral-500">
                {edition.date_debut} → {edition.date_fin} · {edition.statut}
              </p>
            </div>
            <form action={deleteEdition.bind(null, edition.id)}>
              <button type="submit" className="text-sm text-red-600">
                Supprimer
              </button>
            </form>
          </div>
        ))}
        {editions.length === 0 && (
          <p className="px-6 py-4 text-sm text-neutral-400">
            Aucune édition pour l&apos;instant.
          </p>
        )}
      </div>
    </div>
  );
}
