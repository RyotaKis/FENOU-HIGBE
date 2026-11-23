import Image from "next/image";
import heroImage from "../../../public/images/hero.jpg";

// TODO(assets): swap /public/images/hero.jpg for a different shot anytime,
// or set an override image from the admin panel (Contenu des pages →
// Accueil → Hero) — it takes priority over this default. Flip `mode` to
// "video" once the client supplies the final hero video (mp4/webm, muted,
// loop-ready) and set `videoSrc`.

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
          src={overrideImage || heroImage}
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          // Aperçu flou intégré au HTML : l'image s'affiche immédiatement en
          // basse définition puis se précise, au lieu d'un fond vide.
          placeholder={overrideImage ? "empty" : "blur"}
          className="object-cover object-[center_25%]"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/35 to-black/85" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent" />
    </div>
  );
}
