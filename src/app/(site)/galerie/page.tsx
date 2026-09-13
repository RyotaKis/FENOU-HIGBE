import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEditionPhotos } from "@/lib/content";
import { getAllEditions } from "@/lib/editions";
import { getPageContent, pick } from "@/lib/pageContent";
import { SectionHeading } from "@/components/SectionHeading";
import { PageBackdrop } from "@/components/PageBackdrop";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

export const metadata: Metadata = { title: "Galerie" };

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
          eyebrow={pick(hero, "eyebrow", "Ambiance")}
          title={pick(hero, "title", "Galerie")}
          intro={pick(
            hero,
            "intro",
            "Photos et vidéos qui donnent envie d'y être — une bento grid par édition.",
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
          <>
            <p className="mt-10 text-neutral-400">
              La galerie sera alimentée dès la première édition publiée depuis
              l&apos;admin.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {["Marché de nuit", "Stand d'exposant", "Podium culturel"].map(
                (label) => (
                  <PlaceholderImage
                    key={label}
                    description={label}
                    aspectRatio="4/3"
                  />
                ),
              )}
            </div>
          </>
        )}
      </div>
    </PageBackdrop>
  );
}
