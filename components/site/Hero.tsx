"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";

const EASE = [0.16, 1, 0.3, 1] as const;
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$&#@%";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
  transition: { duration: 0.9, delay, ease: EASE },
});

interface ScrambleTextProps {
  text: string;
  delay?: number;
  className?: string;
}

/** Each letter cycles random glyphs, then locks in left to right. */
function ScrambleText({ text, delay = 0, className = "" }: ScrambleTextProps) {
  const [frame, setFrame] = useState(-1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const id = setTimeout(() => setFrame(Number.MAX_SAFE_INTEGER), 0);
      return () => clearTimeout(id);
    }
    const total = text.length * 2 + 8;
    let f = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        f += 1;
        setFrame(f);
        if (f >= total) clearInterval(interval);
      }, 40);
    }, delay * 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((ch, i) => {
          const settled = frame >= i * 2 + 8;
          const glyph = settled || ch === " " ? ch : GLYPHS[(i * 7 + Math.max(frame, 0) * 3) % GLYPHS.length];
          return (
            <span
              key={i}
              className="relative inline-block transition-[color,opacity] duration-150"
              style={settled ? undefined : { color: "var(--primary)", opacity: frame < 0 ? 0.16 : 0.35 }}
            >
              <span className="invisible">{ch}</span>
              <span className="absolute top-0 left-1/2 -translate-x-1/2">{glyph}</span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const name = `${profile.name} —`;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-background [--name-bottom:14%] [--name-size:clamp(3.25rem,9.5vw,9.5rem)] md:[--name-bottom:13%] lg:[--hero-base:40%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] left-1/2 size-[min(1100px,120vw)] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
      />

      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 40 }}
        transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
        className="absolute bottom-[calc(var(--name-bottom)+var(--name-size))] left-1/2 z-10 aspect-square h-[33%] max-w-[85vw] -translate-x-1/2 md:h-[36%] lg:bottom-[calc(var(--hero-base)-6%)] lg:left-[min(70%,calc(50%+300px))] lg:h-[56%]"
      >
        {/* Soft spotlight behind the right shoulder */}
        <div
          aria-hidden="true"
          className="absolute top-[8%] right-[-30%] bottom-[10%] left-[55%] rounded-full bg-[radial-gradient(closest-side,rgb(53_194_109/0.22),transparent)] blur-3xl"
        />
        <div className="absolute inset-0 [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,black_90%,transparent),linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          <Image
            src="/juan-cutout.png"
            alt={profile.name}
            fill
            priority
            sizes="(min-width: 768px) 620px, 92vw"
            className="object-contain object-bottom [filter:brightness(1.04)_contrast(1.06)_saturate(0.94)]"
          />
          {/* Right-side light (key wrap + thin rim), faded out before the flat crop at the bottom */}
          <div aria-hidden="true" className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent_82%)]">
            <div className="hero-silhouette absolute inset-0 bg-[linear-gradient(to_left,rgb(53_194_109/0.28),transparent_45%)] mix-blend-screen" />
            <div className="hero-rim absolute inset-0 bg-[linear-gradient(to_left,rgb(140_240_175/0.75),rgb(53_194_109/0.35)_45%,transparent_75%)] opacity-90 mix-blend-screen blur-[2px]" />
          </div>
        </div>
      </motion.div>

      <div
        key={lang}
        className="absolute inset-x-5 top-[88px] z-20 max-w-[34rem] md:inset-x-[max(32px,calc((100%-1280px)/2+32px))] lg:right-auto lg:left-[max(72px,calc((100%-1280px)/2+72px))] lg:top-auto lg:bottom-[var(--hero-base)] lg:w-[min(40vw,34rem)]"
      >
        <motion.p {...fadeUp(0)} className="eyebrow text-primary">
          {t.hero.hello}
        </motion.p>

        <motion.p
          {...fadeUp(0.05)}
          className="mt-3 font-display text-[clamp(2.4rem,4.6vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.035em]"
        >
          <ScrambleText text={t.hero.titleA} delay={0.2} />
          <br />
          <ScrambleText text={t.hero.titleB} delay={0.45} className="text-primary" />
        </motion.p>

        <motion.p {...fadeUp(0.15)} className="mt-5 text-[1.0625rem] leading-relaxed text-foreground/80 md:text-lg">
          {t.hero.lead}
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#work"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-medium whitespace-nowrap text-primary-foreground transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-px"
          >
            {t.hero.ctaWork}
            <ArrowDown className="size-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-black/40 px-7 text-sm font-medium whitespace-nowrap text-foreground backdrop-blur-sm transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:text-primary active:translate-y-px"
          >
            {t.hero.ctaContact}
          </a>
        </motion.div>
      </div>

      <motion.h1
        id="hero-title"
        aria-label={`${profile.name} — ${t.hero.role}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className="absolute inset-x-0 bottom-[var(--name-bottom)] z-0 overflow-hidden font-display text-[length:var(--name-size)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap text-foreground"
      >
        <span aria-hidden="true" className="marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="pr-[0.35em]">
              {name}
            </span>
          ))}
        </span>
      </motion.h1>

      <a
        href="#about"
        className="absolute bottom-[3%] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <span aria-hidden="true" className="flex h-8 w-5 justify-center rounded-full border-[1.5px] border-current pt-1.5">
          <span className="scroll-wheel h-1.5 w-0.5 rounded-full bg-current" />
        </span>
        <span className="eyebrow whitespace-nowrap">{t.hero.scroll}</span>
      </a>
    </section>
  );
}
