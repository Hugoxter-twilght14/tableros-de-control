import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [], // aquí van tus providers como Credentials, etc.
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.rol) {
        token.rol = user.rol
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.rol) {
        session.user.rol = token.rol as string
      }
      return session
    },
  }
})
