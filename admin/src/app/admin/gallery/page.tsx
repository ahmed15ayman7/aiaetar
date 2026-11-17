"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  RefreshCw,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";

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

interface PendingFile {
  file: File;
  preview: string;
  status: "idle" | "uploading" | "done" | "error";
  error?: string;
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function AdminGalleryPage() {
  const [items, setItems]           = useState<MediaItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [pending, setPending]       = useState<PendingFile[]>([]);
  const [uploading, setUploading]   = useState(false);
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Load existing media */
  async function load(cursor?: string, type?: string) {
    const params = new URLSearchParams({ take: "30" });
    if (cursor) params.set("cursor", cursor);
    if (type && type !== "all") params.set("type", type);

    const res  = await fetch(`/api/admin/media?${params}`);
    const data = await res.json();
    return data as { items: MediaItem[]; nextCursor: string | null };
  }

  async function initialLoad() {
    setLoading(true);
    try {
      const data = await load(undefined, filterType);
      setItems(data.items);
      setNextCursor(data.nextCursor);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await load(nextCursor, filterType);
      setItems((prev) => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
    } finally {
      setLoadingMore(false);
    }
  }

  useEffect(() => { initialLoad(); }, [filterType]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Pick files */
  function onFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const newPending: PendingFile[] = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      status: "idle",
    }));
    setPending((prev) => [...prev, ...newPending]);
    e.target.value = "";
  }

  function removePending(idx: number) {
    setPending((prev) => {
      URL.revokeObjectURL(prev[idx].preview);
      return prev.filter((_, i) => i !== idx);
    });
  }

  /* Upload all pending */
  const handleUpload = useCallback(async () => {
    const toUpload = pending.filter((p) => p.status === "idle");
    if (!toUpload.length) return;
    setUploading(true);

    // Upload in batches of 5
    const batchSize = 5;
    for (let i = 0; i < toUpload.length; i += batchSize) {
      const batch = toUpload.slice(i, i + batchSize);
      const form  = new FormData();
      batch.forEach((p) => form.append("files", p.file));

      // Mark batch as uploading
      setPending((prev) =>
        prev.map((p) =>
          batch.some((b) => b.file === p.file)
            ? { ...p, status: "uploading" }
            : p
        )
      );

      try {
        const res  = await fetch("/api/admin/media/upload", { method: "POST", body: form });
        const data = await res.json();

        // Mark done / error
        setPending((prev) =>
          prev.map((p) => {
            const match = batch.find((b) => b.file === p.file);
            if (!match) return p;
            const failed = data.errors?.find((e: string) => e.startsWith(p.file.name));
            return { ...p, status: failed ? "error" : "done", error: failed };
          })
        );

        if (data.uploaded?.length) {
          setItems((prev) => [...(data.uploaded as MediaItem[]), ...prev]);
        }
      } catch {
        setPending((prev) =>
          prev.map((p) =>
            batch.some((b) => b.file === p.file) ? { ...p, status: "error", error: "Network error" } : p
          )
        );
      }
    }
    setUploading(false);
  }, [pending]);

  /* Clear finished pending */
  function clearDone() {
    setPending((prev) => {
      prev.filter((p) => p.status === "done").forEach((p) => URL.revokeObjectURL(p.preview));
      return prev.filter((p) => p.status !== "done");
    });
  }

  /* Delete media item */
  async function handleDelete(id: string) {
    if (!confirm("Delete this media item? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((m) => m.id !== id));
  }

  const filteredItems = items.filter((m) =>
    filterType === "all" ? true : m.type === filterType
  );

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">Gallery</h1>
            <p className="mt-1 text-sm text-slate-400">Upload and manage photos & videos</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={initialLoad}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-400 hover:text-white transition"
            >
              <RefreshCw className="size-3.5" /> Refresh
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9a6c3a] via-[#c4854a] to-[#ebd190] px-4 py-2 text-xs font-bold text-[#0c1a33] hover:opacity-90 transition"
            >
              <ImagePlus className="size-4" /> Select Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={onFilePick}
            />
          </div>
        </div>

        {/* Pending uploads */}
        {pending.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">
                Selected files <span className="text-slate-400 font-normal">({pending.length})</span>
              </h2>
              <div className="flex gap-2">
                {pending.some((p) => p.status === "done") && (
                  <button
                    onClick={clearDone}
                    className="text-xs text-slate-500 hover:text-slate-300 transition"
                  >
                    Clear done
                  </button>
                )}
                <button
                  onClick={handleUpload}
                  disabled={uploading || !pending.some((p) => p.status === "idle")}
                  className="flex items-center gap-1.5 rounded-xl bg-[#c4854a]/15 border border-[#c4854a]/30 px-4 py-1.5 text-xs font-semibold text-[#ebd190] hover:bg-[#c4854a]/25 transition disabled:opacity-50"
                >
                  {uploading
                    ? <><Loader2 className="size-3.5 animate-spin" /> Uploading…</>
                    : <><Upload className="size-3.5" /> Upload All</>}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {pending.map((p, idx) => (
                <PendingCard key={idx} item={p} onRemove={() => removePending(idx)} />
              ))}
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(["all", "image", "video"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={[
                "rounded-xl px-4 py-1.5 text-xs font-semibold transition capitalize",
                filterType === t
                  ? "bg-[#c4854a]/20 border border-[#c4854a]/40 text-[#ebd190]"
                  : "border border-white/10 text-slate-400 hover:text-white",
              ].join(" ")}
            >
              {t === "all" ? "All" : t === "image" ? "Photos" : "Videos"}
            </button>
          ))}
        </div>

        {/* Media grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="size-8 animate-spin text-[#c4854a]" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center text-slate-500">
            <ImagePlus className="size-12 opacity-40" />
            <p>No media yet. Select files above to upload.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredItems.map((item) => (
                <MediaCard key={item.id} item={item} onDelete={handleDelete} />
              ))}
            </div>

            {nextCursor && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="rounded-xl border border-white/10 px-6 py-2 text-sm text-slate-400 hover:text-white transition disabled:opacity-50"
                >
                  {loadingMore ? <Loader2 className="size-4 animate-spin inline me-2" /> : null}
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AdminShell>
  );
}

/* ─── Pending card ───────────────────────────────────────────── */
function PendingCard({ item, onRemove }: { item: PendingFile; onRemove: () => void }) {
  const isVideo = item.file.type.startsWith("video/");

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/30">
      {isVideo ? (
        <video src={item.preview} className="h-full w-full object-cover" muted playsInline />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.preview} alt="" className="h-full w-full object-cover" />
      )}

      {/* Status overlay */}
      {item.status === "uploading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <Loader2 className="size-6 animate-spin text-[#c4854a]" />
        </div>
      )}
      {item.status === "done" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <CheckCircle2 className="size-6 text-green-400" />
        </div>
      )}
      {item.status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 px-2">
          <p className="text-center text-[10px] text-red-300">{item.error ?? "Error"}</p>
        </div>
      )}

      {/* Remove button */}
      {item.status === "idle" && (
        <button
          onClick={onRemove}
          className="absolute end-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition group-hover:opacity-100"
        >
          <X className="size-3" />
        </button>
      )}

      <p className="absolute bottom-0 start-0 end-0 truncate bg-black/60 px-1.5 py-0.5 text-[10px] text-slate-300">
        {item.file.name}
      </p>
    </div>
  );
}

