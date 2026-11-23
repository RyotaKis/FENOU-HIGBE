import type { Metadata, Viewport } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Poppins n'est pas une police variable : chaque graisse/style est un
// fichier à télécharger. On se limite aux 4 graisses réellement utilisées,
// sans italique (les citations en italique utilisent Montserrat).
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fenou Higbé — Le marché des jeunes entrepreneurs béninois",
    template: "%s — Fenou Higbé",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "./" },
  // Aperçu affiché quand le lien est partagé sur WhatsApp, Facebook, etc.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: "Fenou Higbé — Le marché des jeunes entrepreneurs béninois",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Le public du Fenou Higbé à Cotonou" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-brand-yellow focus:px-5 focus:py-2.5 focus:font-semibold focus:text-neutral-950"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
