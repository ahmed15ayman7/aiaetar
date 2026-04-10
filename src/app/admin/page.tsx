"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, User } from "lucide-react";

type Mode = "loading" | "login" | "setup";

export default function AdminEntryPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("loading");

  // Detect whether any admin exists to decide which form to show
  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => r.json())
      .then((d) => setMode(d.hasAdmin ? "login" : "setup"))
      .catch(() => setMode("login"));
  }, []);

  if (mode === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c4854a] border-t-transparent" />
      </div>
    );
  }

  return mode === "setup" ? (
    <SetupForm onDone={() => setMode("login")} />
  ) : (
    <LoginForm onSwitchToSetup={() => setMode("setup")} />
  );
}

/* ─────────────────────────────────────────────────────── Login ─── */
function LoginForm({ onSwitchToSetup }: { onSwitchToSetup: () => void }) {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res  = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Login failed"); return; }
      router.push("/admin/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper title="Sign In" subtitle="Welcome back">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          id="login-email" label="Email" type="email"
          value={email} onChange={setEmail}
          placeholder="admin@aiaetar.edu.eg"
          autoComplete="email"
          icon={<Mail className="size-4 text-[#c4854a]" />}
        />
        <PasswordField
          id="login-pass" label="Password"
          value={password} onChange={setPassword}
          show={show} onToggle={() => setShow((s) => !s)}
          autoComplete="current-password"
        />

        {error && <ErrorBox>{error}</ErrorBox>}

        <GoldButton type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </GoldButton>

        <p className="text-center text-xs text-slate-500">
          No account yet?{" "}
          <button
            type="button"
            onClick={onSwitchToSetup}
            className="text-[#c4854a] hover:underline"
          >
            Create admin account
          </button>
        </p>
      </form>
    </PageWrapper>
  );
}

/* ─────────────────────────────────────────────────────── Setup ─── */
function SetupForm({ onDone }: { onDone: () => void }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

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
      if (!res.ok) { setError(data.error ?? "Registration failed"); return; }
      setSuccess(true);
      setTimeout(onDone, 1800);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <PageWrapper title="Account Created!" subtitle="">
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <ShieldCheck className="size-16 text-green-400" />
          <p className="text-sm text-slate-300">
            Admin account created successfully. Redirecting to login…
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Create Admin Account" subtitle="First-time setup">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          id="setup-name" label="Full Name" type="text"
          value={name} onChange={setName}
          placeholder="Ahmed Admin"
          autoComplete="name"
          icon={<User className="size-4 text-[#c4854a]" />}
        />
        <Field
          id="setup-email" label="Email" type="email"
          value={email} onChange={setEmail}
          placeholder="admin@aiaetar.edu.eg"
          autoComplete="email"
          icon={<Mail className="size-4 text-[#c4854a]" />}
        />
        <PasswordField
          id="setup-pass" label="Password"
          value={password} onChange={setPassword}
          show={show} onToggle={() => setShow((s) => !s)}
          autoComplete="new-password"
        />
        <PasswordField
          id="setup-confirm" label="Confirm Password"
          value={confirm} onChange={setConfirm}
          show={show} onToggle={() => setShow((s) => !s)}
          autoComplete="new-password"
        />

        {error && <ErrorBox>{error}</ErrorBox>}

        <GoldButton type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create Account"}
        </GoldButton>

        <p className="text-center text-xs text-slate-500">
          Already have an account?{" "}
          <button type="button" onClick={onDone} className="text-[#c4854a] hover:underline">
            Sign in
          </button>
        </p>
      </form>
    </PageWrapper>
  );
}

/* ─── Shared UI atoms ─────────────────────────────────────────── */
function PageWrapper({ title, subtitle, children }: {
  title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,133,74,0.12), transparent)" }}
        aria-hidden
      />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Image src="/logo.png" alt="AI AETAR" width={72} height={72} className="rounded-full" />
          <h1 className="font-heading text-2xl font-bold text-[#ebd190]">{title}</h1>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, type, value, onChange, placeholder, autoComplete, icon }: {
  id: string; label: string; type: string; value: string; onChange: (v: string) => void;
  placeholder?: string; autoComplete?: string; icon: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          id={id} type={type} required value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 ps-10 pe-4 text-sm text-white placeholder:text-slate-500 focus:border-[#c4854a]/60 focus:outline-none"
        />
      </div>
    </div>
  );
}

function PasswordField({ id, label, value, onChange, show, onToggle, autoComplete }: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void; autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[#c4854a]" />
        <input
          id={id} type={show ? "text" : "password"} required
          autoComplete={autoComplete} value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 ps-10 pe-10 text-sm text-white placeholder:text-slate-500 focus:border-[#c4854a]/60 focus:outline-none"
        />
        <button
          type="button" onClick={onToggle}
          className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          aria-label={show ? "Hide" : "Show"}
        >
          {show
            ? <EyeOff className="size-4" />
            : <Eye className="size-4" />}
        </button>
      </div>
    </div>
  );
}

function GoldButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="w-full rounded-xl bg-gradient-to-r from-[#9a6c3a] via-[#c4854a] to-[#ebd190] py-3 text-sm font-bold text-[#0c1a33] transition hover:opacity-90 disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function ErrorBox({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
      {children}
    </p>
  );
}
