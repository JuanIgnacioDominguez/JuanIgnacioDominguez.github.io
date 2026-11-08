"use client";

import type { PointerEvent, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { TOOL_GROUPS, type GroupKey } from "./tools";

// Bento: frontend is the hero tile; 5 groups → 5 cells
const LAYOUT: { key: GroupKey; span: string; big?: boolean }[] = [
  { key: "frontend", span: "md:col-span-2 md:row-span-2", big: true },
  { key: "backend", span: "md:col-span-2" },
  { key: "data", span: "" },
  { key: "ai", span: "" },
  { key: "tools", span: "md:col-span-4" },
];

/** Moves the specular highlight with the pointer, without React re-renders. */
function trackLight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
  e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
}

export function Stack(): ReactNode {
  const { t } = useLang();

  return (
    <section id="stack" className="mx-auto max-w-[1180px] scroll-mt-20 px-3 pb-28 sm:px-5 md:pb-40">
      <Reveal className="mx-auto mb-12 max-w-[1080px] px-2 md:mb-16">
        <h2 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          {t.stack.title}
        </h2>
      </Reveal>

      {/* Wallpaper behind the glass: slow-moving color fields give the blur something to refract */}
      <Reveal y={40} className="glass-wallpaper relative isolate overflow-hidden rounded-[36px] p-3 sm:p-4 md:rounded-[44px] md:p-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <span className="glass-blob absolute -top-[20%] -left-[10%] size-[60%] rounded-full bg-[var(--wall-1)] blur-[90px]" />
          <span className="glass-blob glass-blob--b absolute top-[30%] -right-[15%] size-[55%] rounded-full bg-[var(--wall-2)] blur-[100px]" />
          <span className="glass-blob glass-blob--c absolute -bottom-[25%] left-[25%] size-[50%] rounded-full bg-[var(--wall-3)] blur-[90px]" />
        </div>

        <div className="grid gap-3 md:grid-cols-4 md:gap-4">
          {LAYOUT.map(({ key, span, big }, i) => {
            const group = t.stack.groups[key];
            const tools = TOOL_GROUPS[key];
            return (
              <Reveal key={key} delay={0.06 * i} className={span}>
                <article
                  onPointerMove={trackLight}
                  className={`liquid-glass group flex h-full flex-col gap-8 rounded-[28px] p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:rounded-[32px] md:p-8 ${
                    big ? "md:min-h-[400px]" : ""
                  } ${key === "tools" ? "md:flex-row md:items-center md:justify-between" : ""}`}
                >
                  <div className="flex flex-col gap-2">
                    <h3 className={`font-semibold tracking-[-0.02em] ${big ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-2xl"}`}>
                      {group.title}
                    </h3>
                    <p className="max-w-sm text-[15px] leading-relaxed text-foreground/65">{group.body}</p>
                  </div>

                  <ul className={`flex flex-wrap ${big ? "mt-auto gap-3" : key === "tools" ? "gap-2.5" : "mt-auto gap-2.5"}`}>
                    {tools.map((tool) => (
                      <li key={tool.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              aria-label={tool.name}
                              className={`glass-chip grid place-items-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:scale-105 ${
                                big ? "size-16 rounded-[20px]" : "size-12 rounded-2xl"
                              }`}
                            >
                              <tool.icon className={big ? "size-8" : "size-6"} style={{ color: tool.color }} />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>{tool.name}</TooltipContent>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
