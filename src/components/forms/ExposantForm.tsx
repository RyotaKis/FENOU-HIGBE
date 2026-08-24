"use client";

import { useState, type FormEvent } from "react";

export function ExposantForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/exposants", {
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
        Merci pour ta candidature ! L&apos;équipe Fenou Higbé te recontacte
        bientôt.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom complet" name="nom" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Téléphone" name="telephone" />
        <Field label="Activité / secteur" name="activite" required />
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="message">
          Présente ton activité
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-brand-orange px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "Envoyer ma candidature"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Une erreur est survenue, réessaie dans un instant.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
      />
    </div>
  );
}
