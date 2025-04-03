import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function PUT(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"))
    if (!id) return new NextResponse("ID requerido", { status: 400 })

    const data = await req.json()
    delete data.repitPassword
    delete data.password // La password aqui no se actualiza por temas de seguridad el usuario debe regenerar su contraseña
                        // de forma manual en el login
    const updated = await db.usuario.update({
      where: { id },
      data,
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error actualizando usuario:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
