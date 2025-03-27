// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      rol: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    rol?: string // ← OPCIONAL aquí
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    rol: string
  }
}
