import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const {
      codigo,
      descripcion,
      noParte,
      fechaIngreso,
      fechaVencimiento,
      proveedores,
      unidadMedidaId,
      ubicacionId,
      reportadoPorId,
      cantidad
    } = await request.json()

    const existe = await db.refacciones_l3.findUnique({
      where: { codigo }
    })

    if (existe) {
      return new NextResponse("Ya existe una refacción con este código", { status: 400 })
    }

    const nuevaRefaccion = await db.refacciones_l3.create({
      data: {
        codigo,
        descripcion,
        noParte,
        fechaIngreso: new Date(fechaIngreso),
        fechaVencimiento: new Date(fechaVencimiento),
        proveedores,
        unidadMedidaId,
        existenciaFisica: cantidad,
        existenciaSistema: cantidad,
        diferencias: 0,
        cantidadEntrada: 0,
        cantidadSalida: 0,
        movimiento: "NUEVO_INGRESO", // ← Enum válido
        ubicacion: {
          connect: { id: ubicacionId }
        },
        usuarioReportado: {
          connect: { id: reportadoPorId }
        }
      }
    })

    return NextResponse.json(nuevaRefaccion)
  } catch (error) {
    console.error("Error al registrar refacción:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
