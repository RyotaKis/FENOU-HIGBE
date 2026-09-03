import Image from "next/image";
import Link from "next/link";
import { getNextEdition } from "@/lib/editions";
import { getSiteLogo } from "@/lib/pageContent";
import { Countdown } from "@/components/Countdown";
import { MobileNav } from "@/components/MobileNav";
import { FadeIn } from "@/components/motion/FadeIn";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/tour-2026", label: "Tour 2026" },
  { href: "/galerie", label: "Galerie" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/exposants", label: "Exposants" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export async function Header() {
  const [nextEdition, logo] = await Promise.all([getNextEdition(), getSiteLogo()]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <FadeIn>
      {nextEdition && (
        <div className="bg-ink px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-center">
            <Countdown
              targetIso={nextEdition.date_debut}
              ville={nextEdition.ville}
            />
          </div>
        </div>
      )}
      <div className="border-b border-black/5 bg-background/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center">
            <Image
              src={logo.header}
              alt="Fenou Higbé"
              width={608}
              height={306}
              priority
              className="h-9 w-auto"
            />
          </Link>
          <ul className="hidden items-center gap-7 text-xs font-medium uppercase tracking-caps md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative py-1 transition-colors hover:text-brand-orange"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-brand-orange transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
          <MobileNav links={NAV_LINKS} />
        </nav>
      </div>
      </FadeIn>
    </header>
  );
}
