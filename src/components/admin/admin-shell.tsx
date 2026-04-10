"use client";

import {
  BarChart3,
  FileSpreadsheet,
  LogOut,
  Menu,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/admin/dashboard",     label: "Dashboard",     Icon: BarChart3 },
  { href: "/admin/certificates",  label: "Certificates",  Icon: FileSpreadsheet },
  { href: "/admin/admins",        label: "Admin Users",   Icon: Users },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden w-56 shrink-0 flex-col border-e border-white/10 bg-[#08152a] lg:flex">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
          <Image src="/logo.png" alt="AI AETAR" width={36} height={36} className="rounded-full" />
          <span className="font-heading text-xs font-bold leading-tight text-[#ebd190]">
            AI AETAR<br /><span className="text-slate-400 font-normal">Admin</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                pathname.startsWith(href)
                  ? "bg-[#c4854a]/15 text-[#ebd190]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="size-4 shrink-0" aria-hidden />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile header ── */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#08152a]/95 px-4 py-3 backdrop-blur-sm lg:hidden">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-[#c4854a]" aria-hidden />
          <span className="font-heading text-sm font-bold text-[#ebd190]">Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-slate-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            className="absolute start-0 top-0 h-full w-56 bg-[#08152a] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-2.5 pb-4 border-b border-white/10">
              <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" />
              <span className="font-heading text-xs font-bold text-[#ebd190]">AI AETAR Admin</span>
            </div>
            <nav className="space-y-1">
              {navLinks.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                    pathname.startsWith(href)
                      ? "bg-[#c4854a]/15 text-[#ebd190]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </Link>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white"
              >
                <LogOut className="size-4" aria-hidden />
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
