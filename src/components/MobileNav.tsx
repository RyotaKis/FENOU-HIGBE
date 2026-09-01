"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
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
              className="fixed inset-y-0 right-0 z-50 flex w-4/5 max-w-sm flex-col bg-white px-6 py-8 shadow-xl"
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
                      className="block rounded-lg px-2 py-3 transition-colors hover:bg-neutral-100 hover:text-brand-orange"
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
    </div>
  );
}
