"use client";

import {
  BadgeCheck,
  CalendarDays,
  Clock,
  FileText,
  MapPin,
  Search,
  ShieldAlert,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { GoldDivider } from "@/components/ui/gold-divider";
import { FadeIn } from "@/components/ui/motion";

type Certificate = {
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

export default function VerifyPage() {
  const tMeta = useTranslations("meta");
  const [query, setQuery]       = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "found" | "notfound">("idle");
  const [cert, setCert]         = useState<Certificate | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setStatus("loading");
    setCert(null);
    const res = await fetch(`/api/verify?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (data.found) {
      setCert(data.certificate);
      setStatus("found");
    } else {
      setStatus("notfound");
    }
  }

  return (
    <div className="py-16">
      {/* Header */}
      <div className="mx-auto max-w-3xl px-4 pb-12 text-center sm:px-6">
        <FadeIn>
          <span className="section-label mb-5">Certificate Verification | التحقق من الشهادة</span>
          <h1 className="font-heading mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            Verify Certificate
          </h1>
          <p className="mt-2 font-heading text-2xl text-[#ebd190]">التحقق من صحة الشهادة</p>
          <GoldDivider className="mx-auto mt-5 max-w-xs" />
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-slate-300">
            Enter the <strong className="text-white">Certificate Number</strong> (e.g. C0001) or{" "}
            <strong className="text-white">Trainee ID</strong> (e.g. T0001) to verify authenticity.
          </p>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed" dir="rtl">
            أدخل <strong className="text-white">رقم الشهادة</strong> (مثال: C0001) أو{" "}
            <strong className="text-white">رقم المتدرب</strong> (مثال: T0001) للتحقق من صحة الشهادة.
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Search form */}
        <FadeIn delay={0.1}>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-[#c4854a]"
                aria-hidden
              />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="C0001  or  T0001"
                className="w-full rounded-2xl border border-white/15 bg-white/5 py-4 ps-12 pe-5 text-base text-white placeholder:text-slate-500 focus:border-[#c4854a]/60 focus:outline-none"
                aria-label="Certificate number or trainee ID"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-2xl bg-gradient-to-r from-[#9a6c3a] via-[#c4854a] to-[#ebd190] px-6 text-base font-bold text-[#0c1a33] transition hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "…" : "Verify"}
            </button>
          </form>
        </FadeIn>

        {/* Results */}
        {status === "notfound" && (
          <FadeIn className="mt-8">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-8 py-10 text-center">
              <ShieldAlert className="size-16 text-red-400" aria-hidden />
              <div>
                <p className="font-heading text-xl font-bold text-red-300">Certificate Not Found</p>
                <p className="mt-1 text-sm text-red-400">لم يتم العثور على الشهادة</p>
              </div>
              <p className="max-w-sm text-sm text-slate-400">
                No record was found for <strong className="text-white">{query}</strong>.
                Please check the number and try again.
              </p>
            </div>
          </FadeIn>
        )}

        {status === "found" && cert && (
          <FadeIn className="mt-8">
            {/* Valid banner */}
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-green-500/40 bg-green-500/10 px-5 py-4">
              <BadgeCheck className="size-8 shrink-0 text-green-400" aria-hidden />
              <div>
                <p className="font-heading font-bold text-green-300">Certificate is Authentic</p>
                <p className="text-sm text-green-400">هذه الشهادة أصيلة وصادرة عن المعهد</p>
              </div>
            </div>

            {/* Certificate card */}
            <div className="overflow-hidden rounded-2xl border border-[#c4854a]/30 bg-white/[0.04] shadow-2xl">
              {/* Gold top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#9a6c3a] via-[#ebd190] to-[#9a6c3a]" />

              {/* Seal header */}
              <div className="flex flex-col items-center gap-2 border-b border-white/10 px-6 py-6 text-center">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-[#c4854a]">
                  {tMeta("siteName")}
                </p>
                <p className="font-heading text-2xl font-extrabold text-[#ebd190]">{cert.certificateType}</p>
                <p className="font-heading text-sm text-slate-300">{cert.trainingProgram}</p>
              </div>

              {/* Details grid */}
              <div className="grid gap-0 sm:grid-cols-2">
                <Detail icon={User} label="Full Name | الاسم" value={cert.fullName} dir="rtl" />
                <Detail icon={FileText} label="Certificate No. | رقم الشهادة" value={cert.certificateNo} />
                <Detail icon={FileText} label="Trainee ID | رقم المتدرب" value={cert.traineeId} />
                <Detail icon={MapPin} label="Workplace | جهة العمل" value={cert.workplace} dir="rtl" />
                <Detail icon={MapPin} label="Job Title | الوظيفة" value={cert.jobTitle} dir="rtl" />
                <Detail icon={CalendarDays} label="Training Date | تاريخ التدريب" value={new Date(cert.trainingDate).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })} />
                <Detail icon={Clock} label="Training Hours | ساعات التدريب" value={`${cert.trainingHours} hrs`} />
                <Detail icon={BadgeCheck} label="Accredited By | جهة الاعتماد" value={cert.accreditationBody} dir="rtl" />
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 px-6 py-4 text-center">
                <p className="text-xs text-slate-500">
                  Verified on {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
                  {" · "}
                  تم التحقق بتاريخ {new Date().toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
  dir,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  dir?: "rtl" | "ltr";
}) {
  return (
    <div className="flex items-start gap-3 border-b border-white/5 px-5 py-4 last:border-0">
      <Icon className="mt-0.5 size-4 shrink-0 text-[#c4854a]" aria-hidden />
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-white" dir={dir}>
          {value}
        </p>
      </div>
    </div>
  );
}
