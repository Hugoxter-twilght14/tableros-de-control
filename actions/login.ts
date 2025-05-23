"use server"

import { signIn } from "../auth"
import { signInSchema } from "../src/lib/zod"
import { AuthError } from "next-auth"
import { z } from "zod"
import { db } from "@/lib/db" // importante si no lo tienes

export const login = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { correo, password } = validatedFields.data

  // Buscamos el rol directamente en la DB
  const user = await db.usuario.findUnique({ where: { correo } })
  const rol = user?.rol

  try {
    await signIn("credentials", {
      correo,
      password,
      redirect: false,
    })

    switch (rol) {
      case "ADMINISTRADOR":
        return { success: true, redirectTo: "/" }
      case "SUPERVISOR_REFACCIONES":
        return { success: true, redirectTo: "/vista-refacciones" }
      case "SUPERVISOR_QUIMICOS":
        return { success: true, redirectTo: "/vista-quimicos" }
      case "DESPACHADOR":
        return { success: true, redirectTo: "/vista-despachador" }
      default:
        return { error: "Rol desconocido" }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" }
        default:
          return { error: "Error desconocido" }
      }
    }
  }
}
