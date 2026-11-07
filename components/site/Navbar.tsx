"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";

const LINKS = ["about", "work", "stack", "journey", "contact"] as const;
const EASE = [0.32, 0.72, 0, 1] as const;
const EXPO = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const langSwitch = (
    <nav aria-label={lang === "es" ? "Idioma" : "Language"} className="flex items-center gap-1">
      {(["es", "en"] as const).map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/15" />}
          <button
            type="button"
            onClick={() => lang !== code && toggle()}
            aria-current={lang === code}
            className={`rounded-md px-2 py-1 font-mono text-xs tracking-wider uppercase transition-colors duration-200 ${
              lang === code ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {code}
          </button>
        </span>
      ))}
    </nav>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open ? "border-border bg-background/75 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EXPO }}
          className="container-page flex h-[72px] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]"
        >
          <a href="#top" aria-label={profile.name} className="justify-self-start font-display text-2xl font-bold tracking-tight">
            JD<span className="text-primary">.</span>
          </a>

          <nav aria-label={lang === "es" ? "Navegación principal" : "Main navigation"} className="hidden md:block">
            <ul className="flex items-center gap-9 text-sm">
              {LINKS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "location" : undefined}
                    className={`transition-colors duration-200 ${
                      active === id ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6 md:justify-self-end">
            <span className="hidden md:block">{langSwitch}</span>
            <a
              href={profile.cv}
              download
              className="hidden h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium whitespace-nowrap text-primary-foreground transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-px md:inline-flex"
            >
              {t.nav.cv}
              <ArrowDownToLine className="size-4" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-10 place-items-center rounded-full md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span
                className={`absolute h-px w-5 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-black/85 px-8 pt-28 pb-12 backdrop-blur-3xl md:hidden"
          >
            <nav className="flex flex-col">
              {LINKS.map((id, i) => (
                <div key={id} className="overflow-hidden">
                  <motion.a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 24, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}
                    className="flex items-baseline gap-4 py-3 font-display text-4xl font-semibold tracking-tight"
                  >
                    <span className="font-mono text-xs text-primary">0{i + 1}</span>
                    {t.nav[id]}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
              className="flex items-center justify-between"
            >
              {langSwitch}
              <a
                href={profile.cv}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-primary py-1.5 pr-1.5 pl-5 text-sm font-medium text-primary-foreground"
              >
                {t.nav.cv}
                <span className="grid size-8 place-items-center rounded-full bg-black/15">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
