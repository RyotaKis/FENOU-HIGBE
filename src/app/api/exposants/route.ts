import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { nom, email, telephone, activite, message } = body ?? {};

  if (!nom || !email || !activite || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("applicants").insert({
    nom,
    email,
    telephone: telephone || null,
    activite,
    message,
  });

  if (error) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
