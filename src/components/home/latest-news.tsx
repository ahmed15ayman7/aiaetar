"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/ui/fade-in";
import { newsItems } from "@/lib/data";

export function LatestNews() {
  const t = useTranslations("home");

  return (
    <section className="pb-20 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-heading mb-10 text-center text-3xl font-bold text-white sm:text-4xl">
            {t("newsTitle")}
          </h2>
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-3">
          {newsItems.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.08}>
              <article className="glass-card flex h-full flex-col p-6">
                <time
                  dateTime={item.date}
                  className="text-xs uppercase tracking-wide text-[#b98251]"
                >
                  {item.date}
                </time>
                <h3 className="font-heading mt-3 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-300">
                  {item.excerpt}
                </p>
                <Link
                  href="/resources"
                  className="mt-4 text-sm font-medium text-[#ebd190] hover:underline"
                >
                  {t("newsReadMore")}
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
