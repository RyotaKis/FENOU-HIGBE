import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEditionPhotos } from "@/lib/content";
import { getAllEditions } from "@/lib/editions";
import { getPageContent, pick } from "@/lib/pageContent";
import { SectionHeading } from "@/components/SectionHeading";
import { PageBackdrop } from "@/components/PageBackdrop";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { BentoGrid } from "@/components/gallery/BentoGrid";
import type { EditionPhoto } from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Les temps forts du Fenou Higbé en images : marchés, concours, concerts et soirées.",
};

/** Page mise en cache par Vercel et régénérée au plus toutes les 5 minutes. */
export const revalidate = 300;

// Photos affichées tant qu'aucune photo n'a été ajoutée depuis l'admin
// (Galerie photo). Elles disparaissent dès la première édition illustrée.
const HIGHLIGHT_PHOTOS: EditionPhoto[] = [
  ["neon-fenou.jpg", "L'enseigne lumineuse du Fenou Higbé, le soir"],
  ["marche-fenou.jpg", "Foule de visiteurs au marché Fenou Higbé"],
  ["caravane.jpg", "La Caravane des Entrepreneurs dans les rues de Cotonou"],
  ["startup-challenge.jpg", "Pitch sur scène au Fenou Startup Challenge"],
  ["food-challenge.jpg", "Concurrents de l'African Food Challenge"],
  ["marche-stands-jour.jpg", "Allées de stands en journée"],
  ["prestation-artiste.jpg", "Artiste en concert sur le grand podium"],
  ["fenou-xwe-photo.jpg", "Ambiance de la soirée de clôture Fenou Xwé"],
  ["hero.jpg", "Le public rassemblé devant la statue de l'Amazone"],
].map(([file, alt], index) => ({
  id: `highlight-${index}`,
  edition_id: "highlights",
  url: `/images/${file}`,
  alt,
  ordre: index,
}));

export default async function GaleriePage() {
  const [editions, photos, content] = await Promise.all([
    getAllEditions(),
    getEditionPhotos(),
    getPageContent("galerie"),
  ]);
  const hero = content.hero;

  const editionsWithPhotos = editions
    .map((edition) => {
      const editionPhotos = photos.filter((p) => p.edition_id === edition.id);
      const cover = edition.cover_image_url ?? editionPhotos[0]?.url ?? null;
      return { edition, cover, count: editionPhotos.length };
    })
    .filter((entry) => entry.count > 0)
    .sort(
      (a, b) => new Date(b.edition.date_debut).getTime() - new Date(a.edition.date_debut).getTime(),
    );

  return (
    <PageBackdrop tone="yellow">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <SectionHeading
          as="h1"
          eyebrow={pick(hero, "eyebrow", "Ambiance")}
          title={pick(hero, "title", "Galerie")}
          intro={pick(
            hero,
            "intro",
            "Les temps forts du Fenou Higbé en images, édition après édition.",
          )}
        />

        {editionsWithPhotos.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {editionsWithPhotos.map(({ edition, cover, count }, index) => (
              <Reveal key={edition.id} delay={index * 0.08} scale={0.96}>
                <TiltCard max={6}>
                  <Link href={`/galerie/${edition.id}`} className="group block">
                    <div className="relative aspect-4/3 overflow-hidden bg-brand-cream">
                      {cover ? (
                        <Image
                          src={cover}
                          alt={edition.ville}
                          width={480}
                          height={360}
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <PlaceholderImage description={edition.ville} aspectRatio="4/3" />
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4">
                        <p className="font-display text-lg font-semibold text-white">
                          {edition.ville}
                        </p>
                        <p className="text-xs text-white/70">
                          {new Date(edition.date_debut).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                          {" · "}
                          {count} photo{count > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <section className="mt-14" aria-labelledby="moments-forts">
            <h2 id="moments-forts" className="text-2xl font-bold">
              Moments forts 2026
            </h2>
            <BentoGrid photos={HIGHLIGHT_PHOTOS} />
          </section>
        )}
      </div>
    </PageBackdrop>
  );
}
