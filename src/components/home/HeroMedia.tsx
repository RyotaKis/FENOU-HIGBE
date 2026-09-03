"use client";

import Image from "next/image";

// TODO(assets): swap /public/images/hero.jpg for a different shot anytime,
// or set an override image from the admin panel (Contenu des pages →
// Accueil → Hero) — it takes priority over this default. Flip `mode` to
// "video" once the client supplies the final hero video (mp4/webm, muted,
// loop-ready) and set `videoSrc`.
const DEFAULT_IMAGE = "/images/hero.jpg";

type HeroMediaProps = {
  mode?: "image" | "video";
  videoSrc?: string;
  overrideImage?: string;
};

export function HeroMedia({ mode = "image", videoSrc, overrideImage }: HeroMediaProps) {
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
        <Image
          src={overrideImage || DEFAULT_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/35 to-black/85" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
    </div>
  );
}
