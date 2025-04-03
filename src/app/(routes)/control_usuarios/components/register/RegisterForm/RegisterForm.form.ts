// src/components/forms/RegisterForm.form.ts
import { z } from "zod"

const roles = [
  "ADMINISTRADOR",
  "SUPERVISOR_REFACCIONES",
  "SUPERVISOR_QUIMICOS",
  "DESPACHADOR",
] as const

export const formSchema = z
  .object({
    nombre: z.string().optional(),
    correo: z.string().email("Debe ser un correo válido"),
    imagen: z.string().optional(),
    rol: z.enum(roles, {
      errorMap: () => ({ message: "Selecciona un rol válido" }),
    }),
    telefono: z.string().optional(),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    repitPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  })
  .refine((data) => data.password === data.repitPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repitPassword"],
  })
