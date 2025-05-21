export type Quimicos = {
  codigo: number
  descripcion: string
  noLote: string
  existenciaFisica: number
  existenciaSistema: number
  diferencias: number
  proveedores: string
  cantidadEntrada?: number
  cantidadSalida?: number
  cantidad?: number
  fechaIngreso: string | Date
  unidadMedidaId: string
  ubicacionId: number
  ubicacion: {
    rack: number
    fila: string
    posicion: string
  }
  usuarioReportado?: {
    nombre?: string
  }
  reportadoPorId: number
}
