"use client";

import { useState, type FormEvent } from "react";

export function PartnershipRequestForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/partenariat", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
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
    return (
      <p className="rounded-xl bg-brand-green/10 p-6 font-medium text-brand-green">
        Merci ! Notre dossier de partenariat te sera envoyé par email.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium" htmlFor="organisation">
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="nom">
            Nom du contact
          </label>
          <input
            id="nom"
            name="nom"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email professionnel
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="message">
          Message (optionnel)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-brand-green px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "Recevoir notre dossier de partenariat"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Une erreur est survenue, réessaie dans un instant.
        </p>
      )}
    </form>
  );
}
