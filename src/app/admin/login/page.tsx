"use client";

import Image from "next/image";
import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl bg-white p-8"
      >
        <Image
          src="/logo/fenou-higbe-dark.png"
          alt="Fenou Higbé"
          width={608}
          height={306}
          className="h-9 w-auto"
        />
        <p className="mt-2 text-sm text-neutral-500">Panel d&apos;administration</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2"
            />
          </div>
        </div>

        {state?.error && (
          <p className="mt-4 text-sm text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-full bg-brand-green px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
