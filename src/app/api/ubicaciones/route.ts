// app/api/ubicacion/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // ajusta si tu importación es distinta

export async function POST(request: Request) {
  const { rack, posicion, fila } = await request.json();

  if (!rack || !posicion || !fila) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 });
  }

  try {
    const nuevaUbicacion = await db.ubicacion.create({
      data: {
        rack: parseInt(rack),
        posicion,
        fila,
      },
    });

    return NextResponse.json(nuevaUbicacion, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
