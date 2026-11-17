"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import type { BezierDefinition } from "framer-motion";
import { useRef, useEffect } from "react";

const bezier: BezierDefinition = [0.22, 1, 0.36, 1];

/* ─── FadeIn ─────────────────────────────────────────────────────────── */
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, ease: bezier, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SlideIn ─────────────────────────────────────────────────────────── */
export function SlideIn({
  children,
  className,
  direction = "left",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const map = {
    left:  { x: -60, y: 0 },
    right: { x: 60,  y: 0 },
    up:    { x: 0,   y: -40 },
    down:  { x: 0,   y: 40 },
  };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...map[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.65, ease: bezier, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── ScaleIn ─────────────────────────────────────────────────────────── */
export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerContainer + StaggerItem ────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: bezier as BezierDefinition },
  },
};

export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* ─── CountUp ─────────────────────────────────────────────────────────── */
export function CountUp({
  end,
  suffix = "",
  duration = 1.5,
  className,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (inView) motionValue.set(end);
  }, [inView, end, motionValue]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(v)}${suffix}`;
      }
    });
  }, [spring, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
