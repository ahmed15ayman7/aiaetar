import bcrypt from "bcryptjs";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.password || !body?.name) {
    return Response.json({ error: "Name, email and password are required" }, { status: 400 });
  }

  const adminCount = await prisma.adminUser.count();

  // Only two cases are allowed to create an admin:
  // 1. No admin exists yet (first-time setup)
  // 2. A valid admin session is present (adding a sub-admin)
  if (adminCount > 0) {
    const session = await getAdminSession();
    if (!session) {
      return Response.json(
        { error: "An admin already exists. Please log in to add more accounts." },
        { status: 403 }
      );
    }
  }

  // Validate password strength
  if (body.password.length < 8) {
    return Response.json({ error: "Password must be at least 8 characters." }, { status: 422 });
  }

  const existing = await prisma.adminUser.findUnique({ where: { email: body.email } });
  if (existing) {
    return Response.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const hashed = await bcrypt.hash(body.password, 12);
  const user = await prisma.adminUser.create({
    data: { email: body.email, password: hashed, name: body.name },
  });

  return Response.json({ ok: true, id: user.id, email: user.email, name: user.name }, { status: 201 });
}
