import type { Metadata } from "next";

// L'espace d'administration ne doit jamais apparaître dans Google.
export const metadata: Metadata = {
  title: { default: "Administration", template: "%s — Admin Fenou Higbé" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
