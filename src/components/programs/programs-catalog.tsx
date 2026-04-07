"use client";

import { Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type ProgramCategory, programs } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories: { id: ProgramCategory | "all"; labelKey: string }[] = [
  { id: "all", labelKey: "all" },
  { id: "management", labelKey: "categoryManagement" },
  { id: "hospitality", labelKey: "categoryHospitality" },
  { id: "quality", labelKey: "categoryQuality" },
  { id: "training", labelKey: "categoryTraining" },
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
      <p className="font-heading text-sm font-semibold text-[#ebd190]">
        {t("filterTitle")}
      </p>
      <div className="flex flex-col gap-2">
        {categories.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "rounded-lg border px-3 py-2 text-start text-sm transition",
              active === id
                ? "border-[#b98251] bg-[#b98251]/15 text-white"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
            )}
          >
            {t(labelKey)}
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

  const filtered = useMemo(() => {
    if (active === "all") return programs;
    return programs.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:px-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <FilterPanel active={active} onChange={setActive} />
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
          <h1 className="font-heading text-3xl font-bold text-white">{t("title")}</h1>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "default" }),
                "border-[#b98251]/40 bg-white/5 text-white"
              )}
              aria-label={t("filterTitle")}
            >
              <Filter className="me-2 size-4" />
              {t("filterTitle")}
            </SheetTrigger>
            <SheetContent
              side="left"
              className="border-white/10 bg-[#0c2c59]/98 text-white"
            >
              <SheetHeader>
                <SheetTitle>{t("title")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel
                  active={active}
                  onChange={(c) => {
                    setActive(c);
                    setOpen(false);
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <h1 className="font-heading mb-8 hidden text-4xl font-bold text-white lg:block">
          {t("title")}
        </h1>

        <ul className="grid gap-6 sm:grid-cols-2">
          {filtered.map((p) => (
            <li key={p.id}>
              <article className="glass-card flex h-full flex-col overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h2 className="font-heading text-xl font-semibold text-white">
                    {p.title}
                  </h2>
                  <p className="text-sm text-slate-300">{p.description}</p>
                  <div className="mt-auto flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>
                      <span className="text-[#b98251]">{t("duration")}: </span>
                      {p.duration}
                    </span>
                    <span>
                      <span className="text-[#b98251]">{t("mode")}: </span>
                      {p.mode === "online"
                        ? t("modeOnline")
                        : t("modeOnsite")}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="text-sm font-medium text-[#ebd190] hover:underline"
                  >
                    {t("learnMore")}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
