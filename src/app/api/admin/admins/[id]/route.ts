import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const { id } = await params;

  // Cannot delete yourself
  if (id === session.id) {
    return Response.json({ error: "You cannot delete your own account." }, { status: 400 });
  }

  // Prevent deleting last admin
  const count = await prisma.adminUser.count();
  if (count <= 1) {
    return Response.json({ error: "Cannot delete the only admin account." }, { status: 400 });
  }

  try {
    await prisma.adminUser.delete({ where: { id } });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}
