"use client";

import {
  BarChart3,
  FileSpreadsheet,
  Images,
  LogOut,
  Menu,
  MessageSquare,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/admin/dashboard",     label: "Dashboard",   Icon: BarChart3,      badge: false },
  { href: "/admin/certificates",  label: "Certificates", Icon: FileSpreadsheet, badge: false },
  { href: "/admin/gallery",       label: "Gallery",     Icon: Images,         badge: false },
  { href: "/admin/requests",      label: "Requests",    Icon: MessageSquare,  badge: true  },
  { href: "/admin/admins",        label: "Admin Users", Icon: Users,          badge: false },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname        = usePathname();
  const router          = useRouter();
  const [open, setOpen] = useState(false);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    fetch("/api/admin/requests/count")
      .then((r) => r.json())
      .then((d) => setNewCount(d.count ?? 0))
      .catch(() => {});

    // Poll every 60 s while admin is active
    const id = setInterval(() => {
      fetch("/api/admin/requests/count")
        .then((r) => r.json())
        .then((d) => setNewCount(d.count ?? 0))
        .catch(() => {});
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  function NavItem({
    href, label, Icon, badge, onClick,
  }: {
    href: string; label: string; Icon: React.ElementType; badge: boolean; onClick?: () => void;
  }) {
    const active = pathname.startsWith(href);
    return (
      <Link
        href={href}
        onClick={onClick}
        className={[
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
          active ? "bg-[#c4854a]/15 text-[#ebd190]" : "text-slate-400 hover:bg-white/5 hover:text-white",
        ].join(" ")}
      >
        <Icon className="size-4 shrink-0" aria-hidden />
        <span className="flex-1">{label}</span>
        {badge && newCount > 0 && (
          <span className="flex min-w-[18px] items-center justify-center rounded-full bg-amber-500 px-1 py-0.5 text-[10px] font-bold leading-none text-black">
            {newCount > 99 ? "99+" : newCount}
          </span>
        )}
      </Link>
    );
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
          {navLinks.map((link) => (
            <NavItem key={link.href} {...link} />
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
        <div className="flex items-center gap-2">
          {newCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-black">
              {newCount}
            </span>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
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
              {navLinks.map((link) => (
                <NavItem key={link.href} {...link} onClick={() => setOpen(false)} />
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
