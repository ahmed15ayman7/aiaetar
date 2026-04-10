import * as XLSX from "xlsx";

import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  const where = q
    ? {
        OR: [
          { fullName:      { contains: q, mode: "insensitive" as const } },
          { certificateNo: { contains: q, mode: "insensitive" as const } },
          { traineeId:     { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  const certs = await prisma.certificate.findMany({
    where,
    orderBy: { traineeId: "asc" },
  });

  const rows = certs.map((c) => ({
    "جهة الاعتماد":       c.accreditationBody,
    "رقم الشهادة":        c.certificateNo,
    "نوع الشهادة":        c.certificateType,
    "عدد ساعات التدريب":  c.trainingHours,
    "تاريخ التدريب":      c.trainingDate.toISOString().slice(0, 10),
    "البرنامج التدريبي":  c.trainingProgram,
    "الوظيفة":            c.jobTitle,
    "جهة العمل":          c.workplace,
    "الاسم الكامل":       c.fullName,
    "المتدرب ID":         c.traineeId,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);

  // RTL column widths
  ws["!cols"] = [
    { wch: 35 }, { wch: 12 }, { wch: 20 }, { wch: 10 },
    { wch: 14 }, { wch: 25 }, { wch: 20 }, { wch: 20 },
    { wch: 25 }, { wch: 10 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "الشهادات");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new Response(buf, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="certificates_${Date.now()}.xlsx"`,
    },
  });
}
