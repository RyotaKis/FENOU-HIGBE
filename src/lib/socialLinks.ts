export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "whatsapp"
  | "youtube"
  | "linkedin";

export type SocialLink = { platform: SocialPlatform; href: string };

export const FENOU_HIGBE_SOCIALS: SocialLink[] = [
  { platform: "facebook", href: "https://www.facebook.com/fenouhigbe/" },
  { platform: "tiktok", href: "https://www.tiktok.com/@fenouhigbe.officiel" },
  { platform: "whatsapp", href: "https://wa.me/22961016673" },
];

export const FOODS_PACKAGING_SOCIALS: SocialLink[] = [
  { platform: "whatsapp", href: "https://wa.me/22961016673" },
  { platform: "facebook", href: "https://www.facebook.com/fenoupackaging" },
];

export const FENOU_MOMENTS_SOCIALS: SocialLink[] = [
  { platform: "tiktok", href: "https://www.tiktok.com/@fenoumoments" },
  { platform: "youtube", href: "https://www.youtube.com/@FenouMoments" },
];

export const GALA_FENOULOVES_SOCIALS: SocialLink[] = [
  { platform: "tiktok", href: "https://www.tiktok.com/@gala.des.fenouloves" },
  { platform: "facebook", href: "https://www.facebook.com/galadesfenouloves/" },
];

export const SONITA_SOCIALS: SocialLink[] = [
  { platform: "facebook", href: "https://www.facebook.com/sonita.sessi/" },
  { platform: "instagram", href: "https://www.instagram.com/sonita.bidossessi/" },
  { platform: "tiktok", href: "https://www.tiktok.com/@mme.maccron" },
  { platform: "linkedin", href: "https://www.linkedin.com/in/sonita-tossou-0a1413194/" },
  { platform: "whatsapp", href: "https://wa.me/22997351639" },
];

export const SOCIALS_BY_VENTURE: Record<string, SocialLink[]> = {
  "Fenou Foods & Packaging": FOODS_PACKAGING_SOCIALS,
  "Fenou Moments": FENOU_MOMENTS_SOCIALS,
  "Le Gala des Fenouloves": GALA_FENOULOVES_SOCIALS,
};
