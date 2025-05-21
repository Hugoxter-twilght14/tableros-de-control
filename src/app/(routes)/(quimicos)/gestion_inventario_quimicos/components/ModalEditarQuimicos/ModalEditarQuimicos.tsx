// components/ModalEditarRefaccion.tsx
"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Pencil } from "lucide-react"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { EditarQuimicos } from "../EditarQuimicos"

interface Props {
  codigo: number
  ubicaciones: any[]
  onSuccess: () => void
}

export function ModalEditarQuimicos({ codigo, ubicaciones, onSuccess }: Props) {
  const [open, setOpen] = useState(false)
  const [quimico, setQuimico] = useState<null | {
    codigo: number
    descripcion: string
    noLote: string
    proveedores: string
    cantidad: number
    fechaIngreso: string
    unidadMedidaId: "KG" | "LTS" | "PZ" | "MTS"
    ubicacionId: number
    existenciaSistema: number
    reportadoPorId: number
  }>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchQuimicos = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`/api/refacciones/update/get?codigo=${codigo}`)

      setQuimico({
        codigo: data.codigo,
        descripcion: data.descripcion,
        noLote: data.noParte,
        proveedores: data.proveedores,
        cantidad: data.cantidad ?? 1, // ✅ forzar número válido
        fechaIngreso: new Date(data.fechaIngreso).toISOString().split("T")[0],
        unidadMedidaId: data.unidadMedidaId,
        ubicacionId: data.ubicacion?.id || 0,
        existenciaSistema: data.existenciaSistema,
        reportadoPorId: data.reportadoPorId,
      })
    } catch (error) {
      toast({
        title: "Error al cargar refacción",
        description: "No se pudo cargar la refacción para editar.",
        variant: "destructive",
      })
      setOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      fetchQuimicos()
    } else {
      setQuimico(null)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800"
          title="Editar"
        >
          <Pencil size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#2b2b2b] max-w-5xl">
        <h2 className="text-white text-lg font-semibold mb-2">Editar Refacción</h2>

        {isLoading ? (
          <p className="text-white text-center py-10">Cargando refacción...</p>
        ) : (
          quimico && (
            <EditarQuimicos
              quimico={quimico}
              ubicaciones={ubicaciones}
              onSuccess={() => {
                setOpen(false)
                setQuimico(null)
                onSuccess()
              }}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  )
}
