import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function PUT(request: Request) {
  try {
    const body = await request.json()

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
    } = body

    const parsedCodigo = Number(codigo)
    const parsedUbicacionId = Number(ubicacionId)
    const parsedReportadoPorId = Number(reportadoPorId)
    const parsedCantidad = Number(cantidad)
    const parsedExistenciaSistema = Number(existenciaSistema)

    if (
      isNaN(parsedCodigo) ||
      !descripcion ||
      !noParte ||
      !fechaIngreso ||
      !proveedores ||
      !unidadMedidaId ||
      isNaN(parsedUbicacionId) ||
      isNaN(parsedReportadoPorId)
    ) {
      return new NextResponse("Datos faltantes o inválidos", { status: 400 })
    }

    const parsedFecha = new Date(`${fechaIngreso}T12:00:00`)
    if (isNaN(parsedFecha.getTime())) {
      return new NextResponse("Fecha de ingreso inválida", { status: 400 })
    }

    // Verificar que exista la refacción
    const refaccionExistente = await db.refacciones_l3.findUnique({
      where: { codigo: parsedCodigo }
    })

    if (!refaccionExistente) {
      return new NextResponse("Refacción no encontrada", { status: 404 })
    }

    const diferencia = Math.abs(parsedCantidad - parsedExistenciaSistema)

    // Actualizar refacción
    const refaccionActualizada = await db.refacciones_l3.update({
      where: { codigo: parsedCodigo },
      data: {
        descripcion,
        noParte,
        fechaIngreso: parsedFecha,
        proveedores,
        unidadMedidaId,
        existenciaFisica: parsedCantidad,
        existenciaSistema: parsedExistenciaSistema,
        diferencias: diferencia,
        cantidad: parsedCantidad,
        movimiento: "EDITADO",
        ubicacion: { connect: { id: parsedUbicacionId } },
        usuarioReportado: { connect: { id: parsedReportadoPorId } }
      }
    })

    // Registrar historial
    await db.historial_movimientos.create({
      data: {
        codigoRefaccion: refaccionActualizada.codigo,
        descripcion: refaccionActualizada.descripcion,
        noParte: refaccionActualizada.noParte,
        movimiento: "EDITADO",
        cantidad: refaccionActualizada.existenciaFisica,
        existenciaFisicaDespues: refaccionActualizada.existenciaFisica,
        usuarioReportado: {
          connect: { id: parsedReportadoPorId }
        }
      }
    })

    console.log("✏️ Refacción actualizada correctamente:", refaccionActualizada)
    return NextResponse.json(refaccionActualizada)

  } catch (error) {
    console.error("❌ Error al actualizar refacción:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
