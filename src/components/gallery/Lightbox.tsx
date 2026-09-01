"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect } from "react";
import type { EditionPhoto } from "@/lib/types";

type LightboxProps = {
  photos: EditionPhoto[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;
  const photo = isOpen ? photos[index] : null;

  useEffect(() => {
    if (!isOpen) return;

    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && index !== null) {
        onNavigate((index + 1) % photos.length);
      }
      if (event.key === "ArrowLeft" && index !== null) {
        onNavigate((index - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, index, photos.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {photo && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo en plein écran"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + photos.length) % photos.length);
            }}
            aria-label="Photo précédente"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
          >
            ‹
          </button>
          <motion.div
            className="relative max-h-full max-w-3xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photo.url}
              alt={photo.alt ?? ""}
              width={1200}
              height={1200}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
          </motion.div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % photos.length);
            }}
            aria-label="Photo suivante"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow"
          >
            ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
