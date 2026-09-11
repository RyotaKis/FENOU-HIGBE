import Image from "next/image";
import Link from "next/link";
import { getSiteLogo } from "@/lib/pageContent";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/motion/Reveal";
import { SocialLinks } from "@/components/SocialLinks";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/tour-2026", label: "Tour 2026" },
  { href: "/galerie", label: "Galerie" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/exposants", label: "Exposants" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export async function Footer() {
  const logo = await getSiteLogo();

  return (
    <footer className="grain relative mt-auto overflow-hidden border-t border-white/10 bg-ink px-4 py-16 text-neutral-300">
      <Reveal className="relative mx-auto grid max-w-6xl gap-12 sm:grid-cols-3" y={16}>
        <div>
          <Image
            src={logo.footer}
            alt="Fenou Higbé"
            width={608}
            height={306}
            className="h-10 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm text-neutral-400">
            Le marché des jeunes entrepreneurs africains.
          </p>
        </div>

        <nav aria-label="Navigation">
          <p className="text-xs font-semibold uppercase tracking-caps text-brand-yellow">
            Navigation
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-caps text-brand-yellow">
            Rejoins la communauté
          </p>
          <SocialLinks variant="dark" size="md" className="mt-4" />
          <p className="mt-6 text-xs text-neutral-500">
            Promotrice : Sonita Tossou
            <br />
            Fenou Foods &amp; Packaging
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </Reveal>
      <p className="relative mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-neutral-500">
        © {new Date().getFullYear()} Fenou Higbé. Tous droits réservés.
      </p>
    </footer>
  );
}
