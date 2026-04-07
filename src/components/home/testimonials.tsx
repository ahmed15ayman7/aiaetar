"use client";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { testimonials } from "@/lib/data";
import { useLanguageStore } from "@/stores/useLanguageStore";

export function Testimonials() {
  const t = useTranslations("home");
  const locale = useLanguageStore((s) => s.locale);
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const current = testimonials[index];

  return (
    <section className="border-y border-white/10 bg-[#0f2852]/50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading mb-10 text-center text-3xl font-bold text-white sm:text-4xl">
            {t("testimonialsTitle")}
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div
            className="glass-panel relative rounded-2xl p-8 sm:p-10"
            role="region"
            aria-roledescription="carousel"
            aria-label={t("testimonialsTitle")}
          >
            <Quote
              className="absolute start-6 top-6 size-10 text-[#b98251]/40"
              aria-hidden
            />
            <blockquote className="relative z-10 pt-6 text-center">
              <p className="text-lg leading-relaxed text-slate-100 sm:text-xl">
                “{current.quote}”
              </p>
              <footer className="mt-8 text-sm text-[#ebd190]">
                <cite className="not-italic font-semibold text-white">
                  {current.name}
                </cite>
                <span className="mx-2 text-slate-500" aria-hidden>
                  ·
                </span>
                <span>{current.role}</span>
              </footer>
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="border-[#b98251]/40 bg-white/5 text-white"
                onClick={prev}
                aria-label={locale === "ar" ? "السابق" : "Previous testimonial"}
              >
                <ChevronLeft
                  className="size-5 rtl:rotate-180"
                  aria-hidden
                />
              </Button>
              <div className="flex gap-1.5" role="tablist">
                {testimonials.map((_, i) => (
                  <button
                    key={testimonials[i].id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    className={`size-2.5 rounded-full transition ${
                      i === index ? "bg-[#ebd190]" : "bg-white/25"
                    }`}
                    onClick={() => setIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="border-[#b98251]/40 bg-white/5 text-white"
                onClick={next}
                aria-label={locale === "ar" ? "التالي" : "Next testimonial"}
              >
                <ChevronRight
                  className="size-5 rtl:rotate-180"
                  aria-hidden
                />
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
