import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";
import { isValidEmail } from "@/lib/validation";
import { getClientIp, isMissingFunction, legacyCheckRateLimit, readJson } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const body = await readJson(request);
  if (!body) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  const { email, site_web } = body;

  // Honeypot : un bot remplit ce champ invisible, un humain jamais.
  if (site_web) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const supabase = createPublicClient();
  const ip = getClientIp(request);

  const { data, error } = await supabase.rpc("subscribe_newsletter", {
    p_email: email,
    p_ip: ip,
  });

  if (!error) {
    if (data === "ok") return NextResponse.json({ ok: true });
    if (data === "rate_limited") {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!isMissingFunction(error)) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }

  // Repli tant que la migration sécurité n'est pas exécutée.
  if (!(await legacyCheckRateLimit(supabase, `newsletter:${ip}`))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  const { error: insertError } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });
  if (insertError) {
    return NextResponse.json({ error: "insert_failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
