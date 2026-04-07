"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { useLanguageStore } from "@/stores/useLanguageStore";

export function LanguageSwitcher() {
  const t = useTranslations("language");
  const locale = useLanguageStore((s) => s.locale);
  const setLocale = useLanguageStore((s) => s.setLocale);

  return (
    <div
      className="relative flex items-center rounded-lg border border-white/20 bg-white/5 p-0.5 backdrop-blur-sm"
      role="group"
      aria-label={t("label")}
    >
      {/* sliding highlight */}
      <motion.div
        className="absolute h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-md bg-gold-gradient"
        animate={{ x: locale === "ar" ? "calc(100% + 2px)" : "2px" }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      />

      {(["en", "ar"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang)}
          aria-pressed={locale === lang}
          className={[
            "relative z-10 min-w-[44px] rounded-md px-3 py-1 text-xs font-semibold tracking-wide transition-colors duration-200",
            locale === lang
              ? "text-[#0c2c59]"
              : "text-white/60 hover:text-white",
          ].join(" ")}
        >
          {lang === "en" ? t("en") : t("ar")}
        </button>
      ))}
    </div>
  );
}
