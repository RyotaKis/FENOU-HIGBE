import { getHomeLayout } from "@/lib/pageContent";
import { CHAPTER_LABELS } from "@/lib/homeLayout";
import { moveChapter, toggleChapterHidden } from "@/app/admin/actions";

export default async function AdminMiseEnPagePage() {
  const layout = await getHomeLayout();

  return (
    <div>
      <h1 className="text-2xl font-bold">Mise en page — Accueil</h1>
      <p className="mt-2 max-w-2xl text-sm text-neutral-500">
        Le hero (le tout premier écran) reste toujours en tête de page. Pour
        les chapitres suivants, réordonne-les avec les flèches ou masque-en
        certains sans les supprimer.
      </p>

      <ul className="mt-6 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
        {layout.order.map((key, index) => {
          const hidden = layout.hidden.includes(key);
          return (
            <li
              key={key}
              className={`flex items-center justify-between gap-4 px-6 py-4 ${
                hidden ? "opacity-50" : ""
              }`}
            >
              <div>
                <p className="font-semibold">{CHAPTER_LABELS[key] ?? key}</p>
                {hidden && (
                  <p className="text-xs uppercase tracking-caps text-neutral-400">
                    Masqué
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <form action={moveChapter.bind(null, key, "up")}>
                  <button
                    type="submit"
                    disabled={index === 0}
                    aria-label="Monter"
                    className="rounded-md border border-neutral-200 px-2.5 py-1.5 text-sm disabled:opacity-30"
                  >
                    ↑
                  </button>
                </form>
                <form action={moveChapter.bind(null, key, "down")}>
                  <button
                    type="submit"
                    disabled={index === layout.order.length - 1}
                    aria-label="Descendre"
                    className="rounded-md border border-neutral-200 px-2.5 py-1.5 text-sm disabled:opacity-30"
                  >
                    ↓
                  </button>
                </form>
                <form action={toggleChapterHidden.bind(null, key)}>
                  <button
                    type="submit"
                    className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
                  >
                    {hidden ? "Afficher" : "Masquer"}
                  </button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
