"use client";

// Adapted from React Bits — PillNav (https://reactbits.dev): hover circle that rises from below each pill
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export interface PillNavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface PillNavProps {
  items: PillNavItem[];
  ariaLabel?: string;
  ease?: string;
  className?: string;
}

export function PillNav({ items, ariaLabel = "Main navigation", ease = "power3.easeOut", className = "" }: PillNavProps): ReactNode {
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweens = useRef<(gsap.core.Tween | null)[]>([]);
  // Re-measure only when labels or the active pill change
  const layoutKey = items.map((it) => `${it.label}:${it.active ? 1 : 0}`).join("|");

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, i) => {
        const pill = circle?.parentElement;
        if (!circle || !pill) return;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hover = pill.querySelector<HTMLElement>(".pill-label-hover");
        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

        tlRefs.current[i]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, duration: 2, ease, overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        if (hover) tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        tlRefs.current[i] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => {});
    return () => window.removeEventListener("resize", layout);
  }, [layoutKey, ease]);

  const enter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweens.current[i]?.kill();
    activeTweens.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const leave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweens.current[i]?.kill();
    activeTweens.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className="flex h-11 items-stretch gap-[3px] rounded-full bg-foreground/[0.06] p-[3px]">
        {items.map((item, i) => (
          <li key={item.href} className="flex">
            <a
              href={item.href}
              aria-current={item.active ? "location" : undefined}
              onMouseEnter={() => enter(i)}
              onMouseLeave={() => leave(i)}
              onFocus={() => enter(i)}
              onBlur={() => leave(i)}
              className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 text-sm leading-none font-medium whitespace-nowrap transition-[background-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                item.active ? "bg-background text-foreground shadow-sm" : "text-foreground/70"
              }`}
            >
              <span
                ref={(el) => {
                  circleRefs.current[i] = el;
                }}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 z-[1] block rounded-full bg-primary will-change-transform"
              />
              <span className="relative z-[2] inline-block leading-none">
                <span className="pill-label relative z-[2] inline-flex items-center gap-1.5 leading-none will-change-transform">
                  {item.active && <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />}
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="pill-label-hover absolute top-0 left-0 z-[3] inline-flex items-center gap-1.5 leading-none text-primary-foreground will-change-transform"
                >
                  {item.active && <span className="size-1.5 rounded-full bg-primary-foreground" />}
                  {item.label}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PillNav;
