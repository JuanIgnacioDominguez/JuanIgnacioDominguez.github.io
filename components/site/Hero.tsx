"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiInstagram } from "react-icons/si";
import LightRays from "@/components/reactbits/LightRays";
import SplitText from "@/components/reactbits/SplitText";
import RotatingText from "@/components/reactbits/RotatingText";
import ShinyText from "@/components/reactbits/ShinyText";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";
import { PillButton } from "./PillButton";

const EASE = [0.32, 0.72, 0, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: EASE },
});

const SOCIALS = [
  { label: "GitHub", href: profile.socials.github, icon: SiGithub },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: FaLinkedin },
  { label: "Instagram", href: profile.socials.instagram, icon: SiInstagram },
];

function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const format = () =>
      setNow(
        new Intl.DateTimeFormat("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
          timeZone: "America/Argentina/Buenos_Aires",
        }).format(new Date()),
      );
    const first = setTimeout(format, 0);
    const id = setInterval(format, 30_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span className="tabular-nums">{now ?? "--:--"}</span>;
}

export function Hero() {
  const { t, lang } = useLang();

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#35c26d"
          raysSpeed={0.8}
          lightSpread={0.9}
          rayLength={1.6}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.05}
          distortion={0.04}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1200px] flex-1 items-center gap-14 px-5 pt-32 pb-10 md:px-10 lg:grid-cols-[1.25fr_1fr] lg:pt-28">
        <div key={lang} className="relative z-10 flex flex-col items-start">
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            <ShinyText text={t.hero.available} color="#a1a1a6" shineColor="#ffffff" speed={3} />
          </motion.span>

          <h1 className="mt-7">
            <SplitText
              text={t.hero.titleA}
              tag="span"
              splitType="chars"
              trigger="load"
              effect="rise"
              mask
              delay={35}
              duration={0.9}
              textAlign="left"
              className="block text-[clamp(3.2rem,7.4vw,6.4rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-foreground"
            />
            <motion.span
              {...rise(0.35)}
              className="font-accent block pb-1 text-[clamp(3.8rem,8.8vw,7.6rem)] leading-[0.95] text-primary"
            >
              {t.hero.titleB}
            </motion.span>
          </h1>

          <motion.div
            {...rise(0.5)}
            className="mt-7 flex flex-wrap items-center gap-2.5 text-xl font-medium text-foreground md:text-2xl"
          >
            <span className="text-[#a1a1a6]">{t.hero.build}</span>
            <RotatingText
              texts={[...t.hero.rotating]}
              rotationInterval={2400}
              staggerDuration={0.02}
              staggerFrom="last"
              mainClassName="overflow-hidden rounded-xl border border-primary/30 bg-primary/10 px-3 py-1 text-primary"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            />
          </motion.div>

          <motion.p {...rise(0.6)} className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-[#a1a1a6]">
            {t.hero.lead}
          </motion.p>

          <motion.div {...rise(0.7)} className="mt-9 flex flex-wrap items-center gap-3">
            <PillButton href="#work" icon={ArrowDown}>
              {t.hero.ctaWork}
            </PillButton>
            <PillButton href="#contact" icon={ArrowUpRight} variant="ghost">
              {t.hero.ctaContact}
            </PillButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.1, ease: EASE }}
          className="pointer-events-none absolute bottom-0 right-[-14%] z-0 h-[42%] w-[110%] opacity-20 sm:right-[-6%] sm:h-[58%] sm:w-[80%] sm:opacity-35 lg:right-[2%] lg:h-[90%] lg:w-[46%] lg:opacity-100"
        >
          <div className="absolute bottom-0 left-1/2 h-[75%] w-[75%] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]" />
          <Image
            src="/juan-cutout.png"
            alt={profile.name}
            fill
            priority
            sizes="(min-width: 1024px) 620px, 100vw"
            className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_62%,transparent_96%)] [filter:contrast(1.06)_saturate(0.9)]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
        className="mx-auto grid w-full max-w-[1200px] grid-cols-2 items-center gap-4 px-5 pt-2 pb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-[#86868b] md:grid-cols-3 md:px-10"
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          {profile.location.split(",")[0]} · <LocalTime /> <span className="hidden sm:inline">GMT-3</span>
        </span>
        <a href="#about" className="hidden items-center justify-center gap-3 hover:text-foreground md:flex">
          <span className="relative h-7 w-[18px] rounded-full border border-white/30">
            <motion.span
              className="absolute left-1/2 top-1.5 h-1.5 w-px -translate-x-1/2 bg-white"
              animate={{ y: [0, 7, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: EASE }}
            />
          </span>
          {t.hero.scroll}
        </a>
        <div className="flex justify-end gap-4">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#86868b] transition-colors hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
