import { z } from "zod"

export const refaccionSchema = z.object({
  codigo: z.coerce.number(),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  noParte: z.string().min(1, "El número de parte es obligatorio"),
  proveedores: z.string().min(1, "Proveedor requerido"),
  fechaIngreso: z.string().min(1, "Fecha requerida"),
  fechaVencimiento: z.string().min(1, "Fecha requerida"),
  unidadMedidaId: z.enum(["KG", "LTS", "PZ", "MTS"]),
  ubicacionId: z.coerce.number(),
  reportadoPorId: z.coerce.number(),
  cantidad: z.coerce.number().min(1, "La cantidad es obligatoria y debe ser mayor a cero")
})
