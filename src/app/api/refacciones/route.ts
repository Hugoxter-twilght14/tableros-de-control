import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const {
      codigo,
      descripcion,
      noParte,
      fechaIngreso,
      proveedores,
      unidadMedidaId,
      ubicacionId,
      reportadoPorId,
      cantidad,
      existenciaSistema
    } = await request.json()

    const existe = await db.refacciones_l3.findUnique({
      where: { codigo }
    })

    if (existe) {
      return new NextResponse("Ya existe una refacción con este código", { status: 400 })
    }

    const existenciaFisica = cantidad
    const diferencia = Math.abs(existenciaFisica - existenciaSistema)

    const nuevaRefaccion = await db.refacciones_l3.create({
      data: {
        codigo,
        descripcion,
        noParte,
        fechaIngreso: new Date(fechaIngreso),
        proveedores,
        unidadMedidaId,
        existenciaFisica,
        existenciaSistema,
        diferencias: diferencia,
        cantidadEntrada: 0,
        cantidadSalida: 0,
        movimiento: "NUEVO_INGRESO",
        ubicacion: {
          connect: { id: ubicacionId }
        },
        usuarioReportado: {
          connect: { id: reportadoPorId }
        }
      }
    })
    
    await db.historial_movimientos.create({
      data: {
        codigoRefaccion: nuevaRefaccion.codigo,
        descripcion: nuevaRefaccion.descripcion,
        noParte: nuevaRefaccion.noParte,
        movimiento: "NUEVO_INGRESO",
        cantidad: nuevaRefaccion.existenciaFisica,
        existenciaFisicaDespues: nuevaRefaccion.existenciaFisica
      }
    })

    return NextResponse.json(nuevaRefaccion)
  } catch (error) {
    console.error("Error al registrar refacción:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
