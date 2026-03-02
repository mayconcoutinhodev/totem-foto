# Database

## 1. Diagrama

User 1 --- N Photo

---

## 2. Schema Prisma

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  role      Role
  createdAt DateTime @default(now())
  photos    Photo[]
}

model Photo {
  id         String   @id @default(cuid())
  imagePath  String
  createdAt  DateTime @default(now())
  createdBy  String
  user       User     @relation(fields: [createdBy], references: [id])
}

enum Role {
  ADMIN
  PROMOTOR
}

---

## 3. Decisões

- imagePath → evita salvar blob no banco
- createdAt → suporte a filtros no admin
- relação com User → rastreabilidade