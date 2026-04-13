"use client";

import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Layers,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import {
  portfolioIntro,
  portfolioObjectives,
  portfolioQuality,
  portfolioSections,
  type PortfolioLocale,
} from "@/lib/portfolio-data";
import { useLanguageStore } from "@/stores/useLanguageStore";
const sectionIcons: Record<string, React.ElementType> = {
  diplomas: GraduationCap,
  shortCourses: BookOpen,
  elearning: Layers,
  leadership: Briefcase,
  engineering: Cpu,
};

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const locale = useLanguageStore((s) => s.locale) as PortfolioLocale;
  const isAr = locale === "ar";

  return (
    <div className="relative pb-24 pt-16">
      {/* Ambient */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(196,133,74,0.14), transparent)",
        }}
        aria-hidden
      />

      {/* Hero */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="section-label mb-5 inline-flex items-center gap-2">
            <Sparkles className="size-3.5 text-[#c4854a]" aria-hidden />
            {t("pageBadge")}
          </span>
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-6 max-w-xs" />
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {t("subtitle")}
          </p>
        </FadeIn>
      </div>

      {/* Introduction — bilingual cards */}
      <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <SlideIn direction="up">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <article
              className="glass-card relative overflow-hidden p-8 sm:p-10"
              dir="rtl"
            >
              <div className="absolute end-0 top-0 h-32 w-32 rounded-full bg-[#c4854a]/10 blur-3xl" aria-hidden />
              <p className="section-label mb-4 text-start">{t("introLabelAr")}</p>
              <p className="text-sm leading-loose text-slate-200">{portfolioIntro.ar}</p>
            </article>
            <article
              className="glass-card relative overflow-hidden p-8 sm:p-10"
              dir="ltr"
            >
              <div className="absolute start-0 top-0 h-32 w-32 rounded-full bg-[#1a56db]/10 blur-3xl" aria-hidden />
              <p className="section-label mb-4 text-start">{t("introLabelEn")}</p>
              <p className="text-sm leading-loose text-slate-200">{portfolioIntro.en}</p>
            </article>
          </div>
        </SlideIn>
      </div>

      {/* Programme sections */}
      <div className="relative mx-auto mt-20 max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {portfolioSections.map((section, idx) => {
          const Icon = sectionIcons[section.id] ?? Layers;
          return (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.03 }}
            >
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[#c4854a]/35 bg-gradient-to-br from-[#c4854a]/20 to-[#0c2c59] text-[#ebd190] shadow-lg">
                  <Icon className="size-6" aria-hidden />
                </span>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                    {isAr ? section.title.ar : section.title.en}
                  </h2>
                  <div className="gold-line mt-3 max-w-[72px]" />
                </div>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="group flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-[#c4854a]/35 hover:bg-[#c4854a]/[0.06]"
                  >
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-[#c4854a]/15 text-[10px] font-bold text-[#ebd190]">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-slate-200">
                      {isAr ? item.ar : item.en}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          );
        })}
      </div>

      {/* Quality & accreditation */}
      <div className="relative mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="overflow-hidden rounded-3xl border border-[#c4854a]/25 bg-gradient-to-br from-[#0c2c59]/90 via-[#08152a] to-[#0a2248] p-8 sm:p-10 shadow-[0_0_60px_rgba(196,133,74,0.12)]">
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-2xl border border-[#ebd190]/30 bg-[#ebd190]/10 text-[#ebd190]">
                <Award className="size-6" aria-hidden />
              </span>
              <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                {isAr ? portfolioQuality.title.ar : portfolioQuality.title.en}
              </h2>
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {portfolioQuality.items.map((row, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#c4854a]" aria-hidden />
                  {isAr ? row.ar : row.en}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* General objectives */}
      <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {isAr ? portfolioObjectives.title.ar : portfolioObjectives.title.en}
          </h2>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioObjectives.items.map((obj, i) => (
            <StaggerItem key={i}>
              <div className="glass-card flex h-full gap-4 p-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#9a6c3a] to-[#c4854a] text-sm font-bold text-[#0c1a33]">
                  ✓
                </span>
                <p className="text-sm leading-relaxed text-slate-200">
                  {isAr ? obj.ar : obj.en}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Bottom CTA strip */}
      <div className="relative mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center backdrop-blur-sm"
        >
          <p className="text-sm text-slate-300">{t("ctaText")}</p>
        </motion.div>
      </div>
    </div>
  );
}
