"use client";

import {
  Award,
  BookOpen,
  Globe2,
  HeadphonesIcon,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/ui/fade-in";

const icons = [Users, Globe2, BookOpen, Award, HeadphonesIcon] as const;

export function WhyUs() {
  const t = useTranslations("home");
  const keys = [
    "whyFeature1",
    "whyFeature2",
    "whyFeature3",
    "whyFeature4",
    "whyFeature5",
  ] as const;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn>
        <h2 className="font-heading mb-10 text-center text-3xl font-bold text-white sm:text-4xl">
          {t("whyTitle")}
        </h2>
      </FadeIn>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {keys.map((key, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={key} delay={i * 0.05}>
              <div className="glass-card flex flex-col items-center gap-4 p-6 text-center">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-[#b98251]/50 bg-white/5 text-[#ebd190]">
                  <Icon className="size-7" aria-hidden />
                </span>
                <p className="font-heading text-sm font-semibold text-white sm:text-base">
                  {t(key)}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
