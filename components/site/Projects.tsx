"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Expand, Images } from "lucide-react";
import { SiGithub } from "react-icons/si";
import ScrollStack, { ScrollStackItem } from "@/components/reactbits/ScrollStack";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { profile, projects, type Project } from "@/lib/content";
import { BrowserFrame } from "./BrowserFrame";
import { useLang } from "./LangProvider";
import { SectionHeading } from "./SectionHeading";

function Screens({ project, onOpen }: { project: Project; onOpen: (index: number) => void }) {
  const [index, setIndex] = useState(0);

  const image = (
    <div className={`relative ${project.fit === "cover" ? "aspect-[2/1]" : "aspect-[1350/942] bg-[#f3efe6]"}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={project.images[index]}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <Image
            src={project.images[index]}
            alt={`${project.title} ${index + 1}`}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={() => onOpen(index)}
        className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-black/70 text-white backdrop-blur transition-transform hover:scale-110"
        aria-label={project.title}
      >
        <Expand className="size-4" />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {project.fit === "cover" ? (
        <BrowserFrame url={`${project.slug}-store.app`}>{image}</BrowserFrame>
      ) : (
        <div className="overflow-hidden rounded-[18px] border border-foreground/10 shadow-[0_30px_80px_-30px_var(--shadow-strong)]">
          {image}
        </div>
      )}
      <div className="flex justify-center gap-2">
        {project.images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            aria-label={`${project.title} ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-7 bg-primary" : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<{ project: Project; index: number } | null>(null);

  return (
    <section id="work" className="scroll-mt-20 pb-16">
      <div className="mx-auto max-w-[1080px] px-5">
        <SectionHeading label={t.work.label} title={t.work.title} lead={t.work.lead} center />
      </div>

      <ScrollStack
        useWindowScroll
        smoothScroll={false}
        itemDistance={120}
        itemStackDistance={28}
        stackPosition="14%"
        baseScale={0.9}
        itemScale={0.03}
        dimAmount={0.35}
        blurAmount={0}
        className="mx-auto max-w-[1180px]"
      >
        {[
          ...projects.map((project, i) => (
            <ScrollStackItem
              key={project.slug}
              itemClassName="h-auto overflow-hidden border border-foreground/10 p-0! [background:linear-gradient(160deg,var(--tile-from),var(--tile-to))]!"
            >
              <div className="pointer-events-none absolute -top-32 -right-32 size-80 rounded-full bg-primary/15 blur-[90px]" />
              <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-12">
                <div className="flex flex-col items-start gap-5">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="text-primary">0{i + 1}</span>
                    <span className="h-px w-8 bg-foreground/20" />
                    {project.kind[lang]} · {project.year}
                  </div>
                  <h3 className="text-5xl font-semibold tracking-[-0.05em] md:text-6xl">{project.title}</h3>
                  <p className="font-accent -mt-2 text-3xl text-soft md:text-4xl">{project.tagline[lang]}</p>
                  <p className="text-[15px] leading-relaxed text-subtle">{project.summary[lang]}</p>
                  <ul className="flex flex-col gap-2">
                    {project.highlights.map((h) => (
                      <li key={h.es} className="flex items-center gap-2.5 text-sm text-soft">
                        <Check className="size-4 shrink-0 text-primary" strokeWidth={2.5} />
                        {h[lang]}
                      </li>
                    ))}
                  </ul>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-2.5 py-1 font-mono text-[11px] text-subtle"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setOpen({ project, index: 0 })}
                      className="group inline-flex items-center gap-2 rounded-full bg-primary py-1 pr-1 pl-4 text-sm font-medium text-primary-foreground active:scale-[0.98]"
                    >
                      {t.work.gallery}
                      <span className="grid size-8 place-items-center rounded-full bg-black/15 transition-transform duration-500 group-hover:scale-105">
                        <Images className="size-4" />
                      </span>
                    </button>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.04] py-1 pr-1 pl-4 text-sm font-medium transition-colors hover:bg-foreground/[0.08]"
                      >
                        <SiGithub className="size-4" /> {link.label}
                        <span className="grid size-8 place-items-center rounded-full bg-foreground/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                <Screens project={project} onOpen={(index) => setOpen({ project, index })} />
              </div>
            </ScrollStackItem>
          )),
          <ScrollStackItem
            key="next"
            itemClassName="h-auto border border-foreground/10 p-0! [background:linear-gradient(160deg,var(--accent),var(--tile-to))]!"
          >
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 px-6 py-16 text-center md:py-20"
            >
              <SiGithub className="size-10" />
              <h3 className="text-3xl font-semibold tracking-tight md:text-5xl">{t.work.soonTitle}</h3>
              <p className="max-w-md text-subtle">{t.work.soonBody}</p>
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary py-1 pr-1 pl-5 text-sm font-medium text-primary-foreground">
                {t.work.github}
                <span className="grid size-8 place-items-center rounded-full bg-black/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </a>
          </ScrollStackItem>,
        ]}
      </ScrollStack>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-[calc(100%-2rem)] gap-5 rounded-3xl border-foreground/10 bg-card p-4 sm:max-w-5xl md:p-6">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold tracking-tight">{open.project.title}</DialogTitle>
                <DialogDescription>{open.project.kind[lang]}</DialogDescription>
              </DialogHeader>
              <Carousel opts={{ loop: true, startIndex: open.index }} className="w-full">
                <CarouselContent>
                  {open.project.images.map((src, idx) => (
                    <CarouselItem key={src}>
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-black">
                        <Image
                          src={src}
                          alt={`${open.project.title} ${idx + 1}`}
                          fill
                          sizes="(min-width: 1024px) 960px, 100vw"
                          className="object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 border-foreground/10 bg-black/70" />
                <CarouselNext className="right-3 border-foreground/10 bg-black/70" />
              </Carousel>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
