import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"
export async function GET() {
  try {
    const usuarios = await db.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        correo: true,
        imagen: true,
        rol: true,
        telefono: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(usuarios)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"))
    if (!id) return new NextResponse("ID requerido", { status: 400 })

    await db.usuario.delete({ where: { id } })

    return NextResponse.json({ mensaje: "Usuario eliminado correctamente" })
  } catch (error) {
    console.error("Error al eliminar usuario:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
