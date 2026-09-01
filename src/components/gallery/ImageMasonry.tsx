"use client";

import Image from "next/image";
import { useState } from "react";
import type { EditionPhoto } from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "@/components/gallery/Lightbox";

export function ImageMasonry({ photos }: { photos: EditionPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-10 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {photos.map((photo, index) => (
          <Reveal key={photo.id} delay={(index % 6) * 0.06} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              aria-label={photo.alt ?? "Agrandir la photo"}
            >
              <Image
                src={photo.url}
                alt={photo.alt ?? ""}
                width={480}
                height={480}
                className="w-full object-cover transition-opacity hover:opacity-90"
              />
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox
        photos={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
