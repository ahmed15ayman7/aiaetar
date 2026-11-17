"use client";

import {
  Download,
  Edit2,
  FileUp,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { CertificateModal } from "@/components/admin/certificate-modal";

export type CertRow = {
  id: string;
  traineeId: string;
  certificateNo: string;
  fullName: string;
  accreditationBody: string;
  certificateType: string;
  trainingProgram: string;
  jobTitle: string;
  workplace: string;
  trainingDate: string;
  trainingHours: number;
  issuedAt: string;
};

export default function CertificatesPage() {
  const router = useRouter();
  const [items, setItems]         = useState<CertRow[]>([]);
  const [total, setTotal]         = useState(0);
  const [page, setPage]           = useState(1);
  const [query, setQuery]         = useState("");
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<CertRow | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const LIMIT = 20;

  const load = useCallback(async (p = 1, q = query) => {
    setLoading(true);
    const res = await fetch(`/api/admin/certificates?page=${p}&limit=${LIMIT}&q=${encodeURIComponent(q)}`);
    if (res.status === 401) { router.push("/admin"); return; }
    const data = await res.json();
    setItems(data.items);
    setTotal(data.total);
    setPage(p);
    setLoading(false);
  }, [query, router]);

  useEffect(() => { load(1); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    load(1, query);
  }

  function openAdd() { setSelected(null); setModalOpen(true); }
  function openEdit(c: CertRow) { setSelected(c); setModalOpen(true); }

  async function handleDelete(id: string) {
    if (!confirm("Delete this certificate?")) return;
    await fetch(`/api/admin/certificates/${id}`, { method: "DELETE" });
    load(page);
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportMsg("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/import", { method: "POST", body: fd });
    const data = await res.json();
    setImportMsg(`✅ ${data.created} upserted${data.skipped ? `, ${data.skipped} skipped` : ""}.`);
    setImporting(false);
    if (fileRef.current) fileRef.current.value = "";
    load(1);
  }

  function handleExport() {
    window.open(`/api/admin/export?q=${encodeURIComponent(query)}`, "_blank");
  }

  const pages = Math.ceil(total / LIMIT);

  return (
    <AdminShell>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">Certificates</h1>
            <p className="mt-1 text-sm text-slate-400">{total.toLocaleString()} records</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Import */}
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10">
              <FileUp className="size-4" aria-hidden />
              {importing ? "Importing…" : "Import Excel"}
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={handleImport}
                disabled={importing}
              />
            </label>
            {/* Export */}
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
            >
              <Download className="size-4" aria-hidden />
              Export Excel
            </button>
            {/* Add */}
            <button
              type="button"
              onClick={openAdd}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9a6c3a] via-[#c4854a] to-[#ebd190] px-4 py-2 text-sm font-bold text-[#0c1a33] transition hover:opacity-90"
            >
              <Plus className="size-4" aria-hidden />
              Add Certificate
            </button>
          </div>
        </div>

        {/* Import message */}
        {importMsg && (
          <div className="mb-4 flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-300">
            {importMsg}
            <button type="button" onClick={() => setImportMsg("")}><X className="size-4" /></button>
          </div>
        )}

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[#c4854a]" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, certificate no, trainee ID…"
              className="w-full rounded-xl border border-white/15 bg-white/5 py-2 ps-10 pe-4 text-sm text-white placeholder:text-slate-500 focus:border-[#c4854a]/60 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl border border-[#c4854a]/40 bg-[#c4854a]/15 px-4 py-2 text-sm font-semibold text-[#ebd190] hover:bg-[#c4854a]/25"
          >
            Search
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                {["Trainee ID", "Cert No.", "Full Name", "Program", "Type", "Date", "Hours", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-start text-xs font-bold uppercase tracking-widest text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 animate-pulse rounded bg-white/5" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                    No certificates found
                  </td>
                </tr>
              ) : (
                items.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                    <td className="px-4 py-3 font-mono text-xs text-[#c4854a]">{c.traineeId}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#ebd190]">{c.certificateNo}</td>
                    <td className="px-4 py-3 font-medium text-white">{c.fullName}</td>
                    <td className="px-4 py-3 text-slate-300">{c.trainingProgram}</td>
                    <td className="px-4 py-3 text-slate-400">{c.certificateType}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {new Date(c.trainingDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{c.trainingHours}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(c)}
                          className="rounded-lg border border-white/15 p-1.5 text-slate-400 transition hover:border-[#c4854a]/40 hover:text-[#ebd190]"
                          aria-label="Edit"
                        >
                          <Edit2 className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(c.id)}
                          className="rounded-lg border border-white/15 p-1.5 text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
                          aria-label="Delete"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => load(page - 1)}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-400 transition hover:border-[#c4854a]/40 hover:text-[#ebd190] disabled:opacity-40"
            >
              ← Prev
            </button>
            <span className="text-xs text-slate-500">
              Page {page} of {pages}
            </span>
            <button
              type="button"
              disabled={page >= pages}
              onClick={() => load(page + 1)}
              className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-400 transition hover:border-[#c4854a]/40 hover:text-[#ebd190] disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit modal */}
      <CertificateModal
        open={modalOpen}
        initial={selected}
        onClose={() => setModalOpen(false)}
        onSaved={() => { setModalOpen(false); load(page); }}
      />
    </AdminShell>
  );
}