/* ─── Saved media card ───────────────────────────────────────── */
function MediaCard({
  item,
  onDelete,
}: {
  item: MediaItem;
  onDelete: (id: string) => void;
}) {
  const [desc, setDesc]     = useState(item.description ?? "");
  const [saved, setSaved]   = useState(false);
  const [saving, setSaving] = useState(false);
  const timerRef            = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function saveDescription(value: string) {
    if (value === (item.description ?? "")) return;
    setSaving(true);
    try {
      await fetch(`/api/admin/media/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: value.trim() || null }),
      });
      item.description = value.trim() || null;
      setSaved(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="group flex flex-col gap-1.5">
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/30">
        {item.type === "video" ? (
          <video
            src={item.url}
            className="h-full w-full object-cover"
            muted
            playsInline
            onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
            onMouseOut={(e) => { (e.currentTarget as HTMLVideoElement).pause(); (e.currentTarget as HTMLVideoElement).currentTime = 0; }}
          />
        ) : (
          <Image
            src={item.url}
            alt={item.description ?? ""}
            fill
            sizes="(max-width:640px) 50vw,(max-width:1024px) 25vw, 16vw"
            className="object-cover transition group-hover:scale-105"
          />
        )}

        {/* Delete button */}
        <button
          onClick={() => onDelete(item.id)}
          className="absolute end-1.5 top-1.5 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600/80"
          aria-label="Delete"
        >
          <Trash2 className="size-3.5" />
        </button>

        {item.type === "video" && (
          <span className="absolute start-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            VIDEO
          </span>
        )}
      </div>

      {/* Description input */}
      <div className="relative">
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={(e) => saveDescription(e.target.value)}
          placeholder="Add description…"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white placeholder:text-slate-600 focus:border-[#c4854a]/50 focus:outline-none transition"
        />
        {saving && (
          <Loader2 className="absolute end-2 top-1/2 size-3 -translate-y-1/2 animate-spin text-[#c4854a]" />
        )}
        {saved && !saving && (
          <CheckCircle2 className="absolute end-2 top-1/2 size-3 -translate-y-1/2 text-green-400" />
        )}
      </div>
    </div>
  );
}
