"use client";

import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TOOL_GROUPS, type GroupKey } from "./tools";

const LAYOUT: { key: GroupKey; span: string }[] = [
  { key: "frontend", span: "md:col-span-2" },
  { key: "backend", span: "" },
  { key: "data", span: "" },
  { key: "ai", span: "" },
  { key: "tools", span: "" },
];

export function Stack() {
  const { t } = useLang();

  return (
    <section id="stack" className="mx-auto max-w-[1080px] scroll-mt-20 px-5 pb-28 md:pb-40">
      <SectionHeading label={t.stack.label} title={t.stack.title} center />

      <div className="grid gap-4 md:grid-cols-3">
        {LAYOUT.map(({ key, span }, i) => {
          const group = t.stack.groups[key];
          const tools = TOOL_GROUPS[key];
          return (
            <Reveal key={key} delay={0.05 * i} className={span}>
              <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.08)" className="h-full rounded-[28px] p-7 md:p-8">
                <div className="flex h-full flex-col gap-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-2xl font-semibold tracking-tight">{group.title}</h3>
                      <p className="max-w-sm text-[15px] leading-relaxed text-[#a1a1a6]">{group.body}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(tools.length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-auto flex flex-wrap gap-2.5">
                    {tools.map((tool) => (
                      <li key={tool.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className="grid size-12 place-items-center rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                              aria-label={tool.name}
                            >
                              <tool.icon className="size-6" style={{ color: tool.color }} />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>{tool.name}</TooltipContent>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
