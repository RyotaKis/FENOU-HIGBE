import Link from "next/link";
import { PAGE_CONTENT_SCHEMA } from "@/lib/pageContentSchema";

export default function AdminContenuPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Contenu des pages</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Modifie les textes et images de chaque page du site public, sans
        toucher au code. Les champs laissés vides gardent le contenu par
        défaut du site.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PAGE_CONTENT_SCHEMA.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/contenu/${page.slug}`}
            className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="font-semibold">{page.label}</p>
            <p className="mt-1 text-sm text-neutral-500">
              {page.sections.length} section
              {page.sections.length > 1 ? "s" : ""} éditable
              {page.sections.length > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
