"use client";

import { BadgeCheck, CalendarCheck, CalendarDays, FileText, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const items = [
  {
    id: "1",
    org: "ISO 9001",
    fullName: "International Organization for Standardization",
    license: "EG-QMS-2024-1042",
    issued: "2024-01-15",
    review: "2027-01-15",
    text: "Quality management systems certification ensuring consistent service delivery aligned with internationally recognised educational standards.",
    color: "#c4854a",
  },
  {
    id: "2",
    org: "EOS",
    fullName: "Egyptian Organization for Standardization",
    license: "EOS-TRN-8891",
    issued: "2023-09-01",
    review: "2026-09-01",
    text: "National accreditation confirming compliance with Egypt's standardisation framework for professional training providers.",
    color: "#9a6c3a",
  },
  {
    id: "3",
    org: "NQI",
    fullName: "National Quality Institute",
    license: "NQI-EDU-5520",
    issued: "2025-02-10",
    review: "2028-02-10",
    text: "Accredited quality assurance framework applied across all professional development programmes offered by the Institute.",
    color: "#b98251",
  },
];

export default function CertificationsPage() {
  const t = useTranslations("certifications");

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-14 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="section-label mb-5">Our Credentials</span>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
            Every programme we offer operates under internationally recognised quality frameworks.
            Our accreditations are independently audited and renewed on a regular cycle.
          </p>
        </FadeIn>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
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
                  <div className="flex items-center gap-4">
                    <div
                      className="flex size-20 shrink-0 items-center justify-center rounded-2xl border-2 text-[#ebd190]"
                      style={{ borderColor: `${c.color}60`, background: `${c.color}15` }}
                    >
                      <ShieldCheck className="size-10" aria-hidden />
                    </div>
                    <div>
                      <p className="font-heading text-2xl font-extrabold text-[#ebd190]">
                        {c.org}
                      </p>
                      <p className="text-xs text-slate-400">{c.fullName}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="gold-line" />

                  {/* Details */}
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 shrink-0 text-[#c4854a]" aria-hidden />
                      <dt className="text-slate-500 me-1">{t("license")}</dt>
                      <dd className="font-mono text-xs font-semibold text-slate-200">
                        {c.license}
                      </dd>
                    </div>
                    <div className="flex gap-6">
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

                  <p className="mt-auto text-sm leading-relaxed text-slate-400">{c.text}</p>

                  <div className="flex items-center gap-2 text-xs text-[#c4854a]">
                    <BadgeCheck className="size-4" aria-hidden />
                    <span>Fully Accredited &amp; Active</span>
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
