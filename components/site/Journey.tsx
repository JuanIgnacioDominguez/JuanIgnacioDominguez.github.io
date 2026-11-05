"use client";

import CircularGallery from "@/components/reactbits/CircularGallery";
import { education, life } from "@/lib/content";
import { useLang } from "./LangProvider";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Journey() {
  const { t, lang } = useLang();

  return (
    <>
      <section id="journey" className="mx-auto max-w-[1080px] scroll-mt-20 px-5 pb-28 md:pb-40">
        <SectionHeading label={t.journey.label} title={t.journey.title} />

        <div className="border-t border-white/10">
          {education.map((item, i) => (
            <Reveal key={item.place} delay={0.06 * i}>
              <div className="group grid gap-2 border-b border-white/10 py-9 md:grid-cols-[200px_1fr_1fr] md:gap-10">
                <span className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary">
                  {item.period[lang]}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{item.title[lang]}</h3>
                  <p className="mt-1 text-[#a1a1a6]">{item.place}</p>
                </div>
                <p className="text-[15px] leading-relaxed text-[#a1a1a6] md:pt-1.5">{item.detail[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-28 md:pb-40">
        <div className="mx-auto max-w-[1080px] px-5">
          <SectionHeading label={t.life.label} title={t.life.title} lead={t.life.lead} center />
        </div>
        <div className="h-[380px] md:h-[520px]">
          <CircularGallery items={life} bend={2} textColor="#f5f5f7" borderRadius={0.06} scrollEase={0.05} />
        </div>
      </section>
    </>
  );
}
