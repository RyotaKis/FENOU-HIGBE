import type { Metadata } from "next";
import Image from "next/image";
import { CtaLink } from "@/components/CtaLink";
import { FadeIn } from "@/components/motion/FadeIn";
import { getSiteLogo } from "@/lib/pageContent";

export const metadata: Metadata = { title: "Page introuvable" };

export default async function NotFound() {
  const logo = await getSiteLogo();

  return (
    <div className="grain relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center text-white">
      <FadeIn y={20} className="flex flex-col items-center">
        <Image
          src={logo.footer}
          alt="Fenou Higbé"
          width={608}
          height={306}
          className="h-10 w-auto"
        />
        <p className="mt-6 font-display text-lg italic text-brand-yellow">
          Perdu en chemin ?
        </p>
        <h1 className="mt-3 text-6xl font-bold tracking-tight sm:text-8xl">
          404
        </h1>
        <p className="mt-4 max-w-md text-white/75">
          Cette page n&apos;existe pas, ou plus. Le Fenou Higbé continue plus
          loin.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CtaLink href="/" variant="primary">
            Retour à l&apos;accueil
          </CtaLink>
          <CtaLink href="/tour-2026" variant="ghost-dark">
            Voir le Tour 2026
          </CtaLink>
        </div>
      </FadeIn>
    </div>
  );
}
