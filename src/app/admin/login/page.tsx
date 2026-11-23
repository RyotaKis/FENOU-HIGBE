import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/supabase/admin";
import { getSiteLogo } from "@/lib/pageContent";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Connexion" };

export default async function AdminLoginPage() {
  // Déjà connecté en tant qu'admin → directement au tableau de bord.
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user && (await isAdmin(supabase))) redirect("/admin");
  }

  const logo = await getSiteLogo();

  return <LoginForm logoSrc={logo.header} />;
}
