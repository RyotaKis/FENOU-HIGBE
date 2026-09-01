import Link from "next/link";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/motion/Reveal";

export function FounderTeaser() {
  return (
    <Reveal className="grid items-center gap-10 sm:grid-cols-[minmax(0,320px)_1fr]">
      <PlaceholderImage
        description="Portrait de Sonita Tossou, fondatrice du Fenou Higbé"
        aspectRatio="3/4"
      />
      <div>
        <p className="text-xs font-semibold uppercase tracking-caps text-brand-orange">
          La fondatrice
        </p>
        <blockquote className="mt-4 font-display text-2xl italic leading-snug sm:text-3xl">
          « Donner aux jeunes entrepreneurs africains un espace concret pour
          exister, vendre, apprendre — et rêver plus grand. »
        </blockquote>
        <p className="mt-4 text-neutral-600">
          Sonita Tossou, entrepreneure béninoise, fondatrice de Fenou Foods,
          Fenou Packaging et du Fenou Higbé.
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
