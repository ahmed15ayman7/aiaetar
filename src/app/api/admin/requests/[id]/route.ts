import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

/** Update status and/or notes */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const allowed = ["new", "read", "replied"];
  if (body.status && !allowed.includes(body.status)) {
    return Response.json({ error: "Invalid status" }, { status: 422 });
  }

  try {
    const updated = await prisma.contactRequest.update({
      where: { id },
      data: {
        ...(body.status !== undefined ? { status: body.status } : {}),
        ...(body.notes  !== undefined ? { notes:  body.notes  } : {}),
      },
    });
    return Response.json(updated);
  } catch {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const { id } = await params;
  try {
    await prisma.contactRequest.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}
