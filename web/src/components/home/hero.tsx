"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { GoldDivider } from "@/components/ui/gold-divider";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("home");
  const tStats = useTranslations("stats");
  const tMeta = useTranslations("meta");

  const stats = [
    { value: "3,200+", label: tStats("graduates") },
    { value: "15+",    label: tStats("programs") },
    { value: "12+",    label: tStats("years") },
    { value: "18",     label: tStats("countries") },
  ];
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce ? {} : ({
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: "easeOut" as const, delay },
    });

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Background photo */}
      <Image
        src="https://picsum.photos/seed/aiaetar-hero/1920/1080"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Layered overlay: deep blue with subtle radial glow at top-center */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,rgba(12,44,89,0.9) 0%,rgba(12,44,89,0.82) 50%,rgba(10,34,72,0.97) 100%)",
        }}
        aria-hidden
      />
      {/* Warm radial hint from top */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(196,133,74,0.25) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Decorative top gold border */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#c4854a] to-transparent" />

      {/* Main content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left: text */}
          <div className="flex flex-col justify-center">
            <motion.div {...fade(0)}>
              <span className="section-label mb-6">
                <span className="size-1.5 rounded-full bg-[#ebd190]" />
                {t("heroBadge")}
              </span>
            </motion.div>

            <motion.h1
              {...fade(0.1)}
              className="font-heading mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-6xl"
            >
              {t("heroTitle")}
            </motion.h1>

            <motion.div {...fade(0.2)}>
              <GoldDivider className="my-5 max-w-xs" />
            </motion.div>

            <motion.p
              {...fade(0.25)}
              className="mb-10 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div {...fade(0.3)} className="flex flex-wrap items-center gap-4">
              <Link
                href="/programs"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gold-shimmer bg-gold-gradient border border-[#ebd190]/40 px-8 py-6 text-base font-bold text-[#0c1a33] shadow-[0_4px_24px_rgb(196_133_74_/_0.4)]"
                )}
              >
                {t("heroCta")}
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-[#c4854a]/50 bg-white/5 px-8 py-6 text-base font-medium text-[#ebd190] hover:bg-white/10"
                )}
              >
                {t("heroSecondaryCta")}
              </Link>
            </motion.div>
          </div>

          {/* Right: animated logo seal */}
          <div className="hidden items-center justify-center lg:flex">
            <motion.div
              initial={reduce ? {} : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.34, 1.36, 0.64, 1], delay: 0.3 }}
              className="relative"
            >
              {/* Ripple rings */}
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="absolute inset-0 rounded-full border border-[#c4854a]/20"
                  style={{
                    animation: `ripple ${1.8 + i * 0.6}s ease-out ${i * 0.4}s infinite`,
                  }}
                />
              ))}
              {/* Logo */}
              <div className="relative size-72 xl:size-80 animate-float">
                <Image
                  src="/logo.png"
                  alt={tMeta("siteName")}
                  fill
                  sizes="320px"
                  className="object-contain drop-shadow-[0_0_40px_rgba(196,133,74,0.5)]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative border-t border-[#c4854a]/20 bg-[#0c2c59]/80 backdrop-blur-sm"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#c4854a]/20 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 px-4 py-5 text-center"
            >
              <span className="font-heading text-2xl font-extrabold text-[#ebd190] sm:text-3xl">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-slate-400">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-20 start-1/2 hidden -translate-x-1/2 lg:flex"
        aria-hidden
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="rounded-full border border-[#c4854a]/40 p-2 text-[#c4854a]"
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
