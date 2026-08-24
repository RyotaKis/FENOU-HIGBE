import { createClient } from "@/lib/supabase/server";

async function count(table: string) {
  const supabase = await createClient();
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function AdminOverviewPage() {
  const [editions, partners, applicants, messages, subscribers] =
    await Promise.all([
      count("editions"),
      count("partners"),
      count("applicants"),
      count("contact_messages"),
      count("newsletter_subscribers"),
    ]);

  const tiles = [
    { label: "Éditions", value: editions },
    { label: "Partenaires", value: partners },
    { label: "Candidatures", value: applicants },
    { label: "Messages", value: messages },
    { label: "Abonnés newsletter", value: subscribers },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Vue d&apos;ensemble</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {tiles.map((tile) => (
          <div key={tile.label} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-2xl font-black">{tile.value}</p>
            <p className="mt-1 text-sm text-neutral-500">{tile.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
