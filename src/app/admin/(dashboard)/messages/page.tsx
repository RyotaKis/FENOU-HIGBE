import { createClient } from "@/lib/supabase/server";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const [{ data: messages }, { data: partnershipRequests }] = await Promise.all([
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("partnership_requests")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold">Messages de contact</h1>
        <div className="mt-6 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
          {(messages ?? []).map((m) => (
            <div key={m.id} className="px-6 py-4">
              <p className="font-semibold">{m.nom}</p>
              <p className="text-sm text-neutral-500">{m.email}</p>
              <p className="mt-2 text-sm text-neutral-700">{m.message}</p>
            </div>
          ))}
          {(!messages || messages.length === 0) && (
            <p className="px-6 py-4 text-sm text-neutral-400">
              Aucun message pour l&apos;instant.
            </p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold">Demandes de dossier partenariat</h2>
        <p className="mt-1 text-sm text-neutral-500">
          À traiter manuellement par email — le dossier tarifaire ne doit
          jamais être joint automatiquement.
        </p>
        <div className="mt-6 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
          {(partnershipRequests ?? []).map((p) => (
            <div key={p.id} className="px-6 py-4">
              <p className="font-semibold">
                {p.organisation} — {p.nom}
              </p>
              <p className="text-sm text-neutral-500">{p.email}</p>
              {p.message && (
                <p className="mt-2 text-sm text-neutral-700">{p.message}</p>
              )}
            </div>
          ))}
          {(!partnershipRequests || partnershipRequests.length === 0) && (
            <p className="px-6 py-4 text-sm text-neutral-400">
              Aucune demande pour l&apos;instant.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
