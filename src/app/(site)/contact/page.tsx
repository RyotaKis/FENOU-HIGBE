import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
        Une question ?
      </p>
      <h1 className="mt-2 text-4xl font-black">Contact</h1>
      <p className="mt-4 text-neutral-600">
        Écris-nous, on te répond au plus vite.
      </p>
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
