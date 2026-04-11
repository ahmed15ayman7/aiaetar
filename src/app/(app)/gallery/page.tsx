"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Loader2,
  Play,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

/* ─── Types ──────────────────────────────────────────────────── */
interface MediaItem {
  id: string;
  url: string;
  type: string;
  description: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function GalleryPage() {
  const t = useTranslations("gallery");

  const [items, setItems]             = useState<MediaItem[]>([]);
  const [loading, setLoading]         = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor]   = useState<string | null>(null);
  const [filter, setFilter]           = useState<"all" | "image" | "video">("all");
  const [lightbox, setLightbox]       = useState<number | null>(null);

  async function fetchItems(cursor?: string, type?: string, reset = false) {
    const params = new URLSearchParams({ take: "24" });
    if (cursor) params.set("cursor", cursor);
    if (type && type !== "all") params.set("type", type);

    const res  = await fetch(`/api/gallery?${params}`);
    const data = await res.json() as { items: MediaItem[]; nextCursor: string | null };

    if (reset) {
      setItems(data.items);
    } else {
      setItems((prev) => [...prev, ...data.items]);
    }
    setNextCursor(data.nextCursor);
  }

  useEffect(() => {
    setLoading(true);
    fetchItems(undefined, filter, true).finally(() => setLoading(false));
  }, [filter]);

  async function handleLoadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    await fetchItems(nextCursor, filter);
    setLoadingMore(false);
  }

  /* Keyboard navigation for lightbox */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowRight") setLightbox((i) => Math.min((i ?? 0) + 1, items.length - 1));
      if (e.key === "ArrowLeft")  setLightbox((i) => Math.max((i ?? 0) - 1, 0));
      if (e.key === "Escape")     setLightbox(null);
    },
    [lightbox, items.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(196,133,74,0.18), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label mb-4 inline-block">{t("badge")}</span>
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-wrap gap-2">
          {(["all", "image", "video"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                "rounded-full px-5 py-1.5 text-sm font-semibold transition capitalize",
                filter === f
                  ? "bg-gold-gradient text-[#0c1a33] shadow-lg"
                  : "border border-white/15 text-slate-400 hover:border-[#c4854a]/40 hover:text-white",
              ].join(" ")}
            >
              {f === "all" ? t("filterAll") : f === "image" ? t("filterPhotos") : t("filterVideos")}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="size-10 animate-spin text-[#c4854a]" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-32 text-slate-500">
            <Images className="size-16 opacity-40" />
            <p className="text-lg">{t("empty")}</p>
          </div>
        ) : (
          <>
            {/* Masonry-like columns grid */}
            <div className="columns-2 gap-4 sm:columns-3 md:columns-4 lg:columns-5 [column-fill:balance]">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
                  className="group mb-4 break-inside-avoid cursor-pointer"
                  onClick={() => setLightbox(idx)}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                    {item.type === "video" ? (
                      <>
                        <video
                          src={item.url}
                          className="w-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/10">
                          <div className="flex size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <Play className="size-5 fill-white text-white" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={item.url}
                        alt={item.description ?? "Gallery image"}
                        width={item.width ?? 400}
                        height={item.height ?? 300}
                        className="w-full object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw, 20vw"
                      />
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
                      {item.description && (
                        <p className="text-xs leading-relaxed text-white line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description below (always visible if present) */}
                  {item.description && (
                    <p className="mt-1.5 px-1 text-xs text-slate-400 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {nextCursor && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-xl border border-white/15 px-8 py-3 text-sm font-semibold text-slate-300 transition hover:border-[#c4854a]/40 hover:text-white disabled:opacity-50"
                >
                  {loadingMore
                    ? <><Loader2 className="inline size-4 animate-spin me-2" />{t("loading")}</>
                    : t("loadMore")}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            items={items}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((i) => Math.max((i ?? 0) - 1, 0))}
            onNext={() => setLightbox((i) => Math.min((i ?? 0) + 1, items.length - 1))}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────── */
function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item      = items[index];
  const hasPrev   = index > 0;
  const hasNext   = index < items.length - 1;
  const videoRef  = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Pause video when navigating away
    return () => { videoRef.current?.pause(); };
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Content */}
      <motion.div
        key={item.id}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.url}
            controls
            autoPlay
            className="max-h-[78vh] max-w-[88vw] rounded-2xl"
          />
        ) : (
          <Image
            src={item.url}
            alt={item.description ?? ""}
            width={item.width ?? 1200}
            height={item.height ?? 800}
            className="max-h-[78vh] w-auto rounded-2xl object-contain"
            priority
          />
        )}

        {item.description && (
          <p className="mt-3 max-w-xl text-center text-sm text-slate-300">
            {item.description}
          </p>
        )}
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute end-4 top-4 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20 transition"
        aria-label="Close"
      >
        <X className="size-5" />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20 transition"
          aria-label="Previous"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm hover:bg-white/20 transition"
          aria-label="Next"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white backdrop-blur-sm">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  );
}
