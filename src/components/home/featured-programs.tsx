"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/ui/fade-in";
import { programs } from "@/lib/data";

export function FeaturedPrograms() {
  const t = useTranslations("home");
  const tProg = useTranslations("programs");
  const featured = programs.slice(0, 4);

  return (
    <section className="border-y border-white/10 bg-[#0c2c59]/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              {t("programsTitle")}
            </h2>
            <Link
              href="/programs"
              className="text-sm font-medium text-[#ebd190] underline-offset-4 hover:underline"
            >
              {t("programsCta")}
            </Link>
          </div>
        </FadeIn>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.06}>
              <article className="glass-card group flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59]/80 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-heading text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-slate-300">
                    {p.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 text-xs text-slate-400">
                    <span>{p.duration}</span>
                    <span aria-hidden>·</span>
                    <span>
                      {p.mode === "online"
                        ? tProg("modeOnline")
                        : tProg("modeOnsite")}
                    </span>
                  </div>
                  <Link
                    href="/programs"
                    className="text-sm font-medium text-[#ebd190] hover:underline"
                  >
                    {tProg("learnMore")}
                  </Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
