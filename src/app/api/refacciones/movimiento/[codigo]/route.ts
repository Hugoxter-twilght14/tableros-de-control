import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { codigo: string } }) {
  const codigo = parseInt(params.codigo);
  const { tipo, cantidad, nuevaExistencia, nuevasDiferencias } = await req.json();

  if (!["ENTRADA", "SALIDA"].includes(tipo)) {
    return new NextResponse("Tipo de movimiento inválido", { status: 400 });
  }

  const data: any = {
    existenciaFisica: nuevaExistencia,
    diferencias: nuevasDiferencias,
    movimiento: tipo,
  };

  if (tipo === "ENTRADA") {
    data.cantidadEntrada = cantidad;
    data.cantidadSalida = 0;
  } else {
    data.cantidadSalida = cantidad;
    data.cantidadEntrada = 0;
  }

  const updated = await db.refacciones_l3.update({
    where: { codigo },
    data,
  });

  // 🔥 REGISTRAR EN HISTORIAL
  await db.historial_movimientos.create({
    data: {
      codigoRefaccion: updated.codigo,
      descripcion: updated.descripcion,
      noParte: updated.noParte,
      movimiento: tipo,
      cantidad: cantidad,
      existenciaFisicaDespues: nuevaExistencia,
    }
  });

  return NextResponse.json(updated);
}
