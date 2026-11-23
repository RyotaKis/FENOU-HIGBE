import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";
import { isValidEmail, isValidText, MAX_LENGTHS } from "@/lib/validation";
import { getClientIp, isMissingFunction, legacyCheckRateLimit, readJson } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }
  const { nom, email, message, site_web } = body;

  // Honeypot : un bot remplit ce champ invisible, un humain jamais.
  if (site_web) {
    return NextResponse.json({ ok: true });
  }

  if (
    !isValidText(nom, MAX_LENGTHS.nom) ||
    !isValidEmail(email) ||
    !isValidText(message, MAX_LENGTHS.message)
  ) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const supabase = createPublicClient();
  const ip = getClientIp(request);

  // Chemin normal : fonction SQL qui valide, limite le spam et enregistre.
  const { data, error } = await supabase.rpc("submit_contact", {
    p_nom: nom,
    p_email: email,
    p_message: message,
    p_ip: ip,
  });

  if (!error) {
    if (data === "ok") return NextResponse.json({ ok: true });
    if (data === "rate_limited") {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  if (!isMissingFunction(error)) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  // Repli tant que la migration sécurité n'est pas exécutée.
  if (!(await legacyCheckRateLimit(supabase, `contact:${ip}`))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  const { error: insertError } = await supabase
    .from("contact_messages")
    .insert({ nom, email, message });
  if (insertError) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
