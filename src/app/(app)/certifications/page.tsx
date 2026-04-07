"use client";

import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/ui/fade-in";

const items = [
  {
    id: "1",
    org: "ISO 9001",
    license: "EG-QMS-2024-1042",
    issued: "2024-01-15",
    review: "2027-01-15",
    text: "Quality management aligned with international standards for educational service delivery.",
  },
  {
    id: "2",
    org: "Egyptian Organization for Standardization",
    license: "EOS-TRN-8891",
    issued: "2023-09-01",
    review: "2026-09-01",
    text: "Compliance with national standardization requirements for training providers.",
  },
  {
    id: "3",
    org: "National Quality Institute",
    license: "NQI-EDU-5520",
    issued: "2025-02-10",
    review: "2028-02-10",
    text: "Accredited quality assurance framework for professional development programs.",
  },
];

export default function CertificationsPage() {
  const t = useTranslations("certifications");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <FadeIn>
        <h1 className="font-heading mb-12 text-center text-4xl font-bold text-white">
          {t("title")}
        </h1>
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <FadeIn key={c.id} delay={i * 0.06}>
            <article className="glass-card flex flex-col p-6">
              <div className="mb-4 flex h-24 items-center justify-center rounded-lg border border-[#b98251]/40 bg-white/5 text-2xl font-bold text-[#ebd190]">
                {c.org}
              </div>
              <dl className="space-y-2 text-sm text-slate-300">
                <div>
                  <dt className="text-[#b98251]">{t("license")}</dt>
                  <dd>{c.license}</dd>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <dt className="text-[#b98251]">{t("issued")}</dt>
                    <dd>{c.issued}</dd>
                  </div>
                  <div>
                    <dt className="text-[#b98251]">{t("review")}</dt>
                    <dd>{c.review}</dd>
                  </div>
                </div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {c.text}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
