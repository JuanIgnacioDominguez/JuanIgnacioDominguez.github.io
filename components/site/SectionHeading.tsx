import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  lead?: string;
  center?: boolean;
  action?: ReactNode;
}

export function SectionHeading({ label, title, lead, center = false, action }: SectionHeadingProps) {
  const cut = title.lastIndexOf(" ");
  const head = cut > 0 ? title.slice(0, cut) : "";
  const tail = cut > 0 ? title.slice(cut + 1) : title;
  return (
    <Reveal
      className={`mb-12 flex flex-col gap-4 md:mb-16 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={`flex flex-col gap-3 ${center ? "items-center" : ""}`}>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#a1a1a6]">
          <span className="size-1 rounded-full bg-primary" />
          {label}
        </span>
        <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-[4.2rem]">
          {head && <span className="text-headline">{head} </span>}
          <span className="font-accent text-[1.12em] text-primary">{tail}</span>
        </h2>
        {lead && <p className="max-w-xl text-lg text-muted-foreground md:text-xl">{lead}</p>}
      </div>
      {action}
    </Reveal>
  );
}
