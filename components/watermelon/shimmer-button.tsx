import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 font-semibold",
        "bg-primary text-primary-foreground glow-primary",
        "transition-all duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <div
        className={cn(
          "absolute inset-0 -translate-x-full",
          "bg-linear-to-r from-transparent via-white/30 to-transparent",
          "transition-transform duration-700 group-hover:translate-x-full",
        )}
      />
    </button>
  );
}
