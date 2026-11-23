import { getStoredEditions } from "@/lib/editions";
import { getEditionPhotos } from "@/lib/content";
import { deleteEditionPhoto } from "@/app/admin/actions";
import { GalleryUploader } from "@/components/admin/GalleryUploader";
import Image from "next/image";

export default async function AdminGaleriePage() {
  const [editions, photos] = await Promise.all([
    getStoredEditions(),
    getEditionPhotos(),
  ]);

  const villeById = new Map(editions.map((e) => [e.id, e.ville]));

  return (
    <div>
      <h1 className="text-2xl font-bold">Galerie</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Les photos sélectionnées ici sont automatiquement redimensionnées et
        compressées avant envoi — tu peux importer des photos brutes
        directement.
      </p>

      <div className="mt-6">
        <GalleryUploader
          editions={editions.map((e) => ({
            id: e.id,
            ville: e.ville,
            date_debut: e.date_debut,
          }))}
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative">
            <Image
              src={photo.url}
              alt={photo.alt ?? ""}
              width={200}
              height={200}
              className="aspect-square w-full rounded-md object-cover"
            />
            <p className="mt-1 truncate text-xs text-neutral-500">
              {villeById.get(photo.edition_id) ?? "—"}
            </p>
            <form action={deleteEditionPhoto.bind(null, photo.id)}>
              <button
                type="submit"
                className="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                Suppr.
              </button>
            </form>
          </div>
        ))}
        {photos.length === 0 && (
          <p className="text-sm text-neutral-400">Aucune photo pour l&apos;instant.</p>
        )}
      </div>
    </div>
  );
}
