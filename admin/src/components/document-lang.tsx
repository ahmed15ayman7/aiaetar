"use client";

import { useEffect } from "react";

import { useLanguageStore } from "@/stores/useLanguageStore";

export function DocumentLang() {
  const locale = useLanguageStore((s) => s.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}
