"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/stores/useLanguageStore";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLanguageStore((s) => s.locale);
  const setLocale = useLanguageStore((s) => s.setLocale);

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 p-1"
      role="group"
      aria-label={t("label")}
    >
      <Button
        type="button"
        variant={locale === "en" ? "secondary" : "ghost"}
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
      >
        {t("en")}
      </Button>
      <Button
        type="button"
        variant={locale === "ar" ? "secondary" : "ghost"}
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={() => setLocale("ar")}
        aria-pressed={locale === "ar"}
      >
        {t("ar")}
      </Button>
    </div>
  );
}
