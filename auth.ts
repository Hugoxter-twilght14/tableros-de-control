import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        correo: { label: "Correo", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Validación defensiva
        const correo = credentials?.correo as string;
        const password = credentials?.password as string;
    
        if (!correo || !password) return null;
    
        // Buscar usuario en la BD
        const user = await db.usuario.findUnique({
          where: { correo },
        });
    
        if (!user || !user.password) return null;
    
        // Comparar contraseñas
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;
    
        // Retornar objeto compatible con NextAuth
        return {
          id: user.id.toString(),
          name: user.nombre,
          email: user.correo,
          rol: user.rol,
        };
      },
    }),
    
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.rol) {
        token.rol = user.rol;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.rol) {
        session.user.rol = token.rol as string;
      }
      return session;
    },
  },
})
