import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const SECONDARY_LINKS = [
  { href: "/galerie", label: "Galerie" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-neutral-950 px-4 py-10 text-neutral-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <p className="text-lg font-black text-white">
            FENOU <span className="text-brand-orange">HIGBÉ</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-neutral-400">
            Le marché international des jeunes entrepreneurs africains.
            Bientôt sur www.fenouhigbe.com.
          </p>
        </div>
        <nav aria-label="Liens secondaires">
          <ul className="flex gap-6 text-sm">
            {SECONDARY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <NewsletterForm />
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-neutral-600">
        © {new Date().getFullYear()} Fenou Foods &amp; Packaging.
      </p>
    </footer>
  );
}
