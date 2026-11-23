import { getStoredEditions } from "@/lib/editions";
import { createEdition, deleteEdition, updateEdition } from "@/app/admin/actions";
import type { Edition, EditionStatus } from "@/lib/types";

const STATUS_LABEL: Record<EditionStatus, string> = {
  a_venir: "À venir",
  en_cours: "En cours",
  terminee: "Terminée",
};

const inputClass = "mt-1 w-full rounded-md border border-neutral-300 px-3 py-2";

function EditionFields({ edition }: { edition?: Edition }) {
  return (
    <>
      <div className="sm:col-span-2">
        <label className="text-sm font-medium">
          Ville / lieu
          <input name="ville" required defaultValue={edition?.ville} className={inputClass} />
        </label>
      </div>
      <div>
        <label className="text-sm font-medium">
          Date de début
          <input type="date" name="date_debut" required defaultValue={edition?.date_debut} className={inputClass} />
        </label>
      </div>
      <div>
        <label className="text-sm font-medium">
          Date de fin
          <input type="date" name="date_fin" required defaultValue={edition?.date_fin} className={inputClass} />
        </label>
      </div>
      <div className="sm:col-span-2">
        <label className="text-sm font-medium">
          Description
          <textarea name="description" rows={2} defaultValue={edition?.description ?? ""} className={inputClass} />
        </label>
        <p className="mt-1 text-xs text-neutral-500">
          Astuce : une description contenant « Grand Fenou Higbé » ou « Marché de Noël » met
          l&apos;édition en avant sur le site.
        </p>
      </div>
    </>
  );
}

export default async function AdminEditionsPage() {
  const editions = await getStoredEditions();

  return (
    <div>
      <h1 className="text-2xl font-bold">Éditions du Tour</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Le statut (À venir, En cours, Terminée) est calculé automatiquement à partir des dates.
      </p>

      {editions.length === 0 && (
        <p className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          Aucune édition enregistrée : le site affiche pour l&apos;instant le calendrier 2026 par
          défaut. Pour le rendre modifiable ici, exécute le fichier
          <code className="mx-1">supabase/seed-editions-2026.sql</code> dans Supabase (SQL Editor)
          ou ajoute les éditions ci-dessous.
        </p>
      )}

      <form
        action={createEdition}
        className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2"
      >
        <EditionFields />
        <button
          type="submit"
          className="w-fit rounded-full bg-brand-green px-6 py-2 font-semibold text-white sm:col-span-2"
        >
          Ajouter l&apos;édition
        </button>
      </form>

      <div className="mt-8 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
        {editions.map((edition) => (
          <details key={edition.id} className="group px-6 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{edition.ville}</p>
                <p className="text-sm text-neutral-500">
                  {edition.date_debut} → {edition.date_fin} · {STATUS_LABEL[edition.statut]}
                </p>
              </div>
              <span className="text-sm text-brand-green group-open:hidden">Modifier</span>
              <span className="hidden text-sm text-neutral-500 group-open:inline">Fermer</span>
            </summary>
            <form
              action={updateEdition.bind(null, edition.id)}
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              <EditionFields edition={edition} />
              <button
                type="submit"
                className="w-fit rounded-full bg-brand-green px-6 py-2 font-semibold text-white"
              >
                Enregistrer
              </button>
            </form>
            <form action={deleteEdition.bind(null, edition.id)} className="mt-3">
              <button type="submit" className="text-sm text-red-600">
                Supprimer cette édition
              </button>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}
