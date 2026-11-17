"use client";

import { useLanguageStore } from "@/stores/useLanguageStore";

export function BodyFont({ children }: { children: React.ReactNode }) {
  const locale = useLanguageStore((s) => s.locale);
  const bodyClass =
    locale === "ar" ? "font-body-ar" : "font-body-en";

  return <div className={`min-h-full flex flex-col ${bodyClass}`}>{children}</div>;
}
