"use client";

import { ScrollIsland } from "@/components/watermelon/scroll-island";
import { useLang } from "./LangProvider";

export function Island() {
  const { t } = useLang();
  const topics = [
    { id: "top", title: t.island.top },
    { id: "about", title: t.nav.about },
    { id: "stack", title: t.nav.stack },
    { id: "work", title: t.nav.work },
    { id: "journey", title: t.nav.journey },
    { id: "contact", title: t.nav.contact },
  ];
  return <ScrollIsland topics={topics} label={t.island.index} />;
}
