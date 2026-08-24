import Link from "next/link";
import { getNextEdition } from "@/lib/editions";
import { Countdown } from "@/components/Countdown";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/le-concept", label: "Le concept" },
  { href: "/tour-2026", label: "Tour 2026" },
  { href: "/exposants", label: "Exposants" },
  { href: "/partenaires", label: "Partenaires" },
];

export async function Header() {
  const nextEdition = await getNextEdition();

  return (
    <header className="sticky top-0 z-50 w-full">
      {nextEdition && (
        <div className="bg-brand-green px-4 py-1.5">
          <div className="mx-auto flex max-w-6xl items-center justify-center">
            <Countdown
              targetIso={nextEdition.date_debut}
              ville={nextEdition.ville}
            />
          </div>
        </div>
      )}
      <div className="border-b border-black/5 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-black tracking-tight">
            FENOU <span className="text-brand-orange">HIGBÉ</span>
          </Link>
          <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-brand-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
