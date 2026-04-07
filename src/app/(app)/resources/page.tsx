"use client";

import { BookOpen, FileText, Film, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

type ResourceType = "article" | "video" | "pdf";

const resources: {
  id: string;
  title: string;
  type: ResourceType;
  excerpt: string;
}[] = [
  {
    id: "r1",
    title: "Destination Resilience Playbook",
    type: "pdf",
    excerpt: "Frameworks for sustainable tourism recovery.",
  },
  {
    id: "r2",
    title: "Service Excellence in Hospitality",
    type: "article",
    excerpt: "Operational insights from leading hotel groups.",
  },
  {
    id: "r3",
    title: "ISO Readiness Workshop Recording",
    type: "video",
    excerpt: "Recorded session on documentation and audits.",
  },
  {
    id: "r4",
    title: "Administrative Research Methods",
    type: "pdf",
    excerpt: "Applied research toolkit for managers.",
  },
];

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const [filter, setFilter] = useState<ResourceType | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchType = filter === "all" || r.type === filter;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [filter, query]);

  const filterButtons: {
    id: ResourceType | "all";
    label: string;
  }[] = [
    { id: "all", label: t("filterAll") },
    { id: "article", label: t("filterArticles") },
    { id: "video", label: t("filterVideos") },
    { id: "pdf", label: t("filterPdf") },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <FadeIn>
        <h1 className="font-heading mb-8 text-center text-4xl font-bold text-white">
          {t("title")}
        </h1>
      </FadeIn>

      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[#b98251]"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="border-[#b98251]/40 bg-white/5 ps-10 text-white placeholder:text-slate-400"
            aria-label={t("searchPlaceholder")}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((f) => (
            <Button
              key={f.id}
              type="button"
              variant={filter === f.id ? "secondary" : "outline"}
              size="sm"
              className={cn(
                "border-[#b98251]/40",
                filter === f.id && "bg-[#b98251]/20 text-white"
              )}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r, i) => (
          <FadeIn key={r.id} delay={i * 0.05}>
            <li>
              <article className="glass-card flex h-full flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-[#ebd190]">
                  {r.type === "pdf" && (
                    <FileText className="size-6" aria-hidden />
                  )}
                  {r.type === "article" && (
                    <BookOpen className="size-6" aria-hidden />
                  )}
                  {r.type === "video" && <Film className="size-6" aria-hidden />}
                  <span className="text-xs uppercase tracking-wide">
                    {r.type}
                  </span>
                </div>
                <h2 className="font-heading text-lg font-semibold text-white">
                  {r.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-slate-300">
                  {r.excerpt}
                </p>
                <button
                  type="button"
                  className="mt-4 text-start text-sm font-medium text-[#ebd190] hover:underline"
                >
                  {t("view")}
                </button>
              </article>
            </li>
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}
