"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GoldDivider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.span
        className="gold-line flex-1"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        className="size-5 shrink-0 text-[#c4854a]"
        fill="currentColor"
        initial={reduce ? false : { rotate: 0, scale: 0 }}
        whileInView={{ rotate: 45, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <rect x="6" y="6" width="12" height="12" />
      </motion.svg>
      <motion.span
        className="gold-line flex-1"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ originX: 1 }}
      />
    </div>
  );
}
