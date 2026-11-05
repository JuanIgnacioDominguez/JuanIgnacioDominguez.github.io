"use client";

import type { ReactNode } from "react";
import ClickSpark from "@/components/reactbits/ClickSpark";

export function Sparks({ children }: { children: ReactNode }) {
  return (
    <ClickSpark sparkColor="#35c26d" sparkSize={10} sparkRadius={18} sparkCount={8} duration={420}>
      {children}
    </ClickSpark>
  );
}
