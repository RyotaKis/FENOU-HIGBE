import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Ne jamais exposer de PDF/lien tarifaire ici (cf. cahier des charges §8).
// La demande est enregistrée puis traitée manuellement/par un envoi email
// (à brancher sur un provider comme Resend une fois les tarifs finalisés) —
// jamais un lien de téléchargement public.
export async function POST(request: Request) {
  const body = await request.json();
  const { organisation, nom, email, message } = body ?? {};

  if (!organisation || !nom || !email) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("partnership_requests").insert({
    organisation,
    nom,
    email,
    message: message || null,
  });

  if (error) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
