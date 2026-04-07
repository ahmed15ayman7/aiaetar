"use client";

import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { accreditations } from "@/lib/data";
import { useLanguageStore } from "@/stores/useLanguageStore";

export function AccreditationsBar() {
  const t = useTranslations("home");
  const tSec = useTranslations("sections");
  const locale = useLanguageStore((s) => s.locale);

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background stripe */}
      <div className="absolute inset-0 bg-[#0c2c59]/60" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(196,133,74,0.5), transparent)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(196,133,74,0.5), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <span className="section-label mb-4">{tSec("ourCredentials")}</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t("accreditationsTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
            {t("accreditationsSubtitle")}
          </p>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>

        <StaggerContainer className="flex flex-wrap justify-center gap-6">
          {accreditations.map((a) => {
            const localData = a[locale];
            return (
              <StaggerItem key={a.id}>
                <div className="group flex min-w-[220px] flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-8 transition-all duration-300 hover:border-[#c4854a]/50 hover:bg-white/[0.07] hover:shadow-[0_8px_32px_rgba(196,133,74,0.15)]">
                  {/* Seal */}
                  <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#c4854a]/40 bg-gradient-to-br from-[#c4854a]/20 to-transparent transition-all group-hover:border-[#ebd190]/60 group-hover:shadow-[0_0_20px_rgba(196,133,74,0.3)]">
                    <span className="font-heading text-lg font-extrabold text-[#ebd190]">
                      {a.abbr}
                    </span>
                  </div>
                  <p className="text-center text-sm font-semibold text-white transition-colors group-hover:text-[#ebd190]">
                    {localData.name}
                  </p>
                  <p className="text-center text-xs text-slate-400 transition-colors group-hover:text-slate-200">
                    {localData.full}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
