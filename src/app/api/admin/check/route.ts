import { prisma } from "@/lib/prisma";

/** Public – tells the client whether any admin account exists yet */
export async function GET() {
  const count = await prisma.adminUser.count();
  return Response.json({ hasAdmin: count > 0 });
}
