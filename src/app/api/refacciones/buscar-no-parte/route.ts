import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")

  if (!query) return NextResponse.json([])

  try {
    const todos = await db.refacciones_l3.findMany({
      orderBy: { fechaIngreso: "desc" },
      include: {
        ubicacion: true,
        usuarioReportado: true,
      },
    })

    const filtrados = todos.filter((ref) =>
      ref.noParte.toLowerCase().includes(query.toLowerCase())
    )

    return NextResponse.json(filtrados)
  } catch (error) {
    console.error("Error al buscar por número de parte:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
