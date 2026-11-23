import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Photos et logos du dossier public : mis en cache 30 jours par le
        // navigateur (ils changent rarement).
        source: "/:dir(images|logo)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  images: {
    // AVIF puis WebP : 30 à 50 % plus légers que le JPEG d'origine.
    formats: ["image/avif", "image/webp"],
    // Les versions optimisées restent en cache 31 jours sur Vercel.
    minimumCacheTTL: 2678400,
    // Tailles adaptées aux écrans mobiles courants (moins de variantes inutiles).
    deviceSizes: [360, 414, 640, 828, 1080, 1280, 1920],
    qualities: [70, 75],
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
