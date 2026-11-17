"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn } from "@/components/ui/motion";
import { testimonials } from "@/lib/data";
import { useLanguageStore } from "@/stores/useLanguageStore";

export function Testimonials() {
  const t = useTranslations("home");
  const tSec = useTranslations("sections");
  const locale = useLanguageStore((s) => s.locale);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();
  const total = testimonials.length;

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + total) % total);
  };

  const current = testimonials[index];
  const localData = current[locale];

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section className="relative overflow-hidden py-20">
      {/* Warm glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(196,133,74,0.15), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-14 text-center">
          <span className="section-label mb-4">{tSec("socialProof")}</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("testimonialsTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
            {t("testimonialsSubtitle")}
          </p>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            className="glass-panel relative overflow-hidden rounded-3xl px-8 py-12 sm:px-14"
            role="region"
            aria-roledescription="carousel"
            aria-label={t("testimonialsTitle")}
          >
            {/* Decorative quote icon */}
            <Quote
              className="absolute start-6 top-6 size-14 text-[#c4854a]/20"
              aria-hidden
            />
            <div
              className="absolute end-6 bottom-6 size-14 rotate-180 text-[#c4854a]/10"
              aria-hidden
            >
              <Quote className="size-full" />
            </div>

            {/* Sliding content */}
            <div className="relative min-h-[200px]">
              <AnimatePresence custom={direction} mode="wait">
                <motion.blockquote
                  key={`${index}-${locale}`}
                  custom={direction}
                  variants={reduce ? {} : variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-6 text-center"
                >
                  {/* Avatar */}
                  <div className="relative size-20 overflow-hidden rounded-full border-2 border-[#c4854a]/60 shadow-[0_0_20px_rgba(196,133,74,0.3)]">
                    <Image
                      src={current.avatar}
                      alt={localData.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <p className="text-lg leading-relaxed text-slate-200 sm:text-xl">
                    &ldquo;{localData.quote}&rdquo;
                  </p>

                  <footer className="space-y-1">
                    <cite className="not-italic block font-heading text-base font-semibold text-white">
                      {localData.name}
                    </cite>
                    <span className="text-sm text-[#c4854a]">{localData.role}</span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                className="rounded-full border border-[#c4854a]/30 bg-white/5 p-2 text-[#ebd190] transition hover:bg-white/10 hover:border-[#c4854a]/60"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5 rtl:rotate-180" aria-hidden />
              </button>

              <div className="flex gap-2" role="tablist">
                {testimonials.map((_, i) => (
                  <button
                    key={testimonials[i].id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className={`rounded-full transition-all ${
                      i === index
                        ? "w-6 bg-[#c4854a]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    } h-2`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                className="rounded-full border border-[#c4854a]/30 bg-white/5 p-2 text-[#ebd190] transition hover:bg-white/10 hover:border-[#c4854a]/60"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5 rtl:rotate-180" aria-hidden />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
