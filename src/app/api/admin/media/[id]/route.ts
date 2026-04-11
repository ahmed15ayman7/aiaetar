import { getAdminSession } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const { id } = await params;
  const body = await request.json().catch(() => null);

  if (body?.description === undefined && body?.description !== null) {
    return Response.json({ error: "description field required" }, { status: 400 });
  }

  try {
    const updated = await prisma.media.update({
      where: { id },
      data: { description: body.description ?? null },
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

  let media;
  try {
    media = await prisma.media.findUniqueOrThrow({ where: { id } });
  } catch {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // Delete from Cloudinary first
  try {
    await deleteFromCloudinary(
      media.publicId,
      media.type === "video" ? "video" : "image"
    );
  } catch {
    // Log but don't block DB deletion
    console.error("Cloudinary deletion failed for", media.publicId);
  }

  await prisma.media.delete({ where: { id } });
  return Response.json({ ok: true });
}
