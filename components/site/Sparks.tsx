"use client";

import type { ReactNode } from "react";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { useTheme } from "./ThemeProvider";

export function Sparks({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <ClickSpark sparkColor={theme === "dark" ? "#3ddc97" : "#0a9a5f"} sparkSize={10} sparkRadius={18} sparkCount={8} duration={420}>
      {children}
    </ClickSpark>
  );
}
