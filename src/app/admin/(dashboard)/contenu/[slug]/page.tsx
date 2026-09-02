import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPageDef } from "@/lib/pageContentSchema";
import { getPageContent, pickList } from "@/lib/pageContent";
import { saveSectionContent, addListItem, deleteListItem } from "@/app/admin/actions";

export default async function AdminContenuPageSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageDef = getPageDef(slug);
  if (!pageDef) notFound();

  const content = await getPageContent(slug);

  return (
    <div>
      <Link
        href="/admin/contenu"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Toutes les pages
      </Link>
      <h1 className="mt-2 text-2xl font-bold">{pageDef.label}</h1>

      <div className="mt-6 flex flex-col gap-6">
        {pageDef.sections.map((section) => {
          if (section.kind === "list") {
            const items = pickList(content, section.key, []);
            const addAction = addListItem.bind(
              null,
              pageDef.slug,
              section.key,
              section.itemFields,
            );

            return (
              <div key={section.key} className="rounded-xl bg-white p-6 shadow-sm">
                <p className="font-semibold">{section.label}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  Tant que cette liste est vide, le site affiche son contenu
                  par défaut. Dès qu&apos;un élément est ajouté ici, il
                  remplace entièrement la liste par défaut.
                </p>

                {items.length > 0 && (
                  <ul className="mt-4 divide-y divide-neutral-200">
                    {items.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start justify-between gap-4 py-3"
                      >
                        <div className="text-sm">
                          {section.itemFields.map((f) => (
                            <p key={f.key}>
                              <span className="text-neutral-400">
                                {f.label} :{" "}
                              </span>
                              {item[f.key]}
                            </p>
                          ))}
                        </div>
                        <form
                          action={deleteListItem.bind(
                            null,
                            pageDef.slug,
                            section.key,
                            index,
                          )}
                        >
                          <button
                            type="submit"
                            className="shrink-0 text-sm text-red-600"
                          >
                            Supprimer
                          </button>
                        </form>
                      </li>
                    ))}
                  </ul>
                )}

                <form
                  action={addAction}
                  className="mt-4 grid gap-3 border-t border-neutral-100 pt-4 sm:grid-cols-2"
                >
                  {section.itemFields.map((field) => (
                    <div
                      key={field.key}
                      className={field.type === "textarea" ? "sm:col-span-2" : ""}
                    >
                      <label className="text-sm font-medium">{field.label}</label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.key}
                          rows={2}
                          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
                        />
                      ) : (
                        <input
                          name={field.key}
                          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
                        />
                      )}
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="sm:col-span-2 w-fit rounded-full bg-brand-green px-6 py-2 text-sm font-semibold text-white"
                  >
                    Ajouter « {section.itemLabel} »
                  </button>
                </form>
              </div>
            );
          }

          const current = content[section.key] ?? {};
          const action = saveSectionContent.bind(
            null,
            pageDef.slug,
            section.key,
            section.fields,
          );

          return (
            <form
              key={section.key}
              action={action}
              className="grid gap-4 rounded-xl bg-white p-6 shadow-sm"
            >
              <p className="font-semibold">{section.label}</p>
              {section.fields.map((field) => {
                const value = current[field.key] ?? "";

                if (field.type === "textarea") {
                  return (
                    <div key={field.key}>
                      <label className="text-sm font-medium">
                        {field.label}
                      </label>
                      <textarea
                        name={field.key}
                        defaultValue={value}
                        rows={3}
                        className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
                      />
                    </div>
                  );
                }

                if (field.type === "image") {
                  return (
                    <div key={field.key}>
                      <label className="text-sm font-medium">
                        {field.label}
                      </label>
                      {value && (
                        <Image
                          src={value}
                          alt=""
                          width={160}
                          height={120}
                          className="mt-2 h-24 w-32 object-cover"
                        />
                      )}
                      <input
                        type="file"
                        name={field.key}
                        accept="image/*"
                        className="mt-2 block w-full text-sm"
                      />
                      <input
                        type="hidden"
                        name={`${field.key}_current`}
                        value={value}
                      />
                    </div>
                  );
                }

                return (
                  <div key={field.key}>
                    <label className="text-sm font-medium">{field.label}</label>
                    <input
                      name={field.key}
                      defaultValue={value}
                      className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
                    />
                  </div>
                );
              })}
              <button
                type="submit"
                className="w-fit rounded-full bg-brand-green px-6 py-2 font-semibold text-white"
              >
                Enregistrer
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
