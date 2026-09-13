"use client";

import Image from "next/image";
import { useState } from "react";
import type { EditionPhoto } from "@/lib/types";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "@/components/gallery/Lightbox";

// Motif répété toutes les 6 photos : une grande case, cinq normales.
const SPAN_PATTERN = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "",
  "sm:col-span-2",
  "",
];

export function BentoGrid({ photos }: { photos: EditionPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:auto-rows-[180px] sm:grid-cols-4">
        {photos.map((photo, index) => (
          <Reveal
            key={photo.id}
            delay={(index % 6) * 0.06}
            scale={0.94}
            className={SPAN_PATTERN[index % SPAN_PATTERN.length]}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block aspect-square h-full w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange sm:aspect-auto"
              aria-label={photo.alt ?? "Agrandir la photo"}
            >
              <Image
                src={photo.url}
                alt={photo.alt ?? ""}
                width={480}
                height={480}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
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
