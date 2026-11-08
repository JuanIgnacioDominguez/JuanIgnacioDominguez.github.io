"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUp, ArrowUpRight, Briefcase, Lightbulb, Send, Users } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiInstagram } from "react-icons/si";
import { CopyButton } from "@/components/watermelon/copy-confirm";
import { FloatingInput, FloatingTextarea } from "@/components/watermelon/floating-input";
import { ShimmerButton } from "@/components/watermelon/shimmer-button";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "ok" | "error";

const SOCIALS = [
  { label: "LinkedIn", href: profile.socials.linkedin, icon: FaLinkedin },
  { label: "GitHub", href: profile.socials.github, icon: SiGithub },
  { label: "Instagram", href: profile.socials.instagram, icon: SiInstagram },
];

const AVAILABILITY_ICONS = [Briefcase, Users, Lightbulb];
const NAV = ["about", "work", "stack", "journey", "contact"] as const;

export function Contact() {
  const { t, lang, toggle } = useLang();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const data: unknown = await res.json();
      const ok = res.ok && typeof data === "object" && data !== null && "success" in data;
      setStatus(ok ? "ok" : "error");
      if (ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-foreground/[0.06]">
        <div className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--primary)_12%,transparent),transparent)]" />

        <div className="relative mx-auto grid max-w-[1080px] gap-14 px-5 py-28 md:py-40 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-subtle">
              <span className="size-1 rounded-full bg-primary" />
              {t.contact.label}
            </span>
            <h2 className="text-[clamp(2.75rem,6.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.05em]">
              <span className="text-headline block pb-1">{t.contact.titleA}</span>
              <span className="font-accent block pb-2 text-[1.12em] text-primary">{t.contact.titleB}</span>
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-subtle">{t.contact.lead}</p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-primary-foreground shadow-[0_8px_30px_-8px_color-mix(in_srgb,var(--primary)_60%,transparent)] transition-transform hover:scale-[1.03]"
            >
              Email <ArrowRight className="size-4" />
            </a>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {t.contact.find}
                </span>
                <span className="h-px flex-1 bg-foreground/10" />
              </div>
              <div className="flex flex-wrap gap-x-7 gap-y-3">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-[15px] text-foreground"
                  >
                    <Icon className="size-5" />
                    {label}
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <div className="tile p-7 md:p-9">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t.contact.mail}
              </span>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-xl font-semibold tracking-tight hover:text-primary md:text-2xl"
                >
                  {profile.email}
                </a>
                <CopyButton valueToCopy={profile.email} copyText={t.contact.copy} copiedText={t.contact.copied} />
              </div>

              <div className="my-7 h-px bg-foreground/[0.08]" />

              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {t.contact.available}
              </span>
              <ul className="mt-5 flex flex-col gap-5">
                {t.contact.availability.map((a, i) => {
                  const Icon = AVAILABILITY_ICONS[i];
                  return (
                    <li key={a.title} className="flex items-center gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] text-primary">
                        <Icon className="size-5" strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="font-semibold">{a.title}</p>
                        <p className="text-sm text-subtle">{a.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <form onSubmit={onSubmit} className="tile flex flex-col gap-3 p-5 md:p-6">
              <p className="mb-1 text-sm font-semibold">{t.contact.formTitle}</p>
              <input type="hidden" name="_subject" value="Nuevo mensaje desde el portfolio" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid gap-3 sm:grid-cols-2">
                <FloatingInput name="name" label={t.contact.name} required autoComplete="name" />
                <FloatingInput name="email" type="email" label={t.contact.email} required autoComplete="email" />
              </div>
              <FloatingTextarea name="message" label={t.contact.message} required rows={4} />
              <ShimmerButton type="submit" disabled={status === "sending"} className="w-full rounded-full py-3">
                <Send size={15} />
                {status === "sending" ? t.contact.sending : t.contact.send}
              </ShimmerButton>
              {status === "ok" && <p className="text-sm text-primary">{t.contact.ok}</p>}
              {status === "error" && <p className="text-sm text-destructive">{t.contact.error}</p>}
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-foreground/[0.06]">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-8 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">
              JD<span className="text-primary">.</span>
            </span>
            <div className="text-sm leading-tight">
              <p className="font-medium">{profile.name}</p>
              <p className="text-muted-foreground">{t.hero.role}</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle">
            {NAV.map((id) => (
              <a key={id} href={`#${id}`} className="hover:text-foreground">
                {t.nav[id]}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <button onClick={toggle} className="text-xs font-medium text-subtle hover:text-foreground">
              <span className={lang === "es" ? "text-foreground" : ""}>ES</span>
              <span className="mx-1.5 text-foreground/20">|</span>
              <span className={lang === "en" ? "text-foreground" : ""}>EN</span>
            </button>
            <a
              href="#top"
              aria-label={t.footer.top}
              className="grid size-11 place-items-center rounded-full border border-foreground/10 transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
        <p className="mx-auto max-w-[1080px] border-t border-foreground/[0.06] px-5 py-5 pb-24 text-xs text-muted-foreground">
          © {new Date().getFullYear()} · {t.footer.rights}
        </p>
      </footer>
    </>
  );
}
