"use client";

import { BarChart3, FileSpreadsheet, RefreshCw, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";

type Stats = {
  total: number;
  recentCount: number;
  programBreakdown: { trainingProgram: string; _count: { _all: number } }[];
  recent: {
    id: string;
    traineeId: string;
    certificateNo: string;
    fullName: string;
    trainingProgram: string;
    issuedAt: string;
  }[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/stats");
    if (res.status === 401) { router.push("/admin"); return; }
    const data = await res.json();
    setStats(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AdminShell>
      <div className="p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-400">Certificate management overview</p>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} aria-hidden />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-white/5" />
            ))}
          </div>
        ) : stats ? (
          <>
            {/* Stat cards */}
            <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                Icon={FileSpreadsheet}
                label="Total Certificates"
                value={stats.total.toLocaleString()}
                color="#c4854a"
              />
              <StatCard
                Icon={Users2}
                label="Added This Month"
                value={stats.recentCount.toLocaleString()}
                color="#7db3e8"
              />
              <StatCard
                Icon={BarChart3}
                label="Distinct Programs"
                value={stats.programBreakdown.length.toString()}
                color="#a87de8"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Top programs */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-[#ebd190]">
                  Top Programs
                </h2>
                <ul className="space-y-3">
                  {stats.programBreakdown.map((p) => (
                    <li key={p.trainingProgram} className="flex items-center justify-between gap-4">
                      <span className="truncate text-sm text-slate-300">{p.trainingProgram}</span>
                      <span className="shrink-0 rounded-full border border-[#c4854a]/30 bg-[#c4854a]/10 px-2.5 py-0.5 text-xs font-bold text-[#ebd190]">
                        {p._count._all}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent additions */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h2 className="mb-4 font-heading text-sm font-bold uppercase tracking-widest text-[#ebd190]">
                  Recent Additions
                </h2>
                <ul className="space-y-3">
                  {stats.recent.map((c) => (
                    <li key={c.id} className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{c.fullName}</p>
                        <p className="text-xs text-slate-500">{c.certificateNo} · {c.trainingProgram}</p>
                      </div>
                      <time className="shrink-0 text-xs text-slate-500">
                        {new Date(c.issuedAt).toLocaleDateString("en-GB")}
                      </time>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/admin/certificates"
                  className="mt-4 block text-center text-xs font-semibold text-[#c4854a] hover:underline"
                >
                  View all certificates →
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}

function StatCard({ Icon, label, value, color }: {
  Icon: React.ElementType; label: string; value: string; color: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <Icon className="size-6" style={{ color }} aria-hidden />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
}
