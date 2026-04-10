import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@aiaetar.edu.eg";
  const password = process.env.ADMIN_PASSWORD ?? "Admin@123456";

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 12);
    await prisma.adminUser.create({
      data: { email, password: hashed, name: "System Admin" },
    });
    console.log(`✅ Admin created: ${email}`);
  } else {
    console.log(`ℹ️  Admin already exists: ${email}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
