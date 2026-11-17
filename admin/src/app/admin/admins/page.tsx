"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  Eye, EyeOff, Lock, Mail, Plus, RefreshCw, ShieldCheck, Trash2, User, X,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function AdminsPage() {
  const [admins, setAdmins]     = useState<AdminUser[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError]       = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/admins");
      if (!res.ok) throw new Error("Unauthorized");
      setAdmins(await res.json());
    } catch {
      setError("Failed to load admin accounts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this admin account?")) return;
    setDeleting(id);
    try {
      const res  = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { alert(data.error); return; }
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <AdminShell>
      <div className="p-6 lg:p-10 max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">Admin Users</h1>
            <p className="mt-1 text-sm text-slate-400">Manage who can access the admin panel</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-400 hover:text-white transition"
            >
              <RefreshCw className="size-3.5" /> Refresh
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#9a6c3a] via-[#c4854a] to-[#ebd190] px-4 py-2 text-xs font-bold text-[#0c1a33] transition hover:opacity-90"
            >
              <Plus className="size-4" /> Add Admin
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="border-b border-white/10 bg-white/[0.03]">
              <tr>
                <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-widest text-slate-400">Name</th>
                <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-widest text-slate-400">Email</th>
                <th className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-widest text-slate-400">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#c4854a] border-t-transparent" />
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">No admins found.</td>
                </tr>
              ) : admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#c4854a]/15 text-[#ebd190]">
                        <ShieldCheck className="size-4" />
                      </span>
                      <span className="font-medium text-white">{admin.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{admin.email}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">
                    {new Date(admin.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button
                      onClick={() => handleDelete(admin.id)}
                      disabled={deleting === admin.id}
                      className="rounded-lg p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition disabled:opacity-40"
                      aria-label="Delete"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showModal && (
        <AddAdminModal
          onClose={() => setShowModal(false)}
          onAdded={(a) => { setAdmins((prev) => [...prev, a]); setShowModal(false); }}
        />
      )}
    </AdminShell>
  );
}

/* ─── Add Admin Modal ─────────────────────────────────────────── */
function AddAdminModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: (a: AdminUser) => void;
}) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPass]   = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow]       = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to create admin"); return; }
      onAdded(data);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0c1a33] p-6 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute end-4 top-4 text-slate-500 hover:text-white transition"
        >
          <X className="size-5" />
        </button>

        <h2 className="mb-5 font-heading text-lg font-bold text-[#ebd190]">Add Admin Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <ModalField id="m-name" label="Full Name" type="text" value={name} onChange={setName}
            placeholder="Ahmed Admin" icon={<User className="size-4 text-[#c4854a]" />} />
          <ModalField id="m-email" label="Email" type="email" value={email} onChange={setEmail}
            placeholder="admin@aiaetar.edu.eg" icon={<Mail className="size-4 text-[#c4854a]" />} />

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="m-pass" className="text-xs font-semibold uppercase tracking-widest text-slate-400">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[#c4854a]" />
              <input id="m-pass" type={show ? "text" : "password"} required value={password}
                onChange={(e) => setPass(e.target.value)} placeholder="••••••••"
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 ps-10 pe-10 text-sm text-white placeholder:text-slate-500 focus:border-[#c4854a]/60 focus:outline-none" />
              <button type="button" onClick={() => setShow((s) => !s)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Confirm */}
          <div className="space-y-1.5">
            <label htmlFor="m-confirm" className="text-xs font-semibold uppercase tracking-widest text-slate-400">Confirm Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[#c4854a]" />
              <input id="m-confirm" type={show ? "text" : "password"} required value={confirm}
                onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••"
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 ps-10 pe-4 text-sm text-white placeholder:text-slate-500 focus:border-[#c4854a]/60 focus:outline-none" />
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#9a6c3a] via-[#c4854a] to-[#ebd190] py-3 text-sm font-bold text-[#0c1a33] transition hover:opacity-90 disabled:opacity-60">
            {loading ? "Creating…" : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ModalField({ id, label, type, value, onChange, placeholder, icon }: {
  id: string; label: string; type: string; value: string; onChange: (v: string) => void;
  placeholder?: string; icon: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2">{icon}</span>
        <input id={id} type={type} required value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 ps-10 pe-4 text-sm text-white placeholder:text-slate-500 focus:border-[#c4854a]/60 focus:outline-none" />
      </div>
    </div>
  );
}
