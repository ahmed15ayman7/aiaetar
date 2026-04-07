"use client";

import { useTranslations } from "next-intl";

import { useLanguageStore } from "@/stores/useLanguageStore";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLanguageStore((s) => s.locale);
  const setLocale = useLanguageStore((s) => s.setLocale);

  return (
    <div
      className="flex items-center rounded-lg border border-white/20 bg-white/5 p-0.5 backdrop-blur-sm"
      role="group"
      aria-label={t("label")}
    >
      {(["en", "ar"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          aria-pressed={locale === lang}
          className={[
            "min-w-[40px] rounded-md px-3 py-1 text-xs font-bold tracking-wide transition-all duration-200",
            locale === lang
              ? "bg-gold-gradient text-[#0c2c59] shadow-[0_2px_8px_rgba(196,133,74,0.35)]"
              : "text-white/55 hover:text-white",
          ].join(" ")}
        >
          {lang === "en" ? t("en") : t("ar")}
        </button>
      ))}
    </div>
  );
}
