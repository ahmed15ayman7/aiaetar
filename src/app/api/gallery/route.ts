import { prisma } from "@/lib/prisma";

/** Public endpoint – returns paginated gallery items */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type   = searchParams.get("type") ?? undefined;
  const cursor = searchParams.get("cursor") ?? undefined;
  const take   = Math.min(Number(searchParams.get("take") ?? "24"), 100);

  const items = await prisma.media.findMany({
    where: type ? { type } : undefined,
    orderBy: { createdAt: "desc" },
    take: take + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: {
      id: true, url: true, type: true,
      description: true, width: true, height: true,
      createdAt: true,
    },
  });

  const hasMore = items.length > take;
  return Response.json({
    items: hasMore ? items.slice(0, take) : items,
    nextCursor: hasMore ? items[take - 1].id : null,
  });
}
