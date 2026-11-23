"use client";

/**
 * Affiché quand une action de l'admin échoue (enregistrement refusé par la
 * base, champ manquant…) au lieu d'un échec silencieux.
 */
export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800">
      <p className="font-semibold">L&apos;opération n&apos;a pas abouti.</p>
      <p className="mt-2 text-sm">
        Vérifie les champs obligatoires et les dates, puis réessaie. Si le
        problème continue, déconnecte-toi puis reconnecte-toi.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-full bg-red-700 px-5 py-2 text-sm font-semibold text-white"
      >
        Réessayer
      </button>
    </div>
  );
}
