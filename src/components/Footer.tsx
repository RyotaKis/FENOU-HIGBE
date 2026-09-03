import Image from "next/image";
import Link from "next/link";
import { getSiteLogo } from "@/lib/pageContent";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/motion/Reveal";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/tour-2026", label: "Tour 2026" },
  { href: "/galerie", label: "Galerie" },
  { href: "/initiatives", label: "Initiatives" },
  { href: "/exposants", label: "Exposants" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

const SOCIALS = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
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
            Le marché qui fait bouger le Bénin, ville après ville. Bientôt sur
            www.fenouhigbe.com.
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
          <ul className="mt-4 flex gap-4 text-sm">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <Link
                  href={s.href}
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-xs transition-colors hover:border-brand-yellow hover:text-brand-yellow"
                  aria-label={s.label}
                >
                  {s.label.slice(0, 2)}
                </Link>
              </li>
            ))}
          </ul>
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
