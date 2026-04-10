import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const [total, recentCount] = await Promise.all([
    prisma.certificate.count(),
    prisma.certificate.count({
      where: {
        issuedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  const programBreakdown = await prisma.certificate.groupBy({
    by: ["trainingProgram"],
    _count: { _all: true },
    orderBy: { _count: { trainingProgram: "desc" } },
    take: 5,
  });

  const recent = await prisma.certificate.findMany({
    orderBy: { issuedAt: "desc" },
    take: 5,
    select: {
      id: true,
      traineeId: true,
      certificateNo: true,
      fullName: true,
      trainingProgram: true,
      issuedAt: true,
    },
  });

  return Response.json({ total, recentCount, programBreakdown, recent });
}
