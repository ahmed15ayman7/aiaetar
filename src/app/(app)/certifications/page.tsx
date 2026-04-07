"use client";

import { BadgeCheck, CalendarCheck, CalendarDays, FileText, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function CertificationsPage() {
  const t = useTranslations("certifications");
  const certItems = t.raw("certItems") as {
    id: string; abbr: string; name: string; org: string;
    license: string; issued: string; review: string; color: string; text: string;
  }[];

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
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
            {t("subtitle")}
          </p>
        </FadeIn>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {certItems.map((c) => (
            <StaggerItem key={c.id}>
              <article className="glass-card flex h-full flex-col p-0 overflow-hidden">
                {/* Top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${c.color}, #ebd190, ${c.color})`,
                  }}
                />

                <div className="flex flex-1 flex-col gap-5 p-7">
                  {/* Seal */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex size-16 shrink-0 items-center justify-center rounded-2xl border-2 text-[#ebd190]"
                      style={{ borderColor: `${c.color}60`, background: `${c.color}15` }}
                    >
                      <ShieldCheck className="size-8" aria-hidden />
                    </div>
                    <div>
                      <p className="font-heading text-xl font-extrabold text-[#ebd190]">
                        {c.abbr}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{c.name}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{c.org}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="gold-line" />

                  {/* Details */}
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 shrink-0 text-[#c4854a]" aria-hidden />
                      <dt className="text-slate-500 me-1 shrink-0">{t("license")}</dt>
                      <dd className="font-mono text-xs font-semibold text-slate-200 break-all">
                        {c.license}
                      </dd>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="size-4 shrink-0 text-[#c4854a]" aria-hidden />
                        <dt className="text-slate-500 me-1">{t("issued")}</dt>
                        <dd className="text-slate-200">{c.issued}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarCheck className="size-4 shrink-0 text-[#c4854a]" aria-hidden />
                        <dt className="text-slate-500 me-1">{t("review")}</dt>
                        <dd className="text-slate-200">{c.review}</dd>
                      </div>
                    </div>
                  </dl>

                  <p className="flex-1 text-sm leading-relaxed text-slate-400">{c.text}</p>

                  <div className="flex items-center gap-2 text-xs text-[#c4854a]">
                    <BadgeCheck className="size-4" aria-hidden />
                    <span>{t("status")}</span>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
