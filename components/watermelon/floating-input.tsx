"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

// Watermelon UI floating-input, themed for the portfolio + a textarea variant.

const fieldClass =
  "peer w-full rounded-xl border border-input bg-background/40 px-4 pt-5 pb-2.5 text-foreground outline-none transition-colors focus:border-primary focus:bg-background/60";

const labelClass = (raised: boolean) =>
  cn(
    "pointer-events-none absolute left-4 top-3.5 text-muted-foreground transition-all duration-200",
    "peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-primary",
    raised && "top-1.5 text-[11px] font-medium",
  );

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FloatingInput({ label, className, id, name, ...props }: FloatingInputProps) {
  const [hasValue, setHasValue] = useState(false);
  const fieldId = id ?? name;

  return (
    <div className="relative">
      <input
        id={fieldId}
        name={name}
        className={cn(fieldClass, className)}
        placeholder=" "
        onChange={(e) => setHasValue(e.target.value !== "")}
        {...props}
      />
      <label htmlFor={fieldId} className={labelClass(hasValue)}>
        {label}
      </label>
    </div>
  );
}

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function FloatingTextarea({ label, className, id, name, ...props }: FloatingTextareaProps) {
  const [hasValue, setHasValue] = useState(false);
  const fieldId = id ?? name;

  return (
    <div className="relative">
      <textarea
        id={fieldId}
        name={name}
        className={cn(fieldClass, "resize-none pt-6", className)}
        placeholder=" "
        onChange={(e) => setHasValue(e.target.value !== "")}
        {...props}
      />
      <label htmlFor={fieldId} className={labelClass(hasValue)}>
        {label}
      </label>
    </div>
  );
}
