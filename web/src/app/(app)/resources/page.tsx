"use client";

import {
  BookOpen,
  Download,
  FileText,
  Film,
  Play,
  Search,
  TrendingDown,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { GoldDivider } from "@/components/ui/gold-divider";
import { Input } from "@/components/ui/input";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { cn } from "@/lib/utils";

type ResourceType = "article" | "video" | "pdf";

const typeConfig: Record<ResourceType, { Icon: React.ElementType; color: string }> = {
  pdf:     { Icon: FileText, color: "#c4854a" },
  article: { Icon: BookOpen, color: "#7db3e8" },
  video:   { Icon: Film,     color: "#a87de8" },
};

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const locale = useLanguageStore((s) => s.locale);
  const [filter, setFilter] = useState<ResourceType | "all">("all");
  const [query, setQuery] = useState("");

  const rawItems = t.raw("items") as {
    id: string;
    type: ResourceType;
    downloads: number;
    en: { title: string; excerpt: string };
    ar: { title: string; excerpt: string };
  }[];

  const filtered = useMemo(() => {
    return rawItems.filter((r) => {
      const matchType = filter === "all" || r.type === filter;
      const q = query.trim().toLowerCase();
      const localData = r[locale];
      const matchQuery = !q || localData.title.toLowerCase().includes(q) || localData.excerpt.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [filter, query, rawItems, locale]);

  type FilterLabelKey = "filterAll" | "filterArticles" | "filterVideos" | "filterPdf";
  const filterButtons: { id: ResourceType | "all"; labelKey: FilterLabelKey }[] = [
    { id: "all",     labelKey: "filterAll" },
    { id: "article", labelKey: "filterArticles" },
    { id: "video",   labelKey: "filterVideos" },
    { id: "pdf",     labelKey: "filterPdf" },
  ];

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-12 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="section-label mb-5">{t("pageBadge")}</span>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
            {t("subtitle")}
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter toolbar */}
        <FadeIn delay={0.05}>
          <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-[#c4854a]/15 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm flex-1">
              <Search
                className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[#c4854a]"
                aria-hidden
              />
              <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="border-[#c4854a]/30 bg-white/5 ps-10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filterButtons.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-lg border px-4 py-1.5 text-sm font-medium transition-all",
                    filter === f.id
                      ? "border-[#c4854a]/60 bg-[#c4854a]/15 text-[#ebd190]"
                      : "border-white/10 bg-white/5 text-slate-400 hover:border-[#c4854a]/30 hover:text-white"
                  )}
                >
                  {t(f.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Grid */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const { Icon, color } = typeConfig[r.type];
            const localData = r[locale];
            const isVideo = r.type === "video";
            return (
              <StaggerItem key={r.id}>
                <article className="glass-card group flex h-full flex-col p-6">
                  {/* Type badge */}
                  <div
                    className="mb-4 flex items-center gap-2 rounded-lg px-3 py-1.5 self-start border text-xs font-bold uppercase tracking-wider"
                    style={{
                      borderColor: `${color}40`,
                      background: `${color}10`,
                      color,
                    }}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {r.type.toUpperCase()}
                  </div>

                  <h2 className="font-heading mb-3 text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#ebd190]">
                    {localData.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-slate-400">{localData.excerpt}</p>

                  {/* Downloads stat */}
                  <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <TrendingDown className="size-3 rotate-180" aria-hidden />
                    {r.downloads.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")} {t("downloadCount")}
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-2 self-start text-sm font-semibold text-[#ebd190] hover:underline"
                  >
                    {isVideo ? (
                      <>
                        <Play className="size-4" aria-hidden />
                        {t("watch")}
                      </>
                    ) : r.type === "article" ? (
                      <>
                        <BookOpen className="size-4" aria-hidden />
                        {t("readNow")}
                      </>
                    ) : (
                      <>
                        <Download className="size-4" aria-hidden />
                        {t("view")}
                      </>
                    )}
                  </button>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
