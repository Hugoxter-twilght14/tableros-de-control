import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")

  if (!query) {
    return NextResponse.json([])
  }

  try {
    const queryLower = query.toLowerCase()

    const resultados = await db.refacciones_l3.findMany({
      where: {
        OR: [
          { codigo: { equals: parseInt(query) || 0 } },
          { descripcion: { contains: queryLower } },
          { noParte: { contains: queryLower } },
        ],
      },
      orderBy: { fechaIngreso: "desc" },
    })

    return NextResponse.json(resultados)
  } catch (error) {
    console.error("Error al buscar refacciones:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
