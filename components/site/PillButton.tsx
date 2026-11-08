import type { ComponentType, ReactNode } from "react";

interface PillButtonProps {
  href: string;
  children: ReactNode;
  icon: ComponentType<{ className?: string }>;
  variant?: "primary" | "ghost";
  download?: boolean;
  external?: boolean;
  className?: string;
}

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

export function PillButton({
  href,
  children,
  icon: Icon,
  variant = "primary",
  download,
  external,
  className = "",
}: PillButtonProps) {
  const primary = variant === "primary";
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-6 text-[15px] font-medium transition-all duration-500 active:scale-[0.98] ${EASE} ${
        primary
          ? "bg-primary text-primary-foreground shadow-[0_10px_40px_-12px_color-mix(in_srgb,var(--primary)_70%,transparent)] hover:shadow-[0_14px_50px_-10px_color-mix(in_srgb,var(--primary)_80%,transparent)]"
          : "border border-foreground/10 bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]"
      } ${className}`}
    >
      {children}
      <span
        className={`grid size-9 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105 ${EASE} ${
          primary ? "bg-black/15" : "bg-foreground/10"
        }`}
      >
        <Icon className="size-4" />
      </span>
    </a>
  );
}
