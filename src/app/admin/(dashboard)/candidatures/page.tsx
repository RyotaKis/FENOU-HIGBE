import { createClient } from "@/lib/supabase/server";

export default async function AdminCandidaturesPage() {
  const supabase = await createClient();
  const { data: applicants } = await supabase
    .from("applicants")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold">Candidatures exposants</h1>
      <div className="mt-6 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
        {(applicants ?? []).map((a) => (
          <div key={a.id} className="px-6 py-4">
            <p className="font-semibold">
              {a.nom} — {a.activite}
            </p>
            <p className="text-sm text-neutral-500">
              {a.email} {a.telephone ? `· ${a.telephone}` : ""}
            </p>
            <p className="mt-2 text-sm text-neutral-700">{a.message}</p>
          </div>
        ))}
        {(!applicants || applicants.length === 0) && (
          <p className="px-6 py-4 text-sm text-neutral-400">
            Aucune candidature pour l&apos;instant.
          </p>
        )}
      </div>
    </div>
  );
}
