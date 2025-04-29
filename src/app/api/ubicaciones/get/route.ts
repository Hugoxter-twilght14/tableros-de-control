import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"
export async function GET() {
  try {
    const ubicaciones = await db.ubicacion.findMany({
      orderBy: {
        id: "asc"
      }
    })

    return NextResponse.json(ubicaciones)
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
