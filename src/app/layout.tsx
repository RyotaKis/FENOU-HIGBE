import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Fenou Higbé — Le marché des jeunes entrepreneurs béninois",
    template: "%s — Fenou Higbé",
  },
  description:
    "Le marché itinérant qui met en lumière les jeunes entrepreneurs africains, chaque dernier week-end du mois, dans différentes villes du Bénin.",
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
