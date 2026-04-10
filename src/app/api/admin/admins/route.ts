import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return unauthorized();

  const admins = await prisma.adminUser.findMany({
    select: { id: true, email: true, name: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(admins);
}
