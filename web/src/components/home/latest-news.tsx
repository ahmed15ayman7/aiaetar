"use client";

import { ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { newsItems } from "@/lib/data";
import { useLanguageStore } from "@/stores/useLanguageStore";

export function LatestNews() {
  const t = useTranslations("home");
  const tSec = useTranslations("sections");
  const locale = useLanguageStore((s) => s.locale);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <span className="section-label mb-4">{tSec("stayUpdated")}</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("newsTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
            {t("newsSubtitle")}
          </p>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item) => {
            const localData = item[locale];
            return (
              <StaggerItem key={item.id}>
                <article className="glass-card group flex h-full flex-col overflow-hidden">
                  {/* News image */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={localData.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59]/80 to-transparent" />
                    <span className="absolute start-3 bottom-3 flex items-center gap-1 rounded-full border border-[#c4854a]/50 bg-[#0c2c59]/80 px-2 py-0.5 text-[10px] font-semibold text-[#ebd190] backdrop-blur-sm">
                      <Tag className="size-2.5" aria-hidden />
                      {localData.tag}
                    </span>
                  </div>

                  {/* Gold top accent on hover */}
                  <div className="h-0.5 w-full bg-gradient-to-r from-[#9a6c3a] via-[#ebd190] to-[#9a6c3a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <time
                      dateTime={item.date}
                      className="flex items-center gap-1.5 text-xs text-[#c4854a]"
                    >
                      <Calendar className="size-3.5" aria-hidden />
                      {new Date(item.date).toLocaleDateString(
                        locale === "ar" ? "ar-EG" : "en-GB",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </time>
                    <h3 className="font-heading text-base font-bold leading-snug text-white transition-colors group-hover:text-[#ebd190]">
                      {localData.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-slate-400">
                      {localData.excerpt}
                    </p>
                    <Link
                      href="/resources"
                      className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-[#ebd190] hover:underline"
                    >
                      {t("newsReadMore")}
                      <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
