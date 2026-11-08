"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { profile } from "@/lib/content";
import { useLang } from "./LangProvider";
import { useTheme } from "./ThemeProvider";

const GhostFibers = dynamic(() => import("@/components/reactbits/GhostFibers"), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;

/** A line of text that slides up from behind a mask. */
function MaskLine({ children, delay, className = "" }: { children: ReactNode; delay: number; className?: string }): ReactNode {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        exit={{ y: "110%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Primary CTA that leans toward the cursor. */
function MagneticLink({ href, children }: { href: string; children: ReactNode }): ReactNode {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-foreground pr-5 pl-6 text-[15px] font-medium text-background active:scale-[0.98]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
      />
      <span className="relative transition-colors duration-500 group-hover:text-primary-foreground">{children}</span>
      <ArrowRight className="relative size-4 transition-[transform,color] duration-500 group-hover:translate-x-0.5 group-hover:text-primary-foreground" />
    </motion.a>
  );
}

export function Hero(): ReactNode {
  const { t, lang } = useLang();
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll: copy drifts up and fades, portrait moves slower (parallax)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-background pt-24 pb-16"
    >
      {/* React Bits: Ghost Fibers, tinted with the site accent */}
      <div aria-hidden="true" className="absolute inset-0">
        <GhostFibers
          glowColor={theme === "dark" ? "#3ddc97" : "#0a9a5f"}
          secondaryColor={theme === "dark" ? "#a7f3d0" : "#34d399"}
          lightMode={theme === "light"}
          speed={0.35}
          threads={64}
          glow={theme === "dark" ? 0.7 : 0.5}
          brightness={theme === "dark" ? 0.9 : 1}
          vignette={0.45}
          grain={0.04}
          hoverEffect="part"
          pulseOnClick={false}
          paused={!!reduce}
        />
        {/* Keeps the copy legible over the fibers */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_srgb,var(--background)_70%,transparent)_45%,transparent_75%)] max-lg:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_75%,transparent),color-mix(in_srgb,var(--background)_40%,transparent))]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div
        key={lang}
        className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10"
      >
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="lg:col-span-7">
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="text-[15px] font-medium text-muted-foreground"
          >
            {profile.name}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4.1rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance"
          >
            <MaskLine delay={0.15}>{t.hero.titleA}</MaskLine>
            <MaskLine delay={0.27} className="text-primary">
              {t.hero.titleB}
            </MaskLine>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-7 max-w-[30rem] text-[17px] leading-relaxed text-subtle"
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
          >
            <MagneticLink href="#work">{t.hero.ctaWork}</MagneticLink>
            <a
              href="#contact"
              className="group relative text-[15px] font-medium text-foreground"
            >
              {t.hero.ctaContact}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-foreground/30 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:bg-foreground"
              />
            </a>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5">
          <motion.div
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 20px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 20px)" }}
            exit={{ clipPath: "inset(100% 0% 0% 0% round 20px)" }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ y: photoY }}
            className="group relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[20px] bg-muted lg:ml-auto"
          >
            <motion.div
              initial={reduce ? false : { scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, delay: 0.2, ease: EASE }}
              className="absolute inset-0"
            >
              <motion.div style={{ scale: photoScale }} className="absolute inset-0">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-[50%_30%] saturate-[0.9] contrast-[1.04] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
