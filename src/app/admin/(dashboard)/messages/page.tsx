import { createClient } from "@/lib/supabase/server";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
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
  );
}
