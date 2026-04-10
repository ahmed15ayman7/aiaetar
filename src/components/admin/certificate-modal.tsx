"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import type { CertRow } from "@/app/admin/certificates/page";

type Props = {
  open: boolean;
  initial: CertRow | null;
  onClose: () => void;
  onSaved: () => void;
};

const EMPTY: Omit<CertRow, "id" | "issuedAt"> = {
  traineeId: "",
  certificateNo: "",
  fullName: "",
  accreditationBody: "المعهد الأمريكي للتعليم التطبيقي في السياحة والبحوث الإدارية",
  certificateType: "",
  trainingProgram: "",
  jobTitle: "",
  workplace: "",
  trainingDate: "",
  trainingHours: 16,
};

type FormState = Omit<CertRow, "id" | "issuedAt">;

export function CertificateModal({ open, initial, onClose, onSaved }: Props) {
  const [form, setForm]     = useState<FormState>(EMPTY);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setError("");
      if (initial) {
        setForm({
          traineeId:         initial.traineeId,
          certificateNo:     initial.certificateNo,
          fullName:          initial.fullName,
          accreditationBody: initial.accreditationBody,
          certificateType:   initial.certificateType,
          trainingProgram:   initial.trainingProgram,
          jobTitle:          initial.jobTitle,
          workplace:         initial.workplace,
          trainingDate:      initial.trainingDate.slice(0, 10),
          trainingHours:     initial.trainingHours,
        });
      } else {
        setForm(EMPTY);
      }
    }
  }, [open, initial]);

  function set(key: keyof FormState, val: string | number) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const url  = initial ? `/api/admin/certificates/${initial.id}` : "/api/admin/certificates";
    const method = initial ? "PUT" : "POST";
    const res  = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error ?? "Something went wrong"); return; }
    onSaved();
  }

  if (!open) return null;

  const fields: { key: keyof FormState; label: string; type?: string; arabicLabel?: string }[] = [
    { key: "traineeId",         label: "Trainee ID",          arabicLabel: "مثال: T0001" },
    { key: "certificateNo",     label: "Certificate No.",      arabicLabel: "مثال: C0001" },
    { key: "fullName",          label: "Full Name",            arabicLabel: "الاسم الكامل" },
    { key: "accreditationBody", label: "Accreditation Body",   arabicLabel: "جهة الاعتماد" },
    { key: "certificateType",   label: "Certificate Type",     arabicLabel: "نوع الشهادة" },
    { key: "trainingProgram",   label: "Training Program",     arabicLabel: "البرنامج التدريبي" },
    { key: "jobTitle",          label: "Job Title",            arabicLabel: "الوظيفة" },
    { key: "workplace",         label: "Workplace",            arabicLabel: "جهة العمل" },
    { key: "trainingDate",      label: "Training Date",        type: "date" },
    { key: "trainingHours",     label: "Training Hours",       type: "number", arabicLabel: "عدد الساعات" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-[#ebd190]">
            {initial ? "Edit Certificate" : "Add Certificate"}
          </h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="size-5" />
          </button>
        </div>

        <form id="cert-form" onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(({ key, label, type, arabicLabel }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400">
                  {label}
                  {arabicLabel && <span className="ms-1 text-slate-600">({arabicLabel})</span>}
                </label>
                <input
                  type={type ?? "text"}
                  required
                  value={String(form[key])}
                  onChange={(e) => set(key, type === "number" ? Number(e.target.value) : e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-[#c4854a]/60 focus:outline-none"
                  dir={key === "fullName" || key === "accreditationBody" || key === "trainingProgram" || key === "jobTitle" || key === "workplace" || key === "certificateType" ? "rtl" : "ltr"}
                />
              </div>
            ))}
          </div>

          {error && (
            <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/15 px-5 py-2 text-sm text-slate-400 transition hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="cert-form"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-[#9a6c3a] via-[#c4854a] to-[#ebd190] px-5 py-2 text-sm font-bold text-[#0c1a33] transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Saving…" : initial ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
