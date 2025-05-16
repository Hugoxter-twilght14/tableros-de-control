import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"
export async function GET() {
  try {
    const refacciones = await db.refacciones_l3.findMany({
      include: {
        ubicacion: true,
        usuarioReportado: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: { fechaIngreso: "desc" },
    })

    return NextResponse.json(refacciones)
  } catch (error) {
    console.error("Error al obtener refacciones:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const codigo = Number(req.nextUrl.searchParams.get("codigo"))
    if (!codigo) return new NextResponse("Código requerido", { status: 400 })

    await db.refacciones_l3.delete({ where: { codigo } })

    return NextResponse.json({ mensaje: "Refacción eliminada correctamente" })
  } catch (error) {
    console.error("Error al eliminar refacción:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}