"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { dict, type Dict, type Lang } from "@/lib/content";

interface LangContextValue {
  lang: Lang;
  t: Dict;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);
const listeners = new Set<() => void>();
// In-memory fallback for browsers where storage is blocked
let memoryLang: Lang = "es";

function readLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") return saved;
  } catch {}
  return memoryLang;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => "es" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    memoryLang = readLang() === "es" ? "en" : "es";
    try {
      localStorage.setItem("lang", memoryLang);
    } catch {}
    listeners.forEach((l) => l());
  }, []);

  return <LangContext.Provider value={{ lang, t: dict[lang], toggle }}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
