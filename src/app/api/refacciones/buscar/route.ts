import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query")

  if (!query) {
    return NextResponse.json([])
  }

  try {
    const posibles = await db.refacciones_l3.findMany({
      where: {
        codigo: {
          gte: parseInt(query), // Mayor o igual al código que comienza con query
        },
      },
      orderBy: { fechaIngreso: "desc" },
      include: {
        ubicacion: true,
        usuarioReportado: true,
      },
    })

    const filtrados = posibles.filter((item) =>
      item.codigo.toString().startsWith(query)
    )

    return NextResponse.json(filtrados)
  } catch (error) {
    console.error("Error al buscar refacciones:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
