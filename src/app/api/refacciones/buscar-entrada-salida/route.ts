import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const codigo = searchParams.get("codigo");
  const noParte = searchParams.get("noParte");

  try {
    let refaccion = null;

    if (codigo) {
      refaccion = await db.refacciones_l3.findUnique({
        where: { codigo: parseInt(codigo) }
      });
    } else if (noParte) {
      refaccion = await db.refacciones_l3.findFirst({
        where: { noParte }
      });
    }

    if (!refaccion) {
      return new NextResponse("Refacción no encontrada", { status: 404 });
    }

    return NextResponse.json(refaccion);
  } catch (error) {
    console.error("Error al buscar refacción:", error);
    return new NextResponse("Error interno", { status: 500 });
  }
}
