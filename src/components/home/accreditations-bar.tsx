"use client";

import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/ui/fade-in";
import { accreditations } from "@/lib/data";

export function AccreditationsBar() {
  const t = useTranslations("home");

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            {t("accreditationsTitle")}
          </h2>
        </FadeIn>
        <div className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {accreditations.map((a, i) => (
            <FadeIn key={a.id} delay={i * 0.05}>
              <div
                className="group flex min-w-[200px] flex-1 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-10 transition hover:border-[#b98251]/50"
                title={a.name}
              >
                <div className="mb-3 text-3xl font-bold grayscale transition group-hover:grayscale-0">
                  <span className="text-[#ebd190]">{a.abbr}</span>
                </div>
                <p className="text-center text-xs text-slate-400 transition group-hover:text-slate-200">
                  {a.name}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
