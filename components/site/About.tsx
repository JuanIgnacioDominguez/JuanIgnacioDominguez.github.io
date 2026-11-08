"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoLoop, { type LogoItem } from "@/components/reactbits/LogoLoop";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import CountUp from "@/components/reactbits/CountUp";
import { life } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { ALL_TOOLS } from "./tools";

const LOGOS: LogoItem[] = ALL_TOOLS.map((tool) => ({
  node: <tool.icon />,
  title: tool.name,
  ariaLabel: tool.name,
  hoverColor: tool.color,
}));

/** Apple-style horizontal card gallery: scroll-snap track with round paddle buttons. */
function LifeGallery(): ReactNode {
  const { lang } = useLang();
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = track.querySelectorAll("li");
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.target === first) setAtStart(e.intersectionRatio > 0.95);
          if (e.target === last) setAtEnd(e.intersectionRatio > 0.95);
        }),
      { root: track, threshold: [0, 0.95, 1] },
    );
    io.observe(first);
    io.observe(last);
    return () => io.disconnect();
  }, []);

  const page = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    track.scrollBy({ left: dir * (card.getBoundingClientRect().width + 20), behavior: "smooth" });
  };

  const paddle =
    "grid size-11 place-items-center rounded-full bg-[var(--paddle)] text-foreground/70 transition-[background-color,opacity] duration-300 hover:bg-[var(--paddle-hover)] disabled:pointer-events-none disabled:opacity-35";

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        aria-label={lang === "es" ? "Galería" : "Gallery"}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scroll-padding-inline:var(--gutter)] [padding-inline:var(--gutter)] [--gutter:20px] md:[--gutter:max(32px,calc((100vw-1080px)/2+20px))]"
      >
        {life.map((item, i) => (
          <li key={item.image} className="shrink-0 snap-start">
            <Reveal delay={0.06 * i} y={40}>
              <figure className="group relative h-[500px] w-[300px] overflow-hidden rounded-[28px] bg-muted md:h-[620px] md:w-[400px]">
                <Image
                  src={item.image}
                  alt={item.title[lang]}
                  fill
                  sizes="(min-width: 768px) 400px, 300px"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/60 to-transparent" />
                <figcaption className="absolute inset-x-0 top-0 p-7 text-[21px] leading-[1.2] font-semibold tracking-[-0.01em] text-white md:p-8 md:text-[24px]">
                  {item.title[lang]} <span className="text-white/75">{item.body[lang]}</span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 flex max-w-[1080px] justify-end gap-3 px-5">
        <button type="button" onClick={() => page(-1)} disabled={atStart} aria-label={lang === "es" ? "Anterior" : "Previous"} className={paddle}>
          <ChevronLeft className="size-5" strokeWidth={2.2} />
        </button>
        <button type="button" onClick={() => page(1)} disabled={atEnd} aria-label={lang === "es" ? "Siguiente" : "Next"} className={paddle}>
          <ChevronRight className="size-5" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

export function About(): ReactNode {
  const { t, lang } = useLang();

  return (
    <>
      <div className="border-y border-foreground/[0.06] py-10">
        <p className="mb-7 text-center text-sm font-medium text-muted-foreground">{t.logos}</p>
        <div className="text-faint">
          <LogoLoop
            logos={LOGOS}
            speed={40}
            logoHeight={30}
            gap={56}
            fadeOut
            fadeOutColor="var(--background)"
            scaleOnHover
            pauseOnHover
            ariaLabel={t.logos}
          />
        </div>
      </div>

      <section id="about" className="scroll-mt-20 py-28 md:py-40">
        <div className="mx-auto max-w-[1080px] px-5">
          <Reveal>
            <h2 className="text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">{t.about.title}</h2>
          </Reveal>
          <ScrollReveal
            key={lang}
            baseOpacity={0.18}
            enableBlur
            blurStrength={4}
            baseRotation={0}
            containerClassName="mt-6 max-w-[860px]"
            textClassName="text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-[1.3] tracking-[-0.015em] text-subtle"
          >
            {t.about.statement}
          </ScrollReveal>
        </div>

        <div className="mt-16 md:mt-20">
          <LifeGallery />
        </div>

        <div className="mx-auto mt-20 grid max-w-[1080px] gap-10 px-5 sm:grid-cols-3 sm:gap-0 md:mt-28">
          {t.about.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={0.08 * i}
              className="flex flex-col gap-2 sm:border-l sm:border-foreground/10 sm:px-8 sm:first:border-l-0 sm:first:pl-0"
            >
              <span className="text-[clamp(3.5rem,6vw,5rem)] leading-none font-semibold tracking-[-0.04em]">
                <CountUp to={s.value} duration={1.6} />
                <span className="text-primary">{s.suffix}</span>
              </span>
              <span className="max-w-[16rem] text-[17px] leading-snug text-subtle">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
