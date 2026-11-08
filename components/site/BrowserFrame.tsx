import type { ReactNode } from "react";
import { Lock } from "lucide-react";

interface BrowserFrameProps {
  url: string;
  children: ReactNode;
  className?: string;
}

export function BrowserFrame({ url, children, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border border-foreground/10 bg-card shadow-[0_40px_120px_-30px_var(--shadow-strong)] md:rounded-[18px] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-foreground/5 bg-secondary px-3 py-2 md:px-4 md:py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57] md:size-3" />
          <span className="size-2.5 rounded-full bg-[#febc2e] md:size-3" />
          <span className="size-2.5 rounded-full bg-[#28c840] md:size-3" />
        </div>
        <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 rounded-md bg-foreground/5 px-3 py-1 font-mono text-[10px] text-muted-foreground md:text-xs">
          <Lock className="size-3" /> {url}
        </div>
        <div className="w-10 md:w-12" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
