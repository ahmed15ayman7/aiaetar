"use client";

import { BookOpen, ExternalLink, Globe2, Star } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { trainers } from "@/lib/data";
import { useLanguageStore } from "@/stores/useLanguageStore";

export default function TrainersPage() {
  const t = useTranslations("trainers");
  const locale = useLanguageStore((s) => s.locale);

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-14 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="section-label mb-5">{t("pageBadge")}</span>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
            {t("subtitle")}
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((person) => {
            const localData = person[locale];
            return (
              <StaggerItem key={person.id}>
                <article className="glass-card group flex h-full flex-col overflow-hidden">
                  {/* Photo section */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={person.image}
                      alt={localData.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59] via-[#0c2c59]/20 to-transparent" />

                    {/* Rating badge */}
                    <div className="absolute end-3 top-3 flex items-center gap-1 rounded-full border border-[#c4854a]/60 bg-[#0c2c59]/80 px-2.5 py-1 text-[11px] font-bold text-[#ebd190] backdrop-blur-sm">
                      <Star className="size-3 fill-[#ebd190] text-[#ebd190]" aria-hidden />
                      {person.rating}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end gap-3 bg-gradient-to-t from-[#9a6c3a]/90 to-[#0c2c59]/60 p-5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <p className="text-sm text-white/90 leading-relaxed">{localData.bio}</p>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-white"
                        aria-label={t("viewProfile")}
                      >
                        <ExternalLink className="size-3.5" />
                        {t("viewProfile")}
                      </a>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div>
                      <h2 className="font-heading text-lg font-bold text-white">{localData.name}</h2>
                      <p className="text-sm text-[#c4854a]">{localData.role}</p>
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-5 border-y border-white/10 py-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="size-3.5 text-[#c4854a]" aria-hidden />
                        {person.courses} {t("courses")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Globe2 className="size-3.5 text-[#c4854a]" aria-hidden />
                        {person.countries} {t("countries")}
                      </span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5">
                      {person.specialties.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-[#c4854a]/25 bg-[#c4854a]/10 px-2 py-0.5 text-[10px] font-semibold text-[#ebd190]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
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
