import type { Metadata } from "next";
import { getEditionPhotos } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageMasonry } from "@/components/gallery/ImageMasonry";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export const metadata: Metadata = { title: "Galerie" };

export default async function GaleriePage() {
  const photos = await getEditionPhotos();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <SectionHeading
        eyebrow="Ambiance"
        title="Galerie"
        intro="Photos et vidéos qui donnent envie d'y être — édition après édition."
      />

      {photos.length > 0 ? (
        <ImageMasonry photos={photos} />
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
  );
}
