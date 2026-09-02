import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/contenu", label: "Contenu des pages" },
  { href: "/admin/editions", label: "Éditions du Tour" },
  { href: "/admin/galerie", label: "Galerie" },
  { href: "/admin/partenaires", label: "Partenaires" },
  { href: "/admin/chiffres", label: "Chiffres clés" },
  { href: "/admin/candidatures", label: "Candidatures exposants" },
  { href: "/admin/messages", label: "Messages de contact" },
  { href: "/admin/newsletter", label: "Newsletter" },
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
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="w-64 shrink-0 border-r border-neutral-200 bg-white p-6">
        <p className="font-black">
          FENOU <span className="text-brand-orange">HIGBÉ</span>
        </p>
        <nav className="mt-8 flex flex-col gap-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-8">
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
