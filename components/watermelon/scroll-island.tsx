"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ChevronUp } from "lucide-react";
import useMeasure from "react-use-measure";

// Watermelon UI scroll-island, adapted to track window scroll and page sections
// and anchored to the bottom of the viewport.

export interface Topic {
  id: string;
  title: string;
}

export interface ScrollIslandProps {
  topics: Topic[];
  label: string;
}

export function ScrollIsland({ topics, label }: ScrollIslandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState<string>(topics[0]?.id ?? "");
  const [visible, setVisible] = useState(false);
  const [ref, bounds] = useMeasure({ offsetSize: true });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
      setVisible(window.scrollY > window.innerHeight * 0.6);

      const mid = window.innerHeight * 0.4;
      let active = topics[0]?.id ?? "";
      for (const t of topics) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= mid) active = t.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [topics]);

  const currentTitle = topics.find((t) => t.id === current)?.title ?? label;

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[39] bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
          >
            <motion.div
              className="pointer-events-auto flex flex-col overflow-hidden border border-white/10 bg-card/90 shadow-2xl shadow-black/50 backdrop-blur-xl"
              initial={{ borderRadius: 32 }}
              animate={{
                height: bounds.height > 0 ? bounds.height : "auto",
                width: isOpen ? 300 : 236,
                borderRadius: isOpen ? 24 : 32,
              }}
            >
              <div ref={ref} className="flex w-full flex-col px-3">
                <AnimatePresence mode="popLayout">
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full pt-3 pb-1"
                    >
                      {topics.map((topic, i) => (
                        <button
                          key={topic.id}
                          onClick={() => {
                            document.getElementById(topic.id)?.scrollIntoView({ behavior: "smooth" });
                            setIsOpen(false);
                          }}
                          className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                            current === topic.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <span className="font-mono text-[11px] opacity-60">0{i + 1}</span>
                          {topic.title}
                        </button>
                      ))}
                      <div className="mx-2 mt-2 h-px bg-white/5" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  className="group flex h-12 w-full cursor-pointer items-center justify-between gap-4 select-none"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-expanded={isOpen}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <motion.div
                      layout
                      className="relative size-7 shrink-0 rounded-full"
                      style={{ background: `conic-gradient(#35c26d ${progress}%, #2a2c30 0)` }}
                    >
                      <div className="absolute inset-[3px] rounded-full bg-card" />
                    </motion.div>
                    <motion.span layout className="truncate text-sm font-semibold text-foreground">
                      {currentTitle}
                    </motion.span>
                    <motion.div layout animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronUp size={16} className="text-muted-foreground group-hover:text-foreground" />
                    </motion.div>
                  </div>
                  <motion.div
                    layout
                    className="rounded-full bg-accent px-2 py-0.5 font-mono text-xs font-bold text-accent-foreground tabular-nums"
                  >
                    {Math.round(progress)}%
                  </motion.div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
