"use client";

import { ArrowRight, Clock, Filter, MapPin, Monitor, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type ProgramCategory, programs } from "@/lib/data";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  management: "#1a56db",
  hospitality: "#c4854a",
  quality: "#0d9488",
  training: "#7c3aed",
};

const categories: { id: ProgramCategory | "all"; labelKey: string }[] = [
  { id: "all",         labelKey: "all" },
  { id: "management",  labelKey: "categoryManagement" },
  { id: "hospitality", labelKey: "categoryHospitality" },
  { id: "quality",     labelKey: "categoryQuality" },
  { id: "training",    labelKey: "categoryTraining" },
];

function FilterPanel({
  active,
  onChange,
}: {
  active: ProgramCategory | "all";
  onChange: (c: ProgramCategory | "all") => void;
}) {
  const t = useTranslations("programs");
  return (
    <div className="space-y-3">
      <p className="font-heading text-sm font-bold uppercase tracking-widest text-[#ebd190]">
        {t("filterTitle")}
      </p>
      <div className="flex flex-col gap-2">
        {categories.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "rounded-xl border px-4 py-2.5 text-start text-sm font-medium transition-all",
              active === id
                ? "border-[#c4854a]/60 bg-[#c4854a]/15 text-[#ebd190] shadow-[0_0_12px_rgba(196,133,74,0.2)]"
                : "border-white/10 bg-white/5 text-slate-400 hover:border-[#c4854a]/30 hover:text-white"
            )}
          >
            {t(labelKey as "all")}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProgramsCatalog() {
  const t = useTranslations("programs");
  const [active, setActive] = useState<ProgramCategory | "all">("all");
  const [open, setOpen] = useState(false);
  const locale = useLanguageStore((s) => s.locale);

  const filtered = useMemo(() => {
    if (active === "all") return programs;
    return programs.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="py-14">
      {/* Page header */}
      <div className="mx-auto max-w-7xl px-4 pb-12 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="section-label mb-5">{t("pageBadge")}</span>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400">{t("subtitle")}</p>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
        </FadeIn>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">

        {/* Desktop sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <FilterPanel active={active} onChange={setActive} />
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Mobile + count bar */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-400">
              {filtered.length}&nbsp;
              {locale === "ar" ? "برنامج" : filtered.length === 1 ? "program" : "programs"}
              {active !== "all" && (
                <button
                  type="button"
                  onClick={() => setActive("all")}
                  className="ms-2 inline-flex items-center gap-1 rounded-full border border-[#c4854a]/40 bg-[#c4854a]/10 px-2 py-0.5 text-xs text-[#ebd190] hover:bg-[#c4854a]/20"
                >
                  <X className="size-3" />
                  {t("clearFilters")}
                </button>
              )}
            </p>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "border-[#c4854a]/40 bg-white/5 text-[#ebd190] lg:hidden"
                )}
              >
                <Filter className="me-1.5 size-4" />
                {t("filterTitle")}
              </SheetTrigger>
              <SheetContent side="left" className="w-64 border-[#c4854a]/20 bg-[#0c2c59] text-white">
                <SheetHeader>
                  <SheetTitle className="text-[#ebd190]">{t("title")}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel active={active} onChange={(c) => { setActive(c); setOpen(false); }} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2">
            {filtered.map((p) => {
              const localData = p[locale];
              const accentColor = categoryColors[p.category] ?? "#c4854a";
              return (
                <StaggerItem key={p.id}>
                  <article className="glass-card group flex h-full flex-col overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={localData.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c59] via-[#0c2c59]/30 to-transparent" />
                      <span
                        className="absolute start-3 top-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"
                        style={{ borderColor: `${accentColor}60`, color: accentColor, background: "rgba(12,44,89,0.85)" }}
                      >
                        {t(`category${p.category.charAt(0).toUpperCase() + p.category.slice(1)}` as "categoryManagement")}
                      </span>
                      <span className="absolute end-3 top-3 flex items-center gap-1 rounded-full border border-white/20 bg-[#0c2c59]/70 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
                        {p.mode === "online" ? (
                          <Monitor className="size-3" aria-hidden />
                        ) : (
                          <MapPin className="size-3" aria-hidden />
                        )}
                        {p.mode === "online" ? t("modeOnline") : t("modeOnsite")}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h2 className="font-heading text-xl font-bold text-white group-hover:text-[#ebd190]">
                        {localData.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-slate-400">{localData.description}</p>

                      {/* Meta */}
                      <div className="mt-auto flex flex-wrap gap-4 border-t border-white/10 pt-4 text-xs">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Clock className="size-3.5 text-[#c4854a]" aria-hidden />
                          <span className="text-slate-300">{p.duration} {t("weeksSuffix")}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Link
                          href="/contact"
                          className="flex items-center gap-1.5 text-sm font-bold text-[#ebd190] hover:underline"
                        >
                          {t("applyNow")}
                          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                        </Link>
                        <Link
                          href="/contact"
                          className="text-xs text-slate-500 hover:text-slate-300"
                        >
                          {t("learnMore")}
                        </Link>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </div>
  );
}
