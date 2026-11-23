"use client";

import { useRouter } from "next/navigation";
import { revalidateGallery } from "@/app/admin/actions";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/compressImage";

type EditionOption = { id: string; ville: string; date_debut: string };

type FileStatus = "en_attente" | "compression" | "envoi" | "ok" | "erreur";

type FileRow = { file: File; status: FileStatus; error?: string };

export function GalleryUploader({ editions }: { editions: EditionOption[] }) {
  const router = useRouter();
  const [editionId, setEditionId] = useState(editions[0]?.id ?? "");
  const [rows, setRows] = useState<FileRow[]>([]);
  const [uploading, setUploading] = useState(false);

  const onPick = (fileList: FileList | null) => {
    if (!fileList) return;
    setRows(
      Array.from(fileList).map((file) => ({ file, status: "en_attente" as FileStatus })),
    );
  };

  const uploadAll = async () => {
    if (!editionId || rows.length === 0) return;
    setUploading(true);
    const supabase = createClient();

    for (let i = 0; i < rows.length; i++) {
      const { file } = rows[i];

      setRows((prev) =>
        prev.map((r, idx) => (idx === i ? { ...r, status: "compression" } : r)),
      );

      try {
        const compressed = await compressImage(file);
        const path = `galerie/${editionId}/${crypto.randomUUID()}.jpg`;

        setRows((prev) =>
          prev.map((r, idx) => (idx === i ? { ...r, status: "envoi" } : r)),
        );

        const { error: uploadError } = await supabase.storage
          .from("site-content")
          .upload(path, compressed, { contentType: "image/jpeg" });
        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("site-content")
          .getPublicUrl(path);

        const { error: insertError } = await supabase.from("edition_photos").insert({
          edition_id: editionId,
          url: publicUrl.publicUrl,
          alt: file.name.replace(/\.[^.]+$/, ""),
          ordre: 0,
        });
        if (insertError) throw insertError;

        setRows((prev) =>
          prev.map((r, idx) => (idx === i ? { ...r, status: "ok" } : r)),
        );
      } catch (err) {
        setRows((prev) =>
          prev.map((r, idx) =>
            idx === i
              ? {
                  ...r,
                  status: "erreur",
                  error: err instanceof Error ? err.message : "Échec de l'envoi",
                }
              : r,
          ),
        );
      }
    }

    setUploading(false);
    await revalidateGallery();
    router.refresh();
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="font-semibold">Ajouter des photos</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Édition</label>
          <select
            value={editionId}
            onChange={(e) => setEditionId(e.target.value)}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          >
            {editions.map((e) => (
              <option key={e.id} value={e.id}>
                {e.ville} — {e.date_debut}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Photos (plusieurs possibles)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onPick(e.target.files)}
            className="mt-1 block w-full text-sm"
          />
        </div>
      </div>

      {rows.length > 0 && (
        <ul className="mt-4 max-h-64 divide-y divide-neutral-100 overflow-y-auto text-sm">
          {rows.map((row, i) => (
            <li key={i} className="flex items-center justify-between gap-4 py-2">
              <span className="truncate">{row.file.name}</span>
              <span
                className={
                  row.status === "ok"
                    ? "text-brand-green"
                    : row.status === "erreur"
                      ? "text-red-600"
                      : "text-neutral-400"
                }
              >
                {row.status === "en_attente" && "en attente"}
                {row.status === "compression" && "compression…"}
                {row.status === "envoi" && "envoi…"}
                {row.status === "ok" && "envoyé"}
                {row.status === "erreur" && (row.error ?? "erreur")}
              </span>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={uploadAll}
        disabled={uploading || rows.length === 0 || !editionId}
        className="mt-4 rounded-full bg-brand-green px-6 py-2 font-semibold text-white disabled:opacity-40"
      >
        {uploading ? "Envoi en cours…" : "Envoyer les photos"}
      </button>

      {editions.length === 0 && (
        <p className="mt-4 text-sm text-neutral-400">
          Crée d&apos;abord une édition (page « Éditions du Tour ») avant
          d&apos;ajouter des photos.
        </p>
      )}
    </div>
  );
}
