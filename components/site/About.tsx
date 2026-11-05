"use client";

import Image from "next/image";
import { Code2, Cpu, Languages, MapPin, ShieldCheck, Smartphone } from "lucide-react";
import LogoLoop, { type LogoItem } from "@/components/reactbits/LogoLoop";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import CountUp from "@/components/reactbits/CountUp";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { ALL_TOOLS } from "./tools";

const FOCUS_ICONS = [Code2, Smartphone, Cpu, ShieldCheck];

const LOGOS: LogoItem[] = ALL_TOOLS.map((tool) => ({
  node: <tool.icon />,
  title: tool.name,
  ariaLabel: tool.name,
  hoverColor: tool.color,
}));

export function About() {
  const { t, lang } = useLang();

  return (
    <>
      <div className="border-y border-white/[0.06] py-10">
        <p className="mb-7 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{t.logos}</p>
        <div className="text-[#6e6e73]">
          <LogoLoop
            logos={LOGOS}
            speed={40}
            logoHeight={30}
            gap={56}
            fadeOut
            fadeOutColor="#000000"
            scaleOnHover
            pauseOnHover
            ariaLabel={t.logos}
          />
        </div>
      </div>

      <section id="about" className="mx-auto max-w-[1080px] scroll-mt-20 px-5 py-28 md:py-40">
        <Reveal>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#a1a1a6]">
            <span className="size-1 rounded-full bg-primary" />
            {t.about.label}
          </span>
        </Reveal>
        <ScrollReveal
          key={lang}
          baseOpacity={0.15}
          enableBlur
          blurStrength={5}
          baseRotation={0}
          containerClassName="mt-4"
          textClassName="text-[clamp(1.9rem,4.6vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-foreground"
        >
          {t.about.statement}
        </ScrollReveal>

        <div className="mt-20 grid gap-4 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(200px,auto))]">
          <Reveal className="relative overflow-hidden rounded-[28px] border border-white/[0.08] md:col-span-2 md:row-span-2">
            <div className="relative h-full min-h-[380px]">
              <Image
                src="/life/muay-thai.jpg"
                alt="Muay Thai"
                fill
                sizes="(min-width: 768px) 520px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-accent text-3xl text-foreground">Muay Thai</p>
                <p className="text-[#d2d2d7]">
                  {lang === "es" ? "Disciplina dentro y fuera del código." : "Discipline in and out of code."}
                </p>
              </div>
            </div>
          </Reveal>

          {t.about.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i} className="tile flex flex-col justify-between gap-6 p-7">
              <span className="text-brand text-6xl font-semibold tracking-[-0.05em] md:text-7xl">
                <CountUp to={s.value} duration={1.6} />
                {s.suffix}
              </span>
              <span className="text-[15px] leading-snug text-[#a1a1a6]">{s.label}</span>
            </Reveal>
          ))}

          <Reveal delay={0.15} className="tile flex flex-col justify-between gap-6 p-7">
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <MapPin className="size-3.5 text-primary" /> {t.about.locationLabel}
              </span>
              <span className="text-lg font-semibold tracking-tight">{t.about.location}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Languages className="size-3.5 text-primary" /> {t.about.languagesLabel}
              </span>
              <span className="text-lg font-semibold tracking-tight">{t.about.languages}</span>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {t.about.focus.map((f, i) => {
            const Icon = FOCUS_ICONS[i];
            return (
              <Reveal key={f.title} delay={0.05 * i}>
                <SpotlightCard
                  spotlightColor="rgba(53, 194, 109, 0.18)"
                  className="h-full rounded-[28px] p-7"
                >
                  <div className="flex h-full flex-col gap-10">
                    <Icon className="size-7 text-primary" strokeWidth={1.6} />
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xl font-semibold tracking-tight">{f.title}</h3>
                      <p className="text-[15px] leading-relaxed text-[#a1a1a6]">{f.body}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
