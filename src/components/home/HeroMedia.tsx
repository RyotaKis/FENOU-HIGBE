"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PlaceholderImage } from "@/components/PlaceholderImage";

// TODO(assets): replace the carousel slides below with real event photography,
// then flip `mode` to "video" once the client supplies the final hero video
// (mp4/webm, muted, loop-ready) and set `videoSrc`.
const SLIDES = [
  "Foule et stands illuminés du Grand Fenou Higbé de nuit",
  "Jeune exposante présentant ses produits artisanaux",
  "Ambiance festive et colorée du marché en journée",
];

type HeroMediaProps = {
  mode?: "carousel" | "video";
  videoSrc?: string;
  intervalMs?: number;
};

export function HeroMedia({
  mode = "carousel",
  videoSrc,
  intervalMs = 5000,
}: HeroMediaProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (mode !== "carousel") return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [mode, intervalMs]);

  return (
    <div className="absolute inset-0 -z-10">
      {mode === "video" && videoSrc ? (
        <video
          className="h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <PlaceholderImage
              description={SLIDES[index]}
              aspectRatio="auto"
              className="h-full w-full"
              seed={SLIDES[index]}
            />
          </motion.div>
        </AnimatePresence>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
    </div>
  );
}
