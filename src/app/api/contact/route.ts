import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isValidEmail, isValidText, MAX_LENGTHS } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const body = await request.json();
  const { nom, email, message, site_web } = body ?? {};

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

  const supabase = await createClient();

  const allowed = await checkRateLimit(supabase, `contact:${getClientIp(request)}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { error } = await supabase
    .from("contact_messages")
    .insert({ nom, email, message });

  if (error) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
