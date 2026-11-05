"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";

const LINKS = ["about", "work", "stack", "journey", "contact"] as const;
const EASE = [0.32, 0.72, 0, 1] as const;

export function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

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

  const langSwitch = (
    <button
      onClick={toggle}
      className="rounded-full px-2 py-1 font-mono text-[11px] font-medium tracking-wider text-[#86868b] transition-colors hover:text-foreground"
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
    >
      <span className={lang === "es" ? "text-foreground" : ""}>ES</span>
      <span className="mx-1 text-white/20">/</span>
      <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
    </button>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex w-full max-w-[880px] items-center justify-between gap-2 rounded-full border border-white/10 bg-[#0b0b0c]/70 py-1.5 pr-1.5 pl-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150"
        >
          <a href="#top" className="text-lg font-semibold tracking-tight">
            JD<span className="text-primary">.</span>
          </a>

          <ul className="hidden items-center md:flex">
            {LINKS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    active === id ? "text-foreground" : "text-[#a1a1a6] hover:text-foreground"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <span className="hidden md:block">{langSwitch}</span>
            <a
              href={profile.cv}
              download
              className="group hidden items-center gap-2 rounded-full bg-primary py-1 pr-1 pl-4 text-[13px] font-medium text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] md:inline-flex"
            >
              {t.nav.cv}
              <span className="grid size-7 place-items-center rounded-full bg-black/15 transition-transform duration-500 group-hover:translate-y-0.5">
                <ArrowDownToLine className="size-3.5" />
              </span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="relative grid size-10 place-items-center rounded-full bg-white/[0.06] md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <span
                className={`absolute h-px w-4 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </motion.nav>
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
                    className="flex items-baseline gap-4 py-3 text-4xl font-semibold tracking-tight"
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
                className="inline-flex items-center gap-2 rounded-full bg-primary py-1.5 pr-1.5 pl-5 text-sm font-medium text-primary-foreground"
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
