import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/supabase/admin";
import { getSiteLogo } from "@/lib/pageContent";
import { logout } from "@/app/admin/actions";

const NAV_GROUPS = [
  {
    label: "Vue d'ensemble",
    items: [{ href: "/admin", label: "Tableau de bord" }],
  },
  {
    label: "Contenu du site",
    items: [
      { href: "/admin/contenu", label: "Textes & images des pages" },
      { href: "/admin/mise-en-page", label: "Mise en page — Accueil" },
      { href: "/admin/editions", label: "Éditions du Tour" },
      { href: "/admin/galerie", label: "Galerie photo" },
      { href: "/admin/partenaires", label: "Partenaires" },
      { href: "/admin/chiffres", label: "Chiffres clés" },
    ],
  },
  {
    label: "Activité",
    items: [
      { href: "/admin/messages", label: "Messages de contact" },
      { href: "/admin/newsletter", label: "Newsletter" },
    ],
  },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Défense en profondeur : le proxy protège déjà /admin/*, on revérifie ici.
  if (!user || !(await isAdmin(supabase))) redirect("/admin/login");

  const logo = await getSiteLogo();

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="w-64 shrink-0 border-r border-neutral-200 bg-white">
        <div className="border-b border-neutral-100 p-6">
          <Image
            src={logo.header}
            alt="Fenou Higbé"
            width={608}
            height={306}
            className="h-8 w-auto"
          />
        </div>
        <nav className="flex flex-col gap-6 p-6 text-sm">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-[10px] font-semibold uppercase tracking-caps text-neutral-400">
                {group.label}
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 font-medium text-neutral-600 transition-colors hover:bg-brand-cream hover:text-neutral-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <form action={logout} className="p-6 pt-0">
          <button
            type="submit"
            className="w-full rounded-md border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
          >
            Se déconnecter
          </button>
        </form>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
