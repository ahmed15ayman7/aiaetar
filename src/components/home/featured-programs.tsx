"use client";

import { ArrowRight, Clock, MapPin, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { programs } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeaturedPrograms() {
  const t = useTranslations("home");
  const tProg = useTranslations("programs");
  const featured = programs.slice(0, 4);

  return (
    <section className="relative border-y border-[#c4854a]/15 py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "rgba(12,44,89,0.5)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="section-label mb-4">Our Offerings</span>
              <h2 className="font-heading mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {t("programsTitle")}
              </h2>
              <GoldDivider className="mt-5 max-w-xs" />
            </div>
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "shrink-0 border-[#c4854a]/40 bg-white/5 text-[#ebd190] hover:bg-white/10"
              )}
            >
              {t("programsCta")}
              <ArrowRight className="ms-1.5 size-3.5 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((p) => (
            <StaggerItem key={p.id}>
              <article className="glass-card group flex h-full flex-col overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59] via-[#0c2c59]/30 to-transparent" />
                  {/* Category badge */}
                  <span className="absolute start-3 top-3 rounded-full border border-[#c4854a]/60 bg-[#0c2c59]/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ebd190] backdrop-blur-sm">
                    {p.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-heading text-base font-bold leading-snug text-white group-hover:text-[#ebd190]">
                    {p.title}
                  </h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {p.description}
                  </p>

                  {/* Meta row */}
                  <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-white/10 pt-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-[#c4854a]" aria-hidden />
                      {p.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      {p.mode === "online" ? (
                        <Monitor className="size-3 text-[#c4854a]" aria-hidden />
                      ) : (
                        <MapPin className="size-3 text-[#c4854a]" aria-hidden />
                      )}
                      {p.mode === "online" ? tProg("modeOnline") : tProg("modeOnsite")}
                    </span>
                  </div>

                  <Link
                    href="/programs"
                    className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#ebd190] hover:underline"
                  >
                    {tProg("learnMore")}
                    <ArrowRight className="size-3.5 rtl:rotate-180" aria-hidden />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
