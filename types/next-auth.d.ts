import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "PROMOTOR"
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: "ADMIN" | "PROMOTOR"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "ADMIN" | "PROMOTOR"
  }
}