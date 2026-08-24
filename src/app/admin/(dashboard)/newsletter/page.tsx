import { createClient } from "@/lib/supabase/server";

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  const csv = ["email"]
    .concat((subscribers ?? []).map((s) => s.email))
    .join("\n");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Newsletter</h1>
        <p className="text-sm text-neutral-500">
          {subscribers?.length ?? 0} abonné(s)
        </p>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium text-brand-orange">
          Export CSV (copier/coller)
        </summary>
        <pre className="mt-2 max-h-64 overflow-auto rounded-md bg-neutral-950 p-4 text-xs text-neutral-100">
          {csv}
        </pre>
      </details>

      <div className="mt-6 divide-y divide-neutral-200 rounded-xl bg-white shadow-sm">
        {(subscribers ?? []).map((s) => (
          <p key={s.id} className="px-6 py-3 text-sm">
            {s.email}
          </p>
        ))}
        {(!subscribers || subscribers.length === 0) && (
          <p className="px-6 py-4 text-sm text-neutral-400">
            Aucun abonné pour l&apos;instant.
          </p>
        )}
      </div>
    </div>
  );
}
