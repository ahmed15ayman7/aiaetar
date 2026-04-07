"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/components/ui/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0c2c59]/92 via-[#0f2852]/88 to-[#0c2c59]/95"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[min(85vh,820px)] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="mb-3 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </p>
          <p className="mb-10 max-w-2xl text-lg text-slate-200/95 sm:text-xl">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gold-shimmer bg-gold-gradient border-2 border-[#ebd190]/60 px-8 py-6 text-base font-semibold text-[#0c1a33] shadow-xl"
              )}
            >
              {tNav("enroll")}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
