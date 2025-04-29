import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const movimientos = await db.historial_movimientos.findMany({
      orderBy: { fechaMovimiento: "desc" },
    });

    return NextResponse.json(movimientos);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
