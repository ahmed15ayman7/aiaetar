import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "en" | "ar";

type LanguageState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "aiaetar-locale" }
  )
);
