import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

/* ─── PUT: update certificate ── */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid JSON" }, { status: 400 });

  try {
    const cert = await prisma.certificate.update({
      where: { id },
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
    return Response.json(cert);
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === "P2025") return Response.json({ error: "Not found" }, { status: 404 });
    if (code === "P2002") return Response.json({ error: "Duplicate ID or certificate number" }, { status: 409 });
    throw err;
  }
}

/* ─── DELETE: delete certificate ── */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const { id } = await params;

  try {
    await prisma.certificate.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === "P2025") return Response.json({ error: "Not found" }, { status: 404 });
    throw err;
  }
}
