"use client";

import { Award, BookOpen, Globe2, HeadphonesIcon, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/ui/motion";

const features = [
  {
    key: "whyFeature1" as const,
    descKey: "whyFeature1Desc" as const,
    Icon: Users,
  },
  {
    key: "whyFeature2" as const,
    descKey: "whyFeature2Desc" as const,
    Icon: Globe2,
  },
  {
    key: "whyFeature3" as const,
    descKey: "whyFeature3Desc" as const,
    Icon: BookOpen,
  },
  {
    key: "whyFeature4" as const,
    descKey: "whyFeature4Desc" as const,
    Icon: Award,
  },
  {
    key: "whyFeature5" as const,
    descKey: "whyFeature5Desc" as const,
    Icon: HeadphonesIcon,
  },
];

export function WhyUs() {
  const t = useTranslations("home");
  const tSec = useTranslations("sections");

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(196,133,74,0.2), transparent)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <span className="section-label mb-4">{tSec("ourAdvantages")}</span>
          <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("whyTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            {t("whySubtitle")}
          </p>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(({ key, descKey, Icon }, i) => (
            <StaggerItem key={key}>
              <div className="glass-card group flex h-full flex-col items-center gap-4 p-6 text-center">
                {/* Icon */}
                <div className="relative">
                  <span
                    className="absolute -inset-2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, rgba(196,133,74,0.2), transparent 70%)" }}
                    aria-hidden
                  />
                  <span className="relative inline-flex size-16 items-center justify-center rounded-full border border-[#c4854a]/50 bg-gradient-to-br from-[#c4854a]/20 to-[#0c2c59] text-[#ebd190] transition-all duration-300 group-hover:border-[#ebd190]/60 group-hover:shadow-[0_0_20px_rgba(196,133,74,0.3)]">
                    <Icon className="size-7" aria-hidden />
                  </span>
                </div>

                {/* Number badge */}
                <span className="font-heading text-xs font-bold tracking-widest text-[#c4854a]/60">
                  0{i + 1}
                </span>

                <h3 className="font-heading text-sm font-bold text-white sm:text-base">
                  {t(key)}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400 group-hover:text-slate-300">
                  {t(descKey)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
