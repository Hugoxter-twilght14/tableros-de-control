// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const {
      nombre,
      correo,
      imagen,
      rol,
      telefono,
      password
    } = await request.json()

    const existingUser = await db.usuario.findUnique({ where: { correo } })

    if (existingUser) {
      return new NextResponse("El correo ya existe", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userCreated = await db.usuario.create({
      data: {
        nombre,
        correo,
        imagen,
        rol,
        telefono,
        password: hashedPassword,
      },
    })

    return NextResponse.json(userCreated)
  } catch (error) {
    console.error(error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
