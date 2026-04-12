import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Returns the count of unread (new) requests — used for the sidebar badge */
export async function GET() {
  const session = await getAdminSession();
  if (!session) return Response.json({ count: 0 });

  const count = await prisma.contactRequest.count({ where: { status: "new" } });
  return Response.json({ count });
}
