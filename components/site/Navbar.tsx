"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowDownToLine, Mail, Moon, Sun } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiInstagram } from "react-icons/si";
import { PillNav } from "@/components/reactbits/PillNav";
import { StaggeredMenu } from "@/components/reactbits/StaggeredMenu";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";
import { useTheme } from "./ThemeProvider";

const LINKS = ["about", "stack", "work", "journey", "contact"] as const;

function LangSwitch(): ReactNode {
  const { lang, toggle } = useLang();
  return (
    <div
      role="radiogroup"
      aria-label={lang === "es" ? "Idioma" : "Language"}
      className="relative grid h-9 w-[84px] shrink-0 grid-cols-2 items-center rounded-full bg-foreground/[0.06] p-[3px]"
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ x: lang === "en" ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 500, damping: 36 }}
        className="absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-background shadow-sm"
      />
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={lang === code}
          onClick={() => lang !== code && toggle()}
          className={`relative z-10 h-full rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 ${
            lang === code ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle(): ReactNode {
  const { theme, toggle } = useTheme();
  const { lang } = useLang();
  const dark = theme === "dark";
  const label = lang === "es" ? (dark ? "Activar modo claro" : "Activar modo oscuro") : dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-foreground/[0.06] text-foreground transition-colors duration-200 hover:bg-foreground/[0.1]"
    >
      <motion.span
        key={theme}
        initial={{ y: 14, opacity: 0, rotate: -60 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: -14, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="grid place-items-center"
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </motion.span>
    </button>
  );
}

export function Navbar(): ReactNode {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const close = useCallback(() => setOpen(false), []);

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
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = LINKS.map((id) => ({ label: t.nav[id], href: `#${id}`, active: active === id }));
  const pill = scrolled && !open;

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto mx-auto flex h-[60px] items-center justify-between gap-4 border transition-[max-width,background-color,border-color,box-shadow,border-radius,padding] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            pill
              ? "max-w-[1180px] rounded-[22px] border-border bg-[var(--nav-pill)] pr-2 pl-5 shadow-[0_10px_40px_-16px_var(--shadow-strong)] backdrop-blur-2xl backdrop-saturate-150"
              : "max-w-[1440px] rounded-none border-transparent bg-transparent px-2 md:px-4"
          }`}
        >
          <a href="#top" aria-label={profile.name} className="font-display text-2xl font-bold tracking-tight">
            JD<span className="text-primary">.</span>
          </a>

          <PillNav
            items={items}
            ariaLabel={lang === "es" ? "Navegación principal" : "Main navigation"}
            className="hidden lg:block"
          />

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <LangSwitch />
              <ThemeToggle />
              <a
                href={profile.cv}
                download
                className="ml-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold whitespace-nowrap text-primary-foreground transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/90 active:scale-[0.97]"
              >
                {t.nav.cv}
                <ArrowDownToLine className="size-4" />
              </a>
            </div>

            <span className="lg:hidden">
              <ThemeToggle />
            </span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? (lang === "es" ? "Cerrar menú" : "Close menu") : lang === "es" ? "Abrir menú" : "Open menu"}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              className="inline-flex min-h-11 items-center gap-2 px-2 text-[15px] font-semibold text-foreground lg:hidden"
            >
              <span aria-hidden="true" className="relative inline-block h-[1em] overflow-hidden leading-none whitespace-nowrap">
                <span
                  className={`flex flex-col leading-none transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "-translate-y-1/2" : "translate-y-0"
                  }`}
                >
                  <span className="block h-[1em]">{lang === "es" ? "Menú" : "Menu"}</span>
                  <span className="block h-[1em]">{lang === "es" ? "Cerrar" : "Close"}</span>
                </span>
              </span>
              <span aria-hidden="true" className="relative inline-block h-3.5 w-[18px]">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="absolute left-0 h-0.5 w-full rounded-full bg-current transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{
                      top: i * 6,
                      transform: open
                        ? i === 0
                          ? "translateY(6px) rotate(45deg)"
                          : i === 2
                            ? "translateY(-6px) rotate(-45deg)"
                            : "scaleX(0.4)"
                        : "none",
                      opacity: open && i === 1 ? 0 : 1,
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </motion.div>
      </header>

      <StaggeredMenu
        open={open}
        onClose={close}
        items={items}
        socialsTitle={lang === "es" ? "Redes" : "Socials"}
        socials={[
          { label: "GitHub", href: profile.socials.github, icon: <SiGithub className="size-[18px]" /> },
          { label: "LinkedIn", href: profile.socials.linkedin, icon: <FaLinkedin className="size-[18px]" /> },
          { label: "Instagram", href: profile.socials.instagram, icon: <SiInstagram className="size-[18px]" /> },
          { label: "Email", href: `mailto:${profile.email}`, icon: <Mail className="size-[18px]" /> },
        ]}
        footer={
          <div className="flex flex-col gap-4">
            <a
              href={profile.cv}
              download
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground"
            >
              {t.nav.cv}
              <ArrowDownToLine className="size-4" />
            </a>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {lang === "es" ? "Idioma" : "Language"}
              </span>
              <LangSwitch />
            </div>
          </div>
        }
      />
    </>
  );
}
