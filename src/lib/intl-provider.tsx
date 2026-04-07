"use client";

import { NextIntlClientProvider } from "next-intl";

import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import { useLanguageStore } from "@/stores/useLanguageStore";

const messagesByLocale = { en, ar } as const;

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const locale = useLanguageStore((s) => s.locale);

  return (
    <NextIntlClientProvider
      key={locale}
      locale={locale}
      messages={messagesByLocale[locale]}
      timeZone="Africa/Cairo"
    >
      {children}
    </NextIntlClientProvider>
  );
}
