"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const site_web = formData.get("site_web");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email, site_web }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-sm text-brand-yellow">Inscription confirmée !</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xs flex-col gap-2 text-sm">
      <input
        type="text"
        name="site_web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <label htmlFor="newsletter-email">Newsletter</label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="ton@email.com"
          className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-white placeholder:text-neutral-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-md bg-brand-yellow px-3 py-2 font-semibold text-neutral-950 disabled:opacity-60"
        >
          OK
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400">Une erreur est survenue.</p>
      )}
    </form>
  );
}
