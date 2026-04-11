import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const type   = searchParams.get("type") ?? undefined;
  const cursor = searchParams.get("cursor") ?? undefined;
  const take   = Math.min(Number(searchParams.get("take") ?? "50"), 100);

  const items = await prisma.media.findMany({
    where: type ? { type } : undefined,
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = items.length > take;
  const data    = hasMore ? items.slice(0, take) : items;

  return Response.json({
    items: data,
    nextCursor: hasMore ? data[data.length - 1].id : null,
  });
}
