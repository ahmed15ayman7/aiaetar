"use client";

import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Film,
  Search,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { GoldDivider } from "@/components/ui/gold-divider";
import { Input } from "@/components/ui/input";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

type ResourceType = "article" | "video" | "pdf";

const resources: {
  id: string;
  title: string;
  type: ResourceType;
  excerpt: string;
  tag: string;
}[] = [
  {
    id: "r1",
    title: "Destination Resilience Playbook",
    type: "pdf",
    excerpt: "A comprehensive framework for sustainable tourism recovery in the post-pandemic era.",
    tag: "Tourism",
  },
  {
    id: "r2",
    title: "Service Excellence in Hospitality",
    type: "article",
    excerpt: "Operational insights gathered from leading five-star hotel groups across the region.",
    tag: "Hospitality",
  },
  {
    id: "r3",
    title: "ISO Readiness Workshop — Full Recording",
    type: "video",
    excerpt: "Step-by-step walkthrough of documentation, internal audits, and management review cycles.",
    tag: "Quality",
  },
  {
    id: "r4",
    title: "Administrative Research Methods",
    type: "pdf",
    excerpt: "Applied research toolkit covering survey design, analysis, and reporting for managers.",
    tag: "Research",
  },
  {
    id: "r5",
    title: "Tourism Trends 2026 — Annual Report",
    type: "article",
    excerpt: "Key indicators, emerging markets, and strategy recommendations for the coming year.",
    tag: "Tourism",
  },
  {
    id: "r6",
    title: "Train-the-Trainer Certification Guide",
    type: "pdf",
    excerpt: "Instructional design principles, facilitation skills, and competency assessment tools.",
    tag: "Training",
  },
];

const typeConfig: Record<ResourceType, { Icon: React.ElementType; color: string; label: string }> = {
  pdf:     { Icon: FileText, color: "#c4854a", label: "PDF" },
  article: { Icon: BookOpen, color: "#7db3e8", label: "Article" },
  video:   { Icon: Film,     color: "#a87de8", label: "Video" },
};

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const [filter, setFilter] = useState<ResourceType | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchType = filter === "all" || r.type === filter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q || r.title.toLowerCase().includes(q) || r.excerpt.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [filter, query]);

  const filterButtons: { id: ResourceType | "all"; label: string }[] = [
    { id: "all",     label: t("filterAll") },
    { id: "article", label: t("filterArticles") },
    { id: "video",   label: t("filterVideos") },
    { id: "pdf",     label: t("filterPdf") },
  ];

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 pb-12 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="section-label mb-5">Knowledge Hub</span>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-300">
            Download research reports, watch recorded sessions, and read practitioner
            articles — all curated for tourism and administrative professionals.
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
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Grid */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => {
            const { Icon, color, label } = typeConfig[r.type];
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
                    {label}
                  </div>

                  {/* Tag */}
                  <span className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#c4854a]/70">
                    {r.tag}
                  </span>

                  <h2 className="font-heading mb-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#ebd190]">
                    {r.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-slate-400">{r.excerpt}</p>

                  <button
                    type="button"
                    className="mt-5 flex items-center gap-2 self-start text-sm font-semibold text-[#ebd190] hover:underline"
                  >
                    {r.type === "video" ? (
                      <>
                        <ExternalLink className="size-4" aria-hidden />
                        Watch
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
