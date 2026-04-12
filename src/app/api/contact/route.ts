import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return Response.json({ error: "All fields are required" }, { status: 422 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 422 });
  }

  const record = await prisma.contactRequest.create({
    data: {
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      phone:   phone.trim(),
      message: message.trim(),
    },
  });

  return Response.json({ ok: true, id: record.id }, { status: 201 });
}
