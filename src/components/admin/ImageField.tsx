"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/compressImage";

type ImageFieldProps = {
  name: string;
  label: string;
  currentUrl: string;
  pathPrefix: string;
};

export function ImageField({ name, label, currentUrl, pathPrefix }: ImageFieldProps) {
  const [url, setUrl] = useState(currentUrl);
  const [status, setStatus] = useState<"idle" | "envoi" | "erreur">("idle");

  const onChange = async (file: File | undefined) => {
    if (!file) return;
    setStatus("envoi");
    try {
      const supabase = createClient();
      const compressed = await compressImage(file);
      const path = `${pathPrefix}-${crypto.randomUUID()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("site-content")
        .upload(path, compressed, { contentType: "image/jpeg" });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("site-content").getPublicUrl(path);
      setUrl(data.publicUrl);
      setStatus("idle");
    } catch {
      setStatus("erreur");
    }
  };

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {url && (
        <Image
          src={url}
          alt=""
          width={160}
          height={120}
          className="mt-2 h-24 w-32 object-cover"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0])}
        className="mt-2 block w-full text-sm"
      />
      {status === "envoi" && (
        <p className="mt-1 text-xs text-neutral-400">Envoi en cours…</p>
      )}
      {status === "erreur" && (
        <p className="mt-1 text-xs text-red-600">Échec de l&apos;envoi, réessaie.</p>
      )}
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
