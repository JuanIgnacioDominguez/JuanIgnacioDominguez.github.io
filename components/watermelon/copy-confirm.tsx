"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";

// Watermelon UI copy-confirm, reduced to the pill + animated copy button and themed.

interface CopyConfirmProps {
  title: string;
  icon?: ReactNode;
  valueToCopy: string;
  copiedText?: string;
  copyText?: string;
}

export function CopyButton({
  valueToCopy,
  copiedText = "Copied",
  copyText = "Copy",
}: Pick<CopyConfirmProps, "valueToCopy" | "copiedText" | "copyText">) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(valueToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
            onClick={handleCopy}
      className={`relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full border border-foreground/10 px-4 py-2.5 transition-colors duration-300 ${
        copied ? "bg-primary text-primary-foreground" : "bg-foreground/[0.04] text-primary"
      }`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
        >
          {copied ? <CheckIcon className="size-4 stroke-2" /> : <CopyIcon className="size-4 stroke-2" />}
        </motion.div>
      </AnimatePresence>
      <AnimatedText from={copyText} to={copiedText} isCopied={copied} />
    </motion.button>
  );
}

export default function CopyConfirm({ title, icon, valueToCopy, copiedText, copyText }: CopyConfirmProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${valueToCopy}`}
        className="flex min-w-0 items-center gap-2 rounded-full border border-foreground/10 bg-background/50 px-4 py-2.5 transition-colors hover:border-primary/60"
      >
        {icon && <span className="text-primary">{icon}</span>}
        <span className="truncate text-sm font-semibold text-foreground">{title}</span>
      </a>
      <CopyButton valueToCopy={valueToCopy} copiedText={copiedText} copyText={copyText} />
    </div>
  );
}

const AnimatedText = ({ from, to, isCopied }: { from: string; to: string; isCopied: boolean }) => {
  const activeText = isCopied ? to : from;

  return (
    <div className="flex text-sm font-medium tracking-tight will-change-transform">
      <AnimatePresence mode="popLayout" initial={false}>
        {activeText.split("").map((char, index) => (
          <motion.span
            key={char + index}
            layout
            initial={{ opacity: 0, y: 5, scale: 0.7 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.03 * index },
            }}
            exit={{ opacity: 0, y: -5, scale: 0.7 }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
