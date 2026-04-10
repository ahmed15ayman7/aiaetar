import * as XLSX from "xlsx";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/* Column header map (matches the Excel format shown in the UI) */
const HEADERS: Record<string, string> = {
  "ID المتدرب":          "traineeId",
  "رقم الشهادة":         "certificateNo",
  "الاسم الكامل":        "fullName",
  "جهة الاعتماد":        "accreditationBody",
  "نوع الشهادة":         "certificateType",
  "البرنامج التدريبي":   "trainingProgram",
  "الوظيفة":             "jobTitle",
  "جهة العمل":           "workplace",
  "تاريخ التدريب":       "trainingDate",
  "عدد ساعات التدريب":   "trainingHours",
};

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) return Response.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const wb = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { raw: false, dateNF: "yyyy-mm-dd" });

  let created = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const row of rows) {
    try {
      // Map Arabic headers to field names
      const mapped: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(row)) {
        const field = HEADERS[key.trim()] ?? key.trim();
        mapped[field] = val;
      }

      // Parse date
      let trainingDate: Date;
      const rawDate = mapped.trainingDate as string | Date;
      if (rawDate instanceof Date) {
        trainingDate = rawDate;
      } else {
        trainingDate = new Date(rawDate);
      }
      if (isNaN(trainingDate.getTime())) {
        errors.push(`Row skipped — invalid date: ${JSON.stringify(rawDate)}`);
        skipped++;
        continue;
      }

      await prisma.certificate.upsert({
        where: { certificateNo: String(mapped.certificateNo).trim() },
        update: {
          traineeId:         String(mapped.traineeId ?? "").trim(),
          fullName:          String(mapped.fullName ?? "").trim(),
          accreditationBody: String(mapped.accreditationBody ?? "").trim(),
          certificateType:   String(mapped.certificateType ?? "").trim(),
          trainingProgram:   String(mapped.trainingProgram ?? "").trim(),
          jobTitle:          String(mapped.jobTitle ?? "").trim(),
          workplace:         String(mapped.workplace ?? "").trim(),
          trainingDate,
          trainingHours:     Number(mapped.trainingHours ?? 0),
        },
        create: {
          traineeId:         String(mapped.traineeId ?? "").trim(),
          certificateNo:     String(mapped.certificateNo ?? "").trim(),
          fullName:          String(mapped.fullName ?? "").trim(),
          accreditationBody: String(mapped.accreditationBody ?? "").trim(),
          certificateType:   String(mapped.certificateType ?? "").trim(),
          trainingProgram:   String(mapped.trainingProgram ?? "").trim(),
          jobTitle:          String(mapped.jobTitle ?? "").trim(),
          workplace:         String(mapped.workplace ?? "").trim(),
          trainingDate,
          trainingHours:     Number(mapped.trainingHours ?? 0),
        },
      });
      created++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`Row skipped — ${msg}`);
      skipped++;
    }
  }

  return Response.json({ created, skipped, errors });
}
