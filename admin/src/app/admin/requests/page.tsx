"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Reply,
  Search,
  Trash2,
  User,
} from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";

/* ─── Types ──────────────────────────────────────────────────── */
type Status = "new" | "read" | "replied";

interface Request {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: Status;
  notes: string | null;
  createdAt: string;
}

const STATUS_LABELS: Record<Status, string> = {
  new:     "New",
  read:    "Read",
  replied: "Replied",
};

const STATUS_COLORS: Record<Status, string> = {
  new:     "bg-amber-500/15 text-amber-300 border-amber-500/30",
  read:    "bg-blue-500/15 text-blue-300 border-blue-500/30",
  replied: "bg-green-500/15 text-green-300 border-green-500/30",
};

/* ─── Page ───────────────────────────────────────────────────── */
export default function RequestsPage() {
  const [items, setItems]             = useState<Request[]>([]);
  const [loading, setLoading]         = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor]   = useState<string | null>(null);
  const [newCount, setNewCount]       = useState(0);
  const [filter, setFilter]           = useState<"all" | Status>("all");
  const [search, setSearch]           = useState("");
  const [expanded, setExpanded]       = useState<string | null>(null);
  const searchTimer                   = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function load(opts: { cursor?: string; reset?: boolean } = {}) {
    const params = new URLSearchParams({ take: "20" });
    if (filter !== "all") params.set("status", filter);
    if (search.trim()) params.set("q", search.trim());
    if (opts.cursor) params.set("cursor", opts.cursor);

    const res  = await fetch(`/api/admin/requests?${params}`);
    const data = await res.json() as { items: Request[]; nextCursor: string | null; newCount: number };

    setNewCount(data.newCount);
    setNextCursor(data.nextCursor);
    if (opts.reset) {
      setItems(data.items);
    } else {
      setItems((prev) => [...prev, ...data.items]);
    }
  }

  async function initialLoad() {
    setLoading(true);
    try { await load({ reset: true }); }
    finally { setLoading(false); }
  }

  useEffect(() => { initialLoad(); }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced search
  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(initialLoad, 350);
    return () => clearTimeout(searchTimer.current);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleLoadMore() {
    if (!nextCursor || loadingMore) return;
    setLoadingMore(true);
    try { await load({ cursor: nextCursor }); }
    finally { setLoadingMore(false); }
  }

  async function updateRequest(id: string, patch: Partial<Pick<Request, "status" | "notes">>) {
    const res  = await fetch(`/api/admin/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!res.ok) return;
    const updated: Request = await res.json();
    setItems((prev) => prev.map((r) => (r.id === id ? updated : r)));
    if (patch.status) {
      setNewCount((c) => {
        const old = items.find((r) => r.id === id);
        if (old?.status === "new" && patch.status !== "new") return Math.max(0, c - 1);
        if (old?.status !== "new" && patch.status === "new") return c + 1;
        return c;
      });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this request? This cannot be undone.")) return;
    const item = items.find((r) => r.id === id);
    const res  = await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    setItems((prev) => prev.filter((r) => r.id !== id));
    if (item?.status === "new") setNewCount((c) => Math.max(0, c - 1));
  }

  // Auto-mark as read when expanded
  function toggleExpand(id: string) {
    setExpanded((prev) => {
      if (prev === id) return null;
      const item = items.find((r) => r.id === id);
      if (item?.status === "new") updateRequest(id, { status: "read" });
      return id;
    });
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl space-y-6 p-6 lg:p-10">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">
              Requests
              {newCount > 0 && (
                <span className="ms-3 inline-flex items-center rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                  {newCount} new
                </span>
              )}
            </h1>
            <p className="mt-1 text-sm text-slate-400">Contact form submissions from visitors</p>
          </div>
          <button
            onClick={initialLoad}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-400 hover:text-white transition"
          >
            <RefreshCw className="size-3.5" /> Refresh
          </button>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-wrap gap-3">
          {/* Status tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {(["all", "new", "read", "replied"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={[
                  "rounded-xl px-3.5 py-1.5 text-xs font-semibold transition capitalize",
                  filter === s
                    ? "bg-[#c4854a]/20 border border-[#c4854a]/40 text-[#ebd190]"
                    : "border border-white/10 text-slate-400 hover:text-white",
                ].join(" ")}
              >
                {s === "all" ? "All" : STATUS_LABELS[s]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative ms-auto min-w-[200px]">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email…"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-1.5 ps-9 pe-3 text-xs text-white placeholder:text-slate-600 focus:border-[#c4854a]/50 focus:outline-none transition"
            />
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-[#c4854a]" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-slate-500">
            <MessageSquare className="size-12 opacity-40" />
            <p>No requests found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((req) => (
              <RequestCard
                key={req.id}
                req={req}
                expanded={expanded === req.id}
                onToggle={() => toggleExpand(req.id)}
                onStatusChange={(s) => updateRequest(req.id, { status: s })}
                onNotesChange={(n) => updateRequest(req.id, { notes: n })}
                onDelete={() => handleDelete(req.id)}
              />
            ))}

            {nextCursor && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-xl border border-white/10 px-6 py-2 text-sm text-slate-400 hover:text-white transition disabled:opacity-50"
                >
                  {loadingMore ? <Loader2 className="inline size-4 animate-spin me-2" /> : null}
                  Load more
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}

/* ─── Request Card ───────────────────────────────────────────── */
function RequestCard({
  req,
  expanded,
  onToggle,
  onStatusChange,
  onNotesChange,
  onDelete,
}: {
  req: Request;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (s: Status) => void;
  onNotesChange: (n: string) => void;
  onDelete: () => void;
}) {
  const [notes, setNotes]     = useState(req.notes ?? "");
  const [savedNote, setSaved] = useState(false);
  const noteTimer             = useRef<ReturnType<typeof setTimeout>>(undefined);

  function handleNotesBlur() {
    if (notes === (req.notes ?? "")) return;
    onNotesChange(notes.trim() || "");
    setSaved(true);
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setSaved(false), 2000);
  }

  const date = new Date(req.createdAt).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div
      className={[
        "rounded-2xl border transition-all",
        req.status === "new"
          ? "border-amber-500/30 bg-amber-500/5"
          : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
    >
      {/* Summary row */}
      <button
        type="button"
        className="flex w-full items-start gap-4 px-5 py-4 text-start"
        onClick={onToggle}
      >
        {/* Avatar */}
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#c4854a]/15 text-[#c4854a]">
          <User className="size-4" />
        </span>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white">{req.name}</span>
            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[req.status]}`}>
              {STATUS_LABELS[req.status]}
            </span>
          </div>
          <div className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Mail className="size-3" /> {req.email}</span>
            <span className="flex items-center gap-1"><Phone className="size-3" /> {req.phone}</span>
            <span>{date}</span>
          </div>
          {!expanded && (
            <p className="mt-1.5 truncate text-xs text-slate-400">{req.message}</p>
          )}
        </div>

        {/* Expand icon */}
        <span className="mt-1 shrink-0 text-slate-500">
          {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </span>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-white/10 px-5 pb-5 pt-4 space-y-5">
          {/* Full message */}
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-slate-500">Message</p>
            <p className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
              {req.message}
            </p>
          </div>

          {/* Contact quick links */}
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${req.email}`}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:border-[#c4854a]/40 hover:text-[#ebd190] transition"
            >
              <Mail className="size-3.5" /> Reply by email
            </a>
            <a
              href={`tel:${req.phone}`}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:border-[#c4854a]/40 hover:text-[#ebd190] transition"
            >
              <Phone className="size-3.5" /> Call
            </a>
          </div>

          {/* Internal notes */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Internal Notes</p>
              {savedNote && (
                <span className="flex items-center gap-1 text-[10px] text-green-400">
                  <Check className="size-3" /> Saved
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Add private notes visible only to admins…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:border-[#c4854a]/50 focus:outline-none transition resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Status change */}
            <div className="flex gap-2 flex-wrap">
              {(["new", "read", "replied"] as Status[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(s)}
                  disabled={req.status === s}
                  className={[
                    "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition border",
                    req.status === s
                      ? `${STATUS_COLORS[s]} opacity-60 cursor-default`
                      : "border-white/10 text-slate-400 hover:text-white",
                  ].join(" ")}
                >
                  {s === "replied" && <Reply className="size-3" />}
                  {s === "read"    && <CheckCircle2 className="size-3" />}
                  {s === "new"     && <MessageSquare className="size-3" />}
                  Mark as {STATUS_LABELS[s]}
                </button>
              ))}
            </div>

            {/* Delete */}
            <button
              onClick={onDelete}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 transition"
            >
              <Trash2 className="size-3.5" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
