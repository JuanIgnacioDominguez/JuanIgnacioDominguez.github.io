import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  /** Kept for screen readers; Apple-style headings show only the title. */
  label: string;
  title: string;
  lead?: string;
  center?: boolean;
  action?: ReactNode;
}

export function SectionHeading({ label, title, lead, center = false, action }: SectionHeadingProps): ReactNode {
  return (
    <Reveal
      className={`mb-12 flex flex-col gap-6 md:mb-16 ${
        center ? "items-center text-center" : action ? "md:flex-row md:items-end md:justify-between" : ""
      }`}
    >
      <div className={`flex flex-col gap-4 ${center ? "items-center" : ""}`}>
        <h2 aria-label={`${label}: ${title}`} className="max-w-3xl text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          {title}
        </h2>
        {lead && <p className="max-w-xl text-[19px] leading-relaxed text-subtle md:text-[21px]">{lead}</p>}
      </div>
      {action}
    </Reveal>
  );
}
