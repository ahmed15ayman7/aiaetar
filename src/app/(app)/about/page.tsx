"use client";

import { Award, BookOpen, CheckCircle2, Eye, Globe2, Heart, Lightbulb, Shield, Target, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { teamMembers } from "@/lib/data";
import { useLanguageStore } from "@/stores/useLanguageStore";

const valueKeys = [
  { icon: Award,       titleKey: "value1" as const, descKey: "value1Desc" as const },
  { icon: BookOpen,    titleKey: "value2" as const, descKey: "value2Desc" as const },
  { icon: Heart,       titleKey: "value3" as const, descKey: "value3Desc" as const },
  { icon: Globe2,      titleKey: "value4" as const, descKey: "value4Desc" as const },
];

const objectiveKeys = [
  { icon: Users,       titleKey: "obj1" as const, descKey: "obj1Desc" as const },
  { icon: TrendingUp,  titleKey: "obj2" as const, descKey: "obj2Desc" as const },
  { icon: Zap,         titleKey: "obj3" as const, descKey: "obj3Desc" as const },
  { icon: Target,      titleKey: "obj4" as const, descKey: "obj4Desc" as const },
  { icon: Globe2,      titleKey: "obj5" as const, descKey: "obj5Desc" as const },
  { icon: Lightbulb,   titleKey: "obj6" as const, descKey: "obj6Desc" as const },
];

const qualityKeys = [
  { icon: Shield,      titleKey: "q1" as const, descKey: "q1Desc" as const },
  { icon: Award,       titleKey: "q2" as const, descKey: "q2Desc" as const },
  { icon: TrendingUp,  titleKey: "q3" as const, descKey: "q3Desc" as const },
  { icon: CheckCircle2,titleKey: "q4" as const, descKey: "q4Desc" as const },
  { icon: Zap,         titleKey: "q5" as const, descKey: "q5Desc" as const },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const tSec = useTranslations("sections");
  const locale = useLanguageStore((s) => s.locale);

  return (
    <div className="space-y-24 py-16">

      {/* ── Hero banner ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="section-label mb-6">{t("pageBadge")}</span>
          <h1 className="font-heading mt-6 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-6 max-w-xs" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {t("subtitle")}
          </p>
        </FadeIn>
      </div>

      {/* ── Vision / Mission ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Vision */}
          <SlideIn direction="left">
            <section className="glass-card flex h-full flex-col p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full border border-[#c4854a]/40 bg-[#c4854a]/15">
                  <Eye className="size-6 text-[#ebd190]" aria-hidden />
                </span>
                <span className="section-label">{t("visionBadge")}</span>
              </div>
              <h2 className="font-heading mb-3 text-2xl font-bold text-white">{t("vision")}</h2>
              <div className="gold-line mb-5 w-12" />
              <p className="text-sm leading-relaxed text-slate-300">{t("visionText")}</p>
            </section>
          </SlideIn>

          {/* Mission */}
          <SlideIn direction="right">
            <section className="glass-card flex h-full flex-col p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full border border-[#c4854a]/40 bg-[#c4854a]/15">
                  <Target className="size-6 text-[#ebd190]" aria-hidden />
                </span>
                <span className="section-label">{t("missionBadge")}</span>
              </div>
              <h2 className="font-heading mb-3 text-2xl font-bold text-white">{t("mission")}</h2>
              <div className="gold-line mb-5 w-12" />
              <p className="text-sm leading-relaxed text-slate-300">{t("missionText")}</p>
            </section>
          </SlideIn>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 text-center">
          <span className="section-label mb-4">{t("valuesBadge")}</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("values")}
          </h2>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueKeys.map(({ icon: Icon, titleKey, descKey }) => (
            <StaggerItem key={titleKey}>
              <div className="glass-card group flex h-full flex-col items-center gap-4 p-7 text-center">
                <span className="flex size-14 items-center justify-center rounded-full border border-[#c4854a]/40 bg-gradient-to-br from-[#c4854a]/20 to-[#0c2c59] text-[#ebd190] transition-all duration-300 group-hover:border-[#ebd190]/60 group-hover:shadow-[0_0_20px_rgba(196,133,74,0.3)]">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="font-heading text-sm font-bold text-white">{t(titleKey)}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{t(descKey)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ── Story strip ── */}
      <div className="border-y border-[#c4854a]/15 bg-[#0c2c59]/60 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <SlideIn direction="left">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="https://picsum.photos/seed/institute-story/900/600"
                alt=""
                width={700}
                height={480}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c2c59]/60 to-transparent" />
              {/* Stats overlay */}
              <div className="absolute bottom-4 start-4 flex gap-3">
                {[
                  { value: "3,200+", label: locale === "ar" ? "خريج" : "Graduates" },
                  { value: "18",     label: locale === "ar" ? "دولة" : "Countries" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-[#c4854a]/40 bg-[#0c2c59]/80 px-3 py-2 text-center backdrop-blur-sm">
                    <p className="font-heading text-lg font-bold text-[#ebd190]">{s.value}</p>
                    <p className="text-[10px] text-slate-300">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
          <SlideIn direction="right">
            <span className="section-label mb-6">{t("storyBadge")}</span>
            <h2 className="font-heading mt-5 text-3xl font-bold text-white sm:text-4xl">
              {t("storyTitle")}
            </h2>
            <GoldDivider className="my-6 max-w-xs" />
            <p className="mb-5 text-sm leading-loose text-slate-300">
              {t("storyP1")}
            </p>
            <p className="text-sm leading-loose text-slate-400">
              {t("storyP2")}
            </p>
          </SlideIn>
        </div>
      </div>

      {/* ── Objectives ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 text-center">
          <span className="section-label mb-4">{t("objectivesBadge")}</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("objectivesTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">{t("objectivesSubtitle")}</p>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {objectiveKeys.map(({ icon: Icon, titleKey, descKey }, idx) => (
            <StaggerItem key={titleKey}>
              <div className="glass-card group flex h-full gap-4 p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#c4854a]/40 bg-[#c4854a]/10 text-[#ebd190] transition-all group-hover:border-[#ebd190]/50 group-hover:bg-[#c4854a]/20">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-bold text-[#c4854a]">0{idx + 1}</span>
                    <h3 className="font-heading text-sm font-bold text-white">{t(titleKey)}</h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-400">{t(descKey)}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ── Quality & Accreditation ── */}
      <div className="border-y border-[#c4854a]/15 bg-[#0c2c59]/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10 text-center">
            <span className="section-label mb-4">{t("qualityBadge")}</span>
            <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
              {t("qualityTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">{t("qualitySubtitle")}</p>
            <GoldDivider className="mx-auto mt-5 max-w-xs" />
          </FadeIn>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {qualityKeys.map(({ icon: Icon, titleKey, descKey }) => (
              <StaggerItem key={titleKey}>
                <div className="glass-card flex h-full flex-col items-center gap-3 p-6 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full border border-[#c4854a]/40 bg-gradient-to-br from-[#c4854a]/20 to-[#0c2c59] text-[#ebd190]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-heading text-xs font-bold text-white">{t(titleKey)}</h3>
                  <p className="text-[11px] leading-relaxed text-slate-400">{t(descKey)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* ── Team ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <span className="section-label mb-4">{t("teamBadge")}</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("teamTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">{t("teamSubtitle")}</p>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => {
            const localData = member[locale];
            return (
              <StaggerItem key={member.id}>
                <article className="group relative overflow-hidden rounded-2xl border border-white/10">
                  {/* Photo */}
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={member.image}
                      alt={localData.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59] via-[#0c2c59]/20 to-transparent" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-[#9a6c3a]/90 to-[#0c2c59]/60 p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <p className="text-xs leading-relaxed text-white/80">{localData.bio}</p>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white"
                        aria-label={t("teamLinkedIn")}
                      >
                        <ExternalLink className="size-3.5" />
                        {t("teamLinkedIn")}
                      </a>
                    </div>
                  </div>
                  {/* Card footer */}
                  <div className="border-t border-white/10 p-4">
                    <p className="font-heading font-bold text-white">{localData.name}</p>
                    <p className="mt-0.5 text-sm text-[#c4854a]">{localData.role}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
