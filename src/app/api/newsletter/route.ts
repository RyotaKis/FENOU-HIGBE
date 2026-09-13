import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isValidEmail } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, site_web } = body ?? {};

  // Honeypot : un bot remplit ce champ invisible, un humain jamais.
  if (site_web) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const supabase = await createClient();

  const allowed = await checkRateLimit(supabase, `newsletter:${getClientIp(request)}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
