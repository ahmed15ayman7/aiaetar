"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { newsItems } from "@/lib/data";

export function LatestNews() {
  const t = useTranslations("home");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <span className="section-label mb-4">Stay Updated</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("newsTitle")}
          </h2>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item) => (
            <StaggerItem key={item.id}>
              <article className="glass-card group flex h-full flex-col overflow-hidden">
                {/* Gold top accent */}
                <div className="h-1 w-full bg-gradient-to-r from-[#9a6c3a] via-[#ebd190] to-[#9a6c3a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <time
                    dateTime={item.date}
                    className="flex items-center gap-1.5 text-xs text-[#c4854a]"
                  >
                    <Calendar className="size-3.5" aria-hidden />
                    {item.date}
                  </time>
                  <h3 className="font-heading text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#ebd190]">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-400">
                    {item.excerpt}
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
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
