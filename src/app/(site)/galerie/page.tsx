import type { Metadata } from "next";
import Image from "next/image";
import { getEditionPhotos } from "@/lib/content";

export const metadata: Metadata = { title: "Galerie" };

export default async function GaleriePage() {
  const photos = await getEditionPhotos();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
        Ambiance
      </p>
      <h1 className="mt-2 text-4xl font-black">Galerie</h1>
      <p className="mt-4 max-w-2xl text-neutral-600">
        Photos et vidéos qui donnent envie d&apos;y être — édition après
        édition.
      </p>

      {photos.length > 0 ? (
        <div className="mt-10 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {photos.map((photo) => (
            <Image
              key={photo.id}
              src={photo.url}
              alt={photo.alt ?? ""}
              width={480}
              height={480}
              className="w-full rounded-lg object-cover"
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-neutral-400">
          La galerie sera alimentée dès la première édition publiée depuis
          l&apos;admin.
        </p>
      )}
    </div>
  );
}
