"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Le portail a besoin de `document.body`, absent côté serveur : ce
    // rendu client-only après hydratation est le pattern standard pour
    // éviter tout hydration mismatch (cf. Next.js/Radix), pas un effet
    // à éliminer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden="true"
          />
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-label="Menu"
            className="fixed inset-y-0 right-0 z-50 flex w-4/5 max-w-sm flex-col border-l border-black/5 bg-white/80 px-6 py-8 shadow-xl backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-black">
                FENOU <span className="text-brand-orange">HIGBÉ</span>
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer le menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                ×
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-2 text-lg font-semibold">
              {links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    ref={index === 0 ? firstLinkRef : undefined}
                    onClick={close}
                    className="block rounded-lg px-2 py-3 transition-colors hover:bg-white hover:text-brand-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      >
        <span
          className={`h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {/* Portail vers <body> : évite que `position: fixed` soit cassé par le
          `transform` que Framer Motion applique à l'ancêtre <FadeIn> du Header. */}
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
