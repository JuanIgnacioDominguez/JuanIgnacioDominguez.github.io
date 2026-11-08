"use client";

// Adapted from React Bits — StaggeredMenu (https://reactbits.dev)
import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

export interface StaggeredMenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  active?: boolean;
}

export interface StaggeredMenuSocial {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface StaggeredMenuProps {
  open: boolean;
  onClose: () => void;
  items: StaggeredMenuItem[];
  socials?: StaggeredMenuSocial[];
  socialsTitle?: string;
  footer?: ReactNode;
  /** Colors of the layers that sweep in before the panel. */
  colors?: string[];
  displayItemNumbering?: boolean;
  className?: string;
}

export function StaggeredMenu({
  open,
  onClose,
  items,
  socials = [],
  socialsTitle = "Socials",
  footer,
  colors = ["var(--accent)", "var(--primary)"],
  displayItemNumbering = true,
  className = "",
}: StaggeredMenuProps): ReactNode {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([panelRef.current, ...layersRef.current], { xPercent: 100 });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const playOpen = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    closeTweenRef.current?.kill();
    tlRef.current?.kill();

    const labels = panel.querySelectorAll<HTMLElement>(".sm-item-label");
    const numbers = panel.querySelectorAll<HTMLElement>(".sm-item-num");
    const footerEls = panel.querySelectorAll<HTMLElement>(".sm-fade");

    gsap.set(labels, { yPercent: 140, rotate: 10 });
    gsap.set(numbers, { opacity: 0 });
    gsap.set(footerEls, { y: 20, opacity: 0 });

    const tl = gsap.timeline();
    layersRef.current.forEach((layer, i) => {
      tl.fromTo(layer, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });
    const panelAt = (layersRef.current.length - 1) * 0.07 + 0.08;
    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.65, ease: "power4.out" }, panelAt);
    tl.to(labels, { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: 0.08 }, panelAt + 0.15);
    tl.to(numbers, { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 }, panelAt + 0.3);
    tl.to(footerEls, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", stagger: 0.06 }, panelAt + 0.4);
    tlRef.current = tl;
  }, []);

  const playClose = useCallback(() => {
    tlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([panelRef.current, ...[...layersRef.current].reverse()], {
      xPercent: 100,
      duration: 0.32,
      ease: "power3.in",
      stagger: 0.03,
      overwrite: "auto",
    });
  }, []);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      if (!open) return;
    }
    if (open) playOpen();
    else playClose();
  }, [open, playOpen, playClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={wrapperRef}
      data-open={open || undefined}
      aria-hidden={!open}
      inert={!open}
      className={`pointer-events-none fixed inset-0 z-40 overflow-hidden ${className}`}
      style={{
        visibility: open ? "visible" : "hidden",
        transition: open ? "none" : "visibility 0s linear 0.45s",
      }}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {colors.map((c, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) layersRef.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ background: c }}
          />
        ))}
      </div>

      <aside
        ref={panelRef}
        id="staggered-menu-panel"
        aria-label="Menu"
        className="pointer-events-auto absolute inset-0 flex flex-col overflow-y-auto bg-background px-6 pt-[calc(env(safe-area-inset-top)+7rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)] sm:px-10"
      >
        <ul className="flex flex-col gap-[clamp(0.5rem,2.2svh,1.25rem)]">
          {items.map((item, i) => (
            <li key={item.href} className="relative overflow-hidden leading-none">
              <a
                href={item.href}
                aria-label={item.ariaLabel ?? item.label}
                aria-current={item.active ? "location" : undefined}
                onClick={onClose}
                className={`relative inline-block pr-8 font-display text-[clamp(2.25rem,10vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.04em] uppercase transition-colors duration-200 hover:text-primary ${
                  item.active ? "text-primary" : "text-foreground"
                }`}
              >
                <span className="sm-item-label inline-block origin-[50%_100%] will-change-transform">{item.label}</span>
                {displayItemNumbering && (
                  <span className="sm-item-num absolute top-[0.35em] right-0 font-mono text-xs font-medium tracking-normal text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-7 pt-10">
          {footer && <div className="sm-fade">{footer}</div>}
          {socials.length > 0 && (
            <div className="sm-fade flex flex-col gap-2.5">
              <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">{socialsTitle}</p>
              <ul className="group/s flex flex-wrap items-center gap-x-5 gap-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 py-0.5 text-[17px] font-medium text-foreground transition-[color,opacity] duration-300 group-hover/s:opacity-40 hover:text-primary hover:opacity-100!"
                    >
                      {s.icon}
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default StaggeredMenu;
