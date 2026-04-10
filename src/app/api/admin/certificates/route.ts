import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

/* ─── GET: list certificates with pagination + search ── */
export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const { searchParams } = new URL(request.url);
  const page  = Math.max(1, Number(searchParams.get("page")  ?? 1));
  const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 20)));
  const q     = searchParams.get("q")?.trim() ?? "";

  const where = q
    ? {
        OR: [
          { fullName:      { contains: q, mode: "insensitive" as const } },
          { certificateNo: { contains: q, mode: "insensitive" as const } },
          { traineeId:     { contains: q, mode: "insensitive" as const } },
          { trainingProgram: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [total, items] = await Promise.all([
    prisma.certificate.count({ where }),
    prisma.certificate.findMany({
      where,
      orderBy: { issuedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return Response.json({ total, page, limit, items });
}

/* ─── POST: create one certificate ── */
export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid JSON" }, { status: 400 });

  try {
    const cert = await prisma.certificate.create({
      data: {
        traineeId:         body.traineeId,
        certificateNo:     body.certificateNo,
        fullName:          body.fullName,
        accreditationBody: body.accreditationBody,
        certificateType:   body.certificateType,
        trainingProgram:   body.trainingProgram,
        jobTitle:          body.jobTitle,
        workplace:         body.workplace,
        trainingDate:      new Date(body.trainingDate),
        trainingHours:     Number(body.trainingHours),
      },
    });
    return Response.json(cert, { status: 201 });
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === "P2002") {
      return Response.json({ error: "Trainee ID or Certificate No already exists" }, { status: 409 });
    }
    throw err;
  }
}
