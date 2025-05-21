import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      codigo,
      descripcion,
      noLote,
      fechaIngreso,
      proveedores,
      unidadMedidaId,
      fechaVencimiento,
      diasVida,
      ubicacionId,
      reportadoPorId,
      cantidad,
      existenciaSistema
    } = body

    // Coerción y validación básica
    const parsedCodigo = Number(codigo)
    const parsedUbicacionId = Number(ubicacionId)
    const parsedReportadoPorId = Number(reportadoPorId)
    const parsedCantidad = Number(cantidad)
    const parsedExistenciaSistema = Number(existenciaSistema)

    if (
      isNaN(parsedCodigo) ||
      !descripcion ||
      !noLote ||
      !fechaIngreso ||
      !proveedores ||
      !unidadMedidaId ||
      isNaN(parsedUbicacionId) ||
      isNaN(parsedReportadoPorId)
    ) {
      return new NextResponse("Datos faltantes o inválidos", { status: 400 })
    }
    

    // Validación y parseo de fecha (formato yyyy-mm-dd)
    const parsedFecha = new Date(`${fechaIngreso}T12:00:00`)
    if (isNaN(parsedFecha.getTime())) {
      return new NextResponse("Fecha de ingreso inválida", { status: 400 })
    }

    // Verifica si ya existe una refacción con ese código
    const existe = await db.quimicos_almacen.findUnique({
      where: { codigo: parsedCodigo }
    })

    if (existe) {
      return new NextResponse("Ya existe una refacción con este código", { status: 400 })
    }

    const existenciaFisica = parsedCantidad
    const diferencia = Math.abs(existenciaFisica - parsedExistenciaSistema)

     // Validación fechaVencimiento y diasVida (agregado)
    if (!fechaVencimiento || isNaN(Number(diasVida))) {
      return new NextResponse("Fecha de vencimiento o días de vida inválidos", { status: 400 })
    }
    const parsedFechaVencimiento = new Date(`${fechaVencimiento}T12:00:00`)
    const parsedDiasVida = Number(diasVida)
    if (isNaN(parsedFechaVencimiento.getTime()) || parsedDiasVida < 0) {
      return new NextResponse("Fecha de vencimiento o días de vida inválidos", { status: 400 })
    }

    // Crear nueva refacción
    const nuevaRefaccion = await db.quimicos_almacen.create({
      data: {
        codigo: parsedCodigo,
        descripcion,
        noLote,
        fechaIngreso: parsedFecha,
        proveedores,
        unidadMedidaId,
        existenciaFisica,
        existenciaSistema: parsedExistenciaSistema,
        diferencias: diferencia,
        fechaVencimiento: parsedFechaVencimiento, 
        diasVida: parsedDiasVida,                  
        cantidadEntrada: 0,
        cantidadSalida: 0,
        cantidad: parsedCantidad,
        movimiento: "NUEVO_INGRESO",
        ubicacion: { connect: { id: parsedUbicacionId } },
        usuarioReportadoQuimicos: { connect: { id: parsedReportadoPorId } }
      }
    })

   
    // Registrar historial
await db.historial_movimientos_quimicos.create({
  data: {
    codigoRefaccion: nuevaRefaccion.codigo,
    descripcion: nuevaRefaccion.descripcion,
    noLote: nuevaRefaccion.noLote,
    movimiento: "NUEVO_INGRESO",
    cantidad: nuevaRefaccion.existenciaFisica,
    existenciaFisicaDespues: nuevaRefaccion.existenciaFisica,
    usuarioReportado: {
      connect: { id: parsedReportadoPorId }
    }
  }
})


    console.log("✅ Refacción registrada correctamente:", nuevaRefaccion)
    return NextResponse.json(nuevaRefaccion)

  } catch (error) {
    console.error("❌ Error al registrar refacción:", error)
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
