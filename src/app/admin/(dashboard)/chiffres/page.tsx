import { getKeyStats } from "@/lib/content";
import { createStat, deleteStat } from "@/app/admin/actions";

export default async function AdminChiffresPage() {
  const stats = await getKeyStats();

  return (
    <div>
      <h1 className="text-2xl font-bold">Chiffres clés</h1>

      <form
        action={createStat}
        className="mt-6 flex flex-wrap items-end gap-4 rounded-xl bg-white p-6 shadow-sm"
      >
        <div>
          <label className="text-sm font-medium">Valeur</label>
          <input
            name="valeur"
            required
            placeholder="12"
            className="mt-1 w-32 rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Label</label>
          <input
            name="label"
            required
            placeholder="villes visitées"
            className="mt-1 w-64 rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-brand-green px-6 py-2 font-semibold text-white"
        >
          Ajouter
        </button>
      </form>

      <div className="mt-8 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center justify-between px-6 py-4"
          >
            <p>
              <span className="font-black">{stat.valeur}</span>{" "}
              <span className="text-neutral-500">{stat.label}</span>
            </p>
            <form action={deleteStat.bind(null, stat.id)}>
              <button type="submit" className="text-sm text-red-600">
                Supprimer
              </button>
            </form>
          </div>
        ))}
        {stats.length === 0 && (
          <p className="px-6 py-4 text-sm text-neutral-400">
            Aucun chiffre pour l&apos;instant.
          </p>
        )}
      </div>
    </div>
  );
}
