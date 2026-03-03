import "dotenv/config"
import { PrismaClient, Role } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import bcrypt from "bcrypt"

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  const adminPassword = await bcrypt.hash("admin", 10)
  const promotorPassword = await bcrypt.hash("promotor", 10)

  await prisma.user.upsert({
    where: { email: "admin@local.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@local.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  })

  await prisma.user.upsert({
    where: { email: "promotor@local.com" },
    update: {},
    create: {
      name: "Promotor",
      email: "promotor@local.com",
      password: promotorPassword,
      role: Role.PROMOTOR,
    },
  })

  console.log("Seed executado com sucesso.")
}

main().finally(() => prisma.$disconnect())