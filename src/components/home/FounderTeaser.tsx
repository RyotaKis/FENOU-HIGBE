import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

// TODO(assets): remplaçable depuis /admin/contenu/home → Teaser fondatrice
// → Portrait, qui prend toujours le dessus sur cette valeur par défaut.
const DEFAULT_IMAGE = "/images/sonita-tossou-portrait.jpg";

type FounderTeaserProps = {
  quote?: string;
  bio?: string;
  image?: string;
};

export function FounderTeaser({ quote, bio, image }: FounderTeaserProps) {
  return (
    <Reveal className="grid items-center gap-10 sm:grid-cols-[minmax(0,320px)_1fr]">
      <Image
        src={image || DEFAULT_IMAGE}
        alt="Portrait de Sonita Tossou, fondatrice du Fenou Higbé"
        width={320}
        height={427}
        sizes="(min-width: 640px) 320px, 100vw"
        className="h-auto w-full object-cover"
        style={{ aspectRatio: "3/4" }}
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-caps text-brand-orange">
          La fondatrice
        </p>
        <blockquote className="mt-4 font-display text-2xl italic leading-snug sm:text-3xl">
          «{" "}
          {quote ||
            "Donner aux jeunes entrepreneurs africains un espace concret pour exister, vendre, apprendre — et rêver plus grand."}{" "}
          »
        </blockquote>
        <p className="mt-4 text-neutral-600">
          {bio ||
            "Sonita Tossou, entrepreneure béninoise, fondatrice de Fenou Industries, Fenou Foods & Packaging et du Fenou Higbé."}
        </p>
        <Link
          href="/initiatives"
          className="mt-6 inline-block text-xs font-semibold uppercase tracking-caps underline underline-offset-4 hover:text-brand-orange"
        >
          Découvrir Sonita &amp; les initiatives Fenou →
        </Link>
      </div>
    </Reveal>
  );
}
