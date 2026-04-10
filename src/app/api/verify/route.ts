import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return Response.json({ error: "Query too short" }, { status: 400 });
  }

  const cert = await prisma.certificate.findFirst({
    where: {
      OR: [
        { certificateNo: { equals: q, mode: "insensitive" } },
        { traineeId: { equals: q, mode: "insensitive" } },
      ],
    },
  });

  if (!cert) {
    return Response.json({ found: false }, { status: 200 });
  }

  return Response.json({ found: true, certificate: cert }, { status: 200 });
}
