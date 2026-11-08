"use client";

import { education } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Journey() {
  const { t, lang } = useLang();

  return (
    <section
      id="journey"
      className="mx-auto max-w-[1080px] scroll-mt-20 px-5 pb-28 md:pb-40"
    >
      <SectionHeading label={t.journey.label} title={t.journey.title} />

      <div className="border-t border-foreground/10">
        {education.map((item, i) => (
          <Reveal key={item.place} delay={0.06 * i}>
            <div className="group grid gap-2 border-b border-foreground/10 py-9 md:grid-cols-[200px_1fr_1fr] md:gap-10">
              <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary">
                {item.period[lang]}
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {item.title[lang]}
                </h3>
                <p className="mt-1 text-subtle">{item.place}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-subtle md:pt-1.5">
                {item.detail[lang]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
